import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare Capacity Model | ED & Operating Rooms",
  description: "Interactive capacity planning dashboard for Emergency Departments and Operating Rooms",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <div className="radial-glow bg-[#00D1B2] top-[-200px] left-[-200px]" />
        <div className="radial-glow bg-[#3B82F6] bottom-[-200px] right-[-200px]" />
        <Navbar />
        <main className="pt-16 relative z-10">{children}</main>
      </body>
    </html>
  );
}
