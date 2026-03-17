"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";
import { DATA } from "@/lib/data";
import { YEARS, ED_HOURS_PER_YEAR, OR_OPERATING_DAYS } from "@/lib/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/* ── ED throughput calculation (base scenario) ── */
const edWeightedTreat = DATA.edAcuity.reduce(
  (sum, a) => sum + a.share.base * a.treat_time_hours.base,
  0,
);

function edPatientsPerBay(util: number) {
  return Math.round((ED_HOURS_PER_YEAR * util) / edWeightedTreat);
}

/* ── OR throughput calculation (base scenario) ── */
function orWeightedSlot(siteName: string) {
  const specialties = DATA.orBaseline.filter((b) => b.site === siteName);
  const totalCases = specialties.reduce((s, b) => s + b.cases_2025, 0);
  if (totalCases === 0) return null;
  return specialties.reduce((sum, b) => {
    const tp = DATA.orTimeParams.find((t) => t.specialty === b.specialty);
    if (!tp) return sum;
    const weight = b.cases_2025 / totalCases;
    const effectiveSlot =
      (tp.avg_case_minutes.base + tp.turnover_minutes.base) /
      (1 - tp.cancellation_rate.base);
    return sum + weight * effectiveSlot;
  }, 0);
}

function orCasesPerRoom(siteName: string, util: number, sessPerDay: number, sessMins: number) {
  const ws = orWeightedSlot(siteName);
  if (!ws || ws === 0) return null;
  const minsPerRoomPerYear = sessPerDay * sessMins * OR_OPERATING_DAYS * util;
  return Math.round(minsPerRoomPerYear / ws);
}

/* ── Expansion ramp-up data for chart ── */
function buildRampData(setting: "ED" | "OR") {
  const entries = DATA.expansion.filter((e) => e.setting === setting);
  const sites = [...new Set(entries.map((e) => e.site))];

  return YEARS.map((year) => {
    const row: Record<string, number> = { year };
    for (const site of sites) {
      let effective = 0;
      for (const exp of entries) {
        if (exp.site === site && exp.year <= year) {
          effective = exp.additions_physical * exp.ramp_up_pct;
        }
      }
      row[site] = effective;
    }
    return row;
  });
}

const edRamp = buildRampData("ED");
const orRamp = buildRampData("OR");
const edExpandSites = [...new Set(DATA.expansion.filter((e) => e.setting === "ED").map((e) => e.site))];
const orExpandSites = [...new Set(DATA.expansion.filter((e) => e.setting === "OR").map((e) => e.site))];

const SITE_COLORS: Record<string, string> = {
  "Central ED": "#051C2C",
  "North ED": "#2251FF",
  "West ED": "#374151",
  "Central OR": "#051C2C",
  "North OR": "#2251FF",
  "West OR": "#374151",
};

/* ── Capacity over time data for chart ── */
function buildCapacityTimeline(setting: "ED" | "OR") {
  if (setting === "ED") {
    return YEARS.map((year) => {
      const row: Record<string, number> = { year };
      for (const site of DATA.edSites) {
        let expansionBays = 0;
        for (const exp of DATA.expansion) {
          if (exp.setting === "ED" && exp.site === site.site && exp.year <= year) {
            expansionBays = exp.additions_physical * exp.ramp_up_pct;
          }
        }
        const totalBays = site.bays_staffed_2025 + expansionBays;
        const throughput = edPatientsPerBay(site.bay_util_target.base);
        row[site.site] = Math.round(totalBays * throughput);
      }
      return row;
    });
  }
  return YEARS.map((year) => {
    const row: Record<string, number> = { year };
    for (const site of DATA.orCapacity) {
      let expansionRooms = 0;
      for (const exp of DATA.expansion) {
        if (exp.setting === "OR" && exp.site === site.site && exp.year <= year) {
          expansionRooms = exp.additions_physical * exp.ramp_up_pct;
        }
      }
      const totalRooms = site.or_rooms_staffed_2025 + expansionRooms;
      const cpr = orCasesPerRoom(site.site, site.util_target.base, site.sessions_per_room_per_day, site.session_minutes);
      row[site.site] = cpr ? Math.round(totalRooms * cpr) : 0;
    }
    return row;
  });
}

