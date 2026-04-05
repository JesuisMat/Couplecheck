"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function FooterV2() {
  const locale = useLocale();
  const t = useTranslations("landingV2.footer");
  const links = t.raw("links") as Record<string, string>;

  return (
    <footer className="border-t border-[var(--border)] py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <span className="font-display italic text-[16px] text-[var(--foreground)]">
            CoupleCheck
          </span>
          <span className="hidden md:block text-[var(--border)]">·</span>
          <span className="text-[13px] text-[var(--muted-foreground)]">{t("tagline")}</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {Object.entries(links).map(([key, label]) => (
            <Link
              key={key}
              href={`/${locale}/${key}`}
              className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="text-[12px] text-[var(--muted-foreground)]">{t("copyright")}</p>
      </div>
    </footer>
  );
}
