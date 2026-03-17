interface RagBadgeProps {
  gap: number;
  thresholds?: { amber: number; red: number };
}

export default function RagBadge({ gap, thresholds = { amber: 0, red: -10000 } }: RagBadgeProps) {
  const color = gap >= thresholds.amber
    ? { bg: "#ecfdf5", text: "#059669", label: "On track" }
    : gap >= thresholds.red
      ? { bg: "#fffbeb", text: "#d97706", label: "At risk" }
      : { bg: "#fef2f2", text: "#dc2626", label: "Critical" };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
      {color.label}
    </span>
  );
}
