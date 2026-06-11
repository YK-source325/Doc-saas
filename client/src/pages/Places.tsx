import { useEffect, useState } from "react";
import { usePlaces } from "../api/hooks";
import PlaceCard from "../components/PlaceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FadeInSection from "../components/FadeInSection";

const selectClass =
  "bg-[#0a0a0a] border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none w-full";

export default function Places() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setCity(cityInput), 300);
    return () => clearTimeout(timer);
  }, [cityInput]);

  const places = usePlaces({
    city: city || undefined,
    type: type || undefined,
    status: status || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <FadeInSection>
        <h1 className="font-brand text-5xl sm:text-7xl text-[#DCBD6B] tracking-widest">
          STRUTTURE ISPEZIONATE
        </h1>
        <p className="mt-3 font-serif italic text-xl text-[#F0EADB]/60">
          Directory in tempo reale delle strutture certificate dal Revisore.
        </p>
      </FadeInSection>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      </div>

      <div className="mt-10">
        {places.isLoading && <LoadingSpinner />}
        {places.isError && <ErrorMessage onRetry={() => places.refetch()} />}
        {places.data && places.data.length === 0 && (
          <p className="py-24 text-center font-serif italic text-[#F0EADB]/50">
            Nessuna struttura trovata con questi filtri.
          </p>
        )}
        {places.data && places.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.data.map((place, i) => (
              <FadeInSection key={place.id} delay={(i % 3) * 100}>
                <PlaceCard place={place} />
              </FadeInSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
