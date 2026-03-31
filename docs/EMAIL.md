# EMAIL_SEQUENCES.md — CoupleCheck
> Version mise à jour — Mars 2026
> Ton : fondateur direct (Matthieu), voix personnelle, quasi-texte
> Pricing acté : Standard 9,90€ · Premium 14,90€ · Abonnement 7,99€/mois

---

## 1. Vue d'ensemble

| Séquence | Trigger | Objectif |
|----------|---------|----------|
| Welcome (J+0) | Email capturé après quiz | Délivrer résultat + premier CTA |
| Relance J+2 | 48h après welcome, pas d'achat | Valeur pure, soft CTA |
| Relance J+5 | 5j après welcome, pas d'achat | Offre -20% limitée 48h |
| Relance J+7 | 7j après welcome, pas d'achat | Dernier rappel, sobre |
| Relance J+14 | 14j après welcome, pas d'achat | Réengagement, zéro vente |
| Post-achat Standard | Achat Standard complété | Livrer PDF |
| Post-achat Premium | Achat Premium complété | Livrer PDF + onboarding plateforme |
| Trial ending (J+25) | 25j après achat Premium | Conversion trial → abonnement |
| Trial expired (J+30) | 30j après achat Premium, pas d'abonnement | Dernière chance + offre |
| Checkup mensuel | 1er du mois via n8n | Déclencher le checkup |
| Paiement échoué | webhook Stripe invoice.payment_failed | Relance paiement |
| Abonnement confirmé | webhook Stripe subscription.created | Confirmation + bienvenue |
| Abonnement annulé | webhook Stripe subscription.deleted | Sauvegarde churn |

**Provider** : SendGrid (templates dynamiques HTML) + n8n (séquences temporisées)
**Sender** : `matthieu@couplecheck.app` — nom affiché : `Matthieu de CoupleCheck`
**Tone** : Voix fondateur, personnel, sans emojis dans le corps, sans séparateurs ━━━

---

## 2. Séquence Relance — Non-acheteurs

### 2.1 Email Welcome (J+0 immédiat)

**Trigger** : Lead créé (email capturé après quiz)
**Fichier HTML** : `j0-welcome-fr.html` / `j0-welcome-en.html`
**Variables SendGrid** : `SENDGRID_TEMPLATE_RESULT_FR` / `SENDGRID_TEMPLATE_RESULT_EN`

---

#### Version FR

**Objet** : `Matthieu de CoupleCheck — ton résultat est là`
**Preview** : `Score {{globalScore}}/100 · ce que ça veut vraiment dire`
**Variables dynamiques** : `firstName`, `globalScore`, `resultUrl`

```
Salut {{firstName}},

Je suis Matthieu, le créateur de CoupleCheck.

Je voulais que ce premier email vienne de moi directement — pas d'un robot.

Tu viens de passer 5 minutes à répondre à des questions que peu de couples
prennent vraiment le temps de se poser. C'est déjà quelque chose.

Ton score global : {{globalScore}}/100.

Ce chiffre, à lui seul, ne dit pas grand-chose. Ce qui compte, c'est ce qui
est derrière — tes points forts, et les zones qui méritent ton attention.

→ Accède à ton résultat complet ici : {{resultUrl}}

À tout de suite,
Matthieu

—
CoupleCheck · Tu peux répondre à cet email si tu as une question.
```

---

#### Version EN

**Subject** : `Matthieu from CoupleCheck — your result is here`
**Preview** : `Score {{globalScore}}/100 · what it actually means`
**Dynamic variables** : `firstName`, `globalScore`, `resultUrl`

```
Hey {{firstName}},

I'm Matthieu, the person who built CoupleCheck.

I wanted this first email to come from me — not from an automated system.

You just spent 5 minutes answering questions most couples never actually
sit down to think about. That already matters.

Your overall score: {{globalScore}}/100.

That number alone doesn't tell the full story. What matters is what's
behind it — your strengths, and the areas worth paying attention to.

→ See your full result here: {{resultUrl}}

Talk soon,
Matthieu

—
CoupleCheck · Feel free to reply if you have a question.
```

---

### 2.2 Email J+2 — Valeur pure

