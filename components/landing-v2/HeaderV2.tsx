"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function HeaderV2() {
  const locale = useLocale();
  const t = useTranslations("landingV2.nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(245,242,236,0.97)] backdrop-blur-[12px] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-5 h-[62px] flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-display font-normal italic text-[19px] text-[var(--foreground)] tracking-tight leading-none"
        >
          CoupleCheck
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/platform/login`}
            className="hidden md:block text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5"
          >
            {t("login")}
          </Link>
          <Link
            href={`/${locale}/quiz`}
            className="bg-[var(--primary)] hover:bg-[#922226] text-white text-[13px] font-semibold px-4 py-2 rounded-full transition-colors duration-150"
          >
            {t("quiz")}
          </Link>
        </div>
      </div>
    </header>
  );
}
