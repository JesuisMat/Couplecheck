"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ShieldCheck, RotateCcw, Lock, Clock } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/posthog";

interface PricingCardsProps {
  sessionId: string;
  leadId?: string;
}

function useCountdown(durationMinutes = 25) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cc_offer_deadline");
      if (stored) {
        const deadline = parseInt(stored, 10);
        const now = Date.now();
        if (now < deadline) return Math.floor((deadline - now) / 1000);
        return 0;
      }
      const deadline = Date.now() + durationMinutes * 60 * 1000;
      localStorage.setItem("cc_offer_deadline", deadline.toString());
      return durationMinutes * 60;
    }
    return durationMinutes * 60;
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

const trustIcons = [ShieldCheck, RotateCcw, Lock];

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
      <div className="border border-[#E0DDD6] bg-white rounded-[10px] p-3.5 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={13} strokeWidth={1.75} className="text-[#AA2C32]" />
          <span className="text-[13px] font-semibold text-[#1A1916]">
            {t("offerBadge")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8A8880]">{t("offerExpires")}</span>
          <span className="font-mono font-semibold text-[13px] text-[#AA2C32] bg-[#F6EEEE] px-2 py-0.5 rounded-[6px]">
            {countdown}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {/* Standard */}
        <div className="bg-white border border-[#E0DDD6] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold text-[#8A8880] tracking-[0.1em] uppercase">
              {t("pricing.standard.name")}
            </span>
            <span className="font-display font-normal text-[26px] text-[#1A1916]">
              {t("pricing.standard.price")}
            </span>
          </div>
          <ul className="space-y-2.5 mb-5">
            {features.standard.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#5A5854]">
                <Check size={13} strokeWidth={2} className="text-[#2A9D68] flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout("standard")}
            disabled={loading !== null}
            className="w-full border border-[#E0DDD6] bg-[#F5F2EC] hover:bg-[#EEEADF] text-[#1A1916] font-semibold text-[14px] py-3 rounded-[10px] transition-colors duration-150 disabled:opacity-40"
          >
            {loading === "standard" ? "..." : t("pricing.standard.cta")}
          </button>
        </div>

        {/* Premium */}
        <div className="bg-[#1A1916] rounded-[14px] p-5 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4 text-[10px] font-semibold text-[#8A8880] tracking-[0.08em] uppercase border border-[#3E3B37] px-2.5 py-1 rounded-[6px]">
            {t("pricing.premium.badge")}
          </div>

          <div className="mb-4 pr-20">
            <span className="text-[11px] font-semibold text-[#6E6C67] tracking-[0.1em] uppercase block mb-2">
              {t("pricing.premium.name")}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-normal text-[28px] text-white leading-none">
                {t("pricing.premium.price")}
              </span>
              <span className="text-[13px] text-[#5A5854] line-through">
                {t("pricing.premium.originalPrice")}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 mb-5">
            {features.premium.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#C8C5BF]">
                <Check size={13} strokeWidth={2} className="text-[#AA2C32] flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckout("premium")}
            disabled={loading !== null}
            className="w-full bg-white hover:bg-[#F5F2EC] text-[#1A1916] font-semibold text-[14px] py-3 rounded-[10px] transition-colors duration-150 disabled:opacity-40"
          >
            {loading === "premium" ? "..." : t("pricing.premium.cta")}
          </button>
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
        {Array.from({ length: 3 }, (_, i) => {
          const Icon = trustIcons[i];
          const text = t(`trust.${i}`);
          return (
            <span key={i} className="flex items-center gap-1.5 text-[11px] text-[#8A8880]">
              <Icon size={12} strokeWidth={1.75} className="text-[#8A8880] flex-shrink-0" />
              {text}
            </span>
          );
        })}
      </div>
    </section>
  );
}
