import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface SendGridEvent {
  email: string;
  event: 'delivered' | 'open' | 'click' | 'unsubscribe' | 'bounce' | 'dropped' | 'spamreport';
  timestamp: number;
  sg_message_id?: string;
  url?: string;
  // custom_args passed when sending
  leadId?: string;
  emailType?: string;
  locale?: string;
}

/**
 * POST /api/sendgrid/webhook
 *
 * Receives SendGrid event webhooks (open, click, unsubscribe, bounce).
 * Must be configured in SendGrid dashboard → Settings → Mail Settings → Event Webhook.
 * URL: https://couplecheck.app/api/sendgrid/webhook
 * Events to enable: delivered, open, click, unsubscribe, bounce, dropped, spam report
 */
export async function POST(request: NextRequest) {
  let events: SendGridEvent[];

  try {
    events = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(events)) {
    return NextResponse.json({ error: 'Expected array of events' }, { status: 400 });
  }

  const supabase = createAdminClient();

  for (const ev of events) {
    const { email, event, leadId, emailType } = ev;

    try {
      switch (event) {
        case 'open':
          if (leadId) {
            await supabase
              .from('leads')
              .update({ last_email_at: new Date(ev.timestamp * 1000).toISOString() })
              .eq('id', leadId);
          }
          console.log(`[SendGrid] open — ${emailType} — ${email}`);
          break;

        case 'click':
          console.log(`[SendGrid] click — ${emailType} — ${email} — ${ev.url}`);
          break;

        case 'unsubscribe':
          // Mark lead as unsubscribed — n8n will stop sequence on next poll
          await supabase
            .from('leads')
            .update({ unsubscribed: true })
            .eq('email', email.toLowerCase());
          console.log(`[SendGrid] unsubscribe — ${email}`);
          break;

        case 'bounce':
        case 'dropped':
          console.warn(`[SendGrid] ${event} — ${email} — ${emailType}`);
          break;

        case 'spamreport':
          await supabase
            .from('leads')
            .update({ unsubscribed: true })
            .eq('email', email.toLowerCase());
          console.warn(`[SendGrid] spam report — ${email}`);
          break;
      }
    } catch (err) {
      console.error(`[SendGrid webhook] Error processing event ${event}:`, err);
    }
  }

  return NextResponse.json({ received: true });
}
