import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ScoreGauge } from "@/components/result/ScoreGauge";
import { StrengthsList } from "@/components/result/StrengthsList";
import { RisksTeaser } from "@/components/result/RisksTeaser";
import { PricingCards } from "@/components/result/PricingCards";
import { DimensionScores } from "@/types/quiz";
import { trackEvent, EVENTS } from "@/lib/posthog";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { locale, sessionId } = await params;

  const supabase = createAdminClient();
  const { data: session, error } = await supabase
    .from("quiz_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error || !session || !session.scores) {
    notFound();
  }

  const scores = session.scores as DimensionScores;
  const globalScore = session.global_score as number;

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="max-w-[390px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="font-display font-bold text-[18px] text-[#AA2C32]"
          >
            CoupleCheck
          </Link>
        </div>
      </div>

      <div className="max-w-[390px] mx-auto">
        {/* Score gauge */}
        <div className="px-5">
          <ScoreGauge score={globalScore} />
        </div>

        {/* Strengths */}
        <StrengthsList scores={scores} />

        {/* Risks (teaser) */}
        <RisksTeaser scores={scores} />

        {/* Pricing */}
        <PricingCards sessionId={sessionId} />
      </div>
    </main>
  );
}
