interface MessageCounterProps {
  used: number;
  limit: number;
  locale?: string;
}

export function MessageCounter({ used, limit, locale = "fr" }: MessageCounterProps) {
  const percent = Math.min(100, Math.round((used / limit) * 100));
  const color =
    percent < 67
      ? "#22C55E"
      : percent < 92
      ? "#F59E0B"
      : "#EF4444";

  const label =
    locale === "fr"
      ? `${used} / ${limit} messages ce mois`
      : `${used} / ${limit} messages this month`;

  return (
    <div className="px-4 pt-2 pb-0.5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-[var(--muted-foreground)]">{label}</span>
        <span className="text-[11px] font-medium" style={{ color }}>
          {percent}%
        </span>
      </div>
      <div className="w-full h-0.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
