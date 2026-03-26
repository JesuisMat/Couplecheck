export interface QuizSession {
  id: string;
  created_at: string;
  locale: "fr" | "en";
  age_range?: string;
  gender?: string;
  relationship_duration?: string;
  relationship_status?: string;
  cohabiting?: boolean;
  has_children?: boolean;
  is_long_distance?: boolean;
  answers: Record<string, string | string[] | number>;
  pain_points?: string[];
  change_wish?: string;
  scores?: Record<string, number>;
  global_score?: number;
  completed: boolean;
  email_captured: boolean;
}

export interface Lead {
  id: string;
  session_id: string;
  created_at: string;
  email: string;
  first_name?: string;
  locale: "fr" | "en";
  newsletter_consent: boolean;
  converted: boolean;
  converted_at?: string;
  last_email_sent?: string;
  last_email_at?: string;
  unsubscribed: boolean;
}

export interface Purchase {
  id: string;
  lead_id: string;
  session_id: string;
  created_at: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  offer_type: "standard" | "premium";
  amount_cents: number;
  currency: string;
  status: "pending" | "completed" | "refunded";
  completed_at?: string;
  report_generated: boolean;
  report_url?: string;
  report_sent_at?: string;
}
