"use client";

import { useState, useMemo, useCallback } from "react";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SegmentedToggle from "@/components/ui/SegmentedToggle";
import SliderWithCitation from "@/components/ui/SliderWithCitation";
import RagBadge from "@/components/ui/RagBadge";
import DemandCapacityChart from "@/components/dashboard/DemandCapacityChart";
import WaterfallChart from "@/components/dashboard/WaterfallChart";
import SiteTable from "@/components/dashboard/SiteTable";
import GapRecommendations from "@/components/dashboard/GapRecommendations";
import { DATA } from "@/lib/data";
import { ED_DRIVER_CITATIONS, OR_DRIVER_CITATIONS } from "@/lib/citations";
import { type Scenario, SCENARIO_LABELS } from "@/lib/constants";
import {
  projectEdDemand,
  computeEdCapacity,
  projectOrDemand,
  computeOrCapacity,
  aggregateByYear,
  mergeDemandsAndCapacities,
  computeEdWaterfall,
  generateRecommendations,
  type DemandDriverValues,
  type OrDemandDriverValues,
} from "@/lib/calculations";

type Tab = "ed" | "or" | "gap";

export default function DashboardPage() {
  const [scenario, setScenario] = useState<Scenario>("base");
  const [tab, setTab] = useState<Tab>("ed");

  const [edDrivers, setEdDrivers] = useState<DemandDriverValues>({
    pop_growth_rate: DATA.edDrivers.pop_growth_rate.base,
    aging_effect_multiplier_2035: DATA.edDrivers.aging_effect_multiplier_2035.base,
    disease_burden_multiplier_2035: DATA.edDrivers.disease_burden_multiplier_2035.base,
    diversion_pct_2035: DATA.edDrivers.diversion_pct_2035.base,
    triage_throughput_gain_low_acuity: DATA.edDrivers.triage_throughput_gain_low_acuity.base,
  });

  const [orDrivers, setOrDrivers] = useState<OrDemandDriverValues>({
    pop_growth_rate: DATA.orDrivers.pop_growth_rate.base,
    aging_effect_multiplier_2035: DATA.orDrivers.aging_effect_multiplier_2035.base,
    disease_burden_multiplier_2035: DATA.orDrivers.disease_burden_multiplier_2035.base,
  });

  const [edUtilOverride, setEdUtilOverride] = useState<number | undefined>(undefined);
  const [orUtilOverride, setOrUtilOverride] = useState<number | undefined>(undefined);

  const handleScenarioChange = useCallback((val: string) => {
    const s = val as Scenario;
    setScenario(s);
    setEdDrivers({
      pop_growth_rate: DATA.edDrivers.pop_growth_rate[s],
      aging_effect_multiplier_2035: DATA.edDrivers.aging_effect_multiplier_2035[s],
      disease_burden_multiplier_2035: DATA.edDrivers.disease_burden_multiplier_2035[s],
      diversion_pct_2035: DATA.edDrivers.diversion_pct_2035[s],
      triage_throughput_gain_low_acuity: DATA.edDrivers.triage_throughput_gain_low_acuity[s],
    });
    setOrDrivers({
      pop_growth_rate: DATA.orDrivers.pop_growth_rate[s],
      aging_effect_multiplier_2035: DATA.orDrivers.aging_effect_multiplier_2035[s],
      disease_burden_multiplier_2035: DATA.orDrivers.disease_burden_multiplier_2035[s],
    });
    setEdUtilOverride(undefined);
    setOrUtilOverride(undefined);
  }, []);

  const edDemandSites = useMemo(() => projectEdDemand(edDrivers), [edDrivers]);
  const edCapacitySites = useMemo(() => computeEdCapacity(scenario, { util_target_override: edUtilOverride }), [scenario, edUtilOverride]);
  const edMerged = useMemo(() => mergeDemandsAndCapacities(edDemandSites, edCapacitySites), [edDemandSites, edCapacitySites]);
  const edAggregate = useMemo(() => aggregateByYear(edMerged), [edMerged]);

  const orDemandEntries = useMemo(() => projectOrDemand(orDrivers), [orDrivers]);
  const orDemandBySite = useMemo(() => {
    const siteMap: Record<string, { year: number; demand: number; capacity: number; gap: number }[]> = {};
    for (const entry of orDemandEntries) {
      if (!siteMap[entry.site]) {
        siteMap[entry.site] = entry.data.map((d) => ({ ...d }));
      } else {
        for (let i = 0; i < entry.data.length; i++) {
          siteMap[entry.site][i].demand += entry.data[i].demand;
        }
      }
    }
    return Object.entries(siteMap).map(([site, data]) => ({ site, data }));
  }, [orDemandEntries]);

  const orCapacitySites = useMemo(() => computeOrCapacity(scenario, { util_target_override: orUtilOverride }), [scenario, orUtilOverride]);
  const orMerged = useMemo(() => mergeDemandsAndCapacities(orDemandBySite, orCapacitySites), [orDemandBySite, orCapacitySites]);
  const orAggregate = useMemo(() => aggregateByYear(orMerged), [orMerged]);

  const totalEdVisits2025 = DATA.edSites.reduce((s, site) => s + site.ed_visits_2025, 0);
  const edWaterfall = useMemo(() => computeEdWaterfall(totalEdVisits2025, edDrivers), [edDrivers, totalEdVisits2025]);

  const edGap2035 = edAggregate.find((d) => d.year === 2035)?.gap ?? 0;
  const orGap2035 = orAggregate.find((d) => d.year === 2035)?.gap ?? 0;
  const edDemand2035 = edAggregate.find((d) => d.year === 2035)?.demand ?? 0;
  const orDemand2035 = orAggregate.find((d) => d.year === 2035)?.demand ?? 0;

  const edRecs = useMemo(() => generateRecommendations(edGap2035, edAggregate, "ED"), [edGap2035, edAggregate]);
  const orRecs = useMemo(() => generateRecommendations(orGap2035, orAggregate, "OR"), [orGap2035, orAggregate]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-[#00D1B2] mb-1">
              Interactive Dashboard
            </p>
            <h1 className="text-3xl font-bold text-[#f0f0f5]">Demand &amp; Capacity Projections</h1>
          </div>
          <SegmentedToggle
            options={Object.entries(SCENARIO_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            selected={scenario}
            onChange={handleScenarioChange}
          />
        </div>
      </div>

      {/* KPI Row */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard glowColor="blue">
            <p className="text-xs text-[#9ca3af] mb-1">ED Demand 2035</p>
            <AnimatedCounter value={edDemand2035} className="text-2xl font-bold text-[#f0f0f5]" />
            <p className="text-xs text-[#9ca3af] mt-1">
              {((edDemand2035 / totalEdVisits2025 - 1) * 100).toFixed(1)}% vs 2025
            </p>
          </GlassCard>
          <GlassCard glowColor="teal">
            <p className="text-xs text-[#9ca3af] mb-1">OR Demand 2035</p>
            <AnimatedCounter value={orDemand2035} className="text-2xl font-bold text-[#f0f0f5]" />
            <p className="text-xs text-[#9ca3af] mt-1">
              {((orDemand2035 / DATA.orBaseline.reduce((s, b) => s + b.cases_2025, 0) - 1) * 100).toFixed(1)}% vs 2025
            </p>
          </GlassCard>
          <GlassCard glowColor={edGap2035 >= 0 ? "teal" : "rose"}>
            <p className="text-xs text-[#9ca3af] mb-1">ED Gap 2035</p>
            <AnimatedCounter value={edGap2035} className="text-2xl font-bold text-[#f0f0f5]" />
            <div className="mt-1"><RagBadge gap={edGap2035} /></div>
          </GlassCard>
          <GlassCard glowColor={orGap2035 >= 0 ? "teal" : "rose"}>
            <p className="text-xs text-[#9ca3af] mb-1">OR Gap 2035</p>
            <AnimatedCounter value={orGap2035} className="text-2xl font-bold text-[#f0f0f5]" />
            <div className="mt-1"><RagBadge gap={orGap2035} /></div>
          </GlassCard>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex gap-1 glass-subtle inline-flex p-1">
          {([["ed", "ED Analysis"], ["or", "OR Analysis"], ["gap", "Combined View"]] as const).map(
            ([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  tab === key
                    ? "bg-[rgba(255,255,255,0.08)] text-[#f0f0f5]"
                    : "text-[#9ca3af] hover:text-[#f0f0f5]"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Charts */}
          <div className="flex-1 space-y-6">
            {(tab === "ed" || tab === "gap") && (
              <>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
                    ED Demand vs. Capacity (2025–2035)
                  </h3>
                  <DemandCapacityChart data={edAggregate} domain="ED" />
                </GlassCard>
                {tab === "ed" && (
                  <>
                    <GlassCard>
                      <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
                        ED Demand Driver Decomposition (2025 → 2035)
                      </h3>
                      <WaterfallChart data={edWaterfall} />
                    </GlassCard>
                    <GapRecommendations gap2035={edGap2035} recommendations={edRecs} domain="ED" />
                    <GlassCard>
                      <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">Site Breakdown</h3>
                      <SiteTable data={edMerged} unit="visits" />
                    </GlassCard>
                  </>
                )}
              </>
            )}

            {(tab === "or" || tab === "gap") && (
              <>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
                    OR Demand vs. Capacity (2025–2035)
                  </h3>
                  <DemandCapacityChart data={orAggregate} domain="OR" />
                </GlassCard>
                {tab === "or" && (
                  <>
                    <GapRecommendations gap2035={orGap2035} recommendations={orRecs} domain="OR" />
                    <GlassCard>
                      <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">Site Breakdown</h3>
                      <SiteTable data={orMerged} unit="cases" />
                    </GlassCard>
                  </>
                )}
              </>
            )}

            {tab === "gap" && (
              <>
                <GapRecommendations gap2035={edGap2035} recommendations={edRecs} domain="ED" />
                <GapRecommendations gap2035={orGap2035} recommendations={orRecs} domain="OR" />
              </>
            )}
          </div>

          {/* Control Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="glass p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-[#f0f0f5] mb-1">Assumptions</h3>
              <p className="text-xs text-[#9ca3af] mb-6">
                Adjust parameters below. Click <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[rgba(255,255,255,0.2)] text-[8px]">i</span> for sources.
              </p>

              {(tab === "ed" || tab === "gap") && (
                <>
                  <p className="text-xs font-semibold text-[#00D1B2] uppercase tracking-wider mb-3">
                    ED Demand Drivers
                  </p>
                  <SliderWithCitation
                    label="Population Growth"
                    value={edDrivers.pop_growth_rate}
                    min={0} max={0.06} step={0.001}
                    unit="%"
                    citation={ED_DRIVER_CITATIONS.pop_growth_rate.source}
                    scenarioValues={ED_DRIVER_CITATIONS.pop_growth_rate}
                    onChange={(v) => setEdDrivers((p) => ({ ...p, pop_growth_rate: v }))}
                  />
                  <SliderWithCitation
                    label="Aging Effect (2035)"
                    value={edDrivers.aging_effect_multiplier_2035}
                    min={1} max={1.15} step={0.01}
                    unit="x"
                    citation={ED_DRIVER_CITATIONS.aging_effect_multiplier_2035.source}
                    scenarioValues={ED_DRIVER_CITATIONS.aging_effect_multiplier_2035}
                    onChange={(v) => setEdDrivers((p) => ({ ...p, aging_effect_multiplier_2035: v }))}
                  />
                  <SliderWithCitation
                    label="Disease Burden (2035)"
                    value={edDrivers.disease_burden_multiplier_2035}
                    min={1} max={1.2} step={0.01}
                    unit="x"
                    citation={ED_DRIVER_CITATIONS.disease_burden_multiplier_2035.source}
                    scenarioValues={ED_DRIVER_CITATIONS.disease_burden_multiplier_2035}
                    onChange={(v) => setEdDrivers((p) => ({ ...p, disease_burden_multiplier_2035: v }))}
                  />
                  <SliderWithCitation
                    label="ED Diversion (2035)"
                    value={edDrivers.diversion_pct_2035}
                    min={0} max={0.2} step={0.01}
                    unit="%"
                    citation={ED_DRIVER_CITATIONS.diversion_pct_2035.source}
                    scenarioValues={ED_DRIVER_CITATIONS.diversion_pct_2035}
                    onChange={(v) => setEdDrivers((p) => ({ ...p, diversion_pct_2035: v }))}
                  />
                  <SliderWithCitation
                    label="Triage Throughput Gain"
                    value={edDrivers.triage_throughput_gain_low_acuity}
                    min={0} max={0.2} step={0.01}
                    unit="%"
                    citation={ED_DRIVER_CITATIONS.triage_throughput_gain_low_acuity.source}
                    scenarioValues={ED_DRIVER_CITATIONS.triage_throughput_gain_low_acuity}
                    onChange={(v) => setEdDrivers((p) => ({ ...p, triage_throughput_gain_low_acuity: v }))}
                  />

                  <div className="border-t border-[rgba(255,255,255,0.06)] my-4" />
                  <p className="text-xs font-semibold text-[#00D1B2] uppercase tracking-wider mb-3">
                    ED Capacity
                  </p>
                  <SliderWithCitation
                    label="Utilization Target"
                    value={edUtilOverride ?? DATA.edSites[0].bay_util_target[scenario]}
                    min={0.5} max={0.95} step={0.01}
                    unit="%"
                    citation="International benchmarks; adjusted for local operating conditions"
                    scenarioValues={{ base: 0.75, best: 0.78, surge: 0.70 }}
                    onChange={(v) => setEdUtilOverride(v)}
                  />
                </>
              )}

              {(tab === "or" || tab === "gap") && (
                <>
                  {tab === "gap" && <div className="border-t border-[rgba(255,255,255,0.06)] my-4" />}
                  <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider mb-3">
                    OR Demand Drivers
                  </p>
                  <SliderWithCitation
                    label="Population Growth"
                    value={orDrivers.pop_growth_rate}
                    min={0} max={0.06} step={0.001}
                    unit="%"
                    citation={OR_DRIVER_CITATIONS.pop_growth_rate.source}
                    scenarioValues={OR_DRIVER_CITATIONS.pop_growth_rate}
                    onChange={(v) => setOrDrivers((p) => ({ ...p, pop_growth_rate: v }))}
                  />
                  <SliderWithCitation
                    label="Aging Effect (2035)"
                    value={orDrivers.aging_effect_multiplier_2035}
                    min={1} max={1.15} step={0.01}
                    unit="x"
                    citation={OR_DRIVER_CITATIONS.aging_effect_multiplier_2035.source}
                    scenarioValues={OR_DRIVER_CITATIONS.aging_effect_multiplier_2035}
                    onChange={(v) => setOrDrivers((p) => ({ ...p, aging_effect_multiplier_2035: v }))}
                  />
                  <SliderWithCitation
                    label="Disease Burden (2035)"
                    value={orDrivers.disease_burden_multiplier_2035}
                    min={1} max={1.2} step={0.01}
                    unit="x"
                    citation={OR_DRIVER_CITATIONS.disease_burden_multiplier_2035.source}
                    scenarioValues={OR_DRIVER_CITATIONS.disease_burden_multiplier_2035}
                    onChange={(v) => setOrDrivers((p) => ({ ...p, disease_burden_multiplier_2035: v }))}
                  />

                  <div className="border-t border-[rgba(255,255,255,0.06)] my-4" />
                  <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider mb-3">
                    OR Capacity
                  </p>
                  <SliderWithCitation
                    label="Utilization Target"
                    value={orUtilOverride ?? DATA.orCapacity[0].util_target[scenario]}
                    min={0.5} max={0.95} step={0.01}
                    unit="%"
                    citation="International benchmarks; adjusted for local operating conditions"
                    scenarioValues={{ base: 0.78, best: 0.82, surge: 0.70 }}
                    onChange={(v) => setOrUtilOverride(v)}
                  />
                </>
              )}

              <button
                onClick={() => handleScenarioChange(scenario)}
                className="w-full mt-4 py-2 rounded-xl glass-subtle text-xs text-[#9ca3af] hover:text-[#f0f0f5] transition-colors cursor-pointer"
              >
                Reset to {SCENARIO_LABELS[scenario]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
