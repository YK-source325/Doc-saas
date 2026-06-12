import FadeInSection from "../components/FadeInSection";
import AnimatedCounter from "../components/AnimatedCounter";

const TAGS = ["UNI 11312", "HACCP", "Mystery Auditor", "13+ anni hospitality", "Multilingue IT/EN/RU/UA"];

const PILLARS = [
  { num: "01", title: "TUTELA DEL CONSUMATORE", desc: "Informazione trasparente e verificata per chi sceglie dove mangiare e dormire." },
  { num: "02", title: "VALORIZZAZIONE DELL'ECCELLENZA", desc: "Le strutture serie meritano visibilità. REVISORE le trova, le ispeziona e le celebra." },
  { num: "03", title: "STANDARD PROFESSIONALI", desc: "Ispezioni secondo metodologia certificata UNI 11312 — la stessa dei Mystery Auditor europei." },
];

const COUNTERS = [
  { value: 1000, label: "Strutture nel database" },
  { value: 8, label: "Strumenti certificati" },
  { value: 3, label: "Livelli di certificazione" },
  { value: 3, label: "Fonti di punteggio" },
  { value: 5, label: "Anni di proiezione" },
];

const TIMELINE = [
  { date: "Aprile 2026", text: "Business plan completato. Marchio REVISORE libero in Italia e UE (TMview). Piattaforma online." },
  { date: "Estate 2026", text: "Lancio canale YouTube. Prime 5 strutture Livello 1 certificate con targa fisica." },
  { date: "2027", text: "Espansione nazionale. Certificazione AMAI UNI 11312. Prime proposte a emittenti TV." },
  { date: "2028", text: "REVISORE riconosciuto a livello nazionale. Accordo emittente. Versione internazionale." },
  { date: "2029+", text: "Il brand dell'ospitalità certificata in Europa. Formato televisivo esportabile." },
];

const CERTIFICATIONS = [
  {
    title: "MYSTERY GUEST Livello 1",
    org: "FormazioneTurismo/IET",
    status: "COMPLETATO",
    statusColor: "#22c55e",
    desc: "Attestato di competenza professionale. Metodologia di valutazione riconosciuta.",
  },
  {
    title: "MYSTERY AUDITOR UNI 11312",
    org: "AMAI + UNI",
    status: "IN ACQUISIZIONE",
    statusColor: "#f59e0b",
    desc: "L'Italia è il primo paese al mondo con norma nazionale per il Mystery Audit.",
  },
  {
    title: "HACCP Complementare",
    org: "Enti regionali",
    status: "PIANIFICATO",
    statusColor: "#6b7280",
    desc: "Obbligatoria per chi opera nel settore alimentare.",
  },
];

const KIT = [
  { name: "Guanti bianchi cotone", desc: "Ispezione superfici — elemento iconico del brand" },
  { name: "Guanti lattice", desc: "Ispezione cucina e aree HACCP" },
  { name: "Termometro infrarossi", desc: "Temperature frigoriferi, piatti, buffet" },
  { name: "Torcia UV", desc: "Tracce biologiche su superfici e bagni" },
  { name: "Misuratore qualità olio", desc: "Freschezza olio — molto scenico in video" },
  { name: "pH-metro digitale", desc: "Acidità soluzioni di pulizia" },
  { name: "Luminometro ATP", desc: "Contaminazione biologica — standard NAS" },
  { name: "Tablet con checklist", desc: "Dati in tempo reale, punteggi automatici" },
];

