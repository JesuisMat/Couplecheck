"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, ShieldCheck, Heart, Scale, Feather, Rocket, Infinity } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const dimensionIcons = [
  <MessageCircle size={16} strokeWidth={1.75} />,
  <ShieldCheck size={16} strokeWidth={1.75} />,
  <Heart size={16} strokeWidth={1.75} />,
  <Scale size={16} strokeWidth={1.75} />,
  <Feather size={16} strokeWidth={1.75} />,
  <Rocket size={16} strokeWidth={1.75} />,
  <Infinity size={16} strokeWidth={1.75} />,
];

export function Dimensions() {
  const t = useTranslations("landing.dimensions");

  const items = Array.from({ length: 7 }, (_, i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section className="py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <Reveal className="md:flex md:items-end md:justify-between md:gap-12 mb-10">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-3">
              Expertise
            </p>
            <h2 className="font-display font-normal text-[30px] md:text-[36px] text-[#1A1916] leading-[1.15] tracking-[-0.02em]">
              {t("title")}
            </h2>
          </div>
          <p className="text-[13px] text-[#8A8880] mt-3 md:mt-0 md:text-right max-w-xs leading-[1.65]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="border-t border-[#E0DDD6]">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 60} direction="up">
              <div className="flex items-start gap-6 py-5 border-b border-[#E0DDD6] group hover:bg-white transition-colors duration-150">
                <span className="font-display font-normal text-[13px] text-[#C8C5BF] w-8 flex-shrink-0 pt-0.5 tabular-nums">
                  0{i + 1}
                </span>
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-[#AA2C32] mt-0.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    {dimensionIcons[i]}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#1A1916] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#8A8880] leading-[1.55]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
