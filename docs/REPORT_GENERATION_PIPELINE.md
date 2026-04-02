# Pipeline de génération de rapport — Documentation technique

> Dernière mise à jour : 2026-04-02

## Vue d'ensemble

Après un paiement Stripe confirmé, un pipeline synchrone génère et envoie le rapport PDF par email. Le pipeline s'exécute entièrement dans le webhook Stripe (`app/api/stripe/webhook/route.ts`).

```
Stripe checkout.session.completed
        │
        ▼
[1] Upsert purchase en base (status: completed)
        │
        ▼
[2] Fetch quiz_session (answers, scores, pain_points, change_wish)
        │
        ▼
[3] Fetch lead (email, first_name)
        │
        ▼
[4] Génération LLM via OpenRouter — 3 appels PARALLÈLES
    ├── callOpenRouter(buildInterpretationPrompt)   → texte libre
    ├── callOpenRouter(buildRecommendationsPrompt)  → JSON { recommendations[] }
    └── callOpenRouter(buildActionPlanPrompt)       → JSON { weeks[] }
        │
        ▼
[5] Rendu PDF — @react-pdf/renderer → Buffer
        │
        ▼
[6] Upload PDF → Supabase Storage (bucket: reports) → signed URL 30 jours
        │
        ▼
[7] Update purchase (report_generated: true, report_url)
        │
        ▼
[8] Update lead (converted: true, converted_at)
        │
        ▼
[9] Envoi email — SendGrid (HTML + PDF en pièce jointe)
        │
        ▼
[10] Retour { success: true } HTTP 200
```

---

## Fichiers impliqués

| Fichier | Rôle |
|---|---|
| `app/api/stripe/webhook/route.ts` | Orchestrateur principal — écoute `checkout.session.completed` |
| `lib/report-generator.ts` | Appelle les 3 prompts en parallèle, parse les JSON, applique les fallbacks |
| `lib/openrouter.ts` | Client HTTP vers l'API OpenRouter (OpenAI-compatible) |
| `lib/prompts/interpretation.ts` | Prompt interprétation (texte libre, ~250 mots) + type `QuizContext` |
| `lib/prompts/recommendations.ts` | Prompt recommandations (JSON strict : 5 items) |
| `lib/prompts/action-plan.ts` | Prompt plan d'action (JSON strict : 4 semaines × N actions) |
| `lib/prompts/quiz-context-builder.ts` | Traduit les réponses brutes (Q5-Q19) en narratif lisible pour le LLM |
| `lib/storage.ts` | Upload sur Supabase Storage + création signed URL |
| `lib/sendgrid.ts` | Envoi email post-achat avec PDF en pièce jointe |
| `components/report/ReportPDF.tsx` | Composant React PDF rendu server-side |

---

## Variables d'environnement requises

| Variable | Usage | Valeur par défaut | Critique |
|---|---|---|---|
| `OPENROUTER_API_KEY` | Auth OpenRouter | aucune | ✅ OUI |
| `OPENROUTER_MODEL` | Modèle LLM | `mistralai/mistral-medium` ⚠️ | ✅ OUI |
| `STRIPE_WEBHOOK_SECRET` | Vérification signature Stripe | aucune | ✅ OUI |
| `SENDGRID_API_KEY` | Envoi email | aucune (step skippé) | NON (bloquant fonctionnellement) |
| `SENDGRID_FROM_EMAIL` | Expéditeur | `hello@couplecheck.app` | NON |
| `NEXT_PUBLIC_APP_URL` | Header HTTP-Referer vers OpenRouter | `http://localhost:3000` | NON |

---

## Logique OpenRouter (`lib/openrouter.ts`)

```ts
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': NEXT_PUBLIC_APP_URL,
    'X-Title': 'CoupleCheck',
  },
  body: JSON.stringify({
    model: OPENROUTER_MODEL,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2048,
    temperature: 0.7,
  }),
})
```

- Si `response.ok === false` → throw `Error('OpenRouter error ${status}: ...')`
- Si `choices[0].message.content` est absent → throw `Error('No content in OpenRouter response')`

---

## Parsing JSON des réponses (`lib/report-generator.ts`)

Les prompts recommendations et action-plan demandent un JSON strict. Le parsing utilise une regex :

```ts
const match = text.match(/\{[\s\S]*\}/);
if (match) return JSON.parse(match[0]);
```

Cette approche extrait le premier `{...}` trouvé dans la réponse, ce qui tolère que le modèle ajoute du texte avant ou après le JSON. Si le parsing échoue, les fallbacks statiques sont utilisés (`generateFallbackRecommendations`, `generateFallbackActionPlan`).

**Important** : ce fallback ne s'applique qu'aux échecs de parsing. Si l'appel API lui-même échoue (exception), le fallback n'est pas utilisé.

---

## Problèmes identifiés

### 🔴 BLOQUANT 1 — Modèle par défaut inexistant

**Fichier** : `lib/openrouter.ts:5`

```ts
const model = process.env.OPENROUTER_MODEL || 'mistralai/mistral-medium';
```

