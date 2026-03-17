"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

export default function ContextPage() {
  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">The challenge</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#051C2C] max-w-2xl mx-auto leading-tight">
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

      {/* Hospital locations overview */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Where are the facilities?</h2>
        <p className="text-sm text-[#6B7280] mb-6">Seven sites across the country — 6 emergency departments and 5 operating room suites (illustrative).</p>

        <div className="card-subtle p-6 flex items-center justify-center">
          <svg viewBox="0 0 520 250" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
            {/* UAE-inspired coastline */}
            <path
              d="M60,130 L80,110 L110,100 L140,90 L180,80 L220,75 L260,80 L300,85 L340,95 L370,110 L400,120 L430,130 L450,145 L460,165 L455,185 L440,200 L420,210 L390,215 L360,212 L330,208 L300,210 L270,215 L240,218 L210,215 L180,210 L150,200 L120,185 L95,170 L75,155 L60,130Z"
              fill="#F8F9FB" stroke="#D1D5DB" strokeWidth="1.5"
            />
            <path d="M150,130 Q200,120 250,130 Q300,125 350,140" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            <text x="42" y="108" className="text-[8px]" fill="#D1D5DB" textAnchor="middle">Gulf</text>

            {/* Sites — simple dots + labels */}
            {[
              { cx: 310, cy: 145, r: 14, label: "Central", sub: "ED + OR" },
              { cx: 195, cy: 100, r: 10, label: "North", sub: "ED + OR" },
              { cx: 120, cy: 150, r: 9, label: "West", sub: "ED + OR" },
              { cx: 410, cy: 140, r: 7, label: "Airport", sub: "ED" },
              { cx: 350, cy: 190, r: 8, label: "Pvt A", sub: "ED + OR" },
              { cx: 240, cy: 185, r: 8, label: "Pvt B", sub: "ED" },
              { cx: 280, cy: 205, r: 7, label: "Women\u2019s", sub: "OR" },
            ].map((s) => (
              <g key={s.label}>
                <circle cx={s.cx} cy={s.cy} r={s.r} fill="#051C2C" fillOpacity="0.07" stroke="#051C2C" strokeWidth="1.5" />
                <circle cx={s.cx} cy={s.cy} r={3} fill="#051C2C" />
                <text x={s.cx} y={s.cy + s.r + 12} textAnchor="middle" className="text-[9px] font-medium" fill="#051C2C">{s.label}</text>
                <text x={s.cx} y={s.cy + s.r + 21} textAnchor="middle" className="text-[7px]" fill="#6B7280">{s.sub}</text>
              </g>
            ))}
          </svg>
        </div>
        <p className="text-[11px] text-[#6B7280] mt-3 text-center">
          Explore each site in detail on the <a href="/data" className="text-[#2251FF] underline">data breakdown</a> page.
        </p>
      </PageSection>

      {/* ED flow — box widths proportional to time */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How an emergency department works</h2>
        <p className="text-sm text-[#6B7280] mb-8">Each step takes a different amount of time. The box width below reflects that.</p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center sm:flex-[1]">
            <p className="text-xs font-semibold text-[#051C2C]">Arrival</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">Walk-in or ambulance</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center hidden sm:block">→</span>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center sm:hidden">↓</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center sm:flex-[2]">
            <p className="text-xs font-semibold text-[#051C2C]">Triage</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">~15 – 30 min</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center hidden sm:block">→</span>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center sm:hidden">↓</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center sm:flex-[8]">
            <p className="text-xs font-semibold text-white">Treatment bay</p>
            <p className="text-[11px] text-[#B3C6FF] mt-0.5">45 min – 4.5 hrs depending on acuity</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center hidden sm:block">→</span>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center sm:hidden">↓</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center sm:flex-[2]">
            <p className="text-xs font-semibold text-[#051C2C]">Discharge or admit</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">~20 – 30 min</p>
          </div>
        </div>

        <div className="card-subtle p-4">
          <p className="text-xs font-semibold text-[#051C2C] mb-2">Treatment time by acuity level</p>
          <div className="space-y-2">
            {[
              { level: "High acuity", pct: "~6%", time: "~4.5 hrs", desc: "Cardiac emergencies, major trauma, stroke", width: "100%" },
              { level: "Medium acuity", pct: "~44%", time: "~1.5 hrs", desc: "Fractures, abdominal pain, chest pain", width: "33%" },
              { level: "Low acuity", pct: "~50%", time: "~45 min", desc: "Minor lacerations, sprains, fever", width: "17%" },
            ].map((a) => (
              <div key={a.level} className="flex items-center gap-3">
                <div className="w-28 flex-shrink-0">
                  <p className="text-[11px] font-medium text-[#051C2C]">{a.level}</p>
                  <p className="text-[10px] text-[#6B7280]">{a.pct} of visits</p>
                </div>
                <div className="flex-1">
                  <div className="h-6 rounded bg-[#E5E7EB] overflow-hidden">
                    <div className="h-full rounded bg-[#2251FF] flex items-center px-2" style={{ width: a.width }}>
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center sm:flex-[2]">
            <p className="text-xs font-semibold text-[#051C2C]">Pre-op</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">~30 – 45 min</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center hidden sm:block">→</span>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center sm:hidden">↓</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center sm:flex-[8]">
            <p className="text-xs font-semibold text-white">Surgery</p>
            <p className="text-[11px] text-[#B3C6FF] mt-0.5">50 – 190 min depending on specialty</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center hidden sm:block">→</span>
          <span className="text-[#2251FF] text-sm flex-shrink-0 text-center sm:hidden">↓</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center sm:flex-[2]">
            <p className="text-xs font-semibold text-[#051C2C]">Turnover</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">~25 – 40 min</p>
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

      {/* Expansion plan */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Planned capacity expansions</h2>
        <p className="text-sm text-[#6B7280] mb-6">Several sites have approved expansion projects. New units ramp up gradually from 60% to 100% productivity over 2–3 years.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-subtle p-5">
            <p className="text-xs font-semibold text-[#051C2C] mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2251FF]" />
              Emergency department expansions
            </p>
            <div className="space-y-3">
              {[
                { site: "Central ED", bays: "+10 bays", year: "2029–31", note: "60 → 70 staffed bays" },
                { site: "North ED", bays: "+5 bays", year: "2029–31", note: "38 → 43 staffed bays" },
                { site: "West ED", bays: "+5 bays", year: "2029–31", note: "28 → 33 staffed bays" },
              ].map((e) => (
                <div key={e.site} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#051C2C]">{e.site}</p>
                    <p className="text-[10px] text-[#6B7280]">{e.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#2251FF]">{e.bays}</p>
                    <p className="text-[10px] text-[#6B7280]">{e.year}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#E5E7EB] pt-2 flex justify-between text-[11px]">
                <span className="text-[#6B7280]">Total ED expansion</span>
                <span className="font-semibold text-[#051C2C]">+20 bays (+11.3%)</span>
              </div>
            </div>
          </div>
          <div className="card-subtle p-5">
            <p className="text-xs font-semibold text-[#051C2C] mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#051C2C]" />
              Operating room expansions
            </p>
            <div className="space-y-3">
              {[
                { site: "Central OR", rooms: "+2 rooms", year: "2028–30", note: "19 → 21 staffed rooms" },
                { site: "North OR", rooms: "+1 room", year: "2029–31", note: "9 → 10 staffed rooms" },
                { site: "West OR", rooms: "+1 room", year: "2029–31", note: "7 → 8 staffed rooms" },
              ].map((e) => (
                <div key={e.site} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#051C2C]">{e.site}</p>
                    <p className="text-[10px] text-[#6B7280]">{e.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#051C2C]">{e.rooms}</p>
                    <p className="text-[10px] text-[#6B7280]">{e.year}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#E5E7EB] pt-2 flex justify-between text-[11px]">
                <span className="text-[#6B7280]">Total OR expansion</span>
                <span className="font-semibold text-[#051C2C]">+4 rooms (+7.5%)</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-6">What this model answers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { num: "1", title: "Forecast demand", desc: "How many patients will need ED and OR services each year through 2035?" },
            { num: "2", title: "Assess capacity", desc: "How many patients can current bays and rooms handle per year?" },
            { num: "3", title: "Size the gap", desc: "Where is capacity falling short, and by how much?" },
            { num: "4", title: "Close the gap", desc: "Where to expand, when, and by how much?" },
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
          className="inline-block px-6 py-2.5 rounded-lg bg-[#2251FF] text-white text-sm font-medium hover:bg-[#1a42d9] transition-colors"
        >
          See our approach →
        </Link>
      </PageSection>
    </div>
  );
}