**Trigger** : 48h après welcome, pas d'achat
**Fichier HTML** : `j2-valeur-fr.html` / `j2-valeur-en.html`
**Variables SendGrid** : `SENDGRID_TEMPLATE_RELANCE_J2_FR` / `SENDGRID_TEMPLATE_RELANCE_J2_EN`

---

#### Version FR

**Objet** : `quelque chose que j'ai appris sur les couples qui durent`
**Preview** : `5 minutes par soir, et ça change tout`
**Variables dynamiques** : `firstName`, `globalScore`, `resultUrl`

```
Salut {{firstName}},

Ça fait deux jours que tu as fait le test. Je voulais te partager quelque
chose qui m'a frappé en construisant CoupleCheck.

En lisant des dizaines d'études sur ce qui différencie les couples épanouis
des autres, une habitude revenait systématiquement.

Pas des grands gestes. Pas des thérapies de couple.

Juste ça : chaque soir, 5 minutes. Trois questions.

"Comment tu t'es senti·e aujourd'hui ?"
"Est-ce qu'il y a quelque chose dont tu aimerais qu'on parle ?"
"Comment je peux t'aider demain ?"

C'est ce que les chercheurs appellent le "check-in". Les couples qui le
pratiquent règlent les petites tensions avant qu'elles deviennent de vrais
problèmes.

Ton rapport personnalisé va plus loin — il identifie précisément les
dimensions de ta relation qui méritent ce type d'attention.

→ Voir mon rapport : {{resultUrl}}

Matthieu
```

---

#### Version EN

**Subject** : `something I learned about couples who last`
**Preview** : `5 minutes a night, and it changes things`
**Dynamic variables** : `firstName`, `globalScore`, `resultUrl`

```
Hey {{firstName}},

It's been two days since you took the quiz. I wanted to share something
that stayed with me while building CoupleCheck.

Reading through dozens of studies on what actually separates happy couples
from struggling ones, one habit kept coming up.

Not grand gestures. Not couples therapy.

Just this: every evening, 5 minutes. Three questions.

"How did you feel today?"
"Is there anything you'd like us to talk about?"
"How can I support you tomorrow?"

Researchers call it a "check-in." Couples who do it consistently tend to
resolve small tensions before they become real problems.

Your personalized report goes further — it identifies exactly which parts
of your relationship could use this kind of attention.

→ See my report: {{resultUrl}}

Matthieu
```

---

### 2.3 Email J+5 — Offre honnête

**Trigger** : 5j après welcome, pas d'achat
**Fichier HTML** : `j5-offre-fr.html` / `j5-offre-en.html`
**Variables SendGrid** : `SENDGRID_TEMPLATE_RELANCE_J5_FR` / `SENDGRID_TEMPLATE_RELANCE_J5_EN`

---

#### Version FR

**Objet** : `une remise pour toi, {{firstName}} — 48h`
**Preview** : `je ne fais pas ça souvent`
**Variables dynamiques** : `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry`

```
{{firstName}},

Je vais être direct : si tu n'as pas encore accédé à ton rapport, c'est
peut-être une question de prix.

Alors voilà — pendant 48h, j'applique une remise de 20% sur les deux offres.

—

Rapport Standard : 7,92€ au lieu de 9,90€
→ Ton analyse complète sur 7 dimensions + plan d'action personnalisé, en PDF.

Rapport Premium : 11,92€ au lieu de 14,90€
→ Le même rapport — mais il devient le point de départ de quelque chose de plus.

Avec le Premium, tu accèdes en avant-première à la plateforme CoupleCheck —
un espace où un agent IA connaît déjà ton profil, tes scores, ce que tu as
décrit dans le quiz. Pas un chatbot générique : quelque chose qui part de là
où tu en es vraiment, et qui est là dans la durée.

—

Code : COUPLE20
Expire le {{promoExpiry}}.

→ Choisir mon offre : {{checkoutUrl}}

Ton score était {{globalScore}}/100. Tu as {{risksCount}} zones identifiées
comme sensibles dans ta relation. Le rapport t'explique exactement quoi en faire.

Matthieu

P.S. Si le prix reste un frein, réponds à cet email. On trouvera quelque chose.
```

---

#### Version EN

**Subject** : `a discount for you, {{firstName}} — 48h`
**Preview** : `I don't do this often`
**Dynamic variables** : `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry`

