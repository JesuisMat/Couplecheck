import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

// Protected by service-role secret — called by n8n daily cron
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.N8N_SECRET}`;

  if (!process.env.N8N_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Users whose trial ends in exactly 5 days (±12h window)
  const in5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const windowStart = new Date(in5Days.getTime() - 12 * 60 * 60 * 1000).toISOString();
  const windowEnd = new Date(in5Days.getTime() + 12 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("users")
    .select(
      `id, email, preferred_language, trial_end,
       leads!users_lead_id_fkey (first_name)`
    )
    .eq("platform_access_type", "trial")
    .gte("trial_end", windowStart)
    .lte("trial_end", windowEnd);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = (data ?? []).map((u) => {
    const lead = Array.isArray(u.leads)
      ? (u.leads as Array<{ first_name?: string }>)[0]
      : null;
    return {
      id: u.id,
      email: u.email,
      locale: (u.preferred_language as string) ?? "fr",
      firstName: lead?.first_name ?? null,
      trialEnd: u.trial_end,
    };
  });

  return NextResponse.json({ users, count: users.length });
}
