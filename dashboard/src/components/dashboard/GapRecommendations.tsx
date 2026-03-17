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

const urgencyColors = {
  high: { bg: "#fef2f2", text: "#dc2626", badge: "bg-[#fef2f2] text-[#dc2626]" },
  medium: { bg: "#fffbeb", text: "#d97706", badge: "bg-[#fffbeb] text-[#d97706]" },
  low: { bg: "#ecfdf5", text: "#059669", badge: "bg-[#ecfdf5] text-[#059669]" },
};

export default function GapRecommendations({ gap2035, recommendations, domain }: GapRecommendationsProps) {
  const isDeficit = gap2035 < 0;
  const unit = domain === "ED" ? "visits" : "cases";

  return (
    <div
      className="card p-5"
      style={{ borderLeft: `3px solid ${isDeficit ? "#dc2626" : "#059669"}` }}
    >
      <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1">
        {isDeficit
          ? `Projected shortfall: ${Math.abs(gap2035).toLocaleString()} ${unit} by 2035`
          : `Capacity is sufficient through 2035`}
      </h3>
      <p className="text-xs text-[#9aa0a6] mb-4">{domain} analysis — recommended actions</p>

      <div className="space-y-2.5">
        {recommendations.map((rec) => {
          const c = urgencyColors[rec.urgency];
          return (
            <div key={rec.timeframe} className="p-3 rounded-lg" style={{ backgroundColor: c.bg }}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${c.badge}`}>
                  {rec.urgency}
                </span>
                <span className="text-xs font-medium text-[#1a1a2e]">{rec.timeframe}</span>
              </div>
              <p className="text-xs text-[#5f6368]">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
