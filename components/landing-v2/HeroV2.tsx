"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function HeroV2() {
  const locale = useLocale();
  const t = useTranslations("landingV2.hero");

  return (
    <section className="pt-[100px] pb-20 px-5">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-display font-normal italic text-[42px] md:text-[58px] leading-[1.08] tracking-[-0.025em] text-[var(--foreground)] mb-5">
          {t("headline1")}{" "}
          <span className="not-italic">{t("headline2")}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] md:text-[18px] text-[#5A5854] leading-[1.65] max-w-xl mx-auto mb-8">
          {t("sub")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            href={`/${locale}/quiz`}
            className="bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors duration-150 w-full sm:w-auto text-center"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href={`/${locale}/platform/login`}
            className="border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] font-medium text-[15px] px-7 py-3.5 rounded-full transition-colors duration-150 w-full sm:w-auto text-center"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Trust */}
        <p className="text-[12px] text-[var(--muted-foreground)] tracking-wide">
          {t("trust")}
        </p>

        {/* Mockup placeholder */}
        <div className="mt-14 rounded-[16px] border border-[var(--border)] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.08)] overflow-hidden max-w-2xl mx-auto aspect-[16/9] flex items-center justify-center">
          <div className="flex flex-col items-start gap-3 w-full px-8 py-6 max-w-sm">
            {/* Fake chat messages */}
            <div className="bg-[var(--muted)] rounded-[10px] rounded-tl-[3px] px-4 py-2.5 text-[13px] text-[var(--foreground)] max-w-[80%]">
              Comment s&apos;est passé votre week-end ensemble ?
            </div>
            <div className="self-end bg-[var(--accent)] border border-[var(--primary)] border-opacity-20 rounded-[10px] rounded-tr-[3px] px-4 py-2.5 text-[13px] text-[var(--foreground)] max-w-[80%]">
              Assez tendu... on a eu du mal à se parler sans se braquer.
            </div>
            <div className="bg-[var(--muted)] rounded-[10px] rounded-tl-[3px] px-4 py-2.5 text-[13px] text-[var(--foreground)] max-w-[85%]">
              C&apos;est cohérent avec ce que tu m&apos;as dit sur ton style de communication. Parlons-en...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
