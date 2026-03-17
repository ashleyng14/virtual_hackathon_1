interface RagBadgeProps {
  gap: number;
  demand: number;
}

export default function RagBadge({ gap, demand }: RagBadgeProps) {
  const gapPct = demand > 0 ? gap / demand : 0;

  // Thresholds based on gap as percentage of projected demand:
  //   ≥ 0%       → On track (green)
  //   0% to −15% → Moderate gap (amber) — manageable with operational levers
  //   −15% to −30% → Significant gap (orange) — requires expansion acceleration
  //   < −30%     → Critical gap (red) — structural intervention needed
  const color =
    gapPct >= 0
      ? { bg: "#ECFDF5", text: "#059669", label: "On track" }
      : gapPct >= -0.15
        ? { bg: "#FFFBEB", text: "#D97706", label: "Moderate gap" }
        : gapPct >= -0.30
          ? { bg: "#FFF7ED", text: "#EA580C", label: "Significant gap" }
          : { bg: "#FEF2F2", text: "#DC2626", label: "Critical gap" };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
      {color.label}
      <span className="text-[10px] opacity-70">
        ({demand > 0 ? `${(gapPct * 100).toFixed(0)}%` : "—"})
      </span>
    </span>
  );
}
