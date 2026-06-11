import { useEffect, useRef, useState } from "react";
import { usePlaces } from "../api/hooks";
import PlaceCard from "../components/PlaceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";

declare const L: any; // Leaflet loaded via CDN

const selectClass =
  "bg-white border border-black/15 px-4 py-3 text-sm text-[#141414] focus:border-[#A8842C] focus:outline-none w-full";

const TYPE_COLORS: Record<string, string> = {
  hotel: "#A8842C",
  restaurant: "#22c55e",
  bar: "#3b82f6",
  agriturismo: "#f59e0b",
};

export default function Places() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("score");
  const [minScore, setMinScore] = useState(0);
  const [view, setView] = useState<"grid" | "map">("grid");

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
    if (mapInstanceRef.current) return; // già inizializzata

    const map = L.map(mapRef.current).setView([42.5, 12.5], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    mapInstanceRef.current = map;
  }, [view]);

  // Aggiorna marker sulla mappa
  useEffect(() => {
    if (view !== "map" || !mapInstanceRef.current || !places.data) return;
    // Rimuovi vecchi marker
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
          padding:2px 6px;
          font-size:11px;
          font-weight:700;
          font-family:Inter,sans-serif;
          white-space:nowrap;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          border:2px solid white;
        ">${p.finalScore.toFixed(1)}</div>`,
        iconAnchor: [20, 12],
      });
      const marker = L.marker([p.lat, p.lng], { icon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:160px">
            <strong style="font-size:14px">${p.name}</strong><br/>
            <span style="font-size:12px;color:#555">${p.city} · ${p.type}</span><br/>
            <span style="font-size:13px;color:${color};font-weight:700">${p.finalScore.toFixed(2)} / 5</span>
            <br/><a href="/places/${p.id}" style="color:#A8842C;font-size:12px;text-decoration:underline">Vedi scheda →</a>
          </div>
        `);
      markersRef.current.push(marker);
    });
  }, [view, places.data]);

  // Distruggi mappa quando si torna alla griglia
  useEffect(() => {
    if (view === "grid" && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  }, [view]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <FadeInSection>
        <h1 className="font-serif font-semibold text-5xl sm:text-7xl text-[#141414]">
          STRUTTURE ISPEZIONATE
        </h1>
        <p className="mt-3 font-serif italic text-xl text-[#141414]/60">
          Directory in tempo reale delle strutture certificate dal Revisore.
        </p>
      </FadeInSection>

      {/* FILTRI */}
      <div className="mt-10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Cerca per città..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className={selectClass}
          />
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="">Tutte le categorie</option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Ristorante</option>
            <option value="bar">Bar</option>
            <option value="agriturismo">Agriturismo</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="">Tutti gli stati</option>
            <option value="active">Attiva</option>
            <option value="warning">Attenzione</option>
            <option value="at_risk">A rischio</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
            <option value="score">Ordina per: Punteggio</option>
            <option value="recent">Ordina per: Più recenti</option>
            <option value="city">Ordina per: Città A–Z</option>
          </select>
        </div>

        {/* Score minimo slider */}
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

      {/* TOGGLE GRIGLIA / MAPPA */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-[#141414]/50">
          {places.data ? `${places.data.length} strutture trovate` : ""}
        </p>
        <div className="flex border border-black/15">
          <button
            onClick={() => setView("grid")}
            className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
              view === "grid"
                ? "bg-[#141414] text-white"
                : "bg-white text-[#141414]/60 hover:bg-black/5"
            }`}
          >
            Griglia
          </button>
          <button
            onClick={() => setView("map")}
            className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors border-l border-black/15 ${
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
      <div className="mt-6">
        {places.isLoading && <LoadingSpinner />}
        {places.isError && <ErrorMessage onRetry={() => places.refetch()} />}

        {/* MAPPA */}
        {view === "map" && (
          <div
            ref={mapRef}
            className="w-full border border-black/10"
            style={{ height: "600px", zIndex: 0 }}
          />
        )}

        {/* GRIGLIA */}
        {view === "grid" && (
          <>
            {places.data && places.data.length === 0 && (
              <p className="py-24 text-center font-serif italic text-[#141414]/50">
                Nessuna struttura trovata con questi filtri.
              </p>
            )}
            {places.data && places.data.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.data.map((place, i) => (
                  <FadeInSection key={place.id} delay={(i % 3) * 80}>
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
