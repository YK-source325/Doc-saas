import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import FadeInSection from "../components/FadeInSection";
import { ShieldVisual } from "../cinema/visuals";

const inputClass =
  "w-full bg-[#060606] border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none";

const PLANS = [
  {
    tier: "SILVER",
    color: "#94a3b8",
    price: 200,
    range: "Punteggio 3.5–3.9",
    features: ["Targa fisica 20×15 cm", "Monitoraggio live 12 mesi", "Badge digitale certificato", "Menzione su piattaforma"],
  },
  {
    tier: "ORO",
    color: "#C9A84C",
    price: 350,
    range: "Punteggio 4.0–4.7",
    badge: "PIÙ SCELTO",
    features: ["Tutti i vantaggi Silver", "Priorità in leaderboard", "Certificato premium", "Dashboard analytics dedicata"],
  },
  {
    tier: "DIAMOND",
    color: "#e0f2fe",
    price: 500,
    range: "Punteggio 4.8+",
    badge: "ECCELLENZA ASSOLUTA",
    star: true,
    features: ["Tutti i vantaggi Oro", "Targa in metallo spazzolato", "Logo Diamond sui materiali", "Episodio dedicato su YouTube"],
  },
];

interface FormState {
  structureName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  type: string;
  tier: string;
  message: string;
}

const EMPTY: FormState = {
  structureName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  type: "restaurant",
  tier: "ORO",
  message: "",
};

export default function Abbonamenti() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const submitRequest = useMutation({
    mutationFn: async (payload: FormState) => {
      const { data } = await api.post("/subscriptions", {
        ...payload,
        phone: payload.phone || undefined,
        message: payload.message || undefined,
      });
      return data;
    },
    onSuccess: () => setSent(true),
  });

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const choosePlan = (tier: string) => {
    setForm((f) => ({ ...f, tier }));
    document.getElementById("richiesta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="gold-grid py-24 px-4 text-center">
        <FadeInSection>
          <span className="px-4 py-1 border border-[#C9A84C]/40 text-[10px] tracking-widest text-[#C9A84C]">
            PER LE STRUTTURE
          </span>
          <h1 className="mt-8 font-brand text-5xl sm:text-7xl md:text-8xl text-white tracking-widest leading-none">
            ABBONAMENTI REVISORE
          </h1>
          <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#F0EADB]/70 max-w-3xl mx-auto">
            L'ispezione professionale, la targa fisica e il monitoraggio live per 12 mesi.
            Un investimento nella fiducia dei tuoi ospiti.
          </p>
        </FadeInSection>
      </section>

      {/* PIANI */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <FadeInSection key={plan.tier} delay={i * 120} className="h-full">
              <div
                className="relative bg-[#0a0a0a] border p-8 h-full flex flex-col"
                style={{ borderColor: `${plan.color}4D` }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 border bg-[#060606] text-[10px] font-bold tracking-widest whitespace-nowrap"
                    style={{ borderColor: plan.color, color: plan.color }}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="flex justify-center">
                  <ShieldVisual className="w-20 h-24" color={plan.color} star={plan.star} />
                </div>
                <h2 className="mt-5 font-brand text-3xl tracking-widest text-center" style={{ color: plan.color }}>
                  {plan.tier}
                </h2>
                <p className="text-xs tracking-widest text-center text-[#F0EADB]/50">{plan.range}</p>
                <p className="mt-5 text-center">
                  <span className="font-brand text-6xl text-white">{plan.price}€</span>
                  <span className="block text-[10px] tracking-widest text-[#F0EADB]/40 mt-1">
                    RINNOVO ANNUALE
                  </span>
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-[#F0EADB]/70 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span style={{ color: plan.color }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choosePlan(plan.tier)}
                  className="mt-8 w-full py-3 border text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black hover:border-white"
                  style={{ borderColor: plan.color, color: plan.color }}
                >
                  Richiedi Ispezione
                </button>
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection className="mt-10 text-center">
          <p className="text-xs text-[#F0EADB]/40 max-w-2xl mx-auto leading-relaxed">
            Il livello della targa non si compra: lo determina il punteggio dell'ispezione. La
            richiesta non comporta alcun pagamento — il pagamento avviene solo dopo l'ispezione
            positiva e l'assegnazione della targa.
          </p>
        </FadeInSection>
      </section>

      {/* FORM RICHIESTA */}
      <section id="richiesta" className="py-16 px-4 bg-[#0A0A0A] border-y border-[#C9A84C]/10">
        <div className="max-w-2xl mx-auto">
          <FadeInSection>
            <h2 className="font-brand text-4xl text-white tracking-widest text-center">
              Richiedi l'Ispezione
            </h2>
            <p className="mt-3 font-serif italic text-center text-[#F0EADB]/60">
              Compila il modulo: il Revisore ti ricontatta entro 48 ore.
            </p>
          </FadeInSection>

          {sent ? (
            <FadeInSection className="mt-10">
              <div className="border border-[#22c55e]/40 bg-[#060606] p-10 text-center">
                <p className="font-brand text-3xl text-[#22c55e] tracking-widest">RICHIESTA RICEVUTA</p>
                <p className="mt-4 font-serif italic text-[#F0EADB]/70">
                  Grazie. Il Revisore esaminerà la tua struttura e ti contatterà all'indirizzo
                  indicato per concordare l'ispezione.
                </p>
              </div>
            </FadeInSection>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitRequest.mutate(form);
              }}
              className="mt-10 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Nome struttura</label>
                  <input required minLength={2} className={`mt-2 ${inputClass}`} value={form.structureName} onChange={set("structureName")} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Referente</label>
                  <input required minLength={2} className={`mt-2 ${inputClass}`} value={form.contactName} onChange={set("contactName")} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Email</label>
                  <input type="email" required className={`mt-2 ${inputClass}`} value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Telefono (opzionale)</label>
                  <input className={`mt-2 ${inputClass}`} value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Città</label>
                  <input required minLength={2} className={`mt-2 ${inputClass}`} value={form.city} onChange={set("city")} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Categoria</label>
                  <select className={`mt-2 ${inputClass}`} value={form.type} onChange={set("type")}>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Ristorante</option>
                    <option value="bar">Bar</option>
                    <option value="agriturismo">Agriturismo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Targa di interesse</label>
                <select className={`mt-2 ${inputClass}`} value={form.tier} onChange={set("tier")}>
                  <option value="SILVER">Silver — 200€/anno</option>
                  <option value="ORO">Oro — 350€/anno</option>
                  <option value="DIAMOND">Diamond — 500€/anno</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#F0EADB]/60">Messaggio (opzionale)</label>
                <textarea
                  rows={3}
                  maxLength={600}
                  className={`mt-2 ${inputClass}`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Raccontaci la tua struttura..."
                />
              </div>
              {submitRequest.isError && (
                <p className="text-sm text-[#ef4444]">Invio non riuscito. Controlla i dati e riprova.</p>
              )}
              <button
                type="submit"
                disabled={submitRequest.isPending}
                className="w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#F0EADB] transition-colors disabled:opacity-50"
              >
                {submitRequest.isPending ? "Invio in corso..." : "Invia la Richiesta"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
