import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { locale } = await request.json();
  const lang = locale === "en" ? "en" : "fr";

  const admin = createAdminClient();

  // Get user data — includes onboarding status for smart success_url
  const { data: userData } = await admin
    .from("users")
    .select("stripe_customer_id, email, onboarding_completed")
    .eq("id", user.id)
    .single();

  let customerId = userData?.stripe_customer_id as string | undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userData?.email ?? user.email ?? undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;

    await admin
      .from("users")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const priceId = process.env.STRIPE_PRICE_SUBSCRIPTION;

  if (!priceId) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_SUBSCRIPTION not configured" },
      { status: 500 }
    );
  }

  const productName =
    lang === "fr" ? "CoupleCheck Abonnement" : "CoupleCheck Subscription";
  const productDesc =
    lang === "fr"
      ? "Accès illimité à l'agent IA coach + checkups mensuels"
      : "Unlimited access to AI relationship coach + monthly checkups";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: { userId: user.id },
    },
    success_url: `${appUrl}/${lang}/platform/chat?subscribed=1`,
    cancel_url: `${appUrl}/${lang}/platform/subscribe?canceled=1`,
    metadata: { userId: user.id, locale: lang },
    custom_text: {
      submit: {
        message:
          lang === "fr"
            ? productDesc
            : productDesc,
      },
    },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
  });

  void productName;

  return NextResponse.json({ url: session.url });
}
