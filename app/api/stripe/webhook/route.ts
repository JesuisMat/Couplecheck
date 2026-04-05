import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReportData } from '@/lib/report-generator';
import { uploadPDF } from '@/lib/storage';
import {
  sendReportEmail,
  sendSubscriptionConfirmedEmail,
  sendSubscriptionCanceledEmail,
  sendPaymentFailedEmail,
} from '@/lib/sendgrid';
import { ReportPDF } from '@/components/report/ReportPDF';
import type Stripe from 'stripe';

export const runtime = 'nodejs';
export const maxDuration = 120;

const log = (step: string, data?: unknown) => {
  console.log(`[WEBHOOK] ${step}`, data !== undefined ? JSON.stringify(data) : '');
};

const logError = (step: string, err: unknown) => {
  console.error(`[WEBHOOK ERROR] ${step}:`, err instanceof Error ? err.message : String(err));
  if (err instanceof Error && err.stack) console.error(err.stack);
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getUserLocale(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string
): Promise<'fr' | 'en'> {
  const { data } = await supabase
    .from('users')
    .select('preferred_language, email, leads!users_lead_id_fkey(first_name)')
    .eq('id', userId)
    .single();
  return (data?.preferred_language as 'fr' | 'en') ?? 'fr';
}

async function getUserEmail(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string
): Promise<{ email: string; firstName?: string; locale: 'fr' | 'en' }> {
  const { data } = await supabase
    .from('users')
    .select('email, preferred_language, leads!users_lead_id_fkey(first_name)')
    .eq('id', userId)
    .single();
  const lead = Array.isArray(data?.leads)
    ? (data.leads as Array<{ first_name?: string }>)[0]
    : null;
  return {
    email: (data?.email as string) ?? '',
    firstName: lead?.first_name,
    locale: (data?.preferred_language as 'fr' | 'en') ?? 'fr',
  };
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof createAdminClient>
) {
  const { quiz_session_id, offer_type, locale, lead_id } = session.metadata ?? {};

  log('Metadata', { quiz_session_id, offer_type, locale, lead_id, stripe_session: session.id });

  // Subscription checkouts don't carry quiz metadata — skip report generation
  if (session.mode === 'subscription') {
    log('Skipping report generation for subscription checkout');
    return;
  }

  if (!quiz_session_id || !offer_type) {
    logError('Missing metadata', session.metadata);
    return;
  }

  // ── 1. Update or create purchase record ──────────────────────────────────
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

  // ── 2. Fetch quiz session ────────────────────────────────────────────────
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

  // ── 3. Fetch lead ────────────────────────────────────────────────────────
  log('Step 3: Fetching lead...');
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('session_id', quiz_session_id)
    .single();

  const sessionLocale = (quizSession.locale ?? locale ?? 'fr') as 'fr' | 'en';

  // ── 4. If premium → activate platform trial ─────────────────────────────
  if (offer_type === 'premium') {
    log('Step 4a: Activating platform trial for premium purchase...');
    const userId = session.metadata?.userId ?? '';

    // Find user by lead email if userId not in metadata
    let platformUserId = userId;
    if (!platformUserId && lead?.email) {
      const { data: userRow } = await supabase
        .from('users')
        .select('id')
        .eq('email', lead.email)
        .single();
      platformUserId = userRow?.id ?? '';
    }

    if (platformUserId) {
      const trialStart = new Date().toISOString();
      const trialEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      await supabase
        .from('users')
        .update({
          platform_access_type: 'trial',
        })
        .eq('id', platformUserId);

      // Insert trial subscription record
      await supabase.from('subscriptions').insert({
        user_id: platformUserId,
        stripe_subscription_id: `trial_${purchase.id}`,
        status: 'trialing',
        trial_start: trialStart,
        trial_end: trialEnd,
        current_period_start: trialStart,
        current_period_end: trialEnd,
        canceled_at: null,
      });

      log('Step 4a OK: trial activated until', trialEnd);
    } else {
      log('Step 4a SKIPPED: no user found for trial activation');
    }
  }

  // ── 5. Generate report ───────────────────────────────────────────────────
  log('Step 5: Calling OpenRouter...');
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
  log('Step 5 OK');

  // ── 6. Render + upload PDF ───────────────────────────────────────────────
  log('Step 6: Rendering PDF...');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = Buffer.from(
    await renderToBuffer(React.createElement(ReportPDF, { data: reportData }) as any)
  );
  const reportUrl = await uploadPDF(pdfBuffer, quiz_session_id, offer_type);
  log('Step 6 OK', { pdf_bytes: pdfBuffer.length });

  // ── 7. Update purchase + lead ────────────────────────────────────────────
  await supabase
    .from('purchases')
    .update({ report_generated: true, report_url: reportUrl })
    .eq('id', purchase.id);

  if (lead?.id) {
    await supabase
      .from('leads')
      .update({ converted: true, converted_at: new Date().toISOString() })
      .eq('id', lead.id);
  }

  // ── 8. Send report email ─────────────────────────────────────────────────
  const emailTo = lead?.email || session.customer_details?.email;
  if (emailTo && process.env.SENDGRID_API_KEY) {
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
    log('Step 8 OK: email sent');
  }
}

async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createAdminClient>
) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  log('subscription.created', { userId, sub_id: subscription.id });

  await supabase.from('users').update({
    platform_access_type: 'subscription',
    monthly_limit: 60,
  }).eq('id', userId);

  // Upsert subscription record
  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_start: subscription.current_period_start
      ? new Date(subscription.current_period_start * 1000).toISOString()
      : null,
    current_period_end: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
  }, { onConflict: 'stripe_subscription_id' });

  if (process.env.SENDGRID_API_KEY) {
    const info = await getUserEmail(supabase, userId);
    await sendSubscriptionConfirmedEmail({
      to: info.email,
      firstName: info.firstName,
      locale: info.locale,
    });
  }
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createAdminClient>
) {
  log('subscription.updated', { sub_id: subscription.id, status: subscription.status });

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      ...(subscription.current_period_start && {
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      }),
      ...(subscription.current_period_end && {
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      }),
    })
    .eq('stripe_subscription_id', subscription.id);
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createAdminClient>
) {
  const userId = subscription.metadata?.userId;
  log('subscription.deleted', { userId, sub_id: subscription.id });

  if (userId) {
    await supabase
      .from('users')
      .update({ platform_access_type: 'none' })
      .eq('id', userId);
  }

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (userId && process.env.SENDGRID_API_KEY) {
    const info = await getUserEmail(supabase, userId);
    await sendSubscriptionCanceledEmail({
      to: info.email,
      firstName: info.firstName,
      locale: info.locale,
    });
  }
}

