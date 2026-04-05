"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { MessageSquare } from "lucide-react";

interface ConversationItemProps {
  id: string;
  title: string;
  isActive?: boolean;
}

export function ConversationItem({ id, title, isActive }: ConversationItemProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/platform/chat/${id}`}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] transition-colors duration-100 group ${
        isActive
          ? "bg-[var(--accent)] text-[var(--primary)]"
          : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      <MessageSquare size={14} className="flex-shrink-0 opacity-60" />
      <span className="truncate leading-tight">{title}</span>
    </Link>
  );
}
