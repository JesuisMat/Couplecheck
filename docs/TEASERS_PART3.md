# TEASERS_PART3.md — Profils, Prédictions, Logique, UI

## SECTION 6 : Teasers par PROFIL (Segmentation)

```typescript
// config/teasers/profiles.ts

export const profileTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // JEUNE COUPLE (< 1 an)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_young_couple': {
    condition: { relationshipDuration: ['<6m', '6m-1y'] },
    fr: {
      icon: '🌱',
      title: "Les dynamiques qui se forment",
      preview: "En tant que couple récent, vous êtes dans une période où les habitudes se créent — les bonnes comme les moins bonnes. Certains schémas qui semblent anodins maintenant pourraient devenir ████████████...",
      locked: "...pourraient devenir plus difficiles à changer avec le temps. Tes réponses suggèrent des points d'attention — pas des problèmes, mais des dynamiques à surveiller avant qu'elles ne ████████████.",
      emotionalHook: "Quelles habitudes prenez-vous sans vous en rendre compte ?",
      ctaText: "Identifier ce qui se construit maintenant",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE EN CONSTRUCTION (1-2 ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_building_couple': {
    condition: { relationshipDuration: ['1-2y'] },
    fr: {
      icon: '🏗️',
      title: "La phase de construction",
      preview: "Après un à deux ans ensemble, vous avez dépassé la phase de découverte. C'est souvent le moment où les premières vraies négociations apparaissent — sur l'espace, sur l'avenir, sur ████████████...",
      locked: "...sur ce qui compte vraiment pour chacun. Tes réponses suggèrent que certains sujets sont peut-être en train d'émerger — des besoins qui demandent à être reconnus, ou des questions qui n'ont pas encore trouvé ████████████.",
      emotionalHook: "Quels besoins commencent à se faire entendre ?",
      ctaText: "Voir ce qui émerge à ce stade de votre relation",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE INSTALLÉ (2-5 ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_established_couple': {
    condition: { relationshipDuration: ['2-5y'] },
    fr: {
      icon: '🏠',
      title: "Les évidences qui méritent attention",
      preview: "Après quelques années ensemble, certaines choses sont devenues évidentes — mais cette familiarité peut aussi cacher des angles morts. Il y a peut-être des besoins qui ont évolué sans être ████████████...",
      locked: "...sans être rediscutés, ou des frustrations légères qui se sont installées comme «normales». Ton profil suggère que certains aspects mériteraient un nouveau regard — pas parce qu'ils vont mal, mais parce qu'ils pourraient ████████████.",
      emotionalHook: "Qu'est-ce qui a changé sans que vous en parliez ?",
      ctaText: "Revoir ce qui est devenu évident",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE LONGUE DURÉE (5+ ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_longtime_couple': {
    condition: { relationshipDuration: ['5y+'] },
    fr: {
      icon: '🌳',
      title: "Ce que le temps a peut-être installé",
      preview: "Après plus de cinq ans, votre couple a traversé beaucoup. Mais cette longévité vient parfois avec une forme de routine qui s'installe sans qu'on la voie — des choses acceptées plutôt que choisies, des rêves peut-être mis de ████████████...",
      locked: "...mis de côté. Ton profil suggère des zones où le temps a peut-être créé une distance douce — pas une rupture, mais un éloignement progressif qui mériterait d'être ████████████.",
      emotionalHook: "Qu'avez-vous laissé s'installer avec le temps ?",
      ctaText: "Identifier ce que le temps a peut-être érodé",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // "C'EST COMPLIQUÉ"
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_complicated': {
    condition: { relationshipStatus: 'complicated' },
    fr: {
      icon: '🌀',
      title: "Clarifier ce qui crée le flou",
      preview: "Tu as indiqué que «c'est compliqué». Cette situation, quelle qu'en soit la raison, crée probablement une forme d'incertitude qui pèse — tu ne sais peut-être pas vraiment où vous en êtes, ni dans quelle direction ████████████...",
      locked: "...dans quelle direction ça va. Tes réponses dessinent un profil où certaines questions mériteraient d'être posées — pas forcément à l'autre, mais peut-être d'abord à toi-même, sur ce que tu veux ████████████.",
      emotionalHook: "Qu'est-ce qui rendrait les choses moins compliquées ?",
      ctaText: "Clarifier ce qui crée cette complexité",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FIANCÉS / MARIÉS
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_committed': {
    condition: { relationshipStatus: ['married', 'engaged'] },
    fr: {
      icon: '💍',
      title: "Au-delà de l'engagement formel",
      preview: "Vous avez formalisé votre engagement. Mais au-delà des promesses officielles, il y a la réalité du quotidien — et tes réponses suggèrent que certains aspects pourraient bénéficier d'attention. L'engagement ne résout pas tout, parfois il ████████████...",
      locked: "...parfois il met en lumière ce qui demandait déjà à être vu. Il y a peut-être des conversations que vous avez supposé réglées par le «oui», mais qui continuent de ████████████.",
      emotionalHook: "Qu'est-ce que l'engagement n'a pas résolu ?",
      ctaText: "Explorer ce qui reste au-delà des promesses",
    },
  },
};
```

