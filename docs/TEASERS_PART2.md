# TEASERS_PART2.md — Pain Points, Combinaisons, Paradoxes

## SECTION 2 : Teasers PAIN POINTS (Q20)

```typescript
// config/teasers/pain-points.ts

export const painPointTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_communication': {
    condition: { painPoint: 'communication' },
    fr: {
      icon: '💬',
      title: "Ce qui bloque vraiment dans votre communication",
      preview: "Tu as identifié la communication comme inquiétude (Q20). En croisant avec tes autres réponses, il semble que le problème ne soit peut-être pas un manque de mots, mais plutôt ████████████...",
      locked: "...plutôt une difficulté à ce que les mots produisent l'effet souhaité. Il y a de fortes chances qu'une dynamique se soit installée où certaines choses sont dites, mais pas vraiment reçues comme tu le voudrais. Quelque chose se perd peut-être en ████████████.",
      emotionalHook: "Qu'est-ce qui fait que vos mots ne portent plus ?",
      ctaText: "Comprendre le vrai problème de communication",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIANCE / JALOUSIE
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_trust': {
    condition: { painPoint: 'trust' },
    fr: {
      icon: '🛡️',
      title: "D'où vient vraiment cette inquiétude",
      preview: "Tu as mentionné la confiance ou la jalousie (Q20). Cette préoccupation, croisée avec ton profil, suggère que quelque chose reste en suspens — peut-être un doute non clarifié, peut-être une sensibilité qui vient de ████████████...",
      locked: "...qui vient de plus loin. Il y a de fortes chances que cette inquiétude colore certains de tes comportements au quotidien — des vérifications, des questions, ou au contraire un silence qui cache une vigilance ████████████.",
      emotionalHook: "Cette inquiétude parle-t-elle vraiment de cette relation ?",
      ctaText: "Explorer la source de cette préoccupation",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTIMITÉ
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_intimacy': {
    condition: { painPoint: 'intimacy' },
    fr: {
      icon: '❤️',
      title: "Ce qui se cache derrière cette insatisfaction",
      preview: "L'intimité fait partie de tes inquiétudes (Q20). En regardant l'ensemble de tes réponses, cette préoccupation semble liée à quelque chose de plus large — peut-être une distance qui s'est installée progressivement, ou un besoin qui n'a pas trouvé ████████████...",
      locked: "...qui n'a pas trouvé d'écho. Il y a de fortes chances que cette insatisfaction affecte d'autres aspects de ta relation — la façon dont tu te sens proche ou non, valorisé(e) ou ████████████.",
      emotionalHook: "Qu'est-ce qui te manque vraiment dans cette intimité ?",
      ctaText: "Comprendre ce que cache cette inquiétude",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFLITS
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_conflict': {
    condition: { painPoint: 'conflict' },
    fr: {
      icon: '⚖️',
      title: "Le vrai problème derrière vos disputes",
      preview: "Les disputes te préoccupent (Q20). En combinant avec tes autres réponses, il semble que le problème ne soit peut-être pas les désaccords eux-mêmes, mais plutôt ce qui se passe pendant ou après — une escalade, un ████████████...",
      locked: "...un non-dit, ou quelque chose qui ne cicatrise pas. Il y a de fortes chances que vos conflits touchent à quelque chose de récurrent — un sujet, un besoin, ou une dynamique qui revient sans trouver de ████████████.",
      emotionalHook: "Qu'est-ce qui fait que vos disputes ne résolvent rien ?",
      ctaText: "Identifier ce qui alimente les conflits",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BLESSURES PASSÉES
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_forgiveness': {
    condition: { painPoint: 'forgiveness' },
    fr: {
      icon: '🕊️',
      title: "Ce qui reste ouvert du passé",
      preview: "Les blessures non résolues te préoccupent (Q20). Cette inquiétude, en lien avec tes autres réponses, suggère que quelque chose continue de peser — peut-être en toile de fond de vos interactions, peut-être de façon plus ████████████...",
      locked: "...plus présente à certains moments. Il y a de fortes chances que ces blessures ressurgissent dans des contextes inattendus, ou qu'elles créent une prudence, une retenue qui affecte la façon dont vous vous faites ████████████.",
      emotionalHook: "Quelle blessure n'a jamais vraiment cicatrisé ?",
      ctaText: "Explorer ce qui reste ouvert",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJETS DE VIE DIFFÉRENTS
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_projects': {
    condition: { painPoint: 'projects' },
    fr: {
      icon: '🚀',
      title: "Ce que cette divergence implique vraiment",
      preview: "Vos projets de vie différents te préoccupent (Q20). Cette divergence, qu'elle soit clairement exprimée ou encore floue, crée probablement une forme d'incertitude sur l'avenir — où allez-vous ensemble, et ████████████...",
      locked: "...et pour combien de temps. Il y a de fortes chances que cette différence de vision génère des questions que vous n'avez peut-être pas encore osé vous poser directement, ou des compromis dont le prix n'est pas encore ████████████.",
      emotionalHook: "Cette divergence est-elle un obstacle ou un sujet évité ?",
      ctaText: "Clarifier ce que cette divergence implique",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANQUE DE TEMPS
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_time': {
    condition: { painPoint: 'time' },
    fr: {
      icon: '⏰',
      title: "Ce que ce manque de temps révèle",
      preview: "Le manque de temps ensemble te préoccupe (Q20). Cette inquiétude peut sembler pratique — mais elle touche souvent à quelque chose de plus profond. Il y a peut-être un sentiment de ████████████...",
      locked: "...de passer à côté, de perdre quelque chose. Les moments partagés ne sont peut-être plus assez nombreux, ou peut-être qu'ils ont changé de nature — moins de qualité, moins de vraie ████████████.",
      emotionalHook: "Est-ce une question de quantité ou de qualité ?",
      ctaText: "Comprendre ce que ce manque révèle",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESPACE PERSONNEL
  // ═══════════════════════════════════════════════════════════════════════════
  'pain_balance': {
    condition: { painPoint: 'balance' },
    fr: {
      icon: '☯️',
      title: "Le besoin d'espace qui s'exprime",
      preview: "Le manque d'espace personnel te préoccupe (Q20). Cette inquiétude suggère que l'équilibre entre «nous» et «moi» n'est peut-être pas là où tu le voudrais — tu as peut-être besoin de plus de moments pour ████████████...",
      locked: "...pour toi, pour ce qui t'appartient en dehors du couple. Il y a de fortes chances que ce manque crée une forme de frustration qui peut se manifester de différentes façons — fatigue, irritabilité, ou envie de ████████████.",
      emotionalHook: "Qu'est-ce que tu ferais si tu avais plus d'espace ?",
      ctaText: "Explorer ce besoin et comment le communiquer",
    },
  },
};
```

