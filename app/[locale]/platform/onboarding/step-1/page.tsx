"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { OnboardingLayout } from "@/components/platform/OnboardingLayout";

export default function OnboardingStep1() {
  const locale = useLocale();
  const t = useTranslations("onboarding");
  const t1 = useTranslations("onboarding.step1");
  const router = useRouter();

  const reasons = t1.raw("reasons") as string[];

  const [partnerName, setPartnerName] = useState("");
  const [reason, setReason] = useState("");
  const [challenge, setChallenge] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveAndContinue() {
    setSaving(true);
    await fetch("/api/platform/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 1,
        data: { partnerName, reason, challenge },
      }),
    });
    setSaving(false);
    router.push(`/${locale}/platform/onboarding/step-2`);
  }

  return (
    <OnboardingLayout
      step={1}
      totalSteps={4}
      skipLabel={t("skip")}
      onSkip={() => router.push(`/${locale}/platform/onboarding/step-2`)}
    >
      <div className="space-y-8">
        {/* Partner name */}
        <div>
          <label className="block text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t1("partnerNameLabel")}
          </label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder={t1("partnerNamePlaceholder")}
            className="w-full rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
          />
        </div>

        {/* Reason */}
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t1("reasonLabel")}
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {reasons.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className={`w-full text-left px-4 py-3 rounded-[10px] border text-[14px] transition-all duration-150 ${
                  reason === r
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div>
          <label className="block text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t1("challengeLabel")}
          </label>
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder={t1("challengePlaceholder")}
            rows={4}
            className="w-full rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow resize-none"
          />
        </div>

        <button
          onClick={saveAndContinue}
          disabled={saving}
          className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors duration-150 disabled:opacity-60"
        >
          {saving ? "..." : t("continue")}
        </button>
      </div>
    </OnboardingLayout>
  );
}
