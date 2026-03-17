export interface Citation {
  label: string;
  source: string;
  base: number;
  best: number;
  surge: number;
  unit: string;
}

export const ED_DRIVER_CITATIONS: Record<string, Citation> = {
  pop_growth_rate: {
    label: "Population Growth Rate",
    source: "National Statistics Authority, Census Projection 2024",
    base: 0.02,
    best: 0.015,
    surge: 0.035,
    unit: "%",
  },
  aging_effect_multiplier_2035: {
    label: "Aging Effect (by 2035)",
    source: "WHO Regional Demographic Forecast, 2024 Edition",
    base: 1.06,
    best: 1.08,
    surge: 1.05,
    unit: "x",
  },
  disease_burden_multiplier_2035: {
    label: "Disease Burden (by 2035)",
    source: "Global Burden of Disease Study, IHME 2023",
    base: 1.08,
    best: 1.06,
    surge: 1.1,
    unit: "x",
  },
  diversion_pct_2035: {
    label: "ED Diversion to Urgent Care",
    source: "Ministry of Health Primary Care Expansion Plan, 2024",
    base: 0.08,
    best: 0.12,
    surge: 0.02,
    unit: "%",
  },
  triage_throughput_gain_low_acuity: {
    label: "Triage Throughput Gain (Low Acuity)",
    source: "Hospital Operations Benchmarking Study, McKinsey 2024",
    base: 0.05,
    best: 0.12,
    surge: 0,
    unit: "%",
  },
};

export const OR_DRIVER_CITATIONS: Record<string, Citation> = {
  pop_growth_rate: {
    label: "Population Growth Rate",
    source: "National Statistics Authority, Census Projection 2024",
    base: 0.02,
    best: 0.015,
    surge: 0.03,
    unit: "%",
  },
  aging_effect_multiplier_2035: {
    label: "Aging Effect (by 2035)",
    source: "WHO Regional Demographic Forecast, 2024 Edition",
    base: 1.05,
    best: 1.06,
    surge: 1.04,
    unit: "x",
  },
  disease_burden_multiplier_2035: {
    label: "Disease Burden (by 2035)",
    source: "Global Burden of Disease Study, IHME 2023",
    base: 1.05,
    best: 1.04,
    surge: 1.07,
    unit: "x",
  },
};

export const CAPACITY_CITATIONS = {
  util_target: {
    label: "Utilization Target",
    source: "International benchmarks; adjusted for local operating conditions",
    unit: "%",
  },
  treat_time: {
    label: "Treatment Time",
    source: "Site-level time-motion study, Q3 2024",
    unit: "hrs",
  },
  cancellation_rate: {
    label: "Cancellation Rate",
    source: "Hospital MIS data, rolling 12-month average 2024",
    unit: "%",
  },
};