```
{{firstName}},

I'll be straightforward: if you haven't unlocked your report yet, it might
just be a price thing.

So here it is — for 48 hours, I'm applying a 20% discount on both options.

—

Standard Report: €7.92 instead of €9.90
→ Your full analysis across 7 dimensions + a personalized action plan, as a PDF.

Premium Report: €11.92 instead of €14.90
→ The same report — but it becomes the starting point for something more.

With Premium, you get early access to the CoupleCheck platform — a space
where an AI agent already knows your profile, your scores, what you described
in the quiz. Not a generic chatbot: something that starts from where you
actually are, and stays with you over time.

—

Code: COUPLE20
Expires: {{promoExpiry}}.

→ Choose my offer: {{checkoutUrl}}

Your score was {{globalScore}}/100. You have {{risksCount}} areas flagged as
sensitive in your relationship. The report tells you exactly what to do with that.

Matthieu

P.S. If price is still a barrier, reply to this email. We'll figure something out.
```

---

### 2.4 Email J+7 — Dernier rappel sobre

**Trigger** : 7j après welcome, pas d'achat
**Fichier HTML** : `j7-rappel-fr.html` / `j7-rappel-en.html`
**Variables SendGrid** : `SENDGRID_TEMPLATE_RELANCE_J7_FR` / `SENDGRID_TEMPLATE_RELANCE_J7_EN`

---

#### Version FR

**Objet** : `{{firstName}}, dernier email là-dessus`
**Preview** : `je ne veux pas t'embêter`
**Variables dynamiques** : `firstName`, `globalScore`, `risksCount`, `checkoutUrl`

```
{{firstName}},

C'est mon dernier email sur ton rapport. Promis.

Je sais que tu reçois probablement beaucoup d'emails. Et je sais que les
rappels répétés, c'est fatiguant.

Donc juste ça : si un jour tu veux comprendre ce que ton score de
{{globalScore}}/100 dit vraiment de ta relation — et ce que tu peux en
faire concrètement — c'est là quand tu veux.

→ {{checkoutUrl}}

Sinon, je te souhaite sincèrement le meilleur pour ta relation.

Matthieu
```

---

#### Version EN

**Subject** : `{{firstName}}, last email on this`
**Preview** : `I don't want to be annoying about it`
**Dynamic variables** : `firstName`, `globalScore`, `risksCount`, `checkoutUrl`

```
{{firstName}},

This is my last email about your report. Promise.

I know you probably get a lot of emails. And I know repeated reminders
get old fast.

So just this: if you ever want to understand what your score of
{{globalScore}}/100 actually says about your relationship — and what to
do with it — it's there whenever you're ready.

→ {{checkoutUrl}}

Either way, I genuinely hope things are going well.

Matthieu
```

---

### 2.5 Email J+14 — Réengagement, zéro vente

**Trigger** : 14j après welcome, pas d'achat
**Fichier HTML** : `j14-reengagement-fr.html` / `j14-reengagement-en.html`
**Variables SendGrid** : `SENDGRID_TEMPLATE_RELANCE_J14_FR` / `SENDGRID_TEMPLATE_RELANCE_J14_EN`

---

#### Version FR

**Objet** : `ce que les réponses de 1 000 personnes m'ont appris`
**Preview** : `une chose que je ne m'attendais pas à voir`
**Variables dynamiques** : `firstName`

```
{{firstName}},

Je ne t'écris pas pour te parler du rapport.

Depuis le lancement de CoupleCheck, j'ai lu les réponses à la dernière
question du quiz — "Si tu pouvais changer UNE chose dans ta relation,
ce serait quoi ?" — et une chose m'a frappé.

La plupart des gens n'écrivent pas "moins de disputes" ou "plus de passion".

Ils écrivent des choses comme : "que mon partenaire comprenne vraiment ce
que je ressens" ou "qu'on arrête de se parler comme si on était devenus
étrangers".

Pas des crises. Des silences. Des petits décalages qui s'accumulent sans
qu'on sache vraiment quand ça a commencé.

C'est pour ça que je construis la suite de CoupleCheck — un espace pour
travailler ça dans la durée, avec un agent IA qui connaît ton profil et
t'accompagne mois après mois. Ce n'est pas encore ouvert à tout le monde,
mais ça arrive.

Si tu veux être parmi les premiers à y accéder, réponds à cet email avec
juste un mot. Je te tiens au courant en priorité.

Matthieu

—
CoupleCheck
```

