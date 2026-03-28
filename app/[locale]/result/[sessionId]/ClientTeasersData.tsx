'use client';

import { useRouter } from 'next/navigation';
import { TeasersSection } from '@/components/result/TeasersSection';

interface ClientTeasersDataProps {
  teasers: any[];
  predictionTeaser?: any;
  locale: 'fr' | 'en';
  sessionId: string;
}

export function ClientTeasersData({ teasers, predictionTeaser, locale, sessionId }: ClientTeasersDataProps) {
  const router = useRouter();

  const handleUnlock = () => {
    router.push(`/${locale}/result/${sessionId}/unlock`);
  };

  return (
    <TeasersSection
      teasers={teasers}
      predictionTeaser={predictionTeaser}
      onUnlock={handleUnlock}
      locale={locale}
    />
  );
}
