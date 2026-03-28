"use client";

import { useLocale, useTranslations } from "next-intl";
import { DimensionScores } from "@/types/quiz";
import { classifyDimension } from "@/lib/scoring";
import { dimensions } from "@/config/dimensions";
import { DimensionIcon } from "@/components/icons/DimensionIcon";
import { Lock } from "lucide-react";

interface RisksTeaserProps {
  scores: DimensionScores;
}

export function RisksTeaser({ scores }: RisksTeaserProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("result");

  const risks = dimensions.filter(
    (d) => classifyDimension(scores[d.key]) === "risk"
  );

  const neutrals = dimensions.filter(
    (d) => classifyDimension(scores[d.key]) === "neutral"
  );

  const toShow = [...risks, ...neutrals].slice(0, 3);

  if (toShow.length === 0) return null;

  return (
    <section className="px-5 mb-6">
      <h2 className="font-display font-normal text-[19px] text-[#1A1916] mb-4 tracking-[-0.01em]">
        {t("risks")}
      </h2>

      <div className="relative">
        <div className="space-y-2.5">
          {toShow.map((dim, i) => (
            <div
              key={dim.key}
              className={`bg-white border border-[#E0DDD6] rounded-[12px] p-4 ${
                i >= 1 ? "blur-sm select-none pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[7px] bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1.5v5M6 9v.5"
                      stroke="#E08A2A"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[13px] text-[#1A1916] flex items-center gap-1.5">
                      <DimensionIcon dimensionKey={dim.key} size={13} className="text-[#E08A2A]" />
                      {dim.label[locale]}
                    </span>
                    <span className="text-[12px] font-semibold text-[#E08A2A] tabular-nums">
                      {scores[dim.key]}%
                    </span>
                  </div>
                  <div className="h-[3px] bg-[#E0DDD6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E08A2A]"
                      style={{ width: `${scores[dim.key]}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lock overlay */}
        {toShow.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F2EC] to-transparent flex items-end justify-center pb-3">
            <div className="flex items-center gap-1.5 bg-white border border-[#E0DDD6] rounded-[8px] px-3.5 py-2">
              <Lock size={12} strokeWidth={1.75} className="text-[#8A8880]" />
              <span className="text-[12px] font-medium text-[#5A5854]">
                {toShow.length} {t("risksLocked")}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
