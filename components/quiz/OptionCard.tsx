"use client";

interface OptionCardProps {
  text: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  index?: number;
}

export function OptionCard({
  text,
  value,
  selected,
  onSelect,
  index = 0,
}: OptionCardProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`
        w-full text-left p-4 rounded-[20px] transition-all duration-200
        animate-fade-up flex items-center gap-3 min-h-[56px]
        active:scale-[0.98]
        ${
          selected
            ? "bg-[#FFE5E5] shadow-[0_2px_16px_rgba(170,44,50,0.15)] scale-[0.98]"
            : "bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-[#F8F6F2]"
        }
      `}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
      aria-pressed={selected}
    >
      {/* Selection indicator */}
      <div
        className={`
          w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200
          ${selected ? "border-[#AA2C32] bg-[#AA2C32]" : "border-[#AEADAA] bg-transparent"}
        `}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <span
        className={`text-[14px] leading-[1.4] font-medium ${
          selected ? "text-[#AA2C32]" : "text-[#2E2F2D]"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
