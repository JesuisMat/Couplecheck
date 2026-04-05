"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DangerZoneButton } from "@/components/platform/settings/DangerZoneButton";

export function BillingActions() {
  const t = useTranslations("settings.billing");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-4">
        <DangerZoneButton
          label={t("cancelSubscription")}
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-[400px] bg-white rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-[var(--border)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-normal text-[18px] text-[var(--foreground)] mb-2">
              {t("cancelConfirmTitle")}
            </h2>
            <p className="text-[13px] text-[var(--muted-foreground)] mb-5 leading-relaxed">
              {t("cancelConfirmDesc")}
            </p>
            <div className="flex flex-col gap-2">
              <button
                className="w-full border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium py-2.5 rounded-full hover:bg-[var(--muted)] transition-colors"
                onClick={() => setShowModal(false)}
              >
                {t("cancelPause")}
              </button>
              <button
                className="w-full bg-[var(--destructive)] text-white text-[13px] font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                {t("cancelCta")}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-center py-1"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
