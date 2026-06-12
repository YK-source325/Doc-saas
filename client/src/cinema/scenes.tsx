import type { ReactNode } from "react";
import type { CineScene } from "../components/CinematicPlayer";
import {
  AlgorithmVisual,
  GloveVisual,
  InspectorVisual,
  PlaqueVisual,
  ShieldVisual,
  TeamVisual,
  ToolsVisual,
  VanVisual,
} from "./visuals";

export interface StoryboardScene {
  num: number;
  shot: string;
  action: string;
  duration: string;
  notes: string;
}

export interface MediaVideo {
  id: string;
  title: string;
  description: string;
  scenes: CineScene[];
  storyboard: StoryboardScene[];
}

interface TextSceneProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  visual?: ReactNode;
  visualClass?: string;
}

function TextScene({ kicker, title, subtitle, visual, visualClass = "" }: TextSceneProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 gap-5 max-w-3xl mx-auto">
      {kicker && (
        <p className="cine-fade text-[10px] md:text-xs uppercase tracking-[5px] text-[#C9A84C]">
          {kicker}
        </p>
      )}
      {visual && <div className={`cine-fade cine-delay-1 ${visualClass}`}>{visual}</div>}
      <h2 className="cine-fade cine-delay-2 font-brand text-4xl md:text-6xl tracking-widest text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="cine-fade cine-delay-3 font-serif italic text-lg md:text-2xl text-[#F0EADB]/70">
          {subtitle}
        </p>
      )}
      <div className="cine-line cine-delay-3 h-px max-w-[200px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
    </div>
  );
}

function LogoScene() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 gap-5">
      <div className="cine-fade cine-delay-1">
        <span className="font-serif font-semibold text-[64px] md:text-[110px] leading-none tracking-[0.12em] text-white">
          REVISORE<span className="text-[#C9A84C]">.</span>
        </span>
      </div>
      <div className="cine-fade cine-delay-2 h-px w-48 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <p className="cine-fade cine-delay-3 font-serif italic text-xl md:text-2xl text-[#F0EADB]/70">
        L'eccellenza nell'ospitalità incontra l'intelligenza artificiale.
      </p>
    </div>
  );
}

function GloveScene({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 gap-6">
      <div className="cine-glove">
        <GloveVisual className="w-28 h-28 md:w-40 md:h-40" />
      </div>
      <h2 className="cine-fade cine-delay-2 font-brand text-4xl md:text-6xl tracking-widest text-white">
        {title}
      </h2>
      <p className="cine-fade cine-delay-3 font-serif italic text-lg md:text-2xl text-[#F0EADB]/70 max-w-xl">
        {subtitle}
      </p>
    </div>
  );
}

function InspectorScene({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 py-16 gap-8 md:gap-14 max-w-4xl mx-auto">
      <div className="cine-fade cine-zoom shrink-0">
        <InspectorVisual className="w-28 md:w-40 h-auto" />
      </div>
      <div>
        <h2 className="cine-fade cine-delay-2 font-brand text-4xl md:text-6xl tracking-widest text-white leading-tight">
          {title}
        </h2>
        <p className="cine-fade cine-delay-3 mt-4 font-serif italic text-lg md:text-2xl text-[#F0EADB]/70 max-w-xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function VanScene({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-8 py-16 gap-6 w-full overflow-hidden">
      <div className="cine-drive w-full flex justify-center">
        <VanVisual className="w-64 md:w-96" />
      </div>
      <h2 className="cine-fade cine-delay-3 font-brand text-4xl md:text-6xl tracking-widest text-white">
        {title}
      </h2>
      <p className="cine-fade cine-delay-4 font-serif italic text-lg md:text-2xl text-[#F0EADB]/70 max-w-xl">
        {subtitle}
      </p>
    </div>
  );
}

const S = (duration: number, content: ReactNode): CineScene => ({ duration, content });

// ── TRAILER: CHE COS'È REVISORE? ────────────────────────────────────────────