---

## SECTION 7 : Teaser PRÉDICTION

```typescript
// config/teasers/prediction.ts

export const predictionTeaser = {
  fr: {
    icon: '📊',
    title: "Ce que ton profil suggère pour l'avenir",
    subtitle: "Basé sur l'analyse de profils similaires",
    preview: "En croisant l'ensemble de tes réponses, certaines tendances se dessinent. Ton profil suggère des forces qui peuvent vous porter, mais aussi des zones où quelque chose pourrait se ████████████...",
    locked: "...se fragiliser si rien ne change. Le rapport explore plusieurs trajectoires possibles — selon que certaines dynamiques évoluent ou restent en l'état — et ce qui pourrait faire basculer dans un sens ou ████████████.",
    predictions: [
      {
        icon: '💍',
        label: "Probabilité de durer sur le long terme",
        status: "hidden", // Barre grise avec cadenas
      },
      {
        icon: '⚡',
        label: "Risque de tension importante à venir",
        status: "hidden",
      },
      {
        icon: '📈',
        label: "Potentiel d'évolution positive",
        status: "hidden",
      },
    ],
    emotionalHook: "Ces tendances ne sont pas des certitudes — veux-tu savoir ce qui peut changer la trajectoire ?",
    ctaText: "Révéler les tendances de ton couple",
  },
  en: {
    icon: '📊',
    title: "What your profile suggests for the future",
    subtitle: "Based on analysis of similar profiles",
    preview: "Crossing all your answers, certain trends emerge. Your profile suggests strengths that can carry you, but also areas where something could become ████████████...",
    locked: "...become fragile if nothing changes. The report explores several possible trajectories — depending on whether certain dynamics evolve or stay as they are — and what could tip things one way or ████████████.",
    predictions: [
      {
        icon: '💍',
        label: "Probability of lasting long-term",
        status: "hidden",
      },
      {
        icon: '⚡',
        label: "Risk of significant tension ahead",
        status: "hidden",
      },
      {
        icon: '📈',
        label: "Potential for positive evolution",
        status: "hidden",
      },
    ],
    emotionalHook: "These trends aren't certainties — do you want to know what could change the trajectory?",
    ctaText: "Reveal your couple's trends",
  },
};
```

---

## SECTION 8 : Logique de génération et sélection

```typescript
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
    const teaser = painPointTeasers[`pain_${painPoint}`];
    if (teaser) {
      allTeasers.push(formatTeaser(`pain_${painPoint}`, teaser, context, 'pain_point', 8));
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
  const insightTeaser = hiddenInsightTeasers[`insight_partner_${weakestDim}`];
  if (insightTeaser && context.scores[weakestDim] < 60) {
    allTeasers.push(formatTeaser(`insight_${weakestDim}`, insightTeaser, context, 'hidden_insight', 10));
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
    const score = context.scores[condition.dimension];
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
  
  return {
    id,
    type,
    icon: localized.icon,
    title: localized.title,
    previewText: interpolate(localized.preview, context),
    lockedText: interpolate(localized.locked, context),
    emotionalHook: localized.emotionalHook,
    ctaText: localized.ctaText,
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
  // Priorité : compliqué > durée
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
  return key ? { key, teaser: profileTeasers[key] } : null;
}

function selectBestTeasers(teasers: GeneratedTeaser[], max: number): GeneratedTeaser[] {
  // Trier par priorité
  const sorted = [...teasers].sort((a, b) => b.priority - a.priority);
  
  // Assurer la diversité des types
  const selected: GeneratedTeaser[] = [];
  const usedTypes = new Set<string>();
  
  // Premier pass : un de chaque type prioritaire
  const priorityTypes = ['hidden_insight', 'paradox', 'combination'];
  for (const type of priorityTypes) {
    if (selected.length >= max) break;
    const teaser = sorted.find(t => t.type === type && !usedTypes.has(t.id));
    if (teaser) {
      selected.push(teaser);
      usedTypes.add(teaser.id);
    }
  }
  
  // Deuxième pass : compléter avec les meilleurs restants
  for (const teaser of sorted) {
    if (selected.length >= max) break;
    if (!usedTypes.has(teaser.id)) {
      selected.push(teaser);
      usedTypes.add(teaser.id);
    }
  }
  
  return selected;
}
```

