# QUIZ_CONTENT.md — CoupleCheck

## 1. Vue d'ensemble

| Paramètre | Valeur |
|-----------|--------|
| Nombre total de questions | 20 |
| Durée estimée | 4-5 minutes |
| Questions segmentation | Q1-Q4 (4) |
| Questions évaluation | Q5-Q19 (15) |
| Question douleur finale | Q20 (fermée + ouverte) |
| Langues | FR + EN |

---

## 2. Les 7 dimensions évaluées

| Dimension | Code | Description | Questions | Poids |
|-----------|------|-------------|-----------|-------|
| Communication | `communication` | Qualité des échanges, écoute active, expression des besoins | Q5, Q6, Q7 | 1.2 |
| Confiance | `trust` | Transparence, fidélité, sécurité émotionnelle | Q8, Q9 | 1.2 |
| Intimité | `intimacy` | Connexion émotionnelle et physique, vulnérabilité | Q10, Q11 | 1.0 |
| Gestion des conflits | `conflict` | Manière de gérer les désaccords, réparation | Q12, Q13 | 1.0 |
| Pardon & Résilience | `forgiveness` | Capacité à pardonner, dépasser les blessures, reconstruire | Q14, Q15 | 1.0 |
| Projets communs | `projects` | Vision du futur, alignement des objectifs de vie | Q16, Q17 | 0.8 |
| Équilibre individuel | `balance` | Espace personnel, indépendance, identité propre | Q18, Q19 | 0.8 |

### Références thérapeutiques

- **Gottman Method** : Communication, conflits, ratio 5:1
- **Attachment Theory** : Sécurité émotionnelle, confiance
- **Worthington Forgiveness Model** : Pardon et résilience
- **Bowen Differentiation** : Équilibre individu/couple

---

## 3. Questions complètes

### BLOC 1 : Segmentation (Q1-Q4)

#### Q1 — Âge

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Quel est ton âge ? |
| 🇬🇧 EN | How old are you? |

| Option FR | Option EN | Value |
|-----------|-----------|-------|
| 18-24 ans | 18-24 years old | `18-24` |
| 25-29 ans | 25-29 years old | `25-29` |
| 30-35 ans | 30-35 years old | `30-35` |
| 36 ans ou plus | 36 or older | `36+` |

**Type** : Single select | **Dimension** : Segmentation (non scorée)

---

#### Q2 — Genre

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Tu es... |
| 🇬🇧 EN | You are... |

| Option FR | Option EN | Value |
|-----------|-----------|-------|
| Une femme | A woman | `woman` |
| Un homme | A man | `man` |
| Non-binaire / Autre | Non-binary / Other | `other` |

**Type** : Single select | **Dimension** : Segmentation (non scorée)

---

#### Q3 — Durée de la relation

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Depuis combien de temps êtes-vous ensemble ? |
| 🇬🇧 EN | How long have you been together? |

| Option FR | Option EN | Value |
|-----------|-----------|-------|
| Moins de 6 mois | Less than 6 months | `<6m` |
| 6 mois à 1 an | 6 months to 1 year | `6m-1y` |
| 1 à 2 ans | 1 to 2 years | `1-2y` |
| 2 à 5 ans | 2 to 5 years | `2-5y` |
| Plus de 5 ans | More than 5 years | `5y+` |

**Type** : Single select | **Dimension** : Segmentation (non scorée)

---

#### Q4 — Situation relationnelle

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Comment décrirais-tu ta situation actuelle ? |
| 🇬🇧 EN | How would you describe your current situation? |

| Option FR | Option EN | Value |
|-----------|-----------|-------|
| En couple | In a relationship | `couple` |
| Marié(e) / Pacsé(e) | Married / Civil union | `married` |
| Fiancé(e) | Engaged | `engaged` |
| C'est compliqué | It's complicated | `complicated` |

**Type** : Single select | **Dimension** : Segmentation (non scorée)

---

### BLOC 2 : Communication (Q5-Q7)

#### Q5 — Expression des besoins

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Quand quelque chose te tracasse, tu arrives à en parler à ton/ta partenaire ? |
| 🇬🇧 EN | When something bothers you, are you able to talk about it with your partner? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, facilement et sans crainte | Yes, easily and without fear | 10 |
| La plupart du temps, oui | Most of the time, yes | 7 |
| Ça dépend du sujet | It depends on the topic | 4 |
| Non, je garde souvent pour moi | No, I often keep it to myself | 1 |

**Type** : Single select | **Dimension** : `communication`

---

