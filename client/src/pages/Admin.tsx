import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import {
  useCreatePlace,
  useDeletePlace,
  usePlaces,
  useSetPlaqueStatus,
  useUpdatePlace,
} from "../api/hooks";
import type { EnrichedPlace } from "../types";
import FadeInSection from "../components/FadeInSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import StatusBadge from "../components/StatusBadge";

const inputClass =
  "w-full bg-[#060606] border border-[#C9A84C]/30 px-3 py-2 text-sm text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none";

interface FormState {
  name: string;
  type: string;
  city: string;
  address: string;
  inspectedAt: string;
  revisoreScore: string;
  googleScore: string;
  tripadvisorScore: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  type: "restaurant",
  city: "",
  address: "",
  inspectedAt: new Date().toISOString().slice(0, 10),
  revisoreScore: "4.0",
  googleScore: "",
  tripadvisorScore: "",
};

function formFromPlace(p: EnrichedPlace): FormState {
  return {
    name: p.name,
    type: p.type,
    city: p.city,
    address: p.address,
    inspectedAt: p.inspectedAt,
    revisoreScore: String(p.revisoreScore),
    googleScore: p.googleScore !== null ? String(p.googleScore) : "",
    tripadvisorScore: p.tripadvisorScore !== null ? String(p.tripadvisorScore) : "",
  };
}

