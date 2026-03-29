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

export function buildActionPlanPrompt(ctx: QuizContext): string {
  const { locale, globalScore, scores, changeWish, rawAnswers, segmentation } = ctx;

  const sorted = Object.entries(scores).sort(([, a], [, b]) => a - b);
  const top3Weak = sorted.slice(0, 3).map(([k]) => DIMENSION_LABELS[k]?.[locale] ?? k);

  const answersNarrative = rawAnswers
    ? buildAnswersNarrative(rawAnswers, locale)
    : '';

  const segmentationText = segmentation
    ? buildSegmentationNarrative(segmentation, locale)
    : '';

  if (locale === 'fr') {
    return `Tu es un coach de couple expert. Génère un plan d'action personnalisé sur 30 jours structuré en 4 semaines.

═══ PROFIL ═══
${segmentationText || 'Non renseigné'}

═══ SCORE GLOBAL ═══
${globalScore}/100

═══ DIMENSIONS PRIORITAIRES À TRAVAILLER ═══
${top3Weak.join(', ')}

═══ RÉPONSES QUESTION PAR QUESTION ═══
${answersNarrative || 'Non disponible'}

${changeWish ? `═══ CE QU'IL/ELLE VEUT CHANGER ═══\n"${changeWish}"` : ''}

INSTRUCTIONS :
- Chaque semaine doit adresser des problèmes CONCRETS identifiés dans les réponses
- Les actions doivent être réalistes pour le profil (couple récent vs long terme, situation relationnelle)
- Progression logique : semaine 1 = fondations, semaine 4 = consolidation
- Les durées doivent être courtes et réalistes (5-30 min max, sauf exceptions)
- Ne jamais mentionner de scores numériques ni de pourcentages dans le texte généré

Format JSON STRICT (réponds UNIQUEMENT avec le JSON, sans aucun texte avant ni après) :
{
  "weeks": [
    {
      "week": 1,
      "theme": "Nom du thème (3-4 mots max)",
      "actions": [
        {
          "title": "Titre de l'action (max 5 mots)",
          "description": "Description concrète en 2 phrases. Explique le POURQUOI lié à leur situation spécifique.",
          "duration": "X min"
        }
      ]
    }
  ]
}`;
  }

  return `You are an expert relationship coach. Generate a personalized 30-day action plan structured in 4 weeks.

═══ PROFILE ═══
${segmentationText || 'Not provided'}

═══ GLOBAL SCORE ═══
${globalScore}/100

═══ PRIORITY DIMENSIONS TO WORK ON ═══
${top3Weak.join(', ')}

═══ INDIVIDUAL QUESTION ANSWERS ═══
${answersNarrative || 'Not available'}

${changeWish ? `═══ WHAT THEY WANT TO CHANGE ═══\n"${changeWish}"` : ''}

INSTRUCTIONS:
- Each week must address CONCRETE problems identified in the answers
- Actions must be realistic for the profile (new couple vs long-term, relationship status)
- Logical progression: week 1 = foundations, week 4 = consolidation
- Durations must be short and realistic (5-30 min max, with rare exceptions)
- Never mention numerical scores or percentages in the generated text

STRICT JSON format (respond ONLY with JSON, no text before or after):
{
  "weeks": [
    {
      "week": 1,
      "theme": "Theme name (3-4 words max)",
      "actions": [
        {
          "title": "Action title (max 5 words)",
          "description": "Concrete 2-sentence description. Explain the WHY linked to their specific situation.",
          "duration": "X min"
        }
      ]
    }
  ]
}`;
}
