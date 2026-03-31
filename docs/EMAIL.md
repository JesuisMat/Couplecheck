# EMAIL_SEQUENCES.md — CoupleCheck

## 1. Vue d'ensemble

| Séquence | Trigger | Objectif |
|----------|---------|----------|
| Welcome | Email capturé | Délivrer résultat + premier CTA |
| Relance | Non-achat J+0 à J+14 | Convertir en acheteur |
| Post-achat Standard | Achat Standard | Livrer PDF + satisfaction |
| Post-achat Premium | Achat Premium | Livrer PDF + onboarding Agent IA |
| Abonnement | Renouvellement/Expiration | Rétention |

**Provider** : SendGrid (templates dynamiques + n8n pour séquences)

---

## 2. Email Welcome (J+0 immédiat)

### Trigger
Lead créé (email capturé après quiz)

### Objectif
Délivrer le résultat tronqué + pousser vers l'achat

---

### Version FR

**Objet** : [Prénom], ton résultat CoupleCheck est prêt 📊

**Preview** : Découvre ton score et ce qui renforce (ou fragilise) ton couple

**Corps** :

```html
Salut {{firstName}},

Merci d'avoir pris 3 minutes pour faire le test CoupleCheck.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 TON SCORE GLOBAL : {{globalScore}}/100
{{scoreLabel}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Tes points forts identifiés :
{{#each strengths}}
• {{this}}
{{/each}}

⚠️ Zones à surveiller : {{risksCount}} alertes détectées
→ Détails disponibles dans ton rapport complet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👉 VOIR MON RÉSULTAT COMPLET
[BOUTON : Accéder à mon résultat → {{resultUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 OFFRE PRINTEMPS : -33% sur le rapport Premium
Rapport complet + 1 mois d'accès au Coach IA
19,90€ au lieu de 29,90€

[BOUTON : Débloquer mon rapport]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À très vite,
L'équipe CoupleCheck

P.S. Tu as des questions ? Réponds simplement à cet email.
```

---

### Version EN

**Subject** : {{firstName}}, your CoupleCheck result is ready 📊

**Preview** : Discover your score and what strengthens (or weakens) your relationship

**Body** :

```html
Hey {{firstName}},

Thanks for taking 3 minutes to complete the CoupleCheck test.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 YOUR GLOBAL SCORE: {{globalScore}}/100
{{scoreLabel}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Your identified strengths:
{{#each strengths}}
• {{this}}
{{/each}}

⚠️ Areas to watch: {{risksCount}} alerts detected
→ Details available in your full report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👉 VIEW MY COMPLETE RESULT
[BUTTON: Access my result → {{resultUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 SPRING OFFER: 33% off the Premium report
Full report + 1 month of AI coaching
€19.90 instead of €29.90

[BUTTON: Unlock my report]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Talk soon,
The CoupleCheck Team

P.S. Have questions? Just reply to this email.
```

---

## 3. Séquence Relance (Non-acheteurs)

### Email J+2 — Conseil gratuit

**Trigger** : 48h après email welcome, pas d'achat

**Objectif** : Apporter de la valeur + soft CTA

---

#### Version FR

**Objet** : Le conseil #1 des couples qui durent 💡

**Preview** : Un exercice simple que tu peux faire ce soir

**Corps** :

```html
Salut {{firstName}},

Il y a 48h, tu as découvert ton score CoupleCheck : {{globalScore}}/100.

Aujourd'hui, je voulais te partager un conseil qui fait vraiment la différence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 LE CONSEIL DU JOUR

Les couples épanouis pratiquent ce qu'on appelle le "check-in quotidien".

C'est simple : chaque soir, posez-vous ces 3 questions :

1. "Comment tu te sens aujourd'hui ?" (vraiment, pas juste "ça va")
2. "Il y a quelque chose dont tu voudrais qu'on parle ?"
3. "Comment je peux t'aider demain ?"

⏱️ Durée : 5 minutes
📈 Impact : Réduction de 40% des malentendus selon les études

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce conseil fait partie des 5 recommandations personnalisées 
de ton rapport complet CoupleCheck.

[BOUTON : Découvrir mes 5 recommandations → {{resultUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À demain pour un autre conseil,
L'équipe CoupleCheck
```

