import type { Metadata } from "next";
import Link from "next/link";

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

// Placeholder — contenu complet implémenté en tâche 4.5
export default async function PlatformLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="font-display font-normal italic text-[28px] text-[#1A1916] mb-6">
          CoupleCheck
        </p>
        <h1 className="font-display font-normal text-[36px] md:text-[46px] leading-[1.1] tracking-[-0.02em] text-[#1A1916] mb-4">
          {locale === "fr"
            ? <>Un espace pour parler de ton couple</>
            : <>A space to talk about your relationship</>}
        </h1>
        <p className="text-[16px] text-[#5A5854] leading-[1.65] mb-8">
          {locale === "fr"
            ? "La plateforme arrive bientôt. En attendant, découvre ton diagnostic gratuit."
            : "The platform is coming soon. In the meantime, get your free diagnosis."}
        </p>
        <Link
          href={`/${locale}/quiz`}
          className="inline-flex items-center gap-2 bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 px-7 rounded-full transition-colors duration-150"
        >
          {locale === "fr" ? "Faire le quiz gratuit" : "Take the free quiz"}
        </Link>
      </div>
    </main>
  );
}
