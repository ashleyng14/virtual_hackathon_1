"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function PageSection({ children, className = "", id }: PageSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-20 px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
