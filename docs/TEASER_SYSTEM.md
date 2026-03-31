# TEASERS_SYSTEM.md — CoupleCheck

## Philosophie : Suggestion ouverte, pas affirmation fermée

L'utilisateur doit **projeter sa propre réalité** dans nos suggestions. On ne conclut jamais, on ouvre des portes.

### Règles de formulation

| ❌ Éviter | ✅ Privilégier |
|-----------|----------------|
| "Il y a 73% de chances" | "Il y a de fortes chances" |
| "L'événement date de 6 mois" | "Quelque chose a peut-être changé" |
| "Tu ressens de la colère" | "Une émotion que tu n'as peut-être pas nommée" |
| "Ton partenaire fait X" | "Une dynamique s'est peut-être installée" |
| Conclusions définitives | Questions qui résonnent |

---

## SECTION 1 : Teasers par RÉPONSE SPÉCIFIQUE (Q5-Q19)

```typescript
// config/teasers/responses.ts

export const responseTeasers = {

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 5 — Expression des besoins
  // ═══════════════════════════════════════════════════════════════════════════

  'Q5_rarely': {
    condition: { question: 'Q5', answer: 'rarely' },
    fr: {
      icon: '🤐',
      title: "Les mots que tu retiens",
      preview: "Tu as indiqué garder les choses pour toi (Q5). Ce choix, conscient ou non, a probablement créé un espace où certaines pensées tournent en boucle sans jamais trouver de ████████████...",
      locked: "...sans jamais trouver de sortie. Il y a de fortes chances que ton/ta partenaire perçoive quelque chose — peut-être une distance, peut-être une tension — sans pouvoir mettre de mots dessus. Ce silence dit peut-être quelque chose que tu n'as pas encore ████████████.",
      emotionalHook: "Qu'est-ce que tu portes seul(e) depuis trop longtemps ?",
      ctaText: "Comprendre ce que ton silence communique",
    },
  },

  'Q5_sometimes': {
    condition: { question: 'Q5', answer: 'sometimes' },
    fr: {
      icon: '🚧',
      title: "Les territoires interdits",
      preview: "Tu as répondu que ça «dépend du sujet» (Q5). Cela suggère qu'il existe entre vous des zones où la parole circule librement, et d'autres où elle se ████████████...",
      locked: "...où elle se bloque. Ces territoires évités ne sont pas là par hasard — ils protègent peut-être quelque chose de fragile, ou cachent une conversation que vous n'avez jamais vraiment ████████████.",
      emotionalHook: "De quoi n'avez-vous jamais vraiment parlé ?",
      ctaText: "Découvrir tes zones de silence",
    },
  },

  'Q5_mostly': {
    condition: { question: 'Q5', answer: 'mostly' },
    fr: {
      icon: '💭',
      title: "Ce qui reste malgré tout",
      preview: "Tu arrives à parler «la plupart du temps» (Q5). Mais ce sont parfois les exceptions qui comptent le plus. Il y a peut-être un sujet, une pensée, une peur que tu gardes en ████████████...",
      locked: "...que tu gardes en réserve. Ces non-dits occasionnels ont tendance à prendre plus de place qu'on ne le croit — ils peuvent colorer certaines interactions sans que tu en aies pleinement ████████████.",
      emotionalHook: "Quelle est l'exception que tu n'as pas encore partagée ?",
      ctaText: "Explorer ce qui reste en suspens",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 6 — Écoute active
  // ═══════════════════════════════════════════════════════════════════════════

  'Q6_rarely': {
    condition: { question: 'Q6', answer: 'rarely' },
    fr: {
      icon: '👻',
      title: "Quand les mots ne trouvent pas d'écho",
      preview: "Tu as dit te sentir «parler dans le vide» (Q6). Cette sensation d'invisibilité émotionnelle laisse souvent une trace — peut-être un repli progressif, peut-être une lassitude qui s'est installée sans que tu ████████████...",
      locked: "...sans que tu la nommes vraiment. Il y a de fortes chances que tu aies, peu à peu, cessé de partager certaines choses — pas par choix conscient, mais parce que l'énergie de ne pas être entendu(e) finit par ████████████.",
      emotionalHook: "À quel moment as-tu commencé à moins essayer ?",
      ctaText: "Comprendre le cycle du silence",
    },
  },

  'Q6_sometimes': {
    condition: { question: 'Q6', answer: 'sometimes' },
    fr: {
      icon: '🎲',
      title: "L'écoute imprévisible",
      preview: "Tu te sens écouté(e) «parfois» (Q6). Cette inconsistance crée peut-être une forme d'incertitude — tu ne sais jamais vraiment si ce que tu vas dire sera reçu ou ████████████...",
      locked: "...sera reçu ou laissé de côté. Il y a de fortes chances que tu aies développé des stratégies pour «tester» le moment avant de te confier. Cette vigilance constante demande une énergie que tu n'as peut-être pas ████████████.",
      emotionalHook: "Comment sais-tu si c'est le bon moment pour parler ?",
      ctaText: "Décrypter les signaux d'écoute",
    },
  },

  'Q6_mostly': {
    condition: { question: 'Q6', answer: 'mostly' },
    fr: {
      icon: '👂',
      title: "Les moments où l'écoute s'absente",
      preview: "Tu te sens «généralement» écouté(e) (Q6). Mais il y a peut-être des sujets, des moments ou des contextes où cette écoute se fait plus ████████████...",
      locked: "...plus distante. Ces exceptions peuvent sembler mineures, mais elles touchent parfois à quelque chose d'important — un besoin spécifique ou un sujet sensible où tu aurais besoin d'une présence plus ████████████.",
      emotionalHook: "Sur quel sujet aimerais-tu être mieux entendu(e) ?",
      ctaText: "Identifier les angles morts",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 7 — Communication non-verbale
  // ═══════════════════════════════════════════════════════════════════════════

  'Q7_rarely': {
    condition: { question: 'Q7', answer: 'rarely' },
    fr: {
      icon: '🔮',
      title: "Le mystère de l'autre",
      preview: "Tu as indiqué avoir du mal à lire ton/ta partenaire (Q7). Cette opacité peut créer un sentiment d'incertitude permanente — tu te retrouves peut-être à interpréter, à deviner, parfois à ████████████...",
      locked: "...parfois à te tromper. Il y a de fortes chances que certains malentendus récurrents trouvent leur source ici. Ce qui ressemble à un désaccord cache peut-être simplement une difficulté à ████████████.",
      emotionalHook: "Combien de fois as-tu mal interprété un silence ?",
      ctaText: "Apprendre à décoder ce qui n'est pas dit",
    },
  },

  'Q7_sometimes': {
    condition: { question: 'Q7', answer: 'sometimes' },
    fr: {
      icon: '🎯',
      title: "Les signaux brouillés",
      preview: "Tu perçois parfois les signaux mais tu te trompes aussi (Q7). Ce décalage entre ce que tu crois comprendre et ce qui est vraiment ressenti peut créer des ████████████...",
      locked: "...des situations où chacun pense que l'autre a compris, alors que le message est passé à côté. Ces quiproquos silencieux s'accumulent parfois sans que vous vous en rendiez ████████████.",
      emotionalHook: "Quelle a été ta dernière mauvaise interprétation ?",
      ctaText: "Calibrer votre langage non-verbal",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 8 — Confiance au quotidien
  // ═══════════════════════════════════════════════════════════════════════════

  'Q8_rarely': {
    condition: { question: 'Q8', answer: 'rarely' },
    fr: {
      icon: '😰',
      title: "Quand l'absence pèse",
      preview: "Tu ressens du stress quand ton/ta partenaire sort (Q8). Cette anxiété, qu'elle soit née dans cette relation ou qu'elle vienne de plus loin, occupe probablement plus d'espace que tu ne voudrais ████████████...",
      locked: "...que tu ne voudrais l'admettre. Il y a de fortes chances que cette vigilance constante t'épuise — et peut-être aussi qu'elle crée une dynamique où ton/ta partenaire se sent ████████████.",
      emotionalHook: "D'où vient cette peur qui s'active quand l'autre n'est pas là ?",
      ctaText: "Explorer les racines de cette anxiété",
    },
  },

  'Q8_sometimes': {
    condition: { question: 'Q8', answer: 'sometimes' },
    fr: {
      icon: '🌫️',
      title: "Les doutes qui flottent",
      preview: "Tu as «parfois des doutes» (Q8). Ces doutes, même occasionnels, suggèrent qu'une partie de toi reste en alerte. Il y a peut-être eu un moment, un détail, quelque chose qui a semé une graine de ████████████...",
      locked: "...une graine de questionnement. Que ce doute soit fondé ou non, il influence probablement certains de tes comportements — peut-être des questions que tu poses, ou que tu n'oses pas ████████████.",
      emotionalHook: "Qu'est-ce qui a fait naître ce premier doute ?",
      ctaText: "Démêler le doute de la réalité",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 9 — Transparence
  // ═══════════════════════════════════════════════════════════════════════════

  'Q9_partial': {
    condition: { question: 'Q9', answer: 'partial' },
    fr: {
      icon: '🌑',
      title: "Les zones d'ombre entre vous",
      preview: "Tu reconnais qu'il existe des «zones d'ombre» (Q9). Ces espaces non éclairés ne sont pas forcément menaçants, mais ils créent une forme d'incertitude qui peut ████████████...",
      locked: "...qui peut influencer la confiance au quotidien. Peut-être que ces zones existent par pudeur, par protection, ou par habitude. Comprendre ce qu'elles contiennent — ou pourquoi elles existent — pourrait changer ████████████.",
      emotionalHook: "Que protègent ces zones d'ombre ?",
      ctaText: "Cartographier ce qui reste dans l'ombre",
    },
  },

  'Q9_low': {
    condition: { question: 'Q9', answer: 'low' },
    fr: {
      icon: '🕳️',
      title: "Ce qui reste dans le flou",
      preview: "La transparence est «faible» entre vous (Q9). Ce niveau de flou, qu'il soit choisi ou subi, crée probablement un espace où les suppositions prennent la place des ████████████...",
      locked: "...la place des certitudes. Il y a de fortes chances que vous fonctionniez tous les deux avec des hypothèses sur l'autre — certaines peut-être justes, d'autres probablement ████████████.",
      emotionalHook: "Que crois-tu savoir sans vraiment savoir ?",
      ctaText: "Voir ce qui se cache dans le flou",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 10 — Intimité émotionnelle
  // ═══════════════════════════════════════════════════════════════════════════

  'Q10_somewhat': {
    condition: { question: 'Q10', answer: 'somewhat' },
    fr: {
      icon: '🏊',
      title: "La surface confortable",
      preview: "Vous restez «parfois en surface» émotionnellement (Q10). Cette distance n'est pas forcément un problème — mais elle peut aussi être le signe d'une forme de protection qui s'est installée ████████████...",
      locked: "...qui s'est installée progressivement. Il y a peut-être eu un moment où aller plus profond semblait risqué, ou un sujet où la vulnérabilité n'a pas été bien ████████████.",
      emotionalHook: "Qu'est-ce qui vous retient d'aller plus profond ?",
      ctaText: "Comprendre ce qui maintient la surface",
    },
  },

  'Q10_not': {
    condition: { question: 'Q10', answer: 'not' },
    fr: {
      icon: '🧊',
      title: "La distance qui s'est installée",
      preview: "Tu te sens «distant(e)» de ton/ta partenaire (Q10). Cette déconnexion émotionnelle ne s'est probablement pas installée du jour au lendemain — elle a peut-être grandi lentement, presque sans que tu ████████████...",
      locked: "...sans que tu t'en rendes compte. Il y a de fortes chances que cette distance serve à quelque chose — peut-être à te protéger, peut-être à éviter quelque chose de plus ████████████.",
      emotionalHook: "Quand as-tu senti cette distance pour la première fois ?",
      ctaText: "Explorer ce que cette distance protège",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 11 — Intimité physique
  // ═══════════════════════════════════════════════════════════════════════════

  'Q11_somewhat': {
    condition: { question: 'Q11', answer: 'somewhat' },
    fr: {
      icon: '💔',
      title: "Les frustrations silencieuses",
      preview: "Tu as mentionné des «frustrations» sur l'intimité physique (Q11). Ces frustrations, qu'elles soient exprimées ou gardées pour toi, créent probablement une forme de tension qui peut se manifester ████████████...",
      locked: "...se manifester ailleurs — dans l'humeur, dans la patience, dans la façon dont vous vous parlez. Il y a de fortes chances que quelque chose reste non-dit sur ce sujet, peut-être par peur de ████████████.",
      emotionalHook: "Qu'est-ce que tu n'as pas osé demander ?",
      ctaText: "Mettre des mots sur ces frustrations",
    },
  },

  'Q11_not': {
    condition: { question: 'Q11', answer: 'not' },
    fr: {
      icon: '🚫',
      title: "Quand l'intimité ne comble plus",
      preview: "Tu n'es «pas du tout satisfait(e)» de votre intimité physique (Q11). Ce niveau d'insatisfaction porte souvent en lui quelque chose de plus profond — peut-être un besoin qui n'est pas entendu, peut-être une distance qui s'est creusée ████████████...",
      locked: "...qui s'est creusée progressivement. L'intimité physique est rarement isolée du reste — elle reflète souvent ce qui se passe sur d'autres plans. Comprendre cette connexion pourrait ████████████.",
      emotionalHook: "Est-ce vraiment une question de corps, ou d'autre chose ?",
      ctaText: "Comprendre ce que cette insatisfaction révèle",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 12 — Déroulement des conflits
  // ═══════════════════════════════════════════════════════════════════════════

  'Q12_escalate': {
    condition: { question: 'Q12', answer: 'escalate' },
    fr: {
      icon: '🌋',
      title: "Quand les mots dépassent la pensée",
      preview: "Tu as indiqué que vos disputes «dégénèrent» souvent (Q12). Cette escalade, une fois enclenchée, semble prendre sa propre vie — comme si quelque chose de plus grand que le sujet initial prenait le ████████████...",
      locked: "...prenait le dessus. Il y a de fortes chances que ces moments d'intensité touchent à quelque chose de profond chez l'un ou l'autre — des sensibilités anciennes qui se réveillent, ou des besoins fondamentaux qui ne trouvent pas ████████████.",
      emotionalHook: "Qu'est-ce qui s'exprime vraiment dans ces moments d'explosion ?",
      ctaText: "Décoder ce qui se cache derrière l'escalade",
    },
  },

  'Q12_avoid': {
    condition: { question: 'Q12', answer: 'avoid' },
    fr: {
      icon: '🙈',
      title: "Le poids de ce qui n'est pas dit",
      preview: "Vous «évitez» les sujets de désaccord (Q12). Ce choix de la paix apparente a probablement un prix — les choses non dites ne disparaissent pas, elles trouvent d'autres façons de ████████████...",
      locked: "...de se manifester. Il y a de fortes chances que certaines tensions ressortent autrement — dans des remarques détournées, dans une distance progressive, ou dans une accumulation qui attend peut-être un ████████████.",
      emotionalHook: "De quoi n'avez-vous toujours pas parlé ?",
      ctaText: "Voir ce qui s'accumule dans le silence",
    },
  },

  'Q12_argue': {
    condition: { question: 'Q12', answer: 'argue' },
    fr: {
      icon: '🎢',
      title: "Le cycle dispute-réconciliation",
      preview: "Vous vous disputez puis vous réconciliez (Q12). Ce cycle peut sembler sain — après tout, vous finissez par vous retrouver. Mais il arrive que ces réconciliations passent un peu vite sur ████████████...",
      locked: "...sur le fond du problème. La réconciliation apaise, mais elle ne résout pas toujours. Il y a peut-être des sujets qui reviennent régulièrement parce qu'ils n'ont jamais été vraiment ████████████.",
      emotionalHook: "Quel sujet revient encore et encore malgré les réconciliations ?",
      ctaText: "Identifier ce qui n'est pas vraiment résolu",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 13 — Réparation après conflit
  // ═══════════════════════════════════════════════════════════════════════════

  'Q13_rarely': {
    condition: { question: 'Q13', answer: 'rarely' },
    fr: {
      icon: '🎭',
      title: "Le théâtre du 'tout va bien'",
      preview: "Vous faites «comme si de rien n'était» après les disputes (Q13). Cette stratégie permet d'avancer — mais elle laisse peut-être des traces qui ne disparaissent pas vraiment, juste parce qu'on ne les ████████████...",
      locked: "...parce qu'on ne les regarde pas. Il y a de fortes chances que certaines blessures soient encore là, quelque part, attendant peut-être un mot, une reconnaissance, ou simplement une ████████████.",
      emotionalHook: "Combien de fois as-tu fait semblant que c'était oublié ?",
      ctaText: "Voir ce qui attend encore d'être dit",
    },
  },

  'Q13_never': {
    condition: { question: 'Q13', answer: 'never' },
    fr: {
      icon: '📦',
      title: "Ce qui s'empile sans se dire",
      preview: "Les tensions «s'accumulent» sans être évacuées (Q13). Chaque non-dit, chaque frustration avalée, chaque blessure ignorée prend sa place quelque part — et cet espace a probablement ses ████████████...",
      locked: "...ses limites. Il y a de fortes chances que cette accumulation se manifeste d'une façon ou d'une autre — peut-être dans une fatigue, une distance, ou des moments où tout semble soudain trop ████████████.",
      emotionalHook: "Que se passera-t-il quand il n'y aura plus de place ?",
      ctaText: "Mesurer ce qui s'est accumulé",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 14 — Capacité à pardonner
  // ═══════════════════════════════════════════════════════════════════════════

  'Q14_grudge': {
    condition: { question: 'Q14', answer: 'grudge' },
    fr: {
      icon: '⚗️',
      title: "Ce que tu portes encore",
      preview: "Tu as reconnu «garder rancune» (Q14). Cette rancune, qu'elle soit grande ou petite, occupe probablement un espace dans ta relation — elle peut teinter certains moments, certaines réactions, sans que ce soit toujours ████████████...",
      locked: "...toujours visible. Il y a de fortes chances qu'elle ressorte dans des moments inattendus — peut-être dans une remarque, un ton, ou une résistance à quelque chose qui, en surface, semble sans ████████████.",
      emotionalHook: "Qu'est-ce que tu n'as pas encore réussi à lâcher ?",
      ctaText: "Explorer ce que cette rancune protège",
    },
  },

  'Q14_struggle': {
    condition: { question: 'Q14', answer: 'struggle' },
    fr: {
      icon: '📖',
      title: "La page qui résiste",
      preview: "Tu as du mal à «tourner la page» (Q14). Cette difficulté n'est pas un défaut — elle dit peut-être quelque chose d'important sur ce qui a été touché. Certaines blessures demandent plus que du temps pour ████████████...",
      locked: "...pour guérir. Il y a de fortes chances que ce blocage soit lié à quelque chose de profond — un besoin qui n'a pas été reconnu, ou une douleur qui n'a pas trouvé les mots pour ████████████.",
      emotionalHook: "Qu'est-ce qui a été touché si profondément ?",
      ctaText: "Comprendre ce qui empêche la page de tourner",
    },
  },

  'Q14_time': {
    condition: { question: 'Q14', answer: 'time' },
    fr: {
      icon: '⏳',
      title: "Le pardon qui prend son temps",
      preview: "Tu pardonnes, mais tu as «besoin de temps» (Q14). Ce rythme est le tien, et il n'y a rien de mal à ça. Mais il arrive que pendant ce temps, quelque chose reste en suspens — une tension légère, une distance subtile qui ████████████...",
      locked: "...qui marque l'entre-deux. Il y a peut-être quelque chose qui aiderait ce processus à être moins lourd — une parole, une reconnaissance, ou simplement une façon de traverser ce temps ████████████.",
      emotionalHook: "De quoi aurais-tu besoin pour que ce temps soit plus léger ?",
      ctaText: "Explorer ce qui faciliterait le pardon",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 15 — Blessures passées
  // ═══════════════════════════════════════════════════════════════════════════

  'Q15_some': {
    condition: { question: 'Q15', answer: 'some' },
    fr: {
      icon: '🩹',
      title: "Les sujets qui font encore mal",
      preview: "«Certains sujets restent douloureux» (Q15). Ces zones sensibles sont probablement connues de vous deux — vous les contournez peut-être, ou vous y entrez parfois par accident et vous sentez la ████████████...",
      locked: "...la tension monter. Il y a de fortes chances que ces sujets soient liés à quelque chose qui n'a pas été complètement traité — pas forcément un événement précis, mais peut-être une façon de se sentir qui a laissé ████████████.",
      emotionalHook: "Quel sujet évitez-vous sans en parler ouvertement ?",
      ctaText: "Identifier ce qui reste sensible",
    },
  },

  'Q15_heavy': {
    condition: { question: 'Q15', answer: 'heavy' },
    fr: {
      icon: '🏋️',
      title: "Le poids qui reste",
      preview: "Le passé «pèse lourdement» sur vous (Q15). Ce poids n'est pas imaginaire — il se fait probablement sentir dans des moments du quotidien, dans une forme de fatigue, ou dans une difficulté à ████████████...",
      locked: "...à avancer comme vous le voudriez. Il y a de fortes chances que ce poids nécessite quelque chose pour s'alléger — peut-être des mots qui n'ont pas été dits, ou un chemin que vous n'avez pas encore trouvé ████████████.",
      emotionalHook: "Depuis quand portez-vous ce poids ensemble ?",
      ctaText: "Comprendre ce qui alourdit",
    },
  },

  'Q15_working': {
    condition: { question: 'Q15', answer: 'working' },
    fr: {
      icon: '🔧',
      title: "Le chantier en cours",
      preview: "Vous «travaillez» sur les blessures passées (Q15). C'est un signe de volonté — mais ce travail peut parfois sembler long, ou donner l'impression de stagner. Il y a peut-être des moments où tu te demandes si ████████████...",
      locked: "...si ça avance vraiment. Les chemins de guérison ne sont pas linéaires — il y a de fortes chances que certains jours soient plus difficiles que d'autres, et que le progrès ne soit pas toujours ████████████.",
      emotionalHook: "Qu'est-ce qui te montrerait que vous avancez vraiment ?",
      ctaText: "Voir où vous en êtes sur ce chemin",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 16 — Vision du futur
  // ═══════════════════════════════════════════════════════════════════════════

  'Q16_never': {
    condition: { question: 'Q16', answer: 'never' },
    fr: {
      icon: '🔮',
      title: "L'avenir en suspens",
      preview: "Vous n'avez «jamais vraiment parlé» de l'avenir (Q16). Ce silence peut avoir plusieurs raisons — peut-être que le moment n'est jamais venu, peut-être qu'une partie de vous préfère ne pas ████████████...",
      locked: "...ne pas savoir. Il y a de fortes chances que certaines questions non posées créent une forme d'incertitude silencieuse — sur ce que l'autre veut vraiment, ou sur ce qui pourrait arriver si vos visions ne ████████████.",
      emotionalHook: "Qu'est-ce que tu n'as jamais osé lui demander sur l'avenir ?",
      ctaText: "Explorer ce qui n'a jamais été dit sur demain",
    },
  },

  'Q16_different': {
    condition: { question: 'Q16', answer: 'different' },
    fr: {
      icon: '↔️',
      title: "Les chemins qui divergent",
      preview: "Vous voulez «des choses différentes» (Q16). Cette divergence est peut-être claire entre vous, ou peut-être qu'elle reste en partie non dite. Dans tous les cas, elle pose une question importante sur ████████████...",
      locked: "...sur comment avancer ensemble quand les directions ne sont pas les mêmes. Il y a de fortes chances que cette différence crée une forme de tension — explicite ou souterraine — qui influence la façon dont vous vous projetez ████████████.",
      emotionalHook: "Cette différence est-elle une impasse ou un sujet ouvert ?",
      ctaText: "Comprendre ce que cette divergence implique",
    },
  },

  'Q16_somewhat': {
    condition: { question: 'Q16', answer: 'somewhat' },
    fr: {
      icon: '🌤️',
      title: "L'alignement partiel",
      preview: "Vous êtes «à peu près alignés» sur l'avenir (Q16). Ce «à peu près» laisse peut-être un espace où certaines nuances n'ont pas été explorées — des détails qui pourraient révéler des différences plus ████████████...",
      locked: "...plus importantes qu'il n'y paraît. Il y a peut-être des sujets où vous supposez être d'accord sans l'avoir vraiment vérifié, ou des questions que vous évitez de peur de découvrir ████████████.",
      emotionalHook: "Sur quoi n'êtes-vous pas tout à fait d'accord ?",
      ctaText: "Explorer les zones floues de votre vision commune",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 17 — Projets concrets
  // ═══════════════════════════════════════════════════════════════════════════

  'Q17_none': {
    condition: { question: 'Q17', answer: 'none' },
    fr: {
      icon: '📅',
      title: "Le quotidien sans horizon",
      preview: "Vous vivez «au jour le jour» (Q17). Ce mode peut convenir à certaines périodes — mais il peut aussi être le signe que quelque chose retient l'un ou l'autre de se projeter ████████████...",
      locked: "...de se projeter plus loin. Il y a peut-être une forme d'hésitation non dite — sur l'engagement, sur l'avenir, ou simplement sur ce que construire ensemble signifierait ████████████.",
      emotionalHook: "Qu'est-ce qui vous retient de vous projeter ?",
      ctaText: "Explorer ce qui freine la projection",
    },
  },

  'Q17_separate': {
    condition: { question: 'Q17', answer: 'separate' },
    fr: {
      icon: '🚶‍♂️🚶‍♀️',
      title: "Deux chemins parallèles",
      preview: "Vous faites «vos plans chacun de votre côté» (Q17). Cette indépendance peut être un choix assumé — mais elle peut aussi refléter une forme de distance qui s'est installée, peut-être sans que vous l'ayez vraiment ████████████...",
      locked: "...vraiment décidée. Il y a de fortes chances que cette séparation des projets dise quelque chose sur la place que l'autre occupe dans ta vision de l'avenir — ou sur une incertitude que tu n'as peut-être pas encore ████████████.",
      emotionalHook: "Êtes-vous indépendants par choix ou par protection ?",
      ctaText: "Comprendre ce que cette séparation révèle",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 18 — Espace personnel
  // ═══════════════════════════════════════════════════════════════════════════

  'Q18_lacking': {
    condition: { question: 'Q18', answer: 'lacking' },
    fr: {
      icon: '😤',
      title: "Quand l'air vient à manquer",
      preview: "Tu te sens «étouffé(e)» (Q18). Ce sentiment, qu'il soit constant ou par vagues, suggère que quelque chose dans l'équilibre actuel ne te laisse pas assez de place pour ████████████...",
      locked: "...pour respirer. Il y a de fortes chances que ce manque d'espace génère une forme de tension — peut-être une envie de fuir par moments, ou une frustration qui ne trouve pas toujours les mots pour ████████████.",
      emotionalHook: "Qu'est-ce que tu as mis de côté depuis que tu es en couple ?",
      ctaText: "Identifier ce qui te manque pour respirer",
    },
  },

  'Q18_no': {
    condition: { question: 'Q18', answer: 'no' },
    fr: {
      icon: '🌊',
      title: "Quand la relation envahit tout",
      preview: "Ta relation «prend toute la place» (Q18). Ce niveau de fusion peut sembler intense — mais il peut aussi créer une forme de dépendance où tu ne sais plus vraiment où tu ████████████...",
      locked: "...où tu commences et où l'autre finit. Il y a de fortes chances que certaines parties de toi — des envies, des besoins, des aspects de ta personnalité — soient passées au second plan, parfois sans que tu en aies pleinement ████████████.",
      emotionalHook: "Qui es-tu quand tu n'es pas dans cette relation ?",
      ctaText: "Retrouver les contours de toi-même",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 19 — Identité propre
  // ═══════════════════════════════════════════════════════════════════════════

  'Q19_lost': {
    condition: { question: 'Q19', answer: 'lost' },
    fr: {
      icon: '🧭',
      title: "Les morceaux de toi laissés en chemin",
      preview: "Tu t'es «un peu perdu(e)» (Q19). Cette sensation suggère que certaines parties de qui tu es ont peut-être été mises entre parenthèses — des passions, des habitudes, des façons d'être que tu avais avant ████████████...",
      locked: "...avant cette relation. Il y a de fortes chances que ces morceaux te manquent parfois — dans des moments de nostalgie, ou quand tu te demandes si tu es encore vraiment ████████████.",
      emotionalHook: "Quelle partie de toi te manque le plus ?",
      ctaText: "Retrouver les morceaux de ton identité",
    },
  },

  'Q19_no': {
    condition: { question: 'Q19', answer: 'no' },
    fr: {
      icon: '👤',
      title: "Quand on s'oublie soi-même",
      preview: "Tu as «l'impression de t'être oublié(e)» (Q19). C'est une sensation profonde qui va au-delà de quelques compromis — elle touche peut-être à quelque chose de fondamental sur qui tu es et ce que tu veux ████████████...",
      locked: "...ce que tu veux vraiment. Il y a de fortes chances que cette perte d'identité génère un malaise diffus — une forme de vide ou d'insatisfaction dont la source n'est pas toujours ████████████.",
      emotionalHook: "Sais-tu encore ce que TU veux, indépendamment du couple ?",
      ctaText: "Explorer cette perte et ce qu'elle cache",
    },
  },
};
```