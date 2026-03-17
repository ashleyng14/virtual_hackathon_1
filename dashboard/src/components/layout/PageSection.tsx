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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-10 px-4 sm:py-16 sm:px-6 ${className}`}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </motion.section>
  );
}
