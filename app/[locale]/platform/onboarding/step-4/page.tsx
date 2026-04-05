"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { OnboardingLayout } from "@/components/platform/OnboardingLayout";

export default function OnboardingStep4() {
  const locale = useLocale();
  const t = useTranslations("onboarding");
  const t4 = useTranslations("onboarding.step4");
  const router = useRouter();

  const intentionOptions = t4.raw("intentions") as string[];

  const [intentions, setIntentions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function toggleIntention(item: string) {
    setIntentions((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : prev.length < 3
        ? [...prev, item]
        : prev
    );
  }

  async function handleFinish() {
    setSaving(true);
    await fetch("/api/platform/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 4,
        data: { intentions },
        onboarding_completed: true,
      }),
    });
    setSaving(false);
    setDone(true);
    // Short delay so user sees the confirmation message
    setTimeout(() => {
      router.push(`/${locale}/platform/subscribe`);
    }, 1800);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="font-display italic text-[22px] text-[var(--foreground)] mb-2">
            CoupleCheck
          </p>
          <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed">
            {t4("readyMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <OnboardingLayout step={4} totalSteps={4}>
      <div className="space-y-6">
        <div>
          <p className="text-[15px] font-medium text-[var(--foreground)] mb-1.5">
            {t4("intentionsLabel")}
          </p>
          <p className="text-[13px] text-[var(--muted-foreground)] mb-4">
            {t4("maxHint")}
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {intentionOptions.map((item) => {
              const selected = intentions.includes(item);
              const maxReached = intentions.length >= 3 && !selected;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleIntention(item)}
                  disabled={maxReached}
                  className={`w-full text-left px-4 py-3 rounded-[10px] border text-[14px] transition-all duration-150 ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                      : maxReached
                      ? "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)] opacity-50 cursor-not-allowed"
                      : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item}
                    {selected && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleFinish}
          disabled={saving || intentions.length === 0}
          className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors duration-150 disabled:opacity-50"
        >
          {saving ? "..." : t("finish")}
        </button>
      </div>
    </OnboardingLayout>
  );
}
