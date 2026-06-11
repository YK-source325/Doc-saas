interface Props {
  size?: "sm" | "lg";
}

// Identità puramente tipografica: wordmark serif, punto oro, nessun simbolo.
export default function Logo({ size = "sm" }: Props) {
  if (size === "lg") {
    return (
      <div className="flex flex-col items-center gap-5">
        <span className="font-serif font-semibold text-[64px] sm:text-[96px] md:text-[120px] leading-none tracking-[0.14em] text-white">
          REVISORE<span className="text-[#C9A84C]">.</span>
        </span>
        <span className="text-[10px] sm:text-xs tracking-[7px] text-[#F0EADB]/50 uppercase">
          Certificazione Ospitalità Italiana
        </span>
      </div>
    );
  }
  return (
    <span className="font-serif font-semibold text-xl tracking-[0.22em] text-white whitespace-nowrap">
      REVISORE<span className="text-[#C9A84C]">.</span>
    </span>
  );
}
