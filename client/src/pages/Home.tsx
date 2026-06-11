import { Link, useNavigate } from "react-router-dom";
import { useDashboardStats, useLeaderboard } from "../api/hooks";
import AnimatedCounter from "../components/AnimatedCounter";
import FadeInSection from "../components/FadeInSection";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const ALGORITHM_CARDS = [
  { weight: "40%", title: "ISPEZIONE REVISORE", desc: "Sopralluogo professionale con 8 strumenti certificati e protocollo UNI 11312." },
  { weight: "30%", title: "REPUTAZIONE ONLINE", desc: "Media dei punteggi Google e TripAdvisor, normalizzata e verificata." },
  { weight: "30%", title: "COMMUNITY SCORE", desc: "Le valutazioni degli utenti registrati della piattaforma, in tempo reale." },
];

const LEVELS = [
  { num: "01", title: "Livello 1 — Base", desc: "Bar, trattorie, ristoranti, pizzerie gourmet, B&B. Episodi 1-10." },
  { num: "02", title: "Livello 2 — Crescita", desc: "Ristoranti fascia alta, hotel 3-4 stelle, agriturismi. Episodi 10-25." },
  { num: "03", title: "Livello 3 — Premium", desc: "Hotel 5 stelle, ristoranti Michelin, resort, SPA. Episodi 25+" },
];

const PROJECTION = [
  { year: "Anno 1 (2026-27)", members: "0–20.000", revenue: "5.000–25.000€", result: "Investimento", positive: false },
  { year: "Anno 2 (2027-28)", members: "20.000–80k", revenue: "40.000–100.000€", result: "+10k/+50k€", positive: true },
  { year: "Anno 3 (2028-29)", members: "80k–200k", revenue: "100.000–250.000€", result: "+50k/+170k€", positive: true },
  { year: "Anno 4 (2029-30)", members: "200k–500k", revenue: "200.000–500.000€", result: "+120k/+380k€", positive: true },
  { year: "Anno 5 (2030-31)", members: "500k+", revenue: "500k–1M+€", result: "+380k/+800k€", positive: true },
];

