import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChatContainer } from "@/components/platform/chat/ChatContainer";
import type { Message } from "@/hooks/useChat";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ locale: string; conversationId: string }>;
}) {
  const { locale, conversationId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/platform/login`);

  // Load conversation + messages
  const [{ data: conversation }, { data: messages }, { data: userData }] =
    await Promise.all([
      supabase
        .from("conversations")
        .select("id, title, user_id")
        .eq("id", conversationId)
        .single(),
      supabase
        .from("chat_messages")
        .select("id, role, content, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true }),
      supabase
        .from("users")
        .select("messages_used_this_month, monthly_limit")
        .eq("id", user.id)
        .single(),
    ]);

  if (!conversation || conversation.user_id !== user.id) {
    redirect(`/${locale}/platform/chat`);
  }

  const initialMessages: Message[] = (messages ?? []).map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen flex flex-col">
      <ChatContainer
        conversationId={conversationId}
        initialMessages={initialMessages}
        messagesUsed={userData?.messages_used_this_month ?? 0}
        monthlyLimit={userData?.monthly_limit ?? 60}
      />
    </div>
  );
}
