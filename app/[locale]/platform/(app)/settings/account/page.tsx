"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SettingsSection } from "@/components/platform/settings/SettingsSection";
import { DangerZoneButton } from "@/components/platform/settings/DangerZoneButton";
import type { User } from "@supabase/supabase-js";

export default function AccountSettingsPage() {
  const locale = useLocale();
  const t = useTranslations("settings.account");

  const [user, setUser] = useState<User | null>(null);
  const [memberSince, setMemberSince] = useState("");
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setMemberSince(
          new Date(data.user.created_at).toLocaleDateString(
            locale === "fr" ? "fr-FR" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )
        );
      }
    });
  }, [locale]);

  async function handlePasswordReset() {
    if (!user?.email) return;
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${location.origin}/auth/callback`,
    });
    setPasswordResetSent(true);
  }

  async function handleMagicLink() {
    if (!user?.email) return;
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email: user.email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setMagicSent(true);
  }

  const provider = user?.app_metadata?.provider ?? "email";
  const isEmailProvider = provider === "email";

  return (
    <div>
      <h2 className="font-display font-normal text-[22px] text-[var(--foreground)] tracking-tight mb-6">
        {t("title")}
      </h2>

      <SettingsSection title={t("emailLabel")}>
        <p className="text-[14px] text-[var(--foreground)] font-medium">{user?.email ?? "—"}</p>
      </SettingsSection>

      <SettingsSection title={t("providerLabel")}>
        <span className="inline-flex items-center gap-2 text-[13px] text-[var(--muted-foreground)] bg-[var(--muted)] px-3 py-1.5 rounded-full capitalize">
          {provider}
        </span>
      </SettingsSection>

      {isEmailProvider && (
        <SettingsSection title={t("changePassword")} description={t("changePasswordDesc")}>
          {passwordResetSent ? (
            <p className="text-[13px] text-green-600">{t("passwordResetSent")}</p>
          ) : (
            <button
              onClick={handlePasswordReset}
              className="border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[var(--muted)] transition-colors"
            >
              {t("changePassword")}
            </button>
          )}
        </SettingsSection>
      )}

      <SettingsSection title={t("sendMagicLink")}>
        {magicSent ? (
          <p className="text-[13px] text-green-600">{t("passwordResetSent")}</p>
        ) : (
          <button
            onClick={handleMagicLink}
            className="border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[var(--muted)] transition-colors"
          >
            {t("sendMagicLink")}
          </button>
        )}
      </SettingsSection>

      <SettingsSection title={t("memberSince")}>
        <p className="text-[14px] text-[var(--muted-foreground)]">{memberSince}</p>
      </SettingsSection>

      {/* Danger zone */}
      <div className="mt-2">
        <DangerZoneButton
          label={t("deleteAccount")}
          onClick={() => setShowDeleteConfirm(true)}
        />
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="w-full max-w-[380px] bg-white rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-[var(--border)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-normal text-[18px] text-[var(--foreground)] mb-2">
              {t("deleteAccount")}
            </h2>
            <p className="text-[13px] text-[var(--muted-foreground)] mb-5 leading-relaxed">
              {t("deleteAccountConfirm")}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium py-2.5 rounded-full hover:bg-[var(--muted)] transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={async () => {
                  await fetch("/api/platform/account", { method: "DELETE" });
                  const sup = createClient();
                  await sup.auth.signOut();
                  router.push(`/${locale}/`);
                }}
                className="flex-1 bg-[var(--destructive)] text-white text-[13px] font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                {t("deleteAccountCta")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
