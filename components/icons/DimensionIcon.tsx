"use client";

import {
  MessageCircle,
  ShieldCheck,
  Heart,
  Scale,
  Feather,
  Rocket,
  Infinity,
} from "lucide-react";
import { DimensionKey } from "@/types/quiz";

interface DimensionIconProps {
  dimensionKey: DimensionKey;
  size?: number;
  className?: string;
}

export function DimensionIcon({
  dimensionKey,
  size = 16,
  className,
}: DimensionIconProps) {
  const props = { size, strokeWidth: 1.5, className };
  switch (dimensionKey) {
    case "communication":
      return <MessageCircle {...props} />;
    case "trust":
      return <ShieldCheck {...props} />;
    case "intimacy":
      return <Heart {...props} />;
    case "conflict":
      return <Scale {...props} />;
    case "forgiveness":
      return <Feather {...props} />;
    case "projects":
      return <Rocket {...props} />;
    case "balance":
      return <Infinity {...props} />;
  }
}
