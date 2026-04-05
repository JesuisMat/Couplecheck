# SPRINTS_V2.md — CoupleCheck Platform

## Vue d'ensemble

| Sprint | Durée | Focus | Statut |
|--------|-------|-------|--------|
| Sprint 4 | Semaines 5-6 | Fondations plateforme — BDD + Auth + Routing + Onboarding | ✅ Quasi-complet (middleware manquant) |
| Sprint 5 | Semaines 7-8 | Interface dialogue + Mémoire + Streaming IA | ✅ Complet |
| Sprint 6 | Semaine 9 | Monthly Checkup + Historique conversations | ✅ Complet (n8n manuel restant) |
| Sprint 7 | Semaine 10 | Stripe Subscription + Flow trial → abonnement | 🔄 Partiel (code fait, config Stripe + tests manquants) |
| Sprint 8 | Semaine 11 | Dashboard admin | 🔜 À démarrer |
| Sprint 9 | Semaine 12 | Polish, SEO, tests E2E, déploiement prod | 🔜 À démarrer |

> **Prérequis** : Sprint 3 terminé — funnel quiz → rapport → emails opérationnel en production.  
> **Capacité estimée** : ~4h/jour = ~28h/semaine.  
> **Docs à lire avant de commencer** : `docs/PRD_V2.md`, `docs/TECH_SPEC.md`, `docs/SPRINTS.md`

---

## Sprint 4 — Fondations plateforme ✅ (quasi-complet)

**Durée** : 2 semaines (~50h)  
**Objectif** : Infrastructure technique V2 opérationnelle. Accès sécurisé à la plateforme, routing restructuré, onboarding complet, sidebar et layout de base.

### 4.0 Pré-requis : restructuration routes

> ⚠️ Cette tâche est **bloquante** pour toutes les autres du Sprint 4. À faire en premier.

- [x] Déplacer `app/[locale]/page.tsx` (landing quiz) vers `app/[locale]/quiz/page.tsx`
  - Mettre à jour tous les liens internes qui pointaient vers `/`
  - Mettre à jour `next-intl` routing si pathnames localisés configurés
