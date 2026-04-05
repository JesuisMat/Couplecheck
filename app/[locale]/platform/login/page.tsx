import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginClient } from "./LoginClient";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Already authenticated — send to the right place
    const { data } = await supabase
      .from("users")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    if (!data?.onboarding_completed) {
      redirect(`/${locale}/platform/onboarding/step-1`);
    }
    redirect(`/${locale}/platform/chat`);
  }

  return <LoginClient />;
}
