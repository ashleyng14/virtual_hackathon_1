"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "The challenge", desc: "Why hospitals need to plan capacity years ahead.", href: "/context" },
  { num: "2", title: "Our approach", desc: "How we collect data and build the model.", href: "/methodology" },
  { num: "3", title: "Dashboard", desc: "Explore projections and adjust assumptions live.", href: "/dashboard" },
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
        <p className="text-sm font-medium text-[#0d9488] mb-3">Workstream 2B</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight leading-tight">
          Healthcare capacity model
        </h1>
        <p className="mt-4 text-lg text-[#5f6368] leading-relaxed">
          Projecting demand and capacity for emergency departments and operating rooms through 2035.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl w-full"
      >
        {steps.map((s) => (
          <Link key={s.num} href={s.href} className="card p-5 group">
            <span className="text-2xl font-bold text-[#e9ecef]">{s.num}</span>
            <h3 className="text-base font-semibold text-[#1a1a2e] mt-2">{s.title}</h3>
            <p className="text-sm text-[#5f6368] mt-1">{s.desc}</p>
            <span className="text-sm text-[#0d9488] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
              View &rarr;
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
