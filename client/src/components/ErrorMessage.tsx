interface Props {
  message?: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message = "Si è verificato un errore nel caricamento dei dati.", onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-[#ef4444] text-sm tracking-wide">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 border border-[#ef4444] text-[#ef4444] uppercase tracking-widest text-xs font-bold hover:bg-[#ef4444]/10 transition-colors"
      >
        Riprova
      </button>
    </div>
  );
}
