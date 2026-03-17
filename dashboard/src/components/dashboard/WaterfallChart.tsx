"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { COLORS } from "@/lib/constants";

interface WaterfallEntry {
  label: string;
  value: number;
  type: "increase" | "decrease" | "total";
}

interface WaterfallChartProps {
  data: WaterfallEntry[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; value: number; type: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-2.5 shadow-sm text-xs">
      <p className="font-semibold text-[#051C2C]">{d.label}</p>
      <p className={d.value >= 0 ? "text-[#051C2C]" : "text-[#00A9F4]"}>
        {d.value >= 0 ? "+" : ""}{d.value.toLocaleString()}
      </p>
    </div>
  );
}

export default function WaterfallChart({ data }: WaterfallChartProps) {
  let running = 0;
  const chartData = data.map((d) => {
    if (d.type === "total") {
      const result = { ...d, base: 0, height: d.value };
      running = d.value;
      return result;
    }
    const base = running;
    running += d.value;
    return {
      ...d,
      base: d.value >= 0 ? base : base + d.value,
      height: Math.abs(d.value),
    };
  });

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#6B7280", fontSize: 10 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
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
          <ReferenceLine y={0} stroke="#E5E7EB" />
          <Bar dataKey="base" stackId="stack" fill="transparent" />
          <Bar dataKey="height" stackId="stack" radius={[3, 3, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.type === "total"
                    ? COLORS.waterfall.total
                    : entry.type === "increase"
                      ? COLORS.waterfall.increase
                      : COLORS.waterfall.decrease
                }
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