---

## SECTION 3 : Teasers de COMBINAISONS

```typescript
// config/teasers/combinations.ts

export const combinationTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNICATION : Garde pour soi + Pas écouté
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_silence_invisibility': {
    conditions: [
      { question: 'Q5', answer: ['rarely', 'sometimes'] },
      { question: 'Q6', answer: ['rarely', 'sometimes'] },
    ],
    fr: {
      icon: '🔇',
      title: "Le cercle du silence",
      preview: "Tes réponses aux questions 5 et 6 dessinent un cercle particulier : tu gardes des choses pour toi, et quand tu parles, tu ne te sens pas vraiment entendu(e). Ces deux dynamiques se nourrissent probablement l'une l'autre, créant ████████████...",
      locked: "...créant une forme de retrait progressif. Il y a de fortes chances que ce cercle se soit installé petit à petit — chaque tentative non reçue renforçant le silence, chaque silence creusant un peu plus ████████████.",
      emotionalHook: "Quand as-tu commencé à moins essayer ?",
      ctaText: "Comprendre et briser ce cercle",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNICATION : Parle mais pas entendu
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_speaks_unheard': {
    conditions: [
      { question: 'Q5', answer: ['always', 'mostly'] },
      { question: 'Q6', answer: ['rarely', 'sometimes'] },
    ],
    fr: {
      icon: '📢',
      title: "Les mots qui n'arrivent pas",
      preview: "Tu t'exprimes (Q5), mais tu ne te sens pas écouté(e) (Q6). Cette combinaison est particulièrement frustrante — les mots sortent, mais ils semblent se perdre quelque part avant d'atteindre ████████████...",
      locked: "...d'atteindre l'autre. Il y a de fortes chances que tu aies essayé différentes approches — parler plus fort, plus doucement, différemment — sans que ça change vraiment la façon dont ton message est ████████████.",
      emotionalHook: "À quel moment tes mots se perdent-ils ?",
      ctaText: "Comprendre pourquoi le message ne passe pas",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNICATION : Double incompréhension
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_mutual_incomprehension': {
    conditions: [
      { question: 'Q6', answer: ['rarely', 'sometimes'] },
      { question: 'Q7', answer: ['rarely', 'sometimes'] },
    ],
    fr: {
      icon: '🌫️',
      title: "Le brouillard entre vous",
      preview: "Tu ne te sens pas entendu(e) (Q6) et tu as du mal à lire ton/ta partenaire (Q7). Cette double incompréhension crée probablement un espace où chacun fonctionne avec des suppositions sur l'autre — souvent ████████████...",
      locked: "...souvent décalées. Il y a de fortes chances que certains malentendus reviennent régulièrement, ou que des tensions naissent de nulle part parce que personne ne sait vraiment ce que l'autre ████████████.",
      emotionalHook: "Combien de vos problèmes viennent d'un malentendu ?",
      ctaText: "Dissiper le brouillard entre vous",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIANCE + INTIMITÉ : Double distance
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_double_distance': {
    conditions: [
      { dimension: 'trust', maxScore: 50 },
      { dimension: 'intimacy', maxScore: 50 },
    ],
    fr: {
      icon: '🧱',
      title: "La double distance",
      preview: "Tes scores en confiance ({{trust_score}}/100) et en intimité ({{intimacy_score}}/100) suggèrent une forme de distance sur deux fronts. Ces deux dimensions sont souvent liées — quand on ne fait pas entièrement confiance, il est difficile de ████████████...",
      locked: "...de se montrer vulnérable. Et sans vulnérabilité, l'intimité reste en surface. Il y a de fortes chances que cette double distance crée une forme de relation où vous êtes ensemble, mais pas complètement ████████████.",
      emotionalHook: "Qu'est-ce qui a construit ces murs ?",
      ctaText: "Comprendre comment ces distances se nourrissent",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIANCE FORTE + INTIMITÉ FAIBLE
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_trust_without_depth': {
    conditions: [
      { dimension: 'trust', minScore: 70 },
      { dimension: 'intimacy', maxScore: 50 },
    ],
    fr: {
      icon: '🤝',
      title: "La confiance sans la profondeur",
      preview: "Tu fais confiance ({{trust_score}}/100) mais l'intimité reste limitée ({{intimacy_score}}/100). C'est un profil particulier — la sécurité est là, mais quelque chose empêche d'aller plus ████████████...",
      locked: "...plus profond. Il y a peut-être une pudeur, une habitude de rester en surface, ou une peur de ce qui pourrait émerger si vous vous aventuriez dans des territoires plus ████████████.",
      emotionalHook: "Qu'est-ce qui vous retient d'aller plus profond ?",
      ctaText: "Explorer ce qui bloque la profondeur",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFLITS EXPLOSIFS + PARDON DIFFICILE
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_escalation_grudge': {
    conditions: [
      { question: 'Q12', answer: 'escalate' },
      { question: 'Q14', answer: ['grudge', 'struggle'] },
    ],
    fr: {
      icon: '🔁',
      title: "Le cycle qui s'alourdit",
      preview: "Vos disputes dégénèrent (Q12) et tu as du mal à pardonner (Q14). Cette combinaison crée un cycle où chaque conflit ajoute une couche à ce qui n'a pas été ████████████...",
      locked: "...évacué. Il y a de fortes chances que vos disputes actuelles portent le poids des précédentes — des mots d'hier qui ressortent aujourd'hui, des blessures qui se réveillent à chaque nouvelle ████████████.",
      emotionalHook: "Combien de disputes anciennes ressortent dans les nouvelles ?",
      ctaText: "Comprendre ce cycle et comment l'alléger",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉVITEMENT + BLESSURES LOURDES
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_avoidance_weight': {
    conditions: [
      { question: 'Q12', answer: 'avoid' },
      { question: 'Q15', answer: ['some', 'heavy'] },
    ],
    fr: {
      icon: '🎈',
      title: "Ce qui gonfle en silence",
      preview: "Vous évitez les conflits (Q12) alors que des blessures passées pèsent encore (Q15). Cette combinaison crée une pression silencieuse — les choses non dites rejoignent les choses non résolues, formant ████████████...",
      locked: "...formant quelque chose qui grossit sans être vu. Il y a de fortes chances que cette accumulation se manifeste autrement — dans une distance, une fatigue, ou des moments où tout semble soudain trop ████████████.",
      emotionalHook: "Que se passera-t-il quand tout ça ne tiendra plus ?",
      ctaText: "Voir ce qui s'accumule et comment le désamorcer",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RÉCONCILIATION SANS FOND
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_false_peace': {
    conditions: [
      { question: 'Q12', answer: 'argue' },
      { question: 'Q13', answer: ['rarely', 'never'] },
    ],
    fr: {
      icon: '🏳️',
      title: "Les paix qui ne tiennent pas",
      preview: "Vous vous disputez puis vous réconciliez (Q12), mais sans vraiment en reparler (Q13). Cette dynamique crée des réconciliations de surface — le calme revient, mais le sujet reste peut-être quelque part, en ████████████...",
      locked: "...en attente. Il y a de fortes chances que certaines disputes reviennent parce qu'elles n'ont jamais été vraiment closes — juste mises de côté jusqu'à la prochaine ████████████.",
      emotionalHook: "Quel sujet revient sous différentes formes ?",
      ctaText: "Identifier ce qui n'est pas vraiment résolu",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJETS ALIGNÉS + ÉQUILIBRE PERDU
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_aligned_but_lost': {
    conditions: [
      { dimension: 'projects', minScore: 70 },
      { dimension: 'balance', maxScore: 45 },
    ],
    fr: {
      icon: '🎯',
      title: "Ensemble mais à quel prix",
      preview: "Vous êtes alignés sur les projets ({{projects_score}}/100) mais ton équilibre personnel en souffre ({{balance_score}}/100). Cette combinaison suggère que l'alignement a peut-être demandé des compromis qui pèsent — des morceaux de toi mis de côté pour ████████████...",
      locked: "...pour maintenir la vision commune. Il y a de fortes chances que tu portes silencieusement un certain poids — celui de ce que tu as peut-être sacrifié pour rester sur le même ████████████.",
      emotionalHook: "Qu'as-tu mis de côté pour que ça fonctionne ?",
      ctaText: "Explorer le prix de cet alignement",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAS DE PROJETS + ESPACE ENVAHI
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_stuck_together': {
    conditions: [
      { question: 'Q17', answer: ['none', 'separate'] },
      { question: 'Q18', answer: ['lacking', 'no'] },
    ],
    fr: {
      icon: '🔗',
      title: "Ensemble sans avancer",
      preview: "Vous ne construisez pas vraiment ensemble (Q17) et tu manques d'espace personnel (Q18). Cette combinaison peut créer une forme d'immobilité — ni vraiment ensemble vers quelque chose, ni vraiment libre pour ████████████...",
      locked: "...pour autre chose. Il y a peut-être une question non dite sur ce qui vous retient ensemble, ou sur ce qui empêche de prendre une direction — quelle qu'elle ████████████.",
      emotionalHook: "Qu'est-ce qui vous garde dans cette situation ?",
      ctaText: "Comprendre ce qui immobilise",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIANCE ANXIEUSE + TRANSPARENCE FAIBLE
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_anxiety_opacity': {
    conditions: [
      { question: 'Q8', answer: ['rarely', 'sometimes'] },
      { question: 'Q9', answer: ['partial', 'low'] },
    ],
    fr: {
      icon: '🔍',
      title: "Le doute qui se nourrit du flou",
      preview: "Tu ressens de l'anxiété sur la confiance (Q8) et la transparence est limitée (Q9). Ces deux éléments se renforcent probablement — moins tu vois clair, plus l'inquiétude grandit, et plus tu cherches à ████████████...",
      locked: "...à comprendre ce qui reste dans l'ombre. Il y a de fortes chances que cette dynamique crée une tension constante — une vigilance qui t'épuise et peut-être une pression que ton/ta partenaire ████████████.",
      emotionalHook: "Que cherches-tu vraiment à voir ?",
      ctaText: "Démêler le doute du manque de clarté",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTIMITÉ FAIBLE + ESPACE ENVAHI
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_close_but_distant': {
    conditions: [
      { dimension: 'intimacy', maxScore: 50 },
      { question: 'Q18', answer: ['lacking', 'no'] },
    ],
    fr: {
      icon: '🌀',
      title: "Proches mais pas connectés",
      preview: "L'intimité manque ({{intimacy_score}}/100) alors que tu manques d'espace personnel (Q18). C'est un paradoxe douloureux — vous êtes peut-être très présents l'un pour l'autre au quotidien, mais cette proximité ne crée pas ████████████...",
      locked: "...ne crée pas de connexion profonde. Il y a de fortes chances que tu te sentes à la fois envahi(e) et seul(e) — trop ensemble pour respirer, pas assez proches pour vraiment ████████████.",
      emotionalHook: "Comment peut-on être si proches et si loin à la fois ?",
      ctaText: "Comprendre ce paradoxe de proximité",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IDENTITÉ PERDUE + PROJETS SÉPARÉS
  // ═══════════════════════════════════════════════════════════════════════════
  'combo_lost_and_separate': {
    conditions: [
      { question: 'Q19', answer: ['lost', 'no'] },
      { question: 'Q17', answer: 'separate' },
    ],
    fr: {
      icon: '🧩',
      title: "Perdu(e) dans une relation qui ne construit pas",
      preview: "Tu as l'impression de t'être perdu(e) (Q19) alors que vous faites vos projets séparément (Q17). Cette combinaison pose une question importante : si tu as sacrifié une partie de toi, pour quoi ████████████...",
      locked: "...pour quoi exactement ? Il y a de fortes chances que cette perte d'identité ne serve pas vraiment un «nous» — mais plutôt une habitude, une peur de changer, ou quelque chose qui n'a jamais été ████████████.",
      emotionalHook: "Qu'as-tu perdu, et pour quoi ?",
      ctaText: "Explorer ce qui a été sacrifié et pourquoi",
    },
  },
};
```

