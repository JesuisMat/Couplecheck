"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent, EVENTS } from "@/lib/posthog";

interface PricingCardsProps {
  sessionId: string;
  leadId?: string;
}

function useCountdown(durationHours = 168) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cc_offer_deadline");
      if (stored) {
        const deadline = parseInt(stored, 10);
        const now = Date.now();
        if (now < deadline) return Math.floor((deadline - now) / 1000);
        return 0;
      }
      const deadline = Date.now() + durationHours * 3600 * 1000;
      localStorage.setItem("cc_offer_deadline", deadline.toString());
      return durationHours * 3600;
    }
    return durationHours * 3600;
  });

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft((t) => Math.max(0, t - 1)),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function PricingCards({ sessionId, leadId }: PricingCardsProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("result");
  const countdown = useCountdown();
  const [loading, setLoading] = useState<"standard" | "premium" | null>(null);

  async function handleCheckout(offerType: "standard" | "premium") {
    setLoading(offerType);
    trackEvent(EVENTS.CHECKOUT_INITIATED, {
      offer_type: offerType,
      session_id: sessionId,
    });

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, leadId, offerType, locale }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setLoading(null);
    }
  }

  const features = {
    standard: Array.from({ length: 4 }, (_, i) =>
      t(`pricing.standard.features.${i}`)
    ),
    premium: Array.from({ length: 5 }, (_, i) =>
      t(`pricing.premium.features.${i}`)
    ),
  };

  return (
    <section className="px-5 pb-8">
      {/* Offer banner */}
      <div className="bg-gradient-to-r from-[#AA2C32] to-[#FF7574] rounded-[20px] p-4 mb-5 flex items-center justify-between shadow-[0_4px_16px_rgba(170,44,50,0.2)]">
        <span className="font-display font-bold text-[13px] text-white">
          {t("offerBadge")}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/80">{t("offerExpires")}</span>
          <span className="font-mono font-bold text-[13px] text-white bg-white/20 px-2 py-0.5 rounded-full">
            {countdown}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {/* Standard */}
        <div className="bg-[#FFFFFF] rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-[#5B5C59] tracking-[0.05em] uppercase">
              {t("pricing.standard.name")}
            </span>
            <span className="font-display font-bold text-[24px] text-[#2E2F2D]">
              {t("pricing.standard.price")}
            </span>
          </div>
          <ul className="space-y-2 mb-5">
            {features.standard.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-[#5B5C59]">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="flex-shrink-0">
                  <path d="M1 5.5l3.5 3.5L13 1" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout("standard")}
            disabled={loading !== null}
            className="w-full bg-[#F2F1EC] text-[#2E2F2D] font-semibold text-[15px] py-3.5 rounded-full active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading === "standard" ? "..." : t("pricing.standard.cta")}
          </button>
        </div>

        {/* Premium */}
        <div className="bg-gradient-to-br from-[#AA2C32] to-[#FF7574] rounded-[24px] p-5 shadow-[0_8px_24px_rgba(170,44,50,0.25)] relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full">
            {t("pricing.premium.badge")}
          </div>

          <div className="flex items-center justify-between mb-4 pr-20">
            <span className="text-[11px] font-bold text-white/80 tracking-[0.05em] uppercase">
              {t("pricing.premium.name")}
            </span>
            <div className="text-right">
              <span className="font-display font-bold text-[26px] text-white block leading-none">
                {t("pricing.premium.price")}
              </span>
              <span className="text-[12px] text-white/60 line-through">
                {t("pricing.premium.originalPrice")}
              </span>
            </div>
          </div>

          <ul className="space-y-2 mb-5">
            {features.premium.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-white">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="flex-shrink-0">
                  <path d="M1 5.5l3.5 3.5L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckout("premium")}
            disabled={loading !== null}
            className="w-full bg-white text-[#AA2C32] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading === "premium" ? "..." : t("pricing.premium.cta")}
          </button>
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
        {Array.from({ length: 3 }, (_, i) => t(`trust.${i}`)).map(
          (trust, i) => (
            <span key={i} className="text-[11px] text-[#777774]">
              {trust}
            </span>
          )
        )}
      </div>
    </section>
  );
}
