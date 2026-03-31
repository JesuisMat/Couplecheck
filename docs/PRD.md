# PRD — CoupleCheck

## 1. Vision & Objectifs

### 1.1 Vision produit
CoupleCheck est une application web permettant aux personnes en couple (ou en situationship) d'évaluer la santé de leur relation via un quiz interactif de **5 minutes (20 questions)**. Le produit génère un rapport personnalisé identifiant les forces et zones à risque du couple, basé sur **7 dimensions** validées en psychologie des couples.

### 1.2 Positionnement
- **Ton** : Accessible, fun, viral (pas clinique)
- **Promesse** : "En 5 minutes, découvre ce qui renforce (ou fragilise) ton couple"
- **Différenciation** : Rapport généré par IA + upsell Agent IA coach relationnel

### 1.3 Objectifs business
| Métrique | Cible MVP (M1) | Cible M3 |
|----------|----------------|----------|
| Visiteurs uniques | 2,000 | 10,000 |
| Taux completion quiz | 65% | 75% |
| Taux capture email | 50% | 60% |
| Taux conversion payant | 5% | 8% |
| Revenu mensuel | 650€ | 3,500€ |

---

## 2. Cible utilisateur (ICP)

### 2.1 Démographie
- **Âge** : 18-35 ans
- **Genre** : Focus femmes (70% du trafic attendu), contenu adapté par genre
- **Localisation** : France, Belgique, Suisse, Canada (FR) + UK, US, Canada (EN)
- **Langue** : Français + Anglais

### 2.2 Situation relationnelle
- En couple (officiel)
- "C'est compliqué" (situationship, pause, relation à distance)
- Exclure : célibataires sans relation récente

### 2.3 Personas prioritaires

#### Persona A — "L'Anxieuse chronique" (Volume élevé)
- **Profil** : Femme 22-30 ans, en couple 1-3 ans
- **Douleur** : Doute permanent même quand "ça va", compare son couple aux autres
- **Trigger** : Scroll TikTok/Instagram, voit du contenu relation, se questionne
- **Comportement achat** : Impulsif, petit panier, cherche réassurance
- **Message qui résonne** : "Est-ce que c'est normal de douter autant ?"

#### Persona B — "La Crise active" (Conversion élevée)
- **Profil** : Femme ou homme 25-35 ans, en couple 2-5 ans
- **Douleur** : Dispute récente, tension palpable, cherche des solutions
- **Trigger** : Engeulade, silence pesant, recherche Google "couple en crise"
- **Comportement achat** : Prêt à payer pour une solution concrète
- **Message qui résonne** : "On s'est encore engueulés. Je sais plus quoi faire."

---

## 3. Parcours utilisateur

### 3.1 Funnel complet

