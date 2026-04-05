import { OPENROUTER_BASE_URL } from "./openrouter";

export interface StreamMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface StreamResult {
  stream: ReadableStream<Uint8Array>;
  tokensInput: number;
  tokensOutput: number;
}

/**
 * Calls OpenRouter with streaming enabled.
 * Returns a raw SSE ReadableStream from the OpenRouter API.
 */
export async function streamOpenRouter(
  messages: StreamMessage[],
  model?: string
): Promise<Response> {
  const selectedModel =
    model ?? process.env.OPENROUTER_MODEL ?? "anthropic/claude-sonnet-4-5";

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ?? "https://couplecheck.app",
      "X-Title": "CoupleCheck",
    },
    body: JSON.stringify({
      model: selectedModel,
      messages,
      stream: true,
      max_tokens: 1024,
      temperature: 0.72,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter stream error ${response.status}: ${err}`);
  }

  return response;
}

/**
 * Parses a single SSE data line from OpenRouter.
 * Returns the delta content string, or null if not a content chunk.
 */
export function parseSSELine(line: string): string | null {
  if (!line.startsWith("data: ")) return null;
  const data = line.slice(6).trim();
  if (data === "[DONE]") return null;
  try {
    const json = JSON.parse(data) as {
      choices?: Array<{ delta?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };
    return json.choices?.[0]?.delta?.content ?? null;
  } catch {
    return null;
  }
}
