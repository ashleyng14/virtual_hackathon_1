"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

const scopeItems = [
  {
    inScope: true,
    items: [
      "Public hospital Emergency Departments",
      "Public hospital Operating Rooms (all specialties)",
      "Private hospital EDs and ORs",
    ],
    label: "In Scope",
  },
  {
    inScope: false,
    items: [
      "Primary health care centers & clinics",
      "Urgent care / walk-in facilities",
      "Dental, ophthalmology, and specialty clinics",
      "Long-term care & rehabilitation",
    ],
    label: "Out of Scope",
  },
];

const edSteps = [
  { label: "Arrival", desc: "Patient arrives by ambulance or walk-in", icon: "🏥" },
  { label: "Triage", desc: "Nurse assesses severity: High, Medium, or Low acuity", icon: "📋" },
  { label: "Treatment Bay", desc: "Patient occupies a bay for treatment (1.5 - 6 hours depending on acuity)", icon: "🛏️" },
  { label: "Disposition", desc: "Discharged home, admitted to ward, or transferred to OR for surgery", icon: "🚪" },
];

const orSteps = [
  { label: "Scheduling", desc: "Cases are booked by specialty (General, Ortho, OB/GYN, ENT, Urology)", icon: "📅" },
  { label: "Pre-Op", desc: "Patient is prepared for surgery in the holding area", icon: "💉" },
  { label: "Surgery", desc: "Procedure performed in OR suite (65 - 135 minutes by specialty)", icon: "⚕️" },
  { label: "Turnover", desc: "Room cleaned and reset for next case (25 - 35 minutes)", icon: "🔄" },
];

const concepts = [
  {
    title: "Bays & Rooms",
    desc: "Physical treatment spaces in the ED (bays) and surgical suites in the OR (rooms). Not all physical units are staffed at any time.",
    color: "#00D1B2",
  },
  {
    title: "Utilization Target",
    desc: "Facilities cannot run at 100% -- staff need breaks, rooms need cleaning, and surge capacity must be reserved. Targets are typically 75-80%.",
    color: "#3B82F6",
  },
  {
    title: "Acuity",
    desc: "The severity of an ED patient's condition. High-acuity patients (6% of visits) need ~6 hours; low-acuity patients (50%) need ~1.5 hours.",
    color: "#8B5CF6",
  },
  {
    title: "Cancellation Rate",
    desc: "5-7% of scheduled surgeries are cancelled on the day, reducing effective OR throughput.",
    color: "#F59E0B",
  },
];

export default function ContextPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageSection className="pt-32 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-[#00D1B2] mb-4">
          The Challenge
        </p>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text max-w-3xl mx-auto leading-tight">
          Planning healthcare capacity so no patient waits too long
        </h1>
        <p className="mt-6 text-lg text-[#9ca3af] max-w-2xl mx-auto">
          As populations grow, age, and disease patterns shift, hospitals must plan years ahead to ensure emergency and surgical services can meet future demand.
        </p>
      </PageSection>

      {/* Scope */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Where does this apply?</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          This model focuses on hospitals -- the facilities with Emergency Departments and Operating Rooms. Operating Rooms cover all surgical specialties, not just emergency surgeries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scopeItems.map((group) => (
            <GlassCard key={group.label} glowColor={group.inScope ? "teal" : "none"}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.inScope ? "#00D1B2" : "#6b7280" }}
                />
                <h3 className="text-lg font-semibold text-[#f0f0f5]">{group.label}</h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#9ca3af]">
                    <span className="mt-0.5">
                      {group.inScope ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      )}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* How ED Works */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">How does an Emergency Department work?</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          Every patient entering the ED follows a structured flow. The time they spend in a treatment bay depends on how severe their condition is.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {edSteps.map((step, i) => (
            <div key={step.label} className="relative">
              <GlassCard hover className="text-center h-full">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h4 className="text-sm font-semibold text-[#f0f0f5] mb-1">{step.label}</h4>
                <p className="text-xs text-[#9ca3af]">{step.desc}</p>
              </GlassCard>
              {i < edSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-[#00D1B2] text-lg -translate-y-1/2 z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* How OR Works */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">How does an Operating Room work?</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          Each OR typically runs 2 sessions per day (~4 hours each). Different surgical specialties have different case durations and turnover times.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {orSteps.map((step, i) => (
            <div key={step.label} className="relative">
              <GlassCard hover className="text-center h-full">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h4 className="text-sm font-semibold text-[#f0f0f5] mb-1">{step.label}</h4>
                <p className="text-xs text-[#9ca3af]">{step.desc}</p>
              </GlassCard>
              {i < orSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-[#3B82F6] text-lg -translate-y-1/2 z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* Key Concepts */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Key concepts</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          A few terms you will see throughout the model and dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concepts.map((c) => (
            <GlassCard key={c.title} hover>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <div>
                  <h4 className="text-sm font-semibold text-[#f0f0f5] mb-1">{c.title}</h4>
                  <p className="text-sm text-[#9ca3af]">{c.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* Purpose */}
      <PageSection>
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Why this exercise?</h2>
        <p className="text-[#9ca3af] mb-10 max-w-2xl">
          Three questions this model answers for the Ministry of Health.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Forecast Demand", desc: "How many patients will need ED and OR services each year through 2035?", color: "#00D1B2" },
            { num: "02", title: "Assess Capacity", desc: "Can our current hospitals, plus planned expansions, handle that volume?", color: "#3B82F6" },
            { num: "03", title: "Close the Gap", desc: "Where should we expand, when, and by how much to avoid shortfalls?", color: "#8B5CF6" },
          ].map((item) => (
            <GlassCard key={item.num} hover>
              <span className="text-4xl font-bold" style={{ color: item.color, opacity: 0.3 }}>{item.num}</span>
              <h4 className="text-lg font-semibold text-[#f0f0f5] mt-2 mb-2">{item.title}</h4>
              <p className="text-sm text-[#9ca3af]">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="text-center pb-32">
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-4">Ready to see how we built this?</h2>
        <Link
          href="/methodology"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#00D1B2] to-[#3B82F6] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          See Our Approach →
        </Link>
      </PageSection>
    </div>
  );
}
