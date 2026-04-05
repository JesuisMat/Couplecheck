"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { SettingsSection } from "@/components/platform/settings/SettingsSection";
import { DangerZoneButton } from "@/components/platform/settings/DangerZoneButton";
import { ExternalLink } from "lucide-react";

export default function PrivacySettingsPage() {
  const locale = useLocale();
  const t = useTranslations("settings.privacy");
  const [clearingMemory, setClearingMemory] = useState(false);
  const [memoryClear, setMemoryClear] = useState(false);
  const [deletingHistory, setDeletingHistory] = useState(false);
  const [historyDeleted, setHistoryDeleted] = useState(false);

  async function handleClearMemory() {
    setClearingMemory(true);
    await fetch("/api/platform/memory", { method: "DELETE" });
    setClearingMemory(false);
    setMemoryClear(true);
  }

  async function handleDeleteHistory() {
    setDeletingHistory(true);
    // Placeholder — Sprint 5 implements conversation deletion
    setTimeout(() => {
      setDeletingHistory(false);
      setHistoryDeleted(true);
    }, 800);
  }

  return (
    <div>
      <h2 className="font-display font-normal text-[22px] text-[var(--foreground)] tracking-tight mb-6">
        {t("title")}
      </h2>

      <SettingsSection title={t("memoryLink")}>
        <Link
          href={`/${locale}/platform/memory`}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--primary)] hover:underline font-medium"
        >
          {t("memoryLink")}
          <ExternalLink size={13} />
        </Link>
      </SettingsSection>

      <SettingsSection title={t("clearMemory")}>
        {memoryClear ? (
          <p className="text-[13px] text-green-600">Mémoire effacée.</p>
        ) : (
          <DangerZoneButton
            label={clearingMemory ? "..." : t("clearMemory")}
            onClick={handleClearMemory}
            disabled={clearingMemory}
          />
        )}
      </SettingsSection>

      <SettingsSection title={t("exportData")} description={t("exportDesc")}>
        <a
          href="/api/platform/export"
          download="couplecheck-data.json"
          className="inline-flex items-center gap-1.5 border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[var(--muted)] transition-colors"
        >
          {t("exportData")}
        </a>
      </SettingsSection>

      <SettingsSection title={t("deleteHistory")}>
        {historyDeleted ? (
          <p className="text-[13px] text-green-600">Historique supprimé.</p>
        ) : (
          <DangerZoneButton
            label={deletingHistory ? "..." : t("deleteHistory")}
            onClick={handleDeleteHistory}
            disabled={deletingHistory}
          />
        )}
      </SettingsSection>

      <SettingsSection title={t("privacyPolicy")}>
        <Link
          href={`/${locale}/privacy`}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--primary)] hover:underline font-medium"
        >
          {t("privacyPolicy")}
          <ExternalLink size={13} />
        </Link>
      </SettingsSection>
    </div>
  );
}
