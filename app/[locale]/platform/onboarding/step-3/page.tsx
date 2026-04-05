"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { OnboardingLayout } from "@/components/platform/OnboardingLayout";

export default function OnboardingStep3() {
  const locale = useLocale();
  const t = useTranslations("onboarding");
  const t3 = useTranslations("onboarding.step3");
  const router = useRouter();

  const conflictStyles = t3.raw("conflictStyles") as string[];
  const therapyOptions = t3.raw("therapy") as string[];

  const [conflictStyle, setConflictStyle] = useState("");
  const [therapy, setTherapy] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveAndContinue() {
    setSaving(true);
    await fetch("/api/platform/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 3,
        data: { conflictStyle, therapy },
      }),
    });
    setSaving(false);
    router.push(`/${locale}/platform/onboarding/step-4`);
  }

  return (
    <OnboardingLayout
      step={3}
      totalSteps={4}
      skipLabel={t("skip")}
      onSkip={() => router.push(`/${locale}/platform/onboarding/step-4`)}
    >
      <div className="space-y-8">
        {/* Conflict style */}
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t3("conflictStyleLabel")}
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {conflictStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setConflictStyle(style)}
                className={`w-full text-left px-4 py-3 rounded-[10px] border text-[14px] transition-all duration-150 ${
                  conflictStyle === style
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Therapy */}
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t3("therapyLabel")}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {therapyOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTherapy(opt)}
                className={`text-center px-3 py-3 rounded-[10px] border text-[13px] transition-all duration-150 ${
                  therapy === opt
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
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