---

### Email J+5 — Offre spéciale

**Trigger** : 5 jours après welcome, pas d'achat

**Objectif** : Créer urgence + offre limitée

---

#### Version FR

**Objet** : ⏰ -20% sur ton rapport (48h seulement)

**Preview** : Une offre qu'on ne fait pas souvent...

**Corps** :

```html
Salut {{firstName}},

On ne fait pas ça souvent, mais voilà :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 OFFRE EXCLUSIVE 48H

-20% sur ton rapport CoupleCheck complet

• Rapport Standard : 10,32€ au lieu de 12,90€
• Rapport Premium : 15,92€ au lieu de 19,90€
  (inclut 1 mois de coaching IA personnalisé)

Code promo : COUPLE20
⏰ Expire le {{promoExpiry}}

[BOUTON : Utiliser mon code -20% → {{checkoutUrl}}?promo=COUPLE20]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 RAPPEL DE TON SCORE

Score global : {{globalScore}}/100
Zones à risque identifiées : {{risksCount}}

Tu mérites de comprendre ce qui se passe vraiment 
dans ta relation — et surtout, comment l'améliorer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À très vite,
L'équipe CoupleCheck

P.S. Cette offre expire automatiquement dans 48h. 
Après ça, retour au prix normal.
```

---

### Email J+7 — Dernier rappel

**Trigger** : 7 jours après welcome, pas d'achat

**Objectif** : Dernière chance + FOMO

---

#### Version FR

**Objet** : {{firstName}}, dernière chance pour ton rapport

**Preview** : Après ça, je ne t'embête plus

**Corps** :

```html
{{firstName}},

C'est mon dernier email à ce sujet.

Ton score CoupleCheck ({{globalScore}}/100) et tes {{risksCount}} zones à risque 
attendent toujours d'être analysés en détail.

Je ne vais pas te harceler. Mais je voulais te dire une chose :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Les couples qui prennent le temps de comprendre leur relation
ont 3x plus de chances de la faire durer.

Ce n'est pas moi qui le dis, c'est la recherche.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si tu veux ton rapport complet, il est toujours là :

[BOUTON : Accéder à mon rapport — 12,90€ → {{checkoutUrl}}]

Sinon, je te souhaite tout le meilleur pour ta relation.

À bientôt peut-être,
L'équipe CoupleCheck
```

---

### Email J+14 — Contenu valeur (pas de vente)

**Trigger** : 14 jours après welcome, pas d'achat

**Objectif** : Rester top-of-mind, pas de CTA commercial

---

#### Version FR

**Objet** : 3 signes qu'un couple va durer (selon la science)

**Preview** : Le #2 va te surprendre

**Corps** :

```html
Salut {{firstName}},

Pas de promo aujourd'hui. Juste un article qui pourrait t'intéresser.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 3 SIGNES QU'UN COUPLE VA DURER
(selon 40 ans de recherche du Dr. John Gottman)

1️⃣ Le ratio 5:1
Pour chaque interaction négative, les couples heureux 
ont 5 interactions positives. Pas besoin d'être parfait, 
juste de compenser.

2️⃣ La réponse aux "bids"
Quand ton/ta partenaire te montre quelque chose 
("regarde ce chat mignon !"), tu réponds avec intérêt 
ou tu ignores ? Les couples qui durent répondent 86% du temps.

3️⃣ Les conflits "réparables"
Ce n'est pas l'absence de disputes qui compte, 
c'est la capacité à réparer après. Un simple 
"désolé, j'ai été nul(le)" change tout.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lequel de ces 3 points est ton point fort ? 
(Réponds à cet email si tu veux, je lis tout.)

À bientôt,
L'équipe CoupleCheck
```

