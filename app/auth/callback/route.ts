import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const CACHE_KEY = "_cc_access";
const CACHE_TTL_S = 30 * 60; // 30 min

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Detect locale from next-intl cookie, fall back to "fr"
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie === "en" ? "en" : "fr";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData } = await supabase
          .from("users")
          .select("onboarding_completed, platform_access_type, role")
          .eq("id", user.id)
          .single();

        const onboardingDone = userData?.onboarding_completed === true;
        const accessType = (userData?.platform_access_type as string) ?? "none";
        const role = (userData?.role as string) ?? "user";

        // Build destination
        const destination = onboardingDone
          ? `/${locale}/platform/chat`
          : `/${locale}/platform/onboarding/step-1`;

        // Set access cache cookie so middleware skips the DB query
        const cacheValue = `${user.id}|${accessType}|${role}|${onboardingDone ? "1" : "0"}|${Date.now() + CACHE_TTL_S * 1000}`;
        const response = NextResponse.redirect(`${origin}${destination}`);
        response.cookies.set(CACHE_KEY, cacheValue, {
          maxAge: CACHE_TTL_S,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        return response;
      }

      return NextResponse.redirect(`${origin}/${locale}/platform/chat`);
    }
  }

  return NextResponse.redirect(
    `${origin}/${locale}/platform/login?error=oauth`
  );
}
