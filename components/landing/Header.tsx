"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display font-bold text-[18px] text-[#AA2C32] tracking-tight"
        >
          <Heart size={16} strokeWidth={2.5} fill="#AA2C32" className="text-[#AA2C32]" />
          {t("logo")}
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/quiz`}
            className="hidden md:block text-[13px] font-semibold text-[#AA2C32] hover:opacity-80 transition-opacity"
          >
            Commencer le test
          </Link>
          <Link
            href={`/${otherLocale}`}
            className="text-[13px] font-medium text-[#5B5C59] bg-[#DEDDD8] rounded-full px-3 py-1.5 hover:bg-[#E3E2DE] transition-colors"
          >
            {t("lang")}
          </Link>
        </div>
      </div>
    </header>
  );
}
