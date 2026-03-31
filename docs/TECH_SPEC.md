# TECH_SPEC.md — CoupleCheck

## 1. Stack technique

### 1.1 Vue d'ensemble

| Layer | Technologie | Justification |
|-------|-------------|---------------|
| **Frontend** | Next.js 14 (App Router) | SSR, SEO, performance |
| **Styling** | Tailwind CSS + shadcn/ui | Rapidité dev, composants accessibles |
| **Base de données** | Supabase (PostgreSQL) | Auth, Realtime, Storage, gratuit au démarrage |
| **Auth** | Supabase Auth (magic link) | Zero friction, email only |
| **Paiement** | Stripe Checkout | Standard, fiable |
| **Analytics** | PostHog | Funnels, replays, feature flags |
| **Email** | SendGrid | Expérience existante, deliverability prouvé |
| **LLM** | OpenRouter (abstraction) | Flexibilité provider (Mistral, GPT, Claude) |
| **PDF** | @react-pdf/renderer | Génération côté serveur |
| **Hébergement** | Vercel | Optimal pour Next.js |
| **CDN/Sécurité** | Cloudflare | Anti-bot, WAF, cache |
| **i18n** | next-intl | Routing localisé FR/EN |

### 1.2 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                               │
│                   (WAF, Anti-bot, CDN)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          VERCEL                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Next.js App                           │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │   Pages     │  │     API     │  │  Server     │      │    │
│  │  │  (App Dir)  │  │   Routes    │  │  Actions    │      │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Supabase   │      │   Stripe    │      │  OpenRouter │
│  (DB/Auth)  │      │  (Paiement) │      │    (LLM)    │
└─────────────┘      └─────────────┘      └─────────────┘
         │
         ▼
┌─────────────┐      ┌─────────────┐
│  SendGrid   │      │   PostHog   │
│   (Email)   │      │ (Analytics) │
└─────────────┘      └─────────────┘
```

---

## 2. Structure du projet

```
couplecheck/
├── app/
│   ├── [locale]/                    # Routes localisées (fr, en)
│   │   ├── page.tsx                 # Landing page
│   │   ├── quiz/
│   │   │   └── page.tsx             # Quiz interactif
│   │   ├── result/
│   │   │   └── [sessionId]/
│   │   │       └── page.tsx         # Résultat tronqué
│   │   ├── checkout/
│   │   │   └── page.tsx             # Redirect Stripe
│   │   ├── success/
│   │   │   └── page.tsx             # Post-paiement
│   │   └── chat/                    # Agent IA (V1.2)
│   │       └── page.tsx
│   ├── api/
│   │   ├── quiz/
│   │   │   └── submit/route.ts      # Soumission quiz
│   │   ├── report/
│   │   │   ├── generate/route.ts    # Génération PDF
│   │   │   └── [id]/route.ts        # Téléchargement PDF
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts    # Création session
│   │   │   └── webhook/route.ts     # Webhook Stripe
│   │   ├── email/
│   │   │   └── send/route.ts        # Envoi emails
│   │   └── chat/                    # Agent IA (V1.2)
│   │       └── route.ts
│   └── layout.tsx
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Dimensions.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── quiz/
│   │   ├── QuizContainer.tsx
│   │   ├── Question.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── OptionCard.tsx
│   │   └── EmailCapture.tsx
│   ├── result/
│   │   ├── ScoreGauge.tsx
│   │   ├── StrengthsCard.tsx
│   │   ├── RisksTeaser.tsx
│   │   └── PricingCards.tsx
│   └── ui/                          # shadcn components
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── stripe.ts
│   ├── resend.ts
│   ├── openrouter.ts
│   ├── scoring.ts                   # Logique de scoring
│   ├── report-generator.ts          # Génération PDF
│   └── posthog.ts
├── locales/
│   ├── fr.json
│   └── en.json
├── types/
│   ├── quiz.ts
│   ├── report.ts
│   └── database.ts
├── hooks/
│   ├── useQuiz.ts
│   └── useAnalytics.ts
└── config/
    ├── questions.ts                 # Questions du quiz
    └── dimensions.ts                # Définition des dimensions
