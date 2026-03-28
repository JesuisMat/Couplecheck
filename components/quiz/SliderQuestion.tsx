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

  const getColor = (val: number) => {
    const p = (val - min) / (max - min);
    if (p >= 0.7) return "#2A9D68";
    if (p >= 0.4) return "#E08A2A";
    return "#AA2C32";
  };

  const color = getColor(current);

  return (
    <div className="mt-4 animate-fade-up">
      {/* Value display */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <span
            className="font-display font-normal text-[56px] leading-none block transition-all duration-150"
            style={{ color }}
          >
            {current}
          </span>
          <span className="text-[12px] text-[#A8A6A2]">/ {max}</span>
        </div>
      </div>

      {/* Slider track */}
      <div className="relative px-1">
        <div className="relative h-[3px] rounded-full bg-[#E0DDD6] overflow-visible">
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
            style={{
              width: `${percent}%`,
              background: color,
            }}
          />
        </div>

        {/* Native range input */}
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
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border transition-all duration-100 pointer-events-none shadow-[0_1px_6px_rgba(0,0,0,0.15)]"
          style={{
            left: `calc(${percent}% - 10px)`,
            borderColor: color,
          }}
        />
      </div>

      {/* Tick marks */}
      <div className="flex justify-between mt-3 px-1">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="w-px h-1 rounded-full transition-all"
            style={{ background: v <= current ? color : "#D0CEC8" }}
            aria-label={`${v}`}
          />
        ))}
      </div>

      {/* Labels */}
      {labels && (
        <div className="flex justify-between mt-4 px-1">
          <span className="text-[12px] text-[#8A8880] max-w-[120px] text-left leading-[1.4]">
            {labels.min[locale]}
          </span>
          <span className="text-[12px] text-[#8A8880] max-w-[120px] text-right leading-[1.4]">
            {labels.max[locale]}
          </span>
        </div>
      )}
    </div>
  );
}
