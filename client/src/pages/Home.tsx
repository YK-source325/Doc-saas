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
  { num: "01", weight: "40%", title: "Ispezione Revisore", desc: "Sopralluogo professionale con otto strumenti certificati e protocollo UNI 11312 — la stessa norma dei Mystery Auditor europei." },
  { num: "02", weight: "30%", title: "Reputazione online", desc: "La media ponderata di Google e TripAdvisor, normalizzata e verificata, entra nel calcolo." },
  { num: "03", weight: "30%", title: "Voce della community", desc: "Le valutazioni degli utenti registrati aggiornano il punteggio in tempo reale, ogni giorno." },
];

const LEVELS = [
  { num: "I", title: "Base", desc: "Bar, trattorie, ristoranti, pizzerie gourmet, B&B.", note: "Episodi 1–10" },
  { num: "II", title: "Crescita", desc: "Ristoranti di fascia alta, hotel 3–4 stelle, agriturismi.", note: "Episodi 10–25" },
  { num: "III", title: "Premium", desc: "Hotel 5 stelle, ristoranti Michelin, resort, SPA.", note: "Episodi 25+" },
];

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

  const showProjection = user?.role === "developer" || user?.role === "partner";

  return (
    <div>
      <AlertBand />

      {/* HERO ISTITUZIONALE */}
      <section className="relative min-h-[90vh] sm:min-h-[94vh] flex flex-col bg-[#FAF8F4]">
        {/* Sfondo decorativo — griglia sottile */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,132,44,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,132,44,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="flex-1 flex items-center relative z-10">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full py-20 sm:py-24">
            {/* Etichetta istituzionale */}
            <div className="flex items-center gap-3 mb-10 sm:mb-12">
              <div className="h-px w-8 bg-[#A8842C]" />
              <span className="text-[9px] sm:text-[10px] tracking-[3.5px] text-[#141414]/40 uppercase">
                Certificazione Ospitalità Italiana · Metodologia UNI 11312
              </span>
            </div>

            {/* Headline principale */}
            <h1 className="font-serif font-semibold text-[#141414] leading-[0.93] text-[44px] sm:text-[72px] md:text-[96px] lg:text-[108px] max-w-5xl">
              L'eccellenza
              <br />
              non si dichiara.
              <br />
              <em className="italic font-medium text-[#A8842C]">Si verifica.</em>
            </h1>

            {/* Sottotitolo */}
            <p className="mt-7 sm:mt-9 max-w-lg text-[14px] sm:text-[16px] text-[#141414]/50 leading-[1.7]">
              Ispezioni in incognito con otto strumenti certificati, un'intelligenza artificiale
              che monitora ogni punteggio in tempo reale, e una targa che vale solo finché il
              risultato la difende.
            </p>

            {/* Barra AI */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = aiQuestion.trim();
                window.dispatchEvent(new CustomEvent("revisore-ask", { detail: value }));
                setAiQuestion("");
              }}
              className="mt-8 sm:mt-9 flex max-w-lg border border-black/15 bg-white focus-within:border-[#A8842C] transition-colors shadow-sm"
            >
              <span className="pl-4 pr-3 self-center shrink-0">
                <span className="px-[7px] py-[3px] border border-[#A8842C] text-[#A8842C] text-[8px] font-bold tracking-[2px] leading-none">
                  AI
                </span>
              </span>
              <input
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Chiedi a Vera — la tua assistente REVISORE"
                className="flex-1 bg-transparent px-1 py-3.5 sm:py-4 text-[13px] text-[#141414] placeholder:text-[#141414]/30 focus:outline-none"
                style={{ fontSize: "16px" }}
              />
              <button
                type="submit"
                className="px-5 text-[9px] font-bold uppercase tracking-[2px] text-white bg-[#A8842C] hover:bg-[#141414] active:bg-[#141414] transition-colors touch-manipulation shrink-0"
              >
                Chiedi
              </button>
            </form>

            {/* CTA */}
            <div className="mt-9 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                to="/strutture"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#141414] text-white text-[9px] font-bold uppercase tracking-[3px] hover:bg-[#A8842C] active:bg-[#A8842C] transition-colors touch-manipulation"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Esplora le Strutture
              </Link>
              <Link
                to="/trailer"
                className="group flex items-center gap-3 text-[9px] uppercase tracking-[3px] text-[#141414]/50 hover:text-[#141414] transition-colors py-2 touch-manipulation"
              >
                <span className="w-9 h-9 rounded-full border border-black/20 group-hover:border-[#A8842C] group-hover:bg-[#A8842C]/5 flex items-center justify-center transition-all shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 ml-0.5" fill="currentColor">
                    <path d="M7 5 L19 12 L7 19 Z" />
                  </svg>
                </span>
                Guarda il trailer
              </Link>
            </div>

            {/* KPI */}
            <div className="mt-14 sm:mt-16 flex gap-10 sm:gap-16 max-w-sm sm:max-w-2xl border-t border-black/10 pt-10">
              {[
                { value: stats.data?.totalInspected ?? 0, decimals: 0, label: "Strutture ispezionate", color: "text-[#141414]" },
                { value: stats.data?.activePlaques ?? 0, decimals: 0, label: "Targhe attive", color: "text-[#22c55e]" },
                { value: stats.data?.averageFinalScore ?? 0, decimals: 2, label: "Score medio", color: "text-[#A8842C]" },
              ].map((kpi) => (
                <div key={kpi.label}>
                  <p className={`font-brand text-[36px] sm:text-[52px] leading-none ${kpi.color}`}>
                    {stats.data ? <AnimatedCounter value={kpi.value} decimals={kpi.decimals} /> : "—"}
                  </p>
                  <p className="mt-2 text-[8px] sm:text-[9px] uppercase tracking-[2.5px] text-[#141414]/35 leading-tight">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <LiveTicker />
      </section>

      {/* DICHIARAZIONE — banda nera */}
      <section className="bg-[#141414] py-16 sm:py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
          <p className="font-serif italic text-white/70 text-2xl sm:text-3xl md:text-4xl leading-relaxed max-w-2xl">
            «C'è chi lo sa.<br />
            C'è chi lo nasconde.<br />
            <span className="text-white not-italic font-semibold">Noi lo mostriamo.</span>»
          </p>
          <div className="shrink-0 text-right">
            <p className="text-[9px] uppercase tracking-[3px] text-white/30">Lo Slogan</p>
            <p className="mt-1 text-[9px] uppercase tracking-[3px] text-[#A8842C]">REVISORE — dal 2026</p>
          </div>
        </div>
      </section>

      {/* IL METODO */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <FadeInSection className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-[#A8842C]" />
              <p className="text-[9px] uppercase tracking-[3.5px] text-[#A8842C]">Il metodo</p>
            </div>
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414] leading-tight">
              Un punteggio,
              <br />
              tre fonti
              <br />
              indipendenti.
            </h2>
            <p className="mt-6 font-serif italic text-[15px] text-[#141414]/45 leading-relaxed">
              Nessuna fonte può comprare il risultato: se una manca, i pesi si ricalibrano automaticamente.
            </p>
            <Link
              to="/chi-siamo"
              className="mt-8 inline-flex items-center gap-2 text-[9px] uppercase tracking-[2.5px] text-[#141414]/50 hover:text-[#A8842C] border-b border-black/15 hover:border-[#A8842C] pb-1 transition-colors"
            >
              Scopri il progetto
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeInSection>

          <div className="lg:col-span-8">
            {METHOD_ROWS.map((row, i) => (
              <FadeInSection key={row.num} delay={i * 120}>
                <div className="group grid grid-cols-12 gap-4 items-baseline py-9 border-t border-black/[0.08] last:border-b hover:bg-black/[0.02] transition-colors px-2 -mx-2">
                  <span className="col-span-2 sm:col-span-1 text-[10px] tracking-[2px] text-[#141414]/25">
                    {row.num}
                  </span>
                  <span className="col-span-10 sm:col-span-3 font-brand text-[48px] sm:text-[60px] leading-none text-[#A8842C]">
                    {row.weight}
                  </span>
                  <div className="col-span-12 sm:col-span-8">
                    <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#141414]">{row.title}</h3>
                    <p className="mt-2 text-[13px] text-[#141414]/45 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TOP ECCELLENZE */}
      <section className="py-28 px-6 bg-white border-y border-black/[0.08]">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6 bg-[#A8842C]" />
                  <p className="text-[9px] uppercase tracking-[3.5px] text-[#A8842C]">Classifica in tempo reale</p>
                </div>
                <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
                  Le eccellenze di oggi
                </h2>
              </div>
              <Link
                to="/dashboard"
                className="text-[9px] uppercase tracking-[2.5px] text-[#141414]/50 hover:text-[#A8842C] transition-colors border-b border-black/15 hover:border-[#A8842C] pb-1"
              >
                Classifica completa →
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection>
            {leaderboard.isLoading && <LoadingSpinner />}
            {leaderboard.isError && <ErrorMessage onRetry={() => leaderboard.refetch()} />}
            {leaderboard.data && (
              <div>
                {leaderboard.data.slice(0, 5).map((entry) => (
                  <button
                    key={entry.placeId}
                    onClick={() => navigate(`/places/${entry.placeId}`)}
                    className="w-full grid grid-cols-12 items-center gap-4 py-6 border-t border-black/[0.07] last:border-b text-left hover:bg-black/[0.02] transition-colors px-3 -mx-3 group"
                  >
                    <span className="col-span-1 font-serif italic text-[22px] text-[#141414]/20 group-hover:text-[#A8842C]/40 transition-colors">
                      {entry.rank.toString().padStart(2, "0")}
                    </span>
                    <div className="col-span-10 sm:col-span-6">
                      <p className="font-serif font-semibold text-xl sm:text-[22px] text-[#141414] group-hover:text-[#A8842C] transition-colors">
                        {entry.name}
                      </p>
                      <p className="text-[9px] uppercase tracking-[2px] text-[#141414]/35 mt-1">
                        {entry.city}
                      </p>
                    </div>
                    <span className="hidden sm:block sm:col-span-3">
                      <StatusBadge status={entry.plaqueStatus} />
                    </span>
                    <span className="col-span-1 sm:col-span-2 font-brand text-[36px] sm:text-[40px] text-[#A8842C] sm:text-right leading-none">
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
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-[#A8842C]" />
              <p className="text-[9px] uppercase tracking-[3.5px] text-[#A8842C]">Il percorso</p>
            </div>
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
              Tre livelli di eccellenza
            </h2>
          </FadeInSection>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border-t border-black/[0.08]">
            {LEVELS.map((level, i) => (
              <FadeInSection key={level.num} delay={i * 120}>
                <div className="md:border-r border-b md:border-b-0 border-black/[0.08] md:last:border-r-0 px-0 md:px-10 py-10 md:py-8 h-full">
                  <span className="font-serif italic text-[64px] leading-none text-[#A8842C]/30">{level.num}</span>
                  <h3 className="mt-5 font-serif font-semibold text-2xl text-[#141414]">{level.title}</h3>
                  <p className="mt-3 text-[13px] text-[#141414]/45 leading-relaxed">{level.desc}</p>
                  <p className="mt-5 text-[9px] uppercase tracking-[2.5px] text-[#141414]/25">
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
        <section className="py-28 px-6 bg-white border-t border-black/[0.08]">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6 bg-[#A8842C]" />
                <p className="text-[9px] uppercase tracking-[3.5px] text-[#A8842C]">La visione</p>
                <span className="px-2 py-0.5 border border-[#A8842C]/40 text-[8px] tracking-[2px] uppercase text-[#A8842C]/70">
                  {user?.role === "developer" ? "Sviluppatore" : "Partner"}
                </span>
              </div>
              <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
                Cinque anni di crescita
              </h2>
            </FadeInSection>
            <FadeInSection className="mt-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] uppercase tracking-[2px] text-[#141414]/30 border-b border-black/[0.10]">
                      <th className="py-4 pr-4 font-medium">Anno</th>
                      <th className="py-4 pr-4 font-medium">Iscritti</th>
                      <th className="py-4 pr-4 font-medium">Ricavi annui</th>
                      <th className="py-4 font-medium">Risultato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECTION.map((row) => (
                      <tr key={row.year} className="border-b border-black/[0.06] hover:bg-black/[0.02] transition-colors">
                        <td className="py-5 pr-4 font-serif font-semibold text-xl text-[#141414]">{row.year}</td>
                        <td className="py-5 pr-4 text-sm text-[#141414]/50">{row.members}</td>
                        <td className="py-5 pr-4 text-sm text-[#141414]/50">{row.revenue}</td>
                        <td className={`py-5 text-sm font-semibold ${row.positive ? "text-[#22c55e]" : "text-[#141414]/40"}`}>
                          {row.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* CITAZIONE FINALE */}
      <section className="py-24 px-6 border-t border-black/[0.08]">
        <FadeInSection className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-[#A8842C] mx-auto mb-8" />
          <p className="font-serif italic text-[22px] sm:text-[28px] md:text-[32px] text-[#141414]/60 leading-[1.5]">
            «La fiducia non si compra con le stelle.
            <br />
            Si conquista con le verifiche.»
          </p>
          <p className="mt-7 text-[9px] uppercase tracking-[3.5px] text-[#A8842C]">
            REVISORE — Certificazione Ospitalità Italiana
          </p>
          <div className="mt-10">
            <Link
              to="/abbonamenti"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#141414] text-[#141414] text-[9px] font-bold uppercase tracking-[3px] hover:bg-[#141414] hover:text-white transition-colors"
            >
              Richiedi la certificazione
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
