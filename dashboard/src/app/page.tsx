"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "The challenge", desc: "Why hospitals need to plan capacity years ahead.", href: "/context" },
  { num: "2", title: "Our approach", desc: "How we collect data and build the model.", href: "/methodology" },
  { num: "3", title: "Data breakdown", desc: "Per-bay throughput, site capacity, and expansion plans.", href: "/data" },
  { num: "4", title: "Dashboard", desc: "Explore projections and adjust assumptions live.", href: "/dashboard" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <p className="text-sm font-medium text-[#2251FF] mb-3">Workstream 2B</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#051C2C] tracking-tight leading-tight">
          Healthcare capacity model
        </h1>
        <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
          Projecting demand and capacity for emergency departments and operating rooms through 2035.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl w-full"
      >
        {steps.map((s) => (
          <Link key={s.num} href={s.href} className="card p-5 group">
            <span className="text-2xl font-bold text-[#E5E7EB]">{s.num}</span>
            <h3 className="text-base font-semibold text-[#051C2C] mt-2">{s.title}</h3>
            <p className="text-sm text-[#6B7280] mt-1">{s.desc}</p>
            <span className="text-sm text-[#2251FF] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
              View &rarr;
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
