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
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-sm text-xs">
      <p className="font-semibold text-[#051C2C] mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-6 mb-0.5">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="text-[#111] font-medium">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="border-t border-[#E5E7EB] mt-1.5 pt-1.5 flex justify-between">
          <span className="text-[#6B7280]">Gap</span>
          <span className={payload[1].value - payload[0].value >= 0 ? "text-[#059669]" : "text-[#DC2626]"}>
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
              <stop offset="0%" stopColor={COLORS.capacityFill} stopOpacity={0.18} />
              <stop offset="100%" stopColor={COLORS.capacityFill} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id={`demandGrad-${domain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.demandLine} stopOpacity={0.08} />
              <stop offset="100%" stopColor={COLORS.demandLine} stopOpacity={0.01} />
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
              stroke={COLORS.red}
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `Gap opens ${crossoverYear}`,
                fill: COLORS.red,
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
