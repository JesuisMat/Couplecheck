"use client";

import { useLocale, useTranslations } from "next-intl";
import { DimensionScores } from "@/types/quiz";
import { classifyDimension } from "@/lib/scoring";
import { dimensions } from "@/config/dimensions";
import { DimensionIcon } from "@/components/icons/DimensionIcon";

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
      <h2 className="font-display font-normal text-[19px] text-[#1A1916] mb-4 tracking-[-0.01em]">
        {t("strengths")}
      </h2>
      <div className="space-y-2.5">
        {strengths.map((dim) => (
          <div
            key={dim.key}
            className="bg-white border border-[#E0DDD6] rounded-[12px] p-4 flex items-start gap-3 animate-fade-up"
          >
            <div className="w-7 h-7 rounded-[7px] bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path
                  d="M1 4.5l3 3L11 1"
                  stroke="#2A9D68"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[13px] text-[#1A1916] flex items-center gap-1.5">
                  <DimensionIcon dimensionKey={dim.key} size={13} className="text-[#2A9D68]" />
                  {dim.label[locale]}
                </span>
                <span className="text-[12px] font-semibold text-[#2A9D68] tabular-nums">
                  {scores[dim.key]}%
                </span>
              </div>
              <div className="h-[3px] bg-[#E0DDD6] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#2A9D68] transition-all duration-700"
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
