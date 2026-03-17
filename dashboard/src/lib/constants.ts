export const COLORS = {
  teal: "#0d9488",
  blue: "#2563eb",
  amber: "#d97706",
  rose: "#dc2626",
  green: "#059669",
  purple: "#7c3aed",
  demandLine: "#2563eb",
  capacityFill: "#0d9488",
  gapFill: "rgba(220, 38, 38, 0.15)",
  waterfall: {
    increase: "#2563eb",
    decrease: "#0d9488",
    total: "#7c3aed",
  },
} as const;

export const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);

export const SCENARIO_LABELS = {
  base: "Base case",
  best: "Best case",
  surge: "Surge case",
} as const;

export type Scenario = "base" | "best" | "surge";

export const OR_OPERATING_DAYS = 260;
export const ED_HOURS_PER_YEAR = 365 * 24;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/context", label: "The challenge" },
  { href: "/methodology", label: "Our approach" },
  { href: "/dashboard", label: "Dashboard" },
] as const;