#### Q6 — Écoute active

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Quand tu parles de tes émotions, tu te sens vraiment écouté(e) et compris(e) ? |
| 🇬🇧 EN | When you share your emotions, do you feel truly heard and understood? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, toujours | Yes, always | 10 |
| Généralement oui | Generally yes | 7 |
| Pas toujours, ça dépend | Not always, it depends | 4 |
| Rarement, j'ai l'impression de parler dans le vide | Rarely, I feel like I'm talking to a wall | 1 |

**Type** : Single select | **Dimension** : `communication`

---

#### Q7 — Communication non-verbale

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Est-ce que tu arrives à comprendre ce que ton/ta partenaire ressent, même sans qu'il/elle parle ? |
| 🇬🇧 EN | Can you understand what your partner feels, even without them speaking? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, on se comprend d'un regard | Yes, we understand each other with just a look | 10 |
| Souvent, je perçois les signaux | Often, I pick up on the signals | 7 |
| Parfois, mais je me trompe aussi | Sometimes, but I also get it wrong | 4 |
| Non, c'est difficile de savoir ce qu'il/elle pense | No, it's hard to know what they're thinking | 1 |

**Type** : Single select | **Dimension** : `communication`

---

### BLOC 3 : Confiance (Q8-Q9)

#### Q8 — Confiance au quotidien

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Tu fais confiance à ton/ta partenaire quand il/elle sort sans toi ? |
| 🇬🇧 EN | Do you trust your partner when they go out without you? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, totalement | Yes, completely | 10 |
| Oui, la plupart du temps | Yes, most of the time | 7 |
| J'ai parfois des doutes ou des inquiétudes | I sometimes have doubts or worries | 4 |
| Non, ça me stresse ou me rend anxieux(se) | No, it stresses me or makes me anxious | 1 |

**Type** : Single select | **Dimension** : `trust`

---

#### Q9 — Transparence

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Comment décrirais-tu la transparence entre vous ? (téléphone, réseaux, argent, sorties) |
| 🇬🇧 EN | How would you describe the transparency between you? (phone, social media, money, outings) |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Totale — on n'a rien à se cacher | Complete — we have nothing to hide | 10 |
| Bonne — on partage l'essentiel | Good — we share the essentials | 7 |
| Partielle — il y a des zones d'ombre | Partial — there are some gray areas | 4 |
| Faible — beaucoup de choses restent floues | Low — many things remain unclear | 1 |

**Type** : Single select | **Dimension** : `trust`

---

### BLOC 4 : Intimité (Q10-Q11)

#### Q10 — Intimité émotionnelle

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Te sens-tu émotionnellement proche de ton/ta partenaire ? |
| 🇬🇧 EN | Do you feel emotionally close to your partner? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, on partage tout — même nos vulnérabilités | Yes, we share everything — even our vulnerabilities | 10 |
| Globalement oui, on est connectés | Generally yes, we're connected | 7 |
| Moyennement — on reste parfois en surface | Somewhat — we sometimes stay on the surface | 4 |
| Non, je me sens distant(e) ou déconnecté(e) | No, I feel distant or disconnected | 1 |

**Type** : Single select | **Dimension** : `intimacy`

---

#### Q11 — Intimité physique

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Es-tu satisfait(e) de votre intimité physique ? (tendresse, sexualité, contact) |
| 🇬🇧 EN | Are you satisfied with your physical intimacy? (affection, sexuality, touch) |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Très satisfait(e) | Very satisfied | 10 |
| Plutôt satisfait(e) | Mostly satisfied | 7 |
| Moyennement — il y a des frustrations | Somewhat — there are some frustrations | 4 |
| Pas du tout satisfait(e) | Not satisfied at all | 1 |

**Type** : Single select | **Dimension** : `intimacy`

---

### BLOC 5 : Gestion des conflits (Q12-Q13)

#### Q12 — Déroulement des conflits

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Quand vous n'êtes pas d'accord, comment ça se passe généralement ? |
| 🇬🇧 EN | When you disagree, how does it usually go? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| On discute calmement jusqu'à trouver un terrain d'entente | We discuss calmly until we find common ground | 10 |
| On se dispute mais on finit par se réconcilier | We argue but eventually make up | 6 |
| Ça dégénère souvent — cris, mots blessants | It often escalates — yelling, hurtful words | 2 |
| On évite le sujet — rien n'est jamais vraiment résolu | We avoid the topic — nothing ever gets resolved | 1 |

**Type** : Single select | **Dimension** : `conflict`

---

