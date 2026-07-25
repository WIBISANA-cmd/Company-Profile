"use client";

import { useInView } from "@/lib/useInView";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-hidden ${inView ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
