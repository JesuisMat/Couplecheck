"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Check, MessageSquare, Calendar, Zap, Loader2 } from "lucide-react";

interface SubscribeClientProps {
  locale: string;
  accessType: string;
  messagesUsed: number;
  trialEnd: string | null;
  conversationsCount: number;
  checkupsCount: number;
}

export function SubscribeClient({
  accessType,
  messagesUsed,
  trialEnd,
  conversationsCount,
  checkupsCount,
}: SubscribeClientProps) {
  const locale = useLocale();
  const hasAccess = ["trial", "subscription", "early_adopter"].includes(accessType);
  const [loading, setLoading] = useState(false);
  const isFr = locale === "fr";

  const trialEndDate = trialEnd
    ? new Date(trialEnd).toLocaleDateString(isFr ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const benefits = isFr
    ? [
        "60 messages IA par mois — réinitialisation le 1er",
        "Checkup mensuel de ta relation",
        "Mémoire relationnelle persistante",
        "Contexte personnalisé (quiz, onboarding, historique)",
        "Accès illimité à l'historique",
        "Support prioritaire",
      ]
    : [
        "60 AI messages per month — reset on the 1st",
        "Monthly relationship checkup",
        "Persistent relational memory",
        "Personalized context (quiz, onboarding, history)",
        "Unlimited history access",
        "Priority support",
      ];

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">
          {isFr ? "Continuer l'aventure" : "Keep the journey going"}
        </p>
        <h1 className="font-display italic text-[32px] text-[var(--foreground)] tracking-tight leading-tight mb-3">
          {isFr
            ? "Tu as déjà bien avancé."
            : "You've already made real progress."}
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed">
          {isFr
            ? "Continue à travailler sur ta relation avec un accompagnement au quotidien."
            : "Keep working on your relationship with daily support."}
        </p>
      </div>

      {/* Usage stats */}
      {(messagesUsed > 0 || conversationsCount > 0 || checkupsCount > 0) && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {messagesUsed > 0 && (
            <div className="bg-white border border-[var(--border)] rounded-[12px] p-4 text-center">
              <MessageSquare
                size={18}
                className="mx-auto mb-1.5 text-[var(--primary)]"
              />
              <p className="text-[22px] font-semibold text-[var(--foreground)]">
                {messagesUsed}
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {isFr ? "messages échangés" : "messages sent"}
              </p>
            </div>
          )}
          {conversationsCount > 0 && (
            <div className="bg-white border border-[var(--border)] rounded-[12px] p-4 text-center">
              <Zap size={18} className="mx-auto mb-1.5 text-[var(--primary)]" />
              <p className="text-[22px] font-semibold text-[var(--foreground)]">
                {conversationsCount}
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {isFr ? "conversations" : "conversations"}
              </p>
            </div>
          )}
          {checkupsCount > 0 && (
            <div className="bg-white border border-[var(--border)] rounded-[12px] p-4 text-center">
              <Calendar
                size={18}
                className="mx-auto mb-1.5 text-[var(--primary)]"
              />
              <p className="text-[22px] font-semibold text-[var(--foreground)]">
                {checkupsCount}
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {isFr ? "checkups" : "checkups"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pricing card */}
      <div className="bg-white border border-[var(--border)] rounded-[16px] shadow-soft p-6 mb-6">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[40px] font-bold text-[var(--foreground)]">
            7,99€
          </span>
          <span className="text-[15px] text-[var(--muted-foreground)]">
            {isFr ? "/ mois" : "/ month"}
          </span>
        </div>
        <p className="text-[13px] text-[var(--muted-foreground)] mb-5">
          {isFr ? "Sans engagement — résiliable à tout moment" : "No commitment — cancel anytime"}
        </p>

        <ul className="space-y-2.5 mb-6">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <Check
                size={15}
                className="text-[var(--primary)] mt-0.5 flex-shrink-0"
              />
              <span className="text-[14px] text-[var(--foreground)]">{b}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white text-[15px] font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            isFr ? "S'abonner maintenant" : "Subscribe now"
          )}
        </button>

        {trialEndDate && (
          <p className="text-center text-[12px] text-[var(--muted-foreground)] mt-3">
            {isFr
              ? `Accès trial jusqu'au ${trialEndDate}`
              : `Trial access until ${trialEndDate}`}
          </p>
        )}
      </div>

      {/* Skip link — only shown if user already has access (trial) */}
      {hasAccess && (
        <p className="text-center text-[13px] text-[var(--muted-foreground)]">
          <a
            href={`/${locale}/platform/chat`}
            className="hover:text-[var(--foreground)] underline underline-offset-2 transition-colors"
          >
            {isFr ? "Continuer avec mon accès actuel" : "Continue with my current access"}
          </a>
        </p>
      )}
    </div>
  );
}
