# Memory System — CoupleCheck

## Overview

The memory system automatically extracts relational facts from user-AI conversations and stores them for future context personalization.

## Architecture

```
User sends message
  → Chat stream route (POST /api/chat/stream)
    → Builds UserContext (scores, onboarding, existing memory, checkups)
    → Streams LLM response (OpenRouter)
    └─ Non-blocking post-stream:
         1. Save assistant message to DB
         2. Increment message counter
         3. Update conversation metadata
         4. Extract & store new memory facts  ← this file
```

## Flow: `lib/memory-updater.ts`

### Trigger

The `updateMemoryFromConversation()` function is called **asynchronously** after each LLM response completes in `app/api/chat/stream/route.ts` (post-stream block).

### Extraction Process

1. **Precondition check**: Only processes conversations with ≥2 message exchanges (user + assistant).

2. **LLM extraction**: Sends the conversation text to OpenRouter with this prompt:
   ```
   Extract key relational facts from this conversation.
   Return ONLY valid JSON — no markdown, no explanation:
   { "facts": [{"category": "profile|communication|event|theme|preference", "content": "..."}] }
   Maximum 5 facts. Be concise. No excessive deduction. Ignore small talk.
   ```

3. **Deduplication**: Compares new facts against existing memory. Skips facts where:
   - Content already has a >70% substring overlap with an existing entry

4. **Storage**: Merges new entries into `users.memory_data` (JSONB column), keeping a max of 100 entries (FIFO — drops oldest when over limit).

### Data Structure

```typescript
interface MemoryEntry {
  id: string;           // UUID
  category: "profile" | "communication" | "event" | "theme" | "preference";
  content: string;      // The extracted fact
  created_at: string;   // ISO timestamp
}
```

### Database

- **Column**: `users.memory_data` (JSONB array)
- **Default**: `[]`
- **Max entries**: 100 (oldest dropped first)
- **Access**: Admin client (bypasses RLS)

### Usage in Context

Memory entries are included in the system prompt built by `buildSystemPrompt()` in `lib/context-builder.ts`:

```
== MEMORY ==
[profile] Marie et lui vivent à distance depuis 2 ans
[communication] Préfère parler de ses émotions mais a du mal avec la colère
[event] Premier anniversaire de mariage dans 3 semaines
...
```

### Failure Modes

The memory extraction is **non-critical** and fails silently:
- If OpenRouter call fails → no memory extracted, conversation still works
- If JSON parsing fails → extraction skipped
- If DB write fails → silent, no user-facing error

## User Control

Users can manually clear all memory via:
- Settings → Privacy → "Effacer ma mémoire"
- This calls `DELETE /api/platform/memory` which sets `memory_data = []`
