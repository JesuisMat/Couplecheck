import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PlatformIndexPage({
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

  const { data: userData } = await supabase
    .from("users")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!userData?.onboarding_completed) {
    redirect(`/${locale}/platform/onboarding/step-1`);
  }

  redirect(`/${locale}/platform/chat`);
}