---

## SECTION 9 : Composants UI

### TeaserCard

```typescript
// components/result/TeaserCard.tsx

'use client';

import { useState } from 'react';
import { Lock, ChevronRight } from 'lucide-react';
import type { GeneratedTeaser } from '@/lib/teasers/generator';

interface TeaserCardProps {
  teaser: GeneratedTeaser;
  onUnlock: () => void;
}

export function TeaserCard({ teaser, onUnlock }: TeaserCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{teaser.icon}</span>
        <h3 className="font-semibold text-gray-900 text-lg">{teaser.title}</h3>
      </div>
      
      {/* Preview Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        {teaser.previewText}
      </p>
      
      {/* Locked Text (blurred) */}
      <div className="relative mb-4">
        <p className="text-gray-700 text-sm leading-relaxed blur-[6px] select-none pointer-events-none">
          {teaser.lockedText}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-gray-600 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Suite dans le rapport</span>
          </div>
        </div>
      </div>
      
      {/* Emotional Hook */}
      <p className="text-primary font-medium text-sm italic mb-4">
        "{teaser.emotionalHook}"
      </p>
      
      {/* CTA */}
      <button
        onClick={onUnlock}
        className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
          isHovered 
            ? 'bg-primary text-white shadow-lg shadow-primary/25' 
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        {teaser.ctaText}
        <ChevronRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
      </button>
    </div>
  );
}
```

### PredictionCard

```typescript
// components/result/PredictionCard.tsx

'use client';

import { Lock } from 'lucide-react';

interface PredictionCardProps {
  teaser: any;
  onUnlock: () => void;
}

export function PredictionCard({ teaser, onUnlock }: PredictionCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">{teaser.icon}</span>
        <h3 className="font-semibold text-gray-900">{teaser.title}</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{teaser.subtitle}</p>
      
      {/* Preview Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        {teaser.previewText}
      </p>
      
      {/* Locked Text */}
      <p className="text-gray-700 text-sm leading-relaxed blur-[6px] select-none mb-6">
        {teaser.lockedText}
      </p>
      
      {/* Prediction Bars */}
      <div className="space-y-4 mb-6">
        {teaser.predictions.map((pred: any, i: number) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{pred.icon}</span>
                <span className="text-sm text-gray-700">{pred.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-gray-300 blur-sm">??%</span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
            
            {/* Progress bar placeholder */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gray-300 rounded-full blur-sm" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Emotional Hook */}
      <p className="text-primary font-medium text-sm italic text-center mb-4">
        "{teaser.emotionalHook}"
      </p>
      
      {/* CTA */}
      <button
        onClick={onUnlock}
        className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        🔓 {teaser.ctaText}
      </button>
    </div>
  );
}
```

### TeasersSection (Container)

