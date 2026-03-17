export interface EdSite {
  site: string;
  ed_visits_2025: number;
  bays_physical_2025: number;
  bays_staffed_2025: number;
  bay_util_target: { base: number; best: number; surge: number };
}

export interface EdAcuity {
  acuity: string;
  share: { base: number; best: number; surge: number };
  treat_time_hours: { base: number; best: number; surge: number };
}

export interface EdDrivers {
  pop_growth_rate: { base: number; best: number; surge: number };
  aging_effect_multiplier_2035: { base: number; best: number; surge: number };
  disease_burden_multiplier_2035: { base: number; best: number; surge: number };
  diversion_pct_2035: { base: number; best: number; surge: number };
  triage_throughput_gain_low_acuity: { base: number; best: number; surge: number };
}

export interface OrSiteBaseline {
  site: string;
  specialty: string;
  cases_2025: number;
}

export interface OrCapacity {
  site: string;
  or_rooms_physical_2025: number;
  or_rooms_staffed_2025: number;
  sessions_per_room_per_day: number;
  session_minutes: number;
  util_target: { base: number; best: number; surge: number };
}

export interface OrTimeParams {
  specialty: string;
  avg_case_minutes: { base: number; best: number; surge: number };
  turnover_minutes: { base: number; best: number; surge: number };
  cancellation_rate: { base: number; best: number; surge: number };
}

export interface OrDrivers {
  pop_growth_rate: { base: number; best: number; surge: number };
  aging_effect_multiplier_2035: { base: number; best: number; surge: number };
  disease_burden_multiplier_2035: { base: number; best: number; surge: number };
}

export interface ExpansionEntry {
  year: number;
  setting: "ED" | "OR";
  site: string;
  additions_physical: number;
  ramp_up_pct: number;
}

export interface AllData {
  edSites: EdSite[];
  edAcuity: EdAcuity[];
  edDrivers: EdDrivers;
  orBaseline: OrSiteBaseline[];
  orCapacity: OrCapacity[];
  orTimeParams: OrTimeParams[];
  orDrivers: OrDrivers;
  expansion: ExpansionEntry[];
}

