import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, email, firstName, newsletterConsent, locale } = body;

    // Validate required fields
    if (!sessionId || !email || !firstName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!["fr", "en"].includes(locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Create or update lead (email is unique)
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .upsert(
        {
          session_id: sessionId,
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          locale,
          newsletter_consent: newsletterConsent || false,
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (leadError) {
      console.error("Lead capture error:", leadError);
      return NextResponse.json(
        { error: "Failed to capture lead" },
        { status: 500 }
      );
    }

    // Mark session as email captured
    await supabase
      .from("quiz_sessions")
      .update({ email_captured: true })
      .eq("id", sessionId);

    // Build result URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resultUrl = `${appUrl}/${locale}/result/${sessionId}`;

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      resultUrl,
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
