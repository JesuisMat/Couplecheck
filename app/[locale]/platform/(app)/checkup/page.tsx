import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CheckupContainer } from "@/components/platform/checkup/CheckupContainer";

export default async function CheckupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("checkup");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/platform/login`);

  // Check if already done this month
  const now = new Date();
  const { data: existing } = await supabase
    .from("monthly_checkups")
    .select("id, created_at")
    .eq("user_id", user.id)
    .eq("period_month", now.getMonth() + 1)
    .eq("period_year", now.getFullYear())
    .maybeSingle();

  if (existing) {
    const nextFirst = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextDate = nextFirst.toLocaleDateString(
      locale === "fr" ? "fr-FR" : "en-US",
      { day: "numeric", month: "long" }
    );

    return (
      <div className="flex items-center justify-center min-h-[60vh] px-5">
        <div className="text-center max-w-sm">
          <div className="text-[36px] mb-4">✅</div>
          <p className="font-display italic text-[20px] text-[var(--foreground)] mb-2">
            {t("alreadyDone")}
          </p>
          <p className="text-[14px] text-[var(--muted-foreground)]">
            {t("nextCheckup")} {nextDate}
          </p>
        </div>
      </div>
    );
  }

  return <CheckupContainer />;
}
