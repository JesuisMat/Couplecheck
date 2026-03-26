"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/posthog";

export function BottomCTA() {
  const locale = useLocale();
  const t = useTranslations("landing.hero");

  return (
    <section className="px-5 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] p-10 md:p-14 text-center shadow-[0_16px_48px_rgba(170,44,50,0.25)]"
          style={{ background: "linear-gradient(135deg, #AA2C32 0%, #FF7574 100%)" }}>
          {/* SVG decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0 200 C 80 0 160 0 400 200" fill="white" />
            </svg>
          </div>

          <h2 className="font-display font-extrabold text-[26px] md:text-[36px] text-white mb-3 tracking-[-0.02em] relative z-10">
            {locale === "fr" ? "Prêt(e) à renforcer votre lien ?" : "Ready to strengthen your bond?"}
          </h2>
          <p className="text-white/80 text-[15px] mb-8 relative z-10 max-w-sm mx-auto">
            {locale === "fr"
              ? "Rejoignez plus de 12 000 couples. 3 minutes, résultat immédiat."
              : "Join 12,000+ couples. 3 minutes, instant result."}
          </p>
          <Link
            href={`/${locale}/quiz`}
            onClick={() => trackEvent(EVENTS.QUIZ_STARTED)}
            className="inline-flex items-center gap-2.5 bg-white text-[#AA2C32] font-bold text-[16px] py-4 px-9 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.97] hover:scale-[1.02] transition-transform duration-200 relative z-10"
          >
            {t("cta")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
