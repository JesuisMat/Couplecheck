'use client';

import { useState } from 'react';
import { Lock, ChevronRight } from 'lucide-react';
import type { GeneratedTeaser } from '@/lib/teasers/generator';

interface TeaserCardProps {
  teaser: GeneratedTeaser;
  onUnlock: () => void;
}

export function TeaserCard({ teaser, onUnlock }: TeaserCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{teaser.icon}</span>
        <h3 className="font-semibold text-gray-900 text-lg">{teaser.title}</h3>
      </div>

      {/* Preview Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        {teaser.previewText}
      </p>

      {/* Locked Text (blurred) */}
      <div className="relative mb-4">
        <p className="text-gray-700 text-sm leading-relaxed blur-[6px] select-none pointer-events-none">
          {teaser.lockedText}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-gray-600 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Suite dans le rapport</span>
          </div>
        </div>
      </div>

      {/* Emotional Hook */}
      <p className="text-primary font-medium text-sm italic mb-4">
        "{teaser.emotionalHook}"
      </p>

      {/* CTA */}
      <button
        onClick={onUnlock}
        className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
          isHovered
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        {teaser.ctaText}
        <ChevronRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
      </button>
    </div>
  );
}