```
┌─────────────────────────────────────────────────────────────────┐
│  ACQUISITION                                                     │
│  - Contenu organique TikTok/Instagram/Pinterest                 │
│  - Ads Meta/TikTok (150€/mois)                                  │
│  - SEO : "test couple", "relation saine", "mon couple va mal"   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LANDING PAGE                                                    │
│  - Headline : "Ton couple est-il vraiment épanoui ?"            │
│  - Sous-titre : "Fais le test en 5 min — Résultat immédiat"     │
│  - CTA : "Commencer le test gratuit"                            │
│  - Social proof : "12,847 couples ont fait le test"             │
│  - Trust : "Basé sur 7 dimensions validées en psychologie"      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  QUIZ (20 questions, ~5 minutes)                                 │
│  - Q1-Q4 : Segmentation (âge, genre, durée, situation)          │
│  - Q5-Q19 : Évaluation 7 dimensions (15 questions)              │
│  - Q20 : Question douleur (fermée multi-select + ouverte)       │
│  - UX : Barre progression, animations, micro-feedback           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  EMAIL GATE                                                      │
│  - "Ton résultat est prêt ! Entre ton email pour le recevoir"   │
│  - Champs : Email + Prénom                                      │
│  - Checkbox : Consentement newsletter (pré-coché non)           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PAGE RÉSULTAT TRONQUÉ                                           │
│  - Score global : "74/100 — Relation Stable"                    │
│  - Points forts : 2-3 affichés                                  │
│  - Zones à risque : "3 zones identifiées" (floutées)            │
│  - CTA : "Débloquer mon rapport complet"                        │
│  - Pricing affiché avec promo                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────────────┐
│  ACHAT                   │    │  NON-ACHAT → Séquence email      │
│  - Stripe Checkout       │    │  - J+0 : Rappel résultat         │
│  - Options :             │    │  - J+2 : Conseil gratuit #1      │
│    • Standard 12,90€     │    │  - J+5 : Offre -20%              │
│    • Premium 19,90€      │    │  - J+7 : Dernier rappel urgence  │
│      (barré 29,90€)      │    │  - J+14 : Contenu valeur         │
└──────────────────────────┘    └──────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LIVRAISON                                                       │
│  - Email avec PDF rapport complet                               │
│  - Si Premium : lien création compte Agent IA                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Fonctionnalités détaillées

### 4.1 Landing Page

#### Éléments requis
- Header : Logo + sélecteur langue (FR/EN)
- Hero : Headline + sous-titre + CTA primaire
- Social proof : Compteur dynamique "X personnes ont fait le test"
- Section "Comment ça marche" : 3 étapes illustrées
- Section "Les 6 dimensions analysées" : icônes + descriptions courtes
- Section FAQ : 4-5 questions fréquentes
- Footer : Mentions légales, CGV, Politique de confidentialité

#### Variantes A/B (headline)
- A : "Ton couple est-il vraiment épanoui ?"
- B : "Découvre ce qui renforce (ou fragilise) ton couple"
- C : "Le test que ton couple mérite — Résultat en 5 min"

### 4.2 Quiz

#### Structure des 20 questions

**Segmentation (Q1-Q4)**
| # | Question | Type | Options |
|---|----------|------|---------|
| Q1 | Quel est ton âge ? | Single select | 18-24 / 25-29 / 30-35 / 35+ |
| Q2 | Tu es... | Single select | Une femme / Un homme / Autre |
| Q3 | Depuis combien de temps êtes-vous ensemble ? | Single select | < 6 mois / 6-12 mois / 1-2 ans / 2-5 ans / 5+ ans |
| Q4 | Comment décrirais-tu ta situation ? | Single select | En couple / Marié(e) / Fiancé(e) / C'est compliqué |

**Évaluation des 7 dimensions (Q5-Q19)** — Voir QUIZ_CONTENT.md pour détail
| Dimension | Questions | Poids |
|-----------|-----------|-------|
| Communication | Q5, Q6, Q7 | 1.2 |
| Confiance | Q8, Q9 | 1.2 |
| Intimité | Q10, Q11 | 1.0 |
| Gestion des conflits | Q12, Q13 | 1.0 |
| Pardon & Résilience | Q14, Q15 | 1.0 |
| Projets communs | Q16, Q17 | 0.8 |
| Équilibre personnel | Q18, Q19 | 0.8 |

**Question douleur finale (Q20)**
| # | Question | Type |
|---|----------|------|
| Q20a | Qu'est-ce qui t'inquiète le plus dans ta relation ? | Multi select (max 3) |
| Q20b | Si tu pouvais changer UNE chose, ce serait quoi ? | Texte libre |

#### Système de scoring
- Chaque question évaluation (Q5-Q19) : 0-10 points
- Score par dimension : moyenne des questions × 10 (= 0-100)
- Score global : moyenne pondérée des 7 dimensions

### 4.3 Rapport tronqué (gratuit)

#### Contenu affiché
- Score global avec jauge visuelle (ex: 74/100)
- Interprétation courte (1 phrase) : "Relation Stable" / "À surveiller" / "En difficulté"
- 2-3 points forts identifiés (icône ✓ + texte)
- Teaser zones à risque : "3 zones à risque identifiées" (flouté/locké)
- CTA vers paiement

### 4.4 Rapport complet (payant)

#### Contenu PDF généré
1. **Page de garde** : Prénom, date, score global
2. **Score global + interprétation** : Paragraphe personnalisé (IA)
3. **Analyse des 7 dimensions** : Graphique radar + score + texte par dimension
4. **Points forts (2-3)** : Détail + pourquoi c'est positif
5. **Zones à risque (2-3)** : Détail + impact potentiel
6. **Comparaison benchmark** : "Tu es dans le top X% des couples de ton âge" (basé sur moyennes statistiques, pas données réelles au lancement)
7. **Plan d'action personnalisé** : 3-5 conseils concrets (générés par IA selon réponses)
8. **Ressources recommandées** : 2-3 livres/articles/exercices

### 4.5 Agent IA Coach (V1.2)

#### Fonctionnalités
- Chat conversationnel avec contexte du quiz
- Historique des conversations persisté
- Conseils personnalisés basés sur le profil
- Tone : Empathique, non-jugeant, actionnable

#### Accès
- Inclus 1 mois avec offre Premium (19,90€)
- Puis abonnement 4,99€/mois
- Authentification par magic link email

---

## 5. Mécaniques marketing

### 5.1 Pricing avec ancrage

#### Affichage sur page résultat
```
┌─────────────────────────────────────────────────────────────┐
│  🎉 OFFRE PRINTEMPS — Jusqu'au [date+7j]                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ○ STANDARD                    ○ PREMIUM ⭐ POPULAIRE       │
│    Rapport complet               Rapport complet            │
│    PDF 15 pages                  + Agent IA Coach 1 mois    │
│                                                             │
│    12,90€                        19,90€ (au lieu de 29,90€) │
│                                  ───────                    │
│    [Choisir]                     [Choisir]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
│  ✓ Paiement sécurisé   ✓ Satisfait ou remboursé 7j        │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Éléments de réassurance
- "Satisfait ou remboursé sous 7 jours"
- "Paiement 100% sécurisé par Stripe"
- "Tes données restent confidentielles"
- Logos : Stripe, Cadenas SSL

