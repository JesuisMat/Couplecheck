interface EmailSequencePayload {
  leadId: string;
  sessionId: string;
  email: string;
  firstName: string;
  globalScore: number;
  risksCount: number;
  resultUrl: string;
  locale: 'fr' | 'en';
}

/**
 * Triggers the n8n email sequence for a new lead.
 * n8n will handle J+2, J+5, J+7, J+14 follow-up emails.
 * Before each send, n8n polls /api/leads/[leadId]/status to check for conversion.
 * Non-blocking: logs errors without throwing.
 */
export async function triggerEmailSequence(payload: EmailSequencePayload): Promise<void> {
  const webhookUrl = process.env.N8N_WEBHOOK_SEQUENCE_URL;
  if (!webhookUrl) {
    console.warn('[n8n] N8N_WEBHOOK_SEQUENCE_URL not configured — email sequence skipped');
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://couplecheck.app';

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: payload.leadId,
        email: payload.email,
        firstName: payload.firstName,
        globalScore: payload.globalScore,
        risksCount: payload.risksCount,
        resultUrl: payload.resultUrl,
        checkoutUrl: `${appUrl}/${payload.locale}/result/${payload.sessionId}/unlock`,
        locale: payload.locale,
        apiUrl: appUrl,
      }),
    });

    if (!res.ok) {
      console.error(`[n8n] Webhook returned ${res.status}:`, await res.text());
    } else {
      console.log('[n8n] Email sequence triggered for lead:', payload.leadId);
    }
  } catch (err) {
    console.error('[n8n] Failed to trigger email sequence:', err);
  }
}
