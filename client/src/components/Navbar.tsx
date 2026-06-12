import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { to: "/strutture", label: "Strutture" },
  { to: "/dashboard", label: "Classifica" },
  { to: "/targhe", label: "Targhe" },
  { to: "/abbonamenti", label: "Certificazione" },
  { to: "/trailer", label: "Media" },
  { to: "/chi-siamo", label: "Chi Siamo" },
];

function linkClass(isActive: boolean): string {
  return `font-sans text-[10px] uppercase tracking-[2.5px] transition-colors whitespace-nowrap ${
    isActive
      ? "text-[#141414]"
      : "text-[#141414]/50 hover:text-[#141414]"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => { setOpen(false); setAccountOpen(false); };

  const handleLogout = async () => {
    await logout();
    close();
    navigate("/");
  };

  const roleLabel =
    user?.role === "developer" ? "Sviluppatore" : user?.role === "partner" ? "Partner" : "Utente";

  const accountLinks = (
    <>
      <Link
        to="/account"
        onClick={close}
        className="block px-5 py-3.5 text-[10px] uppercase tracking-[2px] text-[#141414]/60 hover:text-[#141414] hover:bg-[#FAF8F4] transition-colors border-b border-black/5"
      >
        Il Mio Account
      </Link>
      {user && (user.role === "partner" || user.role === "developer") && (
        <Link
          to="/partner"
          onClick={close}
          className="block px-5 py-3.5 text-[10px] uppercase tracking-[2px] text-[#141414]/60 hover:text-[#141414] hover:bg-[#FAF8F4] transition-colors border-b border-black/5"
        >
          Area Partner
        </Link>
      )}
      {user && user.role === "developer" && (
        <Link
          to="/admin"
          onClick={close}
          className="block px-5 py-3.5 text-[10px] uppercase tracking-[2px] text-[#141414]/60 hover:text-[#141414] hover:bg-[#FAF8F4] transition-colors border-b border-black/5"
        >
          Console Sviluppatore
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="block w-full text-left px-5 py-3.5 text-[10px] uppercase tracking-[2px] text-[#ef4444]/70 hover:text-[#ef4444] transition-colors"
      >
        Esci
      </button>
    </>
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/96 backdrop-blur-xl border-b border-black/[0.07]">
        {/* Striscia istituzionale superiore — solo desktop */}
        <div className="hidden lg:block border-b border-black/[0.06] bg-[#141414]">
          <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
            <span className="text-[9px] tracking-[3px] text-white/40 uppercase">
              Certificazione Ospitalità Italiana — Metodologia UNI 11312
            </span>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-[9px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <a href="mailto:info@revisore.it" className="text-[9px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">
                info@revisore.it
              </a>
            </div>
          </div>
        </div>

        {/* Barra principale */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" onClick={close} className="shrink-0 flex items-baseline gap-[6px]">
            <span className="font-serif font-semibold text-[18px] tracking-[0.22em] text-[#141414] leading-none">
              REVISORE
            </span>
            <span className="text-[#A8842C] font-serif text-[18px] leading-none">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => linkClass(isActive)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-2.5 text-[10px] uppercase tracking-[2px] text-[#141414]/60 hover:text-[#141414] transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-[#A8842C]/15 border border-[#A8842C]/40 flex items-center justify-center font-serif text-[#A8842C] text-sm font-semibold">
                    {user.name.charAt(0)}
                  </span>
                  {user.name.split(" ")[0]}
                </button>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 mt-3 w-60 bg-white border border-black/10 shadow-2xl z-10 py-1">
                      <p className="px-5 py-3 text-[9px] uppercase tracking-[2px] text-[#141414]/35 border-b border-black/8">
                        {user.email}
                        <span className="ml-2 text-[#A8842C]">/ {roleLabel}</span>
                      </p>
                      {accountLinks}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/accesso"
                className="px-5 py-2 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-[2.5px] hover:bg-[#A8842C] transition-colors"
              >
                Accedi
              </Link>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 touch-manipulation ml-auto"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
          >
            <span className={`block w-5 h-[1.5px] bg-[#141414] transition-all origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#141414] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#141414] transition-all origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden bg-[#FAF8F4] border-t border-black/[0.06] max-h-[calc(100vh-60px)] overflow-y-auto">
            <div className="px-5 pt-4 pb-6">
              {/* Nav links */}
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={close}
                  className={({ isActive }) =>
                    `block py-3.5 border-b border-black/[0.06] text-[11px] uppercase tracking-[2.5px] transition-colors ${
                      isActive ? "text-[#141414]" : "text-[#141414]/50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}

              {/* Account mobile */}
              <div className="pt-5 mt-2">
                {user ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/[0.06]">
                      <span className="w-9 h-9 rounded-full bg-[#A8842C]/15 border border-[#A8842C]/40 flex items-center justify-center font-serif text-[#A8842C] font-semibold">
                        {user.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#141414] leading-tight">{user.name}</p>
                        <p className="text-[9px] text-[#141414]/40 uppercase tracking-[2px] mt-0.5">{roleLabel}</p>
                      </div>
                    </div>
                    {accountLinks}
                  </div>
                ) : (
                  <Link
                    to="/accesso"
                    onClick={close}
                    className="block w-full text-center py-3.5 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-[2.5px]"
                  >
                    Accedi
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
