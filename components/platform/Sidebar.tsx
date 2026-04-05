"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Brain, Settings, Search, Plus, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ConversationItem } from "./ConversationItem";
import type { ConversationSummary } from "@/types/platform";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [search, setSearch] = useState("");
  const [logouting, setLogouting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/platform/conversations")
      .then((r) => r.json())
      .then((d) => setConversations(d.conversations ?? []));
  }, []);

  useEffect(() => {
    function handleDeleted(e: Event) {
      const id = (e as CustomEvent<{ id: string }>).detail.id;
      setConversations((prev) => prev.filter((c) => c.id !== id));
    }
    window.addEventListener("cc:conversation-deleted", handleDeleted);
    return () => window.removeEventListener("cc:conversation-deleted", handleDeleted);
  }, []);

  async function handleLogout() {
    setLogouting(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/platform/login`);
  }

  const filtered = conversations.filter((c) =>
    search ? c.title?.toLowerCase().includes(search.toLowerCase()) : true
  );
  const locale = useLocale();
  const t = useTranslations("platform.sidebar");
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-full bg-white border-r border-[var(--border)] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <Link
          href={`/${locale}/platform/chat`}
          onClick={onClose}
          className="font-display italic text-[18px] text-[var(--foreground)] tracking-tight leading-none"
        >
          CoupleCheck
        </Link>
      </div>

      {/* New conversation button */}
      <div className="px-3 mb-3">
        <Link
          href={`/${locale}/platform/chat`}
          onClick={onClose}
          className="flex items-center gap-2 w-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--accent)] text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors duration-150"
        >
          <Plus size={14} />
          {t("newConversation")}
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 mb-4">
        <div className="flex items-center gap-2 bg-[var(--muted)] rounded-[8px] px-3 py-2">
          <Search size={13} className="text-[var(--muted-foreground)] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 bg-transparent text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
          />
        </div>
      </div>

      {/* Recent conversations */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider px-2 mb-2">
          {t("recentConversations")}
        </p>
        <div className="space-y-0.5">
          {filtered.slice(0, 10).map((conv) => (
            <ConversationItem
              key={conv.id}
              id={conv.id}
              title={conv.title ?? "Sans titre"}
              isActive={pathname.includes(`/chat/${conv.id}`)}
            />
          ))}
        </div>
        <Link
          href={`/${locale}/platform/history`}
          onClick={onClose}
          className="block px-3 py-2 text-[12px] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors mt-1"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[var(--border)] px-3 py-3 space-y-0.5">
        <Link
          href={`/${locale}/platform/memory`}
          onClick={onClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] transition-colors duration-100 ${
            pathname.includes("/memory")
              ? "bg-[var(--accent)] text-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Brain size={15} />
          {t("memory")}
        </Link>
        <Link
          href={`/${locale}/platform/settings/general`}
          onClick={onClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] transition-colors duration-100 ${
            pathname.includes("/settings")
              ? "bg-[var(--accent)] text-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Settings size={15} />
          {t("settings")}
        </Link>
        <button
          onClick={handleLogout}
          disabled={logouting}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[8px] text-[13px] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--destructive)] transition-colors duration-100 disabled:opacity-50"
        >
          <LogOut size={15} />
          {logouting ? "..." : t("logout")}
        </button>
      </div>
    </aside>
  );
}
