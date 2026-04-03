"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Dimensions } from "@/components/landing/Dimensions";
import { FAQ } from "@/components/landing/FAQ";
import { BottomCTA } from "@/components/landing/BottomCTA";
import { Footer } from "@/components/landing/Footer";
import { QuizContainer } from "@/components/quiz/QuizContainer";

export function QuizLanding() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <QuizContainer />;
  }

  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <Header />
      <Hero onStart={() => setStarted(true)} />
      <HowItWorks />
      <Dimensions />
      <FAQ />
      <BottomCTA onStart={() => setStarted(true)} />
      <Footer />
    </main>
  );
}
