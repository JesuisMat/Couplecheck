"use client";

import posthog from "posthog-js";

export const EVENTS = {
  PAGE_VIEW_LANDING: "page_view_landing",
  QUIZ_STARTED: "quiz_started",
  QUIZ_QUESTION_ANSWERED: "quiz_question_answered",
  QUIZ_COMPLETED: "quiz_completed",
  EMAIL_SUBMITTED: "email_submitted",
  RESULT_VIEWED: "result_viewed",
  CHECKOUT_INITIATED: "checkout_initiated",
  PURCHASE_COMPLETED: "purchase_completed",
  REPORT_DOWNLOADED: "report_downloaded",
  CHAT_MESSAGE_SENT: "chat_message_sent",
} as const;

export type PostHogEvent = (typeof EVENTS)[keyof typeof EVENTS];

export function trackEvent(
  event: PostHogEvent,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture(event, properties);
  }
}
