"use client";

import { useTranslations } from "next-intl";
import { PenLine, ChartNoAxesColumn, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const icons = [
  <PenLine size={18} strokeWidth={1.75} className="text-[#AA2C32]" />,
  <ChartNoAxesColumn size={18} strokeWidth={1.75} className="text-[#AA2C32]" />,
  <BookOpen size={18} strokeWidth={1.75} className="text-[#AA2C32]" />,
];

export function HowItWorks() {
  const t = useTranslations("landing.howItWorks");

  const steps = Array.from({ length: 3 }, (_, i) => ({
    number: t(`steps.${i}.number`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <section className="py-16 bg-[#EEEADF]">
      <div className="px-5 max-w-5xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-3">
            Processus
          </p>
          <h2 className="font-display font-normal text-[30px] md:text-[36px] text-[#1A1916] leading-[1.15] tracking-[-0.02em]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-[#D8D4CC]">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <div className="bg-[#EEEADF] p-8 h-full">
                <p className="font-display font-normal text-[52px] leading-none text-[#D8D4CC] mb-6 select-none">
                  0{i + 1}
                </p>
                <div className="flex items-center gap-2.5 mb-3">
                  {icons[i]}
                  <h3 className="font-semibold text-[15px] text-[#1A1916]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[13px] text-[#6E6C67] leading-[1.65]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
