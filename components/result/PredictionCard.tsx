'use client';

import { Lock } from 'lucide-react';

interface PredictionCardProps {
  teaser: any;
  onUnlock: () => void;
}

export function PredictionCard({ teaser, onUnlock }: PredictionCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">{teaser.icon}</span>
        <h3 className="font-semibold text-gray-900">{teaser.title}</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">{teaser.subtitle}</p>

      {/* Preview Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        {teaser.previewText}
      </p>

      {/* Locked Text */}
      <p className="text-gray-700 text-sm leading-relaxed blur-[6px] select-none mb-6">
        {teaser.lockedText}
      </p>

      {/* Prediction Bars */}
      <div className="space-y-4 mb-6">
        {teaser.predictions.map((pred: any, i: number) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{pred.icon}</span>
                <span className="text-sm text-gray-700">{pred.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-gray-300 blur-sm">??%</span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Progress bar placeholder */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gray-300 rounded-full blur-sm" />
            </div>
          </div>
        ))}
      </div>

      {/* Emotional Hook */}
      <p className="text-primary font-medium text-sm italic text-center mb-4">
        "{teaser.emotionalHook}"
      </p>

      {/* CTA */}
      <button
        onClick={onUnlock}
        className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        {'\u{1F511}'} {teaser.ctaText}
      </button>
    </div>
  );
}
