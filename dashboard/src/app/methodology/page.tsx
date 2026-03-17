"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

const steps = [
  { num: "1", title: "Site visits", desc: "Walk ED and OR floors, count bays and rooms, interview operations staff." },
  { num: "2", title: "Data collection", desc: "Extract visit volumes, case counts, and staffing levels from hospital systems." },
  { num: "3", title: "Demand driver research", desc: "Source population growth, aging, and disease burden forecasts from national and WHO data." },
  { num: "4", title: "Model construction", desc: "Build demand and capacity projections year-by-year through 2035 under three scenarios." },
  { num: "5", title: "Gap analysis", desc: "Identify where and when demand exceeds capacity, and recommend targeted expansions." },
];

const inputs = [
  { label: "Demographics", items: ["Population growth rate", "Aging curve to 2035", "Disease burden trend"] },
  { label: "Baseline volumes", items: ["ED visits per site", "OR cases per specialty"] },
  { label: "Physical assets", items: ["Bays and rooms (staffed vs. physical)", "Utilization targets", "Treatment and turnover times"] },
  { label: "Expansion plan", items: ["New units by year and site", "Ramp-up schedule"] },
];

export default function MethodologyPage() {
  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">Our approach</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
          From data collection to decisions
        </h1>
        <p className="mt-4 text-base text-[#6B7280] max-w-xl mx-auto">
          Five steps turn on-the-ground observations into a forward-looking capacity plan.
        </p>
      </PageSection>

      <PageSection>
        <div className="space-y-4">
          {steps.map((s) => (
            <GlassCard key={s.num} accent="#051C2C">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#E5E7EB]">{s.num}</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#051C2C]">{s.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-0.5">{s.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">How inputs become outputs</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {inputs.map((box) => (
            <div key={box.label} className="card-subtle p-4 border-t-2 border-t-[#051C2C]">
              <h4 className="text-xs font-semibold text-[#051C2C] mb-2">{box.label}</h4>
              <ul className="space-y-1">
                {box.items.map((item) => (
                  <li key={item} className="text-[11px] text-[#6B7280]">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-4">
          <span className="text-[#D1D5DB] text-lg">↓</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <GlassCard accent="#051C2C">
            <h4 className="text-xs font-semibold text-[#051C2C] mb-1">Demand projection</h4>
            <p className="text-xs text-[#6B7280]">Compound growth from baseline, adjusted for aging, disease burden, and diversion.</p>
          </GlassCard>
          <GlassCard accent="#2251FF">
            <h4 className="text-xs font-semibold text-[#2251FF] mb-1">Capacity model</h4>
            <p className="text-xs text-[#6B7280]">Throughput = available units × operating hours × utilization ÷ treatment time.</p>
          </GlassCard>
        </div>

        <div className="flex justify-center my-4">
          <span className="text-[#D1D5DB] text-lg">↓</span>
        </div>

        <GlassCard accent="#DC2626">
          <h4 className="text-xs font-semibold text-[#DC2626] mb-1">Gap analysis</h4>
          <p className="text-xs text-[#6B7280]">Gap = capacity − demand. Negative means shortfall. Shown by site, year, with recommended actions.</p>
        </GlassCard>
      </PageSection>

      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Three scenarios</h2>
        <p className="text-sm text-[#6B7280] mb-6">The same model runs under different assumptions to stress-test outcomes.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Base case", desc: "Expected trajectory with moderate growth and planned efficiency gains.", color: "#051C2C" },
            { name: "Best case", desc: "Lower demand growth, stronger efficiency improvements, more diversion to primary care.", color: "#2251FF" },
            { name: "Surge case", desc: "Higher growth, elevated disease burden, minimal efficiency gains.", color: "#DC2626" },
          ].map((s) => (
            <GlassCard key={s.name} accent={s.color}>
              <h4 className="text-sm font-semibold text-[#051C2C]">{s.name}</h4>
              <p className="text-xs text-[#6B7280] mt-1">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      <PageSection className="text-center pb-24">
        <Link
          href="/data"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#051C2C] text-white text-sm font-medium hover:bg-[#0a2e44] transition-colors"
        >
          See the data →
        </Link>
      </PageSection>
    </div>
  );
}
