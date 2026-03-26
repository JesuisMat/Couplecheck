"use client";

import { useTranslations } from "next-intl";

interface ProgressBarProps {
  current: number;
  total: number;
  onBack?: () => void;
}

export function ProgressBar({ current, total, onBack }: ProgressBarProps) {
  const t = useTranslations("quiz");
  const percent = Math.round((current / total) * 100);

  return (
    <div className="px-5 pt-5 pb-3 max-w-[390px] mx-auto">
      <div className="flex items-center gap-3 mb-2">
        {/* Back button */}
        {current > 0 && onBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#F2F1EC] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
            aria-label="Question précédente"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="#5B5C59"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="w-8 flex-shrink-0" />
        )}

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-[#E9E8E4] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full progress-glow transition-all duration-500 ease-out"
            style={{
              width: `${percent}%`,
              background: "linear-gradient(90deg, #AA2C32 0%, #FF7574 100%)",
            }}
          />
        </div>

        {/* Counter */}
        <span className="text-[12px] font-medium text-[#5B5C59] flex-shrink-0 w-12 text-right">
          {current + 1}/{total}
        </span>
      </div>
    </div>
  );
}
