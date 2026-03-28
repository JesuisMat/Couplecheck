"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="header-flat fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-5 h-[62px] flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-display font-normal italic text-[19px] text-[#1A1916] tracking-tight leading-none"
        >
          CoupleCheck
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href={`/${locale}/quiz`}
            className="hidden md:block text-[13px] font-medium text-[#AA2C32] hover:text-[#922226] transition-colors"
          >
            {locale === "fr" ? "Commencer le test" : "Start the test"}
          </Link>

          <div className="flex items-center gap-0 text-[12px] font-medium text-[#8A8880]">
            <Link
              href="/fr"
              className={`px-2 py-1 transition-colors ${locale === "fr" ? "text-[#1A1916] font-semibold" : "hover:text-[#5A5854]"}`}
            >
              FR
            </Link>
            <span className="text-[#D0CEC8]">|</span>
            <Link
              href="/en"
              className={`px-2 py-1 transition-colors ${locale === "en" ? "text-[#1A1916] font-semibold" : "hover:text-[#5A5854]"}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
