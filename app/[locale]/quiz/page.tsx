import type { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/QuizContainer";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace("http://localhost:3000", "https://couplecheck.app") ||
  "https://couplecheck.app";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Quiz Couple — CoupleCheck | 20 questions pour évaluer ta relation",
    description:
      "Réponds à 20 questions sur 7 dimensions relationnelles. Résultat immédiat et personnalisé. Gratuit et confidentiel.",
  },
  en: {
    title: "Relationship Quiz — CoupleCheck | 20 questions to assess your relationship",
    description:
      "Answer 20 questions across 7 relationship dimensions. Immediate, personalized result. Free and confidential.",
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
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/quiz`,
      languages: { fr: `${BASE_URL}/fr/quiz`, en: `${BASE_URL}/en/quiz` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/quiz`,
      siteName: "CoupleCheck",
      locale: locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: m.title,
      description: m.description,
    },
  };
}

export default function QuizPage() {
  return <QuizContainer />;
}
