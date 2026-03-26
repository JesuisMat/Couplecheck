"use client";

import { useCallback } from "react";

interface SliderQuestionProps {
  value: number | undefined;
  min?: number;
  max?: number;
  labels?: {
    min: { fr: string; en: string };
    max: { fr: string; en: string };
  };
  locale: "fr" | "en";
  onChange: (value: number) => void;
}

export function SliderQuestion({
  value,
  min = 0,
  max = 10,
  labels,
  locale,
  onChange,
}: SliderQuestionProps) {
  const current = value ?? Math.round((min + max) / 2);
  const percent = ((current - min) / (max - min)) * 100;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10));
    },
    [onChange]
  );

  // Color based on value
  const getColor = (val: number) => {
    const p = (val - min) / (max - min);
    if (p >= 0.7) return "#10B981";
    if (p >= 0.4) return "#F59E0B";
    return "#AA2C32";
  };

  const color = getColor(current);

  return (
    <div className="mt-2 animate-fade-up">
      {/* Value display */}
      <div className="flex justify-center mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
          style={{ background: `${color}18`, border: `2px solid ${color}30` }}
        >
          <span
            className="font-display font-bold text-[36px] leading-none transition-all duration-200"
            style={{ color }}
          >
            {current}
          </span>
        </div>
      </div>

      {/* Slider track */}
      <div className="relative px-1">
        <div className="relative h-3 rounded-full bg-[#E9E8E4] overflow-visible">
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, #AA2C32, ${color})`,
            }}
          />
        </div>

        {/* Native range input — hidden but functional */}
        <input
          type="range"
          min={min}
          max={max}
          value={current}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          style={{ WebkitAppearance: "none" }}
          aria-label={`Valeur : ${current} sur ${max}`}
        />

        {/* Custom thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] border-2 transition-all duration-100 pointer-events-none"
          style={{
            left: `calc(${percent}% - 14px)`,
            borderColor: color,
          }}
        />
      </div>

      {/* Tick marks */}
      <div className="flex justify-between mt-1 px-1">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`w-1 h-1 rounded-full transition-all ${
              v === current ? "opacity-100" : "opacity-30"
            }`}
            style={{ background: v === current ? color : "#AEADAA" }}
            aria-label={`${v}`}
          />
        ))}
      </div>

      {/* Labels */}
      {labels && (
        <div className="flex justify-between mt-3 px-1">
          <span className="text-[11px] text-[#777774] max-w-[120px] text-left leading-[1.3]">
            {labels.min[locale]}
          </span>
          <span className="text-[11px] text-[#777774] max-w-[120px] text-right leading-[1.3]">
            {labels.max[locale]}
          </span>
        </div>
      )}
    </div>
  );
}
