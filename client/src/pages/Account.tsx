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
  createdAt: string;
  placeName: string;
  placeCity: string;
}

export default function Account() {
  const { user } = useAuth();
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
      <FadeInSection>
        <span className="px-4 py-1 border border-[#C9A84C]/40 text-[10px] tracking-widest text-[#C9A84C]">
          AREA PERSONALE
        </span>
        <div className="mt-6 flex items-center gap-6">
          <span className="w-16 h-16 rounded-full bg-[#C9A84C]/15 border-2 border-[#C9A84C] flex items-center justify-center font-brand text-3xl text-[#C9A84C]">
            {user?.name.charAt(0)}
          </span>
          <div>
            <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-white">{user?.name}</h1>
            <p className="mt-1 text-sm text-[#F0EADB]/50">{user?.email}</p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="mt-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0a0a0a] border border-white/10 p-6">
            <p className="font-brand text-5xl text-white">{ratings.data?.length ?? "—"}</p>
            <p className="mt-2 text-[10px] tracking-widest text-[#F0EADB]/40">VALUTAZIONI LASCIATE</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-6">
            <p className="font-brand text-5xl text-[#C9A84C]">
              {average !== null ? average.toFixed(2) : "—"}
            </p>
            <p className="mt-2 text-[10px] tracking-widest text-[#F0EADB]/40">IL TUO VOTO MEDIO</p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="mt-12">
        <h2 className="font-serif font-semibold text-2xl text-white">LE MIE VALUTAZIONI</h2>
        {ratings.isLoading && <LoadingSpinner />}
        {ratings.isError && <ErrorMessage onRetry={() => ratings.refetch()} />}
        {ratings.data && ratings.data.length === 0 && (
          <div className="mt-6 border border-white/10 bg-[#0a0a0a] p-10 text-center">
            <p className="font-serif italic text-[#F0EADB]/60">
              Non hai ancora valutato nessuna struttura.
            </p>
            <Link
              to="/places"
              className="mt-6 inline-block px-6 py-3 bg-[#C9A84C] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#DCBD6B] transition-colors"
            >
              Esplora le Strutture →
            </Link>
          </div>
        )}
        {ratings.data && ratings.data.length > 0 && (
          <ul className="mt-6 divide-y divide-white/10 border border-white/10 bg-[#0a0a0a]">
            {ratings.data.map((r) => (
              <li key={r.id} className="p-5 hover:bg-[#C9A84C]/5 transition-colors">
                <Link to={`/places/${r.placeId}`} className="flex items-center gap-5">
                  <span className="font-brand text-3xl text-[#C9A84C] w-16 shrink-0">
                    {r.score.toFixed(1)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-lg text-white truncate">
                      {r.placeName} <span className="text-[#F0EADB]/40 text-sm">· {r.placeCity}</span>
                    </p>
                    {r.comment && (
                      <p className="mt-0.5 font-serif italic text-sm text-[#F0EADB]/60 truncate">
                        {r.comment}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </FadeInSection>
    </div>
  );
}
