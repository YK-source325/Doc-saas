import { useCallback, useEffect, useState, type ReactNode } from "react";

export interface CineScene {
  duration: number; // millisecondi
  content: ReactNode;
}

interface Props {
  title: string;
  scenes: CineScene[];
  onClose?: () => void;
  fullScreen?: boolean;
}

export default function CinematicPlayer({ title, scenes, onClose, fullScreen = false }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(i, scenes.length - 1)));
      setEnded(false);
      setPlaying(true);
    },
    [scenes.length]
  );

  useEffect(() => {
    if (!playing || ended) return;
    const timer = setTimeout(() => {
      if (index < scenes.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setEnded(true);
        setPlaying(false);
      }
    }, scenes[index].duration);
    return () => clearTimeout(timer);
  }, [index, playing, ended, scenes]);

  const containerClass = fullScreen
    ? "relative w-full overflow-hidden bg-[#060606]"
    : "relative w-full overflow-hidden bg-[#060606] border border-[#C9A84C]/30";

  return (
    <div className={containerClass}>
      {/* Barra di progresso a segmenti */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
        {scenes.map((s, i) => (
          <div key={i} className="flex-1 h-px bg-[#C9A84C]/20 overflow-hidden">
            <div
              className="h-full bg-[#C9A84C]"
              style={
                i < index || ended
                  ? { width: "100%" }
                  : i === index && playing
                    ? { width: "100%", transition: `width ${s.duration}ms linear` }
                    : { width: "0%" }
              }
            />
          </div>
        ))}
      </div>

      {/* Scena corrente — key forza il remount e fa ripartire le animazioni */}
      <div
        key={index}
        className={`gold-grid flex items-center justify-center ${fullScreen ? "min-h-[70vh]" : "aspect-video"}`}
      >
        {ended ? (
          <div className="text-center cine-fade px-6">
            <p className="font-brand text-4xl md:text-5xl text-[#DCBD6B] tracking-widest">FINE</p>
            <button
              onClick={() => goTo(0)}
              className="mt-6 px-6 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs uppercase tracking-widest hover:bg-[#C9A84C]/10"
            >
              Riproduci di Nuovo
            </button>
          </div>
        ) : (
          scenes[index].content
        )}
      </div>

      {/* Controlli */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-[#060606] to-transparent">
        <span className="font-brand text-sm tracking-[4px] text-[#C9A84C]">{title}</span>
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
          <button onClick={() => goTo(index - 1)} className="text-[#F0EADB]/60 hover:text-[#C9A84C]" aria-label="Scena precedente">
            ←
          </button>
          <button
            onClick={() => (ended ? goTo(0) : setPlaying((p) => !p))}
            className="text-[#C9A84C] hover:text-[#DCBD6B] font-bold"
          >
            {ended ? "Replay" : playing ? "Pausa" : "Riprendi"}
          </button>
          <button onClick={() => goTo(index + 1)} className="text-[#F0EADB]/60 hover:text-[#C9A84C]" aria-label="Scena successiva">
            →
          </button>
          {onClose && (
            <button onClick={onClose} className="ml-2 text-[#F0EADB]/60 hover:text-[#ef4444]">
              Chiudi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
