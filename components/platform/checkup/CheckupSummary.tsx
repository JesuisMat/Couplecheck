"use client";

import { useTranslations } from "next-intl";

interface CheckupData {
  moodScore: number;
  conflictLevel: string;
  closenessScore: number;
  wordOfMonth: string;
  satisfactionScore: number;
}

interface CheckupSummaryProps {
  data: CheckupData;
  onClose: () => void;
}

export function CheckupSummary({ data, onClose }: CheckupSummaryProps) {
  const t = useTranslations("checkup.summary");

  const rows = [
    { label: t("mood"), value: `${data.moodScore}/5` },
    { label: t("conflicts"), value: data.conflictLevel },
    { label: t("closeness"), value: `${data.closenessScore}/5` },
    { label: t("word"), value: data.wordOfMonth || "—" },
    { label: t("satisfaction"), value: `${data.satisfactionScore}/10` },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h2 className="font-display italic text-[24px] text-[var(--foreground)] mb-6">
          {t("title")}
        </h2>

        <div className="bg-white rounded-[12px] border border-[var(--border)] divide-y divide-[var(--border)] mb-6 text-left">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3">
              <span className="text-[13px] text-[var(--muted-foreground)]">{row.label}</span>
              <span className="text-[14px] font-semibold text-[var(--foreground)] capitalize">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors"
        >
          {t("cta")}
        </button>
      </div>
    </div>
  );
}
