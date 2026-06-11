import { useNavigate } from "react-router-dom";
import { useDashboardStats, useLeaderboard, usePlaqueAlerts } from "../api/hooks";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";
import StatusBadge from "../components/StatusBadge";

const TREND_ICONS: Record<string, { arrow: string; color: string }> = {
  up: { arrow: "↗", color: "#22c55e" },
  stable: { arrow: "→", color: "#f59e0b" },
  down: { arrow: "↘", color: "#ef4444" },
};

export default function Dashboard() {
  const stats = useDashboardStats();
  const leaderboard = useLeaderboard();
  const alerts = usePlaqueAlerts();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      {/* HEADER */}
      <FadeInSection>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-brand text-5xl sm:text-6xl text-[#DCBD6B] tracking-widest">
            COMMAND CENTER
          </h1>
          <span className="flex items-center gap-2 px-3 py-1 border border-[#22c55e]/50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] tracking-widest text-[#22c55e]">SYSTEM LIVE</span>
          </span>
        </div>
        <p className="mt-3 font-serif italic text-xl text-[#F0EADB]/60">
          Monitoraggio globale algoritmo e stato targhe in tempo reale.
        </p>
      </FadeInSection>

      {/* KPI */}
      <div className="mt-12">
        {stats.isLoading && <LoadingSpinner />}
        {stats.isError && <ErrorMessage onRetry={() => stats.refetch()} />}
        {stats.data && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "SCORE MEDIO", value: stats.data.averageFinalScore.toFixed(2), color: "#DCBD6B" },
              { label: "TARGHE ATTIVE", value: String(stats.data.activePlaques), color: "#22c55e" },
              { label: "A RISCHIO", value: String(stats.data.atRiskPlaques), color: "#ef4444" },
              { label: "ISPEZIONI YTD", value: String(stats.data.inspectionsThisYear), color: "#F0EADB" },
            ].map((kpi, i) => (
              <FadeInSection key={kpi.label} delay={i * 100}>
                <div className="bg-[#0a0a0a] border border-[#C9A84C]/20 p-6">
                  <p className="font-brand text-5xl" style={{ color: kpi.color }}>
                    {kpi.value}
                  </p>
                  <p className="mt-2 text-[10px] tracking-widest text-[#F0EADB]/40">{kpi.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        )}
      </div>

      {/* 2 COLONNE */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ALLARMI REVOCA */}
        <FadeInSection>
          <div className="border border-[#f59e0b]/40 bg-[#0a0a0a] p-6 h-full">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M12 3 L22 20 H2 Z" strokeLinejoin="round" />
                <line x1="12" y1="10" x2="12" y2="14" />
                <circle cx="12" cy="17" r="0.5" fill="#f59e0b" />
              </svg>
              <h2 className="font-brand text-2xl text-[#f59e0b] tracking-widest">ALLARMI REVOCA</h2>
            </div>
            <div className="mt-6">
              {alerts.isLoading && <LoadingSpinner />}
              {alerts.isError && <ErrorMessage onRetry={() => alerts.refetch()} />}
              {alerts.data && alerts.data.length === 0 && (
                <p className="text-[#22c55e] text-sm tracking-wide py-8 text-center">
                  Nessun allarme attivo
                </p>
              )}
              {alerts.data && alerts.data.length > 0 && (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-[#C9A84C]/20">
                      <th className="py-2 pr-2">Struttura</th>
                      <th className="py-2 pr-2">Score</th>
                      <th className="py-2 pr-2">Stato</th>
                      <th className="py-2">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A84C]/10">
                    {alerts.data.map((a) => (
                      <tr
                        key={a.id}
                        onClick={() => navigate(`/places/${a.id}`)}
                        className="hover:bg-[#C9A84C]/5 cursor-pointer"
                      >
                        <td className="py-3 pr-2 font-serif">{a.name}</td>
                        <td className="py-3 pr-2 font-brand text-xl text-[#DCBD6B]">
                          {a.finalScore.toFixed(2)}
                        </td>
                        <td className="py-3 pr-2"><StatusBadge status={a.plaqueStatus} /></td>
                        <td className="py-3 text-[#F0EADB]/60">{a.renewalDueAt ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* LEADERBOARD LIVE */}
        <FadeInSection delay={150}>
          <div className="border border-[#C9A84C]/20 bg-[#0a0a0a] p-6 h-full">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#C9A84C" strokeWidth="2">
                <line x1="5" y1="20" x2="5" y2="12" />
                <line x1="12" y1="20" x2="12" y2="6" />
                <line x1="19" y1="20" x2="19" y2="14" />
              </svg>
              <h2 className="font-brand text-2xl text-[#C9A84C] tracking-widest">LEADERBOARD LIVE</h2>
            </div>
            <div className="mt-6">
              {leaderboard.isLoading && <LoadingSpinner />}
              {leaderboard.isError && <ErrorMessage onRetry={() => leaderboard.refetch()} />}
              {leaderboard.data && (
                <ol className="divide-y divide-[#C9A84C]/10">
                  {leaderboard.data.map((entry) => {
                    const trend = TREND_ICONS[entry.trend];
                    return (
                      <li
                        key={entry.placeId}
                        onClick={() => navigate(`/places/${entry.placeId}`)}
                        className="flex items-center gap-4 py-3 px-2 hover:bg-[#C9A84C]/5 cursor-pointer"
                      >
                        <span className="font-brand text-xl text-[#C9A84C] w-8">#{entry.rank}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif truncate">{entry.name}</p>
                          <p className="text-xs text-[#F0EADB]/40">{entry.city}</p>
                        </div>
                        <span className="font-brand text-2xl text-[#DCBD6B]">
                          {entry.finalScore.toFixed(2)}
                        </span>
                        <span className="text-xl" style={{ color: trend.color }}>
                          {trend.arrow}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
