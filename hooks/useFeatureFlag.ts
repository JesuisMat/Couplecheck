"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * Reads a PostHog feature flag value (string | boolean | undefined).
 * Returns undefined on server or before PostHog is ready.
 *
 * Usage:
 *   const variant = useFeatureFlag("headline_variant");
 *   // → "control" | "variant_b" | "variant_c" | undefined
 */
export function useFeatureFlag(
  flag: string
): string | boolean | undefined {
  const [value, setValue] = useState<string | boolean | undefined>(undefined);

  useEffect(() => {
    // Read immediately (may already be loaded)
    setValue(posthog.getFeatureFlag(flag) ?? undefined);

    // Re-read when flags finish loading
    posthog.onFeatureFlags(() => {
      setValue(posthog.getFeatureFlag(flag) ?? undefined);
    });
  }, [flag]);

  return value;
}
