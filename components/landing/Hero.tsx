"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, FlaskConical } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/posthog";
import { Reveal } from "@/components/ui/Reveal";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

// Headline variants for A/B test
// PostHog flag: "headline_variant" → "control" | "variant_b" | "variant_c"
const HEADLINES: Record<string, { fr: React.ReactNode; en: React.ReactNode }> = {
  control: {
    fr: (
      <>
        Votre relation<br />
        est-elle vraiment{" "}
        <em className="italic text-[#AA2C32]">florissante&nbsp;?</em>
      </>
    ),
    en: (
      <>
        Is your relationship<br />
        truly{" "}
        <em className="italic text-[#AA2C32]">flourishing&nbsp;?</em>
      </>
    ),
  },
  variant_b: {
    fr: (
      <>
        Découvrez ce qui renforce<br />
        <em className="italic text-[#AA2C32]">— ou fragilise —</em> votre couple
      </>
    ),
    en: (
      <>
        Discover what strengthens<br />
        <em className="italic text-[#AA2C32]">— or weakens —</em> your relationship
      </>
    ),
  },
  variant_c: {
    fr: (
      <>
        Le test que votre couple<br />
        <em className="italic text-[#AA2C32]">mérite</em> — résultat en 3 min
      </>
    ),
    en: (
      <>
        The test your relationship<br />
        <em className="italic text-[#AA2C32]">deserves</em> — result in 3 min
      </>
    ),
  },
};

interface HeroProps {
  onStart?: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const locale = useLocale();
  const t = useTranslations("landing.hero");
  const headlineVariant = useFeatureFlag("headline_variant");

  const resolvedVariant =
    typeof headlineVariant === "string" && headlineVariant in HEADLINES
      ? headlineVariant
      : "control";
  const headline = HEADLINES[resolvedVariant][locale as "fr" | "en"];

  return (
    <section className="pt-24 md:pt-32 pb-16 px-5 max-w-5xl mx-auto">
      <div className="md:grid md:grid-cols-[1fr_380px] md:gap-20 md:items-center">

        {/* Left column — text */}
        <div className="text-center md:text-left">
          {/* Eyebrow */}
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-6">
            {locale === "fr" ? "Diagnostic de couple" : "Relationship diagnostic"}
          </p>

          {/* Headline — driven by PostHog A/B flag "headline_variant" */}
          <h1 className="font-display font-normal text-[46px] md:text-[58px] leading-[1.08] tracking-[-0.02em] text-[#1A1916] mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] text-[#5A5854] leading-[1.65] mb-9 max-w-sm mx-auto md:mx-0">
            {t("subheadline")}
          </p>

          {/* CTA */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {onStart ? (
              <button
                onClick={() => { trackEvent(EVENTS.QUIZ_STARTED); onStart(); }}
                className="inline-flex items-center gap-3 bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 px-7 rounded-[10px] transition-colors duration-150"
              >
                {t("cta")}
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            ) : (
              <Link
                href={`/${locale}/quiz`}
                onClick={() => trackEvent(EVENTS.QUIZ_STARTED)}
                className="inline-flex items-center gap-3 bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 px-7 rounded-[10px] transition-colors duration-150"
              >
                {t("cta")}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            )}
            <p className="text-[12px] text-[#A8A6A2]">{t("ctaSub")}</p>
          </div>

          {/* Trust + Stats */}
          <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-4">
            <p className="text-[12px] text-[#8A8880] flex items-center gap-1.5">
              <FlaskConical size={12} className="text-[#AA2C32] flex-shrink-0" />
              <span>{t("trust")}</span>
            </p>
            <span className="hidden md:block text-[#D0CEC8]">·</span>
            <p className="text-[12px] text-[#8A8880]">
              {locale === "fr" ? "12 347 couples analysés" : "12,347 couples analyzed"}
            </p>
          </div>
        </div>

        {/* Right column — diagnostic card */}
        <Reveal direction="left" delay={200} className="mt-14 md:mt-0">
          <div className="bg-white border border-[#E0DDD6] rounded-[16px] overflow-hidden">
            {/* Card header */}
            <div className="px-6 pt-6 pb-5 border-b border-[#F0EDE7]">
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#8A8880] mb-4">
                {locale === "fr" ? "Rapport diagnostique" : "Diagnostic report"}
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-normal text-[64px] leading-none text-[#1A1916]">74</span>
                    <span className="text-[18px] text-[#C8C5BF] font-light mb-2">/100</span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-[#AA2C32] bg-[#F6EEEE] px-2.5 py-1 rounded-[6px] mt-1">
                    {locale === "fr" ? "Relation stable" : "Stable relationship"}
                  </span>
                </div>

                {/* Mini circular indicator */}
                <div className="relative w-[60px] h-[60px] mb-1">
                  <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#F0EDE7" strokeWidth="6" />
                    <circle cx="30" cy="30" r="24" fill="none"
                      stroke="#AA2C32" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 24 * 0.74} ${2 * Math.PI * 24}`}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dimension bars */}
            <div className="px-6 py-5 space-y-3.5">
              {[
                { label: locale === "fr" ? "Communication" : "Communication", value: 80 },
                { label: locale === "fr" ? "Confiance" : "Trust", value: 65 },
                { label: locale === "fr" ? "Intimité" : "Intimacy", value: 70 },
                { label: locale === "fr" ? "Conflits" : "Conflict", value: 55 },
              ].map((dim) => (
                <div key={dim.label} className="flex items-center gap-3">
                  <span className="text-[11px] text-[#8A8880] w-24 flex-shrink-0">{dim.label}</span>
                  <div className="flex-1 h-[3px] bg-[#F0EDE7] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${dim.value}%`,
                        background: dim.value >= 70 ? "#2A9D68" : dim.value >= 55 ? "#E08A2A" : "#AA2C32",
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#5A5854] w-8 text-right tabular-nums">
                    {dim.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Locked section */}
            <div className="px-6 pb-6 pt-1 border-t border-[#F0EDE7]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-[#5A5854]">
                  {locale === "fr" ? "3 zones à surveiller" : "3 areas to watch"}
                </p>
                <div className="flex items-center gap-1.5">
                  <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                    <rect x="0.75" y="4.5" width="7.5" height="5.75" rx="1.25" stroke="#A8A6A2" strokeWidth="1" />
                    <path d="M2.5 4.5V3.5a2 2 0 014 0v1" stroke="#A8A6A2" strokeWidth="1" />
                  </svg>
                  <span className="text-[10px] text-[#A8A6A2] font-medium">
                    {locale === "fr" ? "Débloqué après le test" : "Unlocked after test"}
                  </span>
                </div>
              </div>
              <div className="space-y-2 select-none pointer-events-none">
                {["▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "▓▓▓▓▓▓▓▓▓▓▓"].map((r, i) => (
                  <div key={i} className="h-[28px] bg-[#F5F2EC] rounded-[6px] flex items-center px-3">
                    <span className="text-[11px] text-[#E0DDD6] tracking-widest select-none">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Caption under card */}
          <p className="text-center text-[11px] text-[#A8A6A2] mt-3">
            {locale === "fr" ? "Exemple de rapport — vos scores seront personnalisés" : "Sample report — your scores will be personalized"}
          </p>
        </Reveal>

      </div>
    </section>
  );
}
