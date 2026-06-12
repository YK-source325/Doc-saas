import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-14">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-[11px] uppercase tracking-[3px] text-[#141414]/40 text-center">
          REVISORE © 2026 — Certificazione Ospitalità Italiana
        </p>
        <a
          href="mailto:info@revisore.it"
          className="text-[11px] uppercase tracking-[3px] text-[#A8842C] hover:text-[#141414] transition-colors"
        >
          info@revisore.it
        </a>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <Link
          to="/privacy"
          className="text-[10px] uppercase tracking-[2px] text-[#141414]/40 hover:text-[#A8842C] transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="text-[#141414]/20">·</span>
        <Link
          to="/privacy#cookie"
          className="text-[10px] uppercase tracking-[2px] text-[#141414]/40 hover:text-[#A8842C] transition-colors"
        >
          Cookie Policy
        </Link>
        <span className="text-[#141414]/20">·</span>
        <a
          href="mailto:info@revisore.it"
          className="text-[10px] uppercase tracking-[2px] text-[#141414]/40 hover:text-[#A8842C] transition-colors"
        >
          Contatti
        </a>
      </div>
      <p className="mt-6 text-center text-[10px] tracking-[2px] uppercase text-[#141414]/25 px-6">
        Versione dimostrativa — strutture, punteggi e valutazioni sono dati di esempio, non reali.
      </p>
    </footer>
  );
}