---

#### Version EN

**Subject** : `what 1,000 people's answers taught me`
**Preview** : `something I didn't expect to see`
**Dynamic variables** : `firstName`

```
{{firstName}},

I'm not writing about the report today.

Since CoupleCheck launched, I've been reading the answers to the last quiz
question — "If you could change ONE thing about your relationship, what
would it be?" — and something surprised me.

Most people don't write "fewer arguments" or "more passion."

They write things like: "that my partner actually understood how I feel"
or "that we stopped talking like we'd become strangers somehow."

Not crises. Silences. Small drifts that build up without anyone knowing
exactly when it started.

That's why I'm building what comes next — a space to work on this over
time, with an AI agent that knows your profile and stays with you month
after month. It's not open to everyone yet, but it's coming.

If you want to be among the first to access it, just reply to this email
with a word. I'll reach out to you directly.

Matthieu

—
CoupleCheck
```

---

## 3. Emails Post-achat

### 3.1 Post-achat Standard

**Trigger** : Webhook Stripe `checkout.session.completed` + `offerType = standard`
**Variables SendGrid** : `SENDGRID_TEMPLATE_REPORT_STD_FR` / `SENDGRID_TEMPLATE_REPORT_STD_EN`

---

#### Version FR

**Objet** : `ton rapport est là, {{firstName}}`
**Preview** : `Prends 15 minutes au calme pour le lire`
**Variables dynamiques** : `firstName`, `pdfUrl`, `upgradeUrl`

```
{{firstName}},

Ton rapport CoupleCheck est prêt.

→ Télécharger mon rapport : {{pdfUrl}}

—

Ce que tu vas trouver dedans : ton analyse sur 7 dimensions, tes points
forts, les zones qui méritent ton attention, et un plan d'action concret.

Prends 15 minutes au calme pour le lire. Certaines choses méritent d'être
digérées tranquillement.

—

Une chose que je n'ai pas encore annoncée publiquement : on prépare la
suite de CoupleCheck — une plateforme où un agent IA part de ton rapport
pour t'accompagner dans la durée. Si ça t'intéresse, réponds à cet email.

Matthieu

P.S. Une question sur ton rapport ? Réponds directement ici, je lis tout.
```

---

#### Version EN

**Subject** : `your report is ready, {{firstName}}`
**Preview** : `Take 15 quiet minutes to read it`
**Dynamic variables** : `firstName`, `pdfUrl`, `upgradeUrl`

```
{{firstName}},

Your CoupleCheck report is ready.

→ Download my report: {{pdfUrl}}

—

What you'll find inside: your analysis across 7 dimensions, your strengths,
the areas worth your attention, and a concrete action plan.

Take 15 quiet minutes to read it. Some things are worth sitting with.

—

Something I haven't announced publicly yet: we're building what comes
next for CoupleCheck — a platform where an AI agent starts from your
report and stays with you over time. If that interests you, reply to
this email.

Matthieu

P.S. Questions about your report? Reply directly here, I read everything.
```

---

### 3.2 Post-achat Premium

**Trigger** : Webhook Stripe `checkout.session.completed` + `offerType = premium`
**Variables SendGrid** : `SENDGRID_TEMPLATE_REPORT_PREM_FR` / `SENDGRID_TEMPLATE_REPORT_PREM_EN`

---

#### Version FR

**Objet** : `ton rapport + ton accès plateforme sont prêts`
**Preview** : `L'agent connaît déjà ton profil`
**Variables dynamiques** : `firstName`, `pdfUrl`, `magicLinkUrl`, `globalScore`, `platformUrl`

