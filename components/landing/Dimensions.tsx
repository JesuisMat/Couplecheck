"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, ShieldCheck, Heart, Scale, Feather, Rocket, Infinity } from "lucide-react";

const dimensionIcons = [
  <MessageCircle size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <ShieldCheck size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <Heart size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <Scale size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <Feather size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <Rocket size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
  <Infinity size={24} strokeWidth={1.5} className="text-[#AA2C32]" />,
];

export function Dimensions() {
  const t = useTranslations("landing.dimensions");

  const items = Array.from({ length: 7 }, (_, i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section className="py-14 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="md:flex md:items-end md:justify-between md:gap-8 mb-10">
          <div>
            <span className="text-[11px] font-bold text-[#AA2C32] tracking-[0.15em] uppercase block mb-2">
              Expertise
            </span>
            <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[#2E2F2D] tracking-[-0.02em]">
              {t("title")}
            </h2>
          </div>
          <p className="text-[13px] text-[#5B5C59] italic mt-3 md:mt-0 md:text-right max-w-xs leading-[1.6]">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(170,44,50,0.08)] hover:bg-[#FEFEFE] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F2F1EC] group-hover:bg-[#FFE5E5] flex items-center justify-center mb-3 transition-colors duration-200">
                {dimensionIcons[i]}
              </div>
              <h3 className="font-display font-semibold text-[14px] text-[#2E2F2D] mb-1">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#5B5C59] leading-[1.4]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
