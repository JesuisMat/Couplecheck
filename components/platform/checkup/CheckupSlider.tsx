"use client";

interface CheckupSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  emojis?: string[];
}

export function CheckupSlider({ value, min, max, onChange, emojis }: CheckupSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {emojis && (
        <div className="flex justify-between px-1">
          {emojis.map((e, i) => (
            <span
              key={i}
              className={`text-[22px] transition-transform duration-150 cursor-pointer ${
                value === i + min ? "scale-125" : "opacity-40 scale-100"
              }`}
              onClick={() => onChange(i + min)}
            >
              {e}
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none bg-[var(--border)] rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--primary) ${percent}%, var(--border) ${percent}%)`,
          }}
        />
      </div>

      <p className="text-center font-semibold text-[28px] text-[var(--primary)]">
        {value} / {max}
      </p>
    </div>
  );
}
