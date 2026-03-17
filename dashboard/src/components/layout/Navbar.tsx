"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="w-7 h-7 rounded-lg bg-[#2251FF] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#111] truncate">
            Healthcare capacity model
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "text-[#2251FF] font-medium bg-[#EEF1FF]"
                    : "text-[#6B7280] hover:text-[#111] hover:bg-[#F9FAFB]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 pb-3 pt-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "text-[#2251FF] font-medium bg-[#EEF1FF]"
                    : "text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
