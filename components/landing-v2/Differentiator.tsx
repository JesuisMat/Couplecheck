"use client";

import { useTranslations } from "next-intl";

export function Differentiator() {
  const t = useTranslations("landingV2.differentiator");
  const items = t.raw("items") as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-normal italic text-[32px] md:text-[38px] text-[var(--foreground)] tracking-tight mb-3">
            {t("title")}
          </h2>
          <p className="text-[16px] text-[#5A5854]">{t("sub")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--background)] rounded-[12px] border border-[var(--border)] p-6"
            >
              <div className="text-[28px] mb-4">{item.icon}</div>
              <h3 className="font-semibold text-[16px] text-[var(--foreground)] mb-2">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#5A5854] leading-[1.65]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
