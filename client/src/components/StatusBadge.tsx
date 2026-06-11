const STATUS_MAP: Record<string, { color: string; label: string }> = {
  active: { color: "#22c55e", label: "ATTIVA" },
  warning: { color: "#f59e0b", label: "ATTENZIONE" },
  at_risk: { color: "#ef4444", label: "A RISCHIO" },
  revoked: { color: "#6b7280", label: "REVOCATA" },
};

interface Props {
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: Props) {
  const cfg = STATUS_MAP[status] ?? STATUS_MAP.revoked;
  const sizing = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";
  return (
    <span
      className={`${sizing} border rounded-full font-bold tracking-widest uppercase whitespace-nowrap`}
      style={{ borderColor: cfg.color, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
