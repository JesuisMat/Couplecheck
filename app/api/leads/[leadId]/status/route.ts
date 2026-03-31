import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/leads/[leadId]/status
 *
 * Used by n8n to poll lead conversion status before sending each sequence email.
 * Returns { converted, unsubscribed } so n8n can decide whether to continue.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await params;

  if (!leadId) {
    return NextResponse.json({ error: 'Missing leadId' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: lead, error } = await supabase
    .from('leads')
    .select('id, converted, unsubscribed')
    .eq('id', leadId)
    .single();

  if (error || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({
    leadId: lead.id,
    converted: lead.converted,
    unsubscribed: lead.unsubscribed,
    shouldSendEmail: !lead.converted && !lead.unsubscribed,
  });
}
