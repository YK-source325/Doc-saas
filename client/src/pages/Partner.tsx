import { usePartnerOverview } from "../api/hooks";
import { useAuth } from "../context/AuthContext";
import AnimatedCounter from "../components/AnimatedCounter";
import FadeInSection from "../components/FadeInSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const ROADMAP = [
  { date: "2026", text: "Lancio piattaforma, canale YouTube e prime certificazioni Livello 1." },
  { date: "2027", text: "Espansione nazionale, certificazione AMAI UNI 11312, proposte alle emittenti TV." },
  { date: "2028", text: "Riconoscimento nazionale, accordo con emittente, versione internazionale." },
];

export default function Partner() {
  const { user } = useAuth();
  const overview = usePartnerOverview(Boolean(user));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <FadeInSection>
        <span className="px-4 py-1 border border-[#A8842C]/40 text-[10px] tracking-widest text-[#A8842C]">
          AREA RISERVATA PARTNER & INVESTITORI
        </span>
        <h1 className="mt-6 font-serif font-semibold text-5xl sm:text-7xl text-[#141414]">
          AREA PARTNER
        </h1>
        <p className="mt-3 font-serif italic text-xl text-[#141414]/60 max-w-3xl">
          Benvenuto, {user?.name}. Qui trovi i numeri reali della piattaforma, il modello di ricavo
          e la proiezione economica completa del progetto REVISORE.
        </p>
      </FadeInSection>

      {overview.isLoading && <LoadingSpinner />}
      {overview.isError && <ErrorMessage onRetry={() => overview.refetch()} />}

      {overview.data && (
        <>
          {/* KPI LIVE */}
          <FadeInSection className="mt-12">
            <h2 className="font-serif font-semibold text-2xl text-[#141414]">KPI LIVE</h2>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "STRUTTURE ISPEZIONATE", value: overview.data.kpi.totalInspected, decimals: 0 },
                { label: "TARGHE ATTIVE", value: overview.data.kpi.activePlaques, decimals: 0 },
                { label: "SCORE MEDIO", value: overview.data.kpi.averageFinalScore, decimals: 2 },
                { label: "VALUTAZIONI COMMUNITY", value: overview.data.kpi.totalCommunityRatings, decimals: 0 },
                { label: "RICAVO ANNUO TARGHE (€)", value: overview.data.kpi.annualRecurringRevenue, decimals: 0 },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-black/10 p-6">
                  <p className="font-brand text-4xl text-[#8F6F25]">
                    <AnimatedCounter value={kpi.value} decimals={kpi.decimals} />
                  </p>
                  <p className="mt-2 text-[10px] tracking-widest text-[#141414]/40">{kpi.label}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* MODELLO DI RICAVO */}
          <FadeInSection className="mt-16">
            <h2 className="font-serif font-semibold text-2xl text-[#141414]">MODELLO DI RICAVO</h2>
            <p className="mt-2 font-serif italic text-[#141414]/60">
              Ogni targa è un abbonamento annuale ricorrente. Tre livelli, tre prezzi.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {overview.data.plaquePricing.map((tier) => (
                <div key={tier.tier} className="bg-white border border-black/10 p-6 text-center">
                  <p className="font-serif font-semibold text-2xl text-[#141414]">{tier.tier}</p>
                  <p className="text-xs tracking-widest text-[#141414]/50">{tier.range}</p>
                  <p className="mt-4 font-brand text-5xl text-[#A8842C]">{tier.annualFee}€</p>
                  <p className="text-[10px] tracking-widest text-[#141414]/40">RINNOVO ANNUALE</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* PROIEZIONE ECONOMICA */}
          <FadeInSection className="mt-16">
            <h2 className="font-serif font-semibold text-2xl text-[#141414]">
              PROIEZIONE ECONOMICA 5 ANNI
            </h2>
            <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-[#141414]/40 border-b border-black/10">
                    <th className="px-4 py-3">Anno</th>
                    <th className="px-4 py-3">Iscritti</th>
                    <th className="px-4 py-3">Ricavi Annui</th>
                    <th className="px-4 py-3">Risultato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {overview.data.economicProjection.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-4 font-brand text-xl text-[#A8842C]">{row.year}</td>
                      <td className="px-4 py-4 text-sm text-[#141414]/70">{row.members}</td>
                      <td className="px-4 py-4 text-sm text-[#141414]/70">{row.revenue}</td>
                      <td className={`px-4 py-4 text-sm font-bold ${row.positive ? "text-[#22c55e]" : "text-[#141414]/60"}`}>
                        {row.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </>
      )}

      {/* ROADMAP */}
      <FadeInSection className="mt-16">
        <h2 className="font-serif font-semibold text-2xl text-[#141414]">ROADMAP STRATEGICA</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROADMAP.map((item) => (
            <div key={item.date} className="bg-white border border-black/10 p-6">
              <p className="font-brand text-3xl text-[#8F6F25]">{item.date}</p>
              <p className="mt-2 font-serif italic text-sm text-[#141414]/60">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* CONTATTO */}
      <FadeInSection className="mt-16 text-center border border-black/10 bg-white p-12">
        <h2 className="font-serif italic text-2xl text-[#141414]/80">
          Interessato a investire o collaborare con REVISORE?
        </h2>
        <a
          href="mailto:info@revisore.it?subject=Proposta%20Partner%20REVISORE"
          className="mt-6 inline-block px-8 py-4 bg-[#A8842C] text-white font-bold uppercase tracking-widest hover:bg-[#8F6F25] transition-colors"
        >
          Contatta il Fondatore →
        </a>
      </FadeInSection>
    </div>
  );
}
