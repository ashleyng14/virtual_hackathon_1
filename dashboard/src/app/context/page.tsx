"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

export default function ContextPage() {
  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#00A9F4] mb-3">The challenge</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
          Planning capacity so no patient waits too long
        </h1>
        <p className="mt-4 text-base text-[#6B7280] max-w-xl mx-auto">
          Populations grow and age. Disease patterns shift. Hospitals need to plan years ahead to keep up.
        </p>
      </PageSection>

      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">What&apos;s in scope?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassCard accent="#051C2C">
            <h3 className="text-sm font-semibold text-[#051C2C] mb-3">In scope</h3>
            <ul className="space-y-2 text-sm text-[#374151]">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#051C2C] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Public and private hospital emergency departments
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#051C2C] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                All surgical operating rooms (general, ortho, OB/GYN, ENT, urology)
              </li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h3 className="text-sm font-semibold text-[#051C2C] mb-3">Out of scope</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                Primary care clinics and urgent care centres
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                Specialty clinics, dental, rehabilitation
              </li>
            </ul>
          </GlassCard>
        </div>
      </PageSection>

      {/* ED flow — box widths proportional to time */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How an emergency department works</h2>
        <p className="text-sm text-[#6B7280] mb-8">Each step takes a different amount of time. The box width below reflects that.</p>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3E5FC] text-center" style={{ flex: 1 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Arrival</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Walk-in or ambulance</p>
          </div>
          <span className="text-[#00A9F4] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3E5FC] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Triage</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~15 – 30 min</p>
          </div>
          <span className="text-[#00A9F4] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center" style={{ flex: 8 }}>
            <p className="text-xs font-semibold text-white">Treatment bay</p>
            <p className="text-[10px] text-[#B3E5FC] mt-0.5">1.5 – 6+ hrs depending on acuity</p>
          </div>
          <span className="text-[#00A9F4] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3E5FC] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Discharge or admit</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~20 – 30 min</p>
          </div>
        </div>

        <div className="card-subtle p-4">
          <p className="text-xs font-semibold text-[#051C2C] mb-2">Treatment time by acuity level</p>
          <div className="space-y-2">
            {[
              { level: "High acuity", pct: "~6%", time: "~6 hrs", desc: "Cardiac emergencies, major trauma, stroke", width: "100%" },
              { level: "Medium acuity", pct: "~44%", time: "~3 hrs", desc: "Fractures, abdominal pain, chest pain", width: "50%" },
              { level: "Low acuity", pct: "~50%", time: "~1.5 hrs", desc: "Minor lacerations, sprains, fever", width: "25%" },
            ].map((a) => (
              <div key={a.level} className="flex items-center gap-3">
                <div className="w-28 flex-shrink-0">
                  <p className="text-[11px] font-medium text-[#051C2C]">{a.level}</p>
                  <p className="text-[10px] text-[#6B7280]">{a.pct} of visits</p>
                </div>
                <div className="flex-1">
                  <div className="h-6 rounded bg-[#E5E7EB] overflow-hidden">
                    <div className="h-full rounded bg-[#00A9F4] flex items-center px-2" style={{ width: a.width }}>
                      <span className="text-[10px] text-white font-medium whitespace-nowrap">{a.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280] w-48 flex-shrink-0 hidden md:block">e.g. {a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* OR flow — box widths proportional to time */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How an operating room works</h2>
        <p className="text-sm text-[#6B7280] mb-8">Each OR typically runs 2 sessions/day. Surgery is the longest phase by far.</p>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3E5FC] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Pre-op</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~30 – 45 min</p>
          </div>
          <span className="text-[#00A9F4] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center" style={{ flex: 8 }}>
            <p className="text-xs font-semibold text-white">Surgery</p>
            <p className="text-[10px] text-[#B3E5FC] mt-0.5">50 – 190 min depending on specialty</p>
          </div>
          <span className="text-[#00A9F4] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3E5FC] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Turnover</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~25 – 40 min</p>
          </div>
        </div>

        <div className="card-subtle p-4">
          <p className="text-xs font-semibold text-[#051C2C] mb-2">Average surgery duration by specialty</p>
          <div className="space-y-2">
            {[
              { specialty: "Cardiac", time: "~190 min", desc: "Bypass, valve replacement", width: "100%" },
              { specialty: "General surgery", time: "~150 min", desc: "Appendectomy, hernia, cholecystectomy", width: "79%" },
              { specialty: "Orthopaedics", time: "~150 min", desc: "Joint replacement, fracture fixation", width: "79%" },
              { specialty: "ENT", time: "~130 min", desc: "Tonsillectomy, sinus surgery", width: "68%" },
              { specialty: "Urology", time: "~95 min", desc: "Prostatectomy, kidney stones", width: "50%" },
              { specialty: "OB/GYN", time: "~80 min", desc: "C-section, hysterectomy", width: "42%" },
            ].map((s) => (
              <div key={s.specialty} className="flex items-center gap-3">
                <div className="w-28 flex-shrink-0">
                  <p className="text-[11px] font-medium text-[#051C2C]">{s.specialty}</p>
                </div>
                <div className="flex-1">
                  <div className="h-6 rounded bg-[#E5E7EB] overflow-hidden">
                    <div className="h-full rounded bg-[#051C2C] flex items-center px-2" style={{ width: s.width }}>
                      <span className="text-[10px] text-white font-medium whitespace-nowrap">{s.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280] w-48 flex-shrink-0 hidden md:block">e.g. {s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-3 italic">Source: JAMA Surgery (2022), PMC/NCBl university hospital study</p>
        </div>
      </PageSection>

      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">What this model answers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { num: "1", title: "Forecast demand", desc: "How many patients will need ED and OR services each year through 2035?" },
            { num: "2", title: "Assess capacity", desc: "Can current hospitals plus planned expansions handle that volume?" },
            { num: "3", title: "Close the gap", desc: "Where to expand, when, and by how much?" },
          ].map((item) => (
            <GlassCard key={item.num}>
              <span className="text-2xl font-bold text-[#E5E7EB]">{item.num}</span>
              <h4 className="text-sm font-semibold text-[#051C2C] mt-2">{item.title}</h4>
              <p className="text-sm text-[#6B7280] mt-1">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      <PageSection className="text-center pb-24">
        <Link
          href="/methodology"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#051C2C] text-white text-sm font-medium hover:bg-[#0a2e44] transition-colors"
        >
          See our approach →
        </Link>
      </PageSection>
    </div>
  );
}
