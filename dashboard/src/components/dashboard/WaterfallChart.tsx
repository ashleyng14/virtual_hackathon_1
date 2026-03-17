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
    <div className="glass p-3 !rounded-xl text-xs">
      <p className="text-[#f0f0f5] font-semibold">{d.label}</p>
      <p className={d.value >= 0 ? "text-[#3B82F6]" : "text-[#00D1B2]"}>
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
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
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
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
          <Bar dataKey="base" stackId="stack" fill="transparent" />
          <Bar dataKey="height" stackId="stack" radius={[4, 4, 0, 0]}>
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
