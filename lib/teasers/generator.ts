// lib/teasers/generator.ts

import { responseTeasers } from '@/config/teasers/responses';
import { painPointTeasers } from '@/config/teasers/pain-points';
import { combinationTeasers } from '@/config/teasers/combinations';
import { paradoxTeasers } from '@/config/teasers/paradoxes';
import { hiddenInsightTeasers } from '@/config/teasers/hidden-insights';
import { profileTeasers } from '@/config/teasers/profiles';
import { predictionTeaser } from '@/config/teasers/prediction';

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface UserContext {
  // Segmentation (Q1-Q4)
  ageRange: '18-24' | '25-29' | '30-35' | '36+';
  gender: 'woman' | 'man' | 'other';
  relationshipDuration: '<6m' | '6m-1y' | '1-2y' | '2-5y' | '5y+';
  relationshipStatus: 'couple' | 'married' | 'engaged' | 'complicated';

  // Scores par dimension (0-100)
  scores: {
    communication: number;
    trust: number;
    intimacy: number;
    conflict: number;
    forgiveness: number;
    projects: number;
    balance: number;
  };
  globalScore: number;

  // Réponses brutes Q5-Q19
  answers: Record<string, string>;

  // Q20
  painPoints: string[];
  changeWish: string;

  // Locale
  locale: 'fr' | 'en';
}

