import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlace, useLiveScore, usePostRating } from "../api/hooks";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";
import { api } from "../api";

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
  label, weight, score, detail,
}: {
  label: string; weight: string; score: number | null; detail?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs uppercase tracking-widest text-[#141414]/70">
          {label} <span className="text-[#141414]/40">({weight})</span>
        </span>
        <span className="font-brand text-xl text-[#A8842C]">
          {score !== null ? score.toFixed(2) : "N/D"}
        </span>
      </div>
      <div className="mt-2 h-2 bg-[#E8E2D6]">
        <div
          className="h-full bg-[#A8842C] transition-all duration-1000"
          style={{ width: `${((score ?? 0) / 5) * 100}%` }}
        />
      </div>
      {detail && <p className="mt-1 text-xs text-[#141414]/40">{detail}</p>}
    </div>
  );
}

interface ScoreHistoryEntry {
  id: number;
  placeId: number;
  finalScore: number;
  recordedAt: string;
}

function ScoreHistoryChart({ history }: { history: ScoreHistoryEntry[] }) {
  if (history.length < 2) return null;
  const W = 400;
  const H = 100;
  const PAD = { top: 10, right: 10, bottom: 24, left: 32 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const scores = history.map((h) => h.finalScore);
  const minS = Math.max(0, Math.min(...scores) - 0.3);
  const maxS = Math.min(5, Math.max(...scores) + 0.3);
  const range = maxS - minS || 1;

  const toX = (i: number) => PAD.left + (i / (history.length - 1)) * innerW;
  const toY = (s: number) => PAD.top + (1 - (s - minS) / range) * innerH;

  const points = history.map((h, i) => `${toX(i)},${toY(h.finalScore)}`).join(" ");
  const areaPoints =
    `${toX(0)},${PAD.top + innerH} ` + points + ` ${toX(history.length - 1)},${PAD.top + innerH}`;

  const first = new Date(history[0].recordedAt).toLocaleDateString("it-IT", { month: "short", day: "numeric" });
  const last = new Date(history[history.length - 1].recordedAt).toLocaleDateString("it-IT", { month: "short", day: "numeric" });
  const latest = history[history.length - 1].finalScore;
  const delta = latest - history[0].finalScore;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <p className="text-[10px] uppercase tracking-widest text-[#141414]/40">Storico Score</p>
        <span className={`text-xs font-bold ${delta >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {delta >= 0 ? "+" : ""}{delta.toFixed(2)}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 100 }}>
        {/* Area fill */}
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8842C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#A8842C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#sg)" />
        <polyline points={points} fill="none" stroke="#A8842C" strokeWidth="2" strokeLinejoin="round" />
        {/* Axis labels */}
        <text x={PAD.left} y={H - 4} fontSize="9" fill="#999" textAnchor="start">{first}</text>
        <text x={W - PAD.right} y={H - 4} fontSize="9" fill="#999" textAnchor="end">{last}</text>
        <text x={PAD.left - 4} y={toY(maxS) + 4} fontSize="9" fill="#999" textAnchor="end">{maxS.toFixed(1)}</text>
        <text x={PAD.left - 4} y={toY(minS) + 4} fontSize="9" fill="#999" textAnchor="end">{minS.toFixed(1)}</text>
        {/* Dot finale */}
        <circle cx={toX(history.length - 1)} cy={toY(latest)} r="3" fill="#A8842C" />
      </svg>
    </div>
  );
}

type AnonMode = "full" | "first" | "anon";

export default function PlaceDetail() {
  const { id } = useParams();
  const placeId = Number(id);
  const place = usePlace(placeId);
  const live = useLiveScore(placeId);
  const postRating = usePostRating();
  const { user } = useAuth();

  const [score, setScore] = useState(4);
  const [comment, setComment] = useState("");
  const [anonMode, setAnonMode] = useState<AnonMode>("full");
  const [toast, setToast] = useState<{ ok: boolean; message: string } | null>(null);
  const [history, setHistory] = useState<ScoreHistoryEntry[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Carica storico score alla prima apertura
  if (!historyLoaded && place.data) {
    setHistoryLoaded(true);
    api.get<ScoreHistoryEntry[]>(`/places/${placeId}/score-history`)
      .then(({ data }) => setHistory(data))
      .catch(() => {});
  }

  if (place.isLoading || live.isLoading) return <LoadingSpinner />;
  if (place.isError || !place.data || live.isError || !live.data) {
    return (
      <ErrorMessage
        onRetry={() => { place.refetch(); live.refetch(); }}
      />
    );
  }

  const p = place.data;
  const ls = live.data;

  // Calcola display name in base alla modalità anonima scelta
  function getDisplayName(): { displayName: string | undefined; isAnonymous: boolean } {
    if (anonMode === "anon") return { displayName: undefined, isAnonymous: true };
    if (anonMode === "first") {
      const first = user!.name.split(" ")[0];
      return { displayName: first, isAnonymous: false };
    }
    return { displayName: user!.name, isAnonymous: false };
  }

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    const { displayName, isAnonymous } = getDisplayName();
    try {
      await postRating.mutateAsync({
        placeId,
        score,
        comment: comment.trim() || undefined,
        displayName,
        isAnonymous,
      });
      setToast({ ok: true, message: "Valutazione inviata. Grazie per il tuo contributo." });
      setComment("");
      setScore(4);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error === "Hai già valutato questa struttura."
          ? "Hai già valutato questa struttura."
          : "Invio non riuscito. Riprova tra qualche istante.";
      setToast({ ok: false, message: msg });
    }
    setTimeout(() => setToast(null), 4500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      {toast && (
        <div
          className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50 px-5 py-4 border bg-white text-sm tracking-wide text-center sm:text-left ${
            toast.ok ? "border-[#22c55e] text-[#22c55e]" : "border-[#ef4444] text-[#ef4444]"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* HERO */}
      <FadeInSection>
        <h1 className="font-brand text-4xl sm:text-6xl lg:text-7xl text-[#8F6F25] uppercase tracking-wide leading-tight sm:leading-none">
          {p.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-[#141414]/60">
            {TYPE_LABELS[p.type] ?? p.type} · {p.city}
          </p>
          <StatusBadge status={p.plaqueStatus} size="md" />
        </div>
      </FadeInSection>

      {/* PANNELLO SCORE */}
      <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <FadeInSection>
          <p className="text-[10px] tracking-widest text-[#141414]/40">SCORE FINALE LIVE</p>
          <p className="font-brand text-7xl sm:text-8xl text-[#8F6F25] leading-none mt-2">
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

          {/* Storico score */}
          {history.length >= 2 && (
            <div className="mt-10 border-t border-black/10 pt-8">
              <ScoreHistoryChart history={history} />
            </div>
          )}
        </FadeInSection>

        <FadeInSection delay={150}>
          <h2 className="font-serif font-semibold text-2xl text-[#141414]">INFO STRUTTURA</h2>
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
                <dt className="text-[#141414]/40 w-32 shrink-0">{label}</dt>
                <dd className="text-[#141414]/80">{value}</dd>
              </div>
            ))}
          </dl>

          {/* QR Code targa */}
          <div className="mt-8 border border-black/10 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-3">QR Targa</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://revisore.vercel.app/strutture/${p.id}`)}&color=141414&bgcolor=FAF8F4`}
              alt="QR code struttura"
              className="w-24 h-24"
            />
            <p className="mt-2 text-xs text-[#141414]/40">
              Scannerizza per accedere alla scheda live.
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* VALUTAZIONI COMMUNITY */}
      <FadeInSection className="mt-20">
        <h2 className="font-serif font-semibold text-2xl text-[#141414]">VALUTAZIONI COMMUNITY</h2>
        {p.recentRatings.length === 0 ? (
          <p className="mt-6 font-serif italic text-[#141414]/50">
            Nessuna valutazione ancora. Lascia la prima.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-black/10">
            {p.recentRatings.map((r: any) => (
              <li key={r.id} className="py-4 sm:py-5 flex gap-3 sm:gap-4">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#A8842C]/20 border border-black/15 flex items-center justify-center font-brand text-[#A8842C]">
                  {r.isAnonymous ? "?" : r.authorName.charAt(0)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#141414]">{r.authorName}</span>
                    {/* Badge verificato = ha un account */}
                    {r.isVerified && (
                      <span
                        title="Utente verificato"
                        className="text-[#A8842C] text-[11px] leading-none"
                      >
                        ●
                      </span>
                    )}
                    <span className="font-brand text-xl text-[#8F6F25]">{r.score.toFixed(1)}</span>
                  </div>
                  {r.comment && (
                    <p className="mt-1 font-serif italic text-[#141414]/60">{r.comment}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </FadeInSection>

      {/* FORM VALUTAZIONE */}
      <FadeInSection className="mt-16">
        <div className="border border-black/10 bg-white p-8">
          <h2 className="font-serif font-semibold text-2xl text-[#141414]">
            LASCIA LA TUA VALUTAZIONE
          </h2>
          {!user ? (
            <p className="mt-6 font-serif italic text-[#141414]/60">
              Per lasciare una valutazione devi{" "}
              <Link
                to="/accesso"
                className="text-[#A8842C] not-italic font-sans text-sm uppercase tracking-widest hover:text-[#141414]"
              >
                accedere o registrarti
              </Link>
              .
            </p>
          ) : (
            <form onSubmit={submitRating} className="mt-6 space-y-6">
              {/* Scelta nome visualizzato */}
              <div>
                <p className="text-xs uppercase tracking-widest text-[#141414]/60 mb-3">
                  Visualizzato come
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { mode: "full" as AnonMode, label: user.name },
                    { mode: "first" as AnonMode, label: user.name.split(" ")[0] },
                    { mode: "anon" as AnonMode, label: "Utente Verificato" },
                  ].map(({ mode, label }) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAnonMode(mode)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        anonMode === mode
                          ? "bg-[#141414] text-white border-[#141414]"
                          : "bg-white text-[#141414]/60 border-black/20 hover:border-[#141414]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider voto */}
              <div>
                <label className="flex items-center justify-between text-xs uppercase tracking-widest text-[#141414]/60">
                  Il tuo voto
                  <span className="font-brand text-3xl text-[#8F6F25]">{score.toFixed(1)}</span>
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

              {/* Commento */}
              <div>
                <label className="text-xs uppercase tracking-widest text-[#141414]/60">
                  Commento (opzionale, max 300 caratteri)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 300))}
                  rows={3}
                  className="mt-2 w-full bg-[#FAF8F4] border border-black/15 px-4 py-3 text-[#141414] focus:border-[#A8842C] focus:outline-none"
                  placeholder="Racconta la tua esperienza..."
                  style={{ fontSize: "16px" }}
                />
                <p className="mt-1 text-right text-[10px] text-[#141414]/30">{comment.length}/300</p>
              </div>

              <button
                type="submit"
                disabled={postRating.isPending}
                className="w-full sm:w-auto px-8 py-4 bg-[#A8842C] text-white font-bold uppercase tracking-widest hover:bg-[#8F6F25] active:bg-[#8F6F25] transition-colors disabled:opacity-50 touch-manipulation"
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
