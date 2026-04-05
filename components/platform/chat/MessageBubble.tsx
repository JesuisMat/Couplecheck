import type { Message } from "@/hooks/useChat";
import { TypingIndicator } from "./TypingIndicator";
import { MarkdownContent } from "./MarkdownContent";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 ${
          isUser
            ? "bg-[var(--primary)] text-white rounded-[18px_18px_4px_18px] text-[14px] leading-[1.65]"
            : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[var(--border)] text-[var(--foreground)] rounded-[18px_18px_18px_4px]"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap break-words">{message.content}</span>
        ) : message.streaming && !message.content ? (
          <TypingIndicator />
        ) : (
          <MarkdownContent content={message.content} isStreaming={message.streaming} />
        )}
      </div>
    </div>
  );
}
