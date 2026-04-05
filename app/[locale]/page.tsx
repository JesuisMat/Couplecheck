import type { Metadata } from "next";
import { HeaderV2 } from "@/components/landing-v2/HeaderV2";
import { HeroV2 } from "@/components/landing-v2/HeroV2";
import { Differentiator } from "@/components/landing-v2/Differentiator";
import { HowItWorksV2 } from "@/components/landing-v2/HowItWorksV2";
import { PricingSection } from "@/components/landing-v2/PricingSection";
import { FAQPlatform } from "@/components/landing-v2/FAQPlatform";
import { FooterV2 } from "@/components/landing-v2/FooterV2";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace("http://localhost:3000", "https://couplecheck.app") ||
  "https://couplecheck.app";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "CoupleCheck — Plateforme de coaching relationnel par IA",
    description:
      "Un espace privé pour parler de ton couple avec un agent IA qui te connaît vraiment. Quiz gratuit + rapport personnalisé + plateforme abonnement.",
  },
  en: {
    title: "CoupleCheck — AI-powered relationship coaching platform",
    description:
      "A private space to talk about your relationship with an AI that truly knows you. Free quiz + personalized report + subscription platform.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.fr;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { fr: `${BASE_URL}/fr`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "CoupleCheck",
      locale: locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
  };
}

export default async function PlatformLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // locale consumed so Next.js doesn't complain about unused params
  await params;

  return (
    <div className="bg-[var(--background)]">
      <HeaderV2 />
      <HeroV2 />
      <Differentiator />
      <HowItWorksV2 />
      <PricingSection />
      <FAQPlatform />
      <FooterV2 />
    </div>
  );
}
