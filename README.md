# CoupleCheck 💑

> **"En 5 minutes, découvre ce qui renforce — ou fragilise — ton couple."**

Application web de diagnostic relationnel basée sur **7 dimensions validées en psychologie des couples**. Le quiz de 20 questions génère un rapport personnalisé par IA, avec un upsell vers un agent coach conversationnel.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)](https://stripe.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Private-red)](.)

---

## Table des matières

- [Vision produit](#vision-produit)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Structure du projet](#structure-du-projet)
- [Schéma de base de données](#schéma-de-base-de-données)
- [Parcours utilisateur](#parcours-utilisateur)
- [Quiz — 7 dimensions analysées](#quiz--7-dimensions-analysées)
- [Système de scoring](#système-de-scoring)
- [Modèle économique](#modèle-économique)
- [Installation & Setup](#installation--setup)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement](#déploiement)
- [Roadmap](#roadmap)
- [RGPD & Conformité](#rgpd--conformité)

---

## Vision produit

CoupleCheck permet aux personnes en couple (ou en situationship) d'évaluer la santé de leur relation en 5 minutes. Le produit est positionné comme **accessible, fun et viral** — pas clinique.

### Cibles principales

| Persona | Profil | Douleur | Trigger |
|---------|--------|---------|---------|
| **L'Anxieuse chronique** | Femme 22-30 ans, couple 1-3 ans | Doute permanent, compare son couple aux autres | Contenu TikTok/Instagram |
| **La Crise active** | 25-35 ans, couple 2-5 ans | Dispute récente, cherche des solutions concrètes | Google "couple en crise" |

### Objectifs MVP

| Métrique | M1 | M3 |
|----------|----|----|
| Visiteurs uniques | 2 000 | 10 000 |
| Taux completion quiz | 65% | 75% |
| Taux capture email | 50% | 60% |
| Taux conversion payant | 5% | 8% |
| Revenu mensuel | 650 € | 3 500 € |

---

## Fonctionnalités

### MVP (Sprints 1 & 2)

- **Landing page** FR/EN avec social proof, FAQ, 7 dimensions illustrées
- **Quiz interactif** 20 questions avec barre de progression et animations
- **Capture email** avec consentement RGPD
- **Page résultat tronqué** : score global + points forts + zones à risque floutées
- **Paiement Stripe** : offre Standard (12,90 €) et Premium (19,90 €)
- **Génération PDF** automatique (rapport 15 pages, personnalisé par IA)
- **Envoi email** avec PDF en pièce jointe via SendGrid

### Optimisation (Sprint 3)

- **Séquence emails relance** automatisée (J+0, J+2, J+5, J+7, J+14)
- **A/B testing** headlines et pricing via PostHog feature flags
- **Analytics complet** : funnels, replays, événements PostHog
- **SEO** : sitemap, meta tags dynamiques, Schema.org
- **Pages légales** : CGV, mentions légales, politique de confidentialité

### Agent IA Coach (Sprint 4 — Premium)

- **Chat conversationnel** avec contexte du quiz injecté
- **Auth magic link** via Supabase (zéro friction)
- **Historique persisté** en base de données
- **Abonnement** 4,99 €/mois après 1 mois inclus avec Premium
- Tone : empathique, non-jugeant, actionnable

---

## Stack technique

| Layer | Technologie | Justification |
|-------|-------------|---------------|
| **Frontend** | Next.js 14 (App Router) | SSR, SEO, performance |
| **Styling** | Tailwind CSS + shadcn/ui | Rapidité dev, composants accessibles |
| **Base de données** | Supabase (PostgreSQL) | Auth, Realtime, Storage, gratuit au démarrage |
| **Auth** | Supabase Auth — magic link | Zéro friction |
| **Paiement** | Stripe Checkout | Standard, fiable |
| **Analytics** | PostHog | Funnels, replays, feature flags |
| **Email** | SendGrid | Deliverability prouvée |
| **LLM** | OpenRouter | Flexibilité provider (Mistral, GPT, Claude) |
| **PDF** | @react-pdf/renderer | Génération côté serveur |
| **Hébergement** | Vercel (région CDG1 — Paris) | Optimal pour Next.js |
| **CDN/Sécurité** | Cloudflare | WAF, anti-bot, cache |
| **i18n** | next-intl | Routing localisé FR/EN |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              CLOUDFLARE                      │
│         (WAF, Anti-bot, CDN)                │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                VERCEL                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │ API      │  │ Server   │   │
│  │ App Dir  │  │ Routes   │  │ Actions  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────┘
       │                │               │
       ▼                ▼               ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Supabase │    │  Stripe  │    │OpenRouter│
│ DB/Auth  │    │ Payment  │    │  (LLM)   │
└──────────┘    └──────────┘    └──────────┘
       │
       ▼
┌──────────┐    ┌──────────┐
│ SendGrid │    │ PostHog  │
│  (Email) │    │Analytics │
└──────────┘    └──────────┘
```

---

## Structure du projet

```
couplecheck/
├── app/
│   ├── [locale]/                    # Routes localisées (fr, en)
│   │   ├── page.tsx                 # Landing page
│   │   ├── quiz/page.tsx            # Quiz interactif
│   │   ├── result/[sessionId]/      # Résultat tronqué
│   │   ├── checkout/page.tsx        # Redirect Stripe
│   │   ├── success/page.tsx         # Post-paiement
│   │   ├── login/page.tsx           # Auth magic link
│   │   └── chat/page.tsx            # Agent IA (V1.2)
│   ├── api/
│   │   ├── quiz/submit/             # Soumission + scoring
│   │   ├── leads/capture/           # Capture email
│   │   ├── report/generate/         # Génération PDF
│   │   ├── stripe/
│   │   │   ├── checkout/            # Création session Stripe
│   │   │   └── webhook/             # Webhook paiement
│   │   ├── email/send-report/       # Envoi email
│   │   └── chat/                    # Streaming LLM (V1.2)
│   └── layout.tsx
├── components/
│   ├── landing/                     # Hero, HowItWorks, Dimensions, FAQ, Footer
│   ├── quiz/                        # QuizContainer, Question, ProgressBar, OptionCard, EmailCapture
│   ├── result/                      # ScoreGauge, DimensionRadar, StrengthsList, RisksTeaser, PricingCards
│   ├── report/                      # ReportPDF, CoverPage, DimensionsAnalysis, ActionPlan…
│   ├── chat/                        # ChatContainer, MessageBubble, ChatInput (V1.2)
│   └── ui/                          # shadcn/ui
├── lib/
│   ├── supabase/                    # client.ts, server.ts, admin.ts
│   ├── scoring.ts                   # Logique scoring 7 dimensions
│   ├── report-generator.ts          # Orchestration PDF
│   ├── openrouter.ts                # Appels LLM
│   ├── stripe.ts
│   ├── resend.ts
│   └── posthog.ts
├── config/
│   ├── questions.ts                 # 20 questions FR/EN complètes
│   └── dimensions.ts                # 7 dimensions avec poids
├── locales/
│   ├── fr.json
│   └── en.json
├── types/
│   ├── quiz.ts
│   ├── report.ts
│   └── database.ts
└── hooks/
    ├── useQuiz.ts
    └── useAnalytics.ts
```

---

## Schéma de base de données

### Tables principales

```sql
-- Sessions de quiz (anonymes)
quiz_sessions (id, locale, age_range, gender, relationship_duration,
               relationship_status, answers JSONB, pain_points TEXT[],
               change_wish TEXT, scores JSONB, global_score INTEGER,
               completed, email_captured)

-- Leads (après capture email)
leads (id, session_id, email, first_name, locale,
       newsletter_consent, converted, converted_at,
       last_email_sent, unsubscribed)

-- Achats
purchases (id, lead_id, session_id, stripe_session_id,
           offer_type, amount_cents, currency, status,
           report_generated, report_url)

-- Rapports générés (cache)
reports (id, purchase_id, session_id, content JSONB,
         pdf_storage_path, llm_provider, generation_time_ms)

-- Utilisateurs Agent IA (V1.2)
users (id, email, lead_id, subscription_status,
       subscription_ends_at, stripe_subscription_id)

-- Conversations Agent IA (V1.2)
chat_messages (id, user_id, role, content, tokens_used)
```

**RLS Supabase** : les sessions sont écrites anonymement, les leads/achats/rapports sont gérés côté serveur uniquement via `service_role`.

---

## Parcours utilisateur

```
Acquisition (TikTok, Ads Meta, SEO)
         │
         ▼
    Landing Page
    "Ton couple est-il vraiment épanoui ?"
    CTA → "Commencer le test gratuit"
         │
         ▼
    Quiz 20 questions (~5 min)
    Q1-Q4  : Segmentation
    Q5-Q19 : 7 dimensions scorées
    Q20    : Question douleur (multi-select + texte libre)
         │
         ▼
    Email Gate
    "Ton résultat est prêt — entre ton email pour le recevoir"
         │
         ▼
    Page Résultat Tronqué
    Score global + 2-3 points forts + zones à risque floutées
    CTA → "Débloquer mon rapport complet"
         │
    ┌────┴────┐
    ▼         ▼
  ACHAT    NON-ACHAT
  Stripe   Séquence emails relance
  │        J+0 / J+2 / J+5 / J+7 / J+14
  ▼
  Livraison
  Email + PDF rapport complet (15 pages, IA)
  Si Premium → lien Agent IA Coach
```

---

## Quiz — 7 dimensions analysées

| # | Dimension | Questions | Poids | Base théorique |
|---|-----------|-----------|-------|----------------|
| 1 | 💬 **Communication** | Q5, Q6, Q7 | 1.2 | Gottman Method |
| 2 | 🛡️ **Confiance** | Q8, Q9 | 1.2 | Attachment Theory |
| 3 | ❤️ **Intimité** | Q10, Q11 | 1.0 | Gottman |
| 4 | ⚖️ **Gestion des conflits** | Q12, Q13 | 1.0 | Gottman ratio 5:1 |
| 5 | 🕊️ **Pardon & Résilience** | Q14, Q15 | 1.0 | Worthington Model |
| 6 | 🚀 **Projets communs** | Q16, Q17 | 0.8 | Vision partagée |
| 7 | ☯️ **Équilibre individuel** | Q18, Q19 | 0.8 | Bowen Differentiation |

**Total : 20 questions — Q1-Q4 segmentation (non scorées) + Q5-Q19 évaluation + Q20 douleur.**

---

## Système de scoring

Chaque question évaluation (Q5-Q19) rapporte **0, 4, 7 ou 10 points**.

```
Score dimension  = moyenne des questions × 10  → 0-100
Score global     = moyenne pondérée des 7 dimensions
```

| Score global | Label | Couleur |
|---|---|---|
| ≥ 80 | 🌟 Relation épanouie | Vert |
| 60-79 | ✓ Relation stable | Jaune |
| 40-59 | ⚠️ À surveiller | Orange |
| < 40 | 🚨 En difficulté | Rouge |

**Classification par dimension** : `strength` (≥ 70) / `neutral` (40-69) / `risk` (< 40)

---

## Modèle économique

### Pricing

| Offre | Prix | Contenu |
|-------|------|---------|
| **Standard** | 9,90 € | Rapport PDF 15 pages personnalisé par IA |
| **Premium** | 14,90 € ~~19,90 €~~ | Rapport PDF + Agent IA Coach 1 mois offert |
| **Abonnement** | 7,99 €/mois | Accès continu Agent IA Coach |

### Éléments de conversion

- Countdown timer (offre limitée 7 jours)
- Badge "⭐ POPULAIRE" sur l'offre Premium
- Garantie satisfait ou remboursé 7 jours
- Social proof : compteur dynamique visiteurs

### Séquence email relance (non-acheteurs)

| Délai | Contenu | Objectif |
|-------|---------|----------|
| J+0 | Rappel résultat + CTA | Conversion immédiate |
| J+2 | Conseil gratuit #1 | Valeur + soft CTA |
| J+5 | Offre -20% (48h) | Urgence |
| J+7 | Dernier rappel | Dernière chance |
| J+14 | Contenu valeur | Nurturing |

---

## Installation & Setup

### Prérequis

- Node.js 18+
- Compte Supabase (Free tier suffisant)
- Compte Stripe
- Compte SendGrid
- Compte OpenRouter
- Compte PostHog (EU)

### Installation

```bash
# Cloner le repo
git clone https://github.com/ton-user/couplecheck.git
cd couplecheck

# Installer les dépendances
npm install

# Copier et remplir les variables d'environnement
cp .env.example .env.local

# Setup Supabase (créer les tables)
# Exécute le fichier schema.sql dans le SQL Editor Supabase

# Lancer en développement
npm run dev
```

### Setup Supabase

1. Créer un projet Supabase (région EU West)
2. Exécuter les migrations SQL depuis `db/schema.sql`
3. Activer les politiques RLS (incluses dans le schema)
4. Créer le bucket Storage `reports` (privé)

### Setup Stripe

```bash
# Installer Stripe CLI pour tester les webhooks localement
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Créer les produits
stripe products create --name="CoupleCheck Standard"
stripe products create --name="CoupleCheck Premium"
```

---

## Variables d'environnement

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_STANDARD=price_xxx
STRIPE_PRICE_PREMIUM=price_xxx
STRIPE_PRICE_SUBSCRIPTION=price_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# OpenRouter (LLM)
OPENROUTER_API_KEY=xxx
OPENROUTER_MODEL=mistralai/mistral-medium

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=hello@couplecheck.app
SENDGRID_TEMPLATE_RESULT_FR=d-xxx
SENDGRID_TEMPLATE_RESULT_EN=d-xxx
SENDGRID_TEMPLATE_REPORT_FR=d-xxx
SENDGRID_TEMPLATE_REPORT_EN=d-xxx

# PostHog (EU)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# App
NEXT_PUBLIC_APP_URL=https://couplecheck.app
```

---

## Déploiement

### Vercel

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["cdg1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://couplecheck.app"
  }
}
```

```bash
vercel --prod
```

### Cloudflare (configuration recommandée)

| Paramètre | Valeur |
|-----------|--------|
| SSL | Full (strict) |
| WAF | Managed ruleset activé |
| Bot Fight Mode | Activé |
| Rate Limiting | 100 req/min par IP sur `/api/*` |
| Cache | Static assets uniquement |

---

## Analytics — Events PostHog

| Event | Trigger |
|-------|---------|
| `page_view_landing` | Arrivée landing page |
| `quiz_started` | Clic "Commencer" |
| `quiz_question_answered` | Chaque réponse (avec `question_id`) |
| `quiz_completed` | Q20 répondue |
| `email_submitted` | Email capturé |
| `result_page_viewed` | Page résultat affichée |
| `checkout_initiated` | Clic sur une offre |
| `purchase_completed` | Paiement réussi (avec `offer_type`) |
| `report_downloaded` | Ouverture PDF |
| `chat_message_sent` | Message Agent IA (V1.2) |

**Funnels à configurer** :
1. Landing → Quiz start → Quiz complete → Email → Purchase
2. Email captured → J+2 open → J+5 open → Purchase

---

## Roadmap

| Sprint | Durée | Focus | Livrable |
|--------|-------|-------|----------|
| **Sprint 1** | Semaine 1 | Setup + Landing + Quiz | Quiz fonctionnel FR/EN déployé |
| **Sprint 2** | Semaine 2 | Paiement + Rapport PDF | MVP complet monétisé |
| **Sprint 3** | Semaines 3-4 | Emails + Optimisation | Funnel automatisé + A/B tests |
| **Sprint 4** | Semaines 5-6 | Agent IA | Upsell Premium + chat coach |

### Backlog V2

| Feature | Effort | Impact |
|---------|--------|--------|
| App mobile (PWA) | Medium | High |
| Expansion EN (US/UK) | Low | High |
| Re-test "3 mois après" | Low | Medium |
| Quiz comparatif couple (2 personnes) | High | High |

---

## RGPD & Conformité

- **Consentement newsletter** : non pré-coché, opt-in explicite
- **Stockage UE** : Supabase région EU West (Frankfurt/Paris)
- **Données sensibles** : questions intimité limitées à une échelle 1-5 (pas de détails explicites), aucune donnée médicale stockée
- **Droit à l'effacement** : via email support
- **Pages légales** : CGV, Mentions légales, Politique de confidentialité accessibles avant paiement
- **Remboursement** : 7 jours sans condition

---

## Contribuer

Ce projet est en développement privé. Pour toute question :
📧 [hello@couplecheck.app](mailto:hello@couplecheck.app)

---

*CoupleCheck — Basé sur 7 dimensions validées en psychologie des couples (Gottman Method, Attachment Theory, Worthington Forgiveness Model, Bowen Differentiation)*