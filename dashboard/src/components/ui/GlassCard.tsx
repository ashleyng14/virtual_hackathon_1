"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "teal" | "blue" | "rose" | "none";
  hover?: boolean;
}

const glowClasses = {
  teal: "glow-teal",
  blue: "glow-blue",
  rose: "glow-rose",
  none: "",
};

export default function GlassCard({
  children,
  className = "",
  glowColor = "none",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass ${glowClasses[glowColor]} ${hover ? "glass-hover" : ""} p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
