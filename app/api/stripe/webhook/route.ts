import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReportData } from '@/lib/report-generator';
import { uploadPDF } from '@/lib/storage';
import { sendReportEmail } from '@/lib/sendgrid';
import { ReportPDF } from '@/components/report/ReportPDF';

export const runtime = 'nodejs';
export const maxDuration = 120;

const log = (step: string, data?: unknown) => {
  console.log(`[WEBHOOK] ${step}`, data !== undefined ? JSON.stringify(data) : '');
};

const logError = (step: string, err: unknown) => {
  console.error(`[WEBHOOK ERROR] ${step}:`, err instanceof Error ? err.message : String(err));
  if (err instanceof Error && err.stack) console.error(err.stack);
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    log('Missing stripe-signature header');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    logError('Signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  log('Event received', { type: event.type, id: event.id });

  if (event.type !== 'checkout.session.completed') {
    log('Ignoring event type', event.type);
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const { quiz_session_id, offer_type, locale, lead_id } = session.metadata ?? {};

  log('Metadata', { quiz_session_id, offer_type, locale, lead_id, stripe_session: session.id });

  if (!quiz_session_id || !offer_type) {
    logError('Missing metadata', session.metadata);
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    // ── 1. Update or create purchase record ────────────────────────────
    log('Step 1: Updating purchase record...');
    const { data: updatedPurchase } = await supabase
      .from('purchases')
      .update({
        status: 'completed',
        stripe_payment_intent: session.payment_intent as string,
        completed_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', session.id)
      .select()
      .single();

    let purchase = updatedPurchase;

    if (!purchase) {
      log('Step 1: No existing record found, inserting...');
      const { data: newPurchase, error: insertError } = await supabase
        .from('purchases')
        .insert({
          session_id: quiz_session_id,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          lead_id: lead_id || '',
          offer_type,
          amount_cents: session.amount_total ?? 0,
          currency: session.currency ?? 'eur',
          status: 'completed',
          report_generated: false,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError || !newPurchase) {
        logError('Purchase insert failed', insertError);
        throw new Error(`Purchase insert failed: ${insertError?.message}`);
      }
      purchase = newPurchase;
    }

    log('Step 1 OK', { purchase_id: purchase.id });

    // ── 2. Fetch quiz session ───────────────────────────────────────────
    log('Step 2: Fetching quiz session...');
    const { data: quizSession, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', quiz_session_id)
      .single();

    if (sessionError || !quizSession) {
      logError('Quiz session not found', sessionError);
      throw new Error(`Quiz session not found: ${sessionError?.message}`);
    }
    log('Step 2 OK', {
      global_score: quizSession.global_score,
      locale: quizSession.locale,
      has_answers: !!quizSession.answers,
      has_pain_points: Array.isArray(quizSession.pain_points),
    });

    // ── 3. Fetch lead ───────────────────────────────────────────────────
    log('Step 3: Fetching lead...');
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('session_id', quiz_session_id)
      .single();

    if (leadError) log('Lead not found (non-blocking)', leadError.message);
    log('Step 3 OK', { email: lead?.email, first_name: lead?.first_name });

    const sessionLocale = (quizSession.locale ?? locale ?? 'fr') as 'fr' | 'en';

    // ── 4. Generate report via OpenRouter ──────────────────────────────
    log('Step 4: Calling OpenRouter (3 parallel LLM calls)...');
    log('Step 4 context', {
      locale: sessionLocale,
      offer_type,
      global_score: quizSession.global_score,
      model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-medium',
      has_api_key: !!process.env.OPENROUTER_API_KEY,
    });

    const reportCtx = {
      locale: sessionLocale,
      globalScore: quizSession.global_score ?? 50,
      scores: quizSession.scores ?? {},
      painPoints: quizSession.pain_points ?? [],
      changeWish: quizSession.change_wish,
      rawAnswers: (quizSession.answers as Record<string, unknown>) ?? {},
      segmentation: {
        age_range: quizSession.age_range,
        gender: quizSession.gender,
        relationship_duration: quizSession.relationship_duration,
        relationship_status: quizSession.relationship_status,
      },
      firstName: lead?.first_name,
      offerType: offer_type as 'standard' | 'premium',
    };

    const reportData = await generateReportData(reportCtx);
    log('Step 4 OK', {
      interpretation_length: reportData.interpretation?.length,
      recommendations_count: reportData.recommendations?.length,
      action_plan_weeks: reportData.actionPlan?.length,
    });

    // ── 5. Render PDF ──────────────────────────────────────────────────
    log('Step 5: Rendering PDF...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = Buffer.from(
      await renderToBuffer(React.createElement(ReportPDF, { data: reportData }) as any)
    );
    log('Step 5 OK', { pdf_bytes: pdfBuffer.length });

    // ── 6. Upload to Supabase Storage ──────────────────────────────────
    log('Step 6: Uploading PDF to storage...');
    const reportUrl = await uploadPDF(pdfBuffer, quiz_session_id, offer_type);
    log('Step 6 OK', { report_url: reportUrl?.substring(0, 80) + '...' });

    // ── 7. Update purchase with report URL ─────────────────────────────
    log('Step 7: Updating purchase record...');
    await supabase
      .from('purchases')
      .update({ report_generated: true, report_url: reportUrl })
      .eq('id', purchase.id);
    log('Step 7 OK');

    // ── 8. Mark lead as converted ──────────────────────────────────────
    if (lead?.id) {
      log('Step 8: Marking lead as converted...');
      await supabase
        .from('leads')
        .update({ converted: true, converted_at: new Date().toISOString() })
        .eq('id', lead.id);
      log('Step 8 OK');
    }

    // ── 9. Send email ──────────────────────────────────────────────────
    const emailTo = lead?.email || session.customer_details?.email;
    log('Step 9: Sending email...', {
      to: emailTo,
      has_sendgrid_key: !!process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
    });

    if (!emailTo) {
      log('Step 9 SKIPPED: no email address found');
    } else if (!process.env.SENDGRID_API_KEY) {
      log('Step 9 SKIPPED: SENDGRID_API_KEY not set');
    } else {
      await sendReportEmail({
        to: emailTo,
        firstName: lead?.first_name,
        locale: sessionLocale,
        offerType: offer_type as 'standard' | 'premium',
        reportUrl,
        pdfBuffer,
        sessionId: quiz_session_id,
      });

      await supabase
        .from('purchases')
        .update({ report_sent_at: new Date().toISOString() })
        .eq('id', purchase.id);
      log('Step 9 OK: email sent to', emailTo);
    }

    log('Pipeline COMPLETE ✓');
    return NextResponse.json({ success: true });

  } catch (error) {
    logError('Pipeline failed', error);
    // Return 200 to avoid Stripe retrying (we've already logged the real error)
    return NextResponse.json({ received: true, error: String(error) });
  }
}
