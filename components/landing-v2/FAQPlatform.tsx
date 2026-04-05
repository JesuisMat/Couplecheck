"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQPlatform() {
  const t = useTranslations("landingV2.faq");
  const items = t.raw("items") as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-5">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-normal italic text-[32px] md:text-[38px] text-[var(--foreground)] tracking-tight text-center mb-10">
          {t("title")}
        </h2>

        <div className="divide-y divide-[var(--border)]">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between py-4 text-left gap-4"
              >
                <span className="text-[15px] font-medium text-[var(--foreground)] leading-snug">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-[var(--muted-foreground)] mt-0.5 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="pb-4 -mt-1">
                  <p className="text-[14px] text-[#5A5854] leading-[1.7]">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
