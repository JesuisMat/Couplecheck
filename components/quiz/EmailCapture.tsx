"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-[390px] animate-fade-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-4">
            {locale === "fr" ? "Résultats prêts" : "Results ready"}
          </p>
          <h1 className="font-display font-normal text-[30px] text-[#1A1916] mb-3 tracking-[-0.02em] leading-[1.15]">
            {t("title")}
          </h1>
          <p className="text-[14px] text-[#6E6C67] leading-[1.6]">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* First name */}
          <div>
            <label className="text-[12px] font-semibold text-[#5A5854] block mb-1.5 tracking-wide">
              {t("firstNameLabel")}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t("firstNamePlaceholder")}
              className="w-full bg-white border border-[#E0DDD6] focus:border-[#AA2C32] rounded-[10px] px-4 py-3 text-[14px] text-[#1A1916] placeholder:text-[#C8C5BF] outline-none transition-colors duration-150"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="text-[12px] text-[#AA2C32] mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[12px] font-semibold text-[#5A5854] block mb-1.5 tracking-wide">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full bg-white border border-[#E0DDD6] focus:border-[#AA2C32] rounded-[10px] px-4 py-3 text-[14px] text-[#1A1916] placeholder:text-[#C8C5BF] outline-none transition-colors duration-150"
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && (
              <p className="text-[12px] text-[#AA2C32] mt-1">{errors.email}</p>
            )}
          </div>

          {/* Newsletter */}
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <div
              onClick={() => setNewsletter(!newsletter)}
              className={`mt-0.5 w-4 h-4 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-all ${
                newsletter
                  ? "border-[#AA2C32] bg-[#AA2C32]"
                  : "border-[#C8C5BF]"
              }`}
            >
              {newsletter && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path
                    d="M1 3l1.8 2L7 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[13px] text-[#6E6C67] leading-[1.5]">
              {t("newsletter")}
            </span>
          </label>

          {errors.form && (
            <p className="text-[13px] text-[#AA2C32] text-center">{errors.form}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-[10px] disabled:opacity-40 transition-colors duration-150 flex items-center justify-center gap-2.5 mt-2"
          >
            {isSubmitting ? (
              <span className="opacity-70">Chargement...</span>
            ) : (
              <>
                {t("cta")}
                <ArrowRight size={16} strokeWidth={2} />
              </>
            )}
          </button>

          <p className="text-[11px] text-[#A8A6A2] text-center">
            {t("privacy")}
          </p>
        </form>
      </div>
    </div>
  );
}
