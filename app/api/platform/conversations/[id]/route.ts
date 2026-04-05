import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [{ data: conversation }, { data: messages }] = await Promise.all([
    supabase
      .from("conversations")
      .select("id, title, created_at, updated_at, message_count")
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("chat_messages")
      .select("id, role, content, created_at, tokens_input, tokens_output")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ conversation, messages: messages ?? [] });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership
  const { data: conv } = await supabase
    .from("conversations")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!conv || conv.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Delete messages first (no CASCADE in schema)
  await supabase.from("chat_messages").delete().eq("conversation_id", id);

  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { title?: string };

  const { error } = await supabase
    .from("conversations")
    .update({ title: body.title })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
