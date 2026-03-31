# INSTRUCTION_CORRECTION_SPRINT1.md — CoupleCheck

## 🚨 CONTEXTE

Le Sprint 1 a été complété avec **15 questions et 6 dimensions**.
Le questionnaire a été enrichi et passe maintenant à **20 questions et 7 dimensions**.

**Tu dois corriger le code existant** avant de passer au Sprint 2.

---

## 📋 CHANGEMENTS À APPLIQUER

### Résumé des modifications

| Élément | Avant | Après |
|---------|-------|-------|
| Nombre de questions | 15 | 20 |
| Nombre de dimensions | 6 | 7 |
| Nouvelle dimension | - | Pardon & Résilience (`forgiveness`) |
| Questions évaluation | Q5-Q13 (9) | Q5-Q19 (15) |
| Question douleur | Q14 + Q15 séparées | Q20 combinée (multi + texte) |
| Durée affichée | ~3 minutes | ~5 minutes |

---

## 📁 FICHIERS À MODIFIER

### 1. `config/questions.ts`

**Action** : Remplacer complètement par le nouveau contenu de `QUIZ_CONTENT.md` section 5.

**Points clés** :
- 20 questions au lieu de 15
- Q5-Q7 : Communication (3 questions)
- Q8-Q9 : Confiance (2 questions)
- Q10-Q11 : Intimité (2 questions)
- Q12-Q13 : Gestion des conflits (2 questions)
- Q14-Q15 : Pardon & Résilience (2 questions) ← NOUVEAU
- Q16-Q17 : Projets communs (2 questions)
- Q18-Q19 : Équilibre personnel (2 questions)
- Q20 : Question combinée (type `combined` avec multi-select + texte)

```typescript
// Nouvelle structure pour Q20
{
  id: 'Q20',
  type: 'combined', // Nouveau type
  dimension: null,
  text: {
    fr: "Qu'est-ce qui t'inquiète le plus dans ta relation actuellement ?",
    en: 'What worries you most about your relationship right now?',
  },
  options: [
    // 9 options pour la partie multi-select
  ],
  maxSelect: 3,
  placeholder: {
    fr: 'Si tu pouvais changer UNE chose dans ta relation, ce serait quoi ?',
    en: 'If you could change ONE thing in your relationship, what would it be?',
  },
  maxLength: 500,
}
```

---

### 2. `config/dimensions.ts`

**Action** : Ajouter la 7ème dimension `forgiveness` et mettre à jour les poids.

```typescript
export const dimensions = {
  communication: {
    code: 'communication',
    questions: ['Q5', 'Q6', 'Q7'], // 3 questions maintenant
    weight: 1.2,
    labels: {
      fr: { name: 'Communication', icon: '💬', description: 'Qualité des échanges et écoute' },
      en: { name: 'Communication', icon: '💬', description: 'Quality of exchanges and listening' },
    },
  },
  trust: {
    code: 'trust',
    questions: ['Q8', 'Q9'],
    weight: 1.2,
    labels: {
      fr: { name: 'Confiance', icon: '🛡️', description: 'Transparence et sécurité émotionnelle' },
      en: { name: 'Trust', icon: '🛡️', description: 'Transparency and emotional safety' },
    },
  },
  intimacy: {
    code: 'intimacy',
    questions: ['Q10', 'Q11'],
    weight: 1.0,
    labels: {
      fr: { name: 'Intimité', icon: '❤️', description: 'Connexion émotionnelle et physique' },
      en: { name: 'Intimacy', icon: '❤️', description: 'Emotional and physical connection' },
    },
  },
  conflict: {
    code: 'conflict',
    questions: ['Q12', 'Q13'],
    weight: 1.0,
    labels: {
      fr: { name: 'Gestion des conflits', icon: '⚖️', description: 'Manière de gérer les désaccords' },
      en: { name: 'Conflict Management', icon: '⚖️', description: 'How you handle disagreements' },
    },
  },
  // ⚠️ NOUVELLE DIMENSION
  forgiveness: {
    code: 'forgiveness',
    questions: ['Q14', 'Q15'],
    weight: 1.0,
    labels: {
      fr: { name: 'Pardon & Résilience', icon: '🕊️', description: 'Capacité à dépasser les blessures' },
      en: { name: 'Forgiveness & Resilience', icon: '🕊️', description: 'Ability to move past hurts' },
    },
  },
  projects: {
    code: 'projects',
    questions: ['Q16', 'Q17'], // Numéros décalés
    weight: 0.8,
    labels: {
      fr: { name: 'Projets communs', icon: '🚀', description: 'Vision partagée du futur' },
      en: { name: 'Shared Projects', icon: '🚀', description: 'Shared vision for the future' },
    },
  },
  balance: {
    code: 'balance',
    questions: ['Q18', 'Q19'], // Numéros décalés
    weight: 0.8,
    labels: {
      fr: { name: 'Équilibre personnel', icon: '☯️', description: 'Espace individuel et identité' },
      en: { name: 'Personal Balance', icon: '☯️', description: 'Individual space and identity' },
    },
  },
};

export type DimensionCode = keyof typeof dimensions;
```

