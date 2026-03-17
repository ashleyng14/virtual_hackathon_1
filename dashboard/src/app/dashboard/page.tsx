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

type Tab = "ed" | "or";

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

  const activeGap = tab === "ed" ? edGap2035 : orGap2035;
  const activeAggregate = tab === "ed" ? edAggregate : orAggregate;
  const activeMerged = tab === "ed" ? edMerged : orMerged;
  const activeRecs = useMemo(
    () => generateRecommendations(activeGap, activeAggregate, tab === "ed" ? "ED" : "OR"),
    [activeGap, activeAggregate, tab],
  );

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#051C2C]">Demand &amp; capacity projections</h1>
            <p className="text-sm text-[#6B7280]">2025 – 2035 outlook across all sites</p>
          </div>
          <SegmentedToggle
            options={Object.entries(SCENARIO_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            selected={scenario}
            onChange={handleScenarioChange}
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard>
            <p className="text-xs text-[#6B7280] mb-1">ED demand 2035</p>
            <AnimatedCounter value={edDemand2035} className="text-xl font-bold text-[#051C2C]" />
          </GlassCard>
          <GlassCard>
            <p className="text-xs text-[#6B7280] mb-1">OR demand 2035</p>
            <AnimatedCounter value={orDemand2035} className="text-xl font-bold text-[#051C2C]" />
          </GlassCard>
          <GlassCard accent={edGap2035 >= 0 ? "#059669" : "#DC2626"}>
            <p className="text-xs text-[#6B7280] mb-1">ED gap 2035</p>
            <AnimatedCounter value={edGap2035} className="text-xl font-bold text-[#051C2C]" />
            <div className="mt-1"><RagBadge gap={edGap2035} /></div>
          </GlassCard>
          <GlassCard accent={orGap2035 >= 0 ? "#059669" : "#DC2626"}>
            <p className="text-xs text-[#6B7280] mb-1">OR gap 2035</p>
            <AnimatedCounter value={orGap2035} className="text-xl font-bold text-[#051C2C]" />
            <div className="mt-1"><RagBadge gap={orGap2035} /></div>
          </GlassCard>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-5">
        <SegmentedToggle
          options={[
            { value: "ed", label: "Emergency department" },
            { value: "or", label: "Operating rooms" },
          ]}
          selected={tab}
          onChange={(v) => setTab(v as Tab)}
        />
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Charts */}
          <div className="flex-1 space-y-5">
            <GlassCard>
              <h3 className="text-sm font-semibold text-[#051C2C] mb-3">
                {tab === "ed" ? "ED" : "OR"} demand vs. capacity
              </h3>
              <DemandCapacityChart data={activeAggregate} domain={tab === "ed" ? "ED" : "OR"} />
            </GlassCard>

            {tab === "ed" && (
              <GlassCard>
                <h3 className="text-sm font-semibold text-[#051C2C] mb-3">
                  Demand driver decomposition
                </h3>
                <WaterfallChart data={edWaterfall} />
              </GlassCard>
            )}

            <GapRecommendations gap2035={activeGap} recommendations={activeRecs} domain={tab === "ed" ? "ED" : "OR"} />

            <GlassCard>
              <h3 className="text-sm font-semibold text-[#051C2C] mb-3">Site breakdown</h3>
              <SiteTable data={activeMerged} unit={tab === "ed" ? "visits" : "cases"} />
            </GlassCard>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="card p-5 sticky top-20">
              <h3 className="text-sm font-semibold text-[#051C2C] mb-1">Assumptions</h3>
              <p className="text-[11px] text-[#6B7280] mb-5">
                Adjust parameters. Click &#x24D8; for sources.
              </p>

              {tab === "ed" ? (
                <>
                  <p className="text-[10px] font-semibold text-[#051C2C] uppercase tracking-wider mb-2">Demand drivers</p>
                  <SliderWithCitation label="Population growth" value={edDrivers.pop_growth_rate} min={0} max={0.06} step={0.001} unit="%" citation={ED_DRIVER_CITATIONS.pop_growth_rate.source} scenarioValues={ED_DRIVER_CITATIONS.pop_growth_rate} onChange={(v) => setEdDrivers((p) => ({ ...p, pop_growth_rate: v }))} />
                  <SliderWithCitation label="Aging effect" value={edDrivers.aging_effect_multiplier_2035} min={1} max={1.15} step={0.01} unit="x" citation={ED_DRIVER_CITATIONS.aging_effect_multiplier_2035.source} scenarioValues={ED_DRIVER_CITATIONS.aging_effect_multiplier_2035} onChange={(v) => setEdDrivers((p) => ({ ...p, aging_effect_multiplier_2035: v }))} />
                  <SliderWithCitation label="Disease burden" value={edDrivers.disease_burden_multiplier_2035} min={1} max={1.2} step={0.01} unit="x" citation={ED_DRIVER_CITATIONS.disease_burden_multiplier_2035.source} scenarioValues={ED_DRIVER_CITATIONS.disease_burden_multiplier_2035} onChange={(v) => setEdDrivers((p) => ({ ...p, disease_burden_multiplier_2035: v }))} />
                  <SliderWithCitation label="ED diversion" value={edDrivers.diversion_pct_2035} min={0} max={0.2} step={0.01} unit="%" citation={ED_DRIVER_CITATIONS.diversion_pct_2035.source} scenarioValues={ED_DRIVER_CITATIONS.diversion_pct_2035} onChange={(v) => setEdDrivers((p) => ({ ...p, diversion_pct_2035: v }))} />
                  <SliderWithCitation label="Triage throughput" value={edDrivers.triage_throughput_gain_low_acuity} min={0} max={0.2} step={0.01} unit="%" citation={ED_DRIVER_CITATIONS.triage_throughput_gain_low_acuity.source} scenarioValues={ED_DRIVER_CITATIONS.triage_throughput_gain_low_acuity} onChange={(v) => setEdDrivers((p) => ({ ...p, triage_throughput_gain_low_acuity: v }))} />
                  <div className="border-t border-[#E5E7EB] my-3" />
                  <p className="text-[10px] font-semibold text-[#051C2C] uppercase tracking-wider mb-2">Capacity</p>
                  <SliderWithCitation label="Utilization target" value={edUtilOverride ?? DATA.edSites[0].bay_util_target[scenario]} min={0.5} max={0.95} step={0.01} unit="%" citation="International benchmarks; adjusted for local conditions" scenarioValues={{ base: 0.75, best: 0.78, surge: 0.70 }} onChange={(v) => setEdUtilOverride(v)} />
                </>
              ) : (
                <>
                  <p className="text-[10px] font-semibold text-[#00A9F4] uppercase tracking-wider mb-2">Demand drivers</p>
                  <SliderWithCitation label="Population growth" value={orDrivers.pop_growth_rate} min={0} max={0.06} step={0.001} unit="%" citation={OR_DRIVER_CITATIONS.pop_growth_rate.source} scenarioValues={OR_DRIVER_CITATIONS.pop_growth_rate} onChange={(v) => setOrDrivers((p) => ({ ...p, pop_growth_rate: v }))} />
                  <SliderWithCitation label="Aging effect" value={orDrivers.aging_effect_multiplier_2035} min={1} max={1.15} step={0.01} unit="x" citation={OR_DRIVER_CITATIONS.aging_effect_multiplier_2035.source} scenarioValues={OR_DRIVER_CITATIONS.aging_effect_multiplier_2035} onChange={(v) => setOrDrivers((p) => ({ ...p, aging_effect_multiplier_2035: v }))} />
                  <SliderWithCitation label="Disease burden" value={orDrivers.disease_burden_multiplier_2035} min={1} max={1.2} step={0.01} unit="x" citation={OR_DRIVER_CITATIONS.disease_burden_multiplier_2035.source} scenarioValues={OR_DRIVER_CITATIONS.disease_burden_multiplier_2035} onChange={(v) => setOrDrivers((p) => ({ ...p, disease_burden_multiplier_2035: v }))} />
                  <div className="border-t border-[#E5E7EB] my-3" />
                  <p className="text-[10px] font-semibold text-[#00A9F4] uppercase tracking-wider mb-2">Capacity</p>
                  <SliderWithCitation label="Utilization target" value={orUtilOverride ?? DATA.orCapacity[0].util_target[scenario]} min={0.5} max={0.95} step={0.01} unit="%" citation="International benchmarks; adjusted for local conditions" scenarioValues={{ base: 0.78, best: 0.82, surge: 0.70 }} onChange={(v) => setOrUtilOverride(v)} />
                </>
              )}

              <button
                onClick={() => handleScenarioChange(scenario)}
                className="w-full mt-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#374151] hover:text-[#051C2C] transition-colors cursor-pointer"
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
