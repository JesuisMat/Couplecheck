"use client";

import { useEffect, useState } from "react";
import { getScoreColor, getScoreLabel } from "@/lib/scoring";
import { useLocale } from "next-intl";

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const locale = useLocale() as "fr" | "en";
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const step = score / 40;
      const interval = setInterval(() => {
        current = Math.min(current + step, score);
        setAnimatedScore(Math.round(current));
        if (current >= score) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center py-8">
      {/* Circle gauge */}
      <div className="relative w-[160px] h-[160px]">
        <svg
          viewBox="0 0 120 120"
          className="relative w-full h-full -rotate-90"
          aria-label={`Score: ${score}/100`}
        >
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#E0DDD6"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-normal text-[48px] text-[#1A1916] leading-none tabular-nums">
            {animatedScore}
          </span>
          <span className="text-[13px] text-[#A8A6A2]">/100</span>
        </div>
      </div>

      {/* Label */}
      <div
        className="mt-5 px-4 py-1.5 rounded-[8px] text-[13px] font-semibold tracking-wide"
        style={{ background: `${color}15`, color }}
      >
        {label[locale]}
      </div>
    </div>
  );
}
