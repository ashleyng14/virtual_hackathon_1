"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

const steps = [
  {
    num: "1",
    title: "Site visits",
    desc: "Walk ED and OR floors, count bays and rooms, interview operations staff.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
        <rect x="5" y="2" width="14" height="19" rx="1" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Data collection",
    desc: "Extract visit volumes, case counts, and staffing levels from hospital information systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Demand driver research",
    desc: "Source population growth, aging, and disease burden forecasts from national statistics and WHO data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 8l2 4 2-2 3 3" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Model construction",
    desc: "Build demand and capacity projections year-by-year through 2035 under three scenarios.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 20V10M18 20V4M6 20v-4" />
        <circle cx="12" cy="7" r="2" />
        <circle cx="18" cy="3" r="1" />
        <circle cx="6" cy="14" r="2" />
      </svg>
    ),
  },
  {
    num: "5",
    title: "Gap analysis & recommendations",
    desc: "Identify where and when demand exceeds capacity, and recommend targeted expansions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

const inputs = [
  {
    label: "Demographics",
    items: ["Population growth rate", "Aging curve to 2035", "Disease burden trend"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Baseline volumes",
    items: ["ED visits per site", "OR cases per specialty"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    label: "Physical assets",
    items: ["Bays and rooms (staffed vs. physical)", "Utilization targets", "Treatment and turnover times"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 00-8 0v2" />
      </svg>
    ),
  },
  {
    label: "Expansion plan",
    items: ["New units by year and site", "Ramp-up schedule"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ),
  },
];

export default function MethodologyPage() {
  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">Our approach</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
          From data collection to decisions
        </h1>
        <p className="mt-4 text-base text-[#6B7280] max-w-xl mx-auto">
          Five steps turn on-the-ground observations into a forward-looking capacity plan.
        </p>
      </PageSection>

      {/* Steps with icons */}
      <PageSection>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="card p-5 flex items-start gap-5 border-l-[3px]"
              style={{ borderLeftColor: i % 2 === 0 ? "#2251FF" : "#051C2C" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: i % 2 === 0 ? "#EEF1FF" : "#F0F2F5", color: i % 2 === 0 ? "#2251FF" : "#051C2C" }}
              >
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: i % 2 === 0 ? "#2251FF" : "#051C2C" }}
                  >
                    Step {s.num}
                  </span>
                  <h3 className="text-sm font-semibold text-[#051C2C]">{s.title}</h3>
                </div>
                <p className="text-sm text-[#6B7280]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Inputs → Model → Output flow */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">How inputs become outputs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {inputs.map((box) => (
            <div key={box.label} className="card-subtle p-4 border-t-[3px] border-t-[#2251FF]">
              <div className="w-8 h-8 rounded-lg bg-[#EEF1FF] text-[#2251FF] flex items-center justify-center mb-2.5">
                {box.icon}
              </div>
              <h4 className="text-xs font-semibold text-[#051C2C] mb-2">{box.label}</h4>
              <ul className="space-y-1">
                {box.items.map((item) => (
                  <li key={item} className="text-[11px] text-[#6B7280] flex items-start gap-1.5">
                    <span className="text-[#2251FF] mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-5">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2251FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="text-[10px] text-[#2251FF] font-medium mt-1">Feeds into</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="card p-5 border-l-[3px] border-l-[#2251FF]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#2251FF] text-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-[#051C2C]">Demand projection</h4>
            </div>
            <p className="text-xs text-[#6B7280]">Compound growth from baseline, adjusted for aging, disease burden, and diversion.</p>
          </div>
          <div className="card p-5 border-l-[3px] border-l-[#051C2C]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#051C2C] text-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-[#051C2C]">Capacity model</h4>
            </div>
            <p className="text-xs text-[#6B7280]">Throughput = available units × operating hours × utilization ÷ treatment time.</p>
          </div>
        </div>

        <div className="flex justify-center my-5">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2251FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="text-[10px] text-[#2251FF] font-medium mt-1">Produces</span>
          </div>
        </div>

        <div className="card p-5 border-l-[3px] border-l-[#2251FF] bg-[#FAFBFF]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#2251FF] text-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-[#051C2C]">Gap analysis & recommended actions</h4>
          </div>
          <p className="text-xs text-[#6B7280]">Gap = capacity − demand. Negative means shortfall. Shown by site and year, with recommended interventions and timelines.</p>
        </div>
      </PageSection>

      {/* Scenarios */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Three scenarios</h2>
        <p className="text-sm text-[#6B7280] mb-6">The same model runs under different assumptions to stress-test outcomes.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Base case",
              desc: "Expected trajectory with moderate growth and planned efficiency gains.",
              color: "#2251FF",
              bg: "#EEF1FF",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M4 20h16M4 20V10l8-6 8 6v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              name: "Best case",
              desc: "Lower demand growth, stronger efficiency improvements, more diversion to primary care.",
              color: "#059669",
              bg: "#ECFDF5",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              name: "Surge case",
              desc: "Higher growth, elevated disease burden, minimal efficiency gains.",
              color: "#DC2626",
              bg: "#FEF2F2",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
          ].map((s) => (
            <div key={s.name} className="card p-5 border-t-[3px]" style={{ borderTopColor: s.color }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <h4 className="text-sm font-semibold text-[#051C2C]">{s.name}</h4>
              <p className="text-xs text-[#6B7280] mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="text-center pb-24">
        <Link
          href="/data"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#2251FF] text-white text-sm font-medium hover:bg-[#1a42d9] transition-colors"
        >
          See the data →
        </Link>
      </PageSection>
    </div>
  );
}
