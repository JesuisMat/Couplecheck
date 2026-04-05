"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

function getPasswordStrength(password: string): 0 | 1 | 2 | 3 {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as 0 | 1 | 2 | 3;
}

export default function RegisterPage() {
  const locale = useLocale();
  const t = useTranslations("auth.register");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = [
    "",
    t("passwordStrength.weak"),
    t("passwordStrength.medium"),
    t("passwordStrength.strong"),
  ];
  const strengthColors = ["", "#EF4444", "#F59E0B", "#22C55E"];

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = t("errors.firstNameRequired");
    if (!email.trim()) e.email = t("errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = t("errors.emailInvalid");
    if (password.length < 8) e.password = t("errors.passwordMin");
    if (password !== confirmPassword)
      e.confirmPassword = t("errors.passwordMismatch");
    if (!rgpd) e.rgpd = t("errors.rgpdRequired");
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setErrors({ generic: t("errors.generic") });
    } else {
      setSuccess(true);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5">
        <div className="w-full max-w-[420px] text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-display italic text-[22px] text-[var(--foreground)] mb-2">
            CoupleCheck
          </p>
          <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed">
            {t("success")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="block text-center font-display italic text-[20px] text-[var(--foreground)] mb-8 tracking-tight"
        >
          CoupleCheck
        </Link>

        {/* Card */}
        <div className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[var(--border)] p-8">
          <h1 className="font-display font-normal text-[24px] text-[var(--foreground)] mb-6 tracking-tight">
            {t("title")}
          </h1>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[var(--border)] rounded-full py-3 px-5 text-[14px] font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-150 mb-5 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "..." : t("googleBtn")}
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-[12px] text-[var(--muted-foreground)]">{t("or")}</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* First name */}
            <div>
              <label className="block text-[13px] font-medium text-[var(--foreground)] mb-1.5">
                {t("firstNameLabel")}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t("firstNamePlaceholder")}
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
              />
              {errors.firstName && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.firstName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-[var(--foreground)] mb-1.5">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-medium text-[var(--foreground)] mb-1.5">
                {t("passwordLabel")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 pr-10 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength indicator */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor:
                            passwordStrength >= i
                              ? strengthColors[passwordStrength]
                              : "#E0DDD6",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px]" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[13px] font-medium text-[var(--foreground)] mb-1.5">
                {t("confirmPasswordLabel")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirmPasswordPlaceholder")}
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.confirmPassword}</p>
              )}
            </div>

            {/* RGPD */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={rgpd}
                  onChange={(e) => setRgpd(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4.5 h-4.5 rounded-[4px] border transition-colors duration-150 flex items-center justify-center ${
                    rgpd
                      ? "bg-[var(--primary)] border-[var(--primary)]"
                      : "bg-white border-[var(--border)]"
                  }`}
                  style={{ width: 18, height: 18 }}
                >
                  {rgpd && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[13px] text-[var(--muted-foreground)] leading-snug">
                {t("rgpdLabel")}
              </span>
            </label>
            {errors.rgpd && (
              <p className="text-[12px] text-[var(--destructive)]">{errors.rgpd}</p>
            )}

            {errors.generic && (
              <div className="rounded-[8px] bg-red-50 border border-red-200 px-3.5 py-2.5 text-[13px] text-red-600">
                {errors.generic}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[14px] py-3 rounded-full transition-colors duration-150 disabled:opacity-60 mt-1"
            >
              {loading ? "..." : t("cta")}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[13px] text-[var(--muted-foreground)] mt-5">
          {t("loginLink")}{" "}
          <Link
            href={`/${locale}/platform/login`}
            className="text-[var(--primary)] font-medium hover:underline"
          >
            {t("loginLinkAnchor")}
          </Link>
        </p>
      </div>
    </div>
  );
}
