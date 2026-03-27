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