export default function Home() {
  const stats = useDashboardStats();
  const leaderboard = useLeaderboard();
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="gold-grid min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="text-xs tracking-widest text-[#F0EADB]/70">MONITORAGGIO LIVE ATTIVO</span>
        </div>

        <h1 className="flex items-baseline leading-none">
          <span className="font-brand text-[100px] sm:text-[150px] md:text-[180px] text-[#DCBD6B]">R</span>
          <span className="font-brand text-[64px] sm:text-[100px] md:text-[120px] tracking-[12px] sm:tracking-[20px] text-[#C9A84C]">
            EVISORE
          </span>
        </h1>
        <p className="mt-4 font-serif italic text-xl sm:text-3xl text-[#F0EADB]/80 max-w-2xl">
          L'eccellenza nell'ospitalità incontra l'intelligenza artificiale.
        </p>

        {/* KPI */}
        <div className="mt-12 flex items-center gap-6 sm:gap-10">
          {stats.data ? (
            <>
              <div className="text-center">
                <p className="font-brand text-4xl sm:text-5xl text-[#F0EADB]/60">
                  <AnimatedCounter value={stats.data.totalInspected} />
                </p>
                <p className="mt-1 text-[10px] sm:text-xs tracking-widest text-[#F0EADB]/50">STRUTTURE ISPEZIONATE</p>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent" />
              <div className="text-center">
                <p className="font-brand text-4xl sm:text-5xl text-[#22c55e]">
                  <AnimatedCounter value={stats.data.activePlaques} />
                </p>
                <p className="mt-1 text-[10px] sm:text-xs tracking-widest text-[#F0EADB]/50">TARGHE ATTIVE</p>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent" />
              <div className="text-center">
                <p className="font-brand text-4xl sm:text-5xl text-[#C9A84C]">
                  <AnimatedCounter value={stats.data.averageFinalScore} decimals={2} />
                </p>
                <p className="mt-1 text-[10px] sm:text-xs tracking-widest text-[#F0EADB]/50">SCORE MEDIO</p>
              </div>
            </>
          ) : (
            <div className="h-20" />
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            to="/places"
            className="px-8 py-4 bg-[#C9A84C] text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:bg-[#DCBD6B] transition-colors"
          >
            Esplora Strutture
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 border border-[#C9A84C] text-[#C9A84C] uppercase tracking-widest hover:bg-[#C9A84C]/10 transition-colors"
          >
            Live Dashboard
          </Link>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-transparent mx-auto" />
        </div>
      </section>

      {/* L'ALGORITMO */}
      <section className="py-32 bg-[#0A0A0A] border-y border-[#C9A84C]/10 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center">
            <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest">L'Algoritmo Revisore</h2>
            <p className="mt-3 font-serif italic text-xl text-[#F0EADB]/60">
              Una ponderazione scientifica e dinamica di tre fonti indipendenti.
            </p>
          </FadeInSection>

          <div className="mt-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 grid gap-6 w-full">
              {ALGORITHM_CARDS.map((card, i) => (
                <FadeInSection key={card.title} delay={i * 150}>
                  <div className="p-6 bg-[#060606] border border-[#C9A84C]/30 hover:border-[#C9A84C]/70 transition-colors flex items-center gap-6">
                    <span className="font-brand text-3xl text-[#C9A84C]">{card.weight}</span>
                    <div>
                      <p className="uppercase tracking-widest text-sm font-bold text-[#F0EADB]">{card.title}</p>
                      <p className="mt-1 text-sm text-[#F0EADB]/50">{card.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection className="shrink-0">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-[#C9A84C] blur-[40px] opacity-20 rounded-full animate-pulse" />
                <div className="relative w-48 h-48 rounded-full border-2 border-[#C9A84C] bg-[#060606] flex flex-col items-center justify-center">
                  <span className="font-brand text-4xl text-[#DCBD6B]">SCORE</span>
                  <span className="text-xs tracking-widest text-[#F0EADB]/60">Live Dinamico</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* TOP ECCELLENZE */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest">Top Eccellenze</h2>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <span className="text-xs tracking-widest text-[#F0EADB]/60">Monitoring in Tempo Reale</span>
                </div>
              </div>
              <Link to="/dashboard" className="text-xs uppercase tracking-widest text-[#C9A84C] hover:text-[#DCBD6B]">
                Vedi Classifica Completa →
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-10">
            {leaderboard.isLoading && <LoadingSpinner />}
            {leaderboard.isError && <ErrorMessage onRetry={() => leaderboard.refetch()} />}
            {leaderboard.data && (
              <div className="overflow-x-auto border border-[#C9A84C]/20">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-[#C9A84C]/20">
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Struttura</th>
                      <th className="px-4 py-3">Città</th>
                      <th className="px-4 py-3">Score Live</th>
                      <th className="px-4 py-3">Stato Targa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A84C]/10">
                    {leaderboard.data.slice(0, 5).map((entry) => (
                      <tr
                        key={entry.placeId}
                        onClick={() => navigate(`/places/${entry.placeId}`)}
                        className="hover:bg-[#C9A84C]/5 cursor-pointer"
                      >
                        <td className="px-4 py-4 font-brand text-2xl text-[#C9A84C]">#{entry.rank}</td>
                        <td className="px-4 py-4 font-serif text-lg">{entry.name}</td>
                        <td className="px-4 py-4 text-sm text-[#F0EADB]/60">{entry.city}</td>
                        <td className="px-4 py-4 font-brand text-3xl text-[#DCBD6B]">{entry.finalScore.toFixed(2)}</td>
                        <td className="px-4 py-4"><StatusBadge status={entry.plaqueStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* I 3 LIVELLI */}
      <section className="py-32 bg-[#060606] px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center">
            <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest">I 3 Livelli</h2>
          </FadeInSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVELS.map((level, i) => (
              <FadeInSection key={level.num} delay={i * 150}>
                <div className="group relative p-10 bg-[#0a0a0a] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-colors overflow-hidden h-full">
                  <span className="absolute -top-4 -right-2 font-brand text-[140px] leading-none text-[#C9A84C] opacity-0 group-hover:opacity-5 transition-opacity select-none">
                    {level.num}
                  </span>
                  <span className="font-brand text-3xl text-[#C9A84C]">{level.num}</span>
                  <h3 className="mt-4 uppercase tracking-widest font-bold text-[#F0EADB]">{level.title}</h3>
                  <p className="mt-3 text-sm text-[#F0EADB]/50">{level.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROIEZIONE ECONOMICA */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center">
            <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest">Proiezione Economica</h2>
            <p className="mt-3 font-serif italic text-xl text-[#F0EADB]/60">
              La crescita prevista della piattaforma nei primi cinque anni.
            </p>
          </FadeInSection>
          <FadeInSection className="mt-12">
            <div className="overflow-x-auto border border-[#C9A84C]/20 bg-[#0a0a0a]">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-[#C9A84C]/20">
                    <th className="px-4 py-3">Anno</th>
                    <th className="px-4 py-3">Iscritti</th>
                    <th className="px-4 py-3">Ricavi Annui</th>
                    <th className="px-4 py-3">Risultato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10">
                  {PROJECTION.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-4 font-brand text-xl text-[#C9A84C]">{row.year}</td>
                      <td className="px-4 py-4 text-sm text-[#F0EADB]/70">{row.members}</td>
                      <td className="px-4 py-4 text-sm text-[#F0EADB]/70">{row.revenue}</td>
                      <td className={`px-4 py-4 text-sm font-bold ${row.positive ? "text-[#22c55e]" : "text-[#F0EADB]/60"}`}>
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
    </div>
  );
}
