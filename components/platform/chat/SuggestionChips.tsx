"use client";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="bg-[var(--accent)] text-[var(--primary)] text-[13px] font-medium px-4 py-2 rounded-full border border-[var(--primary)] border-opacity-20 hover:bg-[var(--primary)] hover:text-white transition-colors duration-150"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