#### Q13 — Réparation après conflit

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Après une dispute, vous arrivez à en reparler et à vous excuser ? |
| 🇬🇧 EN | After an argument, are you able to talk about it and apologize? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, toujours — on débriefe et on s'excuse sincèrement | Yes, always — we debrief and sincerely apologize | 10 |
| La plupart du temps | Most of the time | 7 |
| Rarement — on fait comme si de rien n'était | Rarely — we pretend nothing happened | 3 |
| Jamais — les tensions s'accumulent | Never — tensions build up | 0 |

**Type** : Single select | **Dimension** : `conflict`

---

### BLOC 6 : Pardon & Résilience (Q14-Q15) — NOUVELLE DIMENSION

#### Q14 — Capacité à pardonner

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Quand ton/ta partenaire te blesse (même involontairement), tu arrives à lui pardonner ? |
| 🇬🇧 EN | When your partner hurts you (even unintentionally), are you able to forgive them? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, je pardonne et je passe à autre chose | Yes, I forgive and move on | 10 |
| Oui, mais j'ai besoin de temps | Yes, but I need time | 7 |
| Difficilement — je garde rancune un moment | With difficulty — I hold a grudge for a while | 4 |
| Non, j'ai du mal à tourner la page | No, I struggle to let go | 1 |

**Type** : Single select | **Dimension** : `forgiveness`

---

#### Q15 — Blessures passées

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Y a-t-il des blessures ou des erreurs passées qui affectent encore votre relation aujourd'hui ? |
| 🇬🇧 EN | Are there past hurts or mistakes that still affect your relationship today? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Non, on a réussi à tout dépasser ensemble | No, we've managed to move past everything together | 10 |
| Un peu, mais on travaille dessus | A little, but we're working on it | 6 |
| Oui, certains sujets restent douloureux | Yes, some topics remain painful | 3 |
| Oui, ça pèse lourdement sur nous | Yes, it weighs heavily on us | 0 |

**Type** : Single select | **Dimension** : `forgiveness`

---

### BLOC 7 : Projets communs (Q16-Q17)

#### Q16 — Vision du futur

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Vous partagez une vision commune de l'avenir ? (enfants, lieu de vie, carrière, style de vie) |
| 🇬🇧 EN | Do you share a common vision for the future? (children, living situation, career, lifestyle) |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, on est totalement alignés | Yes, we're completely aligned | 10 |
| Sur la plupart des sujets, oui | On most topics, yes | 7 |
| On n'en a jamais vraiment parlé | We've never really talked about it | 4 |
| Non, on veut des choses différentes | No, we want different things | 1 |

**Type** : Single select | **Dimension** : `projects`

---

#### Q17 — Construction commune

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Avez-vous des projets concrets que vous construisez ensemble ? (voyages, logement, épargne, famille...) |
| 🇬🇧 EN | Do you have concrete projects you're building together? (travel, home, savings, family...) |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, plusieurs — on avance main dans la main | Yes, several — we're moving forward hand in hand | 10 |
| Oui, au moins un projet important | Yes, at least one important project | 7 |
| Pas vraiment — on vit au jour le jour | Not really — we live day by day | 4 |
| Non, chacun fait ses plans de son côté | No, each of us makes our own plans | 1 |

**Type** : Single select | **Dimension** : `projects`

---

### BLOC 8 : Équilibre individuel (Q18-Q19)

#### Q18 — Espace personnel

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Tu as assez d'espace pour tes amis, tes hobbies, ton temps seul(e) ? |
| 🇬🇧 EN | Do you have enough space for your friends, hobbies, and alone time? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, on respecte l'espace de chacun | Yes, we respect each other's space | 10 |
| Globalement oui | Generally yes | 7 |
| Pas assez — je me sens un peu étouffé(e) | Not enough — I feel a bit smothered | 4 |
| Non, ma relation prend toute la place | No, my relationship takes up everything | 1 |

**Type** : Single select | **Dimension** : `balance`

---

#### Q19 — Identité propre

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | As-tu le sentiment de rester toi-même dans cette relation ? |
| 🇬🇧 EN | Do you feel like you remain yourself in this relationship? |

| Option FR | Option EN | Score |
|-----------|-----------|-------|
| Oui, totalement — je suis épanoui(e) ET en couple | Yes, completely — I'm fulfilled AND in a relationship | 10 |
| Oui, pour l'essentiel | Yes, for the most part | 7 |
| Je me suis un peu perdu(e) en chemin | I've lost myself a bit along the way | 4 |
| Non, j'ai l'impression de m'être oublié(e) | No, I feel like I've forgotten who I am | 1 |

**Type** : Single select | **Dimension** : `balance`

---

### BLOC 9 : Question douleur finale (Q20)

#### Q20 — Priorité & Souhait de changement

**Partie A — Fermée (Multi-select)**

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Qu'est-ce qui t'inquiète le plus dans ta relation actuellement ? |
| 🇬🇧 EN | What worries you most about your relationship right now? |