- [x] Créer la nouvelle `app/[locale]/page.tsx` (landing plateforme — squelette HTML pour l'instant, contenu Sprint 4.5)
- [x] Configurer la redirection 301 dans `next.config.ts` (/ → /fr/quiz)
- [x] Vérifier que `result/[sessionId]` fonctionne toujours
- [x] Mettre à jour le CTA "Commencer le test" dans tous les composants pour pointer vers `/quiz`

**Livrable** : Routing restructuré sans régression sur le tunnel V1.

---

### 4.1 Migration base de données (3h)

- [x] Exécuter les migrations Supabase (via SQL Editor ou CLI) :

```sql
-- Colonnes users (nouvelle table ou ALTER selon état actuel)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS onboarding_data JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_v2_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS memory_data JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS messages_used_this_month INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS messages_reset_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS monthly_limit INTEGER DEFAULT 60,
  ADD COLUMN IF NOT EXISTS platform_access_type VARCHAR(20) DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(5) DEFAULT 'fr',
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- monthly_checkups
CREATE TABLE IF NOT EXISTS monthly_checkups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
  period_year INTEGER NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  conflict_level VARCHAR(20) NOT NULL,
  closeness_score INTEGER NOT NULL CHECK (closeness_score BETWEEN 1 AND 5),
  word_of_month VARCHAR(100),
  satisfaction_score INTEGER NOT NULL CHECK (satisfaction_score BETWEEN 1 AND 10),
  completed_in_seconds INTEGER
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_checkup_user_period
  ON monthly_checkups(user_id, period_year, period_month);

-- conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(200),
  message_count INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id, updated_at DESC);

-- chat_messages delta
ALTER TABLE chat_messages
  ADD COLUMN IF NOT EXISTS conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS tokens_input INTEGER,
  ADD COLUMN IF NOT EXISTS tokens_output INTEGER;
CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON chat_messages(conversation_id, created_at ASC);

-- subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'trialing',
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);

-- embeddings (structure créée, vide — ne pas alimenter avant V3)
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source_type VARCHAR(20) NOT NULL,
  source_id UUID NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  UNIQUE(source_type, source_id)
);
CREATE INDEX IF NOT EXISTS idx_embeddings_user ON embeddings(user_id);

-- Cron reset compteurs messages
SELECT cron.schedule(
  'reset-message-counters',
  '0 0 1 * *',
  $$UPDATE users SET messages_used_this_month = 0, messages_reset_at = NOW()$$
);
```

- [x] Vérifier toutes les tables créées dans Supabase Dashboard
- [x] Activer RLS sur les nouvelles tables :
  ```sql
  ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
  ALTER TABLE monthly_checkups ENABLE ROW LEVEL SECURITY;
  ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Users manage own conversations"
    ON conversations USING (auth.uid() = user_id);
  CREATE POLICY "Users manage own checkups"
    ON monthly_checkups USING (auth.uid() = user_id);
  ```

**Livrable** : Toutes les tables V2 créées et vérifiées en prod.

---

### 4.2 Auth Supabase — Auth complète + Middleware accès (6h)

#### Stratégie auth

Trois méthodes de connexion supportées, toutes gérées nativement par Supabase Auth :

| Méthode | Inscription | Connexion |
|---------|------------|-----------|
| Email + mot de passe | ✅ (prénom, email, mdp) | ✅ |
| Google OAuth | ✅ (one-click) | ✅ |
| Magic link | — | ✅ (option depuis la page login) |

> **Note** : L'inscription primaire se fait en email/mdp ou Google. Le magic link est disponible à la connexion comme alternative "J'ai oublié mon mot de passe / connexion rapide".

#### 4.2.a — Configuration Google Cloud Platform (manips manuelles)

> ⚠️ À faire **avant** de coder — bloquant pour le bouton "Continuer avec Google".

**Étape 1 — Créer le projet Google Cloud**
1. Aller sur [console.cloud.google.com](https://console.cloud.google.com)
2. Cliquer **Nouveau projet** → nommer "CoupleCheck"
3. Sélectionner le projet créé

**Étape 2 — Activer l'API Google Identity**
1. Dans le menu latéral → **APIs & Services → Bibliothèque**
2. Rechercher "Google Identity" → activer **Google Identity Services API**
3. Rechercher "OAuth" → activer **OAuth 2.0 API** (si pas déjà active)

**Étape 3 — Configurer l'écran de consentement OAuth**
1. **APIs & Services → Écran de consentement OAuth**
2. Type d'utilisateur : **Externe** → Créer
3. Remplir les champs obligatoires :
   - Nom de l'application : `CoupleCheck`
   - Email d'assistance : ton email
   - Logo (optionnel) : logo CoupleCheck
   - Domaines autorisés : `couplecheck.app` + `supabase.co`
   - Liens : page d'accueil, politique de confidentialité, CGU
4. Scopes → Ajouter : `email`, `profile`, `openid`
5. Utilisateurs de test → ajouter ton email pour tester avant vérification Google
6. **Enregistrer**

**Étape 4 — Créer les identifiants OAuth 2.0**
1. **APIs & Services → Identifiants → Créer des identifiants → ID client OAuth 2.0**
2. Type d'application : **Application Web**
3. Nom : `CoupleCheck Web`
4. Origines JavaScript autorisées :
   ```
   https://couplecheck.app
   https://twmpsbxqkipdqpaxuhxw.supabase.co
   http://localhost:3000
   ```
5. URI de redirection autorisées :
   ```
   https://twmpsbxqkipdqpaxuhxw.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```
   > **Callback Supabase confirmée** : `https://twmpsbxqkipdqpaxuhxw.supabase.co/auth/v1/callback`
6. Cliquer **Créer** → récupérer **Client ID** et **Client Secret**

**Étape 5 — Configurer dans Supabase**
1. Supabase Dashboard → **Authentication → Providers → Google**
2. Toggle **Enabled** : ON
3. Coller **Client ID** et **Client Secret**
4. **Callback URL** affichée par Supabase → vérifier qu'elle correspond à ce que tu as mis dans GCP
5. **Save**

**Étape 6 — Variables d'environnement**
```bash
# Ces variables ne sont pas nécessaires côté code (Supabase les gère),
# mais les noter pour référence :
# GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=GOCSPX-xxx
```

**Étape 7 — Vérification Google (pour la prod)**

En mode dev, l'appli fonctionne avec les "utilisateurs de test" ajoutés à l'étape 3.
Pour que n'importe quel compte Google puisse s'inscrire en prod, il faut soumettre l'appli à la vérification Google :
- **APIs & Services → Écran de consentement → Publier l'application**
- Google peut demander des documents (politique de confidentialité obligatoire — déjà en ligne ✅)
- Délai de vérification : 1-5 jours ouvrés

> En attendant la vérification, ajouter les adresses de tes early users comme "utilisateurs de test" — ils pourront se connecter avec Google sans attendre.

---

#### 4.2.b — Pages d'auth (code)

**Page Inscription** (`app/[locale]/platform/register/page.tsx`) :
- [x] Titre : "Créer mon compte"
- [x] Bouton Google OAuth : "Continuer avec Google" (icône Google + texte)
- [x] Séparateur "ou"
- [x] Formulaire : Prénom (input) / Email / Mot de passe (min 8 chars, indicateur de force) / Confirmer MDP
- [x] Checkbox consentement RGPD (obligatoire)
- [x] CTA : "Créer mon compte →"
- [x] Lien bas : "Déjà un compte ? Se connecter"
- [x] Traductions FR/EN

**Page Connexion** (`app/[locale]/platform/login/page.tsx`) :
- [x] Titre : "Bon retour"
- [x] Bouton Google OAuth : "Continuer avec Google"
- [x] Séparateur "ou"
- [x] Formulaire : Email / Mot de passe
- [x] Lien "Mot de passe oublié ?" → modal magic link (envoie un lien de connexion par email)
- [x] CTA : "Se connecter →"
- [x] Lien bas : "Pas encore de compte ? S'inscrire"
- [x] Traductions FR/EN

**Page Callback OAuth** (`app/[locale]/auth/callback/route.ts`) :
```typescript
// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/platform';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/platform/login?error=oauth`);
}
```

**Logique inscription email/mdp** :
```typescript
// Dans register/page.tsx
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { first_name: firstName },  // stocké dans auth.users.user_metadata
    emailRedirectTo: `${location.origin}/auth/callback`,
  }
});
// Après signup → INSERT dans public.users avec lead_id si session quiz existante
```

**Logique connexion Google** :
```typescript
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${location.origin}/auth/callback`,
    queryParams: { access_type: 'offline', prompt: 'consent' },
  },
});
```

**Logique magic link (mot de passe oublié)** :
```typescript
const { error } = await supabase.auth.signInWithOtp({
  email,
  options: { emailRedirectTo: `${location.origin}/auth/callback` },
});
```

---

#### 4.2.c — Synchronisation users table

À la première connexion (quelle que soit la méthode), créer l'entrée dans `public.users` si elle n'existe pas encore. Utiliser un **Supabase Database Webhook** ou un trigger SQL :

