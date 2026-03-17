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
  high: { bg: "#FEF2F2", text: "#DC2626", badge: "bg-[#FEF2F2] text-[#DC2626]" },
  medium: { bg: "#FFFBEB", text: "#D97706", badge: "bg-[#FFFBEB] text-[#D97706]" },
  low: { bg: "#ECFDF5", text: "#059669", badge: "bg-[#ECFDF5] text-[#059669]" },
};

export default function GapRecommendations({ gap2035, recommendations, domain }: GapRecommendationsProps) {
  const isDeficit = gap2035 < 0;
  const unit = domain === "ED" ? "visits" : "cases";

  return (
    <div
      className="card p-5"
      style={{ borderLeft: `3px solid ${isDeficit ? "#DC2626" : "#059669"}` }}
    >
      <h3 className="text-sm font-semibold text-[#051C2C] mb-1">
        {isDeficit
          ? `Projected shortfall: ${Math.abs(gap2035).toLocaleString()} ${unit} by 2035`
          : `Capacity is sufficient through 2035`}
      </h3>
      <p className="text-xs text-[#6B7280] mb-4">{domain} analysis — recommended actions</p>

      <div className="space-y-2.5">
        {recommendations.map((rec) => {
          const c = urgencyColors[rec.urgency];
          return (
            <div key={rec.timeframe} className="p-3 rounded-lg" style={{ backgroundColor: c.bg }}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${c.badge}`}>
                  {rec.urgency}
                </span>
                <span className="text-xs font-medium text-[#051C2C]">{rec.timeframe}</span>
              </div>
              <p className="text-xs text-[#374151]">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
