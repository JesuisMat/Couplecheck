import { createAdminClient } from "@/lib/supabase/admin";
import type {
  UserContext,
  MemoryEntry,
  MonthlyCheckup,
  OnboardingData,
} from "@/types/platform";

// Rough token estimate: 1 token ≈ 4 chars
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export async function buildUserContext(userId: string): Promise<UserContext> {
  const supabase = createAdminClient();

  // 1. Fetch user (no FK join — avoids null lead_id issues)
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, email, preferred_language, onboarding_data, memory_data, messages_used_this_month, monthly_limit, lead_id")
    .eq("id", userId)
    .single();

  if (userError || !user) {
    throw new Error(`User not found: ${userError?.message ?? "no data"}`);
  }

  // 2. Fetch lead and quiz sessions separately
  let firstName: string | undefined;
  let quizSession: { scores?: Record<string, number>; global_score?: number; answers?: Record<string, unknown>; completed_at?: string; relationship_duration?: string; cohabiting?: boolean } | undefined;

  if (user.lead_id) {
    const { data: lead } = await supabase
      .from("leads")
      .select("first_name, session_id")
      .eq("id", user.lead_id)
      .single();

    firstName = lead?.first_name;

    if (lead?.session_id) {
      const { data: session } = await supabase
        .from("quiz_sessions")
        .select("scores, global_score, answers, completed_at, relationship_duration, cohabiting")
        .eq("id", lead.session_id)
        .single();
      quizSession = session ?? undefined;
    }
  }

  // 3. Fetch checkups and messages in parallel
  const [checkupsResult, messagesResult] = await Promise.all([
    supabase
      .from("monthly_checkups")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("chat_messages")
      .select("role, content, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const context: UserContext = {
    userId,
    email: user.email as string,
    firstName,
    preferredLanguage: (user.preferred_language as "fr" | "en") ?? "fr",

    // Quiz
    quizScores: quizSession?.scores,
    quizGlobalScore: quizSession?.global_score,
    quizAnswers: quizSession?.answers,
    quizCompletedAt: quizSession?.completed_at,
    relationshipDuration: quizSession?.relationship_duration,
    cohabiting: quizSession?.cohabiting,

    // Onboarding
    onboarding: (user.onboarding_data as OnboardingData | null) ?? undefined,

    // Memory — prioritize highest quality entries
    memoryFacts: (user.memory_data as MemoryEntry[] | null) ?? [],

    // Checkups
    recentCheckups: (checkupsResult.data as MonthlyCheckup[]) ?? [],

    // Messages (already DESC — reverse to get chronological)
    recentMessages: (
      (messagesResult.data as Array<{
        role: string;
        content: string;
        created_at: string;
      }>) ?? []
    ).reverse(),

    // Limits
    messagesUsedThisMonth: (user.messages_used_this_month as number) ?? 0,
    monthlyLimit: (user.monthly_limit as number) ?? 60,
  };

  return context;
}

export function buildSystemPrompt(ctx: UserContext): string {
  const lang = ctx.preferredLanguage === "en" ? "English" : "French";
  const lines: string[] = [];

  lines.push(
    `You are a compassionate and insightful relationship coach assistant for CoupleCheck. You speak ${lang}.`,
    `You are talking with ${ctx.firstName ?? "the user"} (${ctx.email}).`,
    ``,
    `== RELATIONSHIP PROFILE ==`
  );

  if (ctx.quizGlobalScore !== undefined) {
    lines.push(`Global relationship score: ${ctx.quizGlobalScore}/100`);
  }
  if (ctx.quizScores) {
    const scoreLines = Object.entries(ctx.quizScores)
      .map(([dim, score]) => `  - ${dim}: ${score}/100`)
      .join("\n");
    lines.push(`Dimension scores:\n${scoreLines}`);
  }
  if (ctx.relationshipDuration) {
    lines.push(`Relationship duration: ${ctx.relationshipDuration}`);
  }
  if (ctx.cohabiting !== undefined) {
    lines.push(`Living together: ${ctx.cohabiting ? "yes" : "no"}`);
  }

  if (ctx.onboarding) {
    lines.push(``, `== ONBOARDING ==`);
    if (ctx.onboarding.partnerName) lines.push(`Partner's name: ${ctx.onboarding.partnerName}`);
    if (ctx.onboarding.reason) lines.push(`Reason for joining: ${ctx.onboarding.reason}`);
    if (ctx.onboarding.challenge) lines.push(`Main challenge: ${ctx.onboarding.challenge}`);
    if (ctx.onboarding.conflictStyle) lines.push(`Conflict style: ${ctx.onboarding.conflictStyle}`);
    if (ctx.onboarding.intentions?.length) {
      lines.push(`Intentions: ${ctx.onboarding.intentions.join(", ")}`);
    }
  }

  if (ctx.memoryFacts.length > 0) {
    lines.push(``, `== MEMORY ==`);
    ctx.memoryFacts.forEach((m) => {
      lines.push(`[${m.category}] ${m.content}`);
    });
  }

  if (ctx.recentCheckups.length > 0) {
    lines.push(``, `== RECENT MONTHLY CHECKUPS ==`);
    ctx.recentCheckups.forEach((c) => {
      const monthYear = `${String(c.period_month).padStart(2, "0")}/${c.period_year}`;
      lines.push(
        `${monthYear}: mood=${c.mood_score}/5, conflicts=${c.conflict_level}, closeness=${c.closeness_score}/5, word="${c.word_of_month ?? "-"}", satisfaction=${c.satisfaction_score}/10`
      );
    });
  }

  lines.push(
    ``,
    `== GUIDELINES ==`,
    `- Be warm, non-judgmental, and practical.`,
    `- Reference the user's specific scores, challenges, and history when relevant.`,
    `- Keep responses concise (2-4 paragraphs max) unless asked to elaborate.`,
    `- Never diagnose or replace professional therapy.`,
    `- If the user seems in crisis, gently recommend professional support.`,
    ``,
    `== FORMATTING ==`,
    `- Use **bold** for key concepts or important words (sparingly).`,
    `- Use bullet lists (- item) for enumerations, tips, or options.`,
    `- Use numbered lists (1. 2. 3.) for sequential steps or advice.`,
    `- Use ## headings only for long structured answers with 3+ distinct sections.`,
    `- Use markdown tables for side-by-side comparisons.`,
    `- Keep paragraphs short: 2-3 sentences max.`,
    `- Never write walls of text — always break into structured elements.`
  );

  // Truncate to ~4000 tokens
  const fullPrompt = lines.join("\n");
  const tokens = estimateTokens(fullPrompt);
  if (tokens > 4000) {
    // Drop recent messages section to save tokens
    const truncated = lines
      .slice(0, lines.indexOf(`== GUIDELINES ==`))
      .concat(lines.slice(lines.indexOf(`== GUIDELINES ==`)));
    return truncated.join("\n");
  }

  return fullPrompt;
}
