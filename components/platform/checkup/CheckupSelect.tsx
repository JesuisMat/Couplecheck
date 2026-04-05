"use client";

interface Option {
  value: string;
  label: string;
}

interface CheckupSelectProps {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}

export function CheckupSelect({ options, value, onChange }: CheckupSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`py-3.5 px-4 rounded-[10px] border text-[14px] font-medium transition-all duration-150 ${
            value === opt.value
              ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]"
              : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
