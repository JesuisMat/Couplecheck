"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { OnboardingLayout } from "@/components/platform/OnboardingLayout";

export default function OnboardingStep2() {
  const locale = useLocale();
  const t = useTranslations("onboarding");
  const t2 = useTranslations("onboarding.step2");
  const router = useRouter();

  const durations = t2.raw("durations") as string[];
  const living = t2.raw("living") as string[];

  const [duration, setDuration] = useState("");
  const [livingTogether, setLivingTogether] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveAndContinue() {
    setSaving(true);
    await fetch("/api/platform/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 2,
        data: { duration, livingTogether },
      }),
    });
    setSaving(false);
    router.push(`/${locale}/platform/onboarding/step-3`);
  }

  return (
    <OnboardingLayout
      step={2}
      totalSteps={4}
      skipLabel={t("skip")}
      onSkip={() => router.push(`/${locale}/platform/onboarding/step-3`)}
    >
      <div className="space-y-8">
        {/* Duration */}
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t2("durationLabel")}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {durations.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`text-center px-3 py-3 rounded-[10px] border text-[13px] transition-all duration-150 ${
                  duration === d
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Living */}
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-3">
            {t2("livingLabel")}
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {living.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLivingTogether(l)}
                className={`w-full text-left px-4 py-3 rounded-[10px] border text-[14px] transition-all duration-150 ${
                  livingTogether === l
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                }`}
              >
                {l}
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
