import { EmblemVisual } from "../cinema/visuals";

interface Props {
  size?: "sm" | "lg";
}

// Logo istituzionale: emblema + wordmark bianco con filetto oro.
export default function Logo({ size = "sm" }: Props) {
  if (size === "lg") {
    return (
      <div className="flex flex-col items-center gap-6">
        <EmblemVisual className="w-28 h-28 md:w-36 md:h-36" />
        <div className="flex items-baseline leading-none">
          <span className="font-brand text-[80px] sm:text-[120px] md:text-[150px] text-white">R</span>
          <span className="font-brand text-[52px] sm:text-[80px] md:text-[100px] tracking-[12px] sm:tracking-[18px] text-white/95">
            EVISORE
          </span>
        </div>
        <div className="flex items-center gap-4 w-full max-w-md">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[10px] sm:text-xs tracking-[6px] text-[#C9A84C] uppercase whitespace-nowrap">
            Certificazione Ospitalità Italiana
          </span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>
      </div>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <EmblemVisual className="w-9 h-9" />
      <span className="flex items-baseline">
        <span className="font-brand text-2xl text-white">R</span>
        <span className="font-brand text-lg tracking-[5px] text-white/90">EVISORE</span>
      </span>
    </span>
  );
}
