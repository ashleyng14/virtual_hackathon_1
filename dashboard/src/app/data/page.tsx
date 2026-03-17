"use client";

import { useState } from "react";
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

/* ── ED throughput ── */
const edWeightedTreat = DATA.edAcuity.reduce(
  (sum, a) => sum + a.share.base * a.treat_time_hours.base,
  0,
);
function edPatientsPerBay(util: number) {
  return Math.round((ED_HOURS_PER_YEAR * util) / edWeightedTreat);
}

/* ── OR throughput ── */
function orWeightedSlot(siteName: string) {
  const specs = DATA.orBaseline.filter((b) => b.site === siteName);
  const total = specs.reduce((s, b) => s + b.cases_2025, 0);
  if (total === 0) return null;
  return specs.reduce((sum, b) => {
    const tp = DATA.orTimeParams.find((t) => t.specialty === b.specialty);
    if (!tp) return sum;
    return sum + (b.cases_2025 / total) * ((tp.avg_case_minutes.base + tp.turnover_minutes.base) / (1 - tp.cancellation_rate.base));
  }, 0);
}
function orCasesPerRoom(siteName: string, util: number, sessPerDay: number, sessMins: number) {
  const ws = orWeightedSlot(siteName);
  if (!ws) return null;
  return Math.round((sessPerDay * sessMins * OR_OPERATING_DAYS * util) / ws);
}

/* ── Site metadata for the map ── */
interface SiteInfo {
  id: string;
  label: string;
  type: "public" | "private";
  services: ("ED" | "OR")[];
  cx: number;
  cy: number;
  r: number;
}

const SITES: SiteInfo[] = [
  { id: "central", label: "Central", type: "public", services: ["ED", "OR"], cx: 310, cy: 145, r: 16 },
  { id: "north", label: "North", type: "public", services: ["ED", "OR"], cx: 195, cy: 100, r: 12 },
  { id: "west", label: "West", type: "public", services: ["ED", "OR"], cx: 120, cy: 150, r: 10 },
  { id: "airport", label: "Airport", type: "public", services: ["ED"], cx: 410, cy: 140, r: 8 },
  { id: "privateA", label: "Private A", type: "private", services: ["ED", "OR"], cx: 350, cy: 190, r: 9 },
  { id: "privateB", label: "Private B", type: "private", services: ["ED"], cx: 240, cy: 185, r: 9 },
  { id: "womens", label: "Women\u2019s", type: "public", services: ["OR"], cx: 280, cy: 205, r: 8 },
];

function getSiteDetails(id: string) {
  const ed = DATA.edSites.find((s) =>
    s.site.toLowerCase().includes(id === "privateA" ? "private ed a" : id === "privateB" ? "private ed b" : id),
  );
  const or = DATA.orCapacity.find((s) =>
    s.site.toLowerCase().includes(id === "privateA" || id === "privateB" ? "private" : id === "womens" ? "women" : id),
  );
  if (id === "privateB") {
    return { ed, or: undefined };
  }
  return { ed, or };
}

function getExpansions(id: string) {
  const matchLabel = (site: string) => {
    const lower = site.toLowerCase();
    if (id === "central") return lower.includes("central");
    if (id === "north") return lower.includes("north");
    if (id === "west") return lower.includes("west");
    return false;
  };
  return DATA.expansion.filter((e) => matchLabel(e.site));
}

/* ── Expansion ramp chart data ── */
function buildRampData(setting: "ED" | "OR") {
  const entries = DATA.expansion.filter((e) => e.setting === setting);
  const sites = [...new Set(entries.map((e) => e.site))];
  return {
    sites,
    data: YEARS.map((year) => {
      const row: Record<string, number> = { year };
      for (const site of sites) {
        let eff = 0;
        for (const exp of entries) {
          if (exp.site === site && exp.year <= year) eff = exp.additions_physical * exp.ramp_up_pct;
        }
        row[site] = eff;
      }
      return row;
    }),
  };
}

const edRamp = buildRampData("ED");
const orRamp = buildRampData("OR");

