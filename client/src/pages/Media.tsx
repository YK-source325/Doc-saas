import { useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "../components/FadeInSection";
import CinematicPlayer from "../components/CinematicPlayer";
import StoryboardCard from "../components/StoryboardCard";
import { MEDIA_VIDEOS, type MediaVideo } from "../cinema/scenes";

const PHOTOS_WIDE = [
  { title: "I Guanti Bianchi", desc: "Il gesto iconico. L'inizio di ogni ispezione." },
  { title: "Il Furgone", desc: "Mercedes Sprinter REVISORE — pubblicità ambulante." },
];

const PHOTOS_ROW = [
  { title: "Interno Furgone", desc: "Base operativa mobile. Attrezzatura professionale." },
  { title: "Kit di Ispezione", desc: "8 strumenti professionali. Precisione certificata." },
  { title: "La Targa Fisica", desc: "20×15 cm. Metallo spazzolato. Eccellenza certificata." },
];

function PhotoCard({ title, desc, ratio }: { title: string; desc: string; ratio: string }) {
  return (
    <div
      className={`relative ${ratio} bg-[#0a0a0a] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-colors overflow-hidden group`}
    >
      <div className="absolute inset-0 gold-grid opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-brand text-6xl text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition-colors select-none">
          R
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#060606] via-[#060606]/80 to-transparent">
        <h3 className="font-brand text-xl text-[#DCBD6B] tracking-wide">{title}</h3>
        <p className="font-serif italic text-sm text-[#F0EADB]/60">{desc}</p>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay }: { video: MediaVideo; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="text-left w-full bg-[#0a0a0a] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-colors group"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 gold-grid opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/60 flex items-center justify-center group-hover:bg-[#C9A84C]/30 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" fill="#DCBD6B">
              <path d="M7 5 L19 12 L7 19 Z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-brand text-xl text-[#DCBD6B] tracking-wide">{video.title}</h3>
        <p className="mt-1 font-serif italic text-sm text-[#F0EADB]/60">{video.description}</p>
        <p className="mt-3 text-[10px] uppercase tracking-widest text-[#C9A84C]">
          Guarda la scena animata →
        </p>
      </div>
    </button>
  );
}

export default function Media() {
  const [active, setActive] = useState<MediaVideo | null>(null);

  return (
    <div>
      {/* HERO */}
      <section className="gold-grid py-28 px-4 text-center">
        <FadeInSection>
          <span className="px-4 py-1 border border-[#C9A84C]/40 text-[10px] tracking-widest text-[#C9A84C]">
            MEDIA & DOCUMENTAZIONE
          </span>
          <h1 className="mt-8 font-brand text-6xl sm:text-8xl text-[#C9A84C] tracking-widest leading-none">
            MEDIA REVISORE
          </h1>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#F0EADB]/70 max-w-3xl mx-auto">
            Fotografie e video che documentano la metodologia, gli strumenti e l'identità visiva di
            REVISORE.
          </p>
          <Link
            to="/trailer"
            className="mt-10 inline-block px-8 py-4 bg-[#C9A84C] text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:bg-[#DCBD6B] transition-colors"
          >
            Guarda il Trailer del Progetto
          </Link>
        </FadeInSection>
      </section>

      {/* PLAYER ATTIVO */}
      {active && (
        <div className="fixed inset-0 z-[60] bg-[#060606]/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <CinematicPlayer
              title={active.title.toUpperCase()}
              scenes={active.scenes}
              onClose={() => setActive(null)}
            />
          </div>
        </div>
      )}

      {/* VIDEO */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="font-brand text-4xl text-[#DCBD6B] tracking-widest">I Video</h2>
          <p className="mt-2 font-serif italic text-[#F0EADB]/60">
            Scene animate in anteprima — con la sceneggiatura completa per le riprese reali.
          </p>
        </FadeInSection>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIA_VIDEOS.map((video, i) => (
            <FadeInSection key={video.id} delay={(i % 3) * 100}>
              <VideoCard video={video} onPlay={() => setActive(video)} />
            </FadeInSection>
          ))}
        </div>

        {/* SCENEGGIATURE */}
        <FadeInSection className="mt-16">
          <h2 className="font-brand text-4xl text-[#DCBD6B] tracking-widest">Le Sceneggiature</h2>
          <p className="mt-2 font-serif italic text-[#F0EADB]/60">
            Storyboard professionali pronti per il videomaker: inquadrature, azioni, durate e note di
            regia per ogni video.
          </p>
        </FadeInSection>
        <div className="mt-8 space-y-4">
          {MEDIA_VIDEOS.map((video, i) => (
            <FadeInSection key={video.id} delay={i * 80}>
              <StoryboardCard title={video.title} scenes={video.storyboard} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* GALLERIA FOTO */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="font-brand text-4xl text-[#DCBD6B] tracking-widest">La Galleria</h2>
        </FadeInSection>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHOTOS_WIDE.map((photo, i) => (
            <FadeInSection key={photo.title} delay={i * 100}>
              <PhotoCard title={photo.title} desc={photo.desc} ratio="aspect-video" />
            </FadeInSection>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHOTOS_ROW.map((photo, i) => (
            <FadeInSection key={photo.title} delay={i * 100}>
              <PhotoCard title={photo.title} desc={photo.desc} ratio="aspect-[4/3]" />
            </FadeInSection>
          ))}
        </div>
      </section>
    </div>
  );
}
