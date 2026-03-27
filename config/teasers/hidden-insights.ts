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