'use client';

import { Lock, ArrowRight, MessageCircle, AlertTriangle, Layers, Repeat, Eye, User, TrendingUp } from 'lucide-react';
import type { GeneratedTeaser } from '@/lib/teasers/generator';

interface TeaserCardProps {
  teaser: GeneratedTeaser;
  onUnlock: () => void;
}

const typeIcons: Record<GeneratedTeaser['type'], React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  response: MessageCircle,
  pain_point: AlertTriangle,
  combination: Layers,
  paradox: Repeat,
  hidden_insight: Eye,
  profile: User,
  prediction: TrendingUp,
};

export function TeaserCard({ teaser, onUnlock }: TeaserCardProps) {
  const Icon = typeIcons[teaser.type] ?? Eye;

  return (
    <div className="bg-white rounded-[12px] overflow-hidden border border-[#E0DDD6]">
      <div className="p-5">
        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-[8px] border border-[#E0DDD6] bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
            <Icon size={16} strokeWidth={1.75} className="text-[#AA2C32]" />
          </div>
          <h3 className="font-display font-normal text-[16px] text-[#1A1916] leading-snug pt-1 flex-1">
            {teaser.title}
          </h3>
        </div>

        {/* Preview text */}
        <p className="text-[13px] text-[#5A5854] leading-relaxed mb-4">
          {teaser.previewText}
        </p>

        {/* Locked section */}
        <div className="relative rounded-[8px] overflow-hidden mb-4 bg-[#F5F2EC] border border-[#E0DDD6]">
          <p className="text-[13px] text-[#5A5854] leading-relaxed p-4 blur-[5px] select-none pointer-events-none">
            {teaser.lockedText}
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1.5 bg-white border border-[#E0DDD6] rounded-[8px] px-3.5 py-2">
              <Lock size={12} strokeWidth={1.75} className="text-[#AA2C32]" />
              <span className="text-[12px] font-semibold text-[#1A1916]">Réservé au rapport</span>
            </div>
          </div>
        </div>

        {/* Emotional hook */}
        <p className="text-[12px] italic text-[#AA2C32] text-center mb-4 leading-relaxed px-2">
          &ldquo;{teaser.emotionalHook}&rdquo;
        </p>

        {/* CTA */}
        <button
          onClick={onUnlock}
          className="w-full bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[14px] py-3 rounded-[10px] flex items-center justify-center gap-2 transition-colors duration-150"
        >
          {teaser.ctaText}
          <ArrowRight size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
