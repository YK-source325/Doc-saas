import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Piattaforma" },
  { to: "/strutture", label: "Strutture" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/targhe", label: "Targhe" },
  { to: "/abbonamenti", label: "Abbonamenti" },
  { to: "/trailer", label: "Trailer" },
  { to: "/chi-siamo", label: "Chi Siamo" },
  { to: "/media", label: "Media" },
];

function linkClass(isActive: boolean): string {
  return `font-sans text-xs uppercase tracking-widest transition-colors py-1 ${
    isActive ? "text-[#141414]" : "text-[#141414]/60 hover:text-[#141414]"
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
        className="block px-5 py-3 text-xs uppercase tracking-widest text-[#141414]/70 hover:text-[#141414] hover:bg-black/[0.03] transition-colors"
      >
        Il Mio Account
      </Link>
      {user && (user.role === "partner" || user.role === "developer") && (
        <Link
          to="/partner"
          onClick={close}
          className="block px-5 py-3 text-xs uppercase tracking-widest text-[#141414]/70 hover:text-[#141414] hover:bg-black/[0.03] transition-colors"
        >
          Area Partner
        </Link>
      )}
      {user && user.role === "developer" && (
        <Link
          to="/admin"
          onClick={close}
          className="block px-5 py-3 text-xs uppercase tracking-widest text-[#141414]/70 hover:text-[#141414] hover:bg-black/[0.03] transition-colors"
        >
          Console Sviluppatore
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="block w-full text-left px-5 py-3 text-xs uppercase tracking-widest text-[#ef4444]/80 hover:text-[#ef4444] hover:bg-red-50/50 transition-colors"
      >
        Esci
      </button>
    </>
  );

  return (
    <>
      {/* Overlay mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={close}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FAF8F4]/90 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" onClick={close} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5">
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
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#A8842C]/40 rounded-full text-xs uppercase tracking-widest text-[#141414] hover:border-[#A8842C] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#A8842C]/20 border border-[#A8842C]/40 flex items-center justify-center font-brand text-[#A8842C]">
                    {user.name.charAt(0)}
                  </span>
                  {user.name.split(" ")[0]}
                </button>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-black/10 py-1 shadow-xl z-10">
                      <p className="px-5 py-2 text-[10px] uppercase tracking-widest text-[#141414]/40 border-b border-black/10">
                        {user.email} — {roleLabel}
                      </p>
                      {accountLinks}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/accesso"
                className="px-4 py-1.5 bg-[#141414] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#A8842C] transition-colors"
              >
                Accedi
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 touch-manipulation"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
          >
            <span className={`block w-6 h-[2px] bg-[#141414] transition-transform origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#141414] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#141414] transition-transform origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden bg-[#FAF8F4] border-t border-black/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-5 py-5 flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={close}
                  className={({ isActive }) =>
                    `block py-3 border-b border-black/5 font-sans text-sm uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#141414]" : "text-[#141414]/60"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}

              {/* Account section mobile */}
              <div className="pt-4 mt-2 border-t border-black/10">
                {user ? (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-[#A8842C]/20 border border-[#A8842C]/40 flex items-center justify-center font-brand text-[#A8842C] text-sm">
                        {user.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#141414]">{user.name}</p>
                        <p className="text-[10px] text-[#141414]/40 uppercase tracking-widest">{roleLabel}</p>
                      </div>
                    </div>
                    {accountLinks}
                  </div>
                ) : (
                  <Link
                    to="/accesso"
                    onClick={close}
                    className="block w-full text-center py-3 bg-[#141414] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#A8842C] transition-colors"
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
