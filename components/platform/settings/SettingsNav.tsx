"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const SETTINGS_TABS = ["general", "account", "privacy", "usage", "billing"] as const;

export function SettingsNav() {
  const locale = useLocale();
  const t = useTranslations("settings.nav");
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {SETTINGS_TABS.map((tab) => {
        const href = `/${locale}/platform/settings/${tab}`;
        const active = pathname.includes(`/settings/${tab}`);
        return (
          <Link
            key={tab}
            href={href}
            className={`px-3 py-2 rounded-[8px] text-[13px] transition-colors duration-100 ${
              active
                ? "bg-[var(--accent)] text-[var(--primary)] font-medium"
                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {t(tab)}
          </Link>
        );
      })}
    </nav>
  );
}