---

## 4. Email Post-achat Standard

**Trigger** : Achat Standard complété (webhook Stripe)

**Objectif** : Livrer le rapport + satisfaction

---

### Version FR

**Objet** : 📊 Ton rapport CoupleCheck est prêt

**Preview** : 15 pages d'analyse personnalisée t'attendent

**Corps** :

```html
Félicitations {{firstName}} ! 🎉

Ton rapport CoupleCheck complet est prêt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TON RAPPORT (15 pages)

Ce que tu vas découvrir :
✓ Analyse détaillée de tes 6 dimensions relationnelles
✓ Tes 3 points forts à cultiver
✓ Tes 3 zones à risque (et comment les améliorer)
✓ Ton plan d'action personnalisé en 5 étapes
✓ Ressources recommandées (livres, exercices)

[BOUTON : Télécharger mon rapport PDF → {{pdfUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CONSEIL : Prends 15 minutes au calme pour lire ton rapport.
Certaines révélations méritent d'être digérées tranquillement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Une question sur ton rapport ? Réponds à cet email.

Merci de ta confiance,
L'équipe CoupleCheck

P.S. Tu veux aller plus loin ? Passe au Premium pour accéder 
à ton coach IA personnel (disponible 24/7).
[Lien : Découvrir le coaching IA → {{upgradeUrl}}]
```

---

## 5. Email Post-achat Premium

**Trigger** : Achat Premium complété (webhook Stripe)

**Objectif** : Livrer rapport + onboarding Agent IA

---

### Version FR

**Objet** : 📊 Ton rapport + accès Coach IA sont prêts

**Preview** : Bienvenue dans l'expérience Premium CoupleCheck

**Corps** :

```html
Félicitations {{firstName}} ! 🎉

Tu as choisi l'expérience Premium. Excellent choix.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TON RAPPORT COMPLET (15 pages)

[BOUTON : Télécharger mon rapport PDF → {{pdfUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 TON COACH IA PERSONNEL

Tu as maintenant accès à ton coach relationnel IA 
pendant 1 mois. Il connaît déjà :

• Ton score global : {{globalScore}}/100
• Tes zones à risque identifiées
• Tes réponses au quiz

Tu peux lui poser toutes tes questions, 24h/24.

[BOUTON : Accéder à mon Coach IA → {{agentAccessUrl}}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 CRÉATION DE TON COMPTE

Pour accéder à ton Coach IA, crée ton compte en cliquant ici :
{{magicLinkUrl}}

(Ce lien expire dans 24h)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 COMMENT BIEN DÉMARRER

1. Lis ton rapport (15 min)
2. Identifie ta priorité #1
3. Demande à ton Coach IA : "Comment améliorer [ta priorité] ?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Merci de ta confiance,
L'équipe CoupleCheck

P.S. Ton accès Coach IA expire dans 30 jours. 
Tu pourras le prolonger à 4,99€/mois si tu le souhaites.
```

---

## 6. Configuration SendGrid

### 6.1 Templates dynamiques à créer

| Template | ID variable | Variables dynamiques |
|----------|-------------|---------------------|
| Result FR | `SENDGRID_TEMPLATE_RESULT_FR` | firstName, resultUrl, globalScore, scoreLabel, strengths[], risksCount |
| Result EN | `SENDGRID_TEMPLATE_RESULT_EN` | firstName, resultUrl, globalScore, scoreLabel, strengths[], risksCount |
| Report Standard FR | `SENDGRID_TEMPLATE_REPORT_STD_FR` | firstName, pdfUrl, upgradeUrl |
| Report Premium FR | `SENDGRID_TEMPLATE_REPORT_PREM_FR` | firstName, pdfUrl, agentAccessUrl, magicLinkUrl, globalScore |
| Relance J+2 FR | `SENDGRID_TEMPLATE_RELANCE_J2_FR` | firstName, globalScore, resultUrl |
| Relance J+5 FR | `SENDGRID_TEMPLATE_RELANCE_J5_FR` | firstName, globalScore, risksCount, checkoutUrl, promoExpiry |
| Relance J+7 FR | `SENDGRID_TEMPLATE_RELANCE_J7_FR` | firstName, globalScore, risksCount, checkoutUrl |
| Relance J+14 FR | `SENDGRID_TEMPLATE_RELANCE_J14_FR` | firstName |