---

## SECTION 4 : Teasers de PARADOXES

```typescript
// config/teasers/paradoxes.ts

export const paradoxTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // Parle bien + Intimité faible
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_talk_without_connecting': {
    conditions: [
      { dimension: 'communication', minScore: 70 },
      { dimension: 'intimacy', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : vous parlez sans vous rejoindre",
      preview: "Tu communiques bien ({{communication_score}}/100) mais l'intimité manque ({{intimacy_score}}/100). Ce décalage est révélateur — les mots circulent, mais quelque chose reste en ████████████...",
      locked: "...reste en surface. Il y a de fortes chances que vos conversations évitent certains terrains, ou que la parole serve parfois à maintenir une distance plutôt qu'à la ████████████.",
      emotionalHook: "De quoi parlez-vous pour éviter de parler de quoi ?",
      ctaText: "Comprendre ce paradoxe parole-distance",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Confiance forte + Communication faible
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_trust_without_words': {
    conditions: [
      { dimension: 'trust', minScore: 70 },
      { dimension: 'communication', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : la confiance silencieuse",
      preview: "Tu fais confiance ({{trust_score}}/100) mais la communication bloque ({{communication_score}}/100). Cette combinaison suggère une relation où la sécurité existe, mais où les mots ne viennent pas ████████████...",
      locked: "...ne viennent pas facilement. Il y a peut-être une peur de déranger cette confiance en ouvrant certains sujets, ou une habitude de se comprendre sans avoir besoin de ████████████.",
      emotionalHook: "Qu'est-ce que tu n'oses pas dire de peur de changer quelque chose ?",
      ctaText: "Explorer ce que le silence protège",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Intimité forte + Conflits destructeurs
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_passion_destruction': {
    conditions: [
      { dimension: 'intimacy', minScore: 70 },
      { dimension: 'conflict', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : l'intensité qui blesse",
      preview: "L'intimité est forte ({{intimacy_score}}/100) mais les conflits sont difficiles ({{conflict_score}}/100). Cette combinaison crée une dynamique intense — la proximité rend tout plus ████████████...",
      locked: "...plus sensible. Il y a de fortes chances que vos disputes touchent à des endroits vulnérables, précisément parce que vous vous êtes ouverts l'un à l'autre. Ce qui est force devient aussi ████████████.",
      emotionalHook: "L'intimité rend-elle vos blessures plus profondes ?",
      ctaText: "Comprendre ce lien entre proximité et douleur",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Bons conflits + Pardon difficile
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_resolve_without_forgiving': {
    conditions: [
      { dimension: 'conflict', minScore: 65 },
      { dimension: 'forgiveness', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : résoudre sans pardonner",
      preview: "Vous gérez bien les conflits ({{conflict_score}}/100) mais le pardon reste difficile ({{forgiveness_score}}/100). Vous savez peut-être trouver des solutions, mais quelque chose persiste au-delà de la ████████████...",
      locked: "...de la résolution pratique. Il y a de fortes chances que tu gardes quelque part une trace de ce qui s'est passé — même quand le problème semble réglé, une partie de toi n'a pas vraiment tourné la ████████████.",
      emotionalHook: "Que gardes-tu même quand c'est 'résolu' ?",
      ctaText: "Explorer la différence entre résoudre et pardonner",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Équilibre fort + Projets faibles
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_independent_but_stagnant': {
    conditions: [
      { dimension: 'balance', minScore: 70 },
      { dimension: 'projects', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : libres mais sans direction commune",
      preview: "Tu gardes ton équilibre personnel ({{balance_score}}/100) mais les projets communs manquent ({{projects_score}}/100). Cette indépendance préservée a peut-être un revers — vous êtes bien chacun de votre côté, mais ensemble, vous ne ████████████...",
      locked: "...vous ne construisez pas vraiment. Il y a peut-être une question non dite sur ce qui vous unit au-delà du quotidien, ou sur ce qui rendrait cette relation plus ████████████.",
      emotionalHook: "Qu'est-ce qui vous unit au-delà du présent ?",
      ctaText: "Explorer ce que cette indépendance cache",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Communication forte + Confiance faible
  // ═══════════════════════════════════════════════════════════════════════════
  'paradox_words_without_trust': {
    conditions: [
      { dimension: 'communication', minScore: 70 },
      { dimension: 'trust', maxScore: 45 },
    ],
    fr: {
      icon: '🔍',
      title: "Paradoxe : les mots ne suffisent pas",
      preview: "Vous communiquez bien ({{communication_score}}/100) mais la confiance reste fragile ({{trust_score}}/100). Les mots circulent, mais ils ne rassurent pas complètement — comme si quelque chose au-delà des paroles restait ████████████...",
      locked: "...restait en question. Il y a de fortes chances que tu aies besoin de quelque chose de plus que des mots pour te sentir en sécurité — des preuves, des actes, ou une constance que la parole seule ne peut pas ████████████.",
      emotionalHook: "Qu'est-ce qui te rassurerait vraiment ?",
      ctaText: "Comprendre ce qui manque au-delà des mots",
    },
  },
};
```

