import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Dimensions } from "@/components/landing/Dimensions";
import { FAQ } from "@/components/landing/FAQ";
import { BottomCTA } from "@/components/landing/BottomCTA";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoupleCheck — Évalue la santé de ton couple en 3 minutes",
  description:
    "Quiz relationnel gratuit. Reçois un rapport personnalisé avec tes forces, zones à risque et un plan d'action concret.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Header />
      <Hero />
      <HowItWorks />
      <Dimensions />
      <FAQ />
      <BottomCTA />
      <Footer />
    </main>
  );
}
