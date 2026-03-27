import { DimensionKey, DimensionScores, QuizAnswer, ScoreResult } from "@/types/quiz";

const dimensionQuestions: Record<DimensionKey, string[]> = {
  communication: ["Q5", "Q6", "Q7"],
  trust: ["Q8", "Q9"],
  intimacy: ["Q10", "Q11"],
  conflict: ["Q12", "Q13"],
  forgiveness: ["Q14", "Q15"],
  projects: ["Q16", "Q17"],
  balance: ["Q18", "Q19"],
};

const dimensionWeights: Record<DimensionKey, number> = {
  communication: 1.2,
  trust: 1.2,
  intimacy: 1.0,
  conflict: 1.0,
  forgiveness: 1.0,
  projects: 0.8,
  balance: 0.8,
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
  return Math.round(average);
}

export function calculateScores(
  answers: Record<string, QuizAnswer>
): ScoreResult {
  const dims = Object.keys(dimensionQuestions) as DimensionKey[];

  const scores = dims.reduce((acc, dim) => {
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

// Fallback: maps string option values to numeric scores for each question
const scoreMap: Record<string, Record<string, number>> = {
  Q5: { always: 100, most: 75, sometimes: 50, rarely: 25 },
  Q6: { completely: 100, generally: 75, not_really: 50, no: 25 },
  Q7: { look: 100, often: 75, sometimes: 50, no: 25 },
  Q8: { totally: 100, most: 75, doubts: 50, stressed: 25 },
  Q9: { open: 100, generally: 75, gray_areas: 50, opaque: 25 },
  Q10: { all: 100, mostly: 75, somewhat: 50, distant: 25 },
  Q11: { very: 100, mostly: 75, somewhat: 50, not_at_all: 25 },
  Q12: { calm: 100, argue_makeup: 65, escalates: 35, avoid: 25 },
  Q13: { always: 100, most: 75, rarely: 40, never: 20 },
  Q14: { yes: 100, time: 75, grudge: 45, struggle: 25 },
  Q15: { none: 100, working: 70, some: 40, heavy: 20 },
  Q16: { aligned: 100, most: 75, never_talked: 45, different: 25 },
  Q17: { many: 100, one: 65, not_really: 40, each_side: 20 },
  Q18: { respect: 100, generally: 75, smothered: 45, overwhelmed: 20 },
  Q19: { totally: 100, mostly: 75, lost: 45, forgotten: 20 },
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
