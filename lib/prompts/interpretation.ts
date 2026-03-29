import { buildAnswersNarrative, buildSegmentationNarrative } from './quiz-context-builder';

export interface QuizContext {
  locale: 'fr' | 'en';
  globalScore: number;
  scores: Record<string, number>;
  painPoints?: string[];
  changeWish?: string;
  rawAnswers?: Record<string, unknown>;
  segmentation?: {
    age_range?: string;
    gender?: string;
    relationship_duration?: string;
    relationship_status?: string;
  };
}

const DIMENSION_LABELS: Record<string, Record<string, string>> = {
  communication: { fr: 'Communication', en: 'Communication' },
  trust:         { fr: 'Confiance', en: 'Trust' },
  intimacy:      { fr: 'Intimité', en: 'Intimacy' },
  conflict:      { fr: 'Gestion des conflits', en: 'Conflict Management' },
  forgiveness:   { fr: 'Pardon & Résilience', en: 'Forgiveness & Resilience' },
  projects:      { fr: 'Projets communs', en: 'Shared Goals' },
  balance:       { fr: 'Équilibre individuel', en: 'Individual Balance' },
};

export function buildInterpretationPrompt(ctx: QuizContext): string {
  const { locale, globalScore, scores, painPoints, changeWish, rawAnswers, segmentation } = ctx;

  const scoresText = Object.entries(scores)
    .map(([k, v]) => `- ${DIMENSION_LABELS[k]?.[locale] ?? k}: ${v}/100`)
    .join('\n');

  const answersNarrative = rawAnswers
    ? buildAnswersNarrative(rawAnswers, locale)
    : '';

  const segmentationText = segmentation
    ? buildSegmentationNarrative(segmentation, locale)
    : '';

  const painText = painPoints?.length
    ? (locale === 'fr'
        ? `Ce qui l'inquiète le plus : ${painPoints.join(', ')}`
        : `What worries them most: ${painPoints.join(', ')}`)
    : '';

  const wishText = changeWish
    ? (locale === 'fr'
        ? `Ce qu'il/elle aimerait changer : "${changeWish}"`
        : `What they wish to change: "${changeWish}"`)
    : '';

  if (locale === 'fr') {
    return `Tu es un psychologue de couple expert. Analyse ces résultats de quiz et génère une interprétation globale personnalisée de 2-3 paragraphes.

═══ PROFIL ═══
${segmentationText || 'Non renseigné'}

═══ SCORES PAR DIMENSION ═══
Score global : ${globalScore}/100
${scoresText}

═══ RÉPONSES QUESTION PAR QUESTION ═══
${answersNarrative || 'Non disponible'}

═══ PRÉOCCUPATIONS EXPRIMÉES ═══
${painText || 'Non renseigné'}
${wishText || ''}

Génère une interprétation qui :
1. Tient compte du profil (âge, durée de relation, genre) pour contextualiser
2. S'appuie sur les réponses spécifiques aux questions — pas seulement les scores agrégés
3. Identifie 2-3 patterns concrets qui ressortent (ex : "tu exprimes une frustration sur l'intimité physique et émotionnelle")
4. Reconnaît honnêtement l'état de la relation (ni trop positif ni alarmiste)
5. Donne un message d'espoir ancré dans la réalité de cette personne
6. Utilise un ton chaleureux, bienveillant, expert — parle directement (tu/vous)
7. Maximum 250 mots
8. Ne jamais mentionner de scores numériques ni de pourcentages dans le texte généré

Réponds UNIQUEMENT avec le texte de l'interprétation, sans titre ni formatage markdown.`;
  }

  return `You are an expert couples psychologist. Analyze these quiz results and generate a personalized global interpretation of 2-3 paragraphs.

═══ PROFILE ═══
${segmentationText || 'Not provided'}

═══ SCORES BY DIMENSION ═══
Global score: ${globalScore}/100
${scoresText}

═══ INDIVIDUAL QUESTION ANSWERS ═══
${answersNarrative || 'Not available'}

═══ EXPRESSED CONCERNS ═══
${painText || 'Not provided'}
${wishText || ''}

Generate an interpretation that:
1. Takes the profile (age, relationship length, gender) into account to contextualize
2. Draws on specific question answers — not just aggregate scores
3. Identifies 2-3 concrete patterns (e.g., "you express frustration about both physical and emotional intimacy")
4. Honestly acknowledges the state of the relationship (neither too positive nor alarmist)
5. Gives a message of hope grounded in this person's reality
6. Uses a warm, caring, expert tone — speak directly (you)
7. Maximum 250 words
8. Never mention numerical scores or percentages in the generated text

Respond ONLY with the interpretation text, no title or markdown formatting.`;
}
