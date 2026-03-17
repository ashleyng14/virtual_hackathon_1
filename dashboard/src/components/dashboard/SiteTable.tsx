"use client";

import RagBadge from "@/components/ui/RagBadge";
import type { SiteYearlyData } from "@/lib/calculations";

interface SiteTableProps {
  data: SiteYearlyData[];
  unit: string;
}

export default function SiteTable({ data, unit }: SiteTableProps) {
  const rows = data.map((site) => {
    const d2025 = site.data.find((d) => d.year === 2025);
    const d2035 = site.data.find((d) => d.year === 2035);
    return {
      site: site.site,
      demand2025: d2025?.demand ?? 0,
      demand2035: d2035?.demand ?? 0,
      capacity2035: d2035?.capacity ?? 0,
      gap: d2035?.gap ?? 0,
      growthPct: d2025 && d2025.demand > 0
        ? ((((d2035?.demand ?? 0) - d2025.demand) / d2025.demand) * 100)
        : 0,
    };
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)]">
            <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Site</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Demand 2025</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Demand 2035</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Growth</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Capacity 2035</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Gap ({unit})</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.site} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <td className="py-3 px-4 font-medium text-[#f0f0f5]">{row.site}</td>
              <td className="py-3 px-4 text-right text-[#9ca3af]">{row.demand2025.toLocaleString()}</td>
              <td className="py-3 px-4 text-right text-[#f0f0f5]">{row.demand2035.toLocaleString()}</td>
              <td className="py-3 px-4 text-right text-[#9ca3af]">{row.growthPct >= 0 ? "+" : ""}{row.growthPct.toFixed(1)}%</td>
              <td className="py-3 px-4 text-right text-[#f0f0f5]">{row.capacity2035.toLocaleString()}</td>
              <td className={`py-3 px-4 text-right font-semibold ${row.gap >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {row.gap >= 0 ? "+" : ""}{row.gap.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-center">
                <RagBadge gap={row.gap} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
