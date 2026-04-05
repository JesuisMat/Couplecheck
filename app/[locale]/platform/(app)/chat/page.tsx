import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChatContainer } from "@/components/platform/chat/ChatContainer";

// Generate contextual suggestions from quiz scores
function getSuggestions(
  scores: Record<string, number> | undefined,
  locale: string
): string[] {
  if (!scores) {
    return locale === "fr"
      ? [
          "Comment améliorer notre communication ?",
          "On vient de se disputer, j'ai besoin d'aide",
          "Comment se reconnecter émotionnellement ?",
        ]
      : [
          "How can we improve our communication?",
          "We just argued, I need help",
          "How can we reconnect emotionally?",
        ];
  }

  // Get 3 lowest-scoring dimensions
  const sorted = Object.entries(scores).sort(([, a], [, b]) => a - b);
  const lowest = sorted.slice(0, 3).map(([dim]) => dim);

  const suggestionMap: Record<string, Record<string, string>> = {
    communication: {
      fr: "Comment mieux communiquer avec mon/ma partenaire ?",
      en: "How can I communicate better with my partner?",
    },
    confiance: {
      fr: "Comment reconstruire la confiance dans ma relation ?",
      en: "How can I rebuild trust in my relationship?",
    },
    intimité: {
      fr: "Comment raviver l'intimité émotionnelle ?",
      en: "How can I reignite emotional intimacy?",
    },
    conflits: {
      fr: "Comment mieux gérer nos conflits ?",
      en: "How can we handle conflicts better?",
    },
    pardon: {
      fr: "Comment avancer après une blessure ?",
      en: "How can we move forward after hurt?",
    },
    projets: {
      fr: "Comment s'aligner sur nos projets communs ?",
      en: "How can we align on our shared goals?",
    },
    équilibre: {
      fr: "Comment trouver l'équilibre entre espace perso et vie de couple ?",
      en: "How do we balance personal space and couple time?",
    },
  };

  return lowest
    .map((dim) => suggestionMap[dim]?.[locale] ?? "")
    .filter(Boolean)
    .slice(0, 3);
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/platform/login`);

  const { data: userData } = await supabase
    .from("users")
    .select(
      "messages_used_this_month, monthly_limit, preferred_language, leads!users_lead_id_fkey(first_name, quiz_sessions(scores))"
    )
    .eq("id", user.id)
    .single();

  const firstName =
    (
      userData?.leads as Array<{ first_name?: string }> | null
    )?.[0]?.first_name ?? "";

  const scores = (
    (userData?.leads as Array<{ quiz_sessions?: Array<{ scores?: Record<string, number> }> }> | null)?.[0]
      ?.quiz_sessions ?? []
  )[0]?.scores;

  const suggestions = getSuggestions(scores, locale);

  const welcomeText =
    locale === "fr"
      ? `Bonjour${firstName ? ` ${firstName}` : ""} ! Je suis là pour t'aider à traverser ce que tu vis dans ta relation. Par où veux-tu commencer ?`
      : `Hello${firstName ? ` ${firstName}` : ""}! I'm here to help you navigate what you're going through. Where would you like to start?`;

  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen flex flex-col">
      <ChatContainer
        messagesUsed={userData?.messages_used_this_month ?? 0}
        monthlyLimit={userData?.monthly_limit ?? 60}
        welcomeText={welcomeText}
        suggestions={suggestions}
      />
    </div>
  );
}
