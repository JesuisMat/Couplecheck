import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { ScoreGauge } from '@/components/result/ScoreGauge';
import { StrengthsList } from '@/components/result/StrengthsList';
import { RisksTeaser } from '@/components/result/RisksTeaser';
import { DimensionScores } from '@/types/quiz';
import { generatePersonalizedTeasers } from '@/lib/teasers/generator';
import { predictionTeaser } from '@/config/teasers/prediction';
import { GeneratedTeaser, UserContext } from '@/lib/teasers/generator';
import { ClientTeasersData } from './ClientTeasersData';
import Link from 'next/link';

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

  // Use the session's original locale for teaser content (teaser files only have fr content)
  const teaserLocale = (session.locale as 'fr' | 'en') || 'fr';

  const context: UserContext = {
    ageRange: session.age_range,
    gender: session.gender,
    relationshipDuration: session.relationship_duration,
    relationshipStatus: session.relationship_status,
    scores,
    globalScore,
    answers: session.answers || {},
    painPoints: session.pain_points || [],
    changeWish: session.change_wish || '',
    locale: teaserLocale,
  };

  const teasers = generatePersonalizedTeasers(context);
  const predictionTeaserData = globalScore < 85 ? predictionTeaser[locale as 'fr' | 'en'] : undefined;

  return { teasers, predictionTeaser: predictionTeaserData, sessionId, scores, globalScore, locale };
}

const heroLabels = {
  fr: {
    badge: 'Analyse complète',
    heading: 'Voici les résultats\nde votre couple',
    sub: 'Basé sur vos 20 réponses · 7 dimensions analysées',
  },
  en: {
    badge: 'Full analysis',
    heading: 'Here are your\ncouple\'s results',
    sub: 'Based on your 20 answers · 7 dimensions analyzed',
  },
};

export default async function ResultPage({ params }: Props) {
  const { locale, sessionId } = await params;
  const result = await getResultData({ locale, sessionId });
  const hero = heroLabels[result.locale as 'fr' | 'en'] ?? heroLabels.fr;

  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="max-w-[390px] mx-auto px-5 h-[62px] flex items-center justify-between">
          <Link
            href={`/${result.locale}`}
            className="font-display font-normal italic text-[17px] text-[#1A1916]"
          >
            CoupleCheck
          </Link>
          <span className="text-[10px] font-semibold text-[#8A8880] border border-[#E0DDD6] px-2.5 py-1 rounded-[6px] uppercase tracking-[0.1em]">
            {hero.badge}
          </span>
        </div>
      </div>

      <div className="max-w-[390px] mx-auto">
        {/* Score hero */}
        <div className="px-5 pt-6 pb-2 text-center">
          <h1 className="font-display font-normal text-[26px] text-[#1A1916] leading-[1.2] whitespace-pre-line mb-1.5 tracking-[-0.02em]">
            {hero.heading}
          </h1>
          <p className="text-[12px] text-[#8A8880]">{hero.sub}</p>
        </div>

        <div className="px-5">
          <ScoreGauge score={result.globalScore} />
        </div>

        {/* Strengths */}
        <StrengthsList scores={result.scores} />

        {/* Risks teaser */}
        <RisksTeaser scores={result.scores} />

        {/* Personalised insights */}
        <ClientTeasersData
          teasers={result.teasers}
          predictionTeaser={result.predictionTeaser}
          locale={result.locale as 'fr' | 'en'}
          sessionId={result.sessionId}
        />
      </div>
    </main>
  );
}
