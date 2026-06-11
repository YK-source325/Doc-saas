import { useNavigate } from "react-router-dom";
import { usePlaqueAlerts } from "../api/hooks";

// Banda di allerta: il sito segnala da solo le emergenze qualità in corso.
export default function AlertBand() {
  const alerts = usePlaqueAlerts();
  const navigate = useNavigate();
  if (!alerts.data || alerts.data.length === 0) return null;

  const worst = alerts.data[0];
  const isRisk = worst.plaqueStatus === "at_risk";
  const color = isRisk ? "#ef4444" : "#f59e0b";

  return (
    <button
      onClick={() => navigate(`/places/${worst.id}`)}
      className="w-full text-left"
      style={{ backgroundColor: isRisk ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-2 shrink-0">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color }}>
            {isRisk ? "Emergenza qualità" : "Sorveglianza attiva"}
          </span>
        </span>
        <span className="text-sm text-[#141414]/70">
          <span className="font-serif font-semibold text-[#141414]">{worst.name}</span>
          {" "}({worst.city}) è scesa a <span className="font-bold" style={{ color }}>{worst.finalScore.toFixed(2)}</span>
          {isRisk ? " — targa a rischio revoca." : " — targa sotto osservazione."}
          {alerts.data.length > 1 && ` Altre ${alerts.data.length - 1} strutture monitorate.`}
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-[2px] text-[#141414]/40 shrink-0">
          Vedi il caso →
        </span>
      </div>
    </button>
  );
}
