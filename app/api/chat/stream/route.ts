import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { buildUserContext, buildSystemPrompt } from "@/lib/context-builder";
import { streamOpenRouter, parseSSELine } from "@/lib/openrouter-stream";
import { updateMemoryFromConversation } from "@/lib/memory-updater";
import type { SSEChunk } from "@/types/platform";

export const runtime = "nodejs";
export const maxDuration = 60;

function sseEvent(chunk: SSEChunk): string {
  return `data: ${JSON.stringify(chunk)}\n\n`;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(sseEvent({ type: "error", code: "auth_error" }), {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const body = (await request.json()) as {
    message: string;
    conversationId?: string;
  };

  if (!body.message?.trim()) {
    return new Response("Bad request", { status: 400 });
  }

  // Check message limit
  const { data: userData } = await supabase
    .from("users")
    .select("messages_used_this_month, monthly_limit")
    .eq("id", user.id)
    .single();

  const used = (userData?.messages_used_this_month as number) ?? 0;
  const limit = (userData?.monthly_limit as number) ?? 60;

  if (used >= limit) {
    return new Response(sseEvent({ type: "error", code: "limit_reached" }), {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  // Resolve or create conversation
  const admin = createAdminClient();
  let conversationId = body.conversationId;

  if (!conversationId) {
    const { data: newConv } = await admin
      .from("conversations")
      .insert({
        user_id: user.id,
        title: body.message.slice(0, 50) + (body.message.length > 50 ? "…" : ""),
        message_count: 0,
      })
      .select("id")
      .single();
    conversationId = newConv?.id;
  }

  // Save user message
  await admin.from("chat_messages").insert({
    user_id: user.id,
    conversation_id: conversationId,
    role: "user",
    content: body.message,
  });

  // Build context
  const ctx = await buildUserContext(user.id);
  const systemPrompt = buildSystemPrompt(ctx);

  // Build messages for LLM (system + recent history + new message)
  const historyMessages = ctx.recentMessages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const llmMessages = [
    { role: "system" as const, content: systemPrompt },
    ...historyMessages,
    { role: "user" as const, content: body.message },
  ];

  // Stream
  const encoder = new TextEncoder();
  let assistantContent = "";
  let tokensInput = 0;
  let tokensOutput = 0;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const openRouterResponse = await streamOpenRouter(llmMessages);
        const reader = openRouterResponse.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const content = parseSSELine(line);
            if (content) {
              assistantContent += content;
              controller.enqueue(
                encoder.encode(sseEvent({ type: "delta", content }))
              );
            }
            // Parse usage from last chunk (OpenRouter sends it in final message)
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const parsed = JSON.parse(line.slice(6)) as {
                  usage?: { prompt_tokens?: number; completion_tokens?: number };
                };
                if (parsed.usage) {
                  tokensInput = parsed.usage.prompt_tokens ?? 0;
                  tokensOutput = parsed.usage.completion_tokens ?? 0;
                }
              } catch {
                // ignore parse errors
              }
            }
          }
        }

        // Send done event
        controller.enqueue(
          encoder.encode(
            sseEvent({
              type: "done",
              tokensInput,
              tokensOutput,
              conversationId: conversationId!,
            })
          )
        );
        controller.close();

        // Post-stream operations (non-blocking)
        void (async () => {
          try {
            // Save assistant message
            await admin.from("chat_messages").insert({
              user_id: user.id,
              conversation_id: conversationId,
              role: "assistant",
              content: assistantContent,
              tokens_input: tokensInput,
              tokens_output: tokensOutput,
            });

            // Increment message counter
            await admin
              .from("users")
              .update({ messages_used_this_month: used + 1 })
              .eq("id", user.id);

            // Update conversation
            if (conversationId) {
              await admin
                .from("conversations")
                .update({ updated_at: new Date().toISOString(), message_count: ctx.recentMessages.length + 2 })
                .eq("id", conversationId);
            }

            // Async memory extraction
            await updateMemoryFromConversation(
              user.id,
              [
                ...historyMessages,
                { role: "user", content: body.message },
                { role: "assistant", content: assistantContent },
              ],
              ctx.preferredLanguage
            );
          } catch {
            // Silent — post-stream errors should not affect UX
          }
        })();
      } catch {
        controller.enqueue(
          encoder.encode(sseEvent({ type: "error", code: "unknown" }))
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
