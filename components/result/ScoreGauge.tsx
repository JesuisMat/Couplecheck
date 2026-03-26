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
      <div className="relative w-[140px] h-[140px]">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full -rotate-90"
          aria-label={`Score: ${score}/100`}
        >
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#E9E8E4"
            strokeWidth="10"
          />
          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AA2C32" />
              <stop offset="100%" stopColor="#FF7574" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-[36px] text-[#2E2F2D] leading-none">
            {animatedScore}
          </span>
          <span className="text-[12px] text-[#5B5C59]">/100</span>
        </div>
      </div>

      {/* Label badge */}
      <div
        className="mt-4 px-4 py-1.5 rounded-full text-[13px] font-semibold"
        style={{ background: `${color}20`, color }}
      >
        {label[locale]}
      </div>
    </div>
  );
}