const RAMP_COLORS: Record<string, string> = {
  "Central ED": "#051C2C", "North ED": "#2251FF", "West ED": "#374151",
  "Central OR": "#051C2C", "North OR": "#2251FF", "West OR": "#374151",
};

export default function DataPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const site = selected ? SITES.find((s) => s.id === selected) : null;
  const details = selected ? getSiteDetails(selected) : null;
  const expansions = selected ? getExpansions(selected) : [];
  const edExpansions = expansions.filter((e) => e.setting === "ED");
  const orExpansions = expansions.filter((e) => e.setting === "OR");

  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">Data breakdown</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
          From bays and rooms to patient capacity
        </h1>
        <p className="mt-4 text-base text-[#6B7280] max-w-xl mx-auto">
          Click any site on the map to explore its capacity, throughput, and expansion plans.
        </p>
      </PageSection>

      {/* ── Interactive map + detail panel ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Facility explorer</h2>
        <p className="text-sm text-[#6B7280] mb-6">Select a site to see details. Circle size represents relative patient volume.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map — UAE outline */}
          <div className="lg:col-span-3 card-subtle p-4">
            <svg viewBox="0 0 520 280" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* UAE-inspired coastline (simplified, no label) */}
              <path
                d="M60,130 L80,110 L110,100 L140,90 L180,80 L220,75 L260,80 L300,85 L340,95 L370,110 L400,120 L430,130 L450,145 L460,165 L455,185 L440,200 L420,210 L390,215 L360,212 L330,208 L300,210 L270,215 L240,218 L210,215 L180,210 L150,200 L120,185 L95,170 L75,155 L60,130Z"
                fill="#F8F9FB"
                stroke="#D1D5DB"
                strokeWidth="1.5"
              />
              {/* Inner desert texture */}
              <path d="M150,130 Q200,120 250,130 Q300,125 350,140" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              <path d="M130,170 Q200,160 280,170 Q340,165 400,180" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              {/* Water/gulf */}
              <path d="M50,120 Q55,115 60,130" fill="none" stroke="#D1D5DB" strokeWidth="0.8" />
              <path d="M460,165 Q470,170 475,180" fill="none" stroke="#D1D5DB" strokeWidth="0.8" />
              <text x="40" y="105" className="text-[8px]" fill="#D1D5DB" textAnchor="middle">Gulf</text>

              {/* Sites */}
              {SITES.map((s) => {
                const isSelected = selected === s.id;
                const isPrivate = s.type === "private";
                const baseColor = isSelected ? "#2251FF" : "#051C2C";
                return (
                  <g
                    key={s.id}
                    onClick={() => setSelected(isSelected ? null : s.id)}
                    className="cursor-pointer"
                  >
                    {/* Outer ring */}
                    <circle
                      cx={s.cx}
                      cy={s.cy}
                      r={s.r}
                      fill={isSelected ? "#2251FF" : "#051C2C"}
                      fillOpacity={isSelected ? 0.15 : 0.06}
                      stroke={baseColor}
                      strokeWidth={isSelected ? 2 : 1.5}
                      strokeDasharray={isPrivate ? "3 2" : "none"}
                    />
                    {/* Inner dot */}
                    <circle cx={s.cx} cy={s.cy} r={3} fill={baseColor} />
                    {/* Label */}
                    <text
                      x={s.cx}
                      y={s.cy + s.r + 12}
                      textAnchor="middle"
                      className="text-[9px] font-medium"
                      fill={isSelected ? "#2251FF" : "#051C2C"}
                    >
                      {s.label}
                    </text>
                    {/* Service badge */}
                    <text
                      x={s.cx}
                      y={s.cy + s.r + 22}
                      textAnchor="middle"
                      className="text-[7px]"
                      fill="#6B7280"
                    >
                      {s.services.join(" + ")}
                    </text>
                    {/* Pulse ring when selected */}
                    {isSelected && (
                      <circle
                        cx={s.cx}
                        cy={s.cy}
                        r={s.r + 4}
                        fill="none"
                        stroke="#2251FF"
                        strokeWidth="1"
                        strokeOpacity="0.4"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center gap-4 mt-3 px-2 text-[10px] text-[#6B7280]">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-[1.5px] border-[#051C2C]" /> Public</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border border-dashed border-[#051C2C]" /> Private</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#2251FF]/15 border-2 border-[#2251FF]" /> Selected</div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {!selected ? (
              <div className="card-subtle p-8 flex flex-col items-center justify-center h-full text-center">
                <svg className="w-10 h-10 text-[#D1D5DB] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p className="text-sm text-[#6B7280]">Click a site on the map to explore its capacity details</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Header */}
                <div className="card p-4" style={{ borderLeft: "3px solid #2251FF" }}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-[#051C2C]">{site?.label}</h3>
                    <button onClick={() => setSelected(null)} className="text-xs text-[#6B7280] hover:text-[#051C2C] cursor-pointer">✕ Close</button>
                  </div>
                  <div className="flex gap-2">
                    {site?.services.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#374151] font-medium">{s}</span>
                    ))}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#374151]">{site?.type}</span>
                  </div>
                </div>

                {/* ED details */}
                {details?.ed && (
                  <div className="card p-4">
                    <p className="text-[10px] font-semibold text-[#2251FF] uppercase tracking-wider mb-3">Emergency department</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-[#6B7280]">Annual visits (2025)</span><span className="font-semibold text-[#051C2C]">{details.ed.ed_visits_2025.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Physical bays</span><span className="text-[#374151]">{details.ed.bays_physical_2025}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Staffed bays</span><span className="font-semibold text-[#051C2C]">{details.ed.bays_staffed_2025}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Utilization target</span><span className="text-[#374151]">{(details.ed.bay_util_target.base * 100).toFixed(0)}%</span></div>
                      <div className="border-t border-[#F3F4F6] pt-2">
                        <div className="flex justify-between"><span className="text-[#6B7280]">Patients/bay/year</span><span className="font-semibold text-[#2251FF]">{edPatientsPerBay(details.ed.bay_util_target.base).toLocaleString()}</span></div>
                        <div className="flex justify-between mt-1"><span className="text-[#6B7280]">Total annual capacity</span><span className="font-semibold text-[#2251FF]">{(details.ed.bays_staffed_2025 * edPatientsPerBay(details.ed.bay_util_target.base)).toLocaleString()}</span></div>
                      </div>
                      {edExpansions.length > 0 && (
                        <div className="border-t border-[#F3F4F6] pt-2">
                          <p className="text-[10px] font-semibold text-[#051C2C] mb-1">Expansion plan</p>
                          <p className="text-[11px] text-[#374151]">
                            +{edExpansions[0].additions_physical} bays starting {Math.min(...edExpansions.map((e) => e.year))}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {edExpansions.map((e) => (
                              <span key={e.year} className="text-[10px] px-1.5 py-0.5 rounded bg-[#EEF1FF] text-[#2251FF]">
                                {e.year}: {(e.ramp_up_pct * 100).toFixed(0)}%
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* OR details */}
                {details?.or && (
                  <div className="card p-4">
                    <p className="text-[10px] font-semibold text-[#051C2C] uppercase tracking-wider mb-3">Operating rooms</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-[#6B7280]">Physical rooms</span><span className="text-[#374151]">{details.or.or_rooms_physical_2025}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Staffed rooms</span><span className="font-semibold text-[#051C2C]">{details.or.or_rooms_staffed_2025}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Sessions/room/day</span><span className="text-[#374151]">{details.or.sessions_per_room_per_day}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">Utilization target</span><span className="text-[#374151]">{(details.or.util_target.base * 100).toFixed(0)}%</span></div>
                      {(() => {
                        const ws = orWeightedSlot(details.or.site);
                        const cpr = orCasesPerRoom(details.or.site, details.or.util_target.base, details.or.sessions_per_room_per_day, details.or.session_minutes);
                        return (
                          <div className="border-t border-[#F3F4F6] pt-2">
                            {ws && <div className="flex justify-between"><span className="text-[#6B7280]">Weighted slot time</span><span className="text-[#374151]">{Math.round(ws)} min</span></div>}
                            {cpr && <div className="flex justify-between mt-1"><span className="text-[#6B7280]">Cases/room/year</span><span className="font-semibold text-[#2251FF]">{cpr.toLocaleString()}</span></div>}
                            {cpr && <div className="flex justify-between mt-1"><span className="text-[#6B7280]">Total annual capacity</span><span className="font-semibold text-[#2251FF]">{(details.or.or_rooms_staffed_2025 * cpr).toLocaleString()}</span></div>}
                          </div>
                        );
                      })()}
                      {/* Specialties at site */}
                      {(() => {
                        const specs = DATA.orBaseline.filter((b) => b.site === details.or!.site);
                        if (specs.length === 0) return null;
                        const totalCases = specs.reduce((s, b) => s + b.cases_2025, 0);
                        return (
                          <div className="border-t border-[#F3F4F6] pt-2">
                            <p className="text-[10px] font-semibold text-[#051C2C] mb-1">Specialty mix</p>
                            {specs.map((sp) => (
                              <div key={sp.specialty} className="flex justify-between mb-0.5">
                                <span className="text-[#6B7280]">{sp.specialty}</span>
                                <span className="text-[#374151]">{sp.cases_2025.toLocaleString()} ({((sp.cases_2025 / totalCases) * 100).toFixed(0)}%)</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                      {orExpansions.length > 0 && (
                        <div className="border-t border-[#F3F4F6] pt-2">
                          <p className="text-[10px] font-semibold text-[#051C2C] mb-1">Expansion plan</p>
                          <p className="text-[11px] text-[#374151]">
                            +{orExpansions[0].additions_physical} room{orExpansions[0].additions_physical > 1 ? "s" : ""} starting {Math.min(...orExpansions.map((e) => e.year))}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {orExpansions.map((e) => (
                              <span key={e.year} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#374151]">
                                {e.year}: {(e.ramp_up_pct * 100).toFixed(0)}%
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* No ED/OR */}
                {!details?.ed && !details?.or && (
                  <div className="card-subtle p-4 text-xs text-[#6B7280]">No detailed data available for this site.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </PageSection>

      {/* ── Throughput formulas ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How many patients can one unit handle?</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          ED bays and OR rooms have very different throughput — here is the calculation behind each.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard accent="#2251FF">
            <p className="text-[10px] font-semibold text-[#2251FF] uppercase tracking-wider mb-3">ED bay throughput</p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs mb-4">
              <span className="px-2 py-1 rounded bg-[#EEF1FF] text-[#051C2C] font-semibold">Patients/bay/yr</span>
              <span className="text-[#6B7280]">=</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">8,760 hrs</span>
              <span className="text-[#6B7280]">×</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">75% util</span>
              <span className="text-[#6B7280]">÷</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">{edWeightedTreat.toFixed(2)}h treat</span>
            </div>
            <p className="text-3xl font-bold text-[#051C2C]">~{edPatientsPerBay(0.75).toLocaleString()}</p>
            <p className="text-sm text-[#6B7280] mt-1">patients per bay per year</p>
            <div className="mt-4 space-y-1.5 text-xs text-[#374151]">
              <div className="flex justify-between"><span>Operates</span><span className="font-medium">24/7, 365 days</span></div>
              <div className="flex justify-between"><span>Avg treatment</span><span className="font-medium">{edWeightedTreat.toFixed(1)} hrs (weighted by acuity)</span></div>
              <div className="flex justify-between"><span>Varies by site?</span><span className="font-medium">Slightly — different util targets</span></div>
            </div>
          </GlassCard>

          <GlassCard accent="#051C2C">
            <p className="text-[10px] font-semibold text-[#051C2C] uppercase tracking-wider mb-3">OR room throughput</p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs mb-4">
              <span className="px-2 py-1 rounded bg-[#F3F4F6] text-[#051C2C] font-semibold">Cases/room/yr</span>
              <span className="text-[#6B7280]">=</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">2×240 min</span>
              <span className="text-[#6B7280]">×</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">260 days</span>
              <span className="text-[#6B7280]">×</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">util</span>
              <span className="text-[#6B7280]">÷</span>
              <span className="px-2 py-1 rounded bg-[#F3F4F6]">slot min</span>
            </div>
            <p className="text-3xl font-bold text-[#051C2C]">
              ~{orCasesPerRoom("Central OR", 0.78, 2, 240)?.toLocaleString() ?? "—"}
              <span className="text-base font-normal text-[#6B7280] ml-1">
                to {orCasesPerRoom("Private OR", 0.79, 2, 240)?.toLocaleString() ?? "—"}
              </span>
            </p>
            <p className="text-sm text-[#6B7280] mt-1">cases per room per year</p>
            <div className="mt-4 space-y-1.5 text-xs text-[#374151]">
              <div className="flex justify-between"><span>Operates</span><span className="font-medium">Weekdays, 2 sessions/day</span></div>
              <div className="flex justify-between"><span>Slot time</span><span className="font-medium">96–183 min (by specialty)</span></div>
              <div className="flex justify-between"><span>Varies by site?</span><span className="font-medium">Yes — different specialty mixes</span></div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-5 p-3 rounded-lg bg-[#EEF1FF] border border-[#2251FF]/15">
          <p className="text-xs text-[#051C2C]">
            <span className="font-semibold">Why such a big difference?</span> An ED bay runs 24/7 (8,760 hrs/year) with average stays of ~2.4 hours, so one bay cycles through ~2,760 patients. An OR room runs ~8 hours on weekdays (2,080 hrs/year) with longer cases (~2 hours including turnover), yielding ~680–810 cases.
          </p>
        </div>
      </PageSection>

      {/* ── Expansion ramp-up charts ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Expansion ramp-up by site</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          New units ramp to full productivity gradually: 60% in year 1, 85% in year 2, 100% from year 3.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">ED — effective bays added over time</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={edRamp.data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Effective bays", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 10, dx: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }} formatter={(value: number, name: string) => [`${value.toFixed(1)} bays`, name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {edRamp.sites.map((site) => (
                    <Bar key={site} dataKey={site} stackId="a" fill={RAMP_COLORS[site] ?? "#6B7280"} radius={[2, 2, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#051C2C] mb-4">OR — effective rooms added over time</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orRamp.data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Effective rooms", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 10, dx: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 11 }} formatter={(value: number, name: string) => [`${value.toFixed(1)} rooms`, name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {orRamp.sites.map((site) => (
                    <Bar key={site} dataKey={site} stackId="a" fill={RAMP_COLORS[site] ?? "#6B7280"} radius={[2, 2, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── GAP classification explanation ── */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How we classify the capacity gap</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          The gap is expressed as a percentage of projected demand. Thresholds are based on international healthcare planning benchmarks.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "On track", pct: "≥ 0%", color: "#059669", bg: "#ECFDF5", desc: "Capacity meets or exceeds demand" },
            { label: "Moderate gap", pct: "0% to −15%", color: "#D97706", bg: "#FFFBEB", desc: "Manageable with operational levers (staffing, scheduling)" },
            { label: "Significant gap", pct: "−15% to −30%", color: "#EA580C", bg: "#FFF7ED", desc: "Requires accelerated expansion or new facilities" },
            { label: "Critical gap", pct: "< −30%", color: "#DC2626", bg: "#FEF2F2", desc: "Structural intervention needed — major build programme" },
          ].map((t) => (
            <div key={t.label} className="rounded-lg p-3 text-center" style={{ backgroundColor: t.bg }}>
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-xs font-semibold" style={{ color: t.color }}>{t.label}</span>
              </div>
              <p className="text-lg font-bold" style={{ color: t.color }}>{t.pct}</p>
              <p className="text-[10px] text-[#374151] mt-1.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </PageSection>

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
