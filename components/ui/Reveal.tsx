"use client";

import { useInView } from "@/hooks/useInView";
import { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
}

const directionMap = {
  up: "translateY(28px)",
  left: "translateX(20px)",
  right: "translateX(-20px)",
  none: "none",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 500,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : directionMap[direction],
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
