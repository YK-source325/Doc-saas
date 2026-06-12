import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import FadeInSection from "../components/FadeInSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

interface MyRating {
  id: number;
  placeId: number;
  score: number;
  comment: string | null;
  isAnonymous: boolean;
  displayName: string | null;
  createdAt: string;
  placeName: string;
  placeCity: string;
}


export default function Account() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"ratings" | "settings">("ratings");

  const ratings = useQuery({
    queryKey: ["my-ratings"],
    queryFn: async () => {
      const { data } = await api.get<MyRating[]>("/account/ratings");
      return data;
    },
  });

  const average =
    ratings.data && ratings.data.length > 0
      ? ratings.data.reduce((a, r) => a + r.score, 0) / ratings.data.length
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      {/* HEADER PERSONALE */}
      <FadeInSection>
        <span className="px-4 py-1 border border-[#A8842C]/40 text-[10px] tracking-widest text-[#A8842C]">
          AREA PERSONALE
        </span>
        <div className="mt-6 flex items-center gap-6">
          <span className="w-16 h-16 rounded-full bg-[#A8842C]/15 border-2 border-[#A8842C] flex items-center justify-center font-brand text-3xl text-[#A8842C]">
            {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
          </span>
          <div>
            <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-[#141414]">
              {user?.name}
            </h1>
            <p className="mt-1 text-sm text-[#141414]/50">{user?.email}</p>
            <span className="mt-2 inline-block px-2 py-0.5 border border-[#141414]/20 text-[9px] tracking-[2px] uppercase text-[#141414]/40">
              {user?.role === "user" ? "Utente" : user?.role === "partner" ? "Partner" : "Developer"}
            </span>
          </div>
        </div>
      </FadeInSection>

      {/* KPI PERSONALI — solo dati dell'utente, niente KPI aziendali */}
      <FadeInSection className="mt-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-black/10 p-6">
            <p className="font-brand text-5xl text-[#141414]">
              {ratings.data?.length ?? "—"}
            </p>
            <p className="mt-2 text-[10px] tracking-widest text-[#141414]/40">
              VALUTAZIONI LASCIATE
            </p>
          </div>
          <div className="bg-white border border-black/10 p-6">
            <p className="font-brand text-5xl text-[#A8842C]">
              {average !== null ? average.toFixed(2) : "—"}
            </p>
            <p className="mt-2 text-[10px] tracking-widest text-[#141414]/40">
              IL TUO VOTO MEDIO
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* TAB NAVIGATION */}
      <FadeInSection className="mt-10">
        <div className="flex border-b border-black/10">
          {(["ratings", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[11px] uppercase tracking-[3px] transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#A8842C] text-[#A8842C]"
                  : "border-transparent text-[#141414]/40 hover:text-[#141414]"
              }`}
            >
              {tab === "ratings" ? "Le Mie Valutazioni" : "Impostazioni"}
            </button>
          ))}
        </div>

        {/* TAB: LE MIE VALUTAZIONI */}
        {activeTab === "ratings" && (
          <div className="mt-8">
            {ratings.isLoading && <LoadingSpinner />}
            {ratings.isError && <ErrorMessage onRetry={() => ratings.refetch()} />}
            {ratings.data && ratings.data.length === 0 && (
              <div className="border border-black/10 bg-white p-10 text-center">
                <p className="font-serif italic text-[#141414]/60">
                  Non hai ancora valutato nessuna struttura.
                </p>
                <Link
                  to="/strutture"
                  className="mt-6 inline-block px-6 py-3 bg-[#A8842C] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#8F6F25] transition-colors"
                >
                  Esplora le Strutture →
                </Link>
              </div>
            )}
            {ratings.data && ratings.data.length > 0 && (
              <ul className="divide-y divide-black/10 border border-black/10 bg-white">
                {ratings.data.map((r) => (
                  <li key={r.id} className="p-5 hover:bg-[#A8842C]/5 transition-colors">
                    <Link to={`/places/${r.placeId}`} className="flex items-start gap-5">
                      <span className="font-brand text-3xl text-[#A8842C] w-16 shrink-0 pt-0.5">
                        {r.score.toFixed(1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-lg text-[#141414] truncate">
                          {r.placeName}{" "}
                          <span className="text-[#141414]/40 text-sm">· {r.placeCity}</span>
                        </p>
                        {r.comment && (
                          <p className="mt-0.5 font-serif italic text-sm text-[#141414]/60 line-clamp-2">
                            «{r.comment}»
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center gap-3">
                          <span className="text-[10px] tracking-[2px] text-[#141414]/30">
                            {new Date(r.createdAt).toLocaleDateString("it-IT", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          {r.isAnonymous && (
                            <span className="text-[9px] tracking-[1px] uppercase text-[#141414]/25 border border-black/10 px-1.5 py-0.5">
                              Anonima
                            </span>
                          )}
                          {r.displayName && !r.isAnonymous && (
                            <span className="text-[10px] text-[#141414]/40">
                              come {r.displayName}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* TAB: IMPOSTAZIONI */}
        {activeTab === "settings" && (
          <div className="mt-8 space-y-6">
            {/* Dati personali — solo lettura per ora */}
            <div className="border border-black/10 bg-white p-8">
              <h3 className="font-serif font-semibold text-xl text-[#141414]">Dati personali</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-[#141414]/40">
                    Nome
                  </label>
                  <p className="mt-1 text-base text-[#141414]">{user?.name}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-[#141414]/40">
                    Email
                  </label>
                  <p className="mt-1 text-base text-[#141414]">{user?.email}</p>
                </div>
              </div>
              <p className="mt-6 text-xs text-[#141414]/30 italic">
                Per modificare i tuoi dati contatta il supporto.
              </p>
            </div>

            {/* Privacy */}
            <div className="border border-black/10 bg-white p-8">
              <h3 className="font-serif font-semibold text-xl text-[#141414]">Privacy</h3>
              <p className="mt-3 text-sm text-[#141414]/50 leading-relaxed">
                Puoi scegliere di pubblicare le tue valutazioni in modo anonimo — il tuo nome 
                non sarà visibile agli altri utenti. L'impostazione si applica a ogni singola 
                valutazione al momento dell'invio.
              </p>
            </div>
          </div>
        )}
      </FadeInSection>
    </div>
  );
}