```
{{firstName}},

Deux choses t'attendent.

—

Ton rapport complet :
→ Télécharger mon rapport : {{pdfUrl}}

—

Et ton accès à la plateforme CoupleCheck.

C'est ce qui différencie le Premium : ton rapport ne s'arrête pas au PDF.
Il devient le point de départ d'une expérience dans la durée. L'agent IA
connaît déjà ton score ({{globalScore}}/100), tes dimensions, ce que tu as
décrit dans le quiz. Tu n'as pas à tout réexpliquer.

Pour accéder à ta plateforme, crée ton compte ici :
→ {{magicLinkUrl}}

(Ce lien expire dans 24h)

—

Comment bien démarrer :

1. Lis ton rapport — 15 minutes
2. Identifie une chose sur laquelle tu veux travailler
3. Ouvre la plateforme et pose la question à l'agent

Ton accès est valable 1 mois. À l'issue, tu peux continuer à 7,99€/mois
si tu le souhaites — ou t'arrêter là, sans engagement.

Matthieu

P.S. Une question ? Réponds à cet email.
```

---

#### Version EN

**Subject** : `your report + platform access are ready`
**Preview** : `The agent already knows your profile`
**Dynamic variables** : `firstName`, `pdfUrl`, `magicLinkUrl`, `globalScore`, `platformUrl`

```
{{firstName}},

Two things are waiting for you.

—

Your full report:
→ Download my report: {{pdfUrl}}

—

And your access to the CoupleCheck platform.

This is what makes Premium different: your report doesn't stop at the PDF.
It becomes the starting point for something ongoing. The AI agent already
knows your score ({{globalScore}}/100), your dimensions, what you described
in the quiz. You don't have to explain everything from scratch.

To access your platform, create your account here:
→ {{magicLinkUrl}}

(This link expires in 24h)

—

How to get started:

1. Read your report — 15 minutes
2. Identify one thing you want to work on
3. Open the platform and ask the agent about it

Your access is valid for 1 month. After that, you can continue at €7.99/month
if you'd like — or stop there, no commitment.

Matthieu

P.S. Questions? Reply to this email.
```

---

## 4. Emails Plateforme — Trial & Abonnement

### 4.1 Trial ending (J+25 après achat Premium)

**Trigger** : n8n, 25j après `purchase_completed` avec `offerType = premium`, pas d'abonnement actif
**Variables SendGrid** : `SENDGRID_TEMPLATE_TRIAL_ENDING`

#### Version FR

**Objet** : `ton accès plateforme expire dans 5 jours`
**Preview** : `7,99€/mois pour continuer`
**Variables dynamiques** : `firstName`, `subscribeUrl`

```
{{firstName}},

Ton mois d'accès à la plateforme CoupleCheck touche à sa fin dans 5 jours.

Si tu veux continuer — les conversations, les checkups mensuels, l'agent
qui connaît ton historique — c'est 7,99€/mois. Moins cher qu'un café par
semaine.

→ Continuer mon abonnement : {{subscribeUrl}}

Si ce n'est pas le bon moment, pas de souci. Ton rapport reste le tien.

Matthieu
```

---

### 4.2 Trial expired (J+30 après achat Premium)

**Trigger** : n8n, 30j après `purchase_completed` avec `offerType = premium`, pas d'abonnement actif
**Variables SendGrid** : `SENDGRID_TEMPLATE_TRIAL_EXPIRED`

#### Version FR

**Objet** : `ton accès est expiré — offre de réactivation 48h`
**Preview** : `-20% pour revenir`
**Variables dynamiques** : `firstName`, `subscribeUrl`, `promoExpiry`

```
{{firstName}},

Ton mois d'accès à la plateforme est terminé.

Si tu veux reprendre — avec tout ton historique intact, l'agent qui se
souvient de toi — voilà une offre pour les prochaines 48h :

Premier mois à 6,39€ au lieu de 7,99€.
Code : COMEBACK20
Expire le {{promoExpiry}}.

→ Réactiver mon accès : {{subscribeUrl}}

Matthieu
```

---

### 4.3 Abonnement confirmé

**Trigger** : Webhook Stripe `customer.subscription.created`
**Variables SendGrid** : `SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMED`

#### Version FR

**Objet** : `abonnement confirmé — bienvenue`
**Variables dynamiques** : `firstName`, `platformUrl`

```
{{firstName}},

C'est confirmé — ton abonnement CoupleCheck est actif.

→ Accéder à ma plateforme : {{platformUrl}}

Matthieu
```

---

### 4.4 Paiement échoué

**Trigger** : Webhook Stripe `invoice.payment_failed`
**Variables SendGrid** : `SENDGRID_TEMPLATE_PAYMENT_FAILED`

