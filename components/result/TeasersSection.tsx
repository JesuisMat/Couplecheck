'use client';

import { TeaserCard } from './TeaserCard';
import { PredictionCard } from './PredictionCard';
import type { GeneratedTeaser } from '@/lib/teasers/generator';
import { ArrowRight, FileText } from 'lucide-react';

interface TeasersSectionProps {
  teasers: GeneratedTeaser[];
  predictionTeaser?: any;
  onUnlock: () => void;
  locale: 'fr' | 'en';
}

const labels = {
  fr: {
    title: "Ce qu'on a découvert",
    subtitle: 'Aperçus personnalisés basés sur vos réponses',
    bottomCTA: 'Voir mon rapport complet',
    bottomSub: '15 pages · Plan d\'action · Analyse des 7 dimensions',
  },
  en: {
    title: 'What we discovered',
    subtitle: 'Personalized insights based on your answers',
    bottomCTA: 'See my full report',
    bottomSub: '15 pages · Action plan · 7-dimension analysis',
  },
};

export function TeasersSection({ teasers, predictionTeaser, onUnlock, locale }: TeasersSectionProps) {
  const regularTeasers = teasers.filter((t) => t.type !== 'prediction');
  const l = labels[locale];

  return (
    <section className="px-5 mt-6">
      {/* Section header */}
      <div className="mb-5">
        <h2 className="font-display font-bold text-[20px] text-[#2E2F2D]">{l.title}</h2>
        <p className="text-[13px] text-[#5B5C59] mt-1">{l.subtitle}</p>
      </div>

      <div className="space-y-4">
        {regularTeasers.map((teaser) => (
          <TeaserCard key={teaser.id} teaser={teaser} onUnlock={onUnlock} />
        ))}
      </div>

      {predictionTeaser && (
        <div className="mt-4">
          <PredictionCard teaser={predictionTeaser} onUnlock={onUnlock} />
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-6 mb-8">
        <button
          onClick={onUnlock}
          className="w-full bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-[10px] flex items-center justify-center gap-2.5 transition-colors duration-150"
        >
          <FileText className="w-5 h-5 flex-shrink-0" />
          {l.bottomCTA}
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </button>
        <p className="text-center text-[12px] text-[#5B5C59] mt-2.5">{l.bottomSub}</p>
      </div>
    </section>
  );
}
