import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#141414] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-[11px] uppercase tracking-[2px] text-white/75 leading-relaxed max-w-xl">
          Questo sito usa cookie tecnici necessari al funzionamento.{" "}
          <Link to="/privacy" className="text-[#A8842C] underline hover:text-white transition-colors" onClick={accept}>
            Cookie Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-[11px] uppercase tracking-[2px] text-white/40 hover:text-white transition-colors px-3 py-1.5 border border-white/20 hover:border-white/50"
          >
            Solo necessari
          </button>
          <button
            onClick={accept}
            className="text-[11px] uppercase tracking-[2px] text-[#141414] bg-[#A8842C] hover:bg-[#c9a040] transition-colors px-4 py-1.5 font-bold"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
