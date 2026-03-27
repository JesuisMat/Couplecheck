import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  // --- Bloc 1 : Segmentation (Q1–Q4) ---
  {
    id: "Q1",
    type: "single",
    dimension: null,
    hint: {
      fr: "Chaque tranche d'âge apporte une vision unique de l'amour. Il n'y a pas d'âge idéal pour une relation épanouie — l'important, c'est d'être là.",
      en: "Every age brings a unique perspective on love. There's no ideal age for a fulfilling relationship — what matters is showing up.",
    },
    text: {
      fr: "Quel est ton âge ?",
      en: "How old are you?",
    },
    options: [
      { text: { fr: "18-24 ans", en: "18-24 years old" }, value: "18-24" },
      { text: { fr: "25-29 ans", en: "25-29 years old" }, value: "25-29" },
      { text: { fr: "30-35 ans", en: "30-35 years old" }, value: "30-35" },
      { text: { fr: "36 ans ou plus", en: "36 or older" }, value: "36+" },
    ],
  },
  {
    id: "Q2",
    type: "single",
    dimension: null,
    hint: {
      fr: "Cette information nous aide à personnaliser les conseils de ton rapport selon ton vécu et tes perspectives. Aucune réponse n'est meilleure qu'une autre.",
      en: "This helps us tailor the advice in your report to your experience and perspective. No answer is better than another.",
    },
    text: {
      fr: "Tu es...",
      en: "You are...",
    },
    options: [
      { text: { fr: "Une femme", en: "A woman" }, value: "woman" },
      { text: { fr: "Un homme", en: "A man" }, value: "man" },
      { text: { fr: "Non-binaire / Autre", en: "Non-binary / Other" }, value: "other" },
    ],
  },
  {
    id: "Q3",
    type: "single",
    dimension: null,
    hint: {
      fr: "La durée d'une relation n'est pas un indicateur de qualité. Chaque étape — de quelques mois à plusieurs années — a ses propres défis et richesses.",
      en: "Relationship length isn't a quality indicator. Every stage — from a few months to many years — has its own challenges and gifts.",
    },
    text: {
      fr: "Depuis combien de temps êtes-vous ensemble ?",
      en: "How long have you been together?",
    },
    options: [
      { text: { fr: "Moins de 6 mois", en: "Less than 6 months" }, value: "<6m" },
      { text: { fr: "6 mois à 1 an", en: "6 months to 1 year" }, value: "6m-1y" },
      { text: { fr: "1 à 2 ans", en: "1 to 2 years" }, value: "1-2y" },
      { text: { fr: "2 à 5 ans", en: "2 to 5 years" }, value: "2-5y" },
      { text: { fr: "Plus de 5 ans", en: "More than 5 years" }, value: "5y+" },
    ],
  },
  {
    id: "Q4",
    type: "single",
    dimension: null,
    hint: {
      fr: "Il n'y a pas de « bonne » situation relationnelle. L'honnêteté avec toi-même est le point de départ de toute transformation positive.",
      en: "There's no 'right' relationship status. Honesty with yourself is the starting point for any positive transformation.",
    },
    text: {
      fr: "Comment décrirais-tu ta situation actuelle ?",
      en: "How would you describe your current situation?",
    },
    options: [
      { text: { fr: "En couple", en: "In a relationship" }, value: "couple" },
      { text: { fr: "Marié(e) / Pacsé(e)", en: "Married / Civil union" }, value: "married" },
      { text: { fr: "Fiancé(e)", en: "Engaged" }, value: "engaged" },
      { text: { fr: "C'est compliqué", en: "It's complicated" }, value: "complicated" },
    ],
  },

  // --- Bloc 2 : Communication (Q5–Q7) ---
  {
    id: "Q5",
    type: "single",
    dimension: "communication",
    hint: {
      fr: "La communication saine, c'est pouvoir exprimer ce qu'on ressent sans peur du jugement — et savoir que l'autre va vraiment écouter.",
      en: "Healthy communication means expressing feelings without fear of judgment — and knowing your partner will truly listen.",
    },
    text: {
      fr: "Quand quelque chose te tracasse, tu arrives à en parler à ton/ta partenaire ?",
      en: "When something bothers you, are you able to talk about it with your partner?",
    },
    options: [
      { text: { fr: "Oui, facilement et sans crainte", en: "Yes, easily and without fear" }, value: "always", score: 100 },
      { text: { fr: "La plupart du temps, oui", en: "Most of the time, yes" }, value: "most", score: 75 },
      { text: { fr: "Ça dépend du sujet", en: "It depends on the topic" }, value: "sometimes", score: 50 },
      { text: { fr: "Non, je garde souvent pour moi", en: "No, I often keep it to myself" }, value: "rarely", score: 25 },
    ],
  },
  {
    id: "Q6",
    type: "single",
    dimension: "communication",
    hint: {
      fr: "Se sentir écouté·e va au-delà des mots — c'est le sentiment que l'autre comprend vraiment ce que tu ressens, pas juste ce que tu dis.",
      en: "Feeling heard goes beyond words — it's the sense that your partner truly understands what you feel, not just what you say.",
    },
    text: {
      fr: "Quand tu parles de tes émotions, tu te sens vraiment écouté(e) et compris(e) ?",
      en: "When you share your emotions, do you feel truly heard and understood?",
    },
    options: [
      { text: { fr: "Oui, toujours", en: "Yes, always" }, value: "completely", score: 100 },
      { text: { fr: "Généralement oui", en: "Generally yes" }, value: "generally", score: 75 },
      { text: { fr: "Pas toujours, ça dépend", en: "Not always, it depends" }, value: "not_really", score: 50 },
      { text: { fr: "Rarement, j'ai l'impression de parler dans le vide", en: "Rarely, I feel like I'm talking to a wall" }, value: "no", score: 25 },
    ],
  },
  {
    id: "Q7",
    type: "single",
    dimension: "communication",
    hint: {
      fr: "La communication non-verbale représente plus de 70 % des échanges dans un couple. Se comprendre sans les mots, c'est un signe fort de connexion profonde.",
      en: "Non-verbal communication accounts for over 70% of exchanges in a couple. Understanding each other without words is a strong sign of deep connection.",
    },
    text: {
      fr: "Est-ce que tu arrives à comprendre ce que ton/ta partenaire ressent, même sans qu'il/elle parle ?",
      en: "Can you understand what your partner feels, even without them speaking?",
    },
    options: [
      { text: { fr: "Oui, on se comprend d'un regard", en: "Yes, we understand each other with just a look" }, value: "look", score: 100 },
      { text: { fr: "Souvent, je perçois les signaux", en: "Often, I pick up on the signals" }, value: "often", score: 75 },
      { text: { fr: "Parfois, mais je me trompe aussi", en: "Sometimes, but I also get it wrong" }, value: "sometimes", score: 50 },
      { text: { fr: "Non, c'est difficile de savoir ce qu'il/elle pense", en: "No, it's hard to know what they're thinking" }, value: "no", score: 25 },
    ],
  },

  // --- Bloc 3 : Confiance (Q8–Q9) ---
  {
    id: "Q8",
    type: "single",
    dimension: "trust",
    hint: {
      fr: "La confiance se construit sur la cohérence entre les paroles et les actes au quotidien — pas uniquement lors des grands moments.",
      en: "Trust is built on consistency between words and actions in daily life — not just during big moments.",
    },
    text: {
      fr: "Tu fais confiance à ton/ta partenaire quand il/elle sort sans toi ?",
      en: "Do you trust your partner when they go out without you?",
    },
    options: [
      { text: { fr: "Oui, totalement", en: "Yes, completely" }, value: "totally", score: 100 },
      { text: { fr: "Oui, la plupart du temps", en: "Yes, most of the time" }, value: "most", score: 75 },
      { text: { fr: "J'ai parfois des doutes ou des inquiétudes", en: "I sometimes have doubts or worries" }, value: "doubts", score: 50 },
      { text: { fr: "Non, ça me stresse ou me rend anxieux(se)", en: "No, it stresses me or makes me anxious" }, value: "stressed", score: 25 },
    ],
  },
  {
    id: "Q9",
    type: "single",
    dimension: "trust",
    hint: {
      fr: "La transparence ne signifie pas l'absence totale de vie privée, mais l'absence de secrets qui pourraient fragiliser la confiance.",
      en: "Transparency doesn't mean no privacy — it means the absence of secrets that could undermine trust.",
    },
    text: {
      fr: "Comment décrirais-tu la transparence entre vous ? (téléphone, réseaux, argent, sorties)",
      en: "How would you describe the transparency between you? (phone, social media, money, outings)",
    },
    options: [
      { text: { fr: "Totale — on n'a rien à se cacher", en: "Complete — we have nothing to hide" }, value: "open", score: 100 },
      { text: { fr: "Bonne — on partage l'essentiel", en: "Good — we share the essentials" }, value: "generally", score: 75 },
      { text: { fr: "Partielle — il y a des zones d'ombre", en: "Partial — there are some gray areas" }, value: "gray_areas", score: 50 },
      { text: { fr: "Faible — beaucoup de choses restent floues", en: "Low — many things remain unclear" }, value: "opaque", score: 25 },
    ],
  },

  // --- Bloc 4 : Intimité (Q10–Q11) ---
  {
    id: "Q10",
    type: "single",
    dimension: "intimacy",
    hint: {
      fr: "L'intimité émotionnelle, c'est pouvoir être pleinement soi-même avec l'autre — vulnérabilités comprises. C'est le socle de toute connexion durable.",
      en: "Emotional intimacy means being fully yourself with your partner — including your vulnerabilities. It's the foundation of any lasting connection.",
    },
    text: {
      fr: "Te sens-tu émotionnellement proche de ton/ta partenaire ?",
      en: "Do you feel emotionally close to your partner?",
    },
    options: [
      { text: { fr: "Oui, on partage tout — même nos vulnérabilités", en: "Yes, we share everything — even our vulnerabilities" }, value: "all", score: 100 },
      { text: { fr: "Globalement oui, on est connectés", en: "Generally yes, we're connected" }, value: "mostly", score: 75 },
      { text: { fr: "Moyennement — on reste parfois en surface", en: "Somewhat — we sometimes stay on the surface" }, value: "somewhat", score: 50 },
      { text: { fr: "Non, je me sens distant(e) ou déconnecté(e)", en: "No, I feel distant or disconnected" }, value: "distant", score: 25 },
    ],
  },
  {
    id: "Q11",
    type: "single",
    dimension: "intimacy",
    hint: {
      fr: "L'intimité physique englobe bien plus que la sexualité — les câlins, la tendresse, les petits gestes du quotidien. Ces deux composantes se nourrissent mutuellement.",
      en: "Physical intimacy encompasses much more than sexuality — hugs, tenderness, everyday gestures. These two components feed each other.",
    },
    text: {
      fr: "Es-tu satisfait(e) de votre intimité physique ? (tendresse, sexualité, contact)",
      en: "Are you satisfied with your physical intimacy? (affection, sexuality, touch)",
    },
    options: [
      { text: { fr: "Très satisfait(e)", en: "Very satisfied" }, value: "very", score: 100 },
      { text: { fr: "Plutôt satisfait(e)", en: "Mostly satisfied" }, value: "mostly", score: 75 },
      { text: { fr: "Moyennement — il y a des frustrations", en: "Somewhat — there are some frustrations" }, value: "somewhat", score: 50 },
      { text: { fr: "Pas du tout satisfait(e)", en: "Not satisfied at all" }, value: "not_at_all", score: 25 },
    ],
  },

  // --- Bloc 5 : Gestion des conflits (Q12–Q13) ---
  {
    id: "Q12",
    type: "single",
    dimension: "conflict",
    hint: {
      fr: "Un désaccord bien géré peut renforcer la relation. Ce qui compte, c'est comment vous traversez ces moments — pas leur existence.",
      en: "A well-handled disagreement can strengthen the relationship. What matters is how you get through these moments — not whether they happen.",
    },
    text: {
      fr: "Quand vous n'êtes pas d'accord, comment ça se passe généralement ?",
      en: "When you disagree, how does it usually go?",
    },
    options: [
      { text: { fr: "On discute calmement jusqu'à trouver un terrain d'entente", en: "We discuss calmly until we find common ground" }, value: "calm", score: 100 },
      { text: { fr: "On se dispute mais on finit par se réconcilier", en: "We argue but eventually make up" }, value: "argue_makeup", score: 65 },
      { text: { fr: "Ça dégénère souvent — cris, mots blessants", en: "It often escalates — yelling, hurtful words" }, value: "escalates", score: 35 },
      { text: { fr: "On évite le sujet — rien n'est jamais vraiment résolu", en: "We avoid the topic — nothing ever gets resolved" }, value: "avoid", score: 25 },
    ],
  },
  {
    id: "Q13",
    type: "single",
    dimension: "conflict",
    hint: {
      fr: "La capacité à se réconcilier après un conflit — vraiment, pas juste passer à autre chose — est l'un des meilleurs indicateurs d'une relation durable.",
      en: "The ability to truly reconcile after a conflict — not just move on — is one of the strongest indicators of a lasting relationship.",
    },
    text: {
      fr: "Après une dispute, vous arrivez à en reparler et à vous excuser ?",
      en: "After an argument, are you able to talk about it and apologize?",
    },
    options: [
      { text: { fr: "Oui, toujours — on débriefe et on s'excuse sincèrement", en: "Yes, always — we debrief and sincerely apologize" }, value: "always", score: 100 },
      { text: { fr: "La plupart du temps", en: "Most of the time" }, value: "most", score: 75 },
      { text: { fr: "Rarement — on fait comme si de rien n'était", en: "Rarely — we pretend nothing happened" }, value: "rarely", score: 40 },
      { text: { fr: "Jamais — les tensions s'accumulent", en: "Never — tensions build up" }, value: "never", score: 20 },
    ],
  },

  // --- Bloc 6 : Pardon & Résilience (Q14–Q15) ---
  {
    id: "Q14",
    type: "single",
    dimension: "forgiveness",
    hint: {
      fr: "Le pardon n'est pas pour l'autre — il est pour toi. Selon les recherches de Worthington, la capacité à pardonner est l'un des meilleurs prédicteurs d'une relation épanouie.",
      en: "Forgiveness isn't for the other person — it's for you. Worthington's research shows forgiveness is one of the strongest predictors of a thriving relationship.",
    },
    text: {
      fr: "Quand ton/ta partenaire te blesse (même involontairement), tu arrives à lui pardonner ?",
      en: "When your partner hurts you (even unintentionally), are you able to forgive them?",
    },
    options: [
      { text: { fr: "Oui, je pardonne et je passe à autre chose", en: "Yes, I forgive and move on" }, value: "yes", score: 100 },
      { text: { fr: "Oui, mais j'ai besoin de temps", en: "Yes, but I need time" }, value: "time", score: 75 },
      { text: { fr: "Difficilement — je garde rancune un moment", en: "With difficulty — I hold a grudge for a while" }, value: "grudge", score: 45 },
      { text: { fr: "Non, j'ai du mal à tourner la page", en: "No, I struggle to let go" }, value: "struggle", score: 25 },
    ],
  },
  {
    id: "Q15",
    type: "single",
    dimension: "forgiveness",
    hint: {
      fr: "Les blessures non résolues sont comme des épines dans le tissu du couple. Les identifier est la première étape pour les dépasser ensemble.",
      en: "Unresolved hurts are like thorns in the fabric of your relationship. Identifying them is the first step to moving past them together.",
    },
    text: {
      fr: "Y a-t-il des blessures ou des erreurs passées qui affectent encore votre relation aujourd'hui ?",
      en: "Are there past hurts or mistakes that still affect your relationship today?",
    },
    options: [
      { text: { fr: "Non, on a réussi à tout dépasser ensemble", en: "No, we've managed to move past everything together" }, value: "none", score: 100 },
      { text: { fr: "Un peu, mais on travaille dessus", en: "A little, but we're working on it" }, value: "working", score: 70 },
      { text: { fr: "Oui, certains sujets restent douloureux", en: "Yes, some topics remain painful" }, value: "some", score: 40 },
      { text: { fr: "Oui, ça pèse lourdement sur nous", en: "Yes, it weighs heavily on us" }, value: "heavy", score: 20 },
    ],
  },

  // --- Bloc 7 : Projets communs (Q16–Q17) ---
  {
    id: "Q16",
    type: "single",
    dimension: "projects",
    hint: {
      fr: "L'alignement sur les grandes valeurs de fond (famille, mode de vie, ambitions) compte plus que les détails pratiques, qui peuvent toujours s'ajuster.",
      en: "Alignment on core values (family, lifestyle, ambitions) matters more than practical details, which can always be adjusted.",
    },
    text: {
      fr: "Vous partagez une vision commune de l'avenir ? (enfants, lieu de vie, carrière, style de vie)",
      en: "Do you share a common vision for the future? (children, living situation, career, lifestyle)",
    },
    options: [
      { text: { fr: "Oui, on est totalement alignés", en: "Yes, we're completely aligned" }, value: "aligned", score: 100 },
      { text: { fr: "Sur la plupart des sujets, oui", en: "On most topics, yes" }, value: "most", score: 75 },
      { text: { fr: "On n'en a jamais vraiment parlé", en: "We've never really talked about it" }, value: "never_talked", score: 45 },
      { text: { fr: "Non, on veut des choses différentes", en: "No, we want different things" }, value: "different", score: 25 },
    ],
  },
  {
    id: "Q17",
    type: "single",
    dimension: "projects",
    hint: {
      fr: "Les projets communs créent un sentiment de « nous ». Même un seul projet partagé peut considérablement renforcer le lien entre deux partenaires.",
      en: "Shared projects create a sense of 'us'. Even one shared project can significantly strengthen the bond between two partners.",
    },
    text: {
      fr: "Avez-vous des projets concrets que vous construisez ensemble ? (voyages, logement, épargne, famille...)",
      en: "Do you have concrete projects you're building together? (travel, home, savings, family...)",
    },
    options: [
      { text: { fr: "Oui, plusieurs — on avance main dans la main", en: "Yes, several — we're moving forward hand in hand" }, value: "many", score: 100 },
      { text: { fr: "Oui, au moins un projet important", en: "Yes, at least one important project" }, value: "one", score: 65 },
      { text: { fr: "Pas vraiment — on vit au jour le jour", en: "Not really — we live day by day" }, value: "not_really", score: 40 },
      { text: { fr: "Non, chacun fait ses plans de son côté", en: "No, each of us makes our own plans" }, value: "each_side", score: 20 },
    ],
  },

  // --- Bloc 8 : Équilibre individuel (Q18–Q19) ---
  {
    id: "Q18",
    type: "single",
    dimension: "balance",
    hint: {
      fr: "L'équilibre sain, c'est deux individus épanouis qui choisissent d'être ensemble — pas deux personnes qui ont besoin l'une de l'autre pour exister.",
      en: "Healthy balance means two fulfilled individuals who choose to be together — not two people who need each other to exist.",
    },
    text: {
      fr: "Tu as assez d'espace pour tes amis, tes hobbies, ton temps seul(e) ?",
      en: "Do you have enough space for your friends, hobbies, and alone time?",
    },
    options: [
      { text: { fr: "Oui, on respecte l'espace de chacun", en: "Yes, we respect each other's space" }, value: "respect", score: 100 },
      { text: { fr: "Globalement oui", en: "Generally yes" }, value: "generally", score: 75 },
      { text: { fr: "Pas assez — je me sens un peu étouffé(e)", en: "Not enough — I feel a bit smothered" }, value: "smothered", score: 45 },
      { text: { fr: "Non, ma relation prend toute la place", en: "No, my relationship takes up everything" }, value: "overwhelmed", score: 20 },
    ],
  },
  {
    id: "Q19",
    type: "single",
    dimension: "balance",
    hint: {
      fr: "Les couples les plus solides sont formés de deux individus épanouis. Maintenir son identité propre n'est pas une menace pour le couple — c'est sa force.",
      en: "The strongest couples are made of two fulfilled individuals. Maintaining your own identity isn't a threat to the relationship — it's its strength.",
    },
    text: {
      fr: "As-tu le sentiment de rester toi-même dans cette relation ?",
      en: "Do you feel like you remain yourself in this relationship?",
    },
    options: [
      { text: { fr: "Oui, totalement — je suis épanoui(e) ET en couple", en: "Yes, completely — I'm fulfilled AND in a relationship" }, value: "totally", score: 100 },
      { text: { fr: "Oui, pour l'essentiel", en: "Yes, for the most part" }, value: "mostly", score: 75 },
      { text: { fr: "Je me suis un peu perdu(e) en chemin", en: "I've lost myself a bit along the way" }, value: "lost", score: 45 },
      { text: { fr: "Non, j'ai l'impression de m'être oublié(e)", en: "No, I feel like I've forgotten who I am" }, value: "forgotten", score: 20 },
    ],
  },

  // --- Bloc 9 : Question douleur finale (Q20) ---
  {
    id: "Q20",
    type: "combined",
    dimension: null,
    maxSelect: 3,
    maxLength: 200,
    hint: {
      fr: "Tes réponses ici sont confidentielles et servent uniquement à personnaliser ton rapport. Il n'y a aucun jugement — seulement de la bienveillance.",
      en: "Your answers here are confidential and only used to personalize your report. There's no judgment — only care.",
    },
    text: {
      fr: "Qu'est-ce qui t'inquiète le plus dans ta relation actuellement ?",
      en: "What worries you most about your relationship right now?",
    },
    placeholder: {
      fr: "Si tu pouvais changer UNE chose dans ta relation, ce serait quoi ?",
      en: "If you could change ONE thing in your relationship, what would it be?",
    },
    options: [
      { text: { fr: "La communication au quotidien", en: "Day-to-day communication" }, value: "communication" },
      { text: { fr: "La confiance ou la jalousie", en: "Trust or jealousy" }, value: "trust" },
      { text: { fr: "L'intimité (émotionnelle ou physique)", en: "Intimacy (emotional or physical)" }, value: "intimacy" },
      { text: { fr: "Les disputes et leur gestion", en: "Arguments and how we handle them" }, value: "conflict" },
      { text: { fr: "Les blessures du passé non résolues", en: "Unresolved past hurts" }, value: "forgiveness" },
      { text: { fr: "Nos projets de vie différents", en: "Our different life goals" }, value: "projects" },
      { text: { fr: "Le manque de temps ensemble", en: "Lack of time together" }, value: "time" },
      { text: { fr: "Le manque d'espace personnel", en: "Lack of personal space" }, value: "balance" },
      { text: { fr: "Autre chose", en: "Something else" }, value: "other" },
    ],
  },
];
