"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Understand the Challenge",
    description: "Learn how Emergency Departments and Operating Rooms work, and why forward planning is critical for a growing population.",
    href: "/context",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Our Approach",
    description: "See how we collect data through site visits, build the model, and translate inputs into actionable projections.",
    href: "/methodology",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
    title: "Interactive Dashboard",
    description: "Explore demand and capacity projections. Toggle scenarios, adjust assumptions, and see the impact in real time.",
    href: "/dashboard",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-[#00D1B2] mb-4">
            Workstream 2B
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text leading-tight max-w-4xl">
            Healthcare Capacity Model
          </h1>
          <p className="mt-6 text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
            Projecting demand and capacity for Emergency Departments &amp; Operating Rooms through 2035, enabling data-driven investment decisions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex gap-4"
        >
          <Link
            href="/context"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00D1B2] to-[#3B82F6] text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-xl glass glass-hover text-[#f0f0f5] font-medium text-sm"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            >
              <Link href={feature.href}>
                <GlassCard hover className="h-full cursor-pointer group">
                  <div className="mb-4 w-12 h-12 rounded-xl glass-subtle flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#f0f0f5] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed">{feature.description}</p>
                  <div className="mt-4 text-sm text-[#00D1B2] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more &rarr;
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
