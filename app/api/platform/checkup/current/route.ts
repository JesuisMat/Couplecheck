import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const { data } = await supabase
    .from("monthly_checkups")
    .select("*")
    .eq("user_id", user.id)
    .eq("period_month", now.getMonth() + 1)
    .eq("period_year", now.getFullYear())
    .maybeSingle();

  return NextResponse.json({ checkup: data ?? null });
}
