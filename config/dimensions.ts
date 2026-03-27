import { Dimension } from "@/types/quiz";

export const dimensions: Dimension[] = [
  {
    key: "communication",
    label: { fr: "Communication", en: "Communication" },
    description: {
      fr: "Qualité des échanges, écoute active et expression des besoins",
      en: "Quality of exchanges, active listening and expression of needs",
    },
    icon: "💬",
    questions: ["Q5", "Q6", "Q7"],
  },
  {
    key: "trust",
    label: { fr: "Confiance", en: "Trust" },
    description: {
      fr: "Transparence, fidélité, jalousie et fiabilité dans la relation",
      en: "Transparency, fidelity, jealousy and reliability in the relationship",
    },
    icon: "🛡️",
    questions: ["Q8", "Q9"],
  },
  {
    key: "intimacy",
    label: { fr: "Intimité", en: "Intimacy" },
    description: {
      fr: "Connexion émotionnelle et physique entre les partenaires",
      en: "Emotional and physical connection between partners",
    },
    icon: "❤️",
    questions: ["Q10", "Q11"],
  },
  {
    key: "conflict",
    label: { fr: "Gestion des conflits", en: "Conflict Management" },
    description: {
      fr: "Manière de gérer les désaccords et de se réconcilier",
      en: "How disagreements are handled and resolved",
    },
    icon: "⚖️",
    questions: ["Q12", "Q13"],
  },
  {
    key: "forgiveness",
    label: { fr: "Pardon & Résilience", en: "Forgiveness & Resilience" },
    description: {
      fr: "Capacité à pardonner et à dépasser les blessures ensemble",
      en: "Ability to forgive and move past hurts together",
    },
    icon: "🕊️",
    questions: ["Q14", "Q15"],
  },
  {
    key: "projects",
    label: { fr: "Projets communs", en: "Shared Goals" },
    description: {
      fr: "Vision commune de l'avenir et alignement des objectifs de vie",
      en: "Shared vision for the future and alignment of life goals",
    },
    icon: "🚀",
    questions: ["Q16", "Q17"],
  },
  {
    key: "balance",
    label: { fr: "Équilibre individuel", en: "Individual Balance" },
    description: {
      fr: "Espace personnel, indépendance et épanouissement individuel",
      en: "Personal space, independence and individual fulfillment",
    },
    icon: "☯️",
    questions: ["Q18", "Q19"],
  },
];
