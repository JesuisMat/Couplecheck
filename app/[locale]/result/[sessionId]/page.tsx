import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { ScoreGauge } from '@/components/result/ScoreGauge';
import { StrengthsList } from '@/components/result/StrengthsList';
import { RisksTeaser } from '@/components/result/RisksTeaser';
import { PricingCards } from '@/components/result/PricingCards';
import { DimensionScores } from '@/types/quiz';
import { trackEvent, EVENTS } from '@/lib/posthog';
import Link from 'next/link';
import { generatePersonalizedTeasers } from '@/lib/teasers/generator';
import { predictionTeaser } from '@/config/teasers/prediction';
import { GeneratedTeaser, UserContext } from '@/lib/teasers/generator';
import { ClientTeasersData } from './ClientTeasersData';

interface Props {
  params: Promise<{ locale: string; sessionId: string }>;
}

interface ServerResult {
  teasers: GeneratedTeaser[];
  predictionTeaser?: any;
  sessionId: string;
  scores: DimensionScores;
  globalScore: number;
  locale: string;
}

// Server component to fetch data and generate teasers
async function getResultData(params: { locale: string; sessionId: string }): Promise<ServerResult> {
  const { locale, sessionId } = params;

  const supabase = createAdminClient();
  const { data: session, error } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error || !session || !session.scores) {
    notFound();
  }

  const scores = session.scores as DimensionScores;
  const globalScore = session.global_score as number;

  // Construire le contexte utilisateur pour les teasers
  const context: UserContext = {
    ageRange: session.age_range,
    gender: session.gender,
    relationshipDuration: session.relationship_duration,
    relationshipStatus: session.relationship_status,
    scores: scores,
    globalScore: globalScore,
    answers: session.answers || {},
    painPoints: session.pain_points || [],
    changeWish: session.change_wish || '',
    locale: (locale as 'fr' | 'en') || 'fr',
  };

  // Générer les teasers personnalisés
  const teasers = generatePersonalizedTeasers(context);

  // Prediction teaser (si score < 85)
  const predictionTeaserData = globalScore < 85 ? predictionTeaser[locale as 'fr' | 'en'] : undefined;

  return {
    teasers,
    predictionTeaser: predictionTeaserData,
    sessionId,
    scores,
    globalScore,
    locale,
  };
}

export default async function ResultPage({ params }: Props) {
  const { locale, sessionId } = await params;
  const result = await getResultData({ locale, sessionId });

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="max-w-[390px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            href={`/${result.locale}`}
            className="font-display font-bold text-[18px] text-[#AA2C32]"
          >
            CoupleCheck
          </Link>
        </div>
      </div>

      <div className="max-w-[390px] mx-auto">
        {/* Score gauge */}
        <div className="px-5">
          <ScoreGauge score={result.globalScore} />
        </div>

        {/* Strengths */}
        <StrengthsList scores={result.scores} />

        {/* Risks (teaser) */}
        <RisksTeaser scores={result.scores} />

        {/* Teasers personnalisés */}
        <ClientTeasersData
          teasers={result.teasers}
          predictionTeaser={result.predictionTeaser}
          onUnlock={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth'})}
          locale={result.locale as 'fr' | 'en'}
        />

        {/* Pricing */}
        <PricingCards sessionId={result.sessionId} />
      </div>
    </main>
  );
}