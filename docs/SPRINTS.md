# SPRINTS.md — CoupleCheck

## Vue d'ensemble

| Sprint | Durée | Focus | Statut |
|--------|-------|-------|--------|
| Sprint 1 | Semaine 1 | Setup + Landing + Quiz | ✅ Terminé |
| Sprint 2 | Semaine 2 | Paiement + Rapport PDF | ✅ Terminé |
| Sprint 3 | Semaines 3-4 | Emails relance + Optimisation tunnel | 🔄 En cours |

> **Note** : Le périmètre s'arrête à l'implémentation complète du tunnel de conversion (Sprint 3).
> L'Agent IA / plateforme conversationnelle couple fera l'objet d'un PRD et de sprints dédiés séparés.

**Capacité estimée** : ~4h/jour = ~28h/semaine

---

## Sprint 1 — Fondations ✅ TERMINÉ

### Objectif
Quiz complet fonctionnel avec capture email, déployé en prod.

### Ce qui a été réalisé

#### 1.1 Setup projet ✅
- [x] Init Next.js (App Router) + TypeScript
- [x] Setup Tailwind CSS 4 + shadcn/ui + Base UI React
- [x] Setup next-intl (i18n FR/EN)
- [x] Setup Supabase projet + tables initiales (EU region)
- [x] Setup PostHog (EU hosted)
- [x] Config Vercel + déploiement
- [ ] ~~Setup Cloudflare (DNS + WAF)~~ — *reporté, non réalisé*

**Stack réelle** :
```
Next.js 16.2.1 (App Router)
TypeScript 5
Tailwind CSS 4 + shadcn/ui + @base-ui/react
next-intl 4.8.3
@supabase/supabase-js 2.100.1
posthog-js 1.363.6
```

#### 1.2 Landing Page ✅
- [x] Composant Header avec sélecteur de langue (FR/EN)
- [x] Composant Hero avec headline + CTA
- [x] Composant HowItWorks (3 étapes)
- [x] Composant Dimensions (7 cards avec icônes et descriptions)
- [x] Composant FAQ (accordion)
- [x] Composant Footer + liens légaux
- [x] Composant BottomCTA
- [x] Responsive mobile-first
- [x] Traductions FR/EN complètes

**Fichiers créés** :
```
components/landing/
├── Header.tsx
├── Hero.tsx
├── HowItWorks.tsx
├── Dimensions.tsx
├── FAQ.tsx
├── Footer.tsx
└── BottomCTA.tsx
app/[locale]/page.tsx
locales/fr.json
locales/en.json
```

#### 1.3 Quiz — Structure ✅
- [x] Config 20 questions (config/questions.ts)
  - Q1-Q4 : Segmentation (âge, genre, durée relation, statut)
  - Q5-Q19 : 15 questions sur 7 dimensions
  - Q20 : Question combinée (multi-sélect + texte libre)
- [x] Config 7 dimensions (config/dimensions.ts) avec poids pondérés
- [x] Composant QuizContainer (state machine)
- [x] Composant ProgressBar (Question X/20)
- [x] Composant Question (single select)
- [x] Composant OptionCard
- [x] Animations transitions
- [x] Hook useQuiz

#### 1.4 Quiz — Variantes questions ✅
- [x] Composant MultiSelectCard (Q20a — max 3 sélections)
- [x] Composant SliderQuestion
- [x] Composant CombinedQuestion (Q20 : multi-select + texte)
- [x] Composant TipCard
- [x] Validation des réponses
- [x] Traductions complètes FR/EN

**Fichiers créés** :
```
config/
├── questions.ts      # 20 questions complètes (4 variantes : single, multi, slider, combined)
└── dimensions.ts     # 7 dimensions avec poids
components/quiz/
├── QuizContainer.tsx
├── ProgressBar.tsx
├── Question.tsx
├── OptionCard.tsx
├── MultiSelectCard.tsx
├── SliderQuestion.tsx
├── CombinedQuestion.tsx
├── TipCard.tsx
└── EmailCapture.tsx
hooks/useQuiz.ts
app/[locale]/quiz/page.tsx
```

#### 1.5 Scoring + Capture email ✅
- [x] Logique de scoring 7 dimensions (lib/scoring.ts)
- [x] Calcul score global avec poids pondérés
- [x] API route POST /api/quiz/submit
- [x] Composant EmailCapture (avec consentement newsletter)
- [x] API route POST /api/leads/capture
- [x] Stockage Supabase (tables quiz_sessions + leads)

