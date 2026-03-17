"use client";

interface Recommendation {
  timeframe: string;
  action: string;
  urgency: "high" | "medium" | "low";
}

interface GapRecommendationsProps {
  gap2035: number;
  recommendations: Recommendation[];
  domain: "ED" | "OR";
}

const urgencyStyles = {
  high: { border: "#EF4444", bg: "rgba(239,68,68,0.06)", badge: "bg-[rgba(239,68,68,0.15)] text-[#EF4444]" },
  medium: { border: "#F59E0B", bg: "rgba(245,158,11,0.06)", badge: "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]" },
  low: { border: "#10B981", bg: "rgba(16,185,129,0.06)", badge: "bg-[rgba(16,185,129,0.15)] text-[#10B981]" },
};

export default function GapRecommendations({ gap2035, recommendations, domain }: GapRecommendationsProps) {
  const isDeficit = gap2035 < 0;
  const borderColor = isDeficit ? "#EF4444" : "#10B981";
  const unit = domain === "ED" ? "visits" : "cases";

  return (
    <div
      className="glass p-6"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${borderColor}15` }}>
          {isDeficit ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={borderColor} strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={borderColor} strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#f0f0f5]">
            {isDeficit
              ? `Projected Gap: ${Math.abs(gap2035).toLocaleString()} ${unit} shortfall by 2035`
              : `Capacity is sufficient through 2035`}
          </h3>
          <p className="text-xs text-[#9ca3af]">{domain} Analysis -- Recommended Actions</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const style = urgencyStyles[rec.urgency];
          return (
            <div
              key={rec.timeframe}
              className="p-4 rounded-xl"
              style={{ backgroundColor: style.bg }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                  {rec.urgency.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-[#f0f0f5]">{rec.timeframe}</span>
              </div>
              <p className="text-sm text-[#9ca3af]">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
