import { useNavigate } from "react-router-dom";
import { usePlaces } from "../api/hooks";
import FadeInSection from "../components/FadeInSection";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { ShieldVisual } from "../cinema/visuals";

interface Tier {
  name: string;
  range: string;
  color: string;
  badge?: string;
  desc: string;
  features: string[];
  star?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "REVISORE SILVER",
    range: "SCORE 3.5–3.9",
    color: "#94a3b8",
    desc: "Struttura di buon livello. Rinnovo annuale 200€.",
    features: [
      "Targa fisica 20×15 cm",
      "Monitoraggio live 12 mesi",
      "Badge digitale certificato",
      "Menzione su piattaforma",
    ],
  },
  {
    name: "REVISORE ORO",
    range: "SCORE 4.0–4.7",
    color: "#C9A84C",
    badge: "PIÙ DIFFUSO",
    desc: "Eccellenza riconosciuta. Rinnovo annuale 350€.",
    features: [
      "Tutti i vantaggi Silver",
      "Priorità in leaderboard",
      "Certificato premium",
      "Accesso dashboard analytics",
    ],
  },
  {
    name: "REVISORE DIAMOND",
    range: "SCORE 4.8+",
    color: "#e0f2fe",
    badge: "ECCELLENZA ASSOLUTA",
    desc: "Il massimo dell'ospitalità italiana. Standard Michelin. Rinnovo 500€.",
    features: [
      "Tutti i vantaggi Oro",
      "Targa in metallo spazzolato",
      "Logo DIAMOND sui materiali",
      "Episodio dedicato canale YouTube",
    ],
    star: true,
  },
];

const STEPS = [
  { num: 1, title: "ISPEZIONE", desc: "L'ispettore visita con strumenti professionali, protocollo UNI 11312." },
  { num: 2, title: "ALGORITMO", desc: "Score finale: Revisore 40% + piattaforme online 30% + community 30%." },
  { num: 3, title: "TARGA", desc: "Struttura riceve targa fisica e monitoraggio live per 12 mesi." },
];

function tierOf(score: number): { label: string; color: string } | null {
  if (score >= 4.8) return { label: "DIAMOND", color: "#e0f2fe" };
  if (score >= 4.0) return { label: "ORO", color: "#C9A84C" };
  if (score >= 3.5) return { label: "SILVER", color: "#94a3b8" };
  return null;
}

export default function Targhe() {
  const places = usePlaces();
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="gold-grid py-28 px-4 text-center">
        <FadeInSection>
          <h1 className="font-brand text-6xl sm:text-8xl md:text-9xl text-[#C9A84C] tracking-widest leading-none">
            LE TARGHE REVISORE
          </h1>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#F0EADB]/70 max-w-3xl mx-auto">
            Il riconoscimento dell'eccellenza. Al termine di ogni ispezione positiva, il Revisore
            consegna una targa fisica — il climax emotivo di ogni episodio.
          </p>
        </FadeInSection>
      </section>

      {/* TIER CARDS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {TIERS.map((tier, i) => (
            <FadeInSection key={tier.name} delay={i * 150} className="h-full">
              <div
                className="relative bg-[#060606] border p-8 lg:p-10 h-full flex flex-col transition-colors"
                style={{ borderColor: `${tier.color}4D` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${tier.color}B3`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${tier.color}4D`)}
              >
                {tier.badge && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 border bg-[#060606] text-[10px] font-bold tracking-widest whitespace-nowrap"
                    style={{ borderColor: tier.color, color: tier.color }}
                  >
                    {tier.badge}
                  </span>
                )}
                <div className="flex justify-center">
                  <ShieldVisual className="w-24 h-28" color={tier.color} star={tier.star} />
                </div>
                <h2 className="mt-6 font-brand text-3xl tracking-widest text-center" style={{ color: tier.color }}>
                  {tier.name}
                </h2>
                <p className="mt-1 text-xs tracking-widest text-center text-[#F0EADB]/50">{tier.range}</p>
                <p className="mt-4 font-serif italic text-center text-[#F0EADB]/70">{tier.desc}</p>
                <ul className="mt-8 space-y-3 text-sm text-[#F0EADB]/70">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span style={{ color: tier.color }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-20 px-4 bg-[#0A0A0A] border-y border-[#C9A84C]/10">
        <div className="max-w-5xl mx-auto">
          <FadeInSection className="text-center">
            <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest">Come Funziona</h2>
          </FadeInSection>
          <div className="mt-16 relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="hidden md:block absolute top-7 left-[16%] right-[16%] border-t border-dashed border-[#C9A84C]/40" />
            {STEPS.map((step, i) => (
              <FadeInSection key={step.num} delay={i * 150} className="relative text-center">
                <span className="relative z-10 inline-flex w-14 h-14 items-center justify-center rounded-full border-2 border-[#C9A84C] bg-[#060606] font-brand text-2xl text-[#C9A84C]">
                  {step.num}
                </span>
                <h3 className="mt-4 uppercase tracking-widest font-bold text-[#F0EADB]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#F0EADB]/50">{step.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* STRUTTURE CERTIFICATE */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="font-brand text-5xl text-[#DCBD6B] tracking-widest text-center">
              Strutture Certificate
            </h2>
          </FadeInSection>
          <div className="mt-12">
            {places.isLoading && <LoadingSpinner />}
            {places.isError && <ErrorMessage onRetry={() => places.refetch()} />}
            {places.data && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.data.map((p, i) => {
                  const tier = tierOf(p.finalScore);
                  return (
                    <FadeInSection key={p.id} delay={(i % 3) * 100}>
                      <div
                        onClick={() => navigate(`/places/${p.id}`)}
                        className="bg-[#0a0a0a] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 p-6 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          {tier ? (
                            <span
                              className="px-3 py-1 border text-[10px] font-bold tracking-widest"
                              style={{ borderColor: tier.color, color: tier.color }}
                            >
                              {tier.label}
                            </span>
                          ) : (
                            <span className="px-3 py-1 border border-[#6b7280] text-[#6b7280] text-[10px] font-bold tracking-widest">
                              NESSUNA TARGA
                            </span>
                          )}
                          <StatusBadge status={p.plaqueStatus} />
                        </div>
                        <h3 className="mt-4 font-serif text-xl">{p.name}</h3>
                        <p className="text-xs text-[#F0EADB]/50">{p.city}</p>
                        <p className="mt-3 font-brand text-4xl text-[#DCBD6B]">{p.finalScore.toFixed(2)}</p>
                      </div>
                    </FadeInSection>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <FadeInSection>
          <h2 className="font-serif italic text-3xl text-[#F0EADB]/80">
            Vuoi ricevere la targa Revisore?
          </h2>
          <a
            href="mailto:info@revisore.it"
            className="mt-8 inline-block px-8 py-4 border border-[#C9A84C] text-[#C9A84C] uppercase tracking-widest hover:bg-[#C9A84C]/10 transition-colors"
          >
            Richiedi Ispezione →
          </a>
        </FadeInSection>
      </section>
    </div>
  );
}
