export type Locale = "fr" | "en";

export type QuestionType = "single" | "multi" | "text" | "slider";

export interface QuizOption {
  text: { fr: string; en: string };
  value: string;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  dimension: string | null;
  text: { fr: string; en: string };
  hint?: { fr: string; en: string };
  options?: QuizOption[];
  placeholder?: { fr: string; en: string };
  maxLength?: number;
  maxSelect?: number;
  sliderMin?: number;
  sliderMax?: number;
  sliderLabels?: { min: { fr: string; en: string }; max: { fr: string; en: string } };
}

export type DimensionKey =
  | "communication"
  | "trust"
  | "intimacy"
  | "conflict"
  | "projects"
  | "balance";

export interface DimensionScores {
  communication: number;
  trust: number;
  intimacy: number;
  conflict: number;
  projects: number;
  balance: number;
}

export interface ScoreResult {
  scores: DimensionScores;
  globalScore: number;
  label: { fr: string; en: string };
  color: string;
}

export type QuizAnswer = string | string[] | number;

export interface QuizState {
  sessionId: string;
  currentQuestion: number;
  answers: Record<string, QuizAnswer>;
  startedAt: Date;
  phase: "quiz" | "email" | "result";
}

export interface Dimension {
  key: DimensionKey;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: string;
  questions: string[];
}
