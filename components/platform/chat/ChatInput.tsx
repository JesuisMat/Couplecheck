"use client";

import { useState, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  disabled?: boolean;
  streaming?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onStop,
  disabled,
  streaming,
  placeholder = "Écris ton message...",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    if (!value.trim() || disabled || streaming) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    // Auto-resize
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }

  return (
    <div className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end gap-2 bg-white border border-[var(--border)] rounded-[18px] px-4 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-0 transition-shadow">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none leading-[1.5] max-h-40 disabled:opacity-50"
            style={{ minHeight: "24px" }}
          />

          {streaming ? (
            <button
              onClick={onStop}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--muted)] text-[var(--foreground)] rounded-full hover:bg-[var(--border)] transition-colors"
              aria-label="Stop"
            >
              <Square size={13} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!value.trim() || disabled}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--primary)] text-white rounded-full hover:bg-[#922226] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send"
            >
              <ArrowUp size={15} />
            </button>
          )}
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] text-center mt-1.5">
          Entrée pour envoyer · Maj+Entrée pour un saut de ligne
        </p>
      </div>
    </div>
  );
}
