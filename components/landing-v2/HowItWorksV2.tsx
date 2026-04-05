"use client";

import { useTranslations } from "next-intl";

export function HowItWorksV2() {
  const t = useTranslations("landingV2.howItWorks");
  const steps = t.raw("steps") as Array<{ num: string; title: string; desc: string }>;

  return (
    <section className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-normal italic text-[32px] md:text-[38px] text-[var(--foreground)] tracking-tight text-center mb-12">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-50%] h-px bg-[var(--border)]" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] border-2 border-[var(--primary)] flex items-center justify-center mb-4 relative z-10">
                  <span className="font-display font-semibold text-[14px] text-[var(--primary)]">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-[16px] text-[var(--foreground)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#5A5854] leading-[1.65]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