#### Version FR

**Objet** : `un problème avec ton paiement`
**Variables dynamiques** : `firstName`, `updatePaymentUrl`

```
{{firstName}},

Le renouvellement de ton abonnement n'a pas pu être traité.

Pour mettre à jour ton moyen de paiement et continuer à accéder à la
plateforme :

→ Mettre à jour mon paiement : {{updatePaymentUrl}}

Si tu as une question, réponds à cet email.

Matthieu
```

---

### 4.5 Abonnement annulé

**Trigger** : Webhook Stripe `customer.subscription.deleted`
**Variables SendGrid** : `SENDGRID_TEMPLATE_SUBSCRIPTION_CANCELED`

#### Version FR

**Objet** : `ton abonnement est annulé`
**Variables dynamiques** : `firstName`, `resubscribeUrl`

```
{{firstName}},

Ton abonnement CoupleCheck a bien été annulé. Aucun prélèvement à venir.

Ton rapport et ton historique de conversations restent accessibles encore
30 jours.

Si tu changes d'avis, tu peux reprendre quand tu veux :
→ {{resubscribeUrl}}

Je te souhaite le meilleur.

Matthieu
```

---

### 4.6 Checkup mensuel

**Trigger** : n8n, cron le 1er du mois pour tous les abonnés actifs
**Variables SendGrid** : `SENDGRID_TEMPLATE_MONTHLY_CHECKUP`

#### Version FR

**Objet** : `{{firstName}}, comment va ton couple ce mois-ci ?`
**Preview** : `2 minutes — 5 questions`
**Variables dynamiques** : `firstName`, `checkupUrl`

```
{{firstName}},

C'est le moment du checkup mensuel.

5 questions, 2 minutes. Pour garder une trace de comment évolue ta relation
— et donner à l'agent un contexte à jour.

→ Faire mon checkup : {{checkupUrl}}

Matthieu
```

---

## 5. Configuration SendGrid

### 5.1 Templates à créer

| Template | Variable env | Locale | Variables dynamiques |
|----------|-------------|--------|---------------------|
| Welcome résultat | `SENDGRID_TEMPLATE_RESULT_FR` | 🇫🇷 FR | `firstName`, `globalScore`, `resultUrl` |
| Welcome résultat | `SENDGRID_TEMPLATE_RESULT_EN` | 🇬🇧 EN | `firstName`, `globalScore`, `resultUrl` |
| Relance J+2 | `SENDGRID_TEMPLATE_RELANCE_J2_FR` | 🇫🇷 FR | `firstName`, `globalScore`, `resultUrl` |
| Relance J+2 | `SENDGRID_TEMPLATE_RELANCE_J2_EN` | 🇬🇧 EN | `firstName`, `globalScore`, `resultUrl` |
| Relance J+5 | `SENDGRID_TEMPLATE_RELANCE_J5_FR` | 🇫🇷 FR | `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry` |
| Relance J+5 | `SENDGRID_TEMPLATE_RELANCE_J5_EN` | 🇬🇧 EN | `firstName`, `globalScore`, `risksCount`, `checkoutUrl`, `promoExpiry` |
| Relance J+7 | `SENDGRID_TEMPLATE_RELANCE_J7_FR` | 🇫🇷 FR | `firstName`, `globalScore`, `risksCount`, `checkoutUrl` |
| Relance J+7 | `SENDGRID_TEMPLATE_RELANCE_J7_EN` | 🇬🇧 EN | `firstName`, `globalScore`, `risksCount`, `checkoutUrl` |
| Relance J+14 | `SENDGRID_TEMPLATE_RELANCE_J14_FR` | 🇫🇷 FR | `firstName` |
| Relance J+14 | `SENDGRID_TEMPLATE_RELANCE_J14_EN` | 🇬🇧 EN | `firstName` |
| Post-achat Standard | `SENDGRID_TEMPLATE_REPORT_STD_FR` | 🇫🇷 FR | `firstName`, `pdfUrl`, `upgradeUrl` |
| Post-achat Standard | `SENDGRID_TEMPLATE_REPORT_STD_EN` | 🇬🇧 EN | `firstName`, `pdfUrl`, `upgradeUrl` |
| Post-achat Premium | `SENDGRID_TEMPLATE_REPORT_PREM_FR` | 🇫🇷 FR | `firstName`, `pdfUrl`, `magicLinkUrl`, `globalScore`, `platformUrl` |
| Post-achat Premium | `SENDGRID_TEMPLATE_REPORT_PREM_EN` | 🇬🇧 EN | `firstName`, `pdfUrl`, `magicLinkUrl`, `globalScore`, `platformUrl` |
| Trial ending | `SENDGRID_TEMPLATE_TRIAL_ENDING` | FR | `firstName`, `subscribeUrl` |
| Trial expired | `SENDGRID_TEMPLATE_TRIAL_EXPIRED` | FR | `firstName`, `subscribeUrl`, `promoExpiry` |
| Abonnement confirmé | `SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMED` | FR | `firstName`, `platformUrl` |
| Paiement échoué | `SENDGRID_TEMPLATE_PAYMENT_FAILED` | FR | `firstName`, `updatePaymentUrl` |
| Abonnement annulé | `SENDGRID_TEMPLATE_SUBSCRIPTION_CANCELED` | FR | `firstName`, `resubscribeUrl` |
| Checkup mensuel | `SENDGRID_TEMPLATE_MONTHLY_CHECKUP` | FR | `firstName`, `checkupUrl` |

