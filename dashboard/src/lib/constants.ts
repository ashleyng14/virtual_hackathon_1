export const COLORS = {
  navy: "#051C2C",
  blue: "#00A9F4",
  grey700: "#374151",
  grey500: "#6B7280",
  grey300: "#D1D5DB",
  grey100: "#F3F4F6",
  white: "#FFFFFF",
  black: "#111111",
  red: "#DC2626",
  green: "#059669",
  amber: "#D97706",
  demandLine: "#051C2C",
  capacityFill: "#00A9F4",
  gapFill: "rgba(220, 38, 38, 0.12)",
  waterfall: {
    increase: "#051C2C",
    decrease: "#00A9F4",
    total: "#374151",
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
