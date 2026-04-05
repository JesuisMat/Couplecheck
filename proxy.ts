import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

// ─── Session cache cookie ─────────────────────────────────────────────────────
// Format: uid|accessType|role|onboardingDone(0/1)|expiryMs
const CACHE_KEY = "_cc_access";
const CACHE_TTL_S = 30 * 60; // 30 minutes

interface CachedSession {
  accessType: string;
  role: string;
  onboardingDone: boolean;
}

function readCache(value: string | undefined, uid: string): CachedSession | null {
  if (!value) return null;
  const p = value.split("|");
  if (p.length !== 5) return null;
  if (p[0] !== uid) return null;
  if (Number(p[4]) < Date.now()) return null;
  return { accessType: p[1], role: p[2], onboardingDone: p[3] === "1" };
}

function buildCacheValue(uid: string, accessType: string, role: string, onboardingDone: boolean): string {
  return `${uid}|${accessType}|${role}|${onboardingDone ? "1" : "0"}|${Date.now() + CACHE_TTL_S * 1000}`;
}

// ─── Proxy ────────────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPlatformRoute = /^\/(fr|en)\/platform/.test(pathname);
  const isAdminRoute = /^\/(fr|en)\/admin/.test(pathname);

  if (!isPlatformRoute && !isAdminRoute) {
    return intlMiddleware(request);
  }

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(fr|en)/);
  const locale = localeMatch ? localeMatch[1] : "fr";

  // ── Post-subscription redirect from Stripe: delete stale cache ────────────
  if (request.nextUrl.searchParams.has("subscribed")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
    const cookieResp = NextResponse.next({ request: { headers: requestHeaders } });
    cookieResp.cookies.set(CACHE_KEY, "", { maxAge: 0, path: "/" });
    return cookieResp;
  }

  // Build request headers with X-NEXT-INTL-LOCALE so next-intl works without
  // intlMiddleware (which is bypassed for platform/admin routes)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);

  // Build a mutable response for cookie updates
  let response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Create supabase client for auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Rebuild from updated request (cookies modified above) + locale header
          const updatedHeaders = new Headers(request.headers);
          updatedHeaders.set("X-NEXT-INTL-LOCALE", locale);
          response = NextResponse.next({ request: { headers: updatedHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Auth pages (login / register) ──────────────────────────────────────────
  const isAuthPage = /^\/(fr|en)\/platform\/(login|register)/.test(pathname);
  if (isAuthPage) {
    if (user) {
      // Already authenticated — redirect away from auth pages using cache
      const cached = readCache(request.cookies.get(CACHE_KEY)?.value, user.id);
      if (cached) {
        const dest = cached.onboardingDone
          ? `/${locale}/platform/chat`
          : `/${locale}/platform/onboarding/step-1`;
        return NextResponse.redirect(new URL(dest, request.url));
      }
      // No cache: redirect to chat, page-level check will handle onboarding
      return NextResponse.redirect(new URL(`/${locale}/platform/chat`, request.url));
    }
    return intlMiddleware(request);
  }

  // ── Unauthenticated ─────────────────────────────────────────────────────────
  if (!user) {
    return NextResponse.redirect(
      new URL(`/${locale}/platform/login`, request.url)
    );
  }

  // ── Resolve user data (from cache or DB) ────────────────────────────────────
  const cached = readCache(request.cookies.get(CACHE_KEY)?.value, user.id);

  let accessType: string;
  let userRole: string;
  let onboardingDone: boolean;

  if (cached) {
    accessType = cached.accessType;
    userRole = cached.role;
    onboardingDone = cached.onboardingDone;
  } else {
    const { data: userData } = await supabase
      .from("users")
      .select("platform_access_type, role, onboarding_completed")
      .eq("id", user.id)
      .single();

    accessType = (userData?.platform_access_type as string) ?? "none";
    userRole = (userData?.role as string) ?? "user";
    onboardingDone = userData?.onboarding_completed === true;

    // Write cache
    response.cookies.set(
      CACHE_KEY,
      buildCacheValue(user.id, accessType, userRole, onboardingDone),
      {
        maxAge: CACHE_TTL_S,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      }
    );
  }

  // ── Admin bypass ─────────────────────────────────────────────────────────────
  if (userRole === "admin") return response;

  // ── Paid subscribers skip onboarding — straight to chat ─────────────────────
  const hasPaidAccess = ["subscription", "early_adopter"].includes(accessType);

  // ── Onboarding pages — always pass through ───────────────────────────────────
  const isOnboardingPage = /^\/(fr|en)\/platform\/onboarding/.test(pathname);
  if (isOnboardingPage) return response;

  // ── Subscribe page — always pass through ─────────────────────────────────────
  const isSubscribePage = /^\/(fr|en)\/platform\/subscribe/.test(pathname);
  if (isSubscribePage) return response;

  // ── Chat / platform root: paid users bypass onboarding ──────────────────────
  const isChatRoute = /^\/(fr|en)\/platform\/chat/.test(pathname);
  if (isChatRoute && hasPaidAccess) return response;

  // ── Enforce onboarding for non-paying users ────────────────────────────────
  if (!onboardingDone) {
    return NextResponse.redirect(
      new URL(`/${locale}/platform/onboarding/step-1`, request.url)
    );
  }

  // ── Access guard for the rest of the platform ────────────────────────────────
  const validAccess = ["trial", "subscription", "early_adopter"];
  if (!validAccess.includes(accessType)) {
    return NextResponse.redirect(
      new URL(`/${locale}/platform/subscribe`, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};
