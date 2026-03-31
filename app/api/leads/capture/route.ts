import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWelcomeEmail } from "@/lib/sendgrid";
import { triggerEmailSequence } from "@/lib/n8n";

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

    // Fetch quiz scores for welcome email and n8n payload
    const { data: quizSession } = await supabase
      .from("quiz_sessions")
      .select("global_score, scores")
      .eq("id", sessionId)
      .single();

    const scores = (quizSession?.scores ?? {}) as Record<string, number>;
    const globalScore = quizSession?.global_score ?? 0;
    const risksCount = Object.values(scores).filter((s) => s < 40).length;

    // Send Welcome email (non-blocking — errors don't fail the response)
    sendWelcomeEmail({
      to: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      locale: locale as "fr" | "en",
      globalScore,
      scores,
      resultUrl,
      sessionId,
      leadId: lead.id,
    }).catch((err) => console.error("[leads/capture] sendWelcomeEmail failed:", err));

    // Trigger n8n relance sequence (non-blocking)
    triggerEmailSequence({
      leadId: lead.id,
      sessionId,
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      globalScore,
      risksCount,
      resultUrl,
      locale: locale as "fr" | "en",
    }).catch((err) => console.error("[leads/capture] triggerEmailSequence failed:", err));

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
