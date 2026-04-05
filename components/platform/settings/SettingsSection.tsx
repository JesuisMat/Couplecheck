interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="border-b border-[var(--border)] pb-7 mb-7 last:border-0 last:pb-0 last:mb-0">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-[var(--foreground)]">{title}</h3>
        {description && (
          <p className="text-[13px] text-[var(--muted-foreground)] mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
