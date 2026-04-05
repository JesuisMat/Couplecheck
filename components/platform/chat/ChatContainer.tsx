"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat, type Message } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { MessageCounter } from "./MessageCounter";
import { SuggestionChips } from "./SuggestionChips";
import { useLocale } from "next-intl";

interface ChatContainerProps {
  conversationId?: string;
  initialMessages?: Message[];
  messagesUsed?: number;
  monthlyLimit?: number;
  welcomeText?: string;
  suggestions?: string[];
}

export function ChatContainer({
  conversationId,
  initialMessages,
  messagesUsed = 0,
  monthlyLimit = 60,
  welcomeText,
  suggestions = [],
}: ChatContainerProps) {
  const locale = useLocale();
  const [localUsed, setLocalUsed] = useState(messagesUsed);

  const onMessageSent = useCallback(() => {
    setLocalUsed((u) => u + 1);
  }, []);

  const {
    messages,
    streaming,
    error,
    sendMessage,
    stopStream,
    loadMessages,
  } = useChat(conversationId, onMessageSent);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessages?.length) {
      loadMessages(initialMessages);
    }
  }, [initialMessages, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {isEmpty ? (
            <div className="text-center pt-16 pb-8">
              <p className="font-display italic text-[22px] text-[var(--foreground)] mb-2">
                CoupleCheck
              </p>
              <p className="text-[14px] text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-sm mx-auto">
                {welcomeText ??
                  (locale === "fr"
                    ? "Bonjour ! Comment puis-je t'aider aujourd'hui ?"
                    : "Hello! How can I help you today?")}
              </p>
              {suggestions.length > 0 && (
                <SuggestionChips
                  suggestions={suggestions}
                  onSelect={sendMessage}
                />
              )}
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}

          {/* Error banner */}
          {error === "limit_reached" && (
            <div className="text-center py-4">
              <p className="text-[13px] text-[var(--destructive)] bg-red-50 border border-red-200 rounded-[8px] px-4 py-2.5 inline-block">
                {locale === "fr"
                  ? "Limite mensuelle atteinte. Ton compteur se réinitialise le 1er du mois."
                  : "Monthly limit reached. Your counter resets on the 1st of the month."}
              </p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex-shrink-0">
        <MessageCounter used={localUsed} limit={monthlyLimit} locale={locale} />
        <ChatInput
          onSend={sendMessage}
          onStop={stopStream}
          streaming={streaming}
          disabled={error === "limit_reached"}
          placeholder={locale === "fr" ? "Écris ton message..." : "Write your message..."}
        />
      </div>
    </div>
  );
}
