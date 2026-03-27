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