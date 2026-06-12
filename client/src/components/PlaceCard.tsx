import { useNavigate } from "react-router-dom";
import type { EnrichedPlace } from "../types";
import ScoreGauge from "./ScoreGauge";
import StatusBadge from "./StatusBadge";

const TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Ristorante",
  bar: "Bar",
  agriturismo: "Agriturismo",
};

export default function PlaceCard({ place }: { place: EnrichedPlace }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/strutture/${place.id}`)}
      className="bg-white border border-black/10 hover:border-[#A8842C]/60 p-6 cursor-pointer transition-colors flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl text-[#141414]">{place.name}</h3>
        <StatusBadge status={place.plaqueStatus} />
      </div>
      <p className="mt-1 text-xs text-[#141414]/50">
        {TYPE_LABELS[place.type] ?? place.type} · {place.city}
      </p>
      <div className="my-6 flex flex-col items-center gap-2">
        <ScoreGauge score={place.finalScore} size={80} />
        <span className="text-[10px] tracking-widest text-[#141414]/40">LIVE SCORE</span>
      </div>
      <span className="mt-auto text-xs text-[#A8842C] font-bold tracking-widest">
        DETTAGLI ANALISI →
      </span>
    </div>
  );
}
