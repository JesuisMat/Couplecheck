"use client";

interface TipCardProps {
  label: string;
  text: string;
  variant?: "conseil" | "quote";
}

export function TipCard({ label, text, variant = "conseil" }: TipCardProps) {
  if (variant === "quote") {
    return (
      <div className="flex items-start gap-3 bg-[#F5F3EF] rounded-[16px] p-4">
        <div className="flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1L9.854 6.278H15.416L10.781 9.444L12.635 14.722L8 11.556L3.365 14.722L5.219 9.444L0.584 6.278H6.146L8 1Z"
              fill="#AA2C32"
              opacity="0.6"
            />
          </svg>
        </div>
        <p className="text-[13px] text-[#5B5C59] leading-[1.6] italic">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 bg-[#FFF4F3] rounded-[16px] p-4">
      <div className="w-8 h-8 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M7.5 0.5L9.195 5.805H14.748L10.276 8.89L11.972 14.195L7.5 11.11L3.028 14.195L4.724 8.89L0.252 5.805H5.805L7.5 0.5Z"
            fill="#AA2C32"
          />
        </svg>
      </div>
      <div>
        <p className="text-[11px] font-bold text-[#AA2C32] tracking-[0.1em] uppercase mb-1">
          {label}
        </p>
        <p className="text-[13px] text-[#5B5C59] leading-[1.5]">{text}</p>
      </div>
    </div>
  );
}
