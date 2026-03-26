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
    questions: ["Q5", "Q6"],
  },
  {
    key: "trust",
    label: { fr: "Confiance", en: "Trust" },
    description: {
      fr: "Transparence, fidélité, jalousie et fiabilité dans la relation",
      en: "Transparency, fidelity, jealousy and reliability in the relationship",
    },
    icon: "🔒",
    questions: ["Q7", "Q8"],
  },
  {
    key: "intimacy",
    label: { fr: "Intimité", en: "Intimacy" },
    description: {
      fr: "Connexion émotionnelle et physique entre les partenaires",
      en: "Emotional and physical connection between partners",
    },
    icon: "❤️",
    questions: ["Q9"],
  },
  {
    key: "conflict",
    label: { fr: "Gestion des conflits", en: "Conflict Management" },
    description: {
      fr: "Manière de gérer les désaccords et de se réconcilier",
      en: "How disagreements are handled and resolved",
    },
    icon: "🤝",
    questions: ["Q10", "Q11"],
  },
  {
    key: "projects",
    label: { fr: "Projets communs", en: "Shared Goals" },
    description: {
      fr: "Vision commune de l'avenir et alignement des objectifs de vie",
      en: "Shared vision for the future and alignment of life goals",
    },
    icon: "🚀",
    questions: ["Q12"],
  },
  {
    key: "balance",
    label: { fr: "Équilibre individuel", en: "Individual Balance" },
    description: {
      fr: "Espace personnel, indépendance et épanouissement individuel",
      en: "Personal space, independence and individual fulfillment",
    },
    icon: "⚖️",
    questions: ["Q13"],
  },
];
