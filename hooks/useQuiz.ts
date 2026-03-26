"use client";

import { useState, useCallback } from "react";
import { questions } from "@/config/questions";
import { QuizAnswer, QuizState } from "@/types/quiz";
import { trackEvent, EVENTS } from "@/lib/posthog";

function generateSessionId() {
  return crypto.randomUUID();
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    sessionId: generateSessionId(),
    currentQuestion: 0,
    answers: {},
    startedAt: new Date(),
    phase: "quiz",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[state.currentQuestion];
  const totalQuestions = questions.length;
  const progress = Math.round((state.currentQuestion / totalQuestions) * 100);
  const isLastQuestion = state.currentQuestion === totalQuestions - 1;

  const answerQuestion = useCallback(
    (answer: QuizAnswer) => {
      setState((prev) => {
        const newAnswers = { ...prev.answers, [currentQuestion.id]: answer };

        trackEvent(EVENTS.QUIZ_QUESTION_ANSWERED, {
          question_id: currentQuestion.id,
          question_type: currentQuestion.type,
          question_index: prev.currentQuestion,
        });

        return { ...prev, answers: newAnswers };
      });
    },
    [currentQuestion]
  );

  const nextQuestion = useCallback(async () => {
    if (isLastQuestion) {
      // Submit quiz and go to email capture
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: state.sessionId,
            answers: state.answers,
            locale:
              document.documentElement.lang ||
              (typeof window !== "undefined"
                ? window.location.pathname.split("/")[1]
                : "fr"),
          }),
        });

        if (!response.ok) throw new Error("Failed to submit quiz");

        trackEvent(EVENTS.QUIZ_COMPLETED, {
          session_id: state.sessionId,
          questions_answered: Object.keys(state.answers).length,
        });

        setState((prev) => ({ ...prev, phase: "email" }));
      } catch (err) {
        setError("Une erreur est survenue. Réessaie.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  }, [isLastQuestion, state]);

  const previousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }));
  }, []);

  const getCurrentAnswer = useCallback(
    () => state.answers[currentQuestion?.id],
    [state.answers, currentQuestion]
  );

  return {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    isSubmitting,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentAnswer,
  };
}
