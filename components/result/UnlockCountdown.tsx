"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

export function UnlockCountdown({ locale }: { locale: string }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cc_offer_deadline");
      if (stored) {
        const deadline = parseInt(stored, 10);
        const now = Date.now();
        if (now < deadline) return Math.floor((deadline - now) / 1000);
        return 0;
      }
      const deadline = Date.now() + 25 * 60 * 1000;
      localStorage.setItem("cc_offer_deadline", deadline.toString());
      return 25 * 60;
    }
    return 25 * 60;
  });

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === 0) return null;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5">
      <Timer size={12} strokeWidth={1.75} className="text-[#AA2C32]" />
      <span className="text-[11px] text-[#5A5854]">
        {locale === "fr" ? "Offre expire dans" : "Offer expires in"}
      </span>
      <span className="font-mono font-semibold text-[12px] text-[#AA2C32] tabular-nums">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    </div>
  );
}
