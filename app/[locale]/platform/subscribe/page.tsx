import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubscribeClient } from "./SubscribeClient";

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/platform/login`);
  }

  const userId = user.id;

  const { data: userData } = await supabase
    .from("users")
    .select("platform_access_type, messages_used_this_month, trial_end")
    .eq("id", userId)
    .single();

  // Already subscribed — redirect to chat
  if (userData?.platform_access_type === "subscription") {
    redirect(`/${locale}/platform/chat`);
  }

  // Count conversations and checkups for social proof
  const [convResult, checkupResult] = await Promise.all([
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("monthly_checkups")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),
  ]);

  return (
    <SubscribeClient
      locale={locale}
      accessType={(userData?.platform_access_type as string) ?? "none"}
      messagesUsed={(userData?.messages_used_this_month as number) ?? 0}
      trialEnd={(userData?.trial_end as string | null) ?? null}
      conversationsCount={convResult.count ?? 0}
      checkupsCount={checkupResult.count ?? 0}
    />
  );
}
