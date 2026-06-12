import { Link } from "react-router-dom";

const COL_ISTITUZIONALE = [
  { label: "Chi Siamo", to: "/chi-siamo" },
  { label: "Il Metodo", to: "/chi-siamo#metodo" },
  { label: "Certificazioni", to: "/chi-siamo#certificazioni" },
  { label: "Media & Trailer", to: "/trailer" },
];

const COL_STRUTTURE = [
  { label: "Cerca strutture", to: "/strutture" },
  { label: "Classifica nazionale", to: "/dashboard" },
  { label: "Richiedi certificazione", to: "/abbonamenti" },
  { label: "Piani e prezzi", to: "/abbonamenti" },
  { label: "Area Partner", to: "/partner" },
];

const COL_LEGALE = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cookie Policy", to: "/privacy#cookie" },
  { label: "Note Legali", to: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white/70">
      {/* Banda superiore */}
      <div className="border-b border-white/[0.07] py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-[5px] mb-4">
              <span className="font-serif font-semibold text-[20px] tracking-[0.22em] text-white leading-none">REVISORE</span>
              <span className="text-[#A8842C] font-serif text-[20px] leading-none">.</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/40 mt-3">
              Prima piattaforma italiana di ispezione e certificazione dell'ospitalità.
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[2px] text-white/30">
              Milano, Italia
            </p>
            <a
              href="mailto:info@revisore.it"
              className="mt-1 block text-[11px] text-[#A8842C] hover:text-[#C9A84C] transition-colors"
            >
              info@revisore.it
            </a>
          </div>

          {/* Istituzionale */}
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-white/30 mb-5">Istituzionale</p>
            <ul className="space-y-3">
              {COL_ISTITUZIONALE.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[11px] text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Strutture */}
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-white/30 mb-5">Strutture</p>
            <ul className="space-y-3">
              {COL_STRUTTURE.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[11px] text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legale */}
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-white/30 mb-5">Legale</p>
            <ul className="space-y-3">
              {COL_LEGALE.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[11px] text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/[0.07]">
              <p className="text-[9px] uppercase tracking-[2px] text-white/20 leading-relaxed">
                Certificazione conforme<br />
                metodologia UNI 11312
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Banda inferiore */}
      <div className="py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] uppercase tracking-[2px] text-white/25">
            © 2026 REVISORE — Tutti i diritti riservati
          </p>
          <p className="text-[9px] uppercase tracking-[2px] text-white/20 text-center">
            Piattaforma in fase di lancio — dati di esempio, non riferiti a strutture reali
          </p>
          <p className="text-[9px] uppercase tracking-[2px] text-white/25">
            Made in Italy
          </p>
        </div>
      </div>
    </footer>
  );
}
