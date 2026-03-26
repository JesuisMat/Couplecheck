"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, FlaskConical } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/posthog";

export function Hero() {
  const locale = useLocale();
  const t = useTranslations("landing.hero");

  return (
    <section className="pt-20 md:pt-28 pb-12 px-5 max-w-5xl mx-auto">
      <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">

        {/* Left column — text */}
        <div className="text-center md:text-left">
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#FFFFFF] rounded-full px-4 py-2 mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {/* Avatar stack */}
            <div className="flex -space-x-1.5">
              {[
                { bg: "#FFD6D6", text: "#AA2C32", initials: "JD" },
                { bg: "#D6E8FF", text: "#2C5FAA", initials: "AL" },
                { bg: "#D6F5E3", text: "#2CAA6A", initials: "M" },
              ].map((a) => (
                <div
                  key={a.initials}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold"
                  style={{ background: a.bg, color: a.text }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <span className="text-[12px] text-[#5B5C59] font-semibold tracking-wide">
              {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-[36px] md:text-[52px] leading-[1.1] tracking-[-0.025em] text-[#2E2F2D] mb-5">
            {locale === "fr" ? (
              <>
                Ton couple est-il{" "}
                <br className="hidden md:block" />
                vraiment{" "}
                <em className="not-italic text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #AA2C32, #FF7574)" }}>
                  épanoui ?
                </em>
              </>
            ) : (
              <>
                Is your relationship{" "}
                <br className="hidden md:block" />
                truly{" "}
                <em className="not-italic text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #AA2C32, #FF7574)" }}>
                  thriving?
                </em>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] md:text-[18px] text-[#5B5C59] leading-[1.6] mb-8 max-w-md mx-auto md:mx-0">
            {t("subheadline")}
          </p>

          {/* CTA */}
          <Link
            href={`/${locale}/quiz`}
            onClick={() => trackEvent(EVENTS.QUIZ_STARTED)}
            className="btn-gradient inline-flex items-center gap-3 text-white font-bold text-[16px] py-4 px-8 rounded-full shadow-[0_6px_28px_rgba(170,44,50,0.35)] active:scale-[0.97] hover:shadow-[0_8px_36px_rgba(170,44,50,0.45)] transition-all duration-200"
          >
            {t("cta")}
            <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-[12px] text-[#AEADAA] text-center md:text-left">{t("ctaSub")}</p>

          {/* Trust */}
          <p className="mt-5 text-[12px] text-[#777774] flex items-center justify-center md:justify-start gap-1.5">
            <FlaskConical size={13} className="text-[#AA2C32] flex-shrink-0" />
            <span>{t("trust")}</span>
          </p>
        </div>

        {/* Right column — score card visual */}
        <div className="mt-10 md:mt-0">
          <div className="bg-white rounded-[28px] shadow-[0_16px_48px_rgba(0,0,0,0.08)] p-6 relative overflow-hidden">
            {/* Background blob */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #FF7574, transparent)" }} />

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-bold text-[#AEADAA] tracking-[0.1em] uppercase mb-0.5">
                  Score global
                </p>
                <p className="font-display font-bold text-[13px] text-[#AA2C32] bg-[#FFE5E5] px-2.5 py-1 rounded-full inline-block">
                  Relation stable
                </p>
              </div>
              {/* Mini gauge */}
              <div className="relative w-[72px] h-[72px]">
                <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="#F2F1EC" strokeWidth="8" />
                  <circle cx="36" cy="36" r="28" fill="none"
                    stroke="url(#heroGrad)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28 * 0.74} ${2 * Math.PI * 28}`}
                  />
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#AA2C32" />
                      <stop offset="100%" stopColor="#FF7574" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[20px] text-[#2E2F2D]">
                  74
                </span>
              </div>
            </div>

            {/* Dimension bars */}
            <div className="space-y-3">
              {[
                { label: "Communication", value: 80, color: "#10B981" },
                { label: "Confiance", value: 65, color: "#F59E0B" },
                { label: "Intimité", value: 70, color: "#AA2C32" },
                { label: "Gestion des conflits", value: 55, color: "#F59E0B" },
              ].map((dim) => (
                <div key={dim.label} className="flex items-center gap-3">
                  <span className="text-[11px] text-[#5B5C59] w-32 flex-shrink-0">{dim.label}</span>
                  <div className="flex-1 h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${dim.value}%`,
                        background: dim.color,
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold w-8 text-right" style={{ color: dim.color }}>
                    {dim.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Blurred risks teaser */}
            <div className="mt-4 pt-4 border-t border-[#F2F1EC]">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#5B5C59] font-semibold">3 zones à surveiller</p>
                <div className="flex items-center gap-1 bg-[#F2F1EC] rounded-full px-2.5 py-1">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <rect x="1" y="5" width="8" height="6" rx="1.5" stroke="#777774" strokeWidth="1.2" />
                    <path d="M3 5V4a2 2 0 014 0v1" stroke="#777774" strokeWidth="1.2" />
                  </svg>
                  <span className="text-[10px] text-[#777774] font-medium">Débloque</span>
                </div>
              </div>
              <div className="mt-2 space-y-1.5 blur-[3px] select-none pointer-events-none">
                {["Projets communs", "Équilibre individuel"].map((r) => (
                  <div key={r} className="h-6 bg-[#F2F1EC] rounded-full w-3/4" />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