```

---

## 3. Schéma base de données (Supabase)

### 3.1 Tables

```sql
-- Sessions de quiz (anonymes)
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  locale VARCHAR(2) NOT NULL DEFAULT 'fr',
  
  -- Segmentation (Q1-Q4)
  age_range VARCHAR(10),
  gender VARCHAR(20),
  relationship_duration VARCHAR(20),
  relationship_status VARCHAR(20),
  
  -- Réponses évaluation Q5-Q19 (JSONB pour flexibilité)
  answers JSONB NOT NULL DEFAULT '{}',
  
  -- Question douleur Q20
  pain_points TEXT[], -- Q20a multi-select (max 3)
  change_wish TEXT,   -- Q20b texte libre
  
  -- Scores calculés (7 dimensions)
  scores JSONB, -- { communication: 72, trust: 65, intimacy: 80, conflict: 55, forgiveness: 70, projects: 85, balance: 75 }
  global_score INTEGER,
  
  -- Statut
  completed BOOLEAN DEFAULT FALSE,
  email_captured BOOLEAN DEFAULT FALSE
);

-- Leads (après capture email)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES quiz_sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  locale VARCHAR(2) NOT NULL DEFAULT 'fr',
  
  -- Consentements
  newsletter_consent BOOLEAN DEFAULT FALSE,
  
  -- Statut
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMPTZ,
  
  -- Email sequence
  last_email_sent VARCHAR(50), -- 'welcome', 'reminder_j2', 'offer_j5', etc.
  last_email_at TIMESTAMPTZ,
  unsubscribed BOOLEAN DEFAULT FALSE,
  
  UNIQUE(email)
);

-- Achats
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  session_id UUID REFERENCES quiz_sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Stripe
  stripe_session_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  
  -- Offre
  offer_type VARCHAR(20) NOT NULL, -- 'standard', 'premium'
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Statut
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'refunded'
  completed_at TIMESTAMPTZ,
  
  -- Rapport
  report_generated BOOLEAN DEFAULT FALSE,
  report_url TEXT,
  report_sent_at TIMESTAMPTZ
);

-- Rapports générés (cache)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id),
  session_id UUID REFERENCES quiz_sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contenu
  content JSONB NOT NULL, -- Structure du rapport
  pdf_storage_path TEXT,  -- Chemin Supabase Storage
  
  -- Metadata
  llm_provider VARCHAR(50),
  llm_model VARCHAR(100),
  generation_time_ms INTEGER
);

-- Utilisateurs Agent IA (V1.2)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  email VARCHAR(255) NOT NULL UNIQUE,
  lead_id UUID REFERENCES leads(id),
  
  -- Abonnement
  subscription_status VARCHAR(20) DEFAULT 'trial', -- 'trial', 'active', 'cancelled', 'expired'
  subscription_started_at TIMESTAMPTZ,
  subscription_ends_at TIMESTAMPTZ,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255)
);

-- Conversations Agent IA (V1.2)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  role VARCHAR(20) NOT NULL, -- 'user', 'assistant'
  content TEXT NOT NULL,
  
  -- Metadata
  tokens_used INTEGER
);

