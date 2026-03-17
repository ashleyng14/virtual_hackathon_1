import { DATA, type AllData } from "./data";
import { YEARS, ED_HOURS_PER_YEAR, OR_OPERATING_DAYS, type Scenario } from "./constants";

export interface DemandDriverValues {
  pop_growth_rate: number;
  aging_effect_multiplier_2035: number;
  disease_burden_multiplier_2035: number;
  diversion_pct_2035: number;
  triage_throughput_gain_low_acuity: number;
}

export interface EdCapacityParams {
  util_target_override?: number;
  acuity_shares?: { high: number; med: number; low: number };
  treat_times?: { high: number; med: number; low: number };
}

export interface OrDemandDriverValues {
  pop_growth_rate: number;
  aging_effect_multiplier_2035: number;
  disease_burden_multiplier_2035: number;
}

export interface OrCapacityParams {
  util_target_override?: number;
  cancellation_rate_override?: number;
}

export interface YearlyDataPoint {
  year: number;
  demand: number;
  capacity: number;
  gap: number;
}

export interface SiteYearlyData {
  site: string;
  data: YearlyDataPoint[];
}

function interpolate2035(multiplier2035: number, year: number): number {
  return 1 + (multiplier2035 - 1) * (year - 2025) / 10;
}

export function projectEdDemand(
  drivers: DemandDriverValues,
  data: AllData = DATA,
): SiteYearlyData[] {
  const lowAcuityShare = data.edAcuity.find((a) => a.acuity === "Low")?.share.base ?? 0.5;

  return data.edSites.map((site) => ({
    site: site.site,
    data: YEARS.map((year) => {
      const t = year - 2025;
      const growth = Math.pow(1 + drivers.pop_growth_rate, t);
      const aging = interpolate2035(drivers.aging_effect_multiplier_2035, year);
      const disease = interpolate2035(drivers.disease_burden_multiplier_2035, year);
      const diversion = 1 - drivers.diversion_pct_2035 * (t / 10);
      const triage = 1 - drivers.triage_throughput_gain_low_acuity * lowAcuityShare * (t / 10);
      const demand = Math.round(site.ed_visits_2025 * growth * aging * disease * diversion * triage);
      return { year, demand, capacity: 0, gap: 0 };
    }),
  }));
}

export function computeEdCapacity(
  scenario: Scenario,
  params: EdCapacityParams = {},
  data: AllData = DATA,
): SiteYearlyData[] {
  const weightedTreatHours = data.edAcuity.reduce((sum, a) => {
    const share = params.acuity_shares
      ? (a.acuity === "High" ? params.acuity_shares.high : a.acuity === "Med" ? params.acuity_shares.med : params.acuity_shares.low)
      : a.share[scenario];
    const time = params.treat_times
      ? (a.acuity === "High" ? params.treat_times.high : a.acuity === "Med" ? params.treat_times.med : params.treat_times.low)
      : a.treat_time_hours[scenario];
    return sum + share * time;
  }, 0);

  return data.edSites.map((site) => {
    const utilTarget = params.util_target_override ?? site.bay_util_target[scenario];

    return {
      site: site.site,
      data: YEARS.map((year) => {
        let expansionBays = 0;
        for (const exp of data.expansion) {
          if (exp.setting === "ED" && exp.site === site.site && exp.year <= year) {
            expansionBays = exp.additions_physical * exp.ramp_up_pct;
          }
        }
        const totalBays = site.bays_staffed_2025 + expansionBays;
        const capacity = Math.round((totalBays * ED_HOURS_PER_YEAR * utilTarget) / weightedTreatHours);
        return { year, demand: 0, capacity, gap: 0 };
      }),
    };
  });
}

export function projectOrDemand(
  drivers: OrDemandDriverValues,
  data: AllData = DATA,
): { site: string; specialty: string; data: YearlyDataPoint[] }[] {
  return data.orBaseline.map((entry) => ({
    site: entry.site,
    specialty: entry.specialty,
    data: YEARS.map((year) => {
      const t = year - 2025;
      const growth = Math.pow(1 + drivers.pop_growth_rate, t);
      const aging = interpolate2035(drivers.aging_effect_multiplier_2035, year);
      const disease = interpolate2035(drivers.disease_burden_multiplier_2035, year);
      const demand = Math.round(entry.cases_2025 * growth * aging * disease);
      return { year, demand, capacity: 0, gap: 0 };
    }),
  }));
}

export function computeOrCapacity(
  scenario: Scenario,
  params: OrCapacityParams = {},
  data: AllData = DATA,
): SiteYearlyData[] {
  return data.orCapacity.map((site) => {
    const utilTarget = params.util_target_override ?? site.util_target[scenario];
    const specialtiesAtSite = data.orBaseline.filter((b) => b.site === site.site);
    const totalCases2025 = specialtiesAtSite.reduce((s, b) => s + b.cases_2025, 0);

    const weightedSlotMinutes = specialtiesAtSite.reduce((sum, b) => {
      const tp = data.orTimeParams.find((t) => t.specialty === b.specialty);
      if (!tp) return sum;
      const weight = b.cases_2025 / totalCases2025;
      const cancelRate = params.cancellation_rate_override ?? tp.cancellation_rate[scenario];
      const effectiveSlot = (tp.avg_case_minutes[scenario] + tp.turnover_minutes[scenario]) / (1 - cancelRate);
      return sum + weight * effectiveSlot;
    }, 0);

    return {
      site: site.site,
      data: YEARS.map((year) => {
        let expansionRooms = 0;
        for (const exp of data.expansion) {
          if (exp.setting === "OR" && exp.site === site.site && exp.year <= year) {
            expansionRooms = exp.additions_physical * exp.ramp_up_pct;
          }
        }
        const totalRooms = site.or_rooms_staffed_2025 + expansionRooms;
        const minutesAvailable = totalRooms * site.sessions_per_room_per_day * site.session_minutes * OR_OPERATING_DAYS * utilTarget;
        const capacity = weightedSlotMinutes > 0 ? Math.round(minutesAvailable / weightedSlotMinutes) : 0;
        return { year, demand: 0, capacity, gap: 0 };
      }),
    };
  });
}

