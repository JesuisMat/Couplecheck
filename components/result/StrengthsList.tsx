"use client";

import { useLocale, useTranslations } from "next-intl";
import { DimensionScores } from "@/types/quiz";
import { classifyDimension } from "@/lib/scoring";
import { dimensions } from "@/config/dimensions";

interface StrengthsListProps {
  scores: DimensionScores;
}

export function StrengthsList({ scores }: StrengthsListProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("result");

  const strengths = dimensions
    .filter((d) => classifyDimension(scores[d.key]) === "strength")
    .slice(0, 3);

  if (strengths.length === 0) return null;

  return (
    <section className="px-5 mb-6">
      <h2 className="font-display font-bold text-[18px] text-[#2E2F2D] mb-4">
        {t("strengths")}
      </h2>
      <div className="space-y-3">
        {strengths.map((dim) => (
          <div
            key={dim.key}
            className="bg-[#FFFFFF] rounded-[20px] p-4 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-fade-up"
          >
            <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <path
                  d="M1 5.5l3.5 3.5L13 1"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[14px] text-[#2E2F2D]">
                  {dim.icon} {dim.label[locale]}
                </span>
                <span className="text-[13px] font-bold text-[#10B981]">
                  {scores[dim.key]}%
                </span>
              </div>
              <div className="h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] transition-all duration-700"
                  style={{ width: `${scores[dim.key]}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
