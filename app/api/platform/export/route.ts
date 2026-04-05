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

  const [{ data: userData }, { data: conversations }, { data: checkups }] =
    await Promise.all([
      supabase
        .from("users")
        .select(
          "email, created_at, onboarding_data, memory_data, preferred_language, platform_access_type"
        )
        .eq("id", user.id)
        .single(),
      supabase
        .from("conversations")
        .select("id, title, created_at, message_count")
        .eq("user_id", user.id),
      supabase
        .from("monthly_checkups")
        .select("*")
        .eq("user_id", user.id),
    ]);

  const exportData = {
    exported_at: new Date().toISOString(),
    user: userData,
    conversations: conversations ?? [],
    checkups: checkups ?? [],
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="couplecheck-export-${Date.now()}.json"`,
    },
  });
}
