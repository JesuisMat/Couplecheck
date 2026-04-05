import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

interface MemoryEntry {
  id: string;
  category: string;
  content: string;
  created_at: string;
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("memory_data")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ memory: data?.memory_data ?? [] });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    action: "delete_entry" | "add_entry";
    entryId?: string;
    entry?: Omit<MemoryEntry, "id" | "created_at">;
  };

  const { data: current } = await supabase
    .from("users")
    .select("memory_data")
    .eq("id", user.id)
    .single();

  const entries: MemoryEntry[] = (current?.memory_data as MemoryEntry[]) ?? [];

  let updatedEntries: MemoryEntry[];

  if (body.action === "delete_entry" && body.entryId) {
    updatedEntries = entries.filter((e) => e.id !== body.entryId);
  } else if (body.action === "add_entry" && body.entry) {
    const newEntry: MemoryEntry = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...body.entry,
    };
    updatedEntries = [...entries, newEntry];
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("users")
    .update({ memory_data: updatedEntries })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, memory: updatedEntries });
}

export async function DELETE() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("users")
    .update({ memory_data: [] })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