### 6.2 Intégration n8n pour séquences

Tu utilises déjà n8n + SendGrid, donc voici l'architecture recommandée :

```
┌─────────────────────────────────────────────────────────────────┐
│  WORKFLOW N8N : Séquence Relance CoupleCheck                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Webhook] ← API CoupleCheck POST /api/n8n/start-sequence       │
│      │       Payload: { leadId, email, firstName, globalScore,  │
│      │                  risksCount, resultUrl, locale }         │
│      │                                                          │
│      ▼                                                          │
│  [Wait 48h]                                                     │
│      │                                                          │
│      ▼                                                          │
│  [HTTP Request] → GET {{apiUrl}}/api/leads/{{leadId}}/status    │
│      │                                                          │
│      ├── Si converted=true → [Stop]                             │
│      ├── Si unsubscribed=true → [Stop]                          │
│      │                                                          │
│      └── Si non converti →                                      │
│          [SendGrid Node]                                        │
│          │  Template: RELANCE_J2                                │
│          │  To: {{email}}                                       │
│          │  Dynamic data: firstName, globalScore, resultUrl     │
│          │                                                      │
│          ▼                                                      │
│      [Wait 72h]                                                 │
│          │                                                      │
│          ▼                                                      │
│      [HTTP Request] → Check status                              │
│          │                                                      │
│          └── Si non converti →                                  │
│              [Set Node] → Calculer promoExpiry (+48h)           │
│              │                                                  │
│              ▼                                                  │
│              [SendGrid Node]                                    │
│              │  Template: RELANCE_J5 (promo -20%)               │
│              │                                                  │
│              ▼                                                  │
│          [Wait 48h]                                             │
│              │                                                  │
│              ▼                                                  │
│          [HTTP Request] → Check status                          │
│              │                                                  │
│              └── Si non converti →                              │
│                  [SendGrid Node]                                │
│                  │  Template: RELANCE_J7 (last chance)          │
│                  │                                              │
│                  ▼                                              │
│              [Wait 7 days]                                      │
│                  │                                              │
│                  ▼                                              │
│              [SendGrid Node]                                    │
│                  Template: RELANCE_J14 (valeur, no sell)        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 API endpoint pour déclencher la séquence

```typescript
// app/api/n8n/start-sequence/route.ts

export async function POST(req: Request) {
  const { leadId, email, firstName, globalScore, risksCount, resultUrl, locale } = await req.json();
  
  // Appeler le webhook n8n
  await fetch(process.env.N8N_WEBHOOK_SEQUENCE_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadId,
      email,
      firstName,
      globalScore,
      risksCount,
      resultUrl,
      checkoutUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/result/${leadId}#pricing`,
      locale,
      apiUrl: process.env.NEXT_PUBLIC_APP_URL,
    }),
  });
  
  return Response.json({ success: true });
}
```

### 6.4 Tracking avec custom_args SendGrid

```typescript
// lib/sendgrid.ts

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(params: {
  to: string;
  templateId: string;
  dynamicData: Record<string, any>;
  customArgs: {
    sessionId?: string;
    leadId: string;
    emailType: string;
    locale: string;
  };
}) {
  await sgMail.send({
    to: params.to,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: 'CoupleCheck',
    },
    templateId: params.templateId,
    dynamicTemplateData: params.dynamicData,
    customArgs: params.customArgs,
    trackingSettings: {
      clickTracking: { enable: true },
      openTracking: { enable: true },
    },
  });
}
```

### 6.5 Webhook SendGrid pour tracking

```typescript
// app/api/sendgrid/webhook/route.ts

