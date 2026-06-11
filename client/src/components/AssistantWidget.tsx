import { useEffect, useRef, useState } from "react";
import { api } from "../api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Benvenuta, benvenuto: sono Vera, l'assistente di REVISORE. Conosco ogni struttura ispezionata, i punteggi live, le targhe e gli abbonamenti. Come posso aiutarti?",
};

const SUGGESTIONS = [
  "Qual è la migliore struttura?",
  "Come funziona l'algoritmo?",
  "Quanto costa la targa?",
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending, open]);

  // Altri componenti (es. la barra AI nell'hero) possono aprire l'assistente
  // con una domanda: window.dispatchEvent(new CustomEvent("revisore-ask", { detail: "..." }))
  const sendRef = useRef<(text: string) => void>(() => {});
  useEffect(() => {
    const handler = (e: Event) => {
      const question = (e as CustomEvent<string>).detail;
      setOpen(true);
      if (question) setTimeout(() => sendRef.current(question), 200);
    };
    window.addEventListener("revisore-ask", handler);
    return () => window.removeEventListener("revisore-ask", handler);
  }, []);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || pending) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setPending(true);
    try {
      const { data } = await api.post<{ reply: string }>("/assistant", {
        // Il messaggio di benvenuto è solo UI: non si invia al server
        messages: next.slice(1).slice(-10),
      });
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Non riesco a rispondere in questo momento. Riprova tra poco o scrivi a info@revisore.it.",
        },
      ]);
    } finally {
      setPending(false);
    }
  };
  sendRef.current = send;

  return (
    <>
      {/* Pulsante flottante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Parla con Vera"
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-[#A8842C] text-white shadow-[0_0_24px_rgba(201,168,76,0.5)] hover:bg-[#8F6F25] transition-colors flex items-center justify-center"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a8 8 0 0 1 -8 8 H6 l-3 3 v-11 a8 8 0 0 1 8 -8 h2 a8 8 0 0 1 8 8 Z" strokeLinejoin="round" />
            <circle cx="9.5" cy="12" r="0.8" fill="currentColor" />
            <circle cx="13" cy="12" r="0.8" fill="currentColor" />
            <circle cx="16.5" cy="12" r="0.8" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Pannello chat */}
      {open && (
        <div className="chat-pop fixed bottom-24 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] flex flex-col bg-white border border-black/15 shadow-2xl">
          <div className="px-5 py-4 border-b border-black/10 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="font-serif font-semibold text-xl tracking-[1px] text-[#141414] leading-none">Vera</p>
              <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mt-1">
                Assistente REVISORE · risponde in tempo reale
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[220px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#A8842C] text-white"
                      : "bg-[#FAF8F4] border border-black/10 text-[#141414]/90"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {pending && (
              <div className="flex justify-start">
                <div className="bg-[#FAF8F4] border border-black/10 px-4 py-3 flex gap-1.5">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#A8842C]" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#A8842C]" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#A8842C]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 border border-black/15 text-[#A8842C] text-xs hover:bg-[#A8842C]/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-black/10 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi la tua domanda..."
              className="flex-1 bg-[#FAF8F4] border border-black/15 px-3 py-2 text-sm text-[#141414] focus:border-[#A8842C] focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="px-4 py-2 bg-[#A8842C] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#8F6F25] disabled:opacity-40 transition-colors"
            >
              Invia
            </button>
          </form>
        </div>
      )}
    </>
  );
}
