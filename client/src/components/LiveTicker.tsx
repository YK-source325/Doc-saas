// Ticker istituzionale — notizie reali food safety + ospitalità italiana + aggiornamenti live piattaforma
import { useNavigate } from "react-router-dom";
import { useLeaderboard } from "../api/hooks";

const NEWS_ITEMS = [
  { type: "NAS", text: "NAS 2025: 45.762 ispezioni in Italia — 1 locale su 5 risultato irregolare", link: null },
  { type: "NAS", text: "Operazione NAS: sequestrate 16 tonnellate di alimenti in pescherie e mercati rionali — rischio epatite A", link: null },
  { type: "NAS", text: "Campagna «Healthy Summer 2025»: 3.563 ispezioni tra agriturismi, stabilimenti balneari e street food", link: null },
  { type: "NAS", text: "NAS Taranto: 6 attività chiuse tra bar, ristoranti e agriturismi — 700 kg alimenti sequestrati", link: null },
  { type: "NAS", text: "Blitz NAS Pisa: 12 attività chiuse, 3 tonnellate di alimenti sequestrati, sanzioni per 50.000 €", link: null },
  { type: "MICHELIN", text: "Guida Michelin Italia 2026: 22 nuovi ristoranti stellati — totale 341 stelle sul territorio nazionale", link: null },
  { type: "MICHELIN", text: "Michelin 2026: 15 stelle, 1 nuovo tre stelle — Michelangelo Mammoliti entra nel firmamento", link: null },
  { type: "MICHELIN", text: "Michelin maggio 2026: 15 nuovi ristoranti entrano nella selezione ufficiale italiana", link: null },
  { type: "UNI", text: "UNI 11312: l'Italia primo paese al mondo con norma nazionale per il Mystery Audit professionale", link: null },
  { type: "OSPITALITÀ", text: "Bando Ospitalità Italiana 2025/2026 — certificazione qualità per strutture ricettive e ristorative", link: null },
  { type: "OSPITALITÀ", text: "ISNART: nuove certificazioni Ospitalità Italiana 2026 attive in tutta la penisola", link: null },
  { type: "NAS", text: "NAS: controlli Listeria — 1.095 aziende ispezionate, 14 tonnellate alimenti irregolari sequestrate", link: null },
  { type: "NAS", text: "Botulino: intensificati i controlli NAS su food truck e sagre — quasi 1 su 2 non conforme", link: null },
  { type: "MICHELIN", text: "Stelle Verdi Michelin Italia 2025: 69 ristoranti certificati per sostenibilità gastronomica", link: null },
];

export default function LiveTicker() {
  const leaderboard = useLeaderboard();
  const navigate = useNavigate();

  // Combina notizie reali + punteggi live della piattaforma
  type TickerItem =
    | { kind: "news"; type: string; text: string }
    | { kind: "score"; placeId: number; name: string; city: string; finalScore: number; trend: string };

  const combined: TickerItem[] = [];
  NEWS_ITEMS.forEach((n, i) => {
    combined.push({ kind: "news", type: n.type, text: n.text });
    // Intercala un punteggio live ogni 3 notizie
    if (leaderboard.data && leaderboard.data[i % leaderboard.data.length]) {
      const e = leaderboard.data[i % leaderboard.data.length];
      combined.push({ kind: "score", placeId: e.placeId, name: e.name, city: e.city, finalScore: e.finalScore, trend: e.trend });
    }
  });

  // Duplica per loop continuo
  const strip = [...combined, ...combined];

  return (
    <div className="border-t border-black/[0.08] bg-[#141414] overflow-hidden select-none">
      <div className="marquee-track-slow py-2.5">
        {strip.map((item, i) => {
          if (item.kind === "news") {
            const colors: Record<string, string> = {
              NAS: "#ef4444",
              MICHELIN: "#A8842C",
              UNI: "#60a5fa",
              OSPITALITÀ: "#22c55e",
            };
            return (
              <span key={i} className="flex items-center gap-3 px-7 whitespace-nowrap">
                <span
                  className="text-[8px] font-bold tracking-[2px] px-1.5 py-[2px] border"
                  style={{ color: colors[item.type] ?? "#A8842C", borderColor: `${colors[item.type] ?? "#A8842C"}55` }}
                >
                  {item.type}
                </span>
                <span className="text-[11px] text-white/55 tracking-wide">
                  {item.text}
                </span>
                <span className="text-white/10 pl-4">·</span>
              </span>
            );
          } else {
            return (
              <button
                key={i}
                onClick={() => navigate(`/places/${item.placeId}`)}
                className="flex items-center gap-2.5 px-7 whitespace-nowrap group"
              >
                <span className="text-[8px] font-bold tracking-[2px] text-[#A8842C] border border-[#A8842C]/40 px-1.5 py-[2px]">LIVE</span>
                <span className="text-[11px] text-white/60 group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="font-brand text-[14px] text-[#A8842C]">{item.finalScore.toFixed(2)}</span>
                <span
                  className="text-[12px]"
                  style={{ color: item.trend === "up" ? "#22c55e" : item.trend === "stable" ? "#f59e0b" : "#ef4444" }}
                >
                  {item.trend === "up" ? "↗" : item.trend === "stable" ? "→" : "↘"}
                </span>
                <span className="text-white/10 pl-4">·</span>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
