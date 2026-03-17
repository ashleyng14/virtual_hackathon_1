"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { COLORS } from "@/lib/constants";
import type { YearlyDataPoint } from "@/lib/calculations";

interface DemandCapacityChartProps {
  data: YearlyDataPoint[];
  domain: "ED" | "OR";
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const demand = payload.find((p) => p.name === "Demand")?.value ?? 0;
  const capacity = payload.find((p) => p.name === "Capacity")?.value ?? 0;
  const gap = capacity - demand;
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-sm text-xs">
      <p className="font-semibold text-[#051C2C] mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-6 mb-0.5">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="text-[#111] font-medium">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
      <div className="border-t border-[#E5E7EB] mt-1.5 pt-1.5 flex justify-between">
        <span className="text-[#6B7280]">Gap</span>
        <span className={gap >= 0 ? "text-[#059669]" : "text-[#DC2626]"}>
          {gap.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function DemandCapacityChart({ data, domain }: DemandCapacityChartProps) {
  const crossoverYear = data.find((d) => d.gap < 0)?.year;
  const cap2025 = data.find((d) => d.year === 2025)?.capacity ?? 0;
  const cap2031 = data.find((d) => d.year === 2031)?.capacity ?? 0;
  const expansionDelta = cap2031 - cap2025;
  const hasExpansion = expansionDelta > 1000;

  return (
    <div>
      <div className="w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`capacityGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.capacityFill} stopOpacity={0.18} />
                <stop offset="100%" stopColor={COLORS.capacityFill} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}K`
              }
            />
            <Tooltip content={<CustomTooltip />} />

            {hasExpansion && (
              <ReferenceArea
                x1={2029}
                x2={2031}
                fill="#00A9F4"
                fillOpacity={0.06}
                stroke="#00A9F4"
                strokeOpacity={0.2}
                strokeDasharray="4 4"
                label={{
                  value: "Expansion phase",
                  position: "insideTop",
                  fill: "#00A9F4",
                  fontSize: 10,
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="capacity"
              name="Capacity"
              stroke={COLORS.capacityFill}
              fill={`url(#capacityGrad-${domain})`}
              strokeWidth={2.5}
            />
            <Line
              type="monotone"
              dataKey="demand"
              name="Demand"
              stroke={COLORS.demandLine}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
            />

            {crossoverYear && (
              <ReferenceLine
                x={crossoverYear}
                stroke={COLORS.red}
                strokeDasharray="4 4"
                strokeWidth={1}
                label={{
                  value: `Gap opens ${crossoverYear}`,
                  fill: COLORS.red,
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {hasExpansion && (
        <div className="flex items-center gap-4 mt-3 px-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-[#00A9F4]" />
            <span className="text-[#374151]">Capacity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-[#051C2C]" style={{ borderTop: "2px dashed #051C2C" }} />
            <span className="text-[#374151]">Demand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#00A9F4] opacity-10 border border-[#00A9F4] border-dashed" />
            <span className="text-[#374151]">
              Expansion 2029–31: +{(expansionDelta / 1000).toFixed(1)}K {domain === "ED" ? "visits" : "cases"} capacity
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
