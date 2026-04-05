import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { SettingsSection } from "@/components/platform/settings/SettingsSection";
import { BillingActions } from "./BillingActions";

export default async function BillingSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("settings.billing");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = user
    ? await supabase
        .from("users")
        .select("platform_access_type")
        .eq("id", user.id)
        .single()
    : { data: null };

  const { data: subscription } = user
    ? await supabase
        .from("subscriptions")
        .select("status, current_period_end, stripe_customer_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const accessType =
    (userData?.platform_access_type as string | null) ?? "none";
  const status = (subscription?.status as string | null) ?? null;

  const nextRenewal = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString(
        locale === "fr" ? "fr-FR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "—";

  const tStatus = await getTranslations("settings.billing.status");

  const statusLabel =
    accessType === "trial"
      ? tStatus("trial")
      : accessType === "subscription"
      ? tStatus("subscription")
      : accessType === "early_adopter"
      ? tStatus("early_adopter")
      : tStatus("none");

  return (
    <div>
      <h2 className="font-display font-normal text-[22px] text-[var(--foreground)] tracking-tight mb-6">
        {t("title")}
      </h2>

      <SettingsSection title={t("currentPlan")}>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-[var(--foreground)]">
            {statusLabel}
          </span>
          {status && (
            <span className="text-[11px] text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-0.5 rounded-full">
              {status}
            </span>
          )}
        </div>
      </SettingsSection>

      <SettingsSection title={t("nextRenewal")}>
        <p className="text-[14px] text-[var(--muted-foreground)]">{nextRenewal}</p>
      </SettingsSection>

      <SettingsSection title={t("invoices")}>
        <a
          href="https://billing.stripe.com/p/login/test_placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-[var(--border)] text-[var(--foreground)] text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[var(--muted)] transition-colors"
        >
          {t("invoicesPortal")}
        </a>
      </SettingsSection>

      {accessType === "subscription" && <BillingActions />}
    </div>
  );
}
