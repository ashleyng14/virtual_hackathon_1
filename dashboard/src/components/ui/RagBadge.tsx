interface RagBadgeProps {
  gap: number;
  thresholds?: { amber: number; red: number };
}

export default function RagBadge({ gap, thresholds = { amber: 0, red: -10000 } }: RagBadgeProps) {
  const color = gap >= thresholds.amber
    ? { bg: "rgba(16, 185, 129, 0.15)", text: "#10B981", label: "On Track" }
    : gap >= thresholds.red
      ? { bg: "rgba(245, 158, 11, 0.15)", text: "#F59E0B", label: "At Risk" }
      : { bg: "rgba(239, 68, 68, 0.15)", text: "#EF4444", label: "Critical" };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
      {color.label}
    </span>
  );
}
