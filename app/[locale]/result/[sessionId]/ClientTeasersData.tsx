'use client';

import { TeasersSection } from '@/components/result/TeasersSection';

interface ClientTeasersDataProps {
  teasers: any[];
  predictionTeaser?: any;
  onUnlock: () => void;
  locale: 'fr' | 'en';
}

export function ClientTeasersData({ teasers, predictionTeaser, onUnlock, locale }: ClientTeasersDataProps) {
  return (
    <TeasersSection
      teasers={teasers}
      predictionTeaser={predictionTeaser ? predictionTeaser : undefined}
      onUnlock={onUnlock}
      locale={locale}
    />
  );
}