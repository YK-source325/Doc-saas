import { createContext, useContext, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useMe } from "../api/hooks";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useMe();

  const login = async (email: string, password: string) => {
    const { data } = await api.post<User>("/auth/login", { email, password });
    queryClient.setQueryData(["me"], data);
    return data;
  };

  const register = async (email: string, password: string, name: string) => {
    const { data } = await api.post<User>("/auth/register", { email, password, name });
    queryClient.setQueryData(["me"], data);
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    queryClient.setQueryData(["me"], null);
  };

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, loading: isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
}
