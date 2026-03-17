"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { COLORS } from "@/lib/constants";
import type { YearlyDataPoint } from "@/lib/calculations";

interface DemandCapacityChartProps {
  data: YearlyDataPoint[];
  domain: "ED" | "OR";
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e9ecef] rounded-lg p-3 shadow-sm text-xs">
      <p className="font-semibold text-[#1a1a2e] mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-6 mb-0.5">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="text-[#1a1a2e] font-medium">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="border-t border-[#e9ecef] mt-1.5 pt-1.5 flex justify-between">
          <span className="text-[#9aa0a6]">Gap</span>
          <span className={payload[1].value - payload[0].value >= 0 ? "text-[#059669]" : "text-[#dc2626]"}>
            {(payload[1].value - payload[0].value).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DemandCapacityChart({ data, domain }: DemandCapacityChartProps) {
  const crossoverYear = data.find((d) => d.gap < 0)?.year;

  return (
    <div className="w-full h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`capacityGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.capacityFill} stopOpacity={0.15} />
              <stop offset="100%" stopColor={COLORS.capacityFill} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id={`demandGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.demandLine} stopOpacity={0.1} />
              <stop offset="100%" stopColor={COLORS.demandLine} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#9aa0a6", fontSize: 12 }}
            axisLine={{ stroke: "#e9ecef" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9aa0a6", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) =>
              v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}K`
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="capacity"
            name="Capacity"
            stroke={COLORS.capacityFill}
            fill={`url(#capacityGrad-${domain})`}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="demand"
            name="Demand"
            stroke={COLORS.demandLine}
            fill={`url(#demandGrad-${domain})`}
            strokeWidth={2}
            strokeDasharray="6 3"
          />
          {crossoverYear && (
            <ReferenceLine
              x={crossoverYear}
              stroke={COLORS.rose}
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `Gap opens ${crossoverYear}`,
                fill: COLORS.rose,
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
