import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types";

const inputClass =
  "w-full bg-[#060606] border border-white/15 px-4 py-3 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none";

const AREAS = [
  { title: "UTENTI", desc: "Valuta le strutture e segui i punteggi live dal tuo account personale." },
  { title: "PARTNER", desc: "Area riservata agli investitori: numeri reali, modello di ricavo, proiezioni." },
  { title: "SVILUPPATORE", desc: "Console completa: gestione strutture, targhe e richieste di abbonamento." },
];

export default function Accesso() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const afterLogin = (user: User) => {
    if (from) return navigate(from, { replace: true });
    if (user.role === "developer") return navigate("/admin");
    if (user.role === "partner") return navigate("/partner");
    navigate("/account");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && password.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      return;
    }
    setPending(true);
    try {
      const user =
        mode === "login" ? await login(email, password) : await register(email, password, name);
      afterLogin(user);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) setError("Credenziali non valide.");
      else if (isAxiosError(err) && err.response?.status === 409) setError("Questa email è già registrata.");
      else setError("Operazione non riuscita. Riprova.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="gold-grid min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-[#0a0a0a]">
        {/* Pannello istituzionale */}
        <div className="hidden lg:flex flex-col justify-center items-center gap-6 p-12 border-r border-white/10 bg-[#060606]">
          <p className="font-serif font-semibold text-4xl tracking-[0.18em] text-white">
            REVISORE<span className="text-[#C9A84C]">.</span>
          </p>
          <p className="text-[10px] uppercase tracking-[4px] text-[#C9A84C]">
            Un accesso unico, tre mondi
          </p>
          <div className="space-y-5 mt-2">
            {AREAS.map((a) => (
              <div key={a.title}>
                <p className="text-xs font-bold tracking-widest text-white">{a.title}</p>
                <p className="mt-1 font-serif italic text-sm text-[#F0EADB]/60">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-12">
          <div className="flex border border-white/15">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                  mode === m ? "bg-white text-black" : "text-[#F0EADB]/60 hover:text-white"
                }`}
              >
                {m === "login" ? "Accedi" : "Registrati"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {mode === "register" && (
              <div>
                <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Nome e cognome</label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-2 ${inputClass}`}
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-2 ${inputClass}`}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">
                Password{mode === "register" ? " (min 8 caratteri)" : ""}
              </label>
              <input
                type="password"
                required
                minLength={mode === "register" ? 8 : 1}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-2 ${inputClass}`}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
              />
            </div>
            {error && <p className="text-sm text-[#ef4444]">{error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#F0EADB] transition-colors disabled:opacity-50"
            >
              {pending
                ? "Un istante..."
                : mode === "login"
                  ? "Entra nella Piattaforma"
                  : "Crea il Tuo Account"}
            </button>
            {mode === "register" && (
              <p className="text-[10px] text-[#F0EADB]/40 leading-relaxed">
                La registrazione crea un account utente gratuito. Gli accessi partner e sviluppatore
                vengono assegnati direttamente dal fondatore.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
