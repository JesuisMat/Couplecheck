// Platform V2 types

export interface MemoryEntry {
  id: string;
  category: "profile" | "communication" | "checkups" | "themes" | "event" | "preference";
  content: string;
  created_at: string;
}

export interface MonthlyCheckup {
  id: string;
  user_id: string;
  created_at: string;
  period_month: number;
  period_year: number;
  mood_score: number; // 1-5
  conflict_level: "none" | "few" | "several" | "many";
  closeness_score: number; // 1-5
  word_of_month?: string;
  satisfaction_score: number; // 1-10
  completed_in_seconds?: number;
}

export interface ConversationSummary {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  message_count: number;
}

export interface ChatMessage {
  id: string;
  conversation_id: string | null;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  tokens_input?: number;
  tokens_output?: number;
}

export interface OnboardingData {
  // Step 1
  partnerName?: string;
  reason?: string;
  challenge?: string;
  // Step 2
  duration?: string;
  livingTogether?: string;
  // Step 3
  conflictStyle?: string;
  therapy?: string;
  // Step 4
  intentions?: string[];
  lastStep?: number;
}

export interface PlatformUser {
  id: string;
  email: string;
  created_at: string;
  lead_id?: string;
  onboarding_data?: OnboardingData;
  onboarding_completed: boolean;
  onboarding_v2_completed: boolean;
  memory_data: MemoryEntry[];
  messages_used_this_month: number;
  messages_reset_at: string;
  monthly_limit: number;
  platform_access_type: "none" | "trial" | "subscription" | "early_adopter";
  preferred_language: "fr" | "en";
  role: "user" | "admin";
}

export interface UserContext {
  userId: string;
  firstName?: string;
  email: string;
  preferredLanguage: "fr" | "en";
  // Quiz data
  quizScores?: Record<string, number>;
  quizGlobalScore?: number;
  quizAnswers?: Record<string, unknown>;
  quizCompletedAt?: string;
  // Segmentation
  relationshipDuration?: string;
  cohabiting?: boolean;
  // Onboarding V2
  onboarding?: OnboardingData;
  // Memory
  memoryFacts: MemoryEntry[];
  // Checkups (last 6)
  recentCheckups: MonthlyCheckup[];
  // Messages (last 20)
  recentMessages: Array<{ role: string; content: string; created_at: string }>;
  // Limits
  messagesUsedThisMonth: number;
  monthlyLimit: number;
}

export type SSEChunk =
  | { type: "delta"; content: string }
  | { type: "done"; tokensInput: number; tokensOutput: number; conversationId: string }
  | { type: "error"; code: "limit_reached" | "auth_error" | "unknown" };