export function aggregateByYear(sitesData: SiteYearlyData[]): YearlyDataPoint[] {
  return YEARS.map((year) => {
    let totalDemand = 0;
    let totalCapacity = 0;
    for (const s of sitesData) {
      const pt = s.data.find((d) => d.year === year);
      if (pt) {
        totalDemand += pt.demand;
        totalCapacity += pt.capacity;
      }
    }
    return { year, demand: totalDemand, capacity: totalCapacity, gap: totalCapacity - totalDemand };
  });
}

export function mergeDemandsAndCapacities(
  demands: SiteYearlyData[],
  capacities: SiteYearlyData[],
): SiteYearlyData[] {
  return demands.map((dSite) => {
    const cSite = capacities.find((c) => c.site === dSite.site);
    return {
      site: dSite.site,
      data: dSite.data.map((d) => {
        const cap = cSite?.data.find((c) => c.year === d.year)?.capacity ?? 0;
        return { year: d.year, demand: d.demand, capacity: cap, gap: cap - d.demand };
      }),
    };
  });
}

export function computeEdWaterfall(
  baseVisits: number,
  drivers: DemandDriverValues,
): { label: string; value: number; type: "increase" | "decrease" | "total" }[] {
  const base = baseVisits;
  const popEffect = base * (Math.pow(1 + drivers.pop_growth_rate, 10) - 1);
  const agingEffect = base * (drivers.aging_effect_multiplier_2035 - 1);
  const diseaseEffect = base * (drivers.disease_burden_multiplier_2035 - 1);
  const diversionEffect = -base * drivers.diversion_pct_2035;
  const lowAcuityShare = DATA.edAcuity.find((a) => a.acuity === "Low")?.share.base ?? 0.5;
  const triageEffect = -base * drivers.triage_throughput_gain_low_acuity * lowAcuityShare;
  const net = base + popEffect + agingEffect + diseaseEffect + diversionEffect + triageEffect;

  return [
    { label: "Baseline 2025", value: Math.round(base), type: "total" },
    { label: "Population Growth", value: Math.round(popEffect), type: "increase" },
    { label: "Aging Effect", value: Math.round(agingEffect), type: "increase" },
    { label: "Disease Burden", value: Math.round(diseaseEffect), type: "increase" },
    { label: "ED Diversion", value: Math.round(diversionEffect), type: "decrease" },
    { label: "Triage Efficiency", value: Math.round(triageEffect), type: "decrease" },
    { label: "Projected 2035", value: Math.round(net), type: "total" },
  ];
}

export function generateRecommendations(
  gap2035: number,
  gapByYear: YearlyDataPoint[],
  domain: "ED" | "OR",
): { timeframe: string; action: string; urgency: "high" | "medium" | "low" }[] {
  const crossoverYear = gapByYear.find((d) => d.gap < 0)?.year;
  const absGap = Math.abs(gap2035);
  const unit = domain === "ED" ? "visits" : "cases";
  const facility = domain === "ED" ? "bays" : "OR rooms";

  const recs: { timeframe: string; action: string; urgency: "high" | "medium" | "low" }[] = [];

  if (gap2035 < 0) {
    recs.push({
      timeframe: "Immediate (2025-2027)",
      action: `Maximize utilization of existing unstaffed ${facility} -- potential to staff ${domain === "ED" ? "up to 29 additional bays" : "up to 6 additional rooms"} across all sites without construction.`,
      urgency: "high",
    });

    if (crossoverYear && crossoverYear <= 2030) {
      recs.push({
        timeframe: `Medium-term (2028-${crossoverYear + 1})`,
        action: `Accelerate expansion plan to close the projected ${absGap.toLocaleString()} ${unit} gap. Prioritize the most constrained sites first.`,
        urgency: "high",
      });
    } else {
      recs.push({
        timeframe: "Medium-term (2028-2031)",
        action: `Proceed with planned expansion. Monitor demand trajectory quarterly to validate assumptions.`,
        urgency: "medium",
      });
    }

    recs.push({
      timeframe: "Long-term (2032-2035)",
      action: `If demand tracks surge scenario, initiate Phase 2 expansion planning by 2031. Consider demand-side interventions (${domain === "ED" ? "urgent care diversion, telemedicine triage" : "ambulatory surgery centers, day-case conversion"}).`,
      urgency: absGap > 50000 ? "high" : "medium",
    });
  } else {
    recs.push({
      timeframe: "2025-2035",
      action: `Current capacity plus planned expansions are sufficient under this scenario. Continue monitoring and reassess if demand drivers change.`,
      urgency: "low",
    });
  }

  return recs;
}
