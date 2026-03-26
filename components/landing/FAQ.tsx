"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

export function FAQ() {
  const t = useTranslations("landing.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = Array.from({ length: 5 }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section className="py-14 bg-[#F2F1EC]/50">
      <div className="px-5 max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[#2E2F2D] tracking-[-0.02em] mb-8 text-center">
          {t("title")}
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-[14px] text-[#2E2F2D] pr-4 leading-[1.4]">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full bg-[#F2F1EC] flex items-center justify-center transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  <Plus size={13} strokeWidth={2} className="text-[#5B5C59]" />
                </span>
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="text-[13px] text-[#5B5C59] leading-[1.6]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
