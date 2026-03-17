"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

const processSteps = [
  {
    step: "01",
    title: "Site Visits & Observation",
    desc: "Teams visit each hospital to walk the ED and OR floors. We count physical bays, rooms, observe patient flow, and interview operations staff to understand real-world constraints.",
    details: ["Count physical bays / OR suites", "Observe shift patterns & staffing", "Interview ED directors & OR managers", "Photograph layouts and workflows"],
    color: "#00D1B2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Data Collection & Validation",
    desc: "We extract historical visit volumes, case counts, and operating parameters from the hospital management information system (MIS) and validate against observed reality.",
    details: ["Annual ED visit volumes by site", "Annual OR cases by site & specialty", "Staffing levels vs. physical capacity", "Treatment times & turnover benchmarks"],
    color: "#3B82F6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Demand Driver Research",
    desc: "We source external projections for the key factors that drive future healthcare demand: population growth, demographic aging, and disease burden trends.",
    details: ["National census population forecasts", "UN / WHO aging curve projections", "Global Burden of Disease (GBD) data", "Ministry of Health policy plans (diversion)"],
    color: "#8B5CF6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Model Construction",
    desc: "Inputs feed into two parallel calculation engines: a demand projection model and a capacity throughput model. Both project forward year by year through 2035.",
    details: ["Compound growth with demographic multipliers", "Throughput = bays x hours x utilization / treatment time", "Expansion plan phased with ramp-up", "Three scenarios: Base, Best, Surge"],
    color: "#F59E0B",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Gap Analysis & Recommendations",
    desc: "We overlay demand on capacity to identify where and when gaps emerge, then translate those gaps into specific expansion and efficiency recommendations.",
    details: ["Gap = Capacity - Demand per site per year", "RAG status for each facility", "Prioritized investment roadmap", "Sensitivity analysis on key levers"],
    color: "#EF4444",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const inputBoxes = [
  { label: "Demographics", items: ["Population growth rate", "Aging curve to 2035", "Disease burden trend"], color: "#00D1B2" },
  { label: "Baseline Volumes", items: ["ED visits per site (2025)", "OR cases per site & specialty (2025)"], color: "#3B82F6" },
  { label: "Physical Assets", items: ["Bays / rooms (physical vs. staffed)", "Utilization targets", "Treatment & turnover times"], color: "#8B5CF6" },
  { label: "Expansion Plan", items: ["New bays / rooms by year", "Ramp-up percentage", "Sites included in plan"], color: "#F59E0B" },
];

const scenarios = [
  { name: "Base Case", desc: "Expected trajectory. Moderate growth, standard efficiency gains, planned expansions proceed on schedule.", color: "#3B82F6", values: "Pop growth 2.0%, Aging 1.06x, Disease 1.08x" },
  { name: "Best Case", desc: "Optimistic. Lower demand growth combined with stronger efficiency improvements and higher diversion to primary care.", color: "#00D1B2", values: "Pop growth 1.5%, Aging 1.08x, Disease 1.06x, 12% diversion" },
  { name: "Surge Case", desc: "Pessimistic. Higher population growth, elevated disease burden, minimal efficiency gains. Stress-tests the system.", color: "#EF4444", values: "Pop growth 3.5%, Aging 1.05x, Disease 1.10x, 2% diversion" },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageSection className="pt-32 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-[#3B82F6] mb-4">
          Our Approach
        </p>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text max-w-3xl mx-auto leading-tight">
          From data collection to decisions
        </h1>
        <p className="mt-6 text-lg text-[#9ca3af] max-w-2xl mx-auto">
          A five-step process that turns on-the-ground observations into a forward-looking capacity model the Ministry can act on.
        </p>
      </PageSection>

      {/* Process Steps */}
      <PageSection>
        <div className="space-y-8">
          {processSteps.map((ps, i) => (
            <GlassCard key={ps.step} className="relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 flex items-start gap-4">
                  <span className="text-5xl font-bold leading-none" style={{ color: ps.color, opacity: 0.2 }}>{ps.step}</span>
                  <div className="w-14 h-14 rounded-2xl glass-subtle flex items-center justify-center" style={{ color: ps.color }}>
                    {ps.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2">{ps.title}</h3>
                  <p className="text-sm text-[#9ca3af] mb-4 max-w-xl">{ps.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {ps.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-xs text-[#9ca3af]">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: ps.color }} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute -bottom-4 left-12 w-px h-8 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent" />
              )}
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* Calculation Flow */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">The calculation engine</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          Four categories of inputs feed into two parallel models. The gap between demand and capacity reveals where to act.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {inputBoxes.map((box) => (
            <GlassCard key={box.label} hover className="relative">
              <div className="w-full h-0.5 rounded-full absolute top-0 left-0" style={{ backgroundColor: box.color }} />
              <h4 className="text-sm font-semibold text-[#f0f0f5] mb-3 mt-1">{box.label}</h4>
              <ul className="space-y-2">
                {box.items.map((item) => (
                  <li key={item} className="text-xs text-[#9ca3af] flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: box.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Arrow down */}
        <div className="flex justify-center my-6">
          <div className="w-px h-12 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
        </div>

        {/* Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard glowColor="blue">
            <h4 className="text-sm font-semibold text-[#3B82F6] mb-2">Demand Projection</h4>
            <p className="text-xs text-[#9ca3af] mb-3">Compound growth formula applied year-by-year from 2025 baseline</p>
            <div className="glass-subtle p-3 rounded-lg font-mono text-xs text-[#9ca3af]">
              Demand(y) = Baseline &times; (1+growth)<sup>t</sup> &times; aging(y) &times; disease(y) &times; diversion(y)
            </div>
          </GlassCard>
          <GlassCard glowColor="teal">
            <h4 className="text-sm font-semibold text-[#00D1B2] mb-2">Capacity Model</h4>
            <p className="text-xs text-[#9ca3af] mb-3">Throughput calculation based on available bays/rooms and efficiency</p>
            <div className="glass-subtle p-3 rounded-lg font-mono text-xs text-[#9ca3af]">
              Capacity(y) = Bays(y) &times; Hours &times; Utilization / Treatment Time
            </div>
          </GlassCard>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center my-6">
          <div className="w-px h-12 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
        </div>

        {/* Output */}
        <GlassCard glowColor="rose" className="text-center">
          <h4 className="text-sm font-semibold text-[#EF4444] mb-2">Gap Analysis</h4>
          <p className="text-xs text-[#9ca3af]">
            Gap = Capacity &minus; Demand. Negative gap means shortfall. Shown by site, by year, with recommended actions.
          </p>
        </GlassCard>
      </PageSection>

      {/* Scenario Planning */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Scenario planning</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          We run the same model under three sets of assumptions to stress-test outcomes. You can also customize any individual parameter in the dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <GlassCard key={s.name} hover>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <h4 className="text-lg font-semibold text-[#f0f0f5]">{s.name}</h4>
              </div>
              <p className="text-sm text-[#9ca3af] mb-4">{s.desc}</p>
              <div className="glass-subtle p-3 rounded-lg text-xs text-[#9ca3af] font-mono">
                {s.values}
              </div>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="text-center pb-32">
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-4">Explore the results interactively</h2>
        <p className="text-[#9ca3af] mb-8 max-w-lg mx-auto">
          Adjust assumptions with sliders, toggle scenarios, and see how demand and capacity projections change in real time.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#00D1B2] to-[#3B82F6] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Open Dashboard →
        </Link>
      </PageSection>
    </div>
  );
}
