import { useEffect, useRef, useState } from "react";
import { api } from "../api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Benvenuto, sono Yara, l'assistente di REVISORE. Conosco ogni struttura ispezionata, i punteggi live, le targhe e gli abbonamenti. Come posso aiutarti?",
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending, open]);

  // Focus input when panel opens (desktop only, avoid keyboard jump on mobile)
  useEffect(() => {
    if (open && window.innerWidth > 640) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (open && window.innerWidth <= 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
      {/* Overlay mobile quando la chat è aperta */}
      {open && (
        <div
          className="fixed inset-0 z-[65] bg-black/30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Pulsante flottante — su mobile sopra cookie banner */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Parla con Yara"
        className="fixed bottom-6 right-4 sm:right-6 z-[70] w-14 h-14 rounded-full bg-[#A8842C] text-white shadow-[0_4px_24px_rgba(201,168,76,0.55)] hover:bg-[#8F6F25] active:scale-95 transition-all flex items-center justify-center touch-manipulation"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a8 8 0 0 1-8 8H6l-3 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" strokeLinejoin="round" />
            <circle cx="9.5" cy="12" r="0.8" fill="currentColor" />
            <circle cx="13" cy="12" r="0.8" fill="currentColor" />
            <circle cx="16.5" cy="12" r="0.8" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Pannello chat — full screen su mobile, popup su desktop */}
      {open && (
        <div className="
          fixed z-[70]
          /* mobile: full screen con margine top per status bar */
          inset-x-0 bottom-0 top-0
          /* desktop: popup bottom-right */
          sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:max-h-[70vh]
          flex flex-col bg-white border border-black/15 shadow-2xl
          /* rounded top corners su mobile */
          rounded-t-2xl sm:rounded-none
        ">
          {/* Header */}
          <div className="px-5 py-4 border-b border-black/10 flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="flex-1">
              <p className="font-serif font-semibold text-xl tracking-[1px] text-[#141414] leading-none">Yara</p>
              <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mt-1">
                Assistente REVISORE · risponde in tempo reale
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-[#141414]/40 hover:text-[#141414] transition-colors touch-manipulation"
              aria-label="Chiudi"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messaggi */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[120px] overscroll-contain">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
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

          {/* Suggerimenti */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-2 border border-black/15 text-[#A8842C] text-xs hover:bg-[#A8842C]/10 active:bg-[#A8842C]/20 transition-colors touch-manipulation"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-black/10 flex gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi la tua domanda..."
              className="flex-1 bg-[#FAF8F4] border border-black/15 px-3 py-3 text-sm text-[#141414] focus:border-[#A8842C] focus:outline-none"
              style={{ fontSize: "16px" }} /* evita zoom iOS */
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="px-4 py-3 bg-[#A8842C] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#8F6F25] active:bg-[#8F6F25] disabled:opacity-40 transition-colors touch-manipulation"
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