export default function ChiSiamo() {
  return (
    <div className="px-4 sm:px-6">
      {/* HERO */}
      <section className="py-28 text-center max-w-4xl mx-auto">
        <FadeInSection>
          <h1 className="font-serif font-semibold text-6xl sm:text-8xl text-[#141414]">IL PROGETTO</h1>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#141414]/70 max-w-2xl mx-auto leading-relaxed">
            REVISORE è la prima piattaforma italiana di ispezione e certificazione
            dell'ospitalità — ispezione umana, intelligenza artificiale, punteggio pubblico.
          </p>
        </FadeInSection>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="border border-black/10 p-10 sm:p-14 bg-white grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[3px] text-[#A8842C] mb-4">Il Manifesto</p>
              <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414] leading-tight">
                C'è chi lo sa.<br />
                C'è chi lo nasconde.<br />
                Noi lo mostriamo.
              </h2>
              <p className="mt-6 text-[#141414]/60 leading-relaxed font-serif italic">
                Un ispettore professionista entra in incognito. Guanti bianchi, strumenti certificati,
                protocollo UNI 11312. Il punteggio finale non si compra — si guadagna.
                E la targa vale solo finché il punteggio la difende.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-3 bg-[#A8842C]/05 border border-black/10 text-[#A8842C] text-xs tracking-widest uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* I 3 PILASTRI */}
      <section className="py-28 max-w-6xl mx-auto">
        <FadeInSection className="text-center">
          <h2 className="font-serif font-semibold text-5xl text-[#141414]">I 3 Pilastri</h2>
        </FadeInSection>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <FadeInSection key={pillar.num} delay={i * 150}>
              <div className="group bg-white border border-black/10 p-10 hover:border-[#A8842C]/60 transition-colors h-full">
                <span className="inline-flex w-12 h-12 items-center justify-center border border-black/15 text-[#A8842C] font-brand text-2xl group-hover:bg-[#A8842C] group-hover:text-black transition-colors">
                  {pillar.num}
                </span>
                <h3 className="mt-6 uppercase tracking-widest font-bold text-[#141414]">{pillar.title}</h3>
                <p className="mt-3 text-sm text-[#141414]/50">{pillar.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* COUNTER */}
      <section className="py-20 bg-white border-y border-black/10 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {COUNTERS.map((c, i) => (
            <FadeInSection key={c.label} delay={i * 100}>
              <p className="font-brand text-6xl text-[#A8842C]">
                <AnimatedCounter value={c.value} />
              </p>
              <p className="mt-2 text-xs tracking-widest uppercase text-[#141414]/50">{c.label}</p>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-28 max-w-4xl mx-auto">
        <FadeInSection className="text-center">
          <h2 className="font-serif font-semibold text-5xl text-[#141414]">La Roadmap</h2>
        </FadeInSection>
        <div className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#A8842C]/60 via-[#A8842C]/30 to-transparent" />
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <FadeInSection key={item.date} delay={i * 100}>
                <div
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-3 h-3 rounded-full bg-[#A8842C] shadow-[0_0_10px_rgba(201,168,76,0.7)] left-[10.5px] ${
                      i % 2 === 0 ? "md:left-auto md:-right-[6.5px]" : "md:-left-[6.5px]"
                    }`}
                  />
                  <p className="font-serif font-semibold text-2xl text-[#141414]">{item.date}</p>
                  <p className="mt-2 font-serif italic text-[#141414]/70">{item.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICAZIONI */}
      <section className="py-20 max-w-6xl mx-auto">
        <FadeInSection className="text-center">
          <h2 className="font-serif font-semibold text-5xl text-[#141414]">
            Certificazioni Professionali
          </h2>
        </FadeInSection>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <FadeInSection key={cert.title} delay={i * 150}>
              <div className="bg-white border border-black/10 p-8 h-full">
                <span
                  className="px-3 py-1 border rounded-full text-[10px] font-bold tracking-widest"
                  style={{ borderColor: cert.statusColor, color: cert.statusColor }}
                >
                  {cert.status}
                </span>
                <h3 className="mt-5 font-brand text-2xl text-[#141414] tracking-wide">{cert.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-[#A8842C]">{cert.org}</p>
                <p className="mt-4 font-serif italic text-sm text-[#141414]/60">{cert.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* KIT DI ISPEZIONE */}
      <section className="py-20 pb-28 max-w-6xl mx-auto">
        <FadeInSection className="text-center">
          <h2 className="font-serif font-semibold text-5xl text-[#141414]">Kit di Ispezione</h2>
          <p className="mt-4 font-serif italic text-[#141414]/50 text-lg">
            Otto strumenti certificati. Un protocollo. Nessuna improvvisazione.
          </p>
        </FadeInSection>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KIT.map((tool, i) => (
            <FadeInSection key={tool.name} delay={(i % 4) * 100}>
              <div className="bg-white border border-black/10 hover:border-[#A8842C]/60 p-6 transition-colors h-full">
                <span className="font-brand text-3xl text-[#A8842C]">+</span>
                <h3 className="mt-3 font-bold text-sm text-[#141414]">{tool.name}</h3>
                <p className="mt-2 font-serif italic text-sm text-[#141414]/50">{tool.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>
    </div>
  );
}
