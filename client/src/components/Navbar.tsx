import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Piattaforma" },
  { to: "/places", label: "Strutture" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/targhe", label: "Targhe" },
  { to: "/abbonamenti", label: "Abbonamenti" },
  { to: "/trailer", label: "Trailer" },
  { to: "/chi-siamo", label: "Chi Siamo" },
  { to: "/media", label: "Media" },
];

function linkClass(isActive: boolean): string {
  return `font-sans text-xs uppercase tracking-widest transition-colors ${
    isActive ? "text-white" : "text-[#F0EADB]/60 hover:text-white"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    setOpen(false);
    navigate("/");
  };

  const roleLabel =
    user?.role === "developer" ? "Sviluppatore" : user?.role === "partner" ? "Partner" : "Utente";

  const accountLinks = (
    <>
      <Link
        to="/account"
        onClick={() => { setAccountOpen(false); setOpen(false); }}
        className="block px-4 py-2 text-xs uppercase tracking-widest text-[#F0EADB]/70 hover:text-white"
      >
        Il Mio Account
      </Link>
      {user && (user.role === "partner" || user.role === "developer") && (
        <Link
          to="/partner"
          onClick={() => { setAccountOpen(false); setOpen(false); }}
          className="block px-4 py-2 text-xs uppercase tracking-widest text-[#F0EADB]/70 hover:text-white"
        >
          Area Partner
        </Link>
      )}
      {user && user.role === "developer" && (
        <Link
          to="/admin"
          onClick={() => { setAccountOpen(false); setOpen(false); }}
          className="block px-4 py-2 text-xs uppercase tracking-widest text-[#F0EADB]/70 hover:text-white"
        >
          Console Sviluppatore
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-[#ef4444]/80 hover:text-[#ef4444]"
      >
        Esci
      </button>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#060606]/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => linkClass(isActive)}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#C9A84C]/40 rounded-full text-xs uppercase tracking-widest text-white hover:border-[#C9A84C]"
              >
                <span className="w-5 h-5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center font-brand text-[#C9A84C]">
                  {user.name.charAt(0)}
                </span>
                {user.name.split(" ")[0]}
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0A0A0A] border border-white/10 py-2 shadow-xl">
                  <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-white/10">
                    {user.email} — {roleLabel}
                  </p>
                  {accountLinks}
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/accesso"
              className="px-4 py-1.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#F0EADB] transition-colors"
            >
              Accedi
            </Link>
          )}
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Apri menu"
        >
          <span className={`block w-6 h-px bg-white transition-transform ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-transform ${open ? "-rotate-45 -translate-y-[9.5px]" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#060606]/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => linkClass(isActive)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="border-t border-white/10 pt-4">
            {user ? (
              <div className="-mx-4">{accountLinks}</div>
            ) : (
              <Link
                to="/accesso"
                onClick={() => setOpen(false)}
                className="inline-block px-4 py-1.5 bg-white text-black font-bold text-xs uppercase tracking-widest"
              >
                Accedi
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