export const DATA: AllData = {
  edSites: [
    { site: "Central ED", ed_visits_2025: 340000, bays_physical_2025: 70, bays_staffed_2025: 60, bay_util_target: { base: 0.75, best: 0.78, surge: 0.70 } },
    { site: "North ED", ed_visits_2025: 180000, bays_physical_2025: 45, bays_staffed_2025: 38, bay_util_target: { base: 0.75, best: 0.78, surge: 0.70 } },
    { site: "West ED", ed_visits_2025: 120000, bays_physical_2025: 32, bays_staffed_2025: 28, bay_util_target: { base: 0.74, best: 0.77, surge: 0.69 } },
    { site: "Airport ED", ed_visits_2025: 65000, bays_physical_2025: 18, bays_staffed_2025: 15, bay_util_target: { base: 0.72, best: 0.75, surge: 0.67 } },
    { site: "Private ED A", ed_visits_2025: 90000, bays_physical_2025: 22, bays_staffed_2025: 19, bay_util_target: { base: 0.75, best: 0.78, surge: 0.70 } },
    { site: "Private ED B", ed_visits_2025: 75000, bays_physical_2025: 20, bays_staffed_2025: 17, bay_util_target: { base: 0.75, best: 0.78, surge: 0.70 } },
  ],
  edAcuity: [
    { acuity: "High", share: { base: 0.06, best: 0.06, surge: 0.08 }, treat_time_hours: { base: 4.5, best: 4.0, surge: 5.5 } },
    { acuity: "Med", share: { base: 0.44, best: 0.42, surge: 0.46 }, treat_time_hours: { base: 1.5, best: 1.3, surge: 2.0 } },
    { acuity: "Low", share: { base: 0.50, best: 0.52, surge: 0.46 }, treat_time_hours: { base: 0.75, best: 0.6, surge: 1.0 } },
  ],
  edDrivers: {
    pop_growth_rate: { base: 0.02, best: 0.015, surge: 0.035 },
    aging_effect_multiplier_2035: { base: 1.06, best: 1.08, surge: 1.05 },
    disease_burden_multiplier_2035: { base: 1.08, best: 1.06, surge: 1.10 },
    diversion_pct_2035: { base: 0.08, best: 0.12, surge: 0.02 },
    triage_throughput_gain_low_acuity: { base: 0.05, best: 0.12, surge: 0 },
  },
  orBaseline: [
    { site: "Central OR", specialty: "General", cases_2025: 6000 },
    { site: "Central OR", specialty: "Ortho", cases_2025: 5000 },
    { site: "Central OR", specialty: "OB/GYN", cases_2025: 4000 },
    { site: "North OR", specialty: "General", cases_2025: 4000 },
    { site: "North OR", specialty: "Ortho", cases_2025: 3200 },
    { site: "West OR", specialty: "General", cases_2025: 3200 },
    { site: "West OR", specialty: "OB/GYN", cases_2025: 2500 },
    { site: "Womens OR", specialty: "OB/GYN", cases_2025: 4800 },
    { site: "Private OR", specialty: "General", cases_2025: 4200 },
    { site: "Private OR", specialty: "ENT", cases_2025: 3000 },
    { site: "Private OR", specialty: "Urology", cases_2025: 2400 },
  ],
  orCapacity: [
    { site: "Central OR", or_rooms_physical_2025: 22, or_rooms_staffed_2025: 19, sessions_per_room_per_day: 2, session_minutes: 240, util_target: { base: 0.78, best: 0.82, surge: 0.70 } },
    { site: "North OR", or_rooms_physical_2025: 10, or_rooms_staffed_2025: 9, sessions_per_room_per_day: 2, session_minutes: 240, util_target: { base: 0.78, best: 0.82, surge: 0.70 } },
    { site: "West OR", or_rooms_physical_2025: 8, or_rooms_staffed_2025: 7, sessions_per_room_per_day: 2, session_minutes: 240, util_target: { base: 0.77, best: 0.81, surge: 0.69 } },
    { site: "Womens OR", or_rooms_physical_2025: 7, or_rooms_staffed_2025: 6, sessions_per_room_per_day: 2, session_minutes: 240, util_target: { base: 0.78, best: 0.82, surge: 0.70 } },
    { site: "Private OR", or_rooms_physical_2025: 14, or_rooms_staffed_2025: 12, sessions_per_room_per_day: 2, session_minutes: 240, util_target: { base: 0.79, best: 0.83, surge: 0.71 } },
  ],
  orTimeParams: [
    { specialty: "General", avg_case_minutes: { base: 95, best: 90, surge: 105 }, turnover_minutes: { base: 30, best: 25, surge: 40 }, cancellation_rate: { base: 0.06, best: 0.04, surge: 0.10 } },
    { specialty: "Ortho", avg_case_minutes: { base: 135, best: 125, surge: 150 }, turnover_minutes: { base: 35, best: 30, surge: 45 }, cancellation_rate: { base: 0.07, best: 0.05, surge: 0.12 } },
    { specialty: "OB/GYN", avg_case_minutes: { base: 85, best: 80, surge: 95 }, turnover_minutes: { base: 25, best: 22, surge: 35 }, cancellation_rate: { base: 0.05, best: 0.04, surge: 0.09 } },
    { specialty: "ENT", avg_case_minutes: { base: 65, best: 60, surge: 75 }, turnover_minutes: { base: 25, best: 22, surge: 35 }, cancellation_rate: { base: 0.06, best: 0.04, surge: 0.10 } },
    { specialty: "Urology", avg_case_minutes: { base: 90, best: 85, surge: 100 }, turnover_minutes: { base: 30, best: 25, surge: 40 }, cancellation_rate: { base: 0.06, best: 0.04, surge: 0.10 } },
  ],
  orDrivers: {
    pop_growth_rate: { base: 0.02, best: 0.015, surge: 0.03 },
    aging_effect_multiplier_2035: { base: 1.05, best: 1.06, surge: 1.04 },
    disease_burden_multiplier_2035: { base: 1.05, best: 1.04, surge: 1.07 },
  },
  expansion: [
    { year: 2029, setting: "ED", site: "Central ED", additions_physical: 10, ramp_up_pct: 0.6 },
    { year: 2030, setting: "ED", site: "Central ED", additions_physical: 10, ramp_up_pct: 0.85 },
    { year: 2031, setting: "ED", site: "Central ED", additions_physical: 10, ramp_up_pct: 1.0 },
    { year: 2028, setting: "OR", site: "Central OR", additions_physical: 2, ramp_up_pct: 0.6 },
    { year: 2029, setting: "OR", site: "Central OR", additions_physical: 2, ramp_up_pct: 0.85 },
    { year: 2030, setting: "OR", site: "Central OR", additions_physical: 2, ramp_up_pct: 1.0 },
    { year: 2029, setting: "ED", site: "North ED", additions_physical: 5, ramp_up_pct: 0.6 },
    { year: 2030, setting: "ED", site: "North ED", additions_physical: 5, ramp_up_pct: 0.85 },
    { year: 2031, setting: "ED", site: "North ED", additions_physical: 5, ramp_up_pct: 1.0 },
    { year: 2029, setting: "ED", site: "West ED", additions_physical: 5, ramp_up_pct: 0.6 },
    { year: 2030, setting: "ED", site: "West ED", additions_physical: 5, ramp_up_pct: 0.85 },
    { year: 2031, setting: "ED", site: "West ED", additions_physical: 5, ramp_up_pct: 1.0 },
    { year: 2029, setting: "OR", site: "North OR", additions_physical: 1, ramp_up_pct: 0.6 },
    { year: 2030, setting: "OR", site: "North OR", additions_physical: 1, ramp_up_pct: 0.85 },
    { year: 2031, setting: "OR", site: "North OR", additions_physical: 1, ramp_up_pct: 1.0 },
    { year: 2029, setting: "OR", site: "West OR", additions_physical: 1, ramp_up_pct: 0.6 },
    { year: 2030, setting: "OR", site: "West OR", additions_physical: 1, ramp_up_pct: 0.85 },
    { year: 2031, setting: "OR", site: "West OR", additions_physical: 1, ramp_up_pct: 1.0 },
  ],
};
