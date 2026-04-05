import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { SettingsSection } from "@/components/platform/settings/SettingsSection";

export default async function UsageSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("settings.usage");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: userData }, { count: convCount }] = await Promise.all([
    user
      ? supabase
          .from("users")
          .select("messages_used_this_month, monthly_limit, messages_reset_at, created_at")
          .eq("id", user.id)
          .single()
      : Promise.resolve({ data: null }),
    user
      ? supabase
          .from("conversations")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
      : Promise.resolve({ count: 0 }),
  ]);

  const used = userData?.messages_used_this_month ?? 0;
  const limit = userData?.monthly_limit ?? 60;
  const percent = Math.min(100, Math.round((used / limit) * 100));

  const resetDate = userData?.messages_reset_at
    ? new Date(userData.messages_reset_at).toLocaleDateString(
        locale === "fr" ? "fr-FR" : "en-US",
        { day: "numeric", month: "long" }
      )
    : "—";

  const memberSince = userData?.created_at
    ? new Date(userData.created_at).toLocaleDateString(
        locale === "fr" ? "fr-FR" : "en-US",
        { year: "numeric", month: "long" }
      )
    : "—";

  return (
    <div>
      <h2 className="font-display font-normal text-[22px] text-[var(--foreground)] tracking-tight mb-6">
        {t("title")}
      </h2>

      <SettingsSection title={t("messagesTitle")}>
        <div className="mb-2 flex items-center justify-between text-[13px]">
          <span className="text-[var(--foreground)] font-semibold">
            {used} / {limit}
          </span>
          <span className="text-[var(--muted-foreground)]">
            {t("resetDate")} {resetDate}
          </span>
        </div>
        <div className="w-full bg-[var(--muted)] rounded-full h-2">
          <div
            className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-[12px] text-[var(--muted-foreground)] mt-1.5">{percent}% utilisés</p>
      </SettingsSection>

      <SettingsSection title={t("statsTitle")}>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t("conversations"), value: String(convCount ?? 0) },
            { label: t("checkups"), value: "—" },
            { label: t("memberSince"), value: memberSince },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--background)] rounded-[10px] border border-[var(--border)] p-3 text-center"
            >
              <p className="font-semibold text-[18px] text-[var(--foreground)] mb-0.5">
                {stat.value}
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title={t("activityTitle")}>
        {/* Placeholder sparkline — Recharts in Sprint 5 */}
        <div className="h-20 bg-[var(--muted)] rounded-[8px] flex items-center justify-center">
          <p className="text-[12px] text-[var(--muted-foreground)]">
            Graphique disponible après 1 mois d&apos;utilisation
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}
