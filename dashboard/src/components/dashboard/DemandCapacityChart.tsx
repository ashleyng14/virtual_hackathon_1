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
    <div className="glass p-4 !rounded-xl text-xs min-w-[180px]">
      <p className="text-[#f0f0f5] font-semibold mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-4 mb-1">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="text-[#f0f0f5] font-medium">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="border-t border-[rgba(255,255,255,0.1)] mt-2 pt-2 flex justify-between">
          <span className="text-[#9ca3af]">Gap</span>
          <span className={payload[1].value - payload[0].value >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>
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
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`capacityGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.capacityFill} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.capacityFill} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id={`demandGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.demandLine} stopOpacity={0.2} />
              <stop offset="100%" stopColor={COLORS.demandLine} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
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
