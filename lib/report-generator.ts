import { callOpenRouter } from './openrouter';
import { buildInterpretationPrompt, QuizContext } from './prompts/interpretation';
import { buildRecommendationsPrompt } from './prompts/recommendations';
import { buildActionPlanPrompt } from './prompts/action-plan';
import type { ReportData } from '@/components/report/ReportPDF';

function parseJSON<T>(text: string, fallback: T): T {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
  } catch {
    // ignore
  }
  return fallback;
}

export async function generateReportData(
  ctx: QuizContext & { firstName?: string; offerType: 'standard' | 'premium'; rawAnswers?: Record<string, unknown> }
): Promise<ReportData> {
  const { locale, globalScore, scores, firstName, offerType, rawAnswers } = ctx;

  // Enrich context with raw answers for personalized prompts
  const enrichedCtx = { ...ctx, rawAnswers };

  // Run LLM calls in parallel for speed
  const [interpretationText, recommendationsRaw, actionPlanRaw] = await Promise.all([
    callOpenRouter(buildInterpretationPrompt(enrichedCtx)),
    callOpenRouter(buildRecommendationsPrompt(enrichedCtx)),
    callOpenRouter(buildActionPlanPrompt(enrichedCtx)),
  ]);

  const recommendationsData = parseJSON<{ recommendations: ReportData['recommendations'] }>(
    recommendationsRaw,
    { recommendations: [] }
  );

  const actionPlanData = parseJSON<{ weeks: ReportData['actionPlan'] }>(
    actionPlanRaw,
    { weeks: [] }
  );

  // Fallback recommendations if parsing failed
  const recommendations = recommendationsData.recommendations.length
    ? recommendationsData.recommendations.slice(0, 5)
    : generateFallbackRecommendations(ctx);

  // Fallback action plan if parsing failed
  const actionPlan = actionPlanData.weeks.length
    ? actionPlanData.weeks.slice(0, 4)
    : generateFallbackActionPlan(ctx);

  return {
    locale,
    firstName,
    globalScore,
    scores,
    interpretation: interpretationText,
    recommendations,
    actionPlan,
    offerType,
    generatedAt: new Date().toISOString(),
  };
}

function generateFallbackRecommendations(ctx: QuizContext): ReportData['recommendations'] {
  const { locale } = ctx;
  if (locale === 'fr') {
    return [
      { title: 'Pratiquez l\'écoute active', description: 'Lors des conversations importantes, répétez ce que l\'autre a dit avant de répondre. Cela réduit les malentendus et renforce la connexion.', dimension: 'communication' },
      { title: 'Rituels de connexion quotidiens', description: 'Consacrez 10 minutes par jour à une conversation sans écran. Posez des questions ouvertes sur la journée de l\'autre.', dimension: 'intimacy' },
      { title: 'Protocole de désescalade', description: 'Lors des conflits, convenez d\'un mot-code pour marquer une pause de 20 minutes avant de reprendre la discussion.', dimension: 'conflict' },
      { title: 'Cahier de gratitude partagé', description: 'Chaque semaine, écrivez une chose que vous appréciez chez votre partenaire. Partagez-la lors de votre check-in.', dimension: 'trust' },
      { title: 'Vision à 5 ans ensemble', description: 'Planifiez une soirée dédiée à parler de vos rêves et projets communs. Créez une liste de 10 choses à réaliser ensemble.', dimension: 'projects' },
    ];
  }
  return [
    { title: 'Practice active listening', description: 'During important conversations, repeat what was said before responding. This reduces misunderstandings and strengthens connection.', dimension: 'communication' },
    { title: 'Daily connection rituals', description: 'Spend 10 minutes per day in a screen-free conversation. Ask open questions about each other\'s day.', dimension: 'intimacy' },
    { title: 'De-escalation protocol', description: 'During conflicts, agree on a code word to take a 20-minute break before resuming discussion.', dimension: 'conflict' },
    { title: 'Shared gratitude journal', description: 'Each week, write one thing you appreciate about your partner. Share it during your weekly check-in.', dimension: 'trust' },
    { title: '5-year vision together', description: 'Plan an evening dedicated to discussing your dreams and shared projects. Create a list of 10 things to do together.', dimension: 'projects' },
  ];
}

function generateFallbackActionPlan(ctx: QuizContext): ReportData['actionPlan'] {
  const { locale } = ctx;
  if (locale === 'fr') {
    return [
      { week: 1, theme: 'Fondations', actions: [{ title: 'Check-in quotidien', description: 'Partagez une chose positive de votre journée.', duration: '5 min' }, { title: 'Lettre de gratitude', description: 'Écrivez une lettre à votre partenaire.', duration: '15 min' }] },
      { week: 2, theme: 'Communication', actions: [{ title: 'Conversation profonde', description: 'Discutez d\'un sujet que vous évitez depuis longtemps.', duration: '30 min' }, { title: 'Écoute sans interruption', description: 'Chacun parle 5 minutes sans être interrompu.', duration: '10 min' }] },
      { week: 3, theme: 'Connexion', actions: [{ title: 'Soirée date', description: 'Organisez une soirée surprise l\'un pour l\'autre.', duration: '2h' }, { title: 'Contact physique intentionnel', description: '6 secondes de câlin matin et soir.', duration: '2 min' }] },
      { week: 4, theme: 'Vision', actions: [{ title: 'Dream board', description: 'Créez ensemble un tableau de vos rêves et objectifs.', duration: '1h' }, { title: 'Engagement renouvelé', description: 'Formulez 3 engagements concrets pour les 6 prochains mois.', duration: '20 min' }] },
    ];
  }
  return [
    { week: 1, theme: 'Foundations', actions: [{ title: 'Daily check-in', description: 'Share one positive thing from your day.', duration: '5 min' }, { title: 'Gratitude letter', description: 'Write a letter to your partner.', duration: '15 min' }] },
    { week: 2, theme: 'Communication', actions: [{ title: 'Deep conversation', description: 'Discuss a topic you\'ve been avoiding.', duration: '30 min' }, { title: 'Uninterrupted listening', description: 'Each person speaks 5 minutes without interruption.', duration: '10 min' }] },
    { week: 3, theme: 'Connection', actions: [{ title: 'Date night', description: 'Plan a surprise evening for each other.', duration: '2h' }, { title: 'Intentional physical contact', description: '6-second hug morning and evening.', duration: '2 min' }] },
    { week: 4, theme: 'Vision', actions: [{ title: 'Dream board', description: 'Create a shared board of your dreams and goals.', duration: '1h' }, { title: 'Renewed commitment', description: 'Formulate 3 concrete commitments for the next 6 months.', duration: '20 min' }] },
  ];
}