**Fichiers créés** :
```
lib/scoring.ts
lib/supabase/client.ts
lib/supabase/server.ts
lib/supabase/admin.ts
app/api/quiz/submit/route.ts
app/api/leads/capture/route.ts
```

#### 1.6 Page résultat tronqué ✅
- [x] Composant ScoreGauge (cercle animé)
- [x] Graphique radar 7 dimensions
- [x] Composant StrengthsList (2-3 forces affichées)
- [x] Composant RisksTeaser (contenu flou / paywall)
- [x] **Système de teasers psychologiques** (47+ variations par réponse)
  - Indices personnalisés basés sur les réponses Q5-Q19
  - Hooks émotionnels pour engager vers l'achat
  - Composant TeaserCard + TeasersSection
- [x] Composant PricingCards (Standard 9,90€ vs Premium 14,90€)
- [x] Composant UnlockCountdown (timer offre limitée)
- [x] Composant PredictionCard
- [x] Page result/[sessionId]/page.tsx + /unlock

**Fichiers créés** :
```
components/result/
├── ScoreGauge.tsx
├── StrengthsList.tsx
├── RisksTeaser.tsx
├── TeasersSection.tsx
├── TeaserCard.tsx
├── PricingCards.tsx
├── UnlockCountdown.tsx
└── PredictionCard.tsx
lib/teasers/generator.ts
app/[locale]/result/[sessionId]/page.tsx
app/[locale]/result/[sessionId]/unlock/page.tsx
```

### 7 Dimensions implémentées
1. **Communication** (Q5-Q7) — Expression des besoins, écoute active, non-verbal
2. **Confiance** (Q8-Q9) — Fiabilité, transparence, confiance dans le partenaire
3. **Intimité** (Q10-Q11) — Connexion émotionnelle, affection physique
4. **Gestion des conflits** (Q12-Q13) — Désaccords, mécanismes de réparation
5. **Pardon & Résilience** (Q14-Q15) — Capacité de pardon, blessures passées
6. **Projets communs** (Q16-Q17) — Alignement vision future, projets conjoints
7. **Équilibre individuel** (Q18-Q19) — Espace personnel, maintien de l'identité

### Livrables Sprint 1
- ✅ Landing page FR/EN responsive
- ✅ Quiz 20 questions fonctionnel (4 types de questions)
- ✅ Système de teasers psychologiques (47+ variations)
- ✅ Capture email avec consentement
- ✅ Page résultat tronqué avec scores + radar
- ✅ Déployé sur Vercel
- ⚠️ Cloudflare non configuré (reporté Sprint 3)

---

## Sprint 2 — Monétisation ✅ TERMINÉ

### Objectif
Paiement Stripe + Génération rapport PDF + Envoi email automatique.

### Ce qui a été réalisé

#### 2.1 Intégration Stripe ✅
- [x] Produits Stripe créés : Standard 9,90€ / Premium 14,90€
- [x] API route POST /api/stripe/checkout
- [x] Redirect vers Stripe Checkout (EUR)
- [x] Page success /checkout/success
- [x] API route POST /api/stripe/webhook
- [x] Metadata flow : session_id, lead_id, offer_type

> **Note** : Stripe actuellement en mode **test**. Migration vers live requise avant lancement.

**Fichiers créés** :
```
lib/stripe.ts
app/api/stripe/checkout/route.ts
app/api/stripe/webhook/route.ts
app/[locale]/checkout/success/page.tsx
```

#### 2.2 Pricing cards avec promo ✅
- [x] Composant PricingCards (Standard vs Premium)
- [x] Badge "POPULAIRE" sur Premium
- [x] Compteur countdown "Offre expire dans..."
- [x] Prix Standard 9,90€ / Premium 14,90€
- [x] Éléments de réassurance (garantie, sécurité)

