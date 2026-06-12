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
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#141414] text-white border-t border-white/10 safe-area-bottom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-[11px] sm:text-xs uppercase tracking-[2px] text-white/70 leading-relaxed max-w-xl">
          Questo sito usa cookie tecnici necessari al funzionamento.{" "}
          <Link
            to="/privacy#cookie"
            className="text-[#A8842C] hover:text-white transition-colors"
          >
            Cookie Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2.5 text-[11px] uppercase tracking-widest text-white/50 border border-white/20 hover:border-white/40 hover:text-white/80 transition-colors touch-manipulation"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 text-[11px] uppercase tracking-widest bg-[#A8842C] text-white hover:bg-[#8F6F25] active:bg-[#8F6F25] transition-colors touch-manipulation font-bold"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
