import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlace, useLiveScore, usePostRating } from "../api/hooks";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";

const TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Ristorante",
  bar: "Bar",
  agriturismo: "Agriturismo",
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

function ScoreBar({
  label,
  weight,
  score,
  detail,
}: {
  label: string;
  weight: string;
  score: number | null;
  detail?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs uppercase tracking-widest text-[#F0EADB]/70">
          {label} <span className="text-[#F0EADB]/40">({weight})</span>
        </span>
        <span className="font-brand text-xl text-[#C9A84C]">
          {score !== null ? score.toFixed(2) : "N/D"}
        </span>
      </div>
      <div className="mt-2 h-2 bg-[#1a1a1a]">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-1000"
          style={{ width: `${((score ?? 0) / 5) * 100}%` }}
        />
      </div>
      {detail && <p className="mt-1 text-xs text-[#F0EADB]/40">{detail}</p>}
    </div>
  );
}

export default function PlaceDetail() {
  const { id } = useParams();
  const placeId = Number(id);
  const place = usePlace(placeId);
  const live = useLiveScore(placeId);
  const postRating = usePostRating();
  const { user } = useAuth();

  const [score, setScore] = useState(4);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState<{ ok: boolean; message: string } | null>(null);

  if (place.isLoading || live.isLoading) return <LoadingSpinner />;
  if (place.isError || !place.data || live.isError || !live.data) {
    return (
      <ErrorMessage
        onRetry={() => {
          place.refetch();
          live.refetch();
        }}
      />
    );
  }

  const p = place.data;
  const ls = live.data;

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postRating.mutateAsync({ placeId, score, comment: comment.trim() || undefined });
      setToast({ ok: true, message: "Valutazione inviata. Grazie per il tuo contributo." });
      setComment("");
      setScore(4);
    } catch {
      setToast({ ok: false, message: "Invio non riuscito. Riprova tra qualche istante." });
    }
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-6 py-4 border bg-[#0a0a0a] text-sm tracking-wide ${
            toast.ok ? "border-[#22c55e] text-[#22c55e]" : "border-[#ef4444] text-[#ef4444]"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* HERO */}
      <FadeInSection>
        <h1 className="font-brand text-5xl sm:text-7xl text-[#DCBD6B] uppercase tracking-wide leading-none">
          {p.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-[#F0EADB]/60">
            {TYPE_LABELS[p.type] ?? p.type} · {p.city}
          </p>
          <StatusBadge status={p.plaqueStatus} size="md" />
        </div>
      </FadeInSection>

      {/* PANNELLO SCORE */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <FadeInSection>
          <p className="text-[10px] tracking-widest text-[#F0EADB]/40">SCORE FINALE LIVE</p>
          <p className="font-brand text-8xl text-[#DCBD6B] leading-none mt-2">
            {ls.finalScore.toFixed(2)}
          </p>
          <div className="mt-10 space-y-8">
            <ScoreBar label="Ispezione Revisore" weight="40%" score={ls.revisoreScore} />
            <ScoreBar
              label="Reputazione Online"
              weight="30%"
              score={ls.onlinePlatformScore}
              detail={`Google: ${ls.googleScore?.toFixed(1) ?? "N/D"}  |  TripAdvisor: ${ls.tripadvisorScore?.toFixed(1) ?? "N/D"}`}
            />
            <ScoreBar label="Community Score" weight="30%" score={ls.communityScore} />
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <h2 className="font-brand text-2xl text-[#C9A84C] tracking-widest">INFO STRUTTURA</h2>
          <dl className="mt-6 space-y-4 text-sm">
            {[
              ["Indirizzo", p.address],
              ["Data ispezione", formatDate(p.inspectedAt)],
              ["Targa emessa", formatDate(p.plaqueIssuedAt)],
              ["Scadenza rinnovo", formatDate(ls.renewalDueAt)],
              ["Mesi attivo", ls.monthsActive !== null ? `${ls.monthsActive} mesi` : "—"],
              ["Valutazioni community", `${p.communityRatingCount}`],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <dt className="text-[#F0EADB]/40 w-32 shrink-0">{label}</dt>
                <dd className="text-[#F0EADB]/80">{value}</dd>
              </div>
            ))}
          </dl>
        </FadeInSection>
      </div>

      {/* VALUTAZIONI COMMUNITY */}
      <FadeInSection className="mt-20">
        <h2 className="font-brand text-2xl text-[#C9A84C] tracking-widest">VALUTAZIONI COMMUNITY</h2>
        {p.recentRatings.length === 0 ? (
          <p className="mt-6 font-serif italic text-[#F0EADB]/50">
            Nessuna valutazione ancora. Lascia la prima.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-[#C9A84C]/10">
            {p.recentRatings.map((r) => (
              <li key={r.id} className="py-5 flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center font-brand text-[#C9A84C]">
                  {r.authorName.charAt(0)}
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-[#F0EADB]">{r.authorName}</span>
                    <span className="font-brand text-xl text-[#DCBD6B]">{r.score.toFixed(1)}</span>
                  </div>
                  {r.comment && (
                    <p className="mt-1 font-serif italic text-[#F0EADB]/60">{r.comment}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </FadeInSection>

      {/* FORM VALUTAZIONE */}
      <FadeInSection className="mt-16">
        <div className="border border-[#C9A84C]/20 bg-[#0a0a0a] p-8">
          <h2 className="font-brand text-2xl text-[#C9A84C] tracking-widest">
            LASCIA LA TUA VALUTAZIONE
          </h2>
          {!user ? (
            <p className="mt-6 font-serif italic text-[#F0EADB]/60">
              Per lasciare una valutazione devi{" "}
              <Link to="/login" className="text-[#C9A84C] not-italic font-sans text-sm uppercase tracking-widest hover:text-[#DCBD6B]">
                accedere
              </Link>{" "}
              oppure{" "}
              <Link to="/registrati" className="text-[#C9A84C] not-italic font-sans text-sm uppercase tracking-widest hover:text-[#DCBD6B]">
                registrarti
              </Link>
              .
            </p>
          ) : (
            <form onSubmit={submitRating} className="mt-6 space-y-6">
              <p className="text-sm text-[#F0EADB]/60">
                Valuti come <span className="text-[#C9A84C] font-bold">{user.name}</span>
              </p>
              <div>
                <label className="flex items-center justify-between text-xs uppercase tracking-widest text-[#F0EADB]/60">
                  Il tuo voto
                  <span className="font-brand text-3xl text-[#DCBD6B]">{score.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="gold-slider w-full mt-3"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">
                  Commento (opzionale, max 300 caratteri)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 300))}
                  rows={3}
                  className="mt-2 w-full bg-[#060606] border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none"
                  placeholder="Racconta la tua esperienza..."
                />
                <p className="mt-1 text-right text-[10px] text-[#F0EADB]/30">{comment.length}/300</p>
              </div>
              <button
                type="submit"
                disabled={postRating.isPending}
                className="px-8 py-3 bg-[#C9A84C] text-black font-bold uppercase tracking-widest hover:bg-[#DCBD6B] transition-colors disabled:opacity-50"
              >
                {postRating.isPending ? "Invio in corso..." : "Invia Valutazione"}
              </button>
            </form>
          )}
        </div>
      </FadeInSection>
    </div>
  );
}