export interface GeneratedTeaser {
  id: string;
  type: 'response' | 'pain_point' | 'combination' | 'paradox' | 'hidden_insight' | 'profile' | 'prediction';
  icon: string;
  title: string;
  previewText: string;
  lockedText: string;
  emotionalHook: string;
  ctaText: string;
  priority: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Générateur principal
// ═══════════════════════════════════════════════════════════════════════════

export function generatePersonalizedTeasers(context: UserContext): GeneratedTeaser[] {
  const allTeasers: GeneratedTeaser[] = [];

  // 1. Teasers basés sur les réponses spécifiques Q5-Q19
  for (const [key, teaser] of Object.entries(responseTeasers)) {
    if (matchesCondition(teaser.condition, context)) {
      allTeasers.push(formatTeaser(key, teaser, context, 'response', 7));
    }
  }

  // 2. Teasers basés sur les pain points Q20
  for (const painPoint of context.painPoints) {
    const teaserKey = `pain_${painPoint}` as keyof typeof painPointTeasers;
    const teaser = painPointTeasers[teaserKey];
    if (teaser) {
      allTeasers.push(formatTeaser(teaserKey, teaser, context, 'pain_point', 8));
    }
  }

  // 3. Teasers de combinaisons
  for (const [key, teaser] of Object.entries(combinationTeasers)) {
    if (matchesAllConditions(teaser.conditions, context)) {
      allTeasers.push(formatTeaser(key, teaser, context, 'combination', 9));
    }
  }

  // 4. Teasers de paradoxes
  for (const [key, teaser] of Object.entries(paradoxTeasers)) {
    if (matchesAllConditions(teaser.conditions, context)) {
      allTeasers.push(formatTeaser(key, teaser, context, 'paradox', 10));
    }
  }

  // 5. Hidden insight (basé sur dimension la plus faible)
  const weakestDim = getWeakestDimension(context.scores);
  const insightKey = `insight_partner_${weakestDim}` as keyof typeof hiddenInsightTeasers;
  const insightTeaser = hiddenInsightTeasers[insightKey];
  if (insightTeaser && (context.scores as any)[weakestDim] < 60) {
    allTeasers.push(formatTeaser(insightKey, insightTeaser, context, 'hidden_insight', 10));
  }

  // 6. Profile teaser
  const profileTeaser = findProfileTeaser(context);
  if (profileTeaser) {
    allTeasers.push(formatTeaser(profileTeaser.key, profileTeaser.teaser, context, 'profile', 6));
  }

  // 7. Prediction teaser (si score < 85)
  if (context.globalScore < 85) {
    allTeasers.push(formatTeaser('prediction', predictionTeaser, context, 'prediction', 8));
  }

  // Sélectionner les 5 meilleurs avec diversité
  return selectBestTeasers(allTeasers, 5);
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function matchesCondition(condition: any, context: UserContext): boolean {
  if (condition.question && condition.answer) {
    const userAnswer = context.answers[condition.question];
    if (Array.isArray(condition.answer)) {
      return condition.answer.includes(userAnswer);
    }
    return userAnswer === condition.answer;
  }

  if (condition.dimension) {
    const score = (context.scores as any)[condition.dimension];
    if (condition.maxScore !== undefined && score > condition.maxScore) return false;
    if (condition.minScore !== undefined && score < condition.minScore) return false;
    return true;
  }

  if (condition.painPoint) {
    return context.painPoints.includes(condition.painPoint);
  }

  if (condition.relationshipDuration) {
    return condition.relationshipDuration.includes(context.relationshipDuration);
  }

  if (condition.relationshipStatus) {
    if (Array.isArray(condition.relationshipStatus)) {
      return condition.relationshipStatus.includes(context.relationshipStatus);
    }
    return context.relationshipStatus === condition.relationshipStatus;
  }

  return false;
}

function matchesAllConditions(conditions: any[], context: UserContext): boolean {
  return conditions.every(condition => matchesCondition(condition, context));
}

function formatTeaser(
  id: string,
  teaser: any,
  context: UserContext,
  type: GeneratedTeaser['type'],
  basePriority: number
): GeneratedTeaser {
  const localized = teaser[context.locale] || teaser.fr;

  // Handle prediction teaser with predictions array
  const previewText = type === 'prediction'
    ? localized.preview || ''
    : interpolate(localized.preview || '', context);

  const lockedText = type === 'prediction'
    ? localized.locked || ''
    : interpolate(localized.locked || '', context);

  return {
    id,
    type,
    icon: localized.icon,
    title: localized.title,
    previewText: previewText,
    lockedText: lockedText,
    emotionalHook: localized.emotionalHook || '',
    ctaText: localized.ctaText || '',
    priority: basePriority,
  };
}

function interpolate(text: string, context: UserContext): string {
  return text
    // Scores
    .replace(/\{\{score\}\}/g, String(context.globalScore))
    .replace(/\{\{communication_score\}\}/g, String(context.scores.communication))
    .replace(/\{\{trust_score\}\}/g, String(context.scores.trust))
    .replace(/\{\{intimacy_score\}\}/g, String(context.scores.intimacy))
    .replace(/\{\{conflict_score\}\}/g, String(context.scores.conflict))
    .replace(/\{\{forgiveness_score\}\}/g, String(context.scores.forgiveness))
    .replace(/\{\{projects_score\}\}/g, String(context.scores.projects))
    .replace(/\{\{balance_score\}\}/g, String(context.scores.balance))
    // Réponses textuelles
    .replace(/\{\{answer_(\w+)\}\}/g, (_, q) => context.answers[q] || '...');
}

function getWeakestDimension(scores: UserContext['scores']): string {
  let weakest = 'communication';
  let lowestScore = scores.communication;

  for (const [dim, score] of Object.entries(scores)) {
    if (score < lowestScore) {
      lowestScore = score;
      weakest = dim;
    }
  }

  return weakest;
}

function findProfileTeaser(context: UserContext): { key: string; teaser: any } | null {
  // Priorité : compliqué > statut > durée
  if (context.relationshipStatus === 'complicated') {
    return { key: 'profile_complicated', teaser: profileTeasers.profile_complicated };
  }

  if (['married', 'engaged'].includes(context.relationshipStatus)) {
    return { key: 'profile_committed', teaser: profileTeasers.profile_committed };
  }

  const durationMap: Record<string, string> = {
    '<6m': 'profile_young_couple',
    '6m-1y': 'profile_young_couple',
    '1-2y': 'profile_building_couple',
    '2-5y': 'profile_established_couple',
    '5y+': 'profile_longtime_couple',
  };

  const key = durationMap[context.relationshipDuration];
  return key ? { key, teaser: (profileTeasers as any)[key] } : null;
}

function selectBestTeasers(teasers: GeneratedTeaser[], max: number): GeneratedTeaser[] {
  // Trier par priorité (le plus bas d'abord)
  const sorted = [...teasers].sort((a, b) => a.priority - b.priority);

  // Assurer la diversité des types
  const selected: GeneratedTeaser[] = [];
  const usedIds = new Set<string>();

  // Premier pass : un de chaque type prioritaire
  const priorityTypes = ['hidden_insight', 'paradox', 'combination', 'response'];
  for (const type of priorityTypes) {
    if (selected.length >= max) break;
    const candidate = sorted.find(t => t.type === type && !usedIds.has(t.id));
    if (candidate) {
      selected.push(candidate);
      usedIds.add(candidate.id);
    }
  }

  // Deuxième pass : compléter avec les meilleurs restants
  for (const teaser of sorted) {
    if (selected.length >= max) break;
    if (!usedIds.has(teaser.id)) {
      selected.push(teaser);
      usedIds.add(teaser.id);
    }
  }

  return selected;
}