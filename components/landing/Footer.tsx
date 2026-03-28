"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("landing.footer");

  return (
    <footer className="bg-[#1A1916] border-t border-[#2E2B27] px-5 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="font-display font-normal italic text-[17px] text-white block mb-1">
              CoupleCheck
            </span>
            <p className="text-[12px] text-[#5A5854]">{t("tagline")}</p>
          </div>

          <nav className="flex items-center gap-6 flex-wrap">
            {(["cgv", "privacy", "legal", "contact"] as const).map((key) => (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                className="text-[12px] text-[#5A5854] hover:text-[#8A8880] transition-colors"
              >
                {t(`links.${key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2E2B27]">
          <p className="text-[11px] text-[#3E3B37] text-center">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
