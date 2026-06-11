import { useNavigate } from "react-router-dom";
import { useLeaderboard } from "../api/hooks";

// Striscia a scorrimento continuo con i punteggi live — il battito della piattaforma.
export default function LiveTicker() {
  const leaderboard = useLeaderboard();
  const navigate = useNavigate();
  if (!leaderboard.data || leaderboard.data.length === 0) return null;

  const items = leaderboard.data;
  const strip = [...items, ...items]; // duplicata per il loop continuo

  return (
    <div className="border-y border-white/10 bg-[#0A0A0A]/60 overflow-hidden">
      <div className="marquee-track py-3">
        {strip.map((entry, i) => (
          <button
            key={`${entry.placeId}-${i}`}
            onClick={() => navigate(`/places/${entry.placeId}`)}
            className="flex items-baseline gap-3 px-8 whitespace-nowrap group"
          >
            <span className="text-[10px] tracking-[2px] text-[#C9A84C]">LIVE</span>
            <span className="font-serif text-base text-[#F0EADB]/80 group-hover:text-white transition-colors">
              {entry.name}
            </span>
            <span className="font-brand text-lg text-white">{entry.finalScore.toFixed(2)}</span>
            <span
              className="text-sm"
              style={{ color: entry.trend === "up" ? "#22c55e" : entry.trend === "stable" ? "#f59e0b" : "#ef4444" }}
            >
              {entry.trend === "up" ? "↗" : entry.trend === "stable" ? "→" : "↘"}
            </span>
            <span className="text-white/15 pl-8">·</span>
          </button>
        ))}
      </div>
    </div>
  );
}
