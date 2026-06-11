// Visual SVG stilizzati per le scene cinematiche — palette oro/avorio su nero.

export function GloveVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <path
        d="M38 96 V52 a6 6 0 0 1 12 0 V44 a6 6 0 0 1 12 0 V42 a6 6 0 0 1 12 0 V46 a6 6 0 0 1 12 0 v22 l8 -12 a5 5 0 0 1 8 6 l-12 22 a24 24 0 0 1 -22 14 H56 a18 18 0 0 1 -18 -6 Z"
        stroke="#F0EADB"
        strokeWidth="3"
        fill="rgba(240,234,219,0.08)"
        strokeLinejoin="round"
      />
      <path d="M38 96 h44" stroke="#C9A84C" strokeWidth="3" />
    </svg>
  );
}

export function PlaqueVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none">
      <rect x="10" y="10" width="140" height="100" stroke="#C9A84C" strokeWidth="3" fill="rgba(201,168,76,0.06)" />
      <rect x="20" y="20" width="120" height="80" stroke="#9A7F3A" strokeWidth="1" />
      <text x="80" y="52" textAnchor="middle" fill="#DCBD6B" fontFamily="Bebas Neue" fontSize="22" letterSpacing="4">
        REVISORE
      </text>
      <line x1="40" y1="62" x2="120" y2="62" stroke="#C9A84C" strokeWidth="1" />
      <text x="80" y="84" textAnchor="middle" fill="#F0EADB" fontFamily="Bebas Neue" fontSize="12" letterSpacing="3" opacity="0.7">
        ECCELLENZA CERTIFICATA
      </text>
    </svg>
  );
}

export function VanVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 110" className={className} fill="none">
      <path
        d="M15 78 V42 a8 8 0 0 1 8 -8 h110 l36 14 a10 10 0 0 1 6 9 v21 a4 4 0 0 1 -4 4 h-156 Z"
        stroke="#C9A84C"
        strokeWidth="3"
        fill="rgba(201,168,76,0.06)"
      />
      <path d="M120 36 v24 h48" stroke="#9A7F3A" strokeWidth="2" />
      <rect x="28" y="44" width="26" height="16" stroke="#9A7F3A" strokeWidth="2" />
      <text x="78" y="60" textAnchor="middle" fill="#DCBD6B" fontFamily="Bebas Neue" fontSize="16" letterSpacing="3">
        REVISORE
      </text>
      <circle cx="55" cy="82" r="11" stroke="#F0EADB" strokeWidth="3" fill="#060606" />
      <circle cx="160" cy="82" r="11" stroke="#F0EADB" strokeWidth="3" fill="#060606" />
    </svg>
  );
}

export function ShieldVisual({ className = "", color = "#C9A84C", star = false }: { className?: string; color?: string; star?: boolean }) {
  return (
    <svg viewBox="0 0 96 110" className={className} fill="none">
      <path
        d="M48 6 L86 20 v34 c0 26 -17 42 -38 50 C27 96 10 80 10 54 V20 Z"
        stroke={color}
        strokeWidth="3"
        fill={`${color}14`}
      />
      {star ? (
        <path
          d="M48 36 l6.5 13.5 14.5 2 -10.5 10.5 2.5 14.5 -13 -7 -13 7 2.5 -14.5 -10.5 -10.5 14.5 -2 Z"
          fill={color}
          className="animate-pulse"
        />
      ) : (
        <text x="48" y="62" textAnchor="middle" fill={color} fontFamily="Bebas Neue" fontSize="34">
          R
        </text>
      )}
    </svg>
  );
}

export function ToolsVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 110" className={className} fill="none">
      {/* termometro */}
      <rect x="20" y="20" width="14" height="50" rx="7" stroke="#C9A84C" strokeWidth="2.5" />
      <circle cx="27" cy="82" r="10" stroke="#C9A84C" strokeWidth="2.5" fill="rgba(201,168,76,0.1)" />
      <line x1="27" y1="40" x2="27" y2="78" stroke="#DCBD6B" strokeWidth="3" />
      {/* torcia UV */}
      <rect x="62" y="24" width="16" height="34" stroke="#F0EADB" strokeWidth="2.5" />
      <path d="M58 58 h24 l-4 32 h-16 Z" stroke="#F0EADB" strokeWidth="2.5" />
      <path d="M62 16 l-6 -8 M70 14 v-9 M78 16 l6 -8" stroke="#DCBD6B" strokeWidth="2" />
      {/* tablet */}
      <rect x="108" y="22" width="48" height="66" rx="4" stroke="#C9A84C" strokeWidth="2.5" />
      <line x1="116" y1="38" x2="148" y2="38" stroke="#9A7F3A" strokeWidth="2" />
      <line x1="116" y1="50" x2="148" y2="50" stroke="#9A7F3A" strokeWidth="2" />
      <line x1="116" y1="62" x2="136" y2="62" stroke="#9A7F3A" strokeWidth="2" />
      {/* luminometro */}
      <rect x="172" y="30" width="14" height="48" rx="6" stroke="#F0EADB" strokeWidth="2.5" />
      <circle cx="179" cy="24" r="5" stroke="#DCBD6B" strokeWidth="2" />
    </svg>
  );
}

export function TeamVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none">
      {[
        { x: 100, y: 26, r: 14, h: 40, c: "#DCBD6B", w: 3 },
        { x: 56, y: 34, r: 11, h: 32, c: "#C9A84C", w: 2.5 },
        { x: 144, y: 34, r: 11, h: 32, c: "#C9A84C", w: 2.5 },
        { x: 22, y: 40, r: 9, h: 26, c: "#9A7F3A", w: 2 },
        { x: 178, y: 40, r: 9, h: 26, c: "#9A7F3A", w: 2 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r} stroke={p.c} strokeWidth={p.w} />
          <path
            d={`M${p.x - p.r - 4} ${p.y + p.r + p.h} a${p.r + 4} ${p.r + 4} 0 0 1 ${(p.r + 4) * 2} 0`}
            stroke={p.c}
            strokeWidth={p.w}
          />
        </g>
      ))}
    </svg>
  );
}

export function AlgorithmVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none">
      {[
        { y: 24, label: "REVISORE 40%", w: 80 },
        { y: 56, label: "ONLINE 30%", w: 60 },
        { y: 88, label: "COMMUNITY 30%", w: 60 },
      ].map((row) => (
        <g key={row.y}>
          <rect x="10" y={row.y} width="100" height="14" stroke="#9A7F3A" strokeWidth="1.5" />
          <rect x="10" y={row.y} width={row.w} height="14" fill="rgba(201,168,76,0.5)" />
          <text x="118" y={row.y + 11} fill="#F0EADB" fontFamily="Bebas Neue" fontSize="11" letterSpacing="1" opacity="0.8">
            {row.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
