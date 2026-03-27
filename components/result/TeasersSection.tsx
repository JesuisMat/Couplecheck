'use client';

import { TeaserCard } from './TeaserCard';
import { PredictionCard } from './PredictionCard';
import type { GeneratedTeaser } from '@/lib/teasers/generator';

interface TeasersSectionProps {
  teasers: GeneratedTeaser[];
  predictionTeaser?: any;
  onUnlock: () => void;
  locale: 'fr' | 'en';
}

export function TeasersSection({ teasers, predictionTeaser, onUnlock, locale }: TeasersSectionProps) {
  const regularTeasers = teasers.filter(t => t.type !== 'prediction');

  const titles = {
    fr: "🔍 Ce que nous avons découvert sur ton couple",
    en: "🔍 What we discovered about your relationship",
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {titles[locale]}
      </h2>

      <div className="space-y-4">
        {regularTeasers.map((teaser, i) => (
          <TeaserCard
            key={teaser.id}
            teaser={teaser}
            onUnlock={onUnlock}
          />
        ))}
      </div>

      {/* Prediction Card */}
      {predictionTeaser && (
        <div className="mt-6">
          <PredictionCard
            teaser={predictionTeaser}
            onUnlock={onUnlock}
          />
        </div>
      )}
    </section>
  );
}
