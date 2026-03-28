"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const t = useTranslations("landing.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = Array.from({ length: 5 }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section className="py-16 bg-[#EEEADF]">
      <div className="px-5 max-w-2xl mx-auto">
        <Reveal className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-3 text-center">
            Questions
          </p>
          <h2 className="font-display font-normal text-[30px] md:text-[36px] text-[#1A1916] tracking-[-0.02em] text-center leading-[1.15]">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={100}>
          <div className="border-t border-[#D8D4CC]">
            {items.map((item, i) => (
              <div key={i} className="border-b border-[#D8D4CC]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-medium text-[14px] text-[#1A1916] leading-[1.5]">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-[#AA2C32]">
                    {openIndex === i
                      ? <Minus size={16} strokeWidth={1.75} />
                      : <Plus size={16} strokeWidth={1.75} />
                    }
                  </span>
                </button>

                {openIndex === i && (
                  <div className="pb-5 animate-fade-in">
                    <p className="text-[13px] text-[#6E6C67] leading-[1.7]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
