"use client";

import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import GlassCard from "@/components/ui/GlassCard";

export default function ContextPage() {
  return (
    <div>
      {/* Hero */}
      <PageSection className="pt-24 text-center">
        <p className="text-sm font-medium text-[#0d9488] mb-3">The challenge</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] max-w-2xl mx-auto leading-tight">
          Planning capacity so no patient waits too long
        </h1>
        <p className="mt-4 text-base text-[#5f6368] max-w-xl mx-auto">
          Populations grow and age. Disease patterns shift. Hospitals need to plan years ahead to keep up.
        </p>
      </PageSection>

      {/* Scope */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">What&apos;s in scope?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassCard accent="#0d9488">
            <h3 className="text-sm font-semibold text-[#1a1a2e] mb-3">In scope</h3>
            <ul className="space-y-2 text-sm text-[#5f6368]">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#0d9488] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Public and private hospital emergency departments
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#0d9488] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                All surgical operating rooms (general, ortho, OB/GYN, ENT, urology)
              </li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h3 className="text-sm font-semibold text-[#1a1a2e] mb-3">Out of scope</h3>
            <ul className="space-y-2 text-sm text-[#9aa0a6]">
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

      {/* ED flow */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">How an emergency department works</h2>
        <p className="text-sm text-[#5f6368] mb-8">Patients are triaged by severity, treated in a bay, then discharged or admitted.</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {[
            { label: "Arrival", time: "" },
            { label: "Triage", time: "Assess acuity" },
            { label: "Treatment bay", time: "1.5 – 6 hrs" },
            { label: "Discharge or admit", time: "" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 flex-1">
              <div className="card-subtle p-4 flex-1 text-center">
                <p className="text-sm font-medium text-[#1a1a2e]">{s.label}</p>
                {s.time && <p className="text-xs text-[#9aa0a6] mt-0.5">{s.time}</p>}
              </div>
              {i < 3 && <span className="text-[#d0d5dd] hidden md:block">→</span>}
            </div>
          ))}
        </div>
      </PageSection>

      {/* OR flow */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">How an operating room works</h2>
        <p className="text-sm text-[#5f6368] mb-8">Each OR runs ~2 sessions/day. Case duration varies by specialty.</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {[
            { label: "Scheduled case", time: "" },
            { label: "Pre-op", time: "" },
            { label: "Surgery", time: "65 – 135 min" },
            { label: "Turnover", time: "25 – 35 min" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 flex-1">
              <div className="card-subtle p-4 flex-1 text-center">
                <p className="text-sm font-medium text-[#1a1a2e]">{s.label}</p>
                {s.time && <p className="text-xs text-[#9aa0a6] mt-0.5">{s.time}</p>}
              </div>
              {i < 3 && <span className="text-[#d0d5dd] hidden md:block">→</span>}
            </div>
          ))}
        </div>
      </PageSection>

      {/* Purpose */}
      <PageSection>
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">What this model answers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { num: "1", title: "Forecast demand", desc: "How many patients will need ED and OR services each year through 2035?" },
            { num: "2", title: "Assess capacity", desc: "Can current hospitals plus planned expansions handle that volume?" },
            { num: "3", title: "Close the gap", desc: "Where to expand, when, and by how much?" },
          ].map((item) => (
            <GlassCard key={item.num}>
              <span className="text-2xl font-bold text-[#e9ecef]">{item.num}</span>
              <h4 className="text-sm font-semibold text-[#1a1a2e] mt-2">{item.title}</h4>
              <p className="text-sm text-[#5f6368] mt-1">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="text-center pb-24">
        <Link
          href="/methodology"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#0d9488] text-white text-sm font-medium hover:bg-[#0f766e] transition-colors"
        >
          See our approach →
        </Link>
      </PageSection>
    </div>
  );
}
