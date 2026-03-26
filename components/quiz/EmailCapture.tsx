"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent, EVENTS } from "@/lib/posthog";

interface EmailCaptureProps {
  sessionId: string;
  onSuccess: (sessionId: string) => void;
}

export function EmailCapture({ sessionId, onSuccess }: EmailCaptureProps) {
  const locale = useLocale();
  const t = useTranslations("emailCapture");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = t("errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = t("errors.emailInvalid");
    if (!firstName) newErrors.firstName = t("errors.firstNameRequired");
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          email,
          firstName,
          newsletterConsent: newsletter,
          locale,
        }),
      });

      if (!response.ok) throw new Error("Failed to capture lead");

      trackEvent(EVENTS.EMAIL_SUBMITTED, {
        session_id: sessionId,
        newsletter_consent: newsletter,
        locale,
      });

      onSuccess(sessionId);
    } catch {
      setErrors({ form: "Une erreur est survenue. Réessaie." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-[390px] animate-fade-up">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#AA2C32] to-[#FF7574] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(170,44,50,0.25)]">
          <span className="text-2xl">🎉</span>
        </div>

        <h1 className="font-display font-bold text-[26px] text-[#2E2F2D] text-center mb-2 tracking-[-0.02em]">
          {t("title")}
        </h1>
        <p className="text-[14px] text-[#5B5C59] text-center mb-8 leading-[1.5]">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* First name */}
          <div>
            <label className="text-[13px] font-semibold text-[#2E2F2D] block mb-1.5">
              {t("firstNameLabel")}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t("firstNamePlaceholder")}
              className="w-full bg-[#FFFFFF] rounded-[16px] px-4 py-3.5 text-[14px] text-[#2E2F2D] placeholder:text-[#AEADAA] outline-none focus:ring-2 focus:ring-[#AA2C32]/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="text-[12px] text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[13px] font-semibold text-[#2E2F2D] block mb-1.5">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full bg-[#FFFFFF] rounded-[16px] px-4 py-3.5 text-[14px] text-[#2E2F2D] placeholder:text-[#AEADAA] outline-none focus:ring-2 focus:ring-[#AA2C32]/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && (
              <p className="text-[12px] text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Newsletter */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => setNewsletter(!newsletter)}
              className={`mt-0.5 w-5 h-5 rounded-[6px] border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                newsletter
                  ? "border-[#AA2C32] bg-[#AA2C32]"
                  : "border-[#AEADAA]"
              }`}
            >
              {newsletter && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4l2.5 2.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[13px] text-[#5B5C59] leading-[1.5]">
              {t("newsletter")}
            </span>
          </label>

          {errors.form && (
            <p className="text-[13px] text-red-500 text-center">{errors.form}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gradient w-full text-white font-semibold text-[16px] py-4 rounded-full shadow-[0_4px_20px_rgba(170,44,50,0.3)] disabled:opacity-50 active:scale-[0.98] transition-all mt-2"
          >
            {isSubmitting ? "Chargement..." : t("cta")}
          </button>

          <p className="text-[11px] text-[#AEADAA] text-center">
            {t("privacy")}
          </p>
        </form>
      </div>
    </div>
  );
}