### 5.3 Urgence & Rareté
- Countdown timer : "Offre expire dans XX:XX:XX"
- Badge "⭐ POPULAIRE" sur Premium
- "X personnes regardent cette offre" (social proof temps réel — optionnel V1.1)

### 5.4 Garantie
- Remboursement sans condition sous 7 jours
- Email support visible

---

## 6. Emails

### 6.1 Email capture (J+0 immédiat)
- **Objet** : "[Prénom], ton résultat CoupleCheck est prêt"
- **Contenu** : Score, lien vers page résultat, CTA rapport complet

### 6.2 Séquence relance non-acheteurs
- **J+0** : Rappel résultat + CTA
- **J+2** : Conseil gratuit #1 (valeur) + soft CTA
- **J+5** : Offre -20% limitée 48h
- **J+7** : Dernier rappel urgence
- **J+14** : Contenu valeur (pas de vente)

### 6.3 Email post-achat
- **Objet** : "Ton rapport CoupleCheck est prêt 📊"
- **Contenu** : PDF en pièce jointe + lien création compte Agent IA (si Premium)

---

## 7. Métriques & Analytics

### 7.1 Events PostHog à tracker
| Event | Trigger |
|-------|---------|
| `page_view_landing` | Arrivée LP |
| `quiz_started` | Clic "Commencer" |
| `quiz_question_answered` | Chaque réponse (avec question_id) |
| `quiz_completed` | Q15 répondue |
| `email_submitted` | Email capturé |
| `result_page_viewed` | Page résultat affichée |
| `checkout_initiated` | Clic sur offre |
| `purchase_completed` | Paiement réussi (avec offer_type) |
| `report_downloaded` | Ouverture PDF |

### 7.2 Funnels à configurer
1. Landing → Quiz start → Quiz complete → Email → Purchase
2. Email captured → J+2 open → J+5 open → Purchase

---

## 8. Contraintes légales

### 8.1 RGPD
- Consentement explicite newsletter (pas pré-coché)
- Politique de confidentialité accessible
- Droit de suppression des données (email support)
- Données stockées UE (Supabase région EU)

### 8.2 Mentions obligatoires
- CGV accessibles avant paiement
- Mentions légales (éditeur, hébergeur)
- Politique de remboursement claire

### 8.3 Données sensibles
- Question intimité : échelle 1-5 uniquement (pas de détails explicites)
- Pas de stockage données médicales/psychologiques

---

## 9. Roadmap

### Sprint 1 (Semaine 1) — Fondations
- Setup projet Next.js + Supabase + Vercel
- Landing page FR/EN
- Quiz complet (15 questions) avec scoring
- Email capture + stockage Supabase

### Sprint 2 (Semaine 2) — Monétisation
- Page résultat tronqué
- Intégration Stripe Checkout
- Génération rapport PDF (template + IA)
- Envoi email avec PDF
- Déploiement prod + Cloudflare

### Sprint 3 (Semaine 3-4) — Optimisation
- Séquence emails relance (n8n ou Resend)
- A/B test headlines LP
- A/B test pricing
- Analytics PostHog complet

### Sprint 4 (Semaine 5-6) — Agent IA
- Interface chat Agent IA
- Auth magic link
- Intégration LLM avec contexte quiz
- Système abonnement Stripe

### V2 (M2+)
- App mobile (React Native ou PWA)
- Expansion marchés EN