---

## SECTION 5 : Teasers "HIDDEN INSIGHT" (Le partenaire)

```typescript
// config/teasers/hidden-insights.ts

export const hiddenInsightTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // Communication faible
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_unheard': {
    condition: { dimension: 'communication', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Ce que ton/ta partenaire n'ose peut-être pas dire",
      preview: "D'après tes réponses sur la communication, il y a de fortes chances que ton/ta partenaire porte aussi des choses non dites. Ce qui reste silencieux de ton côté crée peut-être un espace où l'autre aussi ████████████...",
      locked: "...où l'autre aussi retient quelque chose. Il est possible que des besoins, des frustrations ou des pensées restent en suspens des deux côtés — chacun attendant peut-être que l'autre fasse le premier pas vers ████████████.",
      emotionalHook: "Et si ton/ta partenaire attendait aussi quelque chose ?",
      ctaText: "Explorer ce qui reste non-dit des deux côtés",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Intimité faible
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_needs': {
    condition: { dimension: 'intimacy', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Un besoin que ton/ta partenaire n'exprime peut-être pas",
      preview: "Le manque d'intimité que tu ressens existe probablement aussi de l'autre côté — peut-être sous une forme différente. Il y a de fortes chances que ton/ta partenaire ait des besoins qu'il/elle n'ose pas ████████████...",
      locked: "...qu'il/elle n'ose pas formuler. Cette retenue mutuelle crée une distance qui ne reflète peut-être pas ce que vous voulez vraiment tous les deux. Quelque chose pourrait changer si certains mots trouvaient leur ████████████.",
      emotionalHook: "Qu'est-ce que ton/ta partenaire n'arrive peut-être pas à te demander ?",
      ctaText: "Comprendre les besoins cachés de chaque côté",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Conflits difficiles
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_conflict': {
    condition: { dimension: 'conflict', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Ce que ton/ta partenaire vit peut-être pendant vos disputes",
      preview: "Pendant vos conflits, il y a de fortes chances que ton/ta partenaire traverse aussi quelque chose de difficile — peut-être une forme de douleur, de peur, ou de frustration qu'il/elle n'arrive pas à ████████████...",
      locked: "...à exprimer autrement que par la dispute elle-même. Ce qui ressemble à de l'attaque ou de la défense cache peut-être quelque chose de plus vulnérable — un besoin de se sentir ████████████.",
      emotionalHook: "Que cherche vraiment ton/ta partenaire dans ces moments intenses ?",
      ctaText: "Voir au-delà des mots de la dispute",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Équilibre faible
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_space': {
    condition: { dimension: 'balance', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Comment ton manque d'espace affecte peut-être l'autre",
      preview: "Ton manque d'équilibre personnel a probablement un impact sur ton/ta partenaire aussi — peut-être qu'il/elle sent ta frustration, ou peut-être qu'il/elle se sent responsable de quelque chose qu'il/elle ne ████████████...",
      locked: "...ne comprend pas entièrement. Il y a de fortes chances que cette dynamique crée un malaise des deux côtés — toi qui manques d'espace, et l'autre qui perçoit quelque chose sans savoir quoi ████████████.",
      emotionalHook: "Ton/ta partenaire sait-il/elle que tu te sens à l'étroit ?",
      ctaText: "Comprendre l'impact mutuel de ce déséquilibre",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Confiance faible
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_trust': {
    condition: { dimension: 'trust', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Ce que ton inquiétude crée peut-être chez l'autre",
      preview: "Ton niveau de confiance ({{trust_score}}/100) se ressent probablement de l'autre côté. Il y a de fortes chances que ton/ta partenaire perçoive ta vigilance — même si tu ne l'exprimes pas directement, elle se manifeste peut-être dans ████████████...",
      locked: "...dans des questions, des regards, ou une forme de tension. Cette dynamique peut créer chez l'autre un sentiment d'être surveillé(e), jugé(e), ou de devoir constamment prouver ████████████.",
      emotionalHook: "Comment ton/ta partenaire vit-il/elle ta méfiance ?",
      ctaText: "Explorer l'impact de cette vigilance sur l'autre",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Pardon faible
  // ═══════════════════════════════════════════════════════════════════════════
  'insight_partner_forgiveness': {
    condition: { dimension: 'forgiveness', maxScore: 50 },
    fr: {
      icon: '🔮',
      title: "Ce que ton/ta partenaire ressent peut-être face à ta rancune",
      preview: "Ta difficulté à pardonner ({{forgiveness_score}}/100) a probablement un impact sur ton/ta partenaire. Il y a de fortes chances qu'il/elle sente le poids de quelque chose qui n'est pas vraiment passé — peut-être un sentiment de culpabilité persistant, ou une impression de ████████████...",
      locked: "...une impression de ne jamais pouvoir réparer complètement. Cette dynamique peut créer une forme de découragement — pourquoi essayer si rien ne sera jamais vraiment ████████████.",
      emotionalHook: "Ton/ta partenaire sait-il/elle ce que tu n'as pas encore lâché ?",
      ctaText: "Comprendre ce que l'autre ressent face à ce qui reste",
    },
  },
};
```