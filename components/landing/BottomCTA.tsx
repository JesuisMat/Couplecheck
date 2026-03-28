"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/posthog";
import { Reveal } from "@/components/ui/Reveal";

export function BottomCTA() {
  const locale = useLocale();
  const t = useTranslations("landing.hero");

  return (
    <section className="px-5 py-20 bg-[#1A1916]">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal direction="up">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#6E6C67] mb-6">
            {locale === "fr" ? "Commencer maintenant" : "Get started"}
          </p>

          <h2 className="font-display font-normal text-[32px] md:text-[46px] text-white leading-[1.1] tracking-[-0.02em] mb-5">
            {locale === "fr"
              ? <>Prêt(e) à mieux<br /><em className="italic text-[#D4736E]">comprendre votre lien&nbsp;?</em></>
              : <>Ready to better<br /><em className="italic text-[#D4736E]">understand your bond?</em></>
            }
          </h2>

          <p className="text-[15px] text-[#6E6C67] mb-10 max-w-sm mx-auto leading-[1.65]">
            {locale === "fr"
              ? "Rejoignez plus de 12 000 couples. 3 minutes, résultat immédiat."
              : "Join 12,000+ couples. 3 minutes, instant result."}
          </p>

          <Link
            href={`/${locale}/quiz`}
            onClick={() => trackEvent(EVENTS.QUIZ_STARTED)}
            className="inline-flex items-center gap-3 bg-white hover:bg-[#F5F2EC] text-[#1A1916] font-semibold text-[15px] py-3.5 px-8 rounded-[10px] transition-colors duration-150"
          >
            {t("cta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>

          <p className="mt-4 text-[12px] text-[#3E3B37]">
            {locale === "fr" ? "Gratuit · Anonyme · 3 minutes" : "Free · Anonymous · 3 minutes"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
