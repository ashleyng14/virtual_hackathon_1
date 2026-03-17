import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare capacity model | ED & OR",
  description: "Interactive capacity planning for Emergency Departments and Operating Rooms",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Navbar />
        <main className="pt-14 relative">{children}</main>
      </body>
    </html>
  );
}
