"use client";

interface DangerZoneButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function DangerZoneButton({ label, onClick, disabled }: DangerZoneButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-[13px] text-[var(--destructive)] border border-[var(--destructive)] border-opacity-40 hover:bg-red-50 px-4 py-2 rounded-full transition-colors duration-150 disabled:opacity-50"
    >
      {label}
    </button>
  );
}
