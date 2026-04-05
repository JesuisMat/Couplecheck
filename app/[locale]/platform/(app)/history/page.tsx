"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Trash2, MessageSquare, Search, Loader2 } from "lucide-react";
import type { ConversationSummary } from "@/types/platform";

type GroupedConvs = {
  label: string;
  items: ConversationSummary[];
}[];

function groupByDate(conversations: ConversationSummary[], locale: string): GroupedConvs {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 7 * 86400000);
  const monthAgo = new Date(today.getTime() - 30 * 86400000);

  const groups: Record<string, ConversationSummary[]> = {
    today: [],
    yesterday: [],
    week: [],
    month: [],
    older: [],
  };

  conversations.forEach((c) => {
    const d = new Date(c.updated_at);
    if (d >= today) groups.today.push(c);
    else if (d >= yesterday) groups.yesterday.push(c);
    else if (d >= weekAgo) groups.week.push(c);
    else if (d >= monthAgo) groups.month.push(c);
    else groups.older.push(c);
  });

  const labels =
    locale === "fr"
      ? {
          today: "Aujourd'hui",
          yesterday: "Hier",
          week: "Cette semaine",
          month: "Ce mois",
          older: "Plus ancien",
        }
      : {
          today: "Today",
          yesterday: "Yesterday",
          week: "This week",
          month: "This month",
          older: "Older",
        };

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([key, items]) => ({
      label: labels[key as keyof typeof labels],
      items,
    }));
}

export default function HistoryPage() {
  const locale = useLocale();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string>();
  const [confirmDelete, setConfirmDelete] = useState<string>();

  useEffect(() => {
    fetch("/api/platform/conversations")
      .then((r) => r.json())
      .then((d) => {
        setConversations(d.conversations ?? []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch(`/api/platform/conversations/${id}`, { method: "DELETE" });
    setConversations((prev) => prev.filter((c) => c.id !== id));
    window.dispatchEvent(new CustomEvent("cc:conversation-deleted", { detail: { id } }));
    setDeleting(undefined);
    setConfirmDelete(undefined);
  }

  const filtered = conversations.filter((c) =>
    search ? c.title?.toLowerCase().includes(search.toLowerCase()) : true
  );

  const grouped = groupByDate(filtered, locale);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="font-display italic text-[28px] text-[var(--foreground)] tracking-tight mb-6">
        {locale === "fr" ? "Historique" : "History"}
      </h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[var(--border)] rounded-[10px] px-4 py-2.5 mb-6">
        <Search size={15} className="text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "fr" ? "Rechercher dans les conversations..." : "Search conversations..."}
          className="flex-1 bg-transparent text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={20} className="text-[var(--muted-foreground)] animate-spin" />
        </div>
      ) : grouped.length === 0 ? (
        <div className="text-center py-12 text-[14px] text-[var(--muted-foreground)]">
          {locale === "fr" ? "Aucune conversation pour l'instant." : "No conversations yet."}
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
              {group.label}
            </p>
            <div className="bg-white rounded-[12px] border border-[var(--border)] divide-y divide-[var(--border)]">
              {group.items.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between px-4 py-3 group hover:bg-[var(--muted)] transition-colors"
                >
                  <Link
                    href={`/${locale}/platform/chat/${conv.id}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <MessageSquare size={15} className="text-[var(--muted-foreground)] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[14px] text-[var(--foreground)] truncate">
                        {conv.title ?? (locale === "fr" ? "Sans titre" : "Untitled")}
                      </p>
                      <p className="text-[12px] text-[var(--muted-foreground)]">
                        {conv.message_count} {locale === "fr" ? "messages" : "messages"}
                      </p>
                    </div>
                  </Link>

                  {confirmDelete === conv.id ? (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(conv.id)}
                        disabled={deleting === conv.id}
                        className="text-[12px] text-[var(--destructive)] font-medium hover:underline"
                      >
                        {deleting === conv.id ? "..." : locale === "fr" ? "Confirmer" : "Confirm"}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(undefined)}
                        className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        {locale === "fr" ? "Annuler" : "Cancel"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(conv.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)] hover:text-[var(--destructive)] flex-shrink-0 ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
