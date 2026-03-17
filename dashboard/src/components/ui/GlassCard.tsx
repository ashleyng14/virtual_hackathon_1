"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: string;
}

export default function GlassCard({
  children,
  className = "",
  accent,
}: GlassCardProps) {
  return (
    <div
      className={`card p-4 sm:p-5 ${className}`}
      style={accent ? { borderLeft: `3px solid ${accent}` } : undefined}
    >
      {children}
    </div>
  );
}
