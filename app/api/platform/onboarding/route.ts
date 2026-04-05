import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    step?: number;
    data?: Record<string, unknown>;
    onboarding_completed?: boolean;
  };

  // Fetch current user data (uses RLS SELECT — OK)
  const { data: current } = await supabase
    .from("users")
    .select("onboarding_data")
    .eq("id", user.id)
    .single();

  const existingData =
    (current?.onboarding_data as Record<string, unknown> | null) ?? {};

  const mergedData = {
    ...existingData,
    ...(body.data ?? {}),
    ...(body.step !== undefined ? { lastStep: body.step } : {}),
  };

  const updatePayload: Record<string, unknown> = {
    onboarding_data: mergedData,
  };

  if (body.onboarding_completed === true) {
    updatePayload.onboarding_completed = true;
    updatePayload.onboarding_v2_completed = true;
  }

  // Use admin client to bypass missing RLS UPDATE policy on users table
  const admin = createAdminClient();
  const { error } = await admin
    .from("users")
    .update(updatePayload)
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const res = NextResponse.json({ success: true });

  // Invalidate the access cache so middleware re-reads onboarding_completed from DB
  if (body.onboarding_completed === true) {
    res.cookies.set("_cc_access", "", { maxAge: 0, path: "/" });
  }

  return res;
}
