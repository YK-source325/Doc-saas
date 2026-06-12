import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDashboardStats, useLeaderboard } from "../api/hooks";
import { useAuth } from "../context/AuthContext";
import AnimatedCounter from "../components/AnimatedCounter";
import FadeInSection from "../components/FadeInSection";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import LiveTicker from "../components/LiveTicker";
import AlertBand from "../components/AlertBand";

const METHOD_ROWS = [
  { num: "01", weight: "40%", title: "Ispezione Revisore", desc: "Sopralluogo professionale con otto strumenti certificati e protocollo UNI 11312 — la stessa norma dei Mystery Auditor." },
  { num: "02", weight: "30%", title: "Reputazione online", desc: "La media dei punteggi Google e TripAdvisor, normalizzata e verificata, entra nel calcolo." },
  { num: "03", weight: "30%", title: "Voce della community", desc: "Le valutazioni degli utenti registrati aggiornano il punteggio in tempo reale, ogni giorno." },
];

const LEVELS = [
  { num: "I", title: "Base", desc: "Bar, trattorie, ristoranti, pizzerie gourmet, B&B.", note: "Episodi 1–10" },
  { num: "II", title: "Crescita", desc: "Ristoranti di fascia alta, hotel 3–4 stelle, agriturismi.", note: "Episodi 10–25" },
  { num: "III", title: "Premium", desc: "Hotel 5 stelle, ristoranti Michelin, resort, SPA.", note: "Episodi 25+" },
];

// Proiezione economica — visibile solo a developer e partner
const PROJECTION = [
  { year: "2026–27", members: "0 – 20.000", revenue: "5.000 – 25.000 €", result: "Investimento", positive: false },
  { year: "2027–28", members: "20.000 – 80.000", revenue: "40.000 – 100.000 €", result: "+10k / +50k €", positive: true },
  { year: "2028–29", members: "80.000 – 200.000", revenue: "100.000 – 250.000 €", result: "+50k / +170k €", positive: true },
  { year: "2029–30", members: "200.000 – 500.000", revenue: "200.000 – 500.000 €", result: "+120k / +380k €", positive: true },
  { year: "2030–31", members: "500.000+", revenue: "500k – 1M+ €", result: "+380k / +800k €", positive: true },
];