> **Note unsubscribe** : Tous les templates intègrent le module SendGrid natif `data-role="module-unsubscribe"` avec `{{{unsubscribe}}}` et `{{{unsubscribe_preferences}}}` (triple moustache, non-échappé).

---

### 5.2 Sender

```
From email : matthieu@couplecheck.app
From name  : Matthieu de CoupleCheck   (FR)
           : Matthieu from CoupleCheck  (EN)
Reply-to   : matthieu@couplecheck.app
```

---

### 5.3 Workflow n8n — Séquence relance

```
[Webhook] ← POST /api/n8n/start-sequence
    │  Payload: { leadId, email, firstName, globalScore,
    │             risksCount, resultUrl, locale }
    │
    ▼
[Wait 48h]
    │
    ▼
[HTTP GET] /api/leads/{{leadId}}/status
    ├── converted=true  → STOP
    ├── unsubscribed=true → STOP
    └── non converti →
        [SendGrid] Template RELANCE_J2 (firstName, globalScore, resultUrl)
        │
        ▼
    [Wait 72h]
        │
        ▼
    [HTTP GET] check status
        └── non converti →
            [Set] promoExpiry = now + 48h
            [SendGrid] Template RELANCE_J5 (+ risksCount, checkoutUrl, promoExpiry)
            │
            ▼
        [Wait 48h]
            │
            ▼
        [HTTP GET] check status
            └── non converti →
                [SendGrid] Template RELANCE_J7 (+ risksCount, checkoutUrl)
                │
                ▼
            [Wait 7 days]
                │
                ▼
            [HTTP GET] check status
                └── non converti →
                    [SendGrid] Template RELANCE_J14 (firstName only)
```

---

### 5.4 API endpoint déclenchement séquence

```typescript
// app/api/n8n/start-sequence/route.ts

export async function POST(req: Request) {
  const { leadId, email, firstName, globalScore, risksCount, resultUrl, locale } = await req.json();

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

---

### 5.5 sendEmail helper

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
      email: process.env.SENDGRID_FROM_EMAIL!,         // matthieu@couplecheck.app
      name: params.customArgs.locale === 'fr'
        ? 'Matthieu de CoupleCheck'
        : 'Matthieu from CoupleCheck',
    },
    replyTo: process.env.SENDGRID_FROM_EMAIL!,
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

---

### 5.6 Webhook SendGrid tracking

```typescript
// app/api/sendgrid/webhook/route.ts