export const TRAILER_SCENES: CineScene[] = [
  S(5000, <LogoScene />),
  S(
    6000,
    <TextScene
      kicker="Il problema"
      title="DI CHI TI PUOI FIDARE?"
      subtitle="Recensioni gonfiate, stelle comprate, foto che mentono. L'ospitalità italiana merita una verifica vera."
    />
  ),
  S(
    6000,
    <InspectorScene
      title="ENTRA L'ISPETTORE"
      subtitle="Costume nero, distintivo REVISORE, passo deciso. Nessun preavviso, nessuno sconto."
    />
  ),
  S(
    5000,
    <GloveScene
      title="I GUANTI BIANCHI"
      subtitle="Il rituale che apre ogni ispezione. La pulizia non si dichiara: si dimostra."
    />
  ),
  S(
    6000,
    <VanScene
      title="LA BASE OPERATIVA MOBILE"
      subtitle="Un Mercedes Sprinter attrezzato: laboratorio, regia e ufficio. L'ispezione arriva ovunque."
    />
  ),
  S(
    6000,
    <TextScene
      kicker="Gli strumenti"
      title="8 STRUMENTI PROFESSIONALI"
      subtitle="Termometro a infrarossi, torcia UV, luminometro ATP, misuratore qualità olio. Metodologia UNI 11312."
      visual={<ToolsVisual className="w-56 md:w-72" />}
    />
  ),
  S(
    6000,
    <TextScene
      kicker="L'algoritmo"
      title="UN PUNTEGGIO, TRE FONTI"
      subtitle="Ispezione Revisore 40%, reputazione online 30%, community 30%. Un punteggio vivo, aggiornato in tempo reale."
      visual={<AlgorithmVisual className="w-56 md:w-72" />}
    />
  ),
  S(
    6000,
    <TextScene
      kicker="Il riconoscimento"
      title="LA TARGA"
      subtitle="Metallo spazzolato, oro in rilievo. Il climax di ogni episodio, il simbolo dell'eccellenza certificata."
      visual={<PlaqueVisual className="w-56 md:w-72" />}
    />
  ),
  S(
    6000,
    <TextScene
      kicker="La visione"
      title="TUTELA, ECCELLENZA, STANDARD"
      subtitle="Proteggere chi sceglie. Celebrare chi merita. Certificare con metodo professionale, da Venezia a Napoli."
      visual={<ShieldVisual className="w-24 md:w-28" star />}
    />
  ),
  S(
    7000,
    <TextScene
      title="REVISORE"
      subtitle="La certificazione dell'ospitalità italiana. Ispezione umana, intelligenza artificiale, punteggio pubblico."
      kicker="2026"
    />
  ),
];

