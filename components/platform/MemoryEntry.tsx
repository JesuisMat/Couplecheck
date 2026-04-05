"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

interface MemoryEntryProps {
  id: string;
  content: string;
  onDelete: (id: string) => void;
  deleting?: boolean;
}

export function MemoryEntry({ id, content, onDelete, deleting }: MemoryEntryProps) {
  const t = useTranslations("memory");

  return (
    <div className="flex items-start justify-between gap-3 py-3 group">
      <p className="text-[14px] text-[var(--foreground)] leading-relaxed flex-1">{content}</p>
      <button
        onClick={() => onDelete(id)}
        disabled={deleting}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)] hover:text-[var(--destructive)] disabled:opacity-40"
        aria-label={t("deleteEntry")}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