export async function POST(req: Request) {
  const events = await req.json();

  for (const event of events) {
    const { email, event: eventType, leadId, emailType } = event;

    switch (eventType) {
      case 'delivered':
        await supabase.from('email_events').insert({
          lead_id: leadId, email_type: emailType,
          event: 'delivered', timestamp: new Date(),
        });
        break;
      case 'open':
        await supabase.from('leads')
          .update({ last_email_opened_at: new Date() })
          .eq('id', leadId);
        posthog.capture({ distinctId: email, event: 'email_opened',
          properties: { emailType, leadId } });
        break;
      case 'click':
        posthog.capture({ distinctId: email, event: 'email_clicked',
          properties: { emailType, leadId, url: event.url } });
        break;
      case 'unsubscribe':
        await supabase.from('leads')
          .update({ unsubscribed: true }).eq('id', leadId);
        break;
      case 'bounce':
        await supabase.from('leads')
          .update({ email_invalid: true }).eq('email', email);
        break;
    }
  }

  return Response.json({ received: true });
}
```

---

## 6. Gestion des codes promo

### 6.1 Coupon Stripe

```typescript
// Script one-time (ou via Stripe Dashboard)

const coupon = await stripe.coupons.create({
  percent_off: 20,
  duration: 'once',
  id: 'COUPLE20',
  max_redemptions: 1000,
  redeem_by: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60, // 90 jours
});

// Coupon réactivation trial expiré
const comebackCoupon = await stripe.coupons.create({
  percent_off: 20,
  duration: 'once',
  id: 'COMEBACK20',
  max_redemptions: 500,
});
```

### 6.2 Application dans Checkout

```typescript
// app/api/stripe/checkout/route.ts

export async function POST(req: Request) {
  const { sessionId, leadId, offerType, promoCode, locale } = await req.json();

  const lineItems = [{
    price: offerType === 'premium'
      ? process.env.STRIPE_PRICE_PREMIUM       // 14,90€
      : process.env.STRIPE_PRICE_STANDARD,     // 9,90€
    quantity: 1,
  }];

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/result/${sessionId}`,
    metadata: { sessionId, leadId, offerType },
    allow_promotion_codes: true,
  };

  if (promoCode) {
    sessionParams.discounts = [{ coupon: promoCode }];
  }

  const checkoutSession = await stripe.checkout.sessions.create(sessionParams);
  return Response.json({ checkoutUrl: checkoutSession.url });
}
```

---

## 7. Variables d'environnement email

```bash
# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=matthieu@couplecheck.app

# Templates relance
SENDGRID_TEMPLATE_RESULT_FR=d-xxx
SENDGRID_TEMPLATE_RESULT_EN=d-xxx
SENDGRID_TEMPLATE_RELANCE_J2_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J2_EN=d-xxx
SENDGRID_TEMPLATE_RELANCE_J5_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J5_EN=d-xxx
SENDGRID_TEMPLATE_RELANCE_J7_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J7_EN=d-xxx
SENDGRID_TEMPLATE_RELANCE_J14_FR=d-xxx
SENDGRID_TEMPLATE_RELANCE_J14_EN=d-xxx

# Templates post-achat
SENDGRID_TEMPLATE_REPORT_STD_FR=d-xxx
SENDGRID_TEMPLATE_REPORT_STD_EN=d-xxx
SENDGRID_TEMPLATE_REPORT_PREM_FR=d-xxx
SENDGRID_TEMPLATE_REPORT_PREM_EN=d-xxx

# Templates plateforme
SENDGRID_TEMPLATE_TRIAL_ENDING=d-xxx
SENDGRID_TEMPLATE_TRIAL_EXPIRED=d-xxx
SENDGRID_TEMPLATE_SUBSCRIPTION_CONFIRMED=d-xxx
SENDGRID_TEMPLATE_PAYMENT_FAILED=d-xxx
SENDGRID_TEMPLATE_SUBSCRIPTION_CANCELED=d-xxx
SENDGRID_TEMPLATE_MONTHLY_CHECKUP=d-xxx

# n8n
N8N_WEBHOOK_SEQUENCE_URL=https://...
N8N_WEBHOOK_TRIAL_ENDING=https://...
N8N_WEBHOOK_CHECKUP_TRIGGER=https://...
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
| Taux conversion trial → abonnement | > 30% | < 15% |
| Taux de désinscription | < 1% | > 2% |
| Taux de bounce | < 2% | > 5% |

### Funnel PostHog

```
email_captured
→ email_opened (welcome)
→ email_clicked (welcome)
→ checkout_initiated
→ purchase_completed (standard | premium)
→ platform_accessed (premium only)
→ checkup_completed
→ subscription_started
→ subscription_churned
```