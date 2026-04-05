"use client";

import { useState, useRef, useCallback } from "react";
import type { SSEChunk } from "@/types/platform";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export function useChat(
  initialConversationId?: string,
  onMessageSent?: () => void
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>(
    initialConversationId
  );
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<SSEChunk["type"] | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || streaming) return;

      setError(null);
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };
      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);
      setStreaming(true);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const response = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content, conversationId }),
          signal: ctrl.signal,
        });

        if (!response.body) throw new Error("No stream body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const chunk = JSON.parse(line.slice(6)) as SSEChunk;

              if (chunk.type === "delta") {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + chunk.content }
                      : m
                  )
                );
              } else if (chunk.type === "done") {
                setConversationId(chunk.conversationId);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, streaming: false } : m
                  )
                );
                onMessageSent?.();
              } else if (chunk.type === "error") {
                setError(chunk.type);
                setMessages((prev) => prev.filter((m) => m.id !== assistantId));
              }
            } catch {
              // skip unparseable lines
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setError("unknown");
        }
      } finally {
        setStreaming(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m
          )
        );
      }
    },
    [streaming, conversationId, onMessageSent]
  );

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const loadMessages = useCallback((msgs: Message[]) => {
    setMessages(msgs);
  }, []);

  return {
    messages,
    conversationId,
    streaming,
    error,
    sendMessage,
    stopStream,
    loadMessages,
  };
}
