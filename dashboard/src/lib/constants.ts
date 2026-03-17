export const COLORS = {
  teal: "#00D1B2",
  blue: "#3B82F6",
  amber: "#F59E0B",
  rose: "#EF4444",
  green: "#10B981",
  purple: "#8B5CF6",
  white: "#f0f0f5",
  muted: "#6b7280",
  demandLine: "#3B82F6",
  capacityFill: "#00D1B2",
  gapFill: "rgba(239, 68, 68, 0.3)",
  waterfall: {
    increase: "#3B82F6",
    decrease: "#00D1B2",
    total: "#8B5CF6",
  },
} as const;

export const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);

export const SCENARIO_LABELS = {
  base: "Base Case",
  best: "Best Case",
  surge: "Surge Case",
} as const;

export type Scenario = "base" | "best" | "surge";

export const OR_OPERATING_DAYS = 260;
export const ED_HOURS_PER_YEAR = 365 * 24;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/context", label: "The Challenge" },
  { href: "/methodology", label: "Our Approach" },
  { href: "/dashboard", label: "Dashboard" },
] as const;
