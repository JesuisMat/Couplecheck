"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SettingsSection } from "@/components/platform/settings/SettingsSection";

export default function GeneralSettingsPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("settings.general");

  const [selectedLang, setSelectedLang] = useState(locale);
  const [notifications, setNotifications] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("users")
        .update({ preferred_language: selectedLang })
        .eq("id", user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    if (selectedLang !== locale) {
      router.push(`/${selectedLang}/platform/settings/general`);
    }
  }

  const langOptions = t.raw("languageOptions") as Record<string, string>;

  return (
    <div>
      <h2 className="font-display font-normal text-[22px] text-[var(--foreground)] tracking-tight mb-6">
        {t("title")}
      </h2>

      <SettingsSection title={t("languageLabel")}>
        <div className="flex gap-2">
          {Object.entries(langOptions).map(([code, label]) => (
            <button
              key={code}
              onClick={() => setSelectedLang(code)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium border transition-colors duration-150 ${
                selectedLang === code
                  ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                  : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("notificationsTitle")}
        description={t("notificationsDesc")}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setNotifications((v) => !v)}
            className={`w-10 h-5.5 rounded-full transition-colors duration-200 relative cursor-pointer ${
              notifications ? "bg-[var(--primary)]" : "bg-[var(--border)]"
            }`}
            style={{ width: 40, height: 22 }}
          >
            <div
              className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ${
                notifications ? "translate-x-[19px]" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-[14px] text-[var(--foreground)]">
            {notifications ? "Activées" : "Désactivées"}
          </span>
        </label>
      </SettingsSection>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[14px] px-6 py-2.5 rounded-full transition-colors duration-150 disabled:opacity-60"
      >
        {saved ? t("saved") : saving ? "..." : t("save")}
      </button>
    </div>
  );
}
