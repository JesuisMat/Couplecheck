import { QuizContext } from './interpretation';
import { buildAnswersNarrative, buildSegmentationNarrative } from './quiz-context-builder';

const DIMENSION_LABELS: Record<string, Record<string, string>> = {
  communication: { fr: 'Communication', en: 'Communication' },
  trust:         { fr: 'Confiance', en: 'Trust' },
  intimacy:      { fr: 'Intimité', en: 'Intimacy' },
  conflict:      { fr: 'Gestion des conflits', en: 'Conflict Management' },
  forgiveness:   { fr: 'Pardon & Résilience', en: 'Forgiveness & Resilience' },
  projects:      { fr: 'Projets communs', en: 'Shared Goals' },
  balance:       { fr: 'Équilibre individuel', en: 'Individual Balance' },
};

export function buildRecommendationsPrompt(ctx: QuizContext): string {
  const { locale, scores, painPoints, rawAnswers, segmentation } = ctx;

  const sorted = Object.entries(scores).sort(([, a], [, b]) => a - b);
  const weakDims = sorted.slice(0, 3).map(([k]) => DIMENSION_LABELS[k]?.[locale] ?? k);
  const strongDims = sorted.slice(-2).map(([k]) => DIMENSION_LABELS[k]?.[locale] ?? k);

  const answersNarrative = rawAnswers
    ? buildAnswersNarrative(rawAnswers, locale)
    : '';

  const segmentationText = segmentation
    ? buildSegmentationNarrative(segmentation, locale)
    : '';

  if (locale === 'fr') {
    return `Tu es un thérapeute de couple expert. Génère 5 recommandations pratiques et ultra-personnalisées.

═══ PROFIL ═══
${segmentationText || 'Non renseigné'}

═══ DIMENSIONS LES PLUS FAIBLES ═══
${weakDims.join(', ')}

═══ DIMENSIONS LES PLUS FORTES ═══
${strongDims.join(', ')}

═══ RÉPONSES QUESTION PAR QUESTION ═══
${answersNarrative || 'Non disponible'}

${painPoints?.length ? `═══ PRÉOCCUPATIONS EXPRIMÉES ═══\n${painPoints.join(', ')}` : ''}

INSTRUCTIONS :
- Chaque recommandation doit s'appuyer sur UNE ou PLUSIEURS réponses spécifiques aux questions (cite le problème concret)
- Adapte la recommandation au profil (ex : différent si couple de moins de 6 mois vs 5+ ans, femme vs homme)
- Les recommandations doivent être actionnables AUJOURD'HUI, pas des généralités
- Couvrir les dimensions faibles en priorité
- Ne jamais mentionner de scores numériques ni de pourcentages dans le texte généré

Format JSON STRICT (réponds UNIQUEMENT avec le JSON, sans aucun texte avant ni après) :
{
  "recommendations": [
    {
      "title": "Titre court percutant (max 6 mots)",
      "description": "2-3 phrases concrètes et personnalisées basées sur les réponses. Explique POURQUOI c'est important pour CETTE personne.",
      "dimension": "clé_de_dimension"
    }
  ]
}`;
  }

  return `You are an expert couples therapist. Generate 5 practical, highly personalized recommendations.

═══ PROFILE ═══
${segmentationText || 'Not provided'}

═══ WEAKEST DIMENSIONS ═══
${weakDims.join(', ')}

═══ STRONGEST DIMENSIONS ═══
${strongDims.join(', ')}

═══ INDIVIDUAL QUESTION ANSWERS ═══
${answersNarrative || 'Not available'}

${painPoints?.length ? `═══ EXPRESSED CONCERNS ═══\n${painPoints.join(', ')}` : ''}

INSTRUCTIONS:
- Each recommendation must draw on ONE or MORE specific question answers (cite the concrete problem)
- Adapt to the profile (e.g., different for under 6 months vs 5+ years, woman vs man)
- Recommendations must be actionable TODAY, not generic advice
- Prioritize the weakest dimensions
- Never mention numerical scores or percentages in the generated text

STRICT JSON format (respond ONLY with JSON, no text before or after):
{
  "recommendations": [
    {
      "title": "Short punchy title (max 6 words)",
      "description": "2-3 concrete, personalized sentences based on their answers. Explain WHY it matters for THIS person.",
      "dimension": "dimension_key"
    }
  ]
}`;
}