| Option FR | Option EN | Value |
|-----------|-----------|-------|
| La communication au quotidien | Day-to-day communication | `communication` |
| La confiance ou la jalousie | Trust or jealousy | `trust` |
| L'intimité (émotionnelle ou physique) | Intimacy (emotional or physical) | `intimacy` |
| Les disputes et leur gestion | Arguments and how we handle them | `conflict` |
| Les blessures du passé non résolues | Unresolved past hurts | `forgiveness` |
| Nos projets de vie différents | Our different life goals | `projects` |
| Le manque de temps ensemble | Lack of time together | `time` |
| Le manque d'espace personnel | Lack of personal space | `balance` |
| Autre chose | Something else | `other` |

**Type** : Multi select (max 3) | **Dimension** : Non scorée

**Partie B — Ouverte**

| Langue | Question |
|--------|----------|
| 🇫🇷 FR | Si tu pouvais changer UNE chose dans ta relation, ce serait quoi ? |
| 🇬🇧 EN | If you could change ONE thing in your relationship, what would it be? |

| Placeholder FR | Placeholder EN |
|----------------|----------------|
| Décris en quelques mots ce que tu aimerais améliorer... | Describe in a few words what you'd like to improve... |

**Type** : Texte libre (max 500 caractères) | **Dimension** : Non scorée

---

## 4. Système de scoring

### 4.1 Configuration des dimensions

```typescript
// config/dimensions.ts

export const dimensions = {
  communication: {
    code: 'communication',
    questions: ['Q5', 'Q6', 'Q7'],
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
    questions: ['Q16', 'Q17'],
    weight: 0.8,
    labels: {
      fr: { name: 'Projets communs', icon: '🚀', description: 'Vision partagée du futur' },
      en: { name: 'Shared Projects', icon: '🚀', description: 'Shared vision for the future' },
    },
  },
  balance: {
    code: 'balance',
    questions: ['Q18', 'Q19'],
    weight: 0.8,
    labels: {
      fr: { name: 'Équilibre personnel', icon: '☯️', description: 'Espace individuel et identité' },
      en: { name: 'Personal Balance', icon: '☯️', description: 'Individual space and identity' },
    },
  },
};

export type DimensionCode = keyof typeof dimensions;
```

### 4.2 Calcul des scores

```typescript
// lib/scoring.ts

import { dimensions, DimensionCode } from '@/config/dimensions';

export function calculateDimensionScore(
  dimension: DimensionCode,
  answers: Record<string, number>
): number {
  const config = dimensions[dimension];
  const scores = config.questions.map(q => answers[q] || 0);
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(average * 10); // Converti en 0-100
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

export function getScoreLabel(score: number, locale: 'fr' | 'en') {
  if (score >= 80) {
    return {
      label: locale === 'fr' ? 'Relation épanouie' : 'Thriving relationship',
      color: 'green',
      emoji: '🌟',
    };
  }
  if (score >= 60) {
    return {
      label: locale === 'fr' ? 'Relation stable' : 'Stable relationship',
      color: 'yellow',
      emoji: '✓',
    };
  }
  if (score >= 40) {
    return {
      label: locale === 'fr' ? 'À surveiller' : 'Needs attention',
      color: 'orange',
      emoji: '⚠️',
    };
  }
  return {
    label: locale === 'fr' ? 'En difficulté' : 'In difficulty',
    color: 'red',
    emoji: '🚨',
  };
}

export function classifyDimension(score: number): 'strength' | 'neutral' | 'risk' {
  if (score >= 70) return 'strength';
  if (score >= 40) return 'neutral';
  return 'risk';
}
```

---

## 5. UX du quiz

### 5.1 Progression

- Barre : "Question 7/20"
- Pourcentage : "35% complété"
- Temps restant (optionnel) : "~3 min restantes"

### 5.2 Labels de section (optionnel pour UX)

| Questions | Label FR | Label EN |
|-----------|----------|----------|
| Q1-Q4 | Quelques infos sur toi | A few things about you |
| Q5-Q7 | Communication | Communication |
| Q8-Q9 | Confiance | Trust |
| Q10-Q11 | Intimité | Intimacy |
| Q12-Q13 | Gestion des conflits | Conflict Management |
| Q14-Q15 | Pardon & Résilience | Forgiveness & Resilience |
| Q16-Q17 | Projets communs | Shared Projects |
| Q18-Q19 | Équilibre personnel | Personal Balance |
| Q20 | Une dernière question | One last question |

### 5.3 Durée affichée

- Landing page : "~5 minutes"
- Réalité : 4-5 min