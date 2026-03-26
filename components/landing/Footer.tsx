"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("landing.footer");

  return (
    <footer className="bg-[#F2F1EC] px-5 py-10 mt-4">
      <div className="max-w-5xl mx-auto">
        <div className="md:flex md:items-center md:justify-between gap-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <Heart size={14} strokeWidth={2.5} fill="#AA2C32" className="text-[#AA2C32]" />
              <span className="font-display font-bold text-[16px] text-[#AA2C32]">CoupleCheck</span>
            </div>
            <p className="text-[12px] text-[#777774]">{t("tagline")}</p>
          </div>

          <nav className="flex items-center justify-center md:justify-end gap-5 flex-wrap">
            {(["cgv", "privacy", "legal", "contact"] as const).map((key) => (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                className="text-[12px] text-[#5B5C59] hover:text-[#AA2C32] transition-colors"
              >
                {t(`links.${key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E9E8E4] text-center">
          <p className="text-[11px] text-[#AEADAA]">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
