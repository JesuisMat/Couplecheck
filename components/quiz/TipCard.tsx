"use client";

interface TipCardProps {
  label: string;
  text: string;
  variant?: "conseil" | "quote";
}

export function TipCard({ label, text, variant = "conseil" }: TipCardProps) {
  if (variant === "quote") {
    return (
      <div className="border-l-2 border-[#AA2C32]/30 pl-4 py-1">
        <p className="text-[13px] text-[#6E6C67] leading-[1.65] italic">{text}</p>
      </div>
    );
  }

  return (
    <div className="border border-[#E0DDD6] bg-white rounded-[10px] p-4">
      <p className="text-[10px] font-semibold text-[#AA2C32] tracking-[0.12em] uppercase mb-1.5">
        {label}
      </p>
      <p className="text-[13px] text-[#6E6C67] leading-[1.6]">{text}</p>
    </div>
  );
}
