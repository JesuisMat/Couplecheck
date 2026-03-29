import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReportData } from '@/lib/report-generator';
import { uploadPDF } from '@/lib/storage';
import { ReportPDF } from '@/components/report/ReportPDF';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const { sessionId, offerType, purchaseId } = await request.json();

    if (!sessionId || !offerType || !purchaseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch quiz session
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Fetch lead
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    const ctx = {
      locale: session.locale as 'fr' | 'en',
      globalScore: session.global_score ?? 50,
      scores: session.scores ?? {},
      painPoints: session.pain_points ?? [],
      changeWish: session.change_wish,
      rawAnswers: (session.answers as Record<string, unknown>) ?? {},
      segmentation: {
        age_range: session.age_range,
        gender: session.gender,
        relationship_duration: session.relationship_duration,
        relationship_status: session.relationship_status,
      },
      firstName: lead?.first_name,
      offerType: offerType as 'standard' | 'premium',
    };

    // Generate LLM content
    const reportData = await generateReportData(ctx);

    // Render PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(React.createElement(ReportPDF, { data: reportData }) as any);

    // Upload to Supabase Storage
    const reportUrl = await uploadPDF(Buffer.from(pdfBuffer), sessionId, offerType);

    // Update purchase record
    await supabase
      .from('purchases')
      .update({
        report_generated: true,
        report_url: reportUrl,
      })
      .eq('id', purchaseId);

    return NextResponse.json({ success: true, reportUrl });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
