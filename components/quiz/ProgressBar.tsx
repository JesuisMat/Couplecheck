"use client";

import { ChevronLeft } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  onBack?: () => void;
}

export function ProgressBar({ current, total, onBack }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="px-5 pb-3 max-w-[520px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-2.5">
        {/* Back button */}
        {current > 0 && onBack ? (
          <button
            onClick={onBack}
            className="flex-shrink-0 text-[#8A8880] hover:text-[#1A1916] transition-colors active:scale-95"
            aria-label="Question précédente"
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
        ) : (
          <div className="w-[18px] flex-shrink-0" />
        )}

        {/* Progress bar — thin */}
        <div className="flex-1 h-[2px] bg-[#E0DDD6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#AA2C32] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Counter */}
        <span className="text-[12px] font-medium text-[#8A8880] flex-shrink-0 tabular-nums">
          {current + 1}<span className="text-[#C8C5BF]">/{total}</span>
        </span>
      </div>
    </div>
  );
}