```sql
-- Trigger Supabase : crée un user dans public.users après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

> ⚠️ Ce trigger doit être exécuté dans le SQL Editor Supabase. Il fonctionne pour les 3 méthodes (email/mdp, Google, magic link).

---

#### 4.2.d — Middleware accès plateforme

- [ ] Créer `middleware.ts` à la racine du projet :
  ```typescript
  import { createServerClient } from '@supabase/ssr';
  import { NextResponse } from 'next/server';
  import type { NextRequest } from 'next/server';

  export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (!pathname.includes('/platform') && !pathname.includes('/admin')) {
      return NextResponse.next();
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { /* ... cookie handlers */ } }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/platform/login', request.url));
    }

    const { data: userData } = await supabase
      .from('users')
      .select('platform_access_type, role')
      .eq('id', user.id)
      .single();

    if (userData?.role === 'admin') return NextResponse.next();

    const validAccess = ['trial', 'subscription', 'early_adopter'];
    if (!validAccess.includes(userData?.platform_access_type)) {
      return NextResponse.redirect(new URL('/platform/subscribe', request.url));
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: ['/platform/:path*', '/admin/:path*'],
  };
  ```
- [x] Créer `app/[locale]/platform/page.tsx` — redirect conditionnel :
  - Si `onboarding_completed = false` → `/platform/onboarding/step-1`
  - Sinon → `/platform/chat`
- [ ] Tester les 3 parcours : inscription email/mdp, Google OAuth, magic link (à tester manuellement)

**Fichiers à créer** :
```
app/[locale]/platform/
├── register/page.tsx     # Inscription (email/mdp ou Google)
├── login/page.tsx        # Connexion (email/mdp, Google, magic link)
app/auth/callback/route.ts  # Handler OAuth callback (à la racine, pas dans [locale])
middleware.ts               # Guard /platform/* et /admin/*
```

**Livrable** : Auth complète (email/mdp + Google + magic link), middleware protégeant `/platform/*`, trigger SQL créant les users en base.

---

### 4.3 Onboarding — 4 étapes (5h)

Créer `app/[locale]/platform/onboarding/step-[1-4]/page.tsx`

**Step 1** (`/platform/onboarding/step-1`) :
- [x] Layout plein écran centré, progress dots (4 étapes), bouton "Passer" discret
- [x] Question 1 : input texte — prénom partenaire (optionnel)
- [x] Question 2 : single select 4 options (raison venue ici)
- [x] Question 3 : textarea libre (grand défi)
- [x] Persistance dans `users.onboarding_data` via PATCH `/api/platform/onboarding`
- [x] CTA "Continuer →" → step-2

**Step 2** (`/platform/onboarding/step-2`) :
- [x] Question A : durée relation (single select 4 options)
- [x] Question B : vie ensemble (3 options)
- [x] CTA "Continuer →" → step-3

**Step 3** (`/platform/onboarding/step-3`) :
- [x] Question A : style communication en conflit (5 options)
- [x] Question B : thérapie de couple (4 options)
- [x] CTA "Continuer →" → step-4

**Step 4** (`/platform/onboarding/step-4`) :
- [x] Multi-select intentions (max 3 parmi 6 options)
- [x] CTA "Accéder à mon espace →"
- [x] `PATCH /api/platform/onboarding` avec `onboarding_completed: true` + `onboarding_v2_completed: true`
- [x] Message fin : "Ton espace est prêt. Ta mémoire a été initialisée."
- [x] Redirect → `/platform/chat`

**API Route** :
- [x] Créer `app/api/platform/onboarding/route.ts` — PATCH qui merge les données dans `users.onboarding_data`

**Fichiers à créer** :
```
app/[locale]/platform/onboarding/
├── step-1/page.tsx
├── step-2/page.tsx
├── step-3/page.tsx
└── step-4/page.tsx
app/api/platform/onboarding/route.ts
```

**Livrable** : Onboarding 4 étapes fonctionnel, données persistées en base.

---

### 4.4 Layout plateforme — Sidebar + Zone principale (6h)

- [x] Créer `app/[locale]/platform/layout.tsx` (layout wrapper de toute la plateforme)
- [x] Créer `components/platform/Sidebar.tsx` :
  - Logo CoupleCheck (lien vers `/platform/chat`)
  - Barre de recherche conversations (UI seulement en Sprint 4, fonctionnelle en Sprint 6)
  - Bouton "+ Nouvelle conversation" (lien vers `/platform/chat`)
  - Liste conversations récentes (3 dernières — données statiques en Sprint 4, dynamiques Sprint 5)
  - Lien "Voir tout l'historique"
  - Séparateur
  - Lien "🧠 Mémoire de mon compte" → `/platform/memory`
  - Lien "⚙ Paramètres" → `/platform/settings/general`
- [x] Créer `components/platform/PlatformHeader.tsx` (mobile uniquement — hamburger + logo)
- [x] Responsive :
  - Desktop : sidebar fixe 260px + zone contenu flex
  - Mobile : sidebar = drawer (hamburger), chat plein écran
- [ ] Design tokens à respecter :
  - Sidebar bg : `#FFFFFF` | border-right : `1px solid #E0DDD6`
  - Zone principale bg : `#F5F2EC`
  - Fonts : DM Sans corps, Fraunces titres
  - Bouton nouvelle conv : outline `#AA2C32`, pill shape
  - Item actif sidebar : bg `#F6EEEE`, text `#AA2C32`

**Fichiers à créer** :
```
app/[locale]/platform/layout.tsx
components/platform/Sidebar.tsx
components/platform/PlatformHeader.tsx
components/platform/ConversationItem.tsx
```

**Livrable** : Layout plateforme complet responsive desktop + mobile.

---

### 4.5 Nouvelle landing plateforme `/` (5h)

- [x] Créer `app/[locale]/page.tsx` (remplace l'ancienne landing quiz)
- [x] Sections à implémenter dans l'ordre :
  1. **Header** : sticky, logo gauche, nav optionnelle, double CTA ("Se connecter" ghost / "Faire le quiz" pill `#AA2C32`)
  2. **Hero** : Headline Fraunces italic 2 lignes + mot en `#AA2C32`, sous-titre DM Sans, double CTA, mockup flottant plateforme (screenshot ou illustration)
  3. **Différenciateur** : 3 colonnes (Mémoire persistante / Contexte personnalisé / Checkup mensuel) — cards `#FFFFFF`
  4. **Comment ça marche** : 3 étapes numérotées horizontal (Quiz → Rapport → Espace dialogue)
  5. **Pricing** : 3 cartes (Standard / Premium / Abonnement) — carte Premium élevée + badge "Populaire"
  6. **FAQ** : 5 questions accordion
  7. **Footer** : minimal (logo + tagline + liens légaux)
- [x] Traductions FR/EN complètes dans `locales/fr.json` et `locales/en.json`
- [x] Meta tags SEO : title, description, OG

**Fichiers à créer/modifier** :
```
app/[locale]/page.tsx              # Nouvelle landing plateforme
components/landing-v2/
├── HeroV2.tsx
├── Differentiator.tsx
├── HowItWorksV2.tsx
├── PricingSection.tsx
├── FAQPlatform.tsx
└── FooterV2.tsx
locales/fr.json                    # Nouvelles clés landing V2
locales/en.json
```

**Livrable** : Nouvelle landing `/` déployée, quiz accessible sur `/quiz`.

---

### 4.6 Page mémoire du compte (3h)

- [x] Créer `app/[locale]/platform/memory/page.tsx`
- [x] Créer `components/platform/MemoryEntry.tsx` (entrée individuelle avec bouton suppression)
- [x] Layout : page centrée max-width 640px, sections par catégorie
- [x] Categories : Profil / Communication / Checkups récents / Thèmes récurrents
- [x] Chaque entrée : texte + bouton "✕ Supprimer" (PATCH API)
- [x] Bouton bas : "Effacer toute la mémoire" (modale de confirmation)
- [x] Données issues de `users.memory_data` (JSONB)
- [x] API route : `app/api/platform/memory/route.ts` (GET / PATCH / DELETE)

**Fichiers à créer** :
```
app/[locale]/platform/memory/page.tsx
components/platform/MemoryEntry.tsx
components/platform/MemorySection.tsx
app/api/platform/memory/route.ts
```

**Livrable** : Page mémoire consultable + suppression unitaire + effacement total.

---

### 4.7 Pages paramètres — 5 sous-pages (5h)

- [x] Layout settings : nav secondaire gauche 220px + zone contenu droite
- [x] Créer `app/[locale]/platform/settings/layout.tsx` avec navigation secondaire
- [x] Créer les 5 sous-pages :

**Général** (`/platform/settings/general`) :
- Sélecteur langue FR/EN (PATCH `users.preferred_language`)
- Toggles notifications email (placeholder V2)

**Compte** (`/platform/settings/account`) :
- Email affiché
- Fournisseur de connexion affiché (Email / Google)
- Si email/mdp : bouton "Changer mon mot de passe" (email de reset envoyé)
- Bouton "Envoyer un lien de connexion rapide" (magic link)
- Date d'inscription
- Bouton "Supprimer mon compte" (rouge, confirmation 2 étapes)

**Confidentialité** (`/platform/settings/privacy`) :
- Lien vers `/platform/memory`
- Bouton "Effacer toute la mémoire" (même action que page mémoire)
- Bouton "Télécharger mes données" (export RGPD JSON — `GET /api/platform/export`)
- Bouton "Supprimer tout l'historique de conversations"
- Lien politique de confidentialité

**Utilisation** (`/platform/settings/usage`) :
- Barre progression messages (X/60 ce mois — `users.messages_used_this_month`)
- Date réinitialisation (1er du mois prochain)
- Stats : nb conversations, nb checkups, date première connexion
- Sparkline simple recharts (messages/mois sur 6 mois — placeholder statique Sprint 4)

**Facturation** (`/platform/settings/billing`) :
- Offre actuelle + badge statut
- Prochain renouvellement (données Stripe)
- Historique factures (placeholder — Stripe Customer Portal lien)
- Bouton "Résilier" → modale rétention (raison + offre pause 1 mois)

**Fichiers à créer** :
```
app/[locale]/platform/settings/
├── layout.tsx
├── page.tsx                 # Redirect vers /general
├── general/page.tsx
├── account/page.tsx
├── privacy/page.tsx
├── usage/page.tsx
└── billing/page.tsx
components/platform/settings/
├── SettingsNav.tsx
├── SettingsSection.tsx
└── DangerZoneButton.tsx
app/api/platform/export/route.ts
```

**Livrable** : 5 sous-pages paramètres fonctionnelles (certaines avec UI placeholder en Sprint 4, complétées Sprint 5-7).

---

### Livrables Sprint 4

- [ ] Google Cloud Platform configuré (projet, écran de consentement, identifiants OAuth) — ⚠️ MANUELLE
- [ ] Provider Google activé dans Supabase Dashboard — ⚠️ MANUELLE
- [x] Trigger SQL `handle_new_user` en place (synchro auth.users → public.users)
- [x] Routing restructuré : `/` = landing plateforme, `/quiz` = landing quiz, 301 configuré
- [x] Migration BDD V2 exécutée en prod (8 tables/modifications)
- [x] Pages register + login + callback auth opérationnelles
- [ ] 3 méthodes testées : email/mdp / Google OAuth / magic link — ⚠️ À TESTER MANUELLEMENT
- [ ] Middleware accès plateforme testé (trial / abonné / expiré / none) — ⚠️ À TESTER MANUELLEMENT
- [x] Onboarding 4 étapes complet (données persistées en base)
- [x] Layout plateforme sidebar responsive
- [x] Nouvelle landing `/` déployée FR/EN
- [x] Page mémoire consultable et éditable
- [x] 5 sous-pages paramètres créées

---

## Sprint 5 — Interface dialogue + Mémoire IA + Streaming ✅

**Durée** : 2 semaines (~50h)  
**Objectif** : Espace de dialogue fonctionnel avec streaming SSE, contexte injecté, mémoire automatique.

---

### 5.1 Context Builder (4h)

- [x] Créer `lib/context-builder.ts` :
  ```typescript
  export async function buildUserContext(userId: string): Promise<UserContext> {
    const [userResult, checkupsResult, messagesResult] = await Promise.all([
      supabaseAdmin
        .from('users')
        .select('*, leads(first_name, quiz_sessions(scores, global_score, answers, completed_at))')
        .eq('id', userId)
        .single(),
      supabaseAdmin
        .from('monthly_checkups')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(6),
      supabaseAdmin
        .from('chat_messages')
        .select('role, content, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20)
    ]);
    // ... assemble et retourne UserContext
  }
  ```
- [x] Inclure : quiz scores, segmentation, onboarding V1+V2, memory_data, 6 derniers checkups, 20 derniers messages
- [x] Tronquer si contexte dépasse 4000 tokens (priorité : quiz > onboarding > memory > checkups > messages)
- [x] Créer `types/platform.ts` avec les interfaces `UserContext`, `MemoryEntry`, `MonthlyCheckup`

**Fichiers à créer** :
```
lib/context-builder.ts
types/platform.ts
```

---

### 5.2 API Streaming `/api/chat/stream` (6h)

- [x] Créer `app/api/chat/stream/route.ts` :
  - Auth check obligatoire (Supabase `getUser`)
  - Vérification limite messages (`messages_used_this_month < monthly_limit`)
  - Si nouvelle conv : `INSERT conversations` + titre auto (50 premiers chars)
  - `INSERT chat_messages` (message user)
  - `buildUserContext(userId)`
  - Appel OpenRouter stream (`claude-sonnet-4-20250514` ou équivalent)
  - SSE chunks : `data: {"type":"delta","content":"..."}\n\n`
  - Fin stream : `data: {"type":"done","tokensInput":N,"tokensOutput":N}\n\n`
  - Error limit : `data: {"type":"error","code":"limit_reached"}\n\n`
  - Post-stream : `INSERT chat_messages` (réponse assistant) + `INCREMENT messages_used_this_month` + `UPDATE conversations.updated_at`

- [x] Créer `lib/openrouter-stream.ts` — wrapper streaming OpenRouter

**Fichiers à créer** :
```
app/api/chat/stream/route.ts
lib/openrouter-stream.ts
```

---

### 5.3 Interface chat — Composants (6h)

- [x] Créer `app/[locale]/platform/chat/page.tsx` (nouvelle conversation)
  - État vide : message de bienvenue contextualisé + 3 chips suggestions (basées sur scores les plus bas)
  - Input actif immédiatement
- [x] Créer `app/[locale]/platform/chat/[conversationId]/page.tsx` (conversation existante)
  - Charger historique complet depuis Supabase
  - Titre éditable (double-clic)
- [x] Créer `components/platform/chat/ChatContainer.tsx`
- [x] Créer `components/platform/chat/MessageBubble.tsx`
  - User : droite, bg `#AA2C32`, text blanc, border-radius `18px 18px 4px 18px`
  - Assistant : gauche, bg `#FFFFFF`, shadow soft, border-radius `18px 18px 18px 4px`
  - Pas d'avatar. Timestamps légers.
- [x] Créer `components/platform/chat/TypingIndicator.tsx` (3 dots animés)
- [x] Créer `components/platform/chat/ChatInput.tsx`
  - Input rounded-full
  - Bouton send pill `#AA2C32`
  - Désactivé pendant streaming
- [x] Créer `components/platform/chat/MessageCounter.tsx`
  - Barre fine : vert (< 40 msgs) → orange (40-55) → rouge (> 55)
  - Label : "X / 60 messages ce mois"
- [x] Créer `components/platform/chat/SuggestionChips.tsx`
  - 3 chips bg `#F6EEEE`, text `#AA2C32`, basées sur dimensions quiz les plus faibles
- [x] Hook `hooks/useChat.ts` — gestion state + SSE stream parsing

**Fichiers à créer** :
```
app/[locale]/platform/chat/page.tsx
app/[locale]/platform/chat/[conversationId]/page.tsx
components/platform/chat/
├── ChatContainer.tsx
├── MessageBubble.tsx
├── TypingIndicator.tsx
├── ChatInput.tsx
├── MessageCounter.tsx
└── SuggestionChips.tsx
hooks/useChat.ts
```

---

### 5.4 Memory Updater — Extraction automatique post-conversation (3h)

- [x] Créer `lib/memory-updater.ts` :
  ```typescript
  export async function updateMemoryFromConversation(
    userId: string,
    messages: { role: string; content: string }[]
  ) {
    // 1. Appel LLM extraction JSON
    // 2. Parse { facts: [{category, content}] }
    // 3. Merge dans users.memory_data (JSONB) avec déduplication
  }
  ```
- [x] Trigger : appelé de manière **asynchrone** (non bloquant) à la fin du stream SSE dans `/api/chat/stream`
- [x] Prompt d'extraction :
  ```
  Extrais les faits relationnels clés de cette conversation.
  Retourne UNIQUEMENT un JSON valide :
  { "facts": [{"category": "profile|communication|event|theme|preference", "content": "..."}] }
  Maximum 5 faits. Sois concis. Pas de déduction excessive.
  ```
- [x] Déduplication : comparer avec `memory_data` existant avant d'insérer
- [x] Créer `app/api/platform/memory/route.ts` (GET / PATCH / DELETE) si pas fait en Sprint 4

**Fichiers à créer/modifier** :
```
lib/memory-updater.ts
app/api/chat/stream/route.ts    # Modifier pour déclencher memory-updater
```

---

### 5.5 Sidebar dynamique — Liste conversations (3h)

- [x] Requête Supabase : 30 dernières conversations triées par `updated_at DESC`
- [x] Affichage dans `Sidebar.tsx` (liste dynamique)
- [x] Titre : 50 premiers chars du premier message utilisateur (tronqué + "…")
- [x] Date relative : "Aujourd'hui", "Hier", "Il y a X jours"
- [x] État actif : conversation courante surlignée (`#F6EEEE`)
- [x] Lien "Voir tout" → page dédiée historique (Sprint 6)
- [x] Créer `app/api/platform/conversations/route.ts` (GET — liste)
- [x] Créer `app/api/platform/conversations/[id]/route.ts` (GET messages + DELETE)

**Fichiers à créer** :
```
app/api/platform/conversations/route.ts
app/api/platform/conversations/[id]/route.ts
```

---

### Livrables Sprint 5

- [x] Context builder opérationnel (quiz + onboarding + mémoire + checkups + historique)
- [x] API `/api/chat/stream` fonctionnelle (SSE + limite messages + sauvegarde)
- [x] Interface chat complète (streaming visible, bulles, input, compteur)
- [x] Suggestions chips en état vide basées sur scores quiz
- [x] Memory updater déclenché après chaque conversation
- [ ] Page mémoire reflète les extractions automatiques (automatique via memory-updater)
- [x] Sidebar liste conversations dynamique

---

## Sprint 6 — Monthly Checkup + Historique ✅ (n8n manuel restant)

**Durée** : 1 semaine (~25h)  
**Objectif** : Checkup mensuel fonctionnel, injection dans le contexte, historique complet navigable.

---

### 6.1 Formulaire Monthly Checkup (4h)

- [x] Créer `app/[locale]/platform/checkup/page.tsx`
- [x] 5 écrans (une question par écran) + 1 écran récapitulatif :
  - Écran 1 : Slider 1-5 humeur globale (emoji 🌪️ → ☀️)
  - Écran 2 : Single select conflits (none / few / several / many)
  - Écran 3 : Slider 1-5 proximité
  - Écran 4 : Input 1 mot libre ("mot du mois")
  - Écran 5 : Slider 1-10 satisfaction globale
  - Écran Récap : résumé mois + comparaison mois précédent + CTA "Retour à mon espace"
- [x] Progress bar 5 étapes (style identique au quiz V1)
- [x] Transitions entre écrans (même animation que quiz)
- [x] Guard : si checkup du mois déjà complété → afficher récap + message "Prochain checkup le 1er [mois]"
- [x] Durée tracking : `completed_in_seconds` en base

**Fichiers à créer** :
```
app/[locale]/platform/checkup/page.tsx
components/platform/checkup/
├── CheckupContainer.tsx
├── CheckupSlider.tsx
├── CheckupSelect.tsx
└── CheckupSummary.tsx
```

---

### 6.2 API Checkup (2h)

- [x] Créer `app/api/platform/checkup/submit/route.ts` :
  - Auth check
  - Guard doublon (unique sur `user_id + period_month + period_year`)
  - `INSERT monthly_checkups`
  - Retourne `{ success: true, checkupId }`
- [x] Créer `app/api/platform/checkup/current/route.ts` :
  - GET — vérifie si checkup du mois courant existe

**Fichiers à créer** :
```
app/api/platform/checkup/submit/route.ts
app/api/platform/checkup/current/route.ts
```

---

### 6.3 Injection checkups dans le context builder (2h)

- [x] Modifier `lib/context-builder.ts` pour inclure les 6 derniers checkups dans `UserContext`
- [x] Format injecté dans le prompt :
  ```
  Checkup [Mois Année] : humeur=4/5, conflits=few, proximité=3/5, mot=tension, satisfaction=6/10
  ```
- [x] Tester que le contexte agent est enrichi des données checkup

---

### 6.4 Déclencheur n8n — Checkup mensuel (3h)

- [ ] Créer workflow n8n "CoupleCheck — Checkup Mensuel" :
  - Déclencheur : Cron le 1er du mois à 9h00
  - Action : `GET /api/platform/users-active` (liste users abonnés actifs)
  - Pour chaque user : envoyer email checkup (template SendGrid)
- [x] Créer `app/api/platform/users-active/route.ts` (auth service_role, retourne emails + prénoms + locale)
- [ ] Créer templates SendGrid checkup (FR + EN) avec lien direct `/platform/checkup`
- [ ] Renseigner `N8N_WEBHOOK_CHECKUP_TRIGGER` + `SENDGRID_TEMPLATE_MONTHLY_CHECKUP` dans `.env`

---

### 6.5 Historique conversations — Page complète (4h)

- [x] Créer `app/[locale]/platform/history/page.tsx`
  - Liste complète des 30+ conversations (pagination si nécessaire)
  - Groupées par date (Aujourd'hui / Cette semaine / Ce mois / Plus ancien)
  - Chaque item : titre + date + nb messages + bouton suppression
- [x] Fonctionnalité recherche dans les conversations (full-text Supabase sur `chat_messages.content`)
  - Barre de recherche sidebar déjà prévue → brancher sur `/api/platform/conversations/search?q=`
- [x] Créer `app/api/platform/conversations/search/route.ts`
- [x] Bouton suppression conversation → modale confirmation → `DELETE /api/platform/conversations/[id]`

**Fichiers à créer** :
```
app/[locale]/platform/history/page.tsx
app/api/platform/conversations/search/route.ts
```

---

### Livrables Sprint 6

- [x] Monthly checkup 5 questions fonctionnel (données en base)
- [x] Guard doublon checkup (1 par mois)
- [x] Checkups injectés dans le contexte agent
- [ ] Email n8n déclenché le 1er du mois — ⚠️ WORKFLOW N8N MANUEL (API users-active créée)
- [x] Historique conversations complet navigable
- [x] Recherche dans les conversations fonctionnelle
- [x] Suppression conversation depuis l'historique

---

## Sprint 7 — Stripe Subscription + Flow trial → abonnement 🔄 (partiel)

**Durée** : 1 semaine (~25h)  
**Objectif** : Abonnement Stripe récurrent opérationnel, flow trial → conversion, accès désactivé à l'expiration.

---

### 7.1 Produit Stripe Subscription (2h)

- [ ] Créer dans Stripe Dashboard (mode live) : Produit 7,99€/mois + récupérer `price_id` → `STRIPE_PRICE_SUBSCRIPTION` — ⚠️ MANUEL
- [x] Créer page `/platform/subscribe` (stats trial + pricing card + CTA Stripe)
- [x] Créer `app/api/stripe/checkout-subscription/route.ts` (customer_id + mode subscription)

---

### 7.2 Nouveaux webhooks Stripe (5h)

- [x] Modifier `app/api/stripe/webhook/route.ts` pour gérer 5 nouveaux événements :

```typescript
case 'customer.subscription.created':
  // INSERT subscriptions
  // UPDATE users SET platform_access_type = 'subscription', monthly_limit = 60
  // sendEmail(SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMED)
  break;

case 'customer.subscription.updated':
  // UPDATE subscriptions SET status, current_period_start, current_period_end
  break;

case 'customer.subscription.deleted':
  // UPDATE users SET platform_access_type = 'none'
  // UPDATE subscriptions SET status = 'canceled', canceled_at = NOW()
  // sendEmail(SENDGRID_TEMPLATE_SUBSCRIPTION_CANCELED)
  break;

case 'invoice.payment_failed':
  // UPDATE subscriptions SET status = 'past_due'
  // sendEmail(SENDGRID_TEMPLATE_PAYMENT_FAILED)
  break;

case 'invoice.payment_succeeded':
  // UPDATE subscriptions SET status = 'active'
  // UPDATE users SET messages_used_this_month = 0 (si nouvelle période)
  break;
```

- [ ] Ajouter les 5 events dans le webhook Stripe Dashboard (prod) — ⚠️ MANUEL
- [x] Emails platform inline (subscription_confirmed, canceled, payment_failed, trial_ending, trial_expired) — templates SendGrid optionnels via env vars

---

### 7.3 Flow trial → abonnement (n8n) (4h)

- [ ] Workflow n8n "Trial Ending" — ⚠️ WORKFLOW N8N MANUEL (cron J-5 → GET /api/platform/trials-ending → email)
- [ ] Workflow n8n "Trial Expired" — ⚠️ WORKFLOW N8N MANUEL (cron quotidien → PATCH accès + email)
- [x] Créer `app/api/platform/trials-ending/route.ts` (users avec trial_end dans 5 jours)
- [x] Emails trial_ending + trial_expired inline dans sendgrid.ts

---

### 7.4 Gestion accès Premium → trial (2h)

- [x] Modifier webhook `checkout.session.completed` : offer_type=premium → trial 30j + INSERT subscriptions
- [ ] Vérifier que le middleware Sprint 4 autorise correctement les utilisateurs `trial` — ⚠️ À TESTER

---

### 7.5 Upsell `/platform/subscribe` et flow rétention (3h)

- [x] Créer `app/[locale]/platform/subscribe/page.tsx` (stats trial + pricing 7,99€ + CTA Stripe)
- [ ] Modale rétention résiliation — ⚠️ À FAIRE (intégrer dans billing/BillingActions.tsx)
- [ ] Stripe Customer Portal configuré dans Dashboard — ⚠️ MANUEL

---

### Livrables Sprint 7

- [ ] Produit Stripe 7,99€/mois créé en live — ⚠️ MANUEL
- [x] 5 nouveaux webhooks Stripe opérationnels (subscription created/updated/deleted + invoice failed/succeeded)
- [ ] Flow Premium → trial → abonnement → expiration testé end-to-end — ⚠️ À TESTER
- [x] Emails platform inline (confirmed, canceled, payment_failed, trial_ending, trial_expired)
- [x] Page `/platform/subscribe` déployée FR/EN
- [ ] Middleware accès vérifié (trial / subscription / none) — ⚠️ À TESTER

---

## Sprint 8 — Dashboard Admin 🔜

**Durée** : 1 semaine (~25h)  
**Objectif** : Dashboard admin complet pour piloter la plateforme.

---

### 8.1 Layout admin + middleware rôle (3h)

- [ ] Créer `app/admin/layout.tsx` :
  - Vérifier `users.role = 'admin'` via middleware
  - Sidebar admin (liens vers 6 sous-pages)
- [ ] Mettre à jour `middleware.ts` pour bloquer `/admin/*` si `role !== 'admin'`
- [ ] Ajouter un utilisateur admin en base :
  ```sql
  UPDATE users SET role = 'admin' WHERE email = 'matthieu@couplecheck.app';
  ```

---

### 8.2 Overview `/admin` (4h)

KPIs en temps réel + graphiques :
- [ ] MRR (total `subscriptions` actives × 7,99€)
- [ ] Abonnés actifs (`platform_access_type = 'subscription'`)
- [ ] Churn mensuel (annulations M en cours / actifs début M)
- [ ] Nouveaux J-7 / J-30 (leads capturés)
- [ ] Coût LLM estimé (SUM `tokens_input + tokens_output` × coût/token)
- [ ] Graphique MRR timeline (recharts LineChart — 6 derniers mois)
- [ ] 5 derniers abonnements (tableau)

---

### 8.3 Tableaux Leads, Users, Subscriptions (6h)

**Leads** (`/admin/leads`) :
- [ ] Table : email / date / score quiz / offre achetée / statut / actions
- [ ] Filtres : statut (converti/non), locale, date range
- [ ] Export CSV : `GET /api/admin/export/leads`

**Users** (`/admin/users`) :
- [ ] Table : email / statut abo / messages/mois / nb checkups / dernière activité
- [ ] Clic → profil détaillé (scores quiz + onboarding + mémoire)

**Subscriptions** (`/admin/subscriptions`) :
- [ ] Table : email / plan / statut / date début / prochain renouvellement
- [ ] Graphique : actifs/annulés par mois (recharts BarChart)

---

### 8.4 Pages Emails + Analytics (4h)

**Emails** (`/admin/emails`) :
- [ ] Statuts SendGrid par template : ouvertures / clics / bounces / unsubscribes
- [ ] Données via `GET /api/admin/sendgrid-stats`

**Analytics** (`/admin/analytics`) :
- [ ] Funnel : visiteurs → quiz → email → achat → trial → abonnement (recharts FunnelChart)
- [ ] Breakdown par locale (FR/EN)
- [ ] Taux de conversion à chaque étape

---

### 8.5 API Admin (4h)

- [ ] Créer `app/api/admin/` avec routes protégées (service_role) :
  - `GET /api/admin/stats` — KPIs overview
  - `GET /api/admin/export/leads` — CSV leads
  - `GET /api/admin/export/users` — CSV users
  - `GET /api/admin/sendgrid-stats` — stats emails
  - `GET /api/admin/funnel` — données funnel

---

### Livrables Sprint 8

- [ ] Dashboard admin protégé (rôle admin)
- [ ] Overview KPIs avec recharts
- [ ] 3 tableaux (leads, users, subscriptions) avec filtres et export CSV
- [ ] Page analytics avec funnel complet
- [ ] API admin sécurisées

---

## Sprint 9 — Polish, Tests, Déploiement 🔜

**Durée** : 1 semaine (~25h)  
**Objectif** : Plateforme stable, performante, prête pour le lancement public.

---

### 9.1 Tests end-to-end (6h)

- [ ] Parcours complet FR : landing → quiz → email → Premium → onboarding → chat → mémoire → checkup → renouvellement
- [ ] Parcours complet EN : même chose
- [ ] Cas limites : trial expiré, limite messages atteinte, suppression compte
- [ ] Test streaming SSE sur connexion lente (throttle réseau)
- [ ] Test mobile responsive (sidebar drawer, chat plein écran)
- [ ] Vérification Access RLS Supabase (user A ne peut pas voir données user B)

### 9.2 Performance (3h)

- [ ] Audit Lighthouse plateforme (cible : > 85 mobile)
- [ ] Optimisation images next/image (landing V2)
- [ ] Lazy loading sidebar conversations list
- [ ] Analyse bundle `next build --analyze`

### 9.3 Internationalisation — Audit complet (2h)

- [ ] Vérifier toutes les nouvelles clés dans `locales/fr.json` et `locales/en.json`
- [ ] Tester langue EN sur tous les nouveaux écrans
- [ ] Vérifier que le system prompt agent bascule sur EN si user écrit en anglais

### 9.4 SEO (2h)

- [ ] Meta tags nouvelle landing `/` (title, description, OG)
- [ ] Sitemap mis à jour avec nouvelles routes
- [ ] Soumettre sitemap dans Google Search Console
- [ ] Vérifier redirect 301 `/` → `/quiz` dans Search Console

### 9.5 Variables d'environnement — Audit final (1h)

- [ ] Vérifier toutes les variables V2 dans Vercel prod :
  ```
  STRIPE_PRICE_SUBSCRIPTION
  OPENROUTER_MODEL=claude-sonnet-4-20250514
  SENDGRID_TEMPLATE_TRIAL_ENDING
  SENDGRID_TEMPLATE_TRIAL_EXPIRED
  SENDGRID_TEMPLATE_MONTHLY_CHECKUP
  SENDGRID_TEMPLATE_PAYMENT_FAILED
  SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMED
  SENDGRID_TEMPLATE_SUBSCRIPTION_CANCELED
  N8N_WEBHOOK_TRIAL_ENDING
  N8N_WEBHOOK_CHECKUP_TRIGGER
  PLATFORM_MONTHLY_MESSAGE_LIMIT=60
  PLATFORM_EARLY_ADOPTER_LIMIT=100
  ```

### 9.6 Checklist déploiement final (2h)

- [ ] Migration BDD exécutée en prod
- [ ] Redirect 301 `/` → `/quiz` configuré
- [ ] Nouvelle landing `/` indexée, soumise Search Console
- [ ] Auth Supabase magic link configurée et testée
- [ ] Produit Stripe Subscription en mode live
- [ ] 5 nouveaux webhooks Stripe configurés sur URL prod
- [ ] Templates SendGrid V2 créés et testés (FR + EN)
- [ ] Middleware accès plateforme testé (trial / abonné / expiré / none)
- [ ] Memory updater testé (extraction post-conversation)
- [ ] Onboarding V1 + V2 testés

---

### Livrables Sprint 9 (= Lancement)

- [ ] Tests E2E complets sans régression
- [ ] Performance > 85 mobile
- [ ] i18n FR + EN validé sur tous les écrans
- [ ] SEO mis à jour, sitemap soumis
- [ ] Variables d'environnement prod complètes
- [ ] **Plateforme CoupleCheck V2 live** 🚀

---

## Backlog V3 (hors périmètre V2)

| Feature | Effort | Impact | Priorité |
|---------|--------|--------|----------|
| RAG pgvector (contexte > 20 conversations) | High | High | P0 — Sprint 10 |
| App mobile (PWA) | Medium | High | P1 |
| Espace couple (partenaire invité) | High | High | P1 |
| A/B test tarif 9,99€/mois | Low | Medium | P1 — M2 |
| Re-test "3 mois après" | Low | Medium | P2 |
| Fine-tuning modèle (> M6) | High | Medium | P3 |