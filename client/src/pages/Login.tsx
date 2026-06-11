import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

export const inputClass =
  "w-full bg-[#060606] border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const user = await login(email, password);
      if (from !== "/") navigate(from, { replace: true });
      else if (user.role === "developer") navigate("/admin");
      else if (user.role === "partner") navigate("/partner");
      else navigate("/");
    } catch (err) {
      setError(
        isAxiosError(err) && err.response?.status === 401
          ? "Credenziali non valide."
          : "Accesso non riuscito. Riprova."
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="gold-grid min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-[#C9A84C]/20 p-10">
        <h1 className="font-brand text-4xl text-[#DCBD6B] tracking-widest text-center">ACCEDI</h1>
        <p className="mt-2 font-serif italic text-center text-[#F0EADB]/60">
          Entra nella piattaforma REVISORE.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-5">
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
            <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-[#ef4444]">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full px-8 py-3 bg-[#C9A84C] text-black font-bold uppercase tracking-widest hover:bg-[#DCBD6B] transition-colors disabled:opacity-50"
          >
            {pending ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#F0EADB]/50">
          Non hai un account?{" "}
          <Link to="/registrati" className="text-[#C9A84C] hover:text-[#DCBD6B] uppercase tracking-widest text-xs">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
