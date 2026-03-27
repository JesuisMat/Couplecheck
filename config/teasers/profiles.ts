export const profileTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // JEUNE COUPLE (< 1 an)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_young_couple': {
    condition: { relationshipDuration: ['<6m', '6m-1y'] },
    fr: {
      icon: '🌱',
      title: "Les dynamiques qui se forment",
      preview: "En tant que couple récent, vous êtes dans une période où les habitudes se créent — les bonnes comme les moins bonnes. Certains schémas qui semblent anodins maintenant pourraient devenir ████████████...",
      locked: "...pourraient devenir plus difficiles à changer avec le temps. Tes réponses suggèrent des points d'attention — pas des problèmes, mais des dynamiques à surveiller avant qu'elles ne ████████████.",
      emotionalHook: "Quelles habitudes prenez-vous sans vous en rendre compte ?",
      ctaText: "Identifier ce qui se construit maintenant",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE EN CONSTRUCTION (1-2 ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_building_couple': {
    condition: { relationshipDuration: ['1-2y'] },
    fr: {
      icon: '🏗️',
      title: "La phase de construction",
      preview: "Après un à deux ans ensemble, vous avez dépassé la phase de découverte. C'est souvent le moment où les premières vraies négociations apparaissent — sur l'espace, sur l'avenir, sur ████████████...",
      locked: "...sur ce qui compte vraiment pour chacun. Tes réponses suggèrent que certains sujets sont peut-être en train d'émerger — des besoins qui demandent à être reconnus, ou des questions qui n'ont pas encore trouvé ████████████.",
      emotionalHook: "Quels besoins commencent à se faire entendre ?",
      ctaText: "Voir ce qui émerge à ce stade de votre relation",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE INSTALLÉ (2-5 ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_established_couple': {
    condition: { relationshipDuration: ['2-5y'] },
    fr: {
      icon: '🏠',
      title: "Les évidences qui méritent attention",
      preview: "Après quelques années ensemble, certaines choses sont devenues évidentes — mais cette familiarité peut aussi cacher des angles morts. Il y a peut-être des besoins qui ont évolué sans être ████████████...",
      locked: "...sans être rediscutés, ou des frustrations légères qui se sont installées comme «normales». Ton profil suggère que certains aspects mériteraient un nouveau regard — pas parce qu'ils vont mal, mais parce qu'ils pourraient ████████████.",
      emotionalHook: "Qu'est-ce qui a changé sans que vous en parliez ?",
      ctaText: "Revoir ce qui est devenu évident",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COUPLE LONGUE DURÉE (5+ ans)
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_longtime_couple': {
    condition: { relationshipDuration: ['5y+'] },
    fr: {
      icon: '🌳',
      title: "Ce que le temps a peut-être installé",
      preview: "Après plus de cinq ans, votre couple a traversé beaucoup. Mais cette longévité vient parfois avec une forme de routine qui s'installe sans qu'on la voie — des choses acceptées plutôt que choisies, des rêves peut-être mis de ████████████...",
      locked: "...mis de côté. Ton profil suggère des zones où le temps a peut-être créé une distance douce — pas une rupture, mais un éloignement progressif qui mériterait d'être ████████████.",
      emotionalHook: "Qu'avez-vous laissé s'installer avec le temps ?",
      ctaText: "Identifier ce que le temps a peut-être érodé",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // "C'EST COMPLIQUÉ"
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_complicated': {
    condition: { relationshipStatus: 'complicated' },
    fr: {
      icon: '🌀',
      title: "Clarifier ce qui crée le flou",
      preview: "Tu as indiqué que «c'est compliqué». Cette situation, quelle qu'en soit la raison, crée probablement une forme d'incertitude qui pèse — tu ne sais peut-être pas vraiment où vous en êtes, ni dans quelle direction ████████████...",
      locked: "...dans quelle direction ça va. Tes réponses dessinent un profil où certaines questions mériteraient d'être posées — pas forcément à l'autre, mais peut-être d'abord à toi-même, sur ce que tu veux ████████████.",
      emotionalHook: "Qu'est-ce qui rendrait les choses moins compliquées ?",
      ctaText: "Clarifier ce qui crée cette complexité",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FIANCÉS / MARIÉS
  // ═══════════════════════════════════════════════════════════════════════════
  'profile_committed': {
    condition: { relationshipStatus: ['married', 'engaged'] },
    fr: {
      icon: '💍',
      title: "Au-delà de l'engagement formel",
      preview: "Vous avez formalisé votre engagement. Mais au-delà des promesses officielles, il y a la réalité du quotidien — et tes réponses suggèrent que certains aspects pourraient bénéficier d'attention. L'engagement ne résout pas tout, parfois il ████████████...",
      locked: "...parfois il met en lumière ce qui demandait déjà à être vu. Il y a peut-être des conversations que vous avez supposé réglées par le «oui», mais qui continuent de ████████████.",
      emotionalHook: "Qu'est-ce que l'engagement n'a pas résolu ?",
      ctaText: "Explorer ce qui reste au-delà des promesses",
    },
  },

};