`mistralai/mistral-medium` a été retiré du catalogue OpenRouter. Si `OPENROUTER_MODEL` n'est pas défini en production, les 3 appels LLM retournent une erreur 404, le pipeline s'arrête à l'étape 4, et aucun rapport n'est généré.

**Fix** : définir `OPENROUTER_MODEL` dans les variables d'environnement Vercel.
Modèles recommandés sur OpenRouter :
- `mistralai/mistral-small-3.1-24b-instruct` — bon rapport qualité/vitesse/coût
- `mistralai/mistral-large-2411` — qualité maximale, plus lent
- `google/gemini-flash-1.5` — très rapide, économique
- `anthropic/claude-3.5-haiku` — excellent pour la génération structurée JSON

---

### 🔴 BLOQUANT 2 — `Promise.all` sans isolation des échecs

**Fichier** : `lib/report-generator.ts:26-30`

```ts
const [interpretationText, recommendationsRaw, actionPlanRaw] = await Promise.all([
  callOpenRouter(buildInterpretationPrompt(enrichedCtx)),
  callOpenRouter(buildRecommendationsPrompt(enrichedCtx)),
  callOpenRouter(buildActionPlanPrompt(enrichedCtx)),
]);
```

`Promise.all` est fail-fast : si un seul appel lève une exception, tout le `Promise.all` rejette immédiatement. Les fonctions de fallback statique (`generateFallbackRecommendations`, `generateFallbackActionPlan`) ne sont jamais appelées car elles ne couvrent que les erreurs de parsing JSON, pas les exceptions d'API.

**Conséquence** : une erreur 429 (rate limit), un timeout réseau, ou une réponse inattendue sur un seul appel fait échouer l'intégralité du pipeline.

**Fix recommandé** : wrapper chaque appel avec un `try/catch` individuel qui retourne une valeur fallback :

```ts
async function callOpenRouterSafe(prompt: string, fallback: string): Promise<string> {
  try {
    return await callOpenRouter(prompt);
  } catch {
    return fallback;
  }
}
```

---

### 🟡 RISQUE — Budget temps sur Vercel

**Fichier** : `app/api/stripe/webhook/route.ts:12`

```ts
export const maxDuration = 120; // 2 minutes
```

Le budget de 120 secondes est consommé par :
- 3 appels LLM parallèles (~15-40s selon le modèle et la charge)
- Rendu PDF React (~2-5s)
- Upload Supabase Storage (~1-3s)
- Envoi email SendGrid avec PDF en pièce jointe (~3-8s)

En cas de modèle lent ou de charge élevée sur OpenRouter, le timeout Vercel peut être atteint avant la fin du pipeline.

**Note** : `maxDuration: 120` nécessite un plan Vercel Pro ou supérieur.

---

### 🟡 RISQUE — Erreurs silencieuses

Le webhook retourne toujours HTTP 200, même en cas d'échec du pipeline :

```ts
} catch (error) {
  logError('Pipeline failed', error);
  return NextResponse.json({ received: true, error: String(error) });
}
```

C'est intentionnel (éviter les retries Stripe), mais les erreurs ne sont visibles que dans les logs Vercel. Il n'y a pas d'alerte, de notification, ou de file de retry interne si le rapport n'est pas généré.

---

### 🟡 MINEUR — Absence de validation précoce des env vars

La présence de `OPENROUTER_API_KEY` est loggée mais non validée avant l'appel. Si la clé est absente, le pipeline commence ses 9 étapes avant d'échouer à l'étape 4. Une validation en début de handler éviterait les étapes 1-3 inutiles.

---

## Comment déboguer un échec

1. **Vercel Logs** → filtrer sur `[WEBHOOK]` et `[WEBHOOK ERROR]` pour localiser l'étape en échec
2. **Vérifier `has_api_key`** dans les logs (step 4 context) — si `false`, la clé n'est pas settée
3. **Vérifier `model`** dans les logs — si c'est `mistralai/mistral-medium`, définir `OPENROUTER_MODEL`
4. **Tester l'API key** directement :
   ```bash
   curl https://openrouter.ai/api/v1/models \
     -H "Authorization: Bearer $OPENROUTER_API_KEY"
   ```
5. **Tester un appel complet** via le playground OpenRouter avec le même modèle et un prompt court

---

## Checklist de mise en production

- [ ] `OPENROUTER_API_KEY` défini dans Vercel (Settings → Environment Variables)
- [ ] `OPENROUTER_MODEL` défini avec un modèle valide (ex: `mistralai/mistral-small-3.1-24b-instruct`)
- [ ] `STRIPE_WEBHOOK_SECRET` configuré avec la clé du webhook Stripe Dashboard
- [ ] Plan Vercel Pro activé (nécessaire pour `maxDuration: 120`)
- [ ] Bucket Supabase `reports` créé avec les policies RLS appropriées
- [ ] `SENDGRID_API_KEY` et `SENDGRID_FROM_EMAIL` configurés
