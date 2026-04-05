import { createAdminClient } from "@/lib/supabase/admin";
import { callOpenRouter } from "@/lib/openrouter";
import type { MemoryEntry } from "@/types/platform";

function buildExtractionPrompt(language: "fr" | "en"): string {
  const langInstruction =
    language === "fr"
      ? "Write the content field in French."
      : "Write the content field in English.";
  return `Extract key relational facts from this conversation. ${langInstruction}
Return ONLY valid JSON — no markdown, no explanation:
{ "facts": [{"category": "profile|communication|event|theme|preference", "content": "..."}] }
Maximum 5 facts. Be concise. No excessive deduction. Ignore small talk.`;
}

interface ExtractionResult {
  facts: Array<{ category: MemoryEntry["category"]; content: string }>;
}

export async function updateMemoryFromConversation(
  userId: string,
  messages: Array<{ role: string; content: string }>,
  language: "fr" | "en" = "fr"
): Promise<void> {
  // Only process conversations with some substance (≥2 exchanges)
  if (messages.length < 2) return;

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const extractionPrompt = buildExtractionPrompt(language);

  let extracted: ExtractionResult;
  try {
    const raw = await callOpenRouter(conversationText, extractionPrompt);
    // Strip potential markdown code fences
    const cleaned = raw.replace(/```json|```/g, "").trim();
    extracted = JSON.parse(cleaned) as ExtractionResult;
  } catch {
    // Silent — memory extraction is non-critical
    return;
  }

  if (!extracted?.facts?.length) return;

  const supabase = createAdminClient();

  // Fetch existing memory
  const { data } = await supabase
    .from("users")
    .select("memory_data")
    .eq("id", userId)
    .single();

  const existing: MemoryEntry[] = (data?.memory_data as MemoryEntry[]) ?? [];

  // Deduplicate: skip facts whose content is already >70% similar to existing
  const newFacts = extracted.facts.filter((fact) => {
    const factLower = fact.content.toLowerCase();
    return !existing.some((e) => {
      const existingLower = e.content.toLowerCase();
      // Simple substring overlap check
      return (
        existingLower.includes(factLower.slice(0, 20)) ||
        factLower.includes(existingLower.slice(0, 20))
      );
    });
  });

  if (!newFacts.length) return;

  const newEntries: MemoryEntry[] = newFacts.map((f) => ({
    id: crypto.randomUUID(),
    category: f.category,
    content: f.content,
    created_at: new Date().toISOString(),
  }));

  // Keep max 100 entries (FIFO — drop oldest)
  const merged = [...existing, ...newEntries].slice(-100);

  await supabase
    .from("users")
    .update({ memory_data: merged })
    .eq("id", userId);
}
