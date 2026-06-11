interface Props {
  size?: "sm" | "lg";
}

// Identità tipografica: wordmark serif + marchio AI dichiarato.
export default function Logo({ size = "sm" }: Props) {
  if (size === "lg") {
    return (
      <div className="flex flex-col items-center gap-5">
        <span className="font-serif font-semibold text-[64px] sm:text-[96px] md:text-[120px] leading-none tracking-[0.14em] text-[#141414]">
          REVISORE<span className="text-[#A8842C]">.</span>
        </span>
        <span className="text-[10px] sm:text-xs tracking-[7px] text-[#141414]/50 uppercase">
          Ispezione umana · Intelligenza artificiale
        </span>
      </div>
    );
  }
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span className="font-serif font-semibold text-xl tracking-[0.22em] text-[#141414]">
        REVISORE<span className="text-[#A8842C]">.</span>
      </span>
      <span className="px-1.5 py-0.5 border border-[#A8842C] text-[#A8842C] text-[9px] font-bold tracking-[2px] leading-none">
        AI
      </span>
    </span>
  );
}