// ── I 6 VIDEO DELLA SEZIONE MEDIA ───────────────────────────────────────────

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: "ispettore-entra",
    title: "L'Ispettore Entra",
    description: "Guanti bianchi, costume nero, distintivo REVISORE. Il rituale dell'ispezione.",
    scenes: [
      S(5000, <TextScene kicker="Episodio" title="L'ISPETTORE ENTRA" subtitle="Ogni ispezione inizia con un rituale." />),
      S(6000, <GloveScene title="I GUANTI BIANCHI" subtitle="Si indossano davanti all'ingresso. Lenti, deliberati. La telecamera resta sulle mani." />),
      S(6000, <TextScene kicker="La camminata" title="PASSO SICURO" subtitle="Attraversa la hall. Lo sguardo registra ogni dettaglio: pavimenti, luci, profumo dell'aria." />),
      S(6000, <TextScene kicker="Il saluto" title="BUONGIORNO, SONO IL REVISORE" subtitle="Stretta di mano alla reception o alla titolare. Cortese, diretto. L'ispezione è già iniziata." />),
    ],
    storyboard: [
      { num: 1, shot: "Dettaglio mani — primissimo piano", action: "Le mani nude estraggono i guanti bianchi dalla tasca interna della giacca e li indossano dito per dito.", duration: "8s", notes: "Luce laterale calda, sfondo sfocato. Il gesto iconico del brand: lento e cerimoniale." },
      { num: 2, shot: "Camera bassa — carrellata frontale", action: "L'ispettore cammina verso l'ingresso della struttura, passo deciso, costume nero.", duration: "6s", notes: "Focus su camminata e silhouette. Musica in crescendo, stile thriller." },
      { num: 3, shot: "Steadicam alle spalle", action: "Ingresso nella hall: porte che si aprono, le persone si voltano.", duration: "6s", notes: "Reazioni vere dello staff, non recitate. Suono ambiente in primo piano." },
      { num: 4, shot: "Piano medio — due figure", action: "Saluto e presentazione con la receptionist o la titolare: stretta di mano, sorriso professionale.", duration: "8s", notes: "Primo dialogo dell'episodio. Sottotitolo con nome struttura e città." },
      { num: 5, shot: "Dettaglio — guanto sulla superficie", action: "Il dito guantato scorre su un corrimano: primo verdetto silenzioso.", duration: "5s", notes: "Stacco netto a nero con logo REVISORE. Gancio per il resto dell'episodio." },
    ],
  },
  {
    id: "ispezione",
    title: "L'Ispezione",
    description: "Come funziona il metodo REVISORE: protocollo UNI 11312, strumenti, verdetto.",
    scenes: [
      S(5000, <TextScene kicker="Il metodo" title="L'ISPEZIONE" subtitle="Protocollo professionale UNI 11312. Nulla è lasciato al caso." />),
      S(6000, <TextScene kicker="Fase 1" title="CAMERE E SALA" subtitle="Torcia UV sui tessuti, guanto bianco sulle superfici alte. La pulizia non si dichiara: si dimostra." visual={<GloveVisual className="w-20" />} />),
      S(6000, <TextScene kicker="Fase 2" title="LA CUCINA" subtitle="Termometro a infrarossi sui frigoriferi, luminometro ATP sui piani di lavoro, qualità dell'olio in frittura." visual={<ToolsVisual className="w-56" />} />),
      S(6000, <TextScene kicker="Fase 3" title="IL VERDETTO" subtitle="Checklist digitale, punteggi automatici. Il punteggio entra nell'algoritmo: 40% del totale." visual={<AlgorithmVisual className="w-56" />} />),
    ],
    storyboard: [
      { num: 1, shot: "Montaggio rapido — dettagli", action: "Sequenza di gesti tecnici: guanto su mensola, torcia UV sul copriletto, termometro puntato.", duration: "12s", notes: "Ritmo serrato, tagli sul beat della musica. Ogni strumento ha il suo 'suono firma'." },
      { num: 2, shot: "Piano sequenza in cucina", action: "L'ispettore attraversa la cucina in servizio, misura le temperature, osserva la brigata al lavoro.", duration: "20s", notes: "Tensione vera: la cucina non si ferma. Display del termometro sempre leggibile in camera." },
      { num: 3, shot: "Macro — display strumenti", action: "Primi piani dei valori: temperatura frigo, lettura ATP, qualità olio.", duration: "8s", notes: "Grafica in sovrimpressione con soglie di legge: verde se conforme, rosso se fuori norma." },
      { num: 4, shot: "Piano medio — tablet", action: "Compilazione della checklist sul tablet, punteggio parziale che si aggiorna.", duration: "8s", notes: "Replica dell'interfaccia della piattaforma per coerenza visiva con il sito." },
      { num: 5, shot: "Primo piano — ispettore", action: "Sguardo in camera: 'Il punteggio finale lo decide l'algoritmo. E la community.'", duration: "6s", notes: "Frase di chiusura ricorrente di ogni episodio, prima dei titoli." },
    ],
  },
  {
    id: "consegna-targa",
    title: "La Consegna della Targa",
    description: "Metallo spazzolato, oro in rilievo. Il climax di ogni episodio.",
    scenes: [
      S(5000, <TextScene kicker="Il climax" title="LA CONSEGNA" subtitle="Il momento che ogni struttura aspetta. E che alcune non vedranno." />),
      S(6000, <TextScene kicker="Il riconoscimento" title="LA TARGA REVISORE" subtitle="Tre livelli: Silver, Oro, Diamond. Incisa, numerata, verificabile online." visual={<PlaqueVisual className="w-56 md:w-72" />} />),
      S(6000, <TextScene kicker="La promessa" title="MONITORAGGIO 12 MESI" subtitle="La targa non è per sempre: il punteggio live può confermarla, o revocarla." visual={<ShieldVisual className="w-20" />} />),
    ],
    storyboard: [
      { num: 1, shot: "Slow motion — apertura custodia", action: "La custodia nera si apre: la targa in metallo spazzolato riflette la luce.", duration: "8s", notes: "Il momento 'hero product'. Luce puntuale dall'alto, fondo nero assoluto." },
      { num: 2, shot: "Piano americano — consegna", action: "L'ispettore consegna la targa al titolare davanti allo staff riunito.", duration: "12s", notes: "Emozione vera: lacrime, applausi, abbracci. La camera non interrompe mai." },
      { num: 3, shot: "Dettaglio — fissaggio al muro", action: "La targa viene montata accanto all'ingresso, l'ispettore la lucida col guanto bianco.", duration: "8s", notes: "Chiusura del cerchio: il guanto che apre l'episodio lo chiude." },
      { num: 4, shot: "Esterno — facciata con targa", action: "Zoom out dalla targa alla facciata completa della struttura, clienti che entrano.", duration: "6s", notes: "Sovrimpressione: punteggio finale e QR code verso la scheda live sulla piattaforma." },
    ],
  },
  {
    id: "studio-mobile",
    title: "Studio Mobile Mercedes",
    description: "L'interno del furgone Mercedes Sprinter REVISORE: laboratorio, regia e ufficio.",
    scenes: [
      S(5000, <VanScene title="STUDIO MOBILE" subtitle="Un Mercedes Sprinter unico in Italia: la base operativa che arriva ovunque." />),
      S(6000, <TextScene kicker="A bordo" title="LABORATORIO E REGIA" subtitle="Banco strumenti calibrati, postazione montaggio video, archivio ispezioni. Tutto in sette metri." visual={<ToolsVisual className="w-56" />} />),
      S(6000, <TextScene kicker="Sulla strada" title="PUBBLICITÀ AMBULANTE" subtitle="Livrea nera e oro con il logo REVISORE: ogni chilometro è un manifesto." visual={<VanVisual className="w-64" />} />),
    ],
    storyboard: [
      { num: 1, shot: "Drone — esterno in movimento", action: "Lo Sprinter nero e oro percorre una strada panoramica italiana (Langhe, lago di Como).", duration: "10s", notes: "Riprese aeree cinematiche all'alba. La livrea deve essere leggibile in ogni frame." },
      { num: 2, shot: "Piano sequenza — interno", action: "La porta laterale si apre: tour continuo del banco strumenti, regia video e ufficio.", duration: "20s", notes: "Una sola ripresa stabilizzata, l'ispettore presenta ogni zona con un gesto." },
      { num: 3, shot: "Dettagli — strumentazione", action: "Macro su strumenti nel loro alloggiamento in schiuma sagomata, etichette REVISORE.", duration: "8s", notes: "Estetica 'kit professionale': precisione, ordine, niente fuori posto." },
      { num: 4, shot: "Notturna — furgone parcheggiato", action: "Il furgone illuminato davanti alla struttura da ispezionare, luci interne accese.", duration: "6s", notes: "Atmosfera thriller: domani mattina inizia l'ispezione. Stacco sul logo." },
    ],
  },
  {
    id: "kit",
    title: "Il Kit di Ispezione",
    description: "8 strumenti professionali, una metodologia certificata.",
    scenes: [
      S(5000, <TextScene kicker="Gli strumenti" title="IL KIT" subtitle="Otto strumenti, un solo obiettivo: la verità misurabile." visual={<ToolsVisual className="w-56 md:w-72" />} />),
      S(7000, <TextScene kicker="Dalla valigetta" title="PRECISIONE CERTIFICATA" subtitle="Guanti bianchi e in lattice, termometro a infrarossi, torcia UV, misuratore olio, pH-metro, luminometro ATP, tablet con checklist." />),
      S(5000, <GloveScene title="L'ELEMENTO ICONICO" subtitle="Tutto inizia e finisce con i guanti bianchi." />),
    ],
    storyboard: [
      { num: 1, shot: "Zenitale — valigetta aperta", action: "La valigetta si apre dall'alto: gli 8 strumenti perfettamente alloggiati.", duration: "8s", notes: "Stile 'unboxing' premium. Ogni strumento numerato con grafica in sovrimpressione." },
      { num: 2, shot: "Serie di macro — uno strumento alla volta", action: "Otto stacchi rapidi: ogni strumento in azione nel suo contesto reale.", duration: "24s", notes: "3 secondi a strumento, nome e funzione in sovrimpressione. Montaggio ritmico." },
      { num: 3, shot: "Piano medio — ispettore", action: "L'ispettore chiude la valigetta e guarda in camera: 'Le opinioni passano. Le misure restano.'", duration: "6s", notes: "Tagline del kit, riutilizzabile come spot breve per i social." },
    ],
  },
  {
    id: "brigata",
    title: "La Brigata",
    description: "La squadra REVISORE: ispezione, video, piattaforma. Le truppe dietro il progetto.",
    scenes: [
      S(5000, <TextScene kicker="La squadra" title="LA BRIGATA" subtitle="Dietro ogni episodio, una squadra che lavora come una brigata di cucina." visual={<TeamVisual className="w-56 md:w-72" />} />),
      S(6000, <TextScene kicker="L'ispettore" title="IL REVISORE" subtitle="Ispettore capo in incognito. 13+ anni nell'ospitalità italiana, certificazione Mystery Guest, metodologia UNI 11312." visual={<ShieldVisual className="w-20" />} />),
      S(6000, <TextScene kicker="I ruoli" title="OGNUNO AL SUO POSTO" subtitle="Operatore video, montatore, sviluppo piattaforma, relazioni con le strutture. La brigata cresce con il progetto." />),
    ],
    storyboard: [
      { num: 1, shot: "Ritratti — sfondo nero", action: "Ogni membro della squadra entra nel quadro e incrocia le braccia, stile poster cinematografico.", duration: "12s", notes: "Stessa luce e stessa posa per tutti: identità visiva da 'squadra speciale'." },
      { num: 2, shot: "Dietro le quinte — montaggio", action: "La brigata al lavoro: chi riprende, chi monta nel furgone, chi aggiorna la piattaforma.", duration: "15s", notes: "Materiale vero dei sopralluoghi. Mostra il lavoro che il pubblico non vede." },
      { num: 3, shot: "Gruppo — davanti al furgone", action: "Foto di squadra davanti allo Sprinter, l'ispettore al centro con i guanti bianchi.", duration: "8s", notes: "Immagine simbolo per stampa e social. Scatto sia video che fotografico." },
    ],
  },
];
