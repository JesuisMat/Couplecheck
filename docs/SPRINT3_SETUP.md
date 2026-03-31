# SPRINT3_SETUP.md — Guide des configurations manuelles

> Ce document liste toutes les actions que **toi** (pas le code) dois effectuer pour finaliser le Sprint 3.
> Le code côté app est déjà prêt. Il ne reste qu'à brancher les services externes.

---

## Sommaire

1. [SendGrid — Templates + Délivrabilité](#1-sendgrid--templates--délivrabilité)
2. [n8n — Workflow séquence email relance](#2-n8n--workflow-séquence-email-relance)
3. [PostHog — Feature flags A/B + Funnel + Dashboard](#3-posthog--feature-flags-ab--funnel--dashboard)
4. [Stripe — Migration en production (live)](#4-stripe--migration-en-production-live)
5. [Cloudflare — DNS + WAF + Rate limiting](#5-cloudflare--dns--waf--rate-limiting)
6. [Variables d'environnement — Récapitulatif complet](#6-variables-denvironnement--récapitulatif-complet)
7. [Checklist de déploiement final](#7-checklist-de-déploiement-final)

---

## 1. SendGrid — Templates + Délivrabilité

### Architecture email — à lire en premier

#### Comment les emails sont déclenchés

```
Utilisateur soumet email (EmailCapture.tsx)
  └─→ POST /api/leads/capture
        ├─ Enregistre le lead dans Supabase (table "leads")
        ├─ Met à jour quiz_sessions.email_captured = true
        └─ ⚠️ NE déclenche PAS encore l'email Welcome ni n8n
              ↓
        Tu dois brancher sendWelcomeEmail() + triggerEmailSequence()
        dans cette route (voir section 1.6 ci-dessous)
```

```
Utilisateur complète un achat Stripe
  └─→ Webhook Stripe → POST /api/stripe/webhook
        ├─ Crée/met à jour la table "purchases" (status = completed)
        ├─ Génère le rapport PDF (OpenRouter + react-pdf)
        ├─ Upload le PDF dans Supabase Storage
        ├─ Met à jour leads.converted = true  ← ce flag arrête la séquence n8n
        └─ Envoie l'email rapport via sendReportEmail() (inline HTML, bilingue natif)
```

#### Les deux catégories d'emails

**Catégorie A — Emails envoyés directement par le code Next.js** (Welcome J+0 et Rapport post-achat)
- La locale (`fr` ou `en`) est connue au moment de l'envoi
- Welcome : le code choisit automatiquement `SENDGRID_TEMPLATE_RESULT_FR` ou `SENDGRID_TEMPLATE_RESULT_EN` selon `locale`
- **Si le template n'est pas configuré** : fallback HTML inline bilingue — les emails fonctionnent même sans templates
- Rapport : **aucun template SendGrid** — le code construit directement le HTML avec `labels = { fr: {...}, en: {...} }`, les deux locales dans le même code

**Catégorie B — Emails envoyés par n8n** (séquence relance J+2, J+5, J+7, J+14)
- n8n reçoit le champ `locale` dans le payload webhook (`"fr"` ou `"en"`)
- n8n doit lui-même router vers le bon template selon cette valeur
- C'est pourquoi il faut créer des templates FR **et** EN, et configurer un nœud IF dans n8n (détaillé section 2)

#### Les tables Supabase impliquées

| Table | Colonnes clés | Usage |
|-------|--------------|-------|
| `leads` | `id`, `email`, `first_name`, `locale`, `session_id`, `converted`, `unsubscribed`, `last_email_at` | Un lead par email. `converted=true` → n8n stoppe la séquence. `unsubscribed=true` → même effet. |
| `quiz_sessions` | `id`, `locale`, `global_score`, `scores`, `pain_points`, `email_captured`, `completed` | Une session par passage du quiz |
| `purchases` | `session_id`, `lead_id`, `offer_type`, `status`, `report_url`, `report_sent_at` | Créée par le webhook Stripe. `offer_type` = `standard` ou `premium` |

> **Comment n8n sait quand s'arrêter** : avant chaque envoi de la séquence, n8n appelle `GET /api/leads/{leadId}/status`. Cette route lit les colonnes `converted` et `unsubscribed` de la table `leads` et retourne `{ shouldSendEmail: true/false }`. Si `false`, n8n arrête le workflow.

#### L'expéditeur

Le code `lib/sendgrid.ts` utilise `process.env.SENDGRID_FROM_EMAIL` avec le nom `CoupleCheck` (pas le nom fondateur). Configure donc :
```
SENDGRID_FROM_EMAIL=matthieu@couplecheck.app
```
Le nom affiché dans `FROM` est `CoupleCheck` côté code — tu peux le modifier dans `lib/sendgrid.ts` ligne 10 si tu veux afficher "Matthieu de CoupleCheck".

---

### 1.1 Valider le domaine expéditeur

1. Va dans **SendGrid → Settings → Sender Authentication → Domain Authentication**
2. Clique **Authenticate Your Domain**
3. Sélectionne ton registrar DNS (ex: Cloudflare, OVH…)
4. Saisis le domaine : `couplecheck.app`
5. SendGrid génère des enregistrements DNS (CNAME) à ajouter
6. Ajoute ces CNAME dans ton panneau DNS (Cloudflare ou registrar)
7. Clique **Verify** dans SendGrid

**Résultat** : SPF, DKIM et Return-Path sont configurés automatiquement.

### 1.2 Configurer le webhook d'événements SendGrid

1. Va dans **Settings → Mail Settings → Event Webhook**
2. **HTTP Post URL** : `https://couplecheck.app/api/sendgrid/webhook`
3. **Actions à cocher** :
   - ✅ Delivered
   - ✅ Opened
   - ✅ Clicked
   - ✅ Unsubscribed
   - ✅ Bounced
   - ✅ Dropped
   - ✅ Spam Report
4. Clique **Save**

### 1.3 Créer les templates dynamiques

**Comment créer chaque template :**
1. Va dans **Email API → Dynamic Templates → Create a Dynamic Template**
2. Donne-lui le nom indiqué dans le tableau ci-dessous
3. Clique **Add Version**, choisis l'éditeur **Code** (pas drag & drop)
4. Colle le HTML du bon email (voir `docs/EMAIL.md` pour chaque contenu)
5. Dans l'onglet **Test Data**, colle un exemple de variables pour prévisualiser
6. Clique **Save** puis récupère l'**ID** en haut (format `d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
7. Note cet ID — il va dans ton `.env` Vercel

---

#### Groupe A — Email Welcome (code Next.js) — Catégorie A

Ces **2 templates** sont **optionnels** (le code a un fallback HTML inline), mais recommandés pour le branding.
Les emails de rapport post-achat (Standard / Premium) n'ont **pas** de templates — le code les construit directement en bilingue.

| Variable `.env` | Nom template | Langue | Contenu dans `docs/EMAIL.md` | Variables dynamiques |
|-----------------|--------------|--------|------------------------------|----------------------|
| `SENDGRID_TEMPLATE_RESULT_FR` | CoupleCheck - Résultat FR | 🇫🇷 FR | Section 2 — Version FR | `firstName`, `globalScore`, `scoreLabel`, `strengths[]`, `risksCount`, `resultUrl` |
| `SENDGRID_TEMPLATE_RESULT_EN` | CoupleCheck - Result EN | 🇬🇧 EN | Section 2 — Version EN | `firstName`, `globalScore`, `scoreLabel`, `strengths[]`, `risksCount`, `resultUrl` |

> **Emails rapport post-achat (Standard / Premium)** — entièrement gérés dans `lib/sendgrid.ts` via `sendReportEmail()`. Le HTML est généré en code, bilingue natif (FR/EN dans le même fichier), aligné sur le design system des autres communications (DM Serif Display, DM Sans, fond `#FAF8F5`, rouge `#AA2C32`, signature Matthieu). **Aucun template SendGrid à créer pour les rapports.**

---

#### Groupe B — Emails séquence relance (n8n) — Catégorie B

Ces 8 templates sont **obligatoires** pour que la séquence n8n fonctionne. Sans eux, n8n ne peut pas envoyer les emails de relance.

| Variable `.env` | Nom template | Langue | Contenu dans `docs/EMAIL.md` | Variables dynamiques |
|-----------------|--------------|--------|------------------------------|----------------------|
| `SENDGRID_TEMPLATE_RELANCE_J2_FR` | CoupleCheck - Relance J+2 FR | 🇫🇷 FR | Section 3 — Email J+2 FR | `firstName`, `globalScore`, `resultUrl` |
| `SENDGRID_TEMPLATE_RELANCE_J2_EN` | CoupleCheck - Relance J+2 EN | 🇬🇧 EN | *(adapte la version FR en anglais)* | `firstName`, `globalScore`, `resultUrl` |
| `SENDGRID_TEMPLATE_RELANCE_J5_FR` | CoupleCheck - Relance J+5 FR | 🇫🇷 FR | Section 3 — Email J+5 FR | `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry` |
| `SENDGRID_TEMPLATE_RELANCE_J5_EN` | CoupleCheck - Relance J+5 EN | 🇬🇧 EN | *(adapte la version FR en anglais)* | `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry` |
| `SENDGRID_TEMPLATE_RELANCE_J7_FR` | CoupleCheck - Relance J+7 FR | 🇫🇷 FR | Section 3 — Email J+7 FR | `firstName`, `globalScore`, `risksCount`, `checkoutUrl` |
| `SENDGRID_TEMPLATE_RELANCE_J7_EN` | CoupleCheck - Relance J+7 EN | 🇬🇧 EN | *(adapte la version FR en anglais)* | `firstName`, `globalScore`, `risksCount`, `checkoutUrl` |
| `SENDGRID_TEMPLATE_RELANCE_J14_FR` | CoupleCheck - Relance J+14 FR | 🇫🇷 FR | Section 3 — Email J+14 FR | `firstName` |
| `SENDGRID_TEMPLATE_RELANCE_J14_EN` | CoupleCheck - Relance J+14 EN | 🇬🇧 EN | *(adapte la version FR en anglais)* | `firstName` |

**Pour les versions EN** : `docs/EMAIL.md` contient les textes complets EN pour les 4 emails de relance (sections 2.2 à 2.5). Utilise directement ces versions — elles sont déjà rédigées et prêtes à coller dans les templates SendGrid.

---

### 1.6 ✅ Branchement email Welcome + déclenchement n8n — déjà fait

`app/api/leads/capture/route.ts` appelle maintenant `sendWelcomeEmail()` et `triggerEmailSequence()` automatiquement après chaque capture d'email. Les deux appels sont non-bloquants (les erreurs sont loggées sans faire échouer la réponse HTTP).

**Ce qui se passe désormais à la capture d'email :**
1. Lead upsert en base (`leads`)
2. `quiz_sessions.email_captured = true`
3. Email Welcome envoyé (template SendGrid si configuré, sinon HTML inline)
4. Séquence n8n déclenchée (si `N8N_WEBHOOK_SEQUENCE_URL` est configuré)

---

### 1.4 Configurer le code promo Stripe pour J+5

Dans le **Dashboard Stripe → Products → Coupons** :
1. Clique **+ New coupon**
2. **ID** : `COUPLE20`
3. **Type** : Percentage discount
4. **Percent off** : 20%
5. **Duration** : Forever (once)
6. **Redemption limit** : 1000
7. **Expiry date** : dans 90 jours
8. Clique **Create coupon**

Le code `COUPLE20` est référencé dans l'email J+5 (voir `docs/EMAIL.md`).

### 1.5 Tester la délivrabilité

Après configuration :
1. Envoie un email test depuis **SendGrid → Email API → API Keys → Send a test**
2. Utilise [mail-tester.com](https://www.mail-tester.com) pour vérifier ton score (objectif : 9/10 minimum)
3. Vérifie que SPF, DKIM, DMARC passent tous

---

## 2. n8n — Workflow séquence email relance

### 2.1 Prérequis

Tu as déjà une instance n8n. Assure-toi qu'elle est accessible en HTTPS (nécessaire pour les webhooks entrants).

### 2.2 Principe du routage FR/EN dans n8n

Le payload que reçoit n8n contient toujours un champ `locale` (`"fr"` ou `"en"`). Pour chaque email de la séquence, n8n doit choisir le bon template SendGrid selon cette valeur.

Le pattern à répéter à chaque étape d'envoi :

```
IF locale === "fr"
  ├── Branche True  → Nœud SendGrid avec template FR
  └── Branche False → Nœud SendGrid avec template EN
```

Les deux nœuds SendGrid FR et EN se rejoignent ensuite vers le même nœud Wait suivant.

---

### 2.3 Ajouter les credentials SendGrid dans n8n

Fais ça **en premier**, avant de créer les nœuds SendGrid.

1. Va dans n8n → **Credentials → New**
2. Cherche **SendGrid**
3. Renseigne ta clé API SendGrid (`SG.xxx`)
4. Nomme-la `SendGrid CoupleCheck`
5. Clique **Save**

---

### 2.4 Créer le workflow

1. Dans n8n, crée un nouveau workflow : **"CoupleCheck — Séquence Relance"**
2. Ajoute les nœuds dans l'ordre ci-dessous

---

**Nœud 1 : Webhook (déclencheur)**
- Type : `Webhook`
- HTTP Method : `POST`
- Path : `/couplecheck-sequence`
- Authentication : None
- Response mode : `Immediately`

> Récupère l'URL produite, ex : `https://n8n.ton-domaine.com/webhook/couplecheck-sequence`
> → C'est cette URL qui ira dans `N8N_WEBHOOK_SEQUENCE_URL` dans Vercel

**Payload reçu (ce que le code envoie) :**
```json
{
  "leadId": "uuid",
  "email": "user@email.com",
  "firstName": "Prénom",
  "globalScore": 72,
  "risksCount": 2,
  "resultUrl": "https://couplecheck.app/fr/result/session-id",
  "checkoutUrl": "https://couplecheck.app/fr/result/session-id/unlock",
  "locale": "fr",
  "apiUrl": "https://couplecheck.app"
}
```

---

**Nœud 2 : Wait 48h**
- Type : `Wait`
- Resume : `After time interval`
- Wait Amount : `48` / Unit : `Hours`

---

**Nœud 3 : HTTP Request — Check statut lead**
- Type : `HTTP Request`
- Method : `GET`
- URL : `{{ $('Webhook').item.json.apiUrl }}/api/leads/{{ $('Webhook').item.json.leadId }}/status`
- Authentication : None

> Retourne `{ shouldSendEmail: true/false, converted: bool, unsubscribed: bool }`

---

**Nœud 4 : IF — Lead converti ou désinscrit ?**
- Type : `IF`
- Condition : `{{ $json.shouldSendEmail }}` **equals (boolean)** `true`
- Branche **True** → continuer vers l'envoi J+2
- Branche **False** → fin du workflow (ne connecte rien)

---

**Nœud 5 : IF — Locale J+2**
- Type : `IF`
- Condition : `{{ $('Webhook').item.json.locale }}` **equals (string)** `fr`
- Branche **True** → Nœud 5a (FR)
- Branche **False** → Nœud 5b (EN)

---

**Nœud 5a : SendGrid — Email J+2 FR**
- Credentials : `SendGrid CoupleCheck`
- From : `matthieu@couplecheck.app` / Name : `Matthieu de CoupleCheck`
- To : `{{ $('Webhook').item.json.email }}`
- Template ID : *(colle ici l'ID de `SENDGRID_TEMPLATE_RELANCE_J2_FR`)*
- Dynamic Template Data :
  ```json
  {
    "firstName": "{{ $('Webhook').item.json.firstName }}",
    "globalScore": "{{ $('Webhook').item.json.globalScore }}",
    "resultUrl": "{{ $('Webhook').item.json.resultUrl }}"
  }
  ```

**Nœud 5b : SendGrid — Email J+2 EN**
- Même config que 5a, sauf :
- Template ID : *(colle ici l'ID de `SENDGRID_TEMPLATE_RELANCE_J2_EN`)*

> Connecte **5a** et **5b** tous les deux vers le Nœud 6.

---

**Nœud 6 : Wait 72h** *(J+5 = J+2 + 72h)*
- Wait Amount : `72` / Unit : `Hours`

---

**Nœud 7 : HTTP Request — Check statut lead** *(même config que Nœud 3)*

---

**Nœud 8 : IF — Lead converti ?** *(même config que Nœud 4)*
- Branche **True** → continuer vers l'envoi J+5
- Branche **False** → fin

---

**Nœud 9 : Set — Calculer promoExpiry**
- Type : `Set`
- Mode : `Manually`
- Ajouter une valeur :
  - Name : `promoExpiry`
  - Value (expression) :
    ```
    {{ $('Webhook').item.json.locale === 'fr'
       ? new Date(Date.now() + 48*60*60*1000).toLocaleDateString('fr-FR')
       : new Date(Date.now() + 48*60*60*1000).toLocaleDateString('en-GB') }}
    ```

---

**Nœud 10 : IF — Locale J+5**
- Même config que Nœud 5 (condition `locale === 'fr'`)

**Nœud 10a : SendGrid — Email J+5 FR**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J5_FR`)*
- Dynamic Template Data :
  ```json
  {
    "firstName": "{{ $('Webhook').item.json.firstName }}",
    "globalScore": "{{ $('Webhook').item.json.globalScore }}",
    "risksCount": "{{ $('Webhook').item.json.risksCount }}",
    "checkoutUrl": "{{ $('Webhook').item.json.checkoutUrl }}",
    "promoExpiry": "{{ $('Set').item.json.promoExpiry }}"
  }
  ```

**Nœud 10b : SendGrid — Email J+5 EN**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J5_EN`)*
- Même Dynamic Template Data que 10a

> Connecte **10a** et **10b** vers le Nœud 11.

---

**Nœud 11 : Wait 48h**

---

**Nœud 12 : HTTP Request — Check statut lead** *(même config que Nœud 3)*

---

**Nœud 13 : IF — Lead converti ?** *(même config que Nœud 4)*
- Branche **True** → continuer vers l'envoi J+7
- Branche **False** → fin

---

**Nœud 14 : IF — Locale J+7**

**Nœud 14a : SendGrid — Email J+7 FR**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J7_FR`)*
- Dynamic Template Data :
  ```json
  {
    "firstName": "{{ $('Webhook').item.json.firstName }}",
    "globalScore": "{{ $('Webhook').item.json.globalScore }}",
    "risksCount": "{{ $('Webhook').item.json.risksCount }}",
    "checkoutUrl": "{{ $('Webhook').item.json.checkoutUrl }}"
  }
  ```

**Nœud 14b : SendGrid — Email J+7 EN**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J7_EN`)*
- Même Dynamic Template Data que 14a

> Connecte **14a** et **14b** vers le Nœud 15.

---

**Nœud 15 : Wait 7 days**
- Wait Amount : `7` / Unit : `Days`

---

**Nœud 16 : IF — Locale J+14**

**Nœud 16a : SendGrid — Email J+14 FR**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J14_FR`)*
- Dynamic Template Data :
  ```json
  {
    "firstName": "{{ $('Webhook').item.json.firstName }}"
  }
  ```

**Nœud 16b : SendGrid — Email J+14 EN**
- Template ID : *(ID de `SENDGRID_TEMPLATE_RELANCE_J14_EN`)*
- Même Dynamic Template Data que 16a

---

### 2.5 Schéma de connexion des nœuds

```
Webhook
  └─→ Wait 48h
        └─→ Check status [GET]
              └─→ IF shouldSendEmail?
                    ├── False → [FIN]
                    └── True → IF locale=fr?
                                 ├── True  → SendGrid J+2 FR ─┐
                                 └── False → SendGrid J+2 EN ─┘
                                                               └─→ Wait 72h
                                                                     └─→ Check status [GET]
                                                                           └─→ IF shouldSendEmail?
                                                                                 ├── False → [FIN]
                                                                                 └── True → Set promoExpiry
                                                                                              └─→ IF locale=fr?
                                                                                                    ├── True  → SendGrid J+5 FR ─┐
                                                                                                    └── False → SendGrid J+5 EN ─┘
                                                                                                                                  └─→ Wait 48h
                                                                                                                                        └─→ Check status [GET]
                                                                                                                                              └─→ IF shouldSendEmail?
                                                                                                                                                    ├── False → [FIN]
                                                                                                                                                    └── True → IF locale=fr?
                                                                                                                                                                 ├── True  → SendGrid J+7 FR ─┐
                                                                                                                                                                 └── False → SendGrid J+7 EN ─┘
                                                                                                                                                                                               └─→ Wait 7 days
                                                                                                                                                                                                     └─→ IF locale=fr?
                                                                                                                                                                                                           ├── True  → SendGrid J+14 FR
                                                                                                                                                                                                           └── False → SendGrid J+14 EN
```

> **Note** : Le dernier envoi (J+14) n'a pas de vérification de conversion — c'est voulu, c'est un email de valeur sans CTA commercial, peu importe le statut du lead à ce stade.

---

### 2.6 Activer le workflow

1. Clique le toggle **Active** en haut à droite
2. Le workflow est maintenant en écoute sur l'URL webhook

### 2.7 Tester le workflow

**Test FR :**
```bash
curl -X POST https://n8n.ton-domaine.com/webhook/couplecheck-sequence \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "test-lead-id",
    "email": "ton@email.com",
    "firstName": "Sophie",
    "globalScore": 72,
    "risksCount": 2,
    "resultUrl": "https://couplecheck.app/fr/result/test-session",
    "checkoutUrl": "https://couplecheck.app/fr/result/test-session/unlock",
    "locale": "fr",
    "apiUrl": "https://couplecheck.app"
  }'
```

**Test EN :**
```bash
curl -X POST https://n8n.ton-domaine.com/webhook/couplecheck-sequence \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "test-lead-id-en",
    "email": "ton@email.com",
    "firstName": "Emma",
    "globalScore": 68,
    "risksCount": 3,
    "resultUrl": "https://couplecheck.app/en/result/test-session",
    "checkoutUrl": "https://couplecheck.app/en/result/test-session/unlock",
    "locale": "en",
    "apiUrl": "https://couplecheck.app"
  }'
```

Vérifie dans n8n → **Executions** que le workflow s'est déclenché et que le bon nœud SendGrid a été choisi.

---

## 3. PostHog — Feature flags A/B + Funnel + Dashboard

### 3.1 Créer les feature flags A/B

#### Flag 1 : `headline_variant`

1. Va dans **PostHog → Feature Flags → New Feature Flag**
2. **Key** : `headline_variant`
3. **Description** : A/B test headline de la landing page
4. **Type** : Multiple variants (string)
5. **Variants** :
   | Variant key | Description | % de rollout |
   |-------------|-------------|-------------|
   | `control` | "Votre relation est-elle vraiment florissante ?" | 33% |
   | `variant_b` | "Découvrez ce qui renforce — ou fragilise — votre couple" | 33% |
   | `variant_c` | "Le test que votre couple mérite — résultat en 3 min" | 34% |
6. **Rollout** : 100% des utilisateurs
7. Clique **Save**

#### Flag 2 : `pricing_variant`

1. **Key** : `pricing_variant`
2. **Description** : A/B test prix Standard/Premium
3. **Type** : Multiple variants (string)
4. **Variants** :
   | Variant key | Standard | Premium | % de rollout |
   |-------------|----------|---------|-------------|
   | `control` | 9,90€ | 14,90€ | 34% |
   | `low` | 9,90€ | 15,90€ | 33% |
   | `high` | 14,90€ | 22,90€ | 33% |
5. **Rollout** : 100% des utilisateurs
6. Clique **Save**

> **Note** : Le variant `pricing_variant` change uniquement l'affichage des prix. Le prix Stripe reste fixe (mode test ou live). Pour tester différents prix réels, il faudrait créer des Price IDs Stripe correspondants et les passer à l'API checkout.

### 3.2 Configurer le funnel de conversion principal

1. Va dans **PostHog → Insights → New Insight → Funnels**
2. **Nom** : "Funnel Principal — Quiz → Achat"
3. **Étapes** (dans l'ordre) :
   - `page_view_landing`
   - `quiz_started`
   - `quiz_completed`
   - `email_submitted`
   - `checkout_initiated`
   - `purchase_completed`
4. **Période** : Last 30 days
5. **Breakdown** : par `locale` (fr/en)
6. Clique **Save to dashboard**

### 3.3 Configurer le funnel email → conversion

1. Nouveau funnel : "Funnel Email — Relance → Achat"
2. **Étapes** :
   - `email_captured`
   - `email_opened` (si tu traces l'ouverture côté client)
   - `checkout_initiated`
   - `purchase_completed`
3. **Breakdown** : par `pricing_variant`
4. Sauvegarde dans le dashboard

### 3.4 Créer le dashboard métriques clés

1. Va dans **PostHog → Dashboards → New Dashboard**
2. **Nom** : "CoupleCheck — KPIs"
3. Ajoute les insights suivants :

| Widget | Type | Métrique |
|--------|------|---------|
| Visiteurs uniques | Trend | `page_view_landing` unique users |
| Taux completion quiz | Conversion | `quiz_started` → `quiz_completed` |
| Taux capture email | Conversion | `quiz_completed` → `email_submitted` |
| Taux conversion achat | Conversion | `email_submitted` → `purchase_completed` |
| Split Standard vs Premium | Breakdown | `purchase_completed` by `offer_type` |
| Headline winner | Breakdown | `checkout_initiated` by `headline_variant` |
| Pricing winner | Breakdown | `purchase_completed` by `pricing_variant` |

### 3.5 Configurer les alertes

1. Va dans **PostHog → Alerts → New Alert**
2. Crée les alertes suivantes :

| Alerte | Condition | Notification |
|--------|-----------|-------------|
| Taux conversion < 2% | `purchase_completed` / `email_submitted` < 2% | Email |
| Quiz completion < 50% | `quiz_completed` / `quiz_started` < 50% | Email |
| Aucun achat depuis 48h | 0 `purchase_completed` en 48h | Email |

---

## 4. Stripe — Migration en production (live)

### 4.1 Basculer les clés API

1. Dans **Stripe Dashboard**, passe du mode **Test** au mode **Live** (toggle en haut)
2. Va dans **Developers → API Keys**
3. Récupère :
   - **Publishable key** (commence par `pk_live_...`)
   - **Secret key** (commence par `sk_live_...`)
4. Mets à jour dans Vercel (Settings → Environment Variables) :
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
   STRIPE_SECRET_KEY = sk_live_...
   ```

### 4.2 Reconfigurer le webhook Stripe en live

1. Va dans **Stripe → Developers → Webhooks → Add endpoint**
2. **Endpoint URL** : `https://couplecheck.app/api/stripe/webhook`
3. **Events** : `checkout.session.completed`
4. Clique **Add endpoint**
5. Récupère le **Signing secret** (commence par `whsec_...`)
6. Mets à jour `STRIPE_WEBHOOK_SECRET` dans Vercel

### 4.3 Créer le coupon COUPLE20 en live

Répète l'étape 1.4 de ce guide mais dans le **mode live** de Stripe.

### 4.4 Tester un achat live

1. Fais un achat test avec une vraie carte (ex: Visa de test physique ou carte personnelle)
2. Vérifie que l'email de rapport arrive bien
3. Stripe remboursera le montant automatiquement si tu annules dans les 7 jours

---

## 5. Cloudflare — DNS + WAF + Rate limiting

### 5.1 Pointer le DNS vers Vercel

1. Dans **Cloudflare → ton domaine → DNS**
2. Ajoute un enregistrement CNAME :
   - **Type** : CNAME
   - **Name** : `@` (ou `couplecheck.app`)
   - **Target** : `cname.vercel-dns.com`
   - **Proxy** : ✅ Activé (nuage orange)
3. Pour le sous-domaine `www` :
   - **Type** : CNAME
   - **Name** : `www`
   - **Target** : `cname.vercel-dns.com`
   - **Proxy** : ✅ Activé

4. Dans **Vercel → ton projet → Settings → Domains** :
   - Ajoute `couplecheck.app`
   - Ajoute `www.couplecheck.app`
   - Vercel configure le SSL automatiquement

### 5.2 Configurer le SSL

1. Dans **Cloudflare → SSL/TLS → Overview**
2. Mode : **Full (strict)**

> Ne pas utiliser "Flexible" — ça créerait des boucles de redirection.

### 5.3 Activer le WAF

1. Va dans **Cloudflare → Security → WAF**
2. Clique **Deploy a managed ruleset**
3. Active **Cloudflare Managed Ruleset** (protection OWASP Top 10)
4. Active **Bot Fight Mode** : Security → Bots → Bot Fight Mode → ON

### 5.4 Configurer le rate limiting sur les API

1. Va dans **Cloudflare → Security → WAF → Rate limiting rules**
2. Clique **Create rule**

**Règle 1 : Protéger les webhooks**
- **Name** : Rate limit API routes
- **When incoming requests match** :
  - Field : URI Path
  - Operator : starts with
  - Value : `/api/`
- **Rate limit** : 100 requests per 1 minute per IP
- **Action** : Block (429)
- Clique **Deploy**

**Règle 2 : Protéger le webhook Stripe (plus permissif)**
- **Name** : Stripe webhook allowlist
- **When** : URI Path equals `/api/stripe/webhook` AND IP is NOT from Stripe
  - Tu peux créer une règle "skip" pour les IPs Stripe : `3.18.12.63, 3.130.192.231, 13.235.14.237, 13.235.122.149, 18.211.135.69, 35.154.171.200, 52.15.183.38, 54.187.174.169, 54.187.205.235, 54.187.216.72`
- **Action** : Allow (skip rate limiting pour ces IPs)

### 5.5 Configurer le cache des assets statiques

1. Va dans **Cloudflare → Caching → Cache Rules → Create rule**
2. **Name** : Cache static assets
3. **When** : URI Path matches regex `\.(js|css|woff2?|png|jpg|svg|ico|webp)$`
4. **Cache status** : Eligible for cache
5. **Edge TTL** : 30 days
6. Clique **Deploy**

---

## 6. Variables d'environnement — Récapitulatif complet

À configurer dans **Vercel → Settings → Environment Variables** (Production + Preview) :

### Supabase (déjà configuré)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Stripe — METTRE À JOUR EN LIVE
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### OpenRouter (déjà configuré)
```
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=anthropic/claude-3-5-sonnet
```

### SendGrid — COMPLÉTER
```
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=hello@couplecheck.app

# Groupe A — Email Welcome (optionnels, fallback HTML inline si absent)
# Les emails de rapport post-achat ne lisent PAS de template — HTML inline bilingue dans le code
SENDGRID_TEMPLATE_RESULT_FR=d-xxx        # Welcome J+0 FR
SENDGRID_TEMPLATE_RESULT_EN=d-xxx        # Welcome J+0 EN

# Groupe B — Séquence relance n8n (obligatoires pour la séquence)
SENDGRID_TEMPLATE_RELANCE_J2_FR=d-xxx    # J+2 Conseil gratuit FR
SENDGRID_TEMPLATE_RELANCE_J2_EN=d-xxx    # J+2 Conseil gratuit EN
SENDGRID_TEMPLATE_RELANCE_J5_FR=d-xxx    # J+5 Offre -20% FR
SENDGRID_TEMPLATE_RELANCE_J5_EN=d-xxx    # J+5 Offre -20% EN
SENDGRID_TEMPLATE_RELANCE_J7_FR=d-xxx    # J+7 Dernière chance FR
SENDGRID_TEMPLATE_RELANCE_J7_EN=d-xxx    # J+7 Dernière chance EN
SENDGRID_TEMPLATE_RELANCE_J14_FR=d-xxx   # J+14 Contenu valeur FR
SENDGRID_TEMPLATE_RELANCE_J14_EN=d-xxx   # J+14 Contenu valeur EN
```

> **Important** : Les variables du Groupe B ne sont pas lues par le code Next.js — elles servent uniquement de référence pour toi. Dans n8n, tu colles les IDs directement dans les nœuds SendGrid (pas en variable d'environnement n8n, sauf si tu configures les env vars n8n séparément).

### n8n — COMPLÉTER
```
N8N_WEBHOOK_SEQUENCE_URL=https://n8n.ton-domaine.com/webhook/couplecheck-sequence
```

### PostHog (déjà configuré)
```
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

### App
```
NEXT_PUBLIC_APP_URL=https://couplecheck.app
```

---

## 7. Checklist de déploiement final

### Bloquants absolus (ne pas lancer sans ça)

**Infrastructure :**
- [ ] `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` passés en **live** dans Vercel
- [ ] Webhook Stripe live configuré sur `https://couplecheck.app/api/stripe/webhook`
- [ ] `N8N_WEBHOOK_SEQUENCE_URL` renseigné dans Vercel
- [ ] Domaine `couplecheck.app` pointé via Cloudflare → Vercel
- [ ] SSL Full (strict) activé dans Cloudflare
- [ ] Domaine expéditeur validé dans SendGrid (SPF + DKIM OK)
- [ ] `SENDGRID_API_KEY` et `SENDGRID_FROM_EMAIL` configurés dans Vercel
- [ ] 8 templates relance SendGrid créés (4 FR + 4 EN) — Groupe B section 1.3
- [ ] IDs des 8 templates collés dans les nœuds n8n correspondants
- [ ] Workflow n8n actif avec routage FR/EN sur chaque envoi

### Vérifications fonctionnelles

- [ ] Parcours complet FR : landing → quiz → email capturé → **email Welcome reçu en FR** → achat → PDF reçu
- [ ] Parcours complet EN : même chose → **email Welcome reçu en EN**
- [ ] Achat Standard → rapport reçu par email
- [ ] Achat Premium → rapport reçu + mention Agent IA
- [ ] Test n8n FR : curl test locale=fr → email J+2 reçu en français
- [ ] Test n8n EN : curl test locale=en → email J+2 reçu en anglais
- [ ] Séquence n8n stoppée après un achat (marquer le lead `converted=true` puis vérifier que n8n s'arrête)
- [ ] PDF lisible sur mobile et desktop
- [ ] Timer countdown pricing visible sur la page résultat

### Analytics

- [ ] Events PostHog reçus (vérifier dans **Events → Live Events**)
- [ ] Feature flags `headline_variant` et `pricing_variant` actifs
- [ ] Funnel "Quiz → Achat" affiché dans le dashboard
- [ ] Dashboard KPIs créé

### Post-lancement (J+1 à J+7)

- [ ] Vérifier premier achat réel dans Stripe
- [ ] Tester manuellement le score Mail-Tester (objectif : > 9/10)
- [ ] Monitorer erreurs dans Vercel Logs + Supabase Logs
- [ ] Vérifier taux d'ouverture email Welcome dans SendGrid
- [ ] Analyser premiers résultats A/B dans PostHog

---

## Contacts utiles

| Service | URL dashboard | Support |
|---------|--------------|---------|
| Vercel | vercel.com/dashboard | vercel.com/support |
| Supabase | supabase.com/dashboard | supabase.com/support |
| Stripe | dashboard.stripe.com | stripe.com/support |
| SendGrid | app.sendgrid.com | sendgrid.com/support |
| PostHog | eu.posthog.com | posthog.com/support |
| Cloudflare | dash.cloudflare.com | cloudflare.com/support |