---

### 3. `lib/scoring.ts`

**Action** : Mettre à jour pour gérer 7 dimensions avec poids pondérés.

```typescript
import { dimensions, DimensionCode } from '@/config/dimensions';

export function calculateDimensionScore(
  dimension: DimensionCode,
  answers: Record<string, number>
): number {
  const config = dimensions[dimension];
  const scores = config.questions.map(q => answers[q] || 0);
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(average * 10); // 0-100
}

export function calculateAllDimensionScores(
  answers: Record<string, number>
): Record<DimensionCode, number> {
  const scores: Partial<Record<DimensionCode, number>> = {};
  
  for (const dimension of Object.keys(dimensions) as DimensionCode[]) {
    scores[dimension] = calculateDimensionScore(dimension, answers);
  }
  
  return scores as Record<DimensionCode, number>;
}

export function calculateGlobalScore(
  dimensionScores: Record<DimensionCode, number>
): number {
  let weightedSum = 0;
  let totalWeight = 0;
  
  for (const [dimension, score] of Object.entries(dimensionScores)) {
    const weight = dimensions[dimension as DimensionCode].weight;
    weightedSum += score * weight;
    totalWeight += weight;
  }
  
  return Math.round(weightedSum / totalWeight);
}

// Inchangé
export function getScoreLabel(score: number, locale: 'fr' | 'en') { /* ... */ }
export function classifyDimension(score: number) { /* ... */ }
```

---

### 4. `locales/fr.json` et `locales/en.json`

**Action** : Ajouter les traductions pour :
- Les 5 nouvelles questions (Q7, Q14, Q15, Q16-Q19 renumérotées, Q20)
- La nouvelle dimension "Pardon & Résilience"
- La durée "~5 minutes" au lieu de "~3 minutes"

**Exemple pour fr.json** :
```json
{
  "landing": {
    "hero": {
      "duration": "~5 minutes",
      "dimensions_count": "7 dimensions analysées"
    }
  },
  "dimensions": {
    "forgiveness": {
      "name": "Pardon & Résilience",
      "icon": "🕊️",
      "description": "Capacité à dépasser les blessures"
    }
  },
  "quiz": {
    "progress": "Question {{current}}/20",
    "Q14": {
      "text": "Quand ton/ta partenaire te blesse (même involontairement), tu arrives à lui pardonner ?",
      "options": {
        "easily": "Oui, je pardonne et je passe à autre chose",
        "time": "Oui, mais j'ai besoin de temps",
        "grudge": "Difficilement — je garde rancune un moment",
        "struggle": "Non, j'ai du mal à tourner la page"
      }
    },
    "Q15": {
      "text": "Y a-t-il des blessures ou des erreurs passées qui affectent encore votre relation aujourd'hui ?",
      "options": {
        "none": "Non, on a réussi à tout dépasser ensemble",
        "working": "Un peu, mais on travaille dessus",
        "some": "Oui, certains sujets restent douloureux",
        "heavy": "Oui, ça pèse lourdement sur nous"
      }
    }
    // ... Q16-Q20
  }
}
```

---

### 5. `components/quiz/ProgressBar.tsx`

**Action** : Mettre à jour le total à 20 questions.

```typescript
// Avant
const TOTAL_QUESTIONS = 15;

// Après
const TOTAL_QUESTIONS = 20;

// Ou mieux, importer depuis config
import { questions } from '@/config/questions';
const TOTAL_QUESTIONS = questions.length;
```

---

### 6. `components/quiz/QuizContainer.tsx`

**Action** : 
- Mettre à jour pour gérer 20 questions
- Ajouter le support du type `combined` pour Q20

```typescript
// Ajouter le rendu pour type 'combined'
{question.type === 'combined' && (
  <CombinedQuestion
    question={question}
    onSubmit={(multiSelectValues, textValue) => {
      handleAnswer('Q20a', multiSelectValues);
      handleAnswer('Q20b', textValue);
      // ou stocker comme pain_points et change_wish
    }}
  />
)}
```

---

### 7. `components/quiz/CombinedQuestion.tsx` (NOUVEAU)

**Action** : Créer ce nouveau composant pour Q20.

