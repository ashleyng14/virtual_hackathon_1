"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

export default function ContextPage() {
  return (
    <div>
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#2251FF] mb-3">The challenge</p>
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

      {/* Hospital locations map */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">Where are the facilities?</h2>
        <p className="text-sm text-[#6B7280] mb-8">Six emergency departments and five operating room sites across the country (illustrative).</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map */}
          <div className="md:col-span-2 card-subtle p-6 flex items-center justify-center">
            <svg viewBox="0 0 500 400" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
              {/* Coastline shape */}
              <path d="M80,60 Q120,50 180,55 Q240,45 300,60 Q360,55 400,70 Q430,90 440,130 Q445,170 430,210 Q420,250 390,280 Q350,320 300,340 Q250,355 200,350 Q150,340 120,310 Q90,280 80,240 Q70,200 75,160 Q78,120 80,60Z" fill="#EEF1FF" stroke="#2251FF" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Water texture */}
              <path d="M50,100 Q70,95 90,100" fill="none" stroke="#B3C6FF" strokeWidth="0.5" />
              <path d="M440,160 Q460,155 480,160" fill="none" stroke="#B3C6FF" strokeWidth="0.5" />
              <path d="M60,200 Q40,195 20,200" fill="none" stroke="#B3C6FF" strokeWidth="0.5" />

              {/* Central - largest, downtown */}
              <circle cx="260" cy="160" r="18" fill="#051C2C" fillOpacity="0.12" stroke="#051C2C" strokeWidth="1.5" />
              <circle cx="260" cy="160" r="5" fill="#051C2C" />
              <text x="260" y="190" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">Central</text>
              <text x="260" y="200" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED + OR</text>

              {/* North */}
              <circle cx="220" cy="90" r="13" fill="#2251FF" fillOpacity="0.1" stroke="#2251FF" strokeWidth="1.5" />
              <circle cx="220" cy="90" r="4" fill="#2251FF" />
              <text x="220" y="115" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">North</text>
              <text x="220" y="125" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED + OR</text>

              {/* West */}
              <circle cx="130" cy="180" r="11" fill="#2251FF" fillOpacity="0.1" stroke="#2251FF" strokeWidth="1.5" />
              <circle cx="130" cy="180" r="4" fill="#2251FF" />
              <text x="130" y="202" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">West</text>
              <text x="130" y="212" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED + OR</text>

              {/* Airport */}
              <circle cx="370" cy="120" r="9" fill="#6B7280" fillOpacity="0.1" stroke="#6B7280" strokeWidth="1.5" />
              <circle cx="370" cy="120" r="3.5" fill="#6B7280" />
              <text x="370" y="142" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">Airport</text>
              <text x="370" y="152" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED only</text>

              {/* Private A */}
              <circle cx="310" cy="240" r="10" fill="#051C2C" fillOpacity="0.08" stroke="#051C2C" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="310" cy="240" r="3.5" fill="#051C2C" />
              <text x="310" y="262" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">Private A</text>
              <text x="310" y="272" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED + OR</text>

              {/* Private B */}
              <circle cx="200" cy="270" r="10" fill="#051C2C" fillOpacity="0.08" stroke="#051C2C" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="200" cy="270" r="3.5" fill="#051C2C" />
              <text x="200" y="292" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">Private B</text>
              <text x="200" y="302" textAnchor="middle" className="text-[9px]" fill="#6B7280">ED only</text>

              {/* Womens OR (OR only, no ED) */}
              <circle cx="290" cy="300" r="9" fill="#2251FF" fillOpacity="0.08" stroke="#2251FF" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="290" cy="300" r="3" fill="#2251FF" />
              <text x="290" y="322" textAnchor="middle" className="text-[10px] font-semibold" fill="#051C2C">Women&apos;s</text>
              <text x="290" y="332" textAnchor="middle" className="text-[9px]" fill="#6B7280">OR only</text>
            </svg>
          </div>

          {/* Legend + site list */}
          <div className="space-y-3">
            <div className="card-subtle p-4">
              <p className="text-xs font-semibold text-[#051C2C] mb-3">Emergency departments</p>
              <div className="space-y-2">
                {[
                  { name: "Central ED", visits: "340K", bays: "70 bays (60 staffed)", size: "largest" },
                  { name: "North ED", visits: "180K", bays: "45 bays (38 staffed)", size: "" },
                  { name: "West ED", visits: "120K", bays: "32 bays (28 staffed)", size: "" },
                  { name: "Private ED A", visits: "90K", bays: "22 bays (19 staffed)", size: "" },
                  { name: "Private ED B", visits: "75K", bays: "20 bays (17 staffed)", size: "" },
                  { name: "Airport ED", visits: "65K", bays: "18 bays (15 staffed)", size: "" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#051C2C]">{s.name}</span>
                    <span className="text-[#6B7280]">{s.visits} visits/yr</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-subtle p-4">
              <p className="text-xs font-semibold text-[#051C2C] mb-3">Operating room sites</p>
              <div className="space-y-2">
                {[
                  { name: "Central OR", rooms: "22 rooms (19 staffed)" },
                  { name: "Private OR", rooms: "14 rooms (12 staffed)" },
                  { name: "North OR", rooms: "10 rooms (9 staffed)" },
                  { name: "West OR", rooms: "8 rooms (7 staffed)" },
                  { name: "Women\u2019s OR", rooms: "7 rooms (6 staffed)" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#051C2C]">{s.name}</span>
                    <span className="text-[#6B7280]">{s.rooms}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-[#6B7280] px-1">
              <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full border-2 border-[#051C2C]" /> Public hospital</div>
              <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full border border-dashed border-[#051C2C]" /> Private hospital</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#051C2C] opacity-10 border border-[#051C2C]" /> Circle size = relative volume</div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* ED flow — box widths proportional to time */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#051C2C] mb-2">How an emergency department works</h2>
        <p className="text-sm text-[#6B7280] mb-8">Each step takes a different amount of time. The box width below reflects that.</p>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center" style={{ flex: 1 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Arrival</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Walk-in or ambulance</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Triage</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~15 – 30 min</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center" style={{ flex: 8 }}>
            <p className="text-xs font-semibold text-white">Treatment bay</p>
            <p className="text-[10px] text-[#B3C6FF] mt-0.5">1.5 – 6+ hrs depending on acuity</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center" style={{ flex: 2 }}>
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

        <div className="flex items-center gap-2 mb-6">
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center" style={{ flex: 2 }}>
            <p className="text-xs font-semibold text-[#051C2C]">Pre-op</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">~30 – 45 min</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#051C2C] text-center" style={{ flex: 8 }}>
            <p className="text-xs font-semibold text-white">Surgery</p>
            <p className="text-[10px] text-[#B3C6FF] mt-0.5">50 – 190 min depending on specialty</p>
          </div>
          <span className="text-[#2251FF] text-sm flex-shrink-0">→</span>
          <div className="p-3 rounded-lg bg-[#EBF8FF] border border-[#B3C6FF] text-center" style={{ flex: 2 }}>
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
