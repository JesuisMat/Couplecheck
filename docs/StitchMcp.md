# STITCH_MCP.md — CoupleCheck

## Utilisation du MCP Stitch dans Claude Code

### Vue d'ensemble

Les maquettes CoupleCheck sont créées dans Google Stitch et connectées via MCP à Claude Code.

**Avantage** : Claude Code peut directement accéder aux designs pour extraire les styles exacts (couleurs, fonts, espacements) et les implémenter fidèlement.

---

## Pages disponibles dans Stitch

| Page | Composants | Priorité |
|------|------------|----------|
| **Landing Page** | Hero, HowItWorks, Dimensions, FAQ, Footer | Sprint 1 |
| **Quiz - Single** | ProgressBar, Question, OptionCards | Sprint 1 |
| **Quiz - Multi** | ProgressBar, Question, Checkboxes, CTA | Sprint 1 |
| **Quiz - Text** | ProgressBar, Question, TextArea, CTA | Sprint 1 |
| **Email Capture** | Form, Input, Checkbox, Button | Sprint 1 |
| **Page Résultat** | ScoreGauge, Strengths, RisksTeaser, PricingCards | Sprint 1 |
| **Chat Agent IA** | Header, MessageBubbles, Input | Sprint 4 |
| **Mobile Versions** | Toutes les pages en responsive | Sprint 1 |

---

## Workflow recommandé

### Étape 1 : Avant de coder un composant

```
Claude Code, avant de coder le composant Hero :
1. Utilise le MCP Stitch pour récupérer la maquette "Landing Page"
2. Extrais les valeurs exactes du Hero :
   - Couleur du background
   - Couleur et taille du titre
   - Couleur et taille du sous-titre
   - Couleur, padding, border-radius du bouton CTA
   - Espacements entre les éléments
3. Implémente en Tailwind avec ces valeurs exactes
```

### Étape 2 : Extraction des design tokens

Le MCP Stitch devrait te permettre d'extraire :

| Token | Exemple | Usage Tailwind |
|-------|---------|----------------|
| Couleurs | `#FF6B6B` | `bg-[#FF6B6B]` ou ajouter à tailwind.config |
| Font size | `32px` | `text-[32px]` ou `text-3xl` si proche |
| Font weight | `600` | `font-semibold` |
| Padding | `24px` | `p-6` ou `p-[24px]` |
| Border radius | `12px` | `rounded-xl` ou `rounded-[12px]` |
| Shadow | `0 4px 12px rgba(0,0,0,0.1)` | `shadow-md` ou custom |

### Étape 3 : Configuration Tailwind

Si les maquettes utilisent des couleurs/valeurs récurrentes, ajoute-les dans `tailwind.config.ts` :

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        // Extraites depuis Stitch
        'coral': '#FF6B6B',
        'coral-light': '#FFE5E5',
        'surface': '#FAFAFA',
        // etc.
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      // etc.
    },
  },
};
```

---

## Instructions pour Claude Code

Ajoute ceci au début de chaque session de dev UI :

```
## 🎨 DESIGN SYSTEM — MCP STITCH

J'ai connecté le MCP Stitch avec les maquettes CoupleCheck.

**Règles obligatoires :**

1. **AVANT de coder tout composant UI**, utilise le MCP Stitch pour récupérer le design
2. **Extrais les valeurs exactes** : couleurs hex, font-size, font-weight, padding, margin, border-radius, shadows
3. **Implémente fidèlement** en Tailwind, utilise les valeurs arbitraires si nécessaire (ex: `text-[#FF6B6B]`)
4. **Vérifie le responsive** : récupère aussi la version mobile depuis Stitch
5. **Ne devine jamais** : si tu n'as pas accès au design, demande-moi ou utilise les fallback définis

**Mapping pages ↔ composants :**
- Landing Page → Hero.tsx, HowItWorks.tsx, Dimensions.tsx, FAQ.tsx, Footer.tsx
- Quiz Single → QuizContainer.tsx, Question.tsx, OptionCard.tsx
- Quiz Multi → MultiSelectQuestion.tsx
- Quiz Text → TextQuestion.tsx
- Email Capture → EmailCapture.tsx
- Page Résultat → ScoreGauge.tsx, StrengthsList.tsx, RisksTeaser.tsx, PricingCards.tsx
```

---

## Checklist design par composant

### Landing Page

| Composant | Éléments à extraire de Stitch |
|-----------|-------------------------------|
| **Hero** | Background, Headline (font, size, color), Subtitle, CTA button (colors, radius, padding), Badge social proof |
| **HowItWorks** | Section title, Card style, Icons, Step numbers, Descriptions |
| **Dimensions** | Grid layout, Card style, Icons, Labels, Descriptions |
| **FAQ** | Accordion style, Question font, Answer font, Open/close icon |
| **Footer** | Background, Links style, Logo, Copyright |

### Quiz

| Composant | Éléments à extraire de Stitch |
|-----------|-------------------------------|
| **ProgressBar** | Height, Background, Fill color, Border radius |
| **Question** | Font size, Font weight, Margin |
| **OptionCard** | Background, Border, Border radius, Padding, Selected state, Hover state |
| **MultiSelect** | Checkbox style, Selected style |
| **TextArea** | Border, Border radius, Placeholder color, Focus state |

### Page Résultat

| Composant | Éléments à extraire de Stitch |
|-----------|-------------------------------|
| **ScoreGauge** | Circle size, Stroke width, Colors per score range, Animation |
| **StrengthsList** | Card style, Check icon, Text styles |
| **RisksTeaser** | Blur effect, Lock icon, Overlay style |
| **PricingCards** | Card dimensions, Badge "POPULAIRE", Prix barré, CTA styles, Features list |

---

## Fallback si MCP indisponible

Si le MCP Stitch ne répond pas, utilise ces valeurs par défaut :

```css
/* Couleurs */
--color-primary: #FF6B6B;      /* Rose corail */
--color-primary-light: #FFE5E5; /* Rose pâle */
--color-surface: #FAFAFA;       /* Fond */
--color-text: #1A1A1A;          /* Texte principal */
--color-text-muted: #6B7280;    /* Texte secondaire */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;

/* Espacements */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;

/* Border radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.15);

/* Typography */
--font-sans: 'Inter', system-ui, sans-serif;
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
--text-4xl: 40px;
```