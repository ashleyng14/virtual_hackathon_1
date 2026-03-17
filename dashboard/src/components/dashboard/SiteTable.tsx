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
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-2.5 px-3 text-xs font-medium text-[#6B7280]">Site</th>
            <th className="text-right py-2.5 px-3 text-xs font-medium text-[#6B7280]">Demand 2035</th>
            <th className="text-right py-2.5 px-3 text-xs font-medium text-[#6B7280]">Capacity 2035</th>
            <th className="text-right py-2.5 px-3 text-xs font-medium text-[#6B7280]">Gap ({unit})</th>
            <th className="text-center py-2.5 px-3 text-xs font-medium text-[#6B7280]">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.site} className="border-b border-[#F3F4F6]">
              <td className="py-2.5 px-3 font-medium text-[#051C2C]">{row.site}</td>
              <td className="py-2.5 px-3 text-right text-[#374151]">{row.demand2035.toLocaleString()}</td>
              <td className="py-2.5 px-3 text-right text-[#374151]">{row.capacity2035.toLocaleString()}</td>
              <td className={`py-2.5 px-3 text-right font-semibold ${row.gap >= 0 ? "text-[#059669]" : "text-[#DC2626]"}`}>
                {row.gap >= 0 ? "+" : ""}{row.gap.toLocaleString()}
              </td>
              <td className="py-2.5 px-3 text-center">
                <RagBadge gap={row.gap} demand={row.demand2035} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
