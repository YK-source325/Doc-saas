import { useState } from "react";
import type { StoryboardScene } from "../cinema/scenes";

interface Props {
  title: string;
  scenes: StoryboardScene[];
}

export default function StoryboardCard({ title, scenes }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 bg-[#0a0a0a]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#C9A84C]/5 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
          Sceneggiatura per le riprese — {title}
        </span>
        <span className="font-brand text-xl text-[#DCBD6B]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 divide-y divide-white/10">
          {scenes.map((s) => (
            <div key={s.num} className="py-4 grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-1">
                <span className="inline-flex w-8 h-8 items-center justify-center border border-[#C9A84C]/40 font-brand text-lg text-[#C9A84C]">
                  {s.num}
                </span>
              </div>
              <div className="col-span-12 sm:col-span-3">
                <p className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40">Inquadratura</p>
                <p className="text-sm text-[#F0EADB]/80">{s.shot}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-[#C9A84C]">{s.duration}</p>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <p className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40">Azione</p>
                <p className="text-sm text-[#F0EADB]/80">{s.action}</p>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <p className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40">Note di regia</p>
                <p className="font-serif italic text-sm text-[#F0EADB]/60">{s.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
