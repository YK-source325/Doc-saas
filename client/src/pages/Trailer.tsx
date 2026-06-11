import { Link } from "react-router-dom";
import CinematicPlayer from "../components/CinematicPlayer";
import FadeInSection from "../components/FadeInSection";
import { TRAILER_SCENES } from "../cinema/scenes";

export default function Trailer() {
  return (
    <div>
      <section className="py-12 px-4 text-center">
        <FadeInSection>
          <span className="px-4 py-1 border border-[#C9A84C]/40 text-[10px] tracking-widest text-[#C9A84C]">
            IL TRAILER UFFICIALE
          </span>
          <h1 className="mt-6 font-brand text-5xl sm:text-7xl text-[#DCBD6B] tracking-widest">
            CHE COS'È REVISORE?
          </h1>
          <p className="mt-4 font-serif italic text-xl text-[#F0EADB]/60 max-w-2xl mx-auto">
            Il progetto, la missione, gli strumenti e la visione — in novanta secondi.
          </p>
        </FadeInSection>
      </section>

      <section className="px-4 pb-12 max-w-6xl mx-auto">
        <CinematicPlayer title="CHE COS'È REVISORE?" scenes={TRAILER_SCENES} fullScreen />
      </section>

      <section className="px-4 pb-24 text-center">
        <FadeInSection>
          <p className="font-serif italic text-lg text-[#F0EADB]/60">
            Vuoi vedere le scene dei singoli episodi e le sceneggiature per le riprese?
          </p>
          <Link
            to="/media"
            className="mt-6 inline-block px-8 py-4 border border-[#C9A84C] text-[#C9A84C] uppercase tracking-widest hover:bg-[#C9A84C]/10 transition-colors"
          >
            Vai alla Sezione Media →
          </Link>
        </FadeInSection>
      </section>
    </div>
  );
}