interface SubscriptionRequest {
  id: number;
  structureName: string;
  contactName: string;
  email: string;
  phone: string | null;
  city: string;
  type: string;
  tier: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const SUB_STATUS: Record<string, { label: string; color: string }> = {
  new: { label: "NUOVA", color: "#C9A84C" },
  contacted: { label: "CONTATTATA", color: "#f59e0b" },
  active: { label: "ATTIVA", color: "#22c55e" },
  rejected: { label: "RIFIUTATA", color: "#6b7280" },
};

function SubscriptionRequests() {
  const queryClient = useQueryClient();
  const requests = useQuery({
    queryKey: ["subscription-requests"],
    queryFn: async () => {
      const { data } = await api.get<SubscriptionRequest[]>("/subscriptions");
      return data;
    },
  });
  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await api.patch(`/subscriptions/${id}`, { status });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscription-requests"] }),
  });

  return (
    <FadeInSection className="mt-16">
      <h2 className="font-brand text-3xl text-white tracking-widest">RICHIESTE DI ABBONAMENTO</h2>
      {requests.isLoading && <LoadingSpinner />}
      {requests.isError && <ErrorMessage onRetry={() => requests.refetch()} />}
      {requests.data && requests.data.length === 0 && (
        <p className="mt-6 font-serif italic text-[#F0EADB]/50">
          Nessuna richiesta al momento. Arriveranno dalla pagina Abbonamenti.
        </p>
      )}
      {requests.data && requests.data.length > 0 && (
        <div className="mt-6 overflow-x-auto border border-[#C9A84C]/20 bg-[#0a0a0a]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-[#C9A84C]/20">
                <th className="px-4 py-3">Struttura</th>
                <th className="px-4 py-3">Referente</th>
                <th className="px-4 py-3">Città</th>
                <th className="px-4 py-3">Targa</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3">Gestione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C]/10">
              {requests.data.map((r) => {
                const status = SUB_STATUS[r.status] ?? SUB_STATUS.new;
                return (
                  <tr key={r.id} className="hover:bg-[#C9A84C]/5 align-top">
                    <td className="px-4 py-3">
                      <p className="font-serif text-base text-white">{r.structureName}</p>
                      {r.message && (
                        <p className="mt-1 font-serif italic text-xs text-[#F0EADB]/50 max-w-xs">
                          {r.message}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#F0EADB]/70">
                      {r.contactName}
                      <span className="block text-xs text-[#F0EADB]/40">{r.email}</span>
                      {r.phone && <span className="block text-xs text-[#F0EADB]/40">{r.phone}</span>}
                    </td>
                    <td className="px-4 py-3 text-[#F0EADB]/60">{r.city}</td>
                    <td className="px-4 py-3 font-brand text-lg text-[#C9A84C]">{r.tier}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-3 py-1 border rounded-full text-[10px] font-bold tracking-widest"
                        style={{ borderColor: status.color, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => setStatus.mutate({ id: r.id, status: e.target.value })}
                        className="bg-[#060606] border border-[#C9A84C]/30 px-2 py-1 text-xs text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none"
                      >
                        <option value="new">Nuova</option>
                        <option value="contacted">Contattata</option>
                        <option value="active">Attiva</option>
                        <option value="rejected">Rifiutata</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </FadeInSection>
  );
}

function validate(form: FormState): string | null {
  if (form.name.trim().length < 1) return "Il nome è obbligatorio.";
  if (form.city.trim().length < 1) return "La città è obbligatoria.";
  if (form.address.trim().length < 1) return "L'indirizzo è obbligatorio.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.inspectedAt)) return "Data ispezione non valida.";
  const score = Number(form.revisoreScore);
  if (Number.isNaN(score) || score < 0 || score > 5) return "Lo score Revisore deve essere tra 0 e 5.";
  for (const [label, value] of [["Google", form.googleScore], ["TripAdvisor", form.tripadvisorScore]]) {
    if (value !== "") {
      const n = Number(value);
      if (Number.isNaN(n) || n < 0 || n > 5) return `Lo score ${label} deve essere tra 0 e 5.`;
    }
  }
  return null;
}

export default function Admin() {
  const places = usePlaces();
  const createPlace = useCreatePlace();
  const updatePlace = useUpdatePlace();
  const deletePlace = useDeletePlace();
  const setStatus = useSetPlaqueStatus();

  const [editing, setEditing] = useState<EnrichedPlace | "new" | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<EnrichedPlace | null>(null);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setEditing("new");
  };

  const openEdit = (p: EnrichedPlace) => {
    setForm(formFromPlace(p));
    setFormError("");
    setEditing(p);
  };

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate(form);
    if (error) {
      setFormError(error);
      return;
    }
    const payload = {
      name: form.name.trim(),
      type: form.type,
      city: form.city.trim(),
      address: form.address.trim(),
      inspectedAt: form.inspectedAt,
      revisoreScore: Number(form.revisoreScore),
      googleScore: form.googleScore === "" ? null : Number(form.googleScore),
      tripadvisorScore: form.tripadvisorScore === "" ? null : Number(form.tripadvisorScore),
    };
    try {
      if (editing === "new") {
        await createPlace.mutateAsync(payload);
      } else if (editing) {
        await updatePlace.mutateAsync({ id: editing.id, ...payload });
      }
      setEditing(null);
    } catch {
      setFormError("Salvataggio non riuscito. Riprova.");
    }
  };

  const pending = createPlace.isPending || updatePlace.isPending;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <FadeInSection>
        <span className="px-4 py-1 border border-[#C9A84C]/40 text-[10px] tracking-widest text-[#C9A84C]">
          ACCESSO SVILUPPATORE
        </span>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-brand text-5xl sm:text-6xl text-white tracking-widest">
              PANNELLO SVILUPPATORE
            </h1>
            <p className="mt-2 font-serif italic text-xl text-[#F0EADB]/60">
              Gestione completa delle strutture e dello stato delle targhe.
            </p>
          </div>
          <button
            onClick={openNew}
            className="px-6 py-3 bg-[#C9A84C] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#DCBD6B] transition-colors"
          >
            + Nuova Struttura
          </button>
        </div>
      </FadeInSection>

      <div className="mt-10">
        {places.isLoading && <LoadingSpinner />}
        {places.isError && <ErrorMessage onRetry={() => places.refetch()} />}
        {places.data && (
          <div className="overflow-x-auto border border-[#C9A84C]/20 bg-[#0a0a0a]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-[#F0EADB]/40 border-b border-[#C9A84C]/20">
                  <th className="px-4 py-3">Struttura</th>
                  <th className="px-4 py-3">Città</th>
                  <th className="px-4 py-3">Score Live</th>
                  <th className="px-4 py-3">Stato Targa</th>
                  <th className="px-4 py-3">Forza Stato</th>
                  <th className="px-4 py-3 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A84C]/10">
                {places.data.map((p) => (
                  <tr key={p.id} className="hover:bg-[#C9A84C]/5">
                    <td className="px-4 py-3 font-serif text-base">{p.name}</td>
                    <td className="px-4 py-3 text-[#F0EADB]/60">{p.city}</td>
                    <td className="px-4 py-3 font-brand text-xl text-[#DCBD6B]">
                      {p.finalScore.toFixed(2)}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={p.plaqueStatus} /></td>
                    <td className="px-4 py-3">
                      <select
                        value={p.plaqueStatus}
                        onChange={(e) => setStatus.mutate({ id: p.id, plaqueStatus: e.target.value })}
                        className="bg-[#060606] border border-[#C9A84C]/30 px-2 py-1 text-xs text-[#F0EADB] focus:border-[#C9A84C] focus:outline-none"
                      >
                        <option value="active">Attiva</option>
                        <option value="warning">Attenzione</option>
                        <option value="at_risk">A rischio</option>
                        <option value="revoked">Revocata</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] uppercase tracking-widest hover:bg-[#C9A84C]/10"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p)}
                        className="ml-2 px-3 py-1 border border-[#ef4444]/40 text-[#ef4444] text-[10px] uppercase tracking-widest hover:bg-[#ef4444]/10"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SubscriptionRequests />

      {/* MODALE CREA/MODIFICA */}
      {editing && (
        <div className="fixed inset-0 z-[60] bg-[#060606]/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-[#C9A84C]/30 p-8">
            <h2 className="font-brand text-2xl text-white tracking-widest">
              {editing === "new" ? "NUOVA STRUTTURA" : `MODIFICA — ${editing.name}`}
            </h2>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Nome</label>
                <input className={`mt-1 ${inputClass}`} value={form.name} onChange={set("name")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Categoria</label>
                  <select className={`mt-1 ${inputClass}`} value={form.type} onChange={set("type")}>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Ristorante</option>
                    <option value="bar">Bar</option>
                    <option value="agriturismo">Agriturismo</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Città</label>
                  <input className={`mt-1 ${inputClass}`} value={form.city} onChange={set("city")} />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Indirizzo</label>
                <input className={`mt-1 ${inputClass}`} value={form.address} onChange={set("address")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Data ispezione</label>
                  <input type="date" className={`mt-1 ${inputClass}`} value={form.inspectedAt} onChange={set("inspectedAt")} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Score Revisore (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" className={`mt-1 ${inputClass}`} value={form.revisoreScore} onChange={set("revisoreScore")} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Score Google (opz.)</label>
                  <input type="number" step="0.1" min="0" max="5" className={`mt-1 ${inputClass}`} value={form.googleScore} onChange={set("googleScore")} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F0EADB]/50">Score TripAdvisor (opz.)</label>
                  <input type="number" step="0.1" min="0" max="5" className={`mt-1 ${inputClass}`} value={form.tripadvisorScore} onChange={set("tripadvisorScore")} />
                </div>
              </div>
              {formError && <p className="text-sm text-[#ef4444]">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-5 py-2 border border-[#F0EADB]/30 text-[#F0EADB]/60 text-xs uppercase tracking-widest hover:border-[#F0EADB]/60"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="px-5 py-2 bg-[#C9A84C] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#DCBD6B] disabled:opacity-50"
                >
                  {pending ? "Salvataggio..." : "Salva"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFERMA ELIMINAZIONE */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] bg-[#060606]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-[#ef4444]/40 p-8 text-center">
            <h2 className="font-brand text-2xl text-[#ef4444] tracking-widest">ELIMINARE?</h2>
            <p className="mt-4 font-serif italic text-[#F0EADB]/70">
              Stai per eliminare <span className="font-bold">{confirmDelete.name}</span> e tutte le
              sue valutazioni. L'operazione non è reversibile.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 border border-[#F0EADB]/30 text-[#F0EADB]/60 text-xs uppercase tracking-widest hover:border-[#F0EADB]/60"
              >
                Annulla
              </button>
              <button
                onClick={async () => {
                  await deletePlace.mutateAsync(confirmDelete.id);
                  setConfirmDelete(null);
                }}
                disabled={deletePlace.isPending}
                className="px-5 py-2 bg-[#ef4444] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#ef4444]/80 disabled:opacity-50"
              >
                {deletePlace.isPending ? "Eliminazione..." : "Elimina Definitivamente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