```typescript
'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/config/questions';

interface CombinedQuestionProps {
  question: QuizQuestion;
  locale: 'fr' | 'en';
  onSubmit: (selectedOptions: string[], textValue: string) => void;
}

export function CombinedQuestion({ question, locale, onSubmit }: CombinedQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textValue, setTextValue] = useState('');
  
  const maxSelect = question.maxSelect || 3;
  const maxLength = question.maxLength || 500;
  
  const toggleOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(prev => prev.filter(v => v !== value));
    } else if (selectedOptions.length < maxSelect) {
      setSelectedOptions(prev => [...prev, value]);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onSubmit(selectedOptions, textValue);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Partie A : Multi-select */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          {locale === 'fr' 
            ? `Sélectionne jusqu'à ${maxSelect} réponses` 
            : `Select up to ${maxSelect} answers`}
        </p>
        <div className="space-y-2">
          {question.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${
                selectedOptions.includes(option.value)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {option.text[locale]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Partie B : Texte libre */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {question.placeholder?.[locale]}
        </label>
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value.slice(0, maxLength))}
          placeholder={locale === 'fr' 
            ? 'Décris en quelques mots...' 
            : 'Describe in a few words...'}
          className="w-full h-32 p-3 rounded-lg border border-border resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {textValue.length}/{maxLength}
        </p>
      </div>
      
      {/* Bouton continuer */}
      <button
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
      >
        {locale === 'fr' ? 'Terminer le quiz' : 'Finish quiz'}
      </button>
    </div>
  );
}
```

---

### 8. `components/landing/Dimensions.tsx`

**Action** : Ajouter la 7ème dimension "Pardon & Résilience".

```typescript
const dimensionsList = [
  { icon: '💬', name: 'Communication', description: '...' },
  { icon: '🛡️', name: 'Confiance', description: '...' },
  { icon: '❤️', name: 'Intimité', description: '...' },
  { icon: '⚖️', name: 'Gestion des conflits', description: '...' },
  { icon: '🕊️', name: 'Pardon & Résilience', description: '...' }, // NOUVEAU
  { icon: '🚀', name: 'Projets communs', description: '...' },
  { icon: '☯️', name: 'Équilibre personnel', description: '...' },
];
```

**Note** : Ajuster le grid layout pour 7 items (3+3+1 ou 4+3).

---

### 9. `components/result/DimensionRadar.tsx` (optionnel)

**Action** : Si tu utilises un graphique radar, mettre à jour pour 7 dimensions.

```typescript
const radarData = [
  { dimension: 'Communication', score: scores.communication },
  { dimension: 'Confiance', score: scores.trust },
  { dimension: 'Intimité', score: scores.intimacy },
  { dimension: 'Conflits', score: scores.conflict },
  { dimension: 'Pardon', score: scores.forgiveness }, // NOUVEAU
  { dimension: 'Projets', score: scores.projects },
  { dimension: 'Équilibre', score: scores.balance },
];
```

---

### 10. `app/[locale]/page.tsx` (Landing)

**Action** : Mettre à jour les textes affichés.

```typescript
// Avant
<p>Fais le test en 3 min</p>
<p>6 dimensions analysées</p>

// Après
<p>Fais le test en 5 min</p>
<p>7 dimensions analysées</p>
```

---

## ✅ CHECKLIST DE VÉRIFICATION

Après les modifications, vérifie que :

- [ ] Le quiz affiche "Question X/20" dans la ProgressBar
- [ ] Les 20 questions s'affichent correctement (Q1 à Q20)
- [ ] Q14-Q15 sont les nouvelles questions "Pardon & Résilience"
- [ ] Q20 combine multi-select + texte libre
- [ ] La landing page mentionne "5 minutes" et "7 dimensions"
- [ ] La section Dimensions affiche 7 cards
- [ ] Le scoring calcule 7 scores de dimension
- [ ] Le score global utilise les poids pondérés
- [ ] La page résultat affiche 7 dimensions (si radar chart)
- [ ] Les traductions FR et EN sont complètes
- [ ] Pas d'erreurs TypeScript

---

## 🔄 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **config/dimensions.ts** — Ajouter forgiveness
2. **config/questions.ts** — Remplacer par les 20 questions
3. **lib/scoring.ts** — Mettre à jour le calcul
4. **locales/*.json** — Ajouter les traductions manquantes
5. **components/quiz/CombinedQuestion.tsx** — Créer le composant
6. **components/quiz/QuizContainer.tsx** — Supporter type `combined`
7. **components/quiz/ProgressBar.tsx** — Total = 20
8. **components/landing/Dimensions.tsx** — 7 cards
9. **components/landing/Hero.tsx** — "5 minutes", "7 dimensions"
10. **components/result/** — Mettre à jour si nécessaire

---

## 📝 NOTES IMPORTANTES

1. **Ne pas casser le Sprint 1 existant** — Teste chaque modification
2. **Backward compatibility** — Les sessions existantes en DB avec 6 dimensions resteront valides (les nouvelles auront 7)
3. **Maquettes Stitch** — Si la maquette n'a que 6 dimensions, adapte le layout pour 7 (grid 4+3 ou 3+3+1)
4. **Tests manuels** — Fais un parcours complet du quiz après les modifs

---

## 🚀 APRÈS LA CORRECTION

Une fois le Sprint 1 corrigé, tu peux passer au **Sprint 2** :
- Intégration Stripe Checkout
- Génération PDF avec 7 dimensions
- Envoi email SendGrid