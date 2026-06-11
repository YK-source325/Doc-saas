import { useEffect, useState } from "react";

interface Props {
  score: number;
  size?: number;
}

export default function ScoreGauge({ score, size = 120 }: Props) {
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const target = circ * (1 - Math.min(score, 5) / 5);
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOffset(target));
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const color = score >= 4.0 ? "#C9A84C" : score >= 3.0 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <span
        className="absolute font-brand text-[#F0EADB]"
        style={{ fontSize: size / 3.5 }}
      >
        {score.toFixed(2)}
      </span>
    </div>
  );
}
