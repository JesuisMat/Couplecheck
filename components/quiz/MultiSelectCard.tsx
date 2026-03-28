"use client";

interface MultiSelectCardProps {
  text: string;
  value: string;
  selected: boolean;
  disabled: boolean;
  onToggle: (value: string) => void;
  index?: number;
}

export function MultiSelectCard({
  text,
  value,
  selected,
  disabled,
  onToggle,
  index = 0,
}: MultiSelectCardProps) {
  return (
    <button
      onClick={() => onToggle(value)}
      disabled={disabled && !selected}
      className={`
        w-full text-left py-3.5 px-4 rounded-[10px] transition-all duration-150
        animate-fade-up flex items-center gap-3 min-h-[52px]
        active:scale-[0.99]
        ${selected
          ? "bg-white border border-[#AA2C32] shadow-[0_0_0_1px_#AA2C32]"
          : "bg-white border border-[#E0DDD6] hover:border-[#C8C5BF]"
        }
        ${disabled && !selected ? "opacity-35" : ""}
      `}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
      aria-pressed={selected}
    >
      {/* Checkbox */}
      <div
        className={`
          w-4 h-4 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-all duration-150
          ${selected ? "border-[#AA2C32] bg-[#AA2C32]" : "border-[#C8C5BF]"}
        `}
      >
        {selected && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path
              d="M1 3l1.8 2L7 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <span
        className={`text-[14px] leading-[1.45] ${
          selected ? "text-[#1A1916] font-medium" : "text-[#3E3B37]"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