```typescript
// components/result/TeasersSection.tsx

'use client';

import { TeaserCard } from './TeaserCard';
import { PredictionCard } from './PredictionCard';
import type { GeneratedTeaser } from '@/lib/teasers/generator';

interface TeasersSectionProps {
  teasers: GeneratedTeaser[];
  predictionTeaser?: any;
  onUnlock: () => void;
  locale: 'fr' | 'en';
}

export function TeasersSection({ teasers, predictionTeaser, onUnlock, locale }: TeasersSectionProps) {
  const regularTeasers = teasers.filter(t => t.type !== 'prediction');
  
  const titles = {
    fr: "🔍 Ce que nous avons découvert sur ton couple",
    en: "🔍 What we discovered about your relationship",
  };
  
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {titles[locale]}
      </h2>
      
      <div className="space-y-4">
        {regularTeasers.map((teaser, i) => (
          <TeaserCard 
            key={teaser.id} 
            teaser={teaser}
            onUnlock={onUnlock}
          />
        ))}
      </div>
      
      {/* Prediction Card */}
      {predictionTeaser && (
        <div className="mt-6">
          <PredictionCard
            teaser={predictionTeaser}
            onUnlock={onUnlock}
          />
        </div>
      )}
    </section>
  );
}
```

---

## SECTION 10 : Intégration Page Résultat

```typescript
// app/[locale]/result/[sessionId]/page.tsx

import { getQuizSession } from '@/lib/supabase/sessions';
import { generatePersonalizedTeasers } from '@/lib/teasers/generator';
import { predictionTeaser } from '@/config/teasers/prediction';
import { ScoreGauge } from '@/components/result/ScoreGauge';
import { StrengthsList } from '@/components/result/StrengthsList';
import { TeasersSection } from '@/components/result/TeasersSection';
import { PricingSection } from '@/components/result/PricingSection';

interface PageProps {
  params: { locale: string; sessionId: string };
}

export default async function ResultPage({ params }: PageProps) {
  const session = await getQuizSession(params.sessionId);
  
  if (!session) {
    // Redirect ou erreur
    return null;
  }
  
  // Construire le contexte utilisateur
  const context = {
    ageRange: session.age_range,
    gender: session.gender,
    relationshipDuration: session.relationship_duration,
    relationshipStatus: session.relationship_status,
    scores: session.dimension_scores,
    globalScore: session.global_score,
    answers: session.answers,
    painPoints: session.pain_points || [],
    changeWish: session.change_wish || '',
    locale: params.locale as 'fr' | 'en',
  };
  
  // Générer les teasers personnalisés
  const teasers = generatePersonalizedTeasers(context);
  
  // Scroll to pricing handler
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Score global avec jauge */}
      <ScoreGauge 
        score={context.globalScore} 
        locale={params.locale} 
      />
      
      {/* Points forts (dimensions > 70) */}
      <StrengthsList 
        scores={context.scores} 
        locale={params.locale} 
      />
      
      {/* Teasers personnalisés */}
      <TeasersSection
        teasers={teasers}
        predictionTeaser={context.globalScore < 85 ? predictionTeaser[params.locale] : null}
        onUnlock={scrollToPricing}
        locale={params.locale as 'fr' | 'en'}
      />
      
      {/* Section Pricing */}
      <PricingSection 
        id="pricing"
        sessionId={params.sessionId}
        locale={params.locale}
        globalScore={context.globalScore}
      />
    </div>
  );
}
```

---

## RÉCAPITULATIF : 100+ TEASERS

| Catégorie | Fichier | Nombre | Déclencheur |
|-----------|---------|--------|-------------|
| Réponses Q5-Q19 | `responses.ts` | ~35 | Réponse spécifique |
| Pain points Q20 | `pain-points.ts` | 8 | Sélection Q20 |
| Combinaisons | `combinations.ts` | ~15 | 2+ conditions |
| Paradoxes | `paradoxes.ts` | ~8 | Scores contradictoires |
| Hidden Insight | `hidden-insights.ts` | 6 | Dimension faible |
| Profils | `profiles.ts` | 6 | Segmentation |
| Prédiction | `prediction.ts` | 1 | Score < 85 |
| **TOTAL** | | **~79 FR + 79 EN** | |

### Principes respectés ✅

1. **Pas de statistiques précises** → "Il y a de fortes chances", "probablement"
2. **Pas d'événements spécifiques** → "quelque chose", "un moment", "une dynamique"
3. **Questions ouvertes** → L'utilisateur projette sa propre réalité
4. **Ultra-personnalisation** → Cite les questions exactes, affiche les scores réels
5. **Coupure au bon moment** → ████████ crée le curiosity gap
6. **Diversité** → 5 teasers maximum avec types différents