async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: ReturnType<typeof createAdminClient>
) {
  const subId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;

  log('invoice.payment_failed', { sub_id: subId });

  if (subId) {
    await supabase
      .from('subscriptions')
      .update({ status: 'past_due' })
      .eq('stripe_subscription_id', subId);
  }

  // Find user from subscription
  if (subId && process.env.SENDGRID_API_KEY) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_subscription_id', subId)
      .single();

    if (sub?.user_id) {
      const info = await getUserEmail(supabase, sub.user_id);
      await sendPaymentFailedEmail({
        to: info.email,
        firstName: info.firstName,
        locale: info.locale,
      });
    }
  }
}

async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  supabase: ReturnType<typeof createAdminClient>
) {
  const subId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;

  log('invoice.payment_succeeded', { sub_id: subId });

  if (!subId) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'active' })
    .eq('stripe_subscription_id', subId);

  // Reset monthly message count on new billing period
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id, current_period_start')
    .eq('stripe_subscription_id', subId)
    .single();

  if (sub?.user_id) {
    // Only reset if this is a renewal (not the first payment)
    const periodStart = sub.current_period_start
      ? new Date(sub.current_period_start)
      : null;
    const isRenewal = periodStart && periodStart < new Date(Date.now() - 25 * 24 * 60 * 60 * 1000);
    if (isRenewal) {
      await supabase
        .from('users')
        .update({ messages_used_this_month: 0 })
        .eq('id', sub.user_id);
    }
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    logError('Signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  log('Event received', { type: event.type, id: event.id });

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, supabase);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription, supabase);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription, supabase);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, supabase);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice, supabase);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice, supabase);
        break;

      default:
        log('Ignoring event type', event.type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    logError('Handler failed', error);
    // Return 200 to avoid Stripe retrying for unrecoverable errors
    return NextResponse.json({ received: true, error: String(error) });
  }
}
