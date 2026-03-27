"use client";

import { useLocale, useTranslations } from "next-intl";
import { DimensionScores } from "@/types/quiz";
import { classifyDimension } from "@/lib/scoring";
import { dimensions } from "@/config/dimensions";
import { DimensionIcon } from "@/components/icons/DimensionIcon";

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
      <h2 className="font-display font-bold text-[18px] text-[#2E2F2D] mb-4">
        {t("risks")}
      </h2>

      <div className="relative">
        {/* Locked cards */}
        <div className="space-y-3">
          {toShow.map((dim, i) => (
            <div
              key={dim.key}
              className={`bg-[#FFFFFF] rounded-[20px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                i >= 1 ? "blur-sm select-none pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1v6M7 10v1"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[14px] text-[#2E2F2D] flex items-center gap-1.5">
                      <DimensionIcon dimensionKey={dim.key} size={14} className="text-[#F59E0B]" />
                      {dim.label[locale]}
                    </span>
                    <span className="text-[13px] font-bold text-[#F59E0B]">
                      {scores[dim.key]}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
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
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F6F2] to-transparent rounded-b-[20px] flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-full px-4 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <rect
                  x="1"
                  y="7"
                  width="12"
                  height="8"
                  rx="2"
                  stroke="#5B5C59"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 7V5a3 3 0 016 0v2"
                  stroke="#5B5C59"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-[13px] font-semibold text-[#5B5C59]">
                {toShow.length} {t("risksLocked")}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
