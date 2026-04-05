"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, X } from "lucide-react";

export function LoginClient() {
  const locale = useLocale();
  const t = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error") === "oauth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Magic link modal
  const [showMagicModal, setShowMagicModal] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicSuccess, setMagicSuccess] = useState(false);
  const [magicError, setMagicError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = t("errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = t("errors.emailInvalid");
    if (!password) e.password = t("errors.passwordRequired");
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setErrors({
        generic:
          error.message.includes("Invalid login")
            ? t("errors.invalidCredentials")
            : t("errors.generic"),
      });
    } else {
      // Let auth/callback-style redirect happen via the platform middleware
      router.push(`/${locale}/platform/chat`);
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

  async function handleMagicLink(ev: React.FormEvent) {
    ev.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(magicEmail)) {
      setMagicError(t("errors.emailInvalid"));
      return;
    }
    setMagicError("");
    setMagicLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: magicEmail,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setMagicLoading(false);
    if (error) {
      setMagicError(t("errors.generic"));
    } else {
      setMagicSuccess(true);
    }
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

        {/* OAuth error banner */}
        {oauthError && (
          <div className="mb-4 rounded-[8px] bg-red-50 border border-red-200 px-3.5 py-2.5 text-[13px] text-red-600">
            {t("errors.generic")}
          </div>
        )}

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
                autoComplete="email"
                className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-[var(--foreground)]">
                  {t("passwordLabel")}
                </label>
                <button
                  type="button"
                  onClick={() => { setShowMagicModal(true); setMagicEmail(email); }}
                  className="text-[12px] text-[var(--primary)] hover:underline"
                >
                  {t("forgotPassword")}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="current-password"
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
              {errors.password && (
                <p className="mt-1 text-[12px] text-[var(--destructive)]">{errors.password}</p>
              )}
            </div>

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
          {t("registerLink")}{" "}
          <Link
            href={`/${locale}/platform/register`}
            className="text-[var(--primary)] font-medium hover:underline"
          >
            {t("registerLinkAnchor")}
          </Link>
        </p>
      </div>

      {/* Magic link modal */}
      {showMagicModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5"
          onClick={() => setShowMagicModal(false)}
        >
          <div
            className="w-full max-w-[380px] bg-white rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-[var(--border)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-display font-normal text-[18px] text-[var(--foreground)]">
                {t("magicLinkTitle")}
              </h2>
              <button
                onClick={() => setShowMagicModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors -mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            {magicSuccess ? (
              <p className="text-[14px] text-[var(--muted-foreground)] leading-relaxed">
                {t("magicLinkSuccess")}
              </p>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-3">
                <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">
                  {t("magicLinkDesc")}
                </p>
                <input
                  type="email"
                  value={magicEmail}
                  onChange={(e) => setMagicEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-[8px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 transition-shadow"
                />
                {magicError && (
                  <p className="text-[12px] text-[var(--destructive)]">{magicError}</p>
                )}
                <button
                  type="submit"
                  disabled={magicLoading}
                  className="w-full bg-[var(--primary)] hover:bg-[#922226] text-white font-semibold text-[14px] py-2.5 rounded-full transition-colors duration-150 disabled:opacity-60"
                >
                  {magicLoading ? "..." : t("magicLinkCta")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