export async function POST(req: Request) {
  const events = await req.json();
  
  for (const event of events) {
    const { email, event: eventType, sg_message_id, leadId, emailType } = event;
    
    switch (eventType) {
      case 'delivered':
        await supabase.from('email_events').insert({
          lead_id: leadId,
          email_type: emailType,
          event: 'delivered',
          timestamp: new Date(),
        });
        break;
        
      case 'open':
        await supabase.from('leads').update({
          last_email_opened_at: new Date(),
        }).eq('id', leadId);
        
        // Track dans PostHog
        posthog.capture({
          distinctId: email,
          event: 'email_opened',
          properties: { emailType, leadId },
        });
        break;
        
      case 'click':
        posthog.capture({
          distinctId: email,
          event: 'email_clicked',
          properties: { emailType, leadId, url: event.url },
        });
        break;
        
      case 'unsubscribe':
        await supabase.from('leads').update({
          unsubscribed: true,
        }).eq('id', leadId);
        break;
        
      case 'bounce':
        await supabase.from('leads').update({
          email_invalid: true,
        }).eq('email', email);
        break;
    }
  }
  
  return Response.json({ received: true });
}
```

---

## 7. Gestion des codes promo

### 7.1 Création dans Stripe

```typescript
// Script one-time ou via Stripe Dashboard

// Promo -20% pour séquence J+5
const coupon = await stripe.coupons.create({
  percent_off: 20,
  duration: 'once',
  id: 'COUPLE20',
  max_redemptions: 1000,
  redeem_by: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60, // 90 jours
});

// Promo Printemps -33% (affichée sur le site)
// → Pas besoin de coupon, c'est le prix affiché par défaut
// Le "29,90€ barré" est juste du marketing, le vrai prix est 19,90€
```

### 7.2 Application du code dans Checkout

```typescript
// app/api/stripe/checkout/route.ts

export async function POST(req: Request) {
  const { sessionId, leadId, offerType, promoCode, locale } = await req.json();
  
  const lineItems = [{
    price: offerType === 'premium' 
      ? process.env.STRIPE_PRICE_PREMIUM 
      : process.env.STRIPE_PRICE_STANDARD,
    quantity: 1,
  }];
  
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/result/${sessionId}`,
    metadata: {
      sessionId,
      leadId,
      offerType,
    },
    allow_promotion_codes: true, // Permet d'entrer un code promo
  };
  
  // Si code promo passé en param, l'appliquer automatiquement
  if (promoCode) {
    sessionParams.discounts = [{ coupon: promoCode }];
  }
  
  const checkoutSession = await stripe.checkout.sessions.create(sessionParams);
  
  return Response.json({ checkoutUrl: checkoutSession.url });
}
```

---

## 8. Métriques email à suivre

| Métrique | Cible | Alerte si |
|----------|-------|-----------|
| Taux d'ouverture Welcome | > 50% | < 30% |
| Taux de clic Welcome | > 15% | < 8% |
| Taux d'ouverture J+2 | > 40% | < 25% |
| Taux de clic J+5 (promo) | > 10% | < 5% |
| Taux conversion via email | > 3% | < 1% |
| Taux de désinscription | < 1% | > 2% |
| Taux de bounce | < 2% | > 5% |

### Dashboard PostHog recommandé

```
Funnel Email → Conversion :
1. email_captured
2. email_opened (Welcome)
3. email_clicked (Welcome)
4. checkout_initiated
5. purchase_completed

Breakdown par :
- emailType (welcome, j2, j5, j7)
- locale (fr, en)
- offerType (standard, premium)
```