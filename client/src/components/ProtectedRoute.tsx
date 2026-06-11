import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import type { Role } from "../types";

interface Props {
  roles: Role[];
  children: ReactNode;
}

export default function ProtectedRoute({ roles, children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/accesso" state={{ from: location.pathname }} replace />;
  if (!roles.includes(user.role)) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-brand text-5xl text-[#8F6F25]">ACCESSO RISERVATO</h1>
        <p className="mt-4 font-serif italic text-[#141414]/60">
          Il tuo account non dispone dei permessi necessari per questa area.
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