const edCapTimeline = buildCapacityTimeline("ED");
const orCapTimeline = buildCapacityTimeline("OR");

const ED_SITE_COLORS: Record<string, string> = {
  "Central ED": "#051C2C",
  "North ED": "#2251FF",
  "West ED": "#374151",
  "Airport ED": "#6B7280",
  "Private ED A": "#D97706",
  "Private ED B": "#059669",
};
const OR_SITE_COLORS: Record<string, string> = {
  "Central OR": "#051C2C",
  "North OR": "#2251FF",
  "West OR": "#374151",
  "Womens OR": "#D97706",
  "Private OR": "#059669",
};

export default function DataPage() {
  return (
    <div>
      {/* Hero */}
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">Data breakdown</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
          From bays and rooms to patient capacity
        </h1>
        <p className="mt-4 text-base text-[#6B7280] max-w-xl mx-auto">
          How many patients can one ED bay or one OR room handle per year? And where is capacity being added?
        </p>
      </PageSection>

      {/* ── Section 1: ED throughput formula ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Emergency department: patients per bay</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          An ED bay operates 24/7, 365 days. Throughput depends on how long each patient stays (treatment time) and the target utilization rate.
        </p>

        {/* Formula visual */}
        <div className="card-subtle p-6 mb-6">
          <p className="text-xs font-semibold text-[#051C2C] mb-4">Formula</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="px-3 py-1.5 rounded bg-[#2251FF]/10 text-[#051C2C] font-semibold">
              Patients per bay per year
            </span>
            <span className="text-[#6B7280]">=</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Hours per year <span className="font-semibold">(8,760)</span>
            </span>
            <span className="text-[#6B7280]">×</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Utilization target
            </span>
            <span className="text-[#6B7280]">÷</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Weighted avg treatment time
            </span>
          </div>

          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <p className="text-xs font-semibold text-[#051C2C] mb-3">Weighted average treatment time (base case)</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {DATA.edAcuity.map((a) => (
                <div key={a.acuity} className="flex flex-col items-center p-3 rounded-lg bg-[#F9FAFB]">
                  <span className="text-[#6B7280]">{a.acuity} acuity</span>
                  <span className="font-semibold text-[#051C2C] text-lg mt-1">{a.treat_time_hours.base}h</span>
                  <span className="text-[10px] text-[#6B7280]">× {(a.share.base * 100).toFixed(0)}% share</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-[#6B7280]">= (6% × 6h) + (44% × 3h) + (50% × 1.4h) =</span>
              <span className="font-bold text-[#051C2C] text-lg">{edWeightedTreat.toFixed(2)} hours</span>
            </div>
          </div>
        </div>

        {/* Per-site table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-[#051C2C]">
                <th className="text-left py-2 pr-4 text-[#051C2C] font-semibold">Site</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Physical bays</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Staffed bays</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Util. target</th>
                <th className="text-right py-2 px-3 text-[#2251FF] font-semibold">Patients/bay/yr</th>
                <th className="text-right py-2 pl-3 text-[#2251FF] font-semibold">Total capacity/yr</th>
              </tr>
            </thead>
            <tbody>
              {DATA.edSites.map((site) => {
                const ppy = edPatientsPerBay(site.bay_util_target.base);
                return (
                  <tr key={site.site} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB]">
                    <td className="py-2 pr-4 font-medium text-[#051C2C]">{site.site}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{site.bays_physical_2025}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{site.bays_staffed_2025}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{(site.bay_util_target.base * 100).toFixed(0)}%</td>
                    <td className="py-2 px-3 text-right font-semibold text-[#2251FF]">{ppy.toLocaleString()}</td>
                    <td className="py-2 pl-3 text-right font-semibold text-[#2251FF]">{(site.bays_staffed_2025 * ppy).toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-[#051C2C] font-semibold">
                <td className="py-2 pr-4 text-[#051C2C]">Total</td>
                <td className="py-2 px-3 text-right text-[#374151]">
                  {DATA.edSites.reduce((s, site) => s + site.bays_physical_2025, 0)}
                </td>
                <td className="py-2 px-3 text-right text-[#374151]">
                  {DATA.edSites.reduce((s, site) => s + site.bays_staffed_2025, 0)}
                </td>
                <td className="py-2 px-3 text-right text-[#6B7280]">—</td>
                <td className="py-2 px-3 text-right text-[#6B7280]">—</td>
                <td className="py-2 pl-3 text-right text-[#2251FF]">
                  {DATA.edSites
                    .reduce((s, site) => s + site.bays_staffed_2025 * edPatientsPerBay(site.bay_util_target.base), 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#EEF1FF] border border-[#2251FF]/20">
          <p className="text-xs text-[#051C2C]">
            <span className="font-semibold">Key insight:</span> At {(DATA.edSites[0].bay_util_target.base * 100).toFixed(0)}% target utilization, one ED bay can serve <span className="font-bold text-[#2251FF]">~{edPatientsPerBay(0.75).toLocaleString()} patients/year</span>. Across {DATA.edSites.reduce((s, site) => s + site.bays_staffed_2025, 0)} staffed bays, the system has ~{DATA.edSites.reduce((s, site) => s + site.bays_staffed_2025 * edPatientsPerBay(site.bay_util_target.base), 0).toLocaleString()} annual visit capacity.
          </p>
        </div>
      </PageSection>

      {/* ── Section 2: OR throughput formula ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Operating rooms: cases per room</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          OR rooms run scheduled sessions on weekdays only (260 days/year). Throughput depends on case duration, turnover time, cancellation rate, and the specialty mix at each site.
        </p>

        <div className="card-subtle p-6 mb-6">
          <p className="text-xs font-semibold text-[#051C2C] mb-4">Formula</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="px-3 py-1.5 rounded bg-[#2251FF]/10 text-[#051C2C] font-semibold">
              Cases per room per year
            </span>
            <span className="text-[#6B7280]">=</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Sessions/day <span className="font-semibold">(2)</span>
            </span>
            <span className="text-[#6B7280]">×</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Min/session <span className="font-semibold">(240)</span>
            </span>
            <span className="text-[#6B7280]">×</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Days/yr <span className="font-semibold">(260)</span>
            </span>
            <span className="text-[#6B7280]">×</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Utilization
            </span>
            <span className="text-[#6B7280]">÷</span>
            <span className="px-3 py-1.5 rounded bg-[#F3F4F6] text-[#051C2C]">
              Weighted slot time
            </span>
          </div>

          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <p className="text-xs font-semibold text-[#051C2C] mb-3">Effective slot time by specialty (base case)</p>
            <p className="text-[10px] text-[#6B7280] mb-3">Slot = (surgery time + turnover) ÷ (1 − cancellation rate)</p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {DATA.orTimeParams.map((tp) => {
                const slot = (tp.avg_case_minutes.base + tp.turnover_minutes.base) / (1 - tp.cancellation_rate.base);
                return (
                  <div key={tp.specialty} className="flex flex-col items-center p-3 rounded-lg bg-[#F9FAFB]">
                    <span className="text-[#6B7280]">{tp.specialty}</span>
                    <span className="font-semibold text-[#051C2C] text-base mt-1">{Math.round(slot)} min</span>
                    <span className="text-[10px] text-[#6B7280] mt-0.5">
                      ({tp.avg_case_minutes.base}+{tp.turnover_minutes.base})÷{((1 - tp.cancellation_rate.base) * 100).toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <p className="text-xs font-semibold text-[#051C2C] mb-3">Why it differs by site: each site has a different specialty mix</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {["Central OR", "North OR", "Private OR"].map((siteName) => {
                const specs = DATA.orBaseline.filter((b) => b.site === siteName);
                const totalCases = specs.reduce((s, b) => s + b.cases_2025, 0);
                const ws = orWeightedSlot(siteName);
                return (
                  <div key={siteName} className="p-3 rounded-lg bg-[#F9FAFB]">
                    <p className="font-semibold text-[#051C2C] mb-2">{siteName}</p>
                    {specs.map((sp) => (
                      <div key={sp.specialty} className="flex justify-between mb-1">
                        <span className="text-[#6B7280]">{sp.specialty}</span>
                        <span className="text-[#374151]">{((sp.cases_2025 / totalCases) * 100).toFixed(0)}% of cases</span>
                      </div>
                    ))}
                    <div className="border-t border-[#E5E7EB] mt-2 pt-2 flex justify-between">
                      <span className="text-[#6B7280]">Weighted slot</span>
                      <span className="font-semibold text-[#051C2C]">{ws ? `${Math.round(ws)} min` : "—"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Per-site OR table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-[#051C2C]">
                <th className="text-left py-2 pr-4 text-[#051C2C] font-semibold">Site</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Physical rooms</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Staffed rooms</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Util. target</th>
                <th className="text-right py-2 px-3 text-[#051C2C] font-semibold">Wtd. slot (min)</th>
                <th className="text-right py-2 px-3 text-[#2251FF] font-semibold">Cases/room/yr</th>
                <th className="text-right py-2 pl-3 text-[#2251FF] font-semibold">Total capacity/yr</th>
              </tr>
            </thead>
            <tbody>
              {DATA.orCapacity.map((site) => {
                const ws = orWeightedSlot(site.site);
                const cpr = orCasesPerRoom(site.site, site.util_target.base, site.sessions_per_room_per_day, site.session_minutes);
                return (
                  <tr key={site.site} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB]">
                    <td className="py-2 pr-4 font-medium text-[#051C2C]">{site.site}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{site.or_rooms_physical_2025}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{site.or_rooms_staffed_2025}</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{(site.util_target.base * 100).toFixed(0)}%</td>
                    <td className="py-2 px-3 text-right text-[#374151]">{ws ? Math.round(ws) : "—"}</td>
                    <td className="py-2 px-3 text-right font-semibold text-[#2251FF]">{cpr?.toLocaleString() ?? "—"}</td>
                    <td className="py-2 pl-3 text-right font-semibold text-[#2251FF]">
                      {cpr ? (site.or_rooms_staffed_2025 * cpr).toLocaleString() : "—"}
                    </td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-[#051C2C] font-semibold">
                <td className="py-2 pr-4 text-[#051C2C]">Total</td>
                <td className="py-2 px-3 text-right text-[#374151]">
                  {DATA.orCapacity.reduce((s, site) => s + site.or_rooms_physical_2025, 0)}
                </td>
                <td className="py-2 px-3 text-right text-[#374151]">
                  {DATA.orCapacity.reduce((s, site) => s + site.or_rooms_staffed_2025, 0)}
                </td>
                <td className="py-2 px-3 text-right text-[#6B7280]" colSpan={2}>—</td>
                <td className="py-2 pl-3 text-right text-[#2251FF]" colSpan={2}>
                  {DATA.orCapacity
                    .reduce((s, site) => {
                      const cpr = orCasesPerRoom(site.site, site.util_target.base, site.sessions_per_room_per_day, site.session_minutes);
                      return s + (cpr ? site.or_rooms_staffed_2025 * cpr : 0);
                    }, 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#EEF1FF] border border-[#2251FF]/20">
          <p className="text-xs text-[#051C2C]">
            <span className="font-semibold">Key difference from ED:</span> OR throughput varies by site because each has a different specialty mix. A site doing mostly cardiac/ortho surgeries (~180 min slots) handles fewer cases per room than one focused on ENT/urology (~100 min slots). ED throughput is more uniform since treatment times depend on acuity mix, which is similar across sites.
          </p>
        </div>
      </PageSection>

      {/* ── Section 3: Side-by-side comparison ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">ED vs OR: throughput comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard accent="#2251FF">
            <p className="text-xs font-semibold text-[#2251FF] mb-1">Emergency department</p>
            <p className="text-3xl font-bold text-[#051C2C]">~{edPatientsPerBay(0.75).toLocaleString()}</p>
            <p className="text-sm text-[#6B7280] mt-1">patients per bay per year</p>
            <div className="mt-4 space-y-1.5 text-xs text-[#374151]">
              <div className="flex justify-between"><span>Operates</span><span className="font-medium">24/7, 365 days</span></div>
              <div className="flex justify-between"><span>Avg treatment</span><span className="font-medium">{edWeightedTreat.toFixed(1)} hrs</span></div>
              <div className="flex justify-between"><span>Throughput driver</span><span className="font-medium">Acuity mix</span></div>
              <div className="flex justify-between"><span>Varies by site?</span><span className="font-medium">Slightly (utilization)</span></div>
            </div>
          </GlassCard>
          <GlassCard accent="#051C2C">
            <p className="text-xs font-semibold text-[#2251FF] mb-1">Operating room</p>
            <p className="text-3xl font-bold text-[#051C2C]">
              ~{orCasesPerRoom("Central OR", 0.78, 2, 240)?.toLocaleString() ?? "—"}
              <span className="text-base font-normal text-[#6B7280] ml-1">to {orCasesPerRoom("Private OR", 0.79, 2, 240)?.toLocaleString() ?? "—"}</span>
            </p>
            <p className="text-sm text-[#6B7280] mt-1">cases per room per year</p>
            <div className="mt-4 space-y-1.5 text-xs text-[#374151]">
              <div className="flex justify-between"><span>Operates</span><span className="font-medium">Weekdays, 2 sessions/day</span></div>
              <div className="flex justify-between"><span>Avg slot</span><span className="font-medium">96–155 min (by specialty)</span></div>
              <div className="flex justify-between"><span>Throughput driver</span><span className="font-medium">Specialty mix</span></div>
              <div className="flex justify-between"><span>Varies by site?</span><span className="font-medium">Yes, significantly</span></div>
            </div>
          </GlassCard>
        </div>
      </PageSection>

      {/* ── Section 4: Expansion ramp-up charts ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Expansion ramp-up by site</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          New bays and rooms are built in one phase but ramp to full productivity gradually: 60% in year 1, 85% in year 2, 100% from year 3 onward.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ED ramp */}
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">ED — effective bays added over time</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={edRamp} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Effective bays", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 10, dx: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }}
                    formatter={(value: number, name: string) => [`${value.toFixed(1)} bays`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {edExpandSites.map((site) => (
                    <Bar key={site} dataKey={site} stackId="a" fill={SITE_COLORS[site] ?? "#6B7280"} radius={[2, 2, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1">
              {edExpandSites.map((site) => {
                const max = DATA.expansion.find((e) => e.site === site && e.ramp_up_pct === 1)?.additions_physical ?? 0;
                return (
                  <div key={site} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded" style={{ background: SITE_COLORS[site] }} />
                      <span className="text-[#051C2C] font-medium">{site}</span>
                    </div>
                    <span className="text-[#6B7280]">+{max} physical bays → {max * 0.6} → {max * 0.85} → {max} effective</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OR ramp */}
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">OR — effective rooms added over time</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orRamp} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Effective rooms", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 10, dx: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }}
                    formatter={(value: number, name: string) => [`${value.toFixed(1)} rooms`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {orExpandSites.map((site) => (
                    <Bar key={site} dataKey={site} stackId="a" fill={SITE_COLORS[site] ?? "#6B7280"} radius={[2, 2, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1">
              {orExpandSites.map((site) => {
                const max = DATA.expansion.find((e) => e.site === site && e.ramp_up_pct === 1)?.additions_physical ?? 0;
                const startYear = Math.min(...DATA.expansion.filter((e) => e.site === site).map((e) => e.year));
                return (
                  <div key={site} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded" style={{ background: SITE_COLORS[site] }} />
                      <span className="text-[#051C2C] font-medium">{site}</span>
                    </div>
                    <span className="text-[#6B7280]">+{max} room{max > 1 ? "s" : ""} from {startYear}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── Section 5: Total capacity timeline ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How expansion changes total capacity by site</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          Stacked view of annual capacity across all sites, showing the step-up from expansion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">ED — annual visit capacity by site</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={edCapTimeline} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }}
                    formatter={(value: number, name: string) => [`${value.toLocaleString()} visits`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  {DATA.edSites.map((site) => (
                    <Bar key={site.site} dataKey={site.site} stackId="a" fill={ED_SITE_COLORS[site.site] ?? "#6B7280"} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">OR — annual case capacity by site</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orCapTimeline} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }}
                    formatter={(value: number, name: string) => [`${value.toLocaleString()} cases`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  {DATA.orCapacity.map((site) => (
                    <Bar key={site.site} dataKey={site.site} stackId="a" fill={OR_SITE_COLORS[site.site] ?? "#6B7280"} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="text-center pb-24">
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#051C2C] text-white text-sm font-medium hover:bg-[#0a2e44] transition-colors"
        >
          Open the interactive dashboard →
        </Link>
      </PageSection>
    </div>
  );
}
