import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { calculateScores, resolveScores } from "@/lib/scoring";
import { QuizAnswer } from "@/types/quiz";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, answers, locale } = body;

    if (!sessionId || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["fr", "en"].includes(locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    // Resolve string answers to numeric scores
    const resolvedAnswers = resolveScores(
      answers as Record<string, QuizAnswer>
    );

    // Calculate scores
    const { scores, globalScore } = calculateScores(resolvedAnswers);

    // Extract segmentation data
    const segmentation = {
      age_range: answers.Q1 as string | undefined,
      gender: answers.Q2 as string | undefined,
      relationship_duration: answers.Q3 as string | undefined,
      relationship_status: answers.Q4 as string | undefined,
    };

    // Extract pain points from Q20 (combined question: multiSelect + text)
    const q20 = answers.Q20;
    const painPoints =
      q20 && typeof q20 === "object" && "multiSelect" in (q20 as object)
        ? ((q20 as { multiSelect: string[] }).multiSelect ?? [])
        : [];
    const changeWish =
      q20 && typeof q20 === "object" && "text" in (q20 as object)
        ? ((q20 as { text: string }).text ?? undefined)
        : undefined;

    const supabase = createAdminClient();

    // Upsert quiz session — store raw answers for teaser personalization
    const { error } = await supabase.from("quiz_sessions").upsert({
      id: sessionId,
      locale,
      ...segmentation,
      answers,
      pain_points: painPoints,
      change_wish: changeWish,
      scores,
      global_score: globalScore,
      completed: true,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save session" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      scores,
      globalScore,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
