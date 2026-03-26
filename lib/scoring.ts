import { DimensionKey, DimensionScores, QuizAnswer, ScoreResult } from "@/types/quiz";

const dimensionQuestions: Record<DimensionKey, string[]> = {
  communication: ["Q5", "Q6"],
  trust: ["Q7", "Q8"],
  intimacy: ["Q9"],
  conflict: ["Q10", "Q11"],
  projects: ["Q12"],
  balance: ["Q13"],
};

const dimensionWeights: Record<DimensionKey, number> = {
  communication: 1,
  trust: 1,
  intimacy: 1,
  conflict: 1,
  projects: 1,
  balance: 1,
};

function calculateDimensionScore(
  dimension: DimensionKey,
  answers: Record<string, QuizAnswer>
): number {
  const questionIds = dimensionQuestions[dimension];
  const scores = questionIds
    .map((qId) => {
      const answer = answers[qId];
      return typeof answer === "number" ? answer : 0;
    })
    .filter((s) => s !== undefined);

  if (scores.length === 0) return 50; // default if no answers

  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round((average / 10) * 100);
}

export function calculateScores(
  answers: Record<string, QuizAnswer>
): ScoreResult {
  const dimensions = Object.keys(dimensionQuestions) as DimensionKey[];

  const scores = dimensions.reduce((acc, dim) => {
    acc[dim] = calculateDimensionScore(dim, answers);
    return acc;
  }, {} as DimensionScores);

  const totalWeight = Object.values(dimensionWeights).reduce(
    (a, b) => a + b,
    0
  );
  const weightedSum = (Object.keys(scores) as DimensionKey[]).reduce(
    (sum, dim) => sum + scores[dim] * dimensionWeights[dim],
    0
  );
  const globalScore = Math.round(weightedSum / totalWeight);

  const label = getScoreLabel(globalScore);
  const color = getScoreColor(globalScore);

  return { scores, globalScore, label, color };
}

export function getScoreLabel(score: number): { fr: string; en: string } {
  if (score >= 80) return { fr: "Relation épanouie", en: "Thriving relationship" };
  if (score >= 60) return { fr: "Relation stable", en: "Stable relationship" };
  if (score >= 40) return { fr: "À surveiller", en: "Needs attention" };
  return { fr: "En difficulté", en: "In difficulty" };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#10B981";
  if (score >= 60) return "#F59E0B";
  if (score >= 40) return "#F97316";
  return "#EF4444";
}

export function classifyDimension(
  score: number
): "strength" | "neutral" | "risk" {
  if (score >= 70) return "strength";
  if (score >= 40) return "neutral";
  return "risk";
}

// Map score answer value to numeric score for each question
const scoreMap: Record<string, Record<string, number>> = {
  Q5: { always: 10, most: 7, sometimes: 4, rarely: 1 },
  Q6: { completely: 10, generally: 7, not_really: 3, no: 0 },
  Q7: { totally: 10, most: 7, doubts: 4, stressed: 1 },
  Q8: { open: 10, generally: 7, gray_areas: 3, opaque: 0 },
  Q9: { very: 10, mostly: 7, somewhat: 4, not_at_all: 0 },
  Q10: { calm: 10, argue_makeup: 6, escalates: 2, avoid: 0 },
  Q11: { always: 10, most: 7, rarely: 3, never: 0 },
  Q12: { aligned: 10, most: 7, never_talked: 4, different: 0 },
  Q13: { balanced: 10, generally: 7, smothered: 3, overwhelmed: 0 },
};

export function resolveScores(
  answers: Record<string, QuizAnswer>
): Record<string, QuizAnswer> {
  const resolved: Record<string, QuizAnswer> = { ...answers };

  for (const [qId, map] of Object.entries(scoreMap)) {
    const answer = answers[qId];
    if (typeof answer === "string" && map[answer] !== undefined) {
      resolved[qId] = map[answer];
    }
  }

  return resolved;
}
