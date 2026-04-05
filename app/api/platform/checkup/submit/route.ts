import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    mood_score: number;
    conflict_level: string;
    closeness_score: number;
    word_of_month?: string;
    satisfaction_score: number;
    completed_in_seconds?: number;
  };

  const now = new Date();

  const { data, error } = await supabase
    .from("monthly_checkups")
    .insert({
      user_id: user.id,
      period_month: now.getMonth() + 1,
      period_year: now.getFullYear(),
      mood_score: body.mood_score,
      conflict_level: body.conflict_level,
      closeness_score: body.closeness_score,
      word_of_month: body.word_of_month ?? null,
      satisfaction_score: body.satisfaction_score,
      completed_in_seconds: body.completed_in_seconds ?? null,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Checkup already completed this month" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, checkupId: data.id });
}
