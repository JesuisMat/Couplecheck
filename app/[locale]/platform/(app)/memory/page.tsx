"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MemorySection } from "@/components/platform/MemorySection";
import { Loader2 } from "lucide-react";

interface MemoryEntry {
  id: string;
  category: string;
  content: string;
  created_at: string;
}

export default function MemoryPage() {
  const t = useTranslations("memory");
  const tCats = useTranslations("memory.categories");

  const [memory, setMemory] = useState<MemoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    fetch("/api/platform/memory")
      .then((r) => r.json())
      .then((d) => {
        setMemory(d.memory ?? []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await fetch("/api/platform/memory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_entry", entryId: id }),
    });
    const data = await res.json();
    if (data.success) setMemory(data.memory);
    setDeletingId(undefined);
  }

  async function handleClearAll() {
    setClearing(true);
    await fetch("/api/platform/memory", { method: "DELETE" });
    setMemory([]);
    setClearing(false);
    setShowConfirm(false);
  }

  const categories = ["profile", "communication", "checkups", "themes"] as const;

  return (
    <div className="max-w-[640px] mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-normal italic text-[28px] text-[var(--foreground)] tracking-tight mb-2">
          {t("title")}
        </h1>
        <p className="text-[14px] text-[var(--muted-foreground)]">{t("subtitle")}</p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={20} className="text-[var(--muted-foreground)] animate-spin" />
        </div>
      ) : memory.length === 0 ? (
        <div className="bg-white rounded-[12px] border border-[var(--border)] px-6 py-10 text-center">
          <p className="text-[14px] text-[var(--muted-foreground)] leading-relaxed">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-[var(--border)] px-6 py-6 mb-6">
          {categories.map((cat) => {
            const entries = memory.filter((e) => e.category === cat);
            return (
              <MemorySection
                key={cat}
                title={tCats(cat)}
                entries={entries}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            );
          })}
        </div>
      )}

      {/* Clear all */}
      {memory.length > 0 && (
        <button
          onClick={() => setShowConfirm(true)}
          className="text-[13px] text-[var(--destructive)] hover:underline transition-colors"
        >
          {t("clearAll")}
        </button>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-[360px] bg-white rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-[var(--border)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-normal text-[18px] text-[var(--foreground)] mb-2">
              {t("clearAllConfirmTitle")}
            </h2>
            <p className="text-[13px] text-[var(--muted-foreground)] mb-5 leading-relaxed">
              {t("clearAllConfirmDesc")}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium py-2.5 rounded-full hover:bg-[var(--muted)] transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleClearAll}
                disabled={clearing}
                className="flex-1 bg-[var(--destructive)] text-white text-[13px] font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {clearing ? "..." : t("clearAllConfirmCta")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