#### 2.3 Génération rapport PDF ✅
- [x] Setup @react-pdf/renderer (server-side)
- [x] Template PDF (structure 6 pages : cover, dimensions, forces/risques, plan d'action, ressources)
- [x] Composant ReportPDF complet
- [x] API route POST /api/report/generate
- [x] Génération en edge function (maxDuration: 120s)

**Fichiers créés** :
```
components/report/
└── ReportPDF.tsx
lib/report-generator.ts
app/api/report/generate/route.ts
```

#### 2.4 Intégration LLM pour personnalisation ✅
- [x] Setup OpenRouter (Claude 3.5 Sonnet via claude-3-5-sonnet)
- [x] Prompt interprétation globale du score
- [x] Prompt recommandations personnalisées
- [x] Prompt plan d'action
- [x] Gestion erreurs + fallback

**Fichiers créés** :
```
lib/openrouter.ts
lib/prompts/interpretation.ts
lib/prompts/recommendations.ts
lib/prompts/action-plan.ts
```

#### 2.5 Envoi email avec rapport — SendGrid ✅
- [x] Setup **SendGrid** (`@sendgrid/mail 8.1.6`)
- [x] lib/sendgrid.ts — client + fonction d'envoi
- [x] Email "Rapport prêt" avec lien de téléchargement (URL signée Supabase Storage)
- [x] Différenciation Standard vs Premium
- [x] API route POST /api/email/send

> ⚠️ **Resend initialement prévu → remplacé par SendGrid**
> Les template IDs SendGrid doivent encore être renseignés dans .env (templates à créer dans le dashboard SendGrid).

**Fichiers créés** :
```
lib/sendgrid.ts
app/api/email/send/route.ts
```

#### 2.6 Stockage PDF ✅
- [x] Supabase Storage (bucket "reports")
- [x] Upload PDF après génération
- [x] URL signée pour téléchargement sécurisé
- [x] lib/storage.ts

#### 2.7 Webhook flow complet ✅
- [x] Écoute `checkout.session.completed`
- [x] Création purchase en BDD (table purchases)
- [x] Trigger génération rapport → upload Storage
- [x] Trigger envoi email (SendGrid)
- [x] Mise à jour statut lead (converted = true)

### Schéma BDD implémenté
```
quiz_sessions     — Réponses quiz, scores 7 dimensions, score global
leads             — Emails capturés, consentement, statut conversion, séquence email
purchases         — Transactions Stripe, type offre, statut rapport
reports           — Rapports générés, chemin storage, métadonnées LLM
users             — (prévu V2 - Agent IA) Comptes, statut abonnement
chat_messages     — (prévu V2 - Agent IA) Historique conversations
```

### Livrables Sprint 2
- ✅ Paiement Stripe fonctionnel (Standard 9,90€ / Premium 14,90€)
- ✅ Rapport PDF généré côté serveur avec personnalisation IA (OpenRouter/Claude)
- ✅ Email envoyé automatiquement via SendGrid
- ✅ Parcours complet : quiz → email → achat → rapport → livraison
- ⚠️ Template IDs SendGrid à finaliser

---

## Sprint 3 — Optimisation du tunnel 🔄 EN COURS

### Objectif
Automatiser la séquence emails de relance, optimiser le funnel de conversion, finaliser les aspects techniques (SEO, perf, sécurité).

> C'est le **sprint final** du périmètre CoupleCheck V1.
> L'Agent IA conversationnel couple fera l'objet d'un projet séparé.

### Tâches

#### 3.1 Finalisation SendGrid ⚠️ PRIORITÉ HAUTE
- [ ] Créer les templates dynamiques dans le dashboard SendGrid
- [ ] Renseigner les template IDs dans .env :
  - `SENDGRID_TEMPLATE_WELCOME`
  - `SENDGRID_TEMPLATE_REPORT_STANDARD`
  - `SENDGRID_TEMPLATE_REPORT_PREMIUM`
  - `SENDGRID_TEMPLATE_REMINDER_J2`
  - `SENDGRID_TEMPLATE_OFFER_J5`
  - `SENDGRID_TEMPLATE_LAST_CHANCE_J7`
- [ ] Tester la délivrabilité (SPF, DKIM, DMARC)
- [ ] Valider le domaine expéditeur dans SendGrid

#### 3.2 Séquence emails relance via n8n (6h)
- [ ] Configurer l'instance n8n
- [ ] Renseigner `N8N_WEBHOOK_SEQUENCE_URL` dans .env
- [ ] Créer le workflow n8n (voir docs/EMAIL.md) :
  - J+0 : Email bienvenue / rappel résultat (déjà envoyé via webhook)
  - J+2 : Conseil gratuit (template FreeTip)
  - J+5 : Code promo -20% (template SpecialOffer)
  - J+7 : Dernier rappel (template LastChance)
  - J+14 : Contenu valeur sans vente
- [ ] Logique de suppression de la séquence si achat effectué (`converted = true`)
- [ ] Tracking ouvertures/clics (webhook SendGrid → Supabase)
- [ ] API route POST /api/n8n/start-sequence
- [ ] API route POST /api/sendgrid/webhook (events tracking)

**Séquence documentée dans** : `docs/EMAIL.md`

#### 3.3 A/B Testing PostHog (4h)
- [ ] Créer les feature flags dans PostHog :
  - `headline_variant` (landing page)
  - `pricing_variant` (control=9,90€/14,90€, low=7,90€/11,90€, high=12,90€/19,90€)
- [ ] Implémenter la lecture des flags dans les composants Hero et PricingCards
- [ ] Associer les conversions aux variants (event `purchase_completed` + propriété variant)
- [ ] Configurer le funnel de conversion dans PostHog

#### 3.4 Analytics — Dashboards & Funnels (3h)
- [ ] Configurer le funnel principal dans PostHog :
  `page_view_landing → quiz_started → quiz_completed → email_submitted → checkout_initiated → purchase_completed`
- [ ] Dashboard custom avec métriques clés :
  - Taux de complétion quiz
  - Taux de capture email
  - Taux de conversion achat
  - Panier moyen (Standard vs Premium)
- [ ] Alertes sur métriques clés

#### 3.5 Optimisations performance (4h)
- [ ] Audit Lighthouse (cible : score >90 mobile)
- [ ] Optimisation images (next/image, formats WebP/AVIF)
- [ ] Lazy loading composants non critiques
- [ ] Analyse bundle (next build --analyze)

#### 3.6 SEO (4h)
- [ ] Meta tags dynamiques (title, description) par page
- [ ] Open Graph images (quiz, résultat)
- [ ] app/sitemap.ts
- [ ] app/robots.ts
- [ ] Schema.org (FAQ, Product)

**Fichiers à créer** :
```
app/sitemap.ts
app/robots.ts
```

#### 3.7 Cloudflare (3h)
- [ ] Pointer le DNS vers Vercel via Cloudflare
- [ ] Activer WAF basique
- [ ] Rules de rate limiting sur /api/* (protection webhooks)
- [ ] Cache statique des assets

#### 3.8 Stripe — Migration production (2h)
- [ ] Basculer les clés Stripe en mode **live**
- [ ] Recréer les produits en mode live
- [ ] Mettre à jour `STRIPE_PRICE_STANDARD` et `STRIPE_PRICE_PREMIUM` dans .env prod
- [ ] Reconfigurer le webhook Stripe sur l'URL de prod

### Livrables Sprint 3
- [ ] Séquence emails relance automatisée (n8n)
- [ ] Template IDs SendGrid renseignés + délivrabilité validée
- [ ] A/B tests actifs (headline + pricing)
- [ ] Funnel PostHog configuré
- [ ] SEO : sitemap, meta, schema.org
- [ ] Cloudflare WAF actif
- [ ] Stripe en mode live

---

## Checklist déploiement MVP (avant lancement)

### Bloquants absolus
- [ ] Template IDs SendGrid configurés dans .env prod
- [ ] n8n webhook URL configurée
- [ ] Stripe basculé en mode **live** (keys + product IDs)
- [ ] Domaine couplecheck.app pointé (Cloudflare → Vercel)
- [ ] SSL activé
- [ ] Délivrabilité email validée (SPF/DKIM/DMARC)

### Vérifications
- [ ] Parcours complet testé FR + EN
- [ ] Achat Standard → PDF reçu par email
- [ ] Achat Premium → PDF reçu par email
- [ ] Séquence relance déclenchée + stoppée si achat
- [ ] PDF lisible et bien formaté (mobile + desktop)
- [ ] Analytics PostHog : événements reçus
- [ ] Pages légales en ligne (✅ déjà fait)
- [ ] Cloudflare WAF actif
- [ ] Backup BDD configuré (Supabase auto-backup)

### Post-lancement (J+1 à J+7)
- [ ] Vérifier les premiers événements PostHog
- [ ] Tester un achat réel avec carte live
- [ ] Monitorer erreurs (Vercel logs + Supabase logs)
- [ ] Vérifier taux d'ouverture emails J+0
- [ ] Surveiller score Spam (Mail-Tester ou GlockApps)

---

## Backlog V2 (hors périmètre Sprint 3)

| Feature | Effort | Impact | Priorité |
|---------|--------|--------|----------|
| **Agent IA / plateforme conversationnelle couple** | High | High | P0 — PRD séparé |
| App mobile (PWA) | Medium | High | P1 |
| Expansion EN (US/UK) | Low | High | P1 |
| Re-test "3 mois après" | Low | Medium | P2 |
| Comparaison couple (2 personnes) | High | High | P2 |
| Programme email 30 jours | Medium | Medium | P3 |
| Intégration Google/Apple Calendar (rappels) | Medium | Low | P3 |
