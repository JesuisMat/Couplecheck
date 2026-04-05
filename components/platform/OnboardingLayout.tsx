"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  onSkip?: () => void;
  skipLabel?: string;
  children: React.ReactNode;
}

export function OnboardingLayout({
  step,
  totalSteps,
  onSkip,
  skipLabel = "Passer",
  children,
}: OnboardingLayoutProps) {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto w-full">
        <Link
          href={`/${locale}`}
          className="font-display italic text-[17px] text-[var(--foreground)] tracking-tight"
        >
          CoupleCheck
        </Link>
        {onSkip && (
          <button
            onClick={onSkip}
            className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            {skipLabel}
          </button>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-2 pb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i + 1 === step ? 24 : 8,
              height: 8,
              backgroundColor:
                i + 1 <= step
                  ? "var(--primary)"
                  : "var(--border)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 pb-16">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}
