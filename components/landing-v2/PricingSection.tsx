"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export function PricingSection() {
  const locale = useLocale();
  const t = useTranslations("landingV2.pricing");
  const plans = t.raw("plans") as PricingPlan[];
  const badge = t("badge");

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-normal italic text-[32px] md:text-[38px] text-[var(--foreground)] tracking-tight text-center mb-12">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[12px] border p-6 flex flex-col relative ${
                plan.highlight
                  ? "border-[var(--primary)] shadow-[0_8px_32px_rgba(170,44,50,0.12)] -mt-4"
                  : "border-[var(--border)] bg-[var(--background)]"
              }`}
              style={{ backgroundColor: plan.highlight ? "white" : undefined }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--primary)] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-[12px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display font-semibold text-[32px] text-[var(--foreground)]">
                    {plan.price}
                  </span>
                </div>
                <p className="text-[12px] text-[var(--muted-foreground)]">{plan.period}</p>
                <p className="text-[13px] text-[#5A5854] mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-[var(--foreground)]">
                    <Check size={14} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/quiz`}
                className={`w-full text-center font-semibold text-[14px] py-3 rounded-full transition-colors duration-150 ${
                  plan.highlight
                    ? "bg-[var(--primary)] hover:bg-[#922226] text-white"
                    : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