export default function Home() {
  const { user } = useAuth();
  const stats = useDashboardStats();
  const leaderboard = useLeaderboard();
  const navigate = useNavigate();
  const [aiQuestion, setAiQuestion] = useState("");

  // Proiezione visibile solo a developer/partner — non agli utenti pubblici
  const showProjection = user?.role === "developer" || user?.role === "partner";

  return (
    <div>
      <AlertBand />

      {/* HERO EDITORIALE */}
      <section className="hero-glow relative min-h-[92vh] flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full py-20">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-[11px] tracking-[4px] text-[#141414]/50 uppercase">
                Ispezione umana + intelligenza artificiale — monitoraggio live attivo
              </span>
            </div>

            <h1 className="mt-10 font-serif font-semibold text-[#141414] leading-[0.98] text-5xl sm:text-7xl md:text-[92px] max-w-4xl">
              L'eccellenza
              <br />
              non si dichiara.
              <br />
              <em className="italic font-medium text-[#A8842C]">Si verifica.</em>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg text-[#141414]/55 leading-relaxed">
              Ispezioni professionali con metodologia UNI 11312, un'assistente intelligente — Yara —
              che vigila sui punteggi in tempo reale, e una targa che vale solo finché il punteggio la
              difende.
            </p>

            {/* Barra AI in prima vista */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = aiQuestion.trim();
                window.dispatchEvent(new CustomEvent("revisore-ask", { detail: value }));
                setAiQuestion("");
              }}
              className="mt-8 flex max-w-xl border border-black/20 bg-white focus-within:border-[#A8842C] transition-colors"
            >
              <span className="pl-4 pr-2 self-center">
                <span className="px-1.5 py-0.5 border border-[#A8842C] text-[#A8842C] text-[9px] font-bold tracking-[2px]">
                  AI
                </span>
              </span>
              <input
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Chiedi a Yara: qual è la migliore struttura di Napoli?"
                className="flex-1 bg-transparent px-2 py-4 text-sm text-[#141414] placeholder:text-[#141414]/35 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 text-[10px] font-bold uppercase tracking-[2px] text-white bg-[#A8842C] hover:bg-[#141414] transition-colors"
              >
                Chiedi
              </button>
            </form>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                to="/strutture"
                className="px-8 py-4 bg-[#141414] text-white text-xs font-bold uppercase tracking-[3px] hover:bg-[#A8842C] transition-colors"
              >
                Esplora le Strutture
              </Link>
              <Link
                to="/trailer"
                className="group flex items-center gap-3 text-xs uppercase tracking-[3px] text-[#141414]/70 hover:text-[#141414] transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-black/20 group-hover:border-[#A8842C] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5" fill="currentColor">
                    <path d="M7 5 L19 12 L7 19 Z" />
                  </svg>
                </span>
                Guarda il trailer
              </Link>
            </div>

            {/* KPI con filetti */}
            <div className="mt-16 grid grid-cols-3 max-w-2xl">
              {[
                { value: stats.data?.totalInspected ?? 0, decimals: 0, label: "Strutture ispezionate", color: "text-[#141414]" },
                { value: stats.data?.activePlaques ?? 0, decimals: 0, label: "Targhe attive", color: "text-[#22c55e]" },
                { value: stats.data?.averageFinalScore ?? 0, decimals: 2, label: "Punteggio medio", color: "text-[#A8842C]" },
              ].map((kpi) => (
                <div key={kpi.label} className="border-l border-black/15 pl-5 pr-4">
                  <p className={`font-brand text-4xl sm:text-5xl ${kpi.color}`}>
                    {stats.data ? <AnimatedCounter value={kpi.value} decimals={kpi.decimals} /> : "—"}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[2px] text-[#141414]/40">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker live */}
        <LiveTicker />
      </section>

      {/* IL METODO */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <FadeInSection className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[4px] text-[#A8842C]">Il metodo</p>
            <h2 className="mt-4 font-serif font-semibold text-4xl sm:text-5xl text-[#141414] leading-tight">
              Un punteggio,
              <br />
              tre fonti
              <br />
              indipendenti.
            </h2>
            <p className="mt-6 font-serif italic text-lg text-[#141414]/50 leading-relaxed">
              Nessuna fonte può comprare il risultato: se una manca, i pesi si ricalibrano da soli.
            </p>
          </FadeInSection>

          <div className="lg:col-span-8">
            {METHOD_ROWS.map((row, i) => (
              <FadeInSection key={row.num} delay={i * 120}>
                <div className="group grid grid-cols-12 gap-4 items-baseline py-8 border-t border-black/10 last:border-b hover:bg-black/[0.03] transition-colors px-2">
                  <span className="col-span-2 sm:col-span-1 text-[11px] tracking-[2px] text-[#141414]/30">
                    {row.num}
                  </span>
                  <span className="col-span-10 sm:col-span-3 font-brand text-5xl sm:text-6xl text-[#A8842C]">
                    {row.weight}
                  </span>
                  <div className="col-span-12 sm:col-span-8">
                    <h3 className="font-serif font-semibold text-2xl text-[#141414]">{row.title}</h3>
                    <p className="mt-2 text-sm text-[#141414]/50 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TOP ECCELLENZE */}
      <section className="py-28 px-6 bg-white border-y border-black/10">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[4px] text-[#A8842C]">
                  Classifica in tempo reale
                </p>
                <h2 className="mt-4 font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
                  Le eccellenze di oggi
                </h2>
              </div>
              <Link
                to="/dashboard"
                className="text-[11px] uppercase tracking-[3px] text-[#141414]/60 hover:text-[#A8842C] transition-colors border-b border-black/20 hover:border-[#A8842C] pb-1"
              >
                Classifica completa
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-12">
            {leaderboard.isLoading && <LoadingSpinner />}
            {leaderboard.isError && <ErrorMessage onRetry={() => leaderboard.refetch()} />}
            {leaderboard.data && (
              <div>
                {leaderboard.data.slice(0, 5).map((entry) => (
                  <button
                    key={entry.placeId}
                    onClick={() => navigate(`/places/${entry.placeId}`)}
                    className="w-full grid grid-cols-12 items-center gap-4 py-6 border-t border-black/10 last:border-b text-left hover:bg-black/[0.03] transition-colors px-2"
                  >
                    <span className="col-span-2 sm:col-span-1 font-serif italic text-2xl text-[#141414]/30">
                      {entry.rank.toString().padStart(2, "0")}
                    </span>
                    <div className="col-span-10 sm:col-span-6">
                      <p className="font-serif font-semibold text-xl sm:text-2xl text-[#141414]">
                        {entry.name}
                      </p>
                      <p className="text-[11px] uppercase tracking-[2px] text-[#141414]/40 mt-1">
                        {entry.city}
                      </p>
                    </div>
                    <span className="col-span-6 sm:col-span-3 hidden sm:block">
                      <StatusBadge status={entry.plaqueStatus} />
                    </span>
                    <span className="col-span-12 sm:col-span-2 font-brand text-4xl text-[#A8842C] sm:text-right">
                      {entry.finalScore.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* I 3 LIVELLI */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <p className="text-[11px] uppercase tracking-[4px] text-[#A8842C]">Il percorso</p>
            <h2 className="mt-4 font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
              Tre livelli di struttura
            </h2>
          </FadeInSection>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3">
            {LEVELS.map((level, i) => (
              <FadeInSection key={level.num} delay={i * 120}>
                <div className="border-t md:border-t-0 md:border-l border-black/10 md:first:border-l-0 px-0 md:px-10 py-8 md:py-2 h-full">
                  <span className="font-serif italic text-6xl text-[#A8842C]/40">{level.num}</span>
                  <h3 className="mt-4 font-serif font-semibold text-2xl text-[#141414]">{level.title}</h3>
                  <p className="mt-3 text-sm text-[#141414]/50 leading-relaxed">{level.desc}</p>
                  <p className="mt-4 text-[10px] uppercase tracking-[2px] text-[#141414]/30">
                    {level.note}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROIEZIONE ECONOMICA — solo developer e partner */}
      {showProjection && (
        <section className="py-28 px-6 bg-white border-t border-black/10">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[11px] uppercase tracking-[4px] text-[#A8842C]">La visione</p>
                <span className="px-2 py-0.5 border border-[#A8842C]/40 text-[9px] tracking-[2px] uppercase text-[#A8842C]/70">
                  {user?.role === "developer" ? "Sviluppatore" : "Partner"}
                </span>
              </div>
              <h2 className="mt-2 font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
                Cinque anni di crescita
              </h2>
            </FadeInSection>
            <FadeInSection className="mt-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[2px] text-[#141414]/35 border-b border-black/15">
                      <th className="py-4 pr-4 font-medium">Anno</th>
                      <th className="py-4 pr-4 font-medium">Iscritti</th>
                      <th className="py-4 pr-4 font-medium">Ricavi annui</th>
                      <th className="py-4 font-medium">Risultato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECTION.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-black/10 hover:bg-black/[0.03] transition-colors"
                      >
                        <td className="py-5 pr-4 font-serif font-semibold text-xl text-[#141414]">
                          {row.year}
                        </td>
                        <td className="py-5 pr-4 text-sm text-[#141414]/60">{row.members}</td>
                        <td className="py-5 pr-4 text-sm text-[#141414]/60">{row.revenue}</td>
                        <td className={`py-5 text-sm font-semibold ${row.positive ? "text-[#22c55e]" : "text-[#141414]/50"}`}>
                          {row.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInSection>

            <FadeInSection className="mt-20 text-center">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#141414]/70 max-w-2xl mx-auto leading-relaxed">
                «La fiducia non si compra con le stelle.
                <br />
                Si conquista con le verifiche.»
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[3px] text-[#A8842C]">
                REVISORE — Certificazione Ospitalità Italiana
              </p>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* CITAZIONE per utenti pubblici (sostituisce la sezione proiezione) */}
      {!showProjection && (
        <section className="py-20 px-6 bg-white border-t border-black/10">
          <FadeInSection className="max-w-2xl mx-auto text-center">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#141414]/70 leading-relaxed">
              «La fiducia non si compra con le stelle.
              <br />
              Si conquista con le verifiche.»
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[3px] text-[#A8842C]">
              REVISORE — Certificazione Ospitalità Italiana
            </p>
          </FadeInSection>
        </section>
      )}
    </div>
  );
}
