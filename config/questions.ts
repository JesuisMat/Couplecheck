import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  // --- Segmentation ---
  {
    id: "Q1",
    type: "single",
    dimension: null,
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

  // --- Évaluation ---
  {
    id: "Q5",
    type: "single",
    dimension: "communication",
    hint: {
      fr: "La communication saine, c'est pouvoir exprimer ce qu'on ressent sans peur du jugement — et savoir que l'autre va vraiment écouter.",
      en: "Healthy communication means expressing feelings without fear of judgment — and knowing the other person will truly listen.",
    },
    text: {
      fr: "Quand quelque chose te tracasse, tu en parles facilement à ton/ta partenaire ?",
      en: "When something bothers you, do you easily talk about it with your partner?",
    },
    options: [
      { text: { fr: "Oui, toujours", en: "Yes, always" }, value: "always", score: 10 },
      { text: { fr: "La plupart du temps", en: "Most of the time" }, value: "most", score: 7 },
      { text: { fr: "Parfois, ça dépend", en: "Sometimes, it depends" }, value: "sometimes", score: 4 },
      { text: { fr: "Rarement, je garde pour moi", en: "Rarely, I keep it to myself" }, value: "rarely", score: 1 },
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
      fr: "Tu te sens vraiment écouté(e) quand tu parles de tes besoins ?",
      en: "Do you feel truly heard when you express your needs?",
    },
    options: [
      { text: { fr: "Oui, complètement", en: "Yes, completely" }, value: "completely", score: 10 },
      { text: { fr: "Globalement oui", en: "Generally yes" }, value: "generally", score: 7 },
      { text: { fr: "Pas vraiment", en: "Not really" }, value: "not_really", score: 3 },
      { text: { fr: "Non, j'ai l'impression de parler dans le vide", en: "No, I feel like I'm talking to a wall" }, value: "no", score: 0 },
    ],
  },
  {
    id: "Q7",
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
      { text: { fr: "Oui, totalement", en: "Yes, completely" }, value: "totally", score: 10 },
      { text: { fr: "Oui, la plupart du temps", en: "Yes, most of the time" }, value: "most", score: 7 },
      { text: { fr: "J'ai parfois des doutes", en: "I sometimes have doubts" }, value: "doubts", score: 4 },
      { text: { fr: "Non, ça me stresse", en: "No, it stresses me out" }, value: "stressed", score: 1 },
    ],
  },
  {
    id: "Q8",
    type: "single",
    dimension: "trust",
    hint: {
      fr: "La transparence ne signifie pas l'absence totale de vie privée, mais l'absence de secrets qui pourraient fragiliser la confiance.",
      en: "Transparency doesn't mean no privacy, but the absence of secrets that could undermine trust.",
    },
    text: {
      fr: "Est-ce que ton/ta partenaire est transparent(e) avec toi (téléphone, réseaux, sorties) ?",
      en: "Is your partner transparent with you (phone, social media, outings)?",
    },
    options: [
      { text: { fr: "Oui, on n'a rien à cacher", en: "Yes, we have nothing to hide" }, value: "open", score: 10 },
      { text: { fr: "Globalement oui", en: "Generally yes" }, value: "generally", score: 7 },
      { text: { fr: "Il y a des zones d'ombre", en: "There are some gray areas" }, value: "gray_areas", score: 3 },
      { text: { fr: "Non, c'est opaque", en: "No, it's opaque" }, value: "opaque", score: 0 },
    ],
  },
  {
    id: "Q9",
    type: "slider",
    dimension: "intimacy",
    hint: {
      fr: "L'intimité englobe le lien émotionnel (se sentir proches, compris·es) ET le lien physique. Les deux se nourrissent mutuellement.",
      en: "Intimacy encompasses emotional connection (feeling close, understood) AND physical connection. Both feed each other.",
    },
    text: {
      fr: "Sur 10, combien es-tu satisfait(e) de votre intimité (émotionnelle & physique) ?",
      en: "Out of 10, how satisfied are you with your intimacy (emotional & physical)?",
    },
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: {
      min: { fr: "Très insatisfait·e", en: "Very unsatisfied" },
      max: { fr: "Pleinement épanoui·e", en: "Fully satisfied" },
    },
  },
  {
    id: "Q10",
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
      { text: { fr: "On discute calmement jusqu'à trouver un terrain d'entente", en: "We discuss calmly until we find common ground" }, value: "calm", score: 10 },
      { text: { fr: "On se dispute mais on finit par se réconcilier", en: "We argue but eventually make up" }, value: "argue_makeup", score: 6 },
      { text: { fr: "Ça dégénère souvent en grosse dispute", en: "It often escalates into a big fight" }, value: "escalates", score: 2 },
      { text: { fr: "On évite le sujet et rien n'est jamais résolu", en: "We avoid the topic and nothing gets resolved" }, value: "avoid", score: 0 },
    ],
  },
  {
    id: "Q11",
    type: "single",
    dimension: "conflict",
    hint: {
      fr: "La capacité à se réconcilier après un conflit — vraiment, pas juste passer à autre chose — est l'un des meilleurs indicateurs d'une relation durable.",
      en: "The ability to truly reconcile after a conflict — not just move on — is one of the strongest indicators of a lasting relationship.",
    },
    text: {
      fr: "Après une dispute, vous arrivez à en parler et à vous excuser ?",
      en: "After an argument, are you able to talk about it and apologize?",
    },
    options: [
      { text: { fr: "Oui, toujours", en: "Yes, always" }, value: "always", score: 10 },
      { text: { fr: "La plupart du temps", en: "Most of the time" }, value: "most", score: 7 },
      { text: { fr: "Rarement, on fait comme si de rien n'était", en: "Rarely, we pretend nothing happened" }, value: "rarely", score: 3 },
      { text: { fr: "Jamais, les tensions s'accumulent", en: "Never, tensions build up" }, value: "never", score: 0 },
    ],
  },
  {
    id: "Q12",
    type: "single",
    dimension: "projects",
    hint: {
      fr: "L'alignement sur les grandes valeurs de fond (famille, mode de vie, ambitions) compte plus que les détails pratiques, qui peuvent toujours s'ajuster.",
      en: "Alignment on core values (family, lifestyle, ambitions) matters more than practical details, which can always be adjusted.",
    },
    text: {
      fr: "Vous partagez une vision commune de l'avenir (enfants, lieu de vie, carrière) ?",
      en: "Do you share a common vision for the future (children, living situation, career)?",
    },
    options: [
      { text: { fr: "Oui, on est totalement alignés", en: "Yes, we're completely aligned" }, value: "aligned", score: 10 },
      { text: { fr: "Sur la plupart des sujets, oui", en: "On most topics, yes" }, value: "most", score: 7 },
      { text: { fr: "On n'en a jamais vraiment parlé", en: "We've never really talked about it" }, value: "never_talked", score: 4 },
      { text: { fr: "Non, on veut des choses différentes", en: "No, we want different things" }, value: "different", score: 0 },
    ],
  },
  {
    id: "Q13",
    type: "slider",
    dimension: "balance",
    hint: {
      fr: "L'équilibre sain, c'est deux individus épanouis qui *choisissent* d'être ensemble — pas deux personnes qui ont besoin l'une de l'autre pour exister.",
      en: "Healthy balance means two fulfilled individuals who *choose* to be together — not two people who need each other to exist.",
    },
    text: {
      fr: "Sur 10, as-tu assez d'espace pour toi (amis, hobbies, temps seul·e) ?",
      en: "Out of 10, do you have enough space for yourself (friends, hobbies, alone time)?",
    },
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: {
      min: { fr: "Je me sens étouffé·e", en: "I feel smothered" },
      max: { fr: "Équilibre parfait", en: "Perfect balance" },
    },
  },

  // --- Questions douleur ---
  {
    id: "Q14",
    type: "multi",
    dimension: null,
    maxSelect: 3,
    hint: {
      fr: "Sélectionne ce qui te préoccupe le plus en ce moment. Il n'y a pas de mauvaise réponse — c'est pour personnaliser ton rapport.",
      en: "Select what concerns you most right now. There are no wrong answers — this is to personalize your report.",
    },
    text: {
      fr: "Qu'est-ce qui t'inquiète le plus dans ta relation actuellement ?",
      en: "What worries you most about your relationship right now?",
    },
    options: [
      { text: { fr: "Le manque de communication", en: "Lack of communication" }, value: "communication" },
      { text: { fr: "La confiance / la jalousie", en: "Trust / jealousy" }, value: "trust" },
      { text: { fr: "L'intimité (émotionnelle ou physique)", en: "Intimacy (emotional or physical)" }, value: "intimacy" },
      { text: { fr: "Les disputes fréquentes", en: "Frequent arguments" }, value: "conflict" },
      { text: { fr: "Les projets de vie différents", en: "Different life goals" }, value: "projects" },
      { text: { fr: "Le manque de temps ensemble", en: "Lack of time together" }, value: "time" },
      { text: { fr: "Le manque d'espace personnel", en: "Lack of personal space" }, value: "space" },
      { text: { fr: "Autre chose", en: "Something else" }, value: "other" },
    ],
  },
  {
    id: "Q15",
    type: "text",
    dimension: null,
    maxLength: 500,
    hint: {
      fr: "Ta réponse est confidentielle et sera utilisée uniquement pour personnaliser ton rapport. Sois honnête avec toi-même.",
      en: "Your answer is confidential and will only be used to personalize your report. Be honest with yourself.",
    },
    text: {
      fr: "Si tu pouvais changer UNE chose dans ta relation, ce serait quoi ?",
      en: "If you could change ONE thing in your relationship, what would it be?",
    },
    placeholder: {
      fr: "Décris en quelques mots...",
      en: "Describe in a few words...",
    },
  },
];
