'use client';

import { Lock, ArrowRight, TrendingUp, Unlock } from 'lucide-react';

interface PredictionCardProps {
  teaser: any;
  onUnlock: () => void;
}

export function PredictionCard({ teaser, onUnlock }: PredictionCardProps) {
  return (
    <div className="relative rounded-[12px] overflow-hidden border border-[#3A3734]">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#1A1916]" />

      <div className="relative p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5 border border-[#3A3734] rounded-[6px] px-3 py-1">
            <TrendingUp size={11} strokeWidth={1.75} className="text-[#6E6C67]" />
            <span className="text-[10px] font-semibold text-[#6E6C67] tracking-[0.12em] uppercase">
              {teaser.subtitle ?? 'Prédiction'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-[8px] border border-[#3A3734] flex items-center justify-center">
            <TrendingUp size={15} strokeWidth={1.75} className="text-[#AA2C32]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-normal text-[18px] text-white leading-snug mb-4">
          {teaser.title}
        </h3>

        {/* Preview text */}
        <p className="text-[13px] text-[#C8C5BF] leading-relaxed mb-3">
          {teaser.preview ?? teaser.previewText}
        </p>

        {/* Locked text */}
        <div className="relative rounded-[8px] overflow-hidden mb-5 border border-[#2E2B27]">
          <p className="text-[13px] text-[#6E6C67] leading-relaxed px-3 py-3 blur-[5px] select-none pointer-events-none">
            {teaser.locked ?? teaser.lockedText}
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1.5 border border-[#3A3734] rounded-[8px] px-3 py-1.5">
              <Lock size={11} strokeWidth={1.75} className="text-[#6E6C67]" />
              <span className="text-[11px] text-[#C8C5BF] font-medium">Contenu verrouillé</span>
            </div>
          </div>
        </div>

        {/* Prediction bars */}
        {teaser.predictions?.length > 0 && (
          <div className="space-y-3 mb-6">
            {teaser.predictions.map((pred: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-[4px] border border-[#3A3734] flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={10} strokeWidth={1.75} className="text-[#6E6C67]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-[#8A8880] leading-tight">{pred.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] font-bold text-white/25 blur-[3px] select-none">??%</span>
                      <Lock size={10} strokeWidth={1.75} className="text-[#3A3734]" />
                    </div>
                  </div>
                  <div className="h-[3px] bg-[#2E2B27] rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-[#3A3734] rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emotional hook */}
        <p className="text-[12px] italic text-[#8A8880] text-center mb-5 leading-relaxed px-2">
          &ldquo;{teaser.emotionalHook}&rdquo;
        </p>

        {/* CTA */}
        <button
          onClick={onUnlock}
          className="w-full bg-white hover:bg-[#F5F2EC] text-[#1A1916] font-semibold text-[14px] py-3.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors duration-150"
        >
          <Unlock size={14} strokeWidth={1.75} />
          {teaser.ctaText}
          <ArrowRight size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
