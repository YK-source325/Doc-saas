import { useEffect, useRef, useState } from "react";
import { usePlaces } from "../api/hooks";
import PlaceCard from "../components/PlaceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";

declare const L: any; // Leaflet loaded via CDN

const inputClass =
  "bg-white border border-black/15 px-4 py-3 text-sm text-[#141414] focus:border-[#A8842C] focus:outline-none w-full";

// Prevents iOS zoom on select/input focus
const noZoomClass = "text-base sm:text-sm";

const TYPE_COLORS: Record<string, string> = {
  hotel: "#A8842C",
  restaurant: "#22c55e",
  bar: "#3b82f6",
  agriturismo: "#f59e0b",
};

interface PlacesProps {
  defaultView?: "grid" | "map";
}

export default function Places({ defaultView = "grid" }: PlacesProps) {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<"score_desc" | "score_asc" | "name_asc" | "recent">("score_desc");
  const [minScore, setMinScore] = useState(0);
  const [view, setView] = useState<"grid" | "map">(defaultView);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setCity(cityInput), 300);
    return () => clearTimeout(timer);
  }, [cityInput]);

  const places = usePlaces({
    city: city || undefined,
    type: type || undefined,
    status: status || undefined,
    sort: sort || undefined,
    minScore: minScore > 0 ? minScore : undefined,
  });

  // Init mappa Leaflet
  useEffect(() => {
    if (view !== "map") return;
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([42.5, 12.5], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    mapInstanceRef.current = map;
    // Forza resize dopo mount (fix iOS)
    setTimeout(() => map.invalidateSize(), 200);
  }, [view]);

  // Aggiorna marker
  useEffect(() => {
    if (view !== "map" || !mapInstanceRef.current || !places.data) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.data.forEach((p) => {
      if (!p.lat || !p.lng) return;
      const color = TYPE_COLORS[p.type] ?? "#A8842C";
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          background:${color};
          color:white;
          border-radius:4px;
          padding:4px 8px;
          font-size:12px;
          font-weight:700;
          font-family:Inter,sans-serif;
          white-space:nowrap;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          border:2px solid white;
        ">${p.finalScore.toFixed(1)}</div>`,
        iconAnchor: [22, 14],
      });
      const marker = L.marker([p.lat, p.lng], { icon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:160px;padding:4px 0">
            <strong style="font-size:14px;color:#141414">${p.name}</strong><br/>
            <span style="font-size:12px;color:#777">${p.city} · ${p.type}</span><br/>
            <span style="font-size:15px;color:${color};font-weight:700">${p.finalScore.toFixed(2)} / 5</span>
            <br/><a href="/strutture/${p.id}" style="color:#A8842C;font-size:12px;text-decoration:underline;display:inline-block;margin-top:6px">Vedi scheda →</a>
          </div>
        `);
      markersRef.current.push(marker);
    });
  }, [view, places.data]);

  // Distruggi mappa quando torna griglia
  useEffect(() => {
    if (view === "grid" && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  }, [view]);

  const activeFiltersCount = [city, type, status, minScore > 0 ? "score" : ""].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <FadeInSection>
        <h1 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-7xl text-[#141414] leading-tight">
          STRUTTURE ISPEZIONATE
        </h1>
        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#141414]/60">
          Directory in tempo reale delle strutture certificate dal Revisore.
        </p>
      </FadeInSection>

      {/* FILTRI DESKTOP */}
      <div className="mt-8 hidden sm:block space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Cerca per città..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className={`${inputClass} ${noZoomClass}`}
          />
          <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputClass} ${noZoomClass}`}>
            <option value="">Tutte le categorie</option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Ristorante</option>
            <option value="bar">Bar</option>
            <option value="agriturismo">Agriturismo</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} ${noZoomClass}`}>
            <option value="">Tutti gli stati</option>
            <option value="active">Attiva</option>
            <option value="warning">Attenzione</option>
            <option value="at_risk">A rischio</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "score_desc" | "score_asc" | "name_asc" | "recent")}
            className={`${inputClass} ${noZoomClass}`}
          >
            <option value="score_desc">Punteggio ↓</option>
            <option value="score_asc">Punteggio ↑</option>
            <option value="name_asc">Nome A–Z</option>
            <option value="recent">Più recenti</option>
          </select>
        </div>
        {/* Score slider */}
        <div className="flex items-center gap-4 bg-white border border-black/10 px-5 py-4">
          <span className="text-xs uppercase tracking-widest text-[#141414]/50 shrink-0">
            Punteggio minimo
          </span>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="gold-slider flex-1"
          />
          <span className="font-brand text-2xl text-[#A8842C] w-10 text-right shrink-0">
            {minScore > 0 ? minScore.toFixed(1) : "—"}
          </span>
          {minScore > 0 && (
            <button
              onClick={() => setMinScore(0)}
              className="text-xs text-[#141414]/40 hover:text-[#141414] underline shrink-0"
            >
              reset
            </button>
          )}
        </div>
      </div>

      {/* FILTRI MOBILE — collapsible */}
      <div className="mt-6 sm:hidden">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-black/15 text-xs uppercase tracking-widest text-[#141414]/70 touch-manipulation"
        >
          <span className="flex items-center gap-2">
            Filtri
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#A8842C] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {filtersOpen && (
          <div className="border border-t-0 border-black/15 bg-white p-4 space-y-3">
            <input
              type="text"
              placeholder="Cerca per città..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className={`${inputClass} ${noZoomClass}`}
              style={{ fontSize: "16px" }}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${inputClass} ${noZoomClass}`}
              style={{ fontSize: "16px" }}
            >
              <option value="">Tutte le categorie</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Ristorante</option>
              <option value="bar">Bar</option>
              <option value="agriturismo">Agriturismo</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`${inputClass} ${noZoomClass}`}
              style={{ fontSize: "16px" }}
            >
              <option value="">Tutti gli stati</option>
              <option value="active">Attiva</option>
              <option value="warning">Attenzione</option>
              <option value="at_risk">A rischio</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "score_desc" | "score_asc" | "name_asc" | "recent")}
              className={`${inputClass} ${noZoomClass}`}
              style={{ fontSize: "16px" }}
            >
              <option value="score_desc">Punteggio ↓</option>
              <option value="score_asc">Punteggio ↑</option>
              <option value="name_asc">Nome A–Z</option>
              <option value="recent">Più recenti</option>
            </select>
            {/* Score slider mobile */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#141414]/50">
                  Punteggio minimo
                </span>
                <span className="font-brand text-xl text-[#A8842C]">
                  {minScore > 0 ? minScore.toFixed(1) : "—"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="gold-slider w-full"
              />
              {minScore > 0 && (
                <button
                  onClick={() => setMinScore(0)}
                  className="text-xs text-[#141414]/40 underline"
                >
                  Azzera filtro
                </button>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setCityInput(""); setCity(""); setType(""); setStatus(""); setMinScore(0);
                }}
                className="w-full py-2 text-xs uppercase tracking-widest text-[#ef4444]/80 border border-[#ef4444]/30 hover:border-[#ef4444] transition-colors"
              >
                Azzera tutti i filtri
              </button>
            )}
          </div>
        )}
      </div>

      {/* TOGGLE GRIGLIA / MAPPA + CONTATORE */}
      <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-[#141414]/50">
          {places.data ? (
            <span><span className="font-semibold text-[#141414]">{places.data.length}</span> strutture</span>
          ) : null}
        </p>
        <div className="flex border border-black/15 shrink-0">
          <button
            onClick={() => setView("grid")}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest transition-colors touch-manipulation ${
              view === "grid"
                ? "bg-[#141414] text-white"
                : "bg-white text-[#141414]/60 hover:bg-black/5"
            }`}
          >
            Griglia
          </button>
          <button
            onClick={() => setView("map")}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest transition-colors border-l border-black/15 touch-manipulation ${
              view === "map"
                ? "bg-[#141414] text-white"
                : "bg-white text-[#141414]/60 hover:bg-black/5"
            }`}
          >
            Mappa
          </button>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="mt-5 sm:mt-6">
        {places.isLoading && <LoadingSpinner />}
        {places.isError && <ErrorMessage onRetry={() => places.refetch()} />}

        {/* MAPPA */}
        {view === "map" && (
          <div
            ref={mapRef}
            className="w-full border border-black/10"
            style={{ height: "60vh", minHeight: 320, maxHeight: 600, zIndex: 0 }}
          />
        )}

        {/* GRIGLIA */}
        {view === "grid" && (
          <>
            {places.data && places.data.length === 0 && (
              <p className="py-20 text-center font-serif italic text-[#141414]/50">
                Nessuna struttura trovata con questi filtri.
              </p>
            )}
            {places.data && places.data.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {places.data.map((place, i) => (
                  <FadeInSection key={place.id} delay={(i % 3) * 60}>
                    <PlaceCard place={place} />
                  </FadeInSection>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
