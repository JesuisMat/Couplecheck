"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { trackEvent, EVENTS } from "@/lib/posthog";

interface PurchaseTrackerProps {
  sessionId: string;
  offerType?: string;
}

/**
 * Fires purchase_completed PostHog event once on mount.
 * Reads feature flag variants from PostHog to associate conversion with A/B test.
 */
export function PurchaseTracker({ sessionId, offerType }: PurchaseTrackerProps) {
  useEffect(() => {
    const headlineVariant = posthog.getFeatureFlag("headline_variant") ?? "control";
    const pricingVariant = posthog.getFeatureFlag("pricing_variant") ?? "control";

    trackEvent(EVENTS.PURCHASE_COMPLETED, {
      session_id: sessionId,
      offer_type: offerType,
      headline_variant: headlineVariant,
      pricing_variant: pricingVariant,
    });
  }, [sessionId, offerType]);

  return null;
}
