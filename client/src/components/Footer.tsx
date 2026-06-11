import { EmblemVisual } from "../cinema/visuals";

export default function Footer() {
  return (
    <footer className="border-t border-[#C9A84C]/10 py-12 text-center">
      <div className="flex justify-center mb-4">
        <EmblemVisual className="w-12 h-12" />
      </div>
      <p className="font-brand text-2xl text-white tracking-[6px]">REVISORE</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-[#F0EADB]/40">
        Yevhen Khara © 2026 — Certificazione Ospitalità Italiana
      </p>
    </footer>
  );
}
