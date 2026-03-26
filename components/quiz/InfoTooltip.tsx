"use client";

import { useState, useCallback } from "react";

interface InfoTooltipProps {
  hint: string;
}

export function InfoTooltip({ hint }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <span className="relative inline-flex items-center ml-2">
      <button
        onClick={toggle}
        className="w-5 h-5 rounded-full bg-[#E9E8E4] flex items-center justify-center hover:bg-[#DEDDD8] transition-colors flex-shrink-0"
        aria-label="Plus d'informations"
        aria-expanded={open}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <circle cx="4.5" cy="4.5" r="4.5" fill="transparent" />
          <path
            d="M4.5 2v.5M4.5 4.5V7"
            stroke="#5B5C59"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Tooltip card */}
          <div className="absolute left-0 top-7 z-50 w-64 animate-scale-in">
            <div className="glass rounded-[16px] p-4 shadow-[0_8px_32px_rgba(46,47,45,0.12)] border border-[#DEDDD8]/50">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M4.5 2v.5M4.5 4.5V7" stroke="#AA2C32" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[12px] text-[#5B5C59] leading-[1.5]">{hint}</p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -top-1.5 left-3 w-3 h-3 bg-[#F8F6F2] border-l border-t border-[#DEDDD8]/50 rotate-45" />
          </div>
        </>
      )}
    </span>
  );
}
