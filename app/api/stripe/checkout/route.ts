import { NextRequest, NextResponse } from 'next/server';
import { stripe, OFFER_AMOUNTS } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, offerType, locale } = await request.json();

    if (!sessionId || !offerType || !['standard', 'premium'].includes(offerType)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get lead for this session
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const localePrefix = locale || 'fr';

    const labels = {
      fr: {
        standard: 'Rapport CoupleCheck Standard',
        premium: 'Rapport CoupleCheck Premium',
      },
      en: {
        standard: 'CoupleCheck Standard Report',
        premium: 'CoupleCheck Premium Report',
      },
    };
    const lang = localePrefix === 'en' ? 'en' : 'fr';
    const productName = labels[lang][offerType as 'standard' | 'premium'];

    // Create Stripe Checkout Session with inline price
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: OFFER_AMOUNTS[offerType as 'standard' | 'premium'],
            product_data: {
              name: productName,
              description:
                offerType === 'premium'
                  ? lang === 'fr'
                    ? 'Rapport PDF complet (15 pages) + Agent IA Coach 1 mois'
                    : 'Complete PDF report (15 pages) + AI Coach Agent 1 month'
                  : lang === 'fr'
                    ? 'Rapport PDF complet (15 pages) avec plan d\'action personnalisé'
                    : 'Complete PDF report (15 pages) with personalized action plan',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/${localePrefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}&quiz_session=${sessionId}&offer_type=${offerType}`,
      cancel_url: `${appUrl}/${localePrefix}/result/${sessionId}/unlock`,
      customer_email: lead?.email || undefined,
      metadata: {
        quiz_session_id: sessionId,
        offer_type: offerType,
        locale: localePrefix,
        lead_id: lead?.id || '',
      },
      allow_promotion_codes: false,
      billing_address_collection: 'auto',
    });

    // Create pending purchase record
    await supabase.from('purchases').insert({
      lead_id: lead?.id || '',
      session_id: sessionId,
      stripe_session_id: checkoutSession.id,
      offer_type: offerType,
      amount_cents: OFFER_AMOUNTS[offerType as 'standard' | 'premium'],
      currency: 'eur',
      status: 'pending',
      report_generated: false,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
