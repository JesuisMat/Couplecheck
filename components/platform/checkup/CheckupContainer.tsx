"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CheckupSlider } from "./CheckupSlider";
import { CheckupSelect } from "./CheckupSelect";
import { CheckupSummary } from "./CheckupSummary";

const TOTAL_STEPS = 5;

interface CheckupData {
  moodScore: number;
  conflictLevel: string;
  closenessScore: number;
  wordOfMonth: string;
  satisfactionScore: number;
}

export function CheckupContainer() {
  const locale = useLocale();
  const t = useTranslations("checkup");
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const startTime = useState(() => Date.now())[0];

  const [data, setData] = useState<CheckupData>({
    moodScore: 3,
    conflictLevel: "few",
    closenessScore: 3,
    wordOfMonth: "",
    satisfactionScore: 7,
  });

  async function handleFinish() {
    setSaving(true);
    const elapsed = Math.round((Date.now() - startTime) / 1000);

    await fetch("/api/platform/checkup/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood_score: data.moodScore,
        conflict_level: data.conflictLevel,
        closeness_score: data.closenessScore,
        word_of_month: data.wordOfMonth,
        satisfaction_score: data.satisfactionScore,
        completed_in_seconds: elapsed,
      }),
    });

    setSaving(false);
    setDone(true);
  }

  if (done) {
    return (
      <CheckupSummary
        data={data}
        onClose={() => router.push(`/${locale}/platform/chat`)}
      />
    );
  }

  const stepEmojis1 = t.raw("step1.emojis") as string[];
  const stepEmojis3 = t.raw("step3.emojis") as string[];
  const step2Options = t.raw("step2.options") as Array<{ value: string; label: string }>;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display italic text-[20px] text-[var(--foreground)]">
            {t("title")}
          </h1>
          <button
            onClick={() => router.push(`/${locale}/platform/chat`)}
            className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            {t("skip")}
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-10">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor:
                  i + 1 <= step ? "var(--primary)" : "var(--border)",
              }}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-[12px] border border-[var(--border)] p-7 mb-6">
          {step === 1 && (
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] mb-6">
                {t("step1.label")}
              </p>
              <CheckupSlider
                value={data.moodScore}
                min={1}
                max={5}
                onChange={(v) => setData((d) => ({ ...d, moodScore: v }))}
                emojis={stepEmojis1}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] mb-6">
                {t("step2.label")}
              </p>
              <CheckupSelect
                options={step2Options}
                value={data.conflictLevel}
                onChange={(v) => setData((d) => ({ ...d, conflictLevel: v }))}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] mb-6">
                {t("step3.label")}
              </p>
              <CheckupSlider
                value={data.closenessScore}
                min={1}
                max={5}
                onChange={(v) => setData((d) => ({ ...d, closenessScore: v }))}
                emojis={stepEmojis3}
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] mb-4">
                {t("step4.label")}
              </p>
              <input
                type="text"
                value={data.wordOfMonth}
                onChange={(e) =>
                  setData((d) => ({ ...d, wordOfMonth: e.target.value }))
                }
                placeholder={t("step4.placeholder")}
                maxLength={30}
                className="w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[16px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-center"
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] mb-6">
                {t("step5.label")}
              </p>
              <CheckupSlider
                value={data.satisfactionScore}
                min={1}
                max={10}
                onChange={(v) => setData((d) => ({ ...d, satisfactionScore: v }))}
              />
            </div>
          )}
        </div>

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors"
          >
            {t("next")}
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={saving}
            className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors disabled:opacity-60"
          >
            {saving ? "..." : t("finish")}
          </button>
        )}
      </div>
    </div>
  );
}
