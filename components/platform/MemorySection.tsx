"use client";

import { MemoryEntry } from "./MemoryEntry";

interface MemorySectionProps {
  title: string;
  entries: Array<{ id: string; content: string }>;
  onDelete: (id: string) => void;
  deletingId?: string;
}

export function MemorySection({ title, entries, onDelete, deletingId }: MemorySectionProps) {
  if (entries.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
        {title}
      </h3>
      <div className="divide-y divide-[var(--border)]">
        {entries.map((entry) => (
          <MemoryEntry
            key={entry.id}
            id={entry.id}
            content={entry.content}
            onDelete={onDelete}
            deleting={deletingId === entry.id}
          />
        ))}
      </div>
    </div>
  );
}
