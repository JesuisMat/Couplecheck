"use client";

import { useTranslations } from "next-intl";
import { PenLine, ChartNoAxesColumn, BookOpen } from "lucide-react";

const icons = [
  <PenLine size={22} strokeWidth={1.75} className="text-[#AA2C32]" />,
  <ChartNoAxesColumn size={22} strokeWidth={1.75} className="text-[#AA2C32]" />,
  <BookOpen size={22} strokeWidth={1.75} className="text-[#AA2C32]" />,
];

export function HowItWorks() {
  const t = useTranslations("landing.howItWorks");

  const steps = Array.from({ length: 3 }, (_, i) => ({
    number: t(`steps.${i}.number`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <section className="py-14 bg-[#F2F1EC]">
      <div className="px-5 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#AA2C32] tracking-[0.15em] uppercase block mb-2">
            Processus
          </span>
          <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[#2E2F2D] tracking-[-0.02em]">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              {/* Large background number */}
              <span className="absolute -right-2 -top-3 text-[80px] font-black text-[#F2F1EC] font-display leading-none select-none">
                {i + 1}
              </span>

              <div className="w-11 h-11 bg-[#FFE5E5] rounded-full flex items-center justify-center mb-5 relative z-10">
                {icons[i]}
              </div>
              <h3 className="font-display font-semibold text-[16px] text-[#2E2F2D] mb-2 relative z-10">
                {step.title}
              </h3>
              <p className="text-[13px] text-[#5B5C59] leading-[1.6] relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