-- Index pour performance
CREATE INDEX idx_sessions_created ON quiz_sessions(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_session ON leads(session_id);
CREATE INDEX idx_purchases_lead ON purchases(lead_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_chat_user ON chat_messages(user_id, created_at DESC);
```

### 3.2 Row Level Security (RLS)

```sql
-- Les sessions sont publiques en écriture (anonyme)
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create sessions" ON quiz_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own session" ON quiz_sessions FOR SELECT USING (true);

-- Les leads sont gérés côté serveur uniquement
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Pas de policy publique, accès via service_role uniquement

-- Idem pour purchases et reports
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users peuvent lire leurs propres données
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own data" ON users FOR SELECT USING (auth.uid() = id);

-- Chat messages accessibles par le propriétaire
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own messages" ON chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 4. API Routes

### 4.1 POST /api/quiz/submit

```typescript
// Input
interface QuizSubmitRequest {
  sessionId: string;
  answers: Record<string, string | string[] | number>;
  locale: 'fr' | 'en';
}

// Output
interface QuizSubmitResponse {
  success: boolean;
  sessionId: string;
  scores: {
    communication: number;
    trust: number;
    intimacy: number;
    conflict: number;
    projects: number;
    balance: number;
  };
  globalScore: number;
}

// Logique
// 1. Valider les réponses
// 2. Calculer les scores par dimension
// 3. Calculer le score global
// 4. Sauvegarder en BDD
// 5. Track PostHog event
```

### 4.2 POST /api/leads/capture

```typescript
// Input
interface LeadCaptureRequest {
  sessionId: string;
  email: string;
  firstName: string;
  newsletterConsent: boolean;
  locale: 'fr' | 'en';
}

// Output
interface LeadCaptureResponse {
  success: boolean;
  leadId: string;
  resultUrl: string;
}

// Logique
// 1. Valider email
// 2. Créer ou mettre à jour lead
// 3. Envoyer email avec résultat
// 4. Track PostHog event
```

### 4.3 POST /api/stripe/checkout

```typescript
// Input
interface CheckoutRequest {
  sessionId: string;
  leadId: string;
  offerType: 'standard' | 'premium';
  locale: 'fr' | 'en';
}

// Output
interface CheckoutResponse {
  checkoutUrl: string;
}

// Logique
// 1. Créer Stripe Checkout Session
// 2. Metadata : sessionId, leadId, offerType
// 3. Success/Cancel URLs
// 4. Retourner l'URL
```

### 4.4 POST /api/stripe/webhook

```typescript
// Events gérés
// - checkout.session.completed → Générer rapport + envoyer email
// - customer.subscription.updated → Mettre à jour statut user
// - customer.subscription.deleted → Désactiver accès Agent IA
```

### 4.5 POST /api/report/generate

```typescript
// Input
interface ReportGenerateRequest {
  sessionId: string;
  purchaseId: string;
}

// Output
interface ReportGenerateResponse {
  reportId: string;
  pdfUrl: string;
}

// Logique
// 1. Récupérer session + scores
// 2. Générer contenu statique (structure, scores, radar)
// 3. Appeler LLM pour sections dynamiques (recommandations, plan action)
// 4. Assembler PDF avec @react-pdf/renderer
// 5. Upload sur Supabase Storage
// 6. Sauvegarder metadata en BDD
```

### 4.6 POST /api/chat (V1.2)

```typescript
// Input
interface ChatRequest {
  message: string;
}

// Output (streaming)
interface ChatResponse {
  content: string; // Streamed
}

// Logique
// 1. Vérifier auth + abonnement actif
// 2. Récupérer contexte (quiz answers + historique)
// 3. Construire prompt système avec contexte
// 4. Appeler LLM en streaming
// 5. Sauvegarder message + réponse
```

---

## 5. Intégrations

### 5.1 Stripe

```typescript
// config/stripe.ts
export const STRIPE_PRODUCTS = {
  standard: {
    priceId: process.env.STRIPE_PRICE_STANDARD!, // 12.90€
    amount: 1290,
  },
  premium: {
    priceId: process.env.STRIPE_PRICE_PREMIUM!, // 19.90€
    amount: 1990,
  },
  subscription: {
    priceId: process.env.STRIPE_PRICE_SUBSCRIPTION!, // 4.99€/mois
    amount: 499,
  },
};
```

### 5.2 SendGrid

```typescript
// lib/sendgrid.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendResultEmail(params: {
  to: string;
  firstName: string;
  locale: 'fr' | 'en';
  resultUrl: string;
  globalScore: number;
}) {
  const templateId = params.locale === 'fr' 
    ? process.env.SENDGRID_TEMPLATE_RESULT_FR 
    : process.env.SENDGRID_TEMPLATE_RESULT_EN;

  await sgMail.send({
    to: params.to,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: 'CoupleCheck',
    },
    templateId,
    dynamicTemplateData: {
      firstName: params.firstName,
      resultUrl: params.resultUrl,
      globalScore: params.globalScore,
    },
    customArgs: {
      sessionId: params.sessionId, // Pour tracking webhooks
    },
  });
}

export async function sendReportEmail(params: {
  to: string;
  firstName: string;
  locale: 'fr' | 'en';
  pdfUrl: string;
  offerType: 'standard' | 'premium';
  agentAccessUrl?: string;
}) {
  const templateId = params.locale === 'fr'
    ? process.env.SENDGRID_TEMPLATE_REPORT_FR
    : process.env.SENDGRID_TEMPLATE_REPORT_EN;

  await sgMail.send({
    to: params.to,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: 'CoupleCheck',
    },
    templateId,
    dynamicTemplateData: {
      firstName: params.firstName,
      pdfUrl: params.pdfUrl,
      offerType: params.offerType,
      agentAccessUrl: params.agentAccessUrl,
      isPremium: params.offerType === 'premium',
    },
  });
}

// Séquence email relance (via SendGrid Marketing Campaigns ou n8n)
export async function addToRelanceSequence(params: {
  email: string;
  firstName: string;
  locale: 'fr' | 'en';
  globalScore: number;
  sessionId: string;
}) {
  // Option 1: Ajouter à une liste SendGrid pour automation
  // Option 2: Trigger un workflow n8n
  // Tu utilises déjà n8n, donc je recommande Option 2
}
```

### 5.3 OpenRouter (LLM)

```typescript
// lib/openrouter.ts
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateReportContent(params: {
  scores: Record<string, number>;
  answers: Record<string, any>;
  locale: 'fr' | 'en';
}): Promise<{
  interpretation: string;
  recommendations: string[];
  actionPlan: string[];
}> {
  // Prompt structuré pour générer le contenu personnalisé
}

export async function chatWithCoach(params: {
  message: string;
  context: {
    quizAnswers: Record<string, any>;
    scores: Record<string, number>;
    chatHistory: Array<{ role: string; content: string }>;
  };
  locale: 'fr' | 'en';
}): Promise<ReadableStream> {
  // Streaming response pour le chat
}
```

### 5.4 PostHog

```typescript
// lib/posthog.ts
import posthog from 'posthog-js';

export const EVENTS = {
  QUIZ_STARTED: 'quiz_started',
  QUIZ_QUESTION_ANSWERED: 'quiz_question_answered',
  QUIZ_COMPLETED: 'quiz_completed',
  EMAIL_SUBMITTED: 'email_submitted',
  RESULT_VIEWED: 'result_viewed',
  CHECKOUT_INITIATED: 'checkout_initiated',
  PURCHASE_COMPLETED: 'purchase_completed',
  REPORT_DOWNLOADED: 'report_downloaded',
  CHAT_MESSAGE_SENT: 'chat_message_sent',
} as const;
```

---

## 6. Génération PDF

### 6.1 Structure du rapport

```typescript
// types/report.ts
interface ReportData {
  meta: {
    firstName: string;
    generatedAt: Date;
    locale: 'fr' | 'en';
  };
  
  globalScore: {
    value: number; // 0-100
    label: string; // "Relation Stable", "À surveiller", "En difficulté"
    interpretation: string; // Généré par IA
  };
  
  dimensions: Array<{
    key: string;
    label: string;
    score: number;
    description: string;
    status: 'strength' | 'neutral' | 'risk';
  }>;
  
  strengths: Array<{
    title: string;
    description: string;
  }>;
  
  risks: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
  
  benchmark: {
    percentile: number;
    comparison: string;
  };
  
  actionPlan: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  
  resources: Array<{
    type: 'book' | 'article' | 'exercise';
    title: string;
    description: string;
    url?: string;
  }>;
}
```

### 6.2 Template PDF

```tsx
// components/report/ReportPDF.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export function ReportPDF({ data }: { data: ReportData }) {
  return (
    <Document>
      {/* Page 1: Cover + Global Score */}
      <Page size="A4" style={styles.page}>
        <CoverPage firstName={data.meta.firstName} globalScore={data.globalScore} />
      </Page>
      
      {/* Page 2-3: Dimensions Analysis */}
      <Page size="A4" style={styles.page}>
        <DimensionsAnalysis dimensions={data.dimensions} />
      </Page>
      
      {/* Page 4: Strengths & Risks */}
      <Page size="A4" style={styles.page}>
        <StrengthsRisks strengths={data.strengths} risks={data.risks} />
      </Page>
      
      {/* Page 5: Action Plan */}
      <Page size="A4" style={styles.page}>
        <ActionPlan actions={data.actionPlan} />
      </Page>
      
      {/* Page 6: Resources */}
      <Page size="A4" style={styles.page}>
        <Resources resources={data.resources} />
      </Page>
    </Document>
  );
}
```

---

## 7. Variables d'environnement

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_STANDARD=price_xxx
STRIPE_PRICE_PREMIUM=price_xxx
STRIPE_PRICE_SUBSCRIPTION=price_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx

# OpenRouter
OPENROUTER_API_KEY=xxx
OPENROUTER_MODEL=mistralai/mistral-medium # ou autre

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=hello@couplecheck.app
SENDGRID_TEMPLATE_RESULT_FR=d-xxx
SENDGRID_TEMPLATE_RESULT_EN=d-xxx
SENDGRID_TEMPLATE_REPORT_FR=d-xxx
SENDGRID_TEMPLATE_REPORT_EN=d-xxx
SENDGRID_TEMPLATE_RELANCE_J2_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J5_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J7_FR=d-xxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# App
NEXT_PUBLIC_APP_URL=https://couplecheck.app
```

---

## 8. Déploiement

### 8.1 Vercel

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["cdg1"], // Paris
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://couplecheck.app"
  }
}
```

### 8.2 Cloudflare

Configuration recommandée :
- **SSL** : Full (strict)
- **WAF** : Managed ruleset activé
- **Bot Fight Mode** : Activé
- **Rate Limiting** : 100 req/min par IP sur /api/*
- **Cache** : Static assets only (pas les API routes)

### 8.3 Supabase

- **Région** : EU West (Frankfurt ou Paris)
- **Plan** : Free tier suffisant pour MVP
- **Backups** : Automatiques (Pro si besoin)