import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { loadEnrichedPlaces } from "../enrich.js";
import { computePlaqueTier } from "../scoring.js";

const router = Router();

const chatBody = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
});

const SYSTEM_KNOWLEDGE = `Ti chiami Yara e sei l'assistente intelligente ufficiale della piattaforma REVISORE. Sei la voce digitale del progetto. Se ti chiedono che tecnologia usi, rispondi con trasparenza che sei basata su Claude di Anthropic, addestrata sui contenuti e sui dati live di REVISORE.

CHE COS'È REVISORE
REVISORE è la prima piattaforma italiana di ispezione e certificazione dell'ospitalità. Un ispettore professionista entra in incognito in hotel, ristoranti, bar e agriturismi con 8 strumenti certificati (guanti bianchi di cotone, guanti in lattice, termometro a infrarossi, torcia UV, misuratore qualità olio, pH-metro digitale, luminometro ATP, tablet con checklist) e protocollo UNI 11312 — la stessa norma dei Mystery Auditor europei. Multilingue IT/EN/RU/UA.

L'ALGORITMO
Il punteggio finale di ogni struttura è una media ponderata e dinamica di tre fonti:
- 40% ispezione Revisore
- 30% reputazione online (media di Google e TripAdvisor)
- 30% community score (valutazioni degli utenti registrati della piattaforma)
Se una fonte manca, i pesi si rinormalizzano. Stato targa: ATTIVA con punteggio >= 4.0, ATTENZIONE >= 3.0, A RISCHIO sotto 3.0.

LE TARGHE (abbonamento annuale)
- REVISORE SILVER (punteggio 3.5-3.9): 200 euro/anno. Targa fisica 20x15 cm, monitoraggio live 12 mesi, badge digitale, menzione su piattaforma.
- REVISORE ORO (4.0-4.7): 350 euro/anno. Tutto Silver + priorità in classifica, certificato premium, dashboard analytics.
- REVISORE DIAMOND (4.8+): 500 euro/anno. Tutto Oro + targa in metallo spazzolato, logo Diamond sui materiali, episodio dedicato sul canale YouTube.
La targa va rinnovata ogni 12 mesi e può essere revocata se il punteggio live scende.

COME PARTECIPARE
- Le strutture richiedono un'ispezione dalla pagina Abbonamenti del sito o scrivendo a info@revisore.it.
- Gli utenti si registrano gratuitamente e possono lasciare valutazioni sulle strutture ispezionate.
- I partner/investitori hanno un'area riservata con KPI, modello di ricavo e proiezione economica a 5 anni.

REGOLE DI COMPORTAMENTO
- Rispondi sempre in italiano, in modo cortese, professionale e conciso (massimo 120 parole).
- Usa i dati live forniti qui sotto quando l'utente chiede di strutture, punteggi o classifiche.
- Se non sai qualcosa, dillo onestamente e suggerisci di scrivere a info@revisore.it.
- Non inventare strutture, punteggi o prezzi non presenti nei dati.`;

async function liveDataBlock(): Promise<string> {
  const places = await loadEnrichedPlaces();
  const sorted = [...places].sort((a, b) => b.finalScore - a.finalScore);
  const lines = sorted.map(
    (p, i) =>
      `${i + 1}. ${p.name} (${p.type}, ${p.city}) — punteggio live ${p.finalScore.toFixed(2)}, targa ${computePlaqueTier(p.finalScore) ?? "nessuna"}, stato ${p.plaqueStatus}, ${p.communityRatingCount} valutazioni community`
  );
  return `DATI LIVE (classifica aggiornata adesso):\n${lines.join("\n")}`;
}

// Concierge di riserva: risponde dai dati live senza AI, quando manca la chiave API.
async function fallbackReply(question: string): Promise<string> {
  const q = question.toLowerCase();
  const places = await loadEnrichedPlaces();
  const sorted = [...places].sort((a, b) => b.finalScore - a.finalScore);

  const mentioned = places.find(
    (p) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q.trim())
  );
  if (mentioned) {
    return `${mentioned.name} (${mentioned.city}) ha un punteggio live di ${mentioned.finalScore.toFixed(2)} su 5, con ${mentioned.communityRatingCount} valutazioni della community. Stato targa: ${mentioned.plaqueStatus === "active" ? "attiva" : mentioned.plaqueStatus === "warning" ? "in attenzione" : "a rischio"}. Trovi l'analisi completa nella sua scheda su Esplora Strutture.`;
  }
  const cityMatch = places.filter((p) => q.includes(p.city.toLowerCase()));
  if (cityMatch.length > 0) {
    const list = cityMatch.map((p) => `${p.name} (${p.finalScore.toFixed(2)})`).join(", ");
    return `A ${cityMatch[0].city} abbiamo ispezionato: ${list}. Apri Esplora Strutture per i dettagli completi.`;
  }
  if (q.includes("migliore") || q.includes("classifica") || q.includes("top")) {
    const top = sorted.slice(0, 3).map((p, i) => `${i + 1}. ${p.name} (${p.finalScore.toFixed(2)})`);
    return `La classifica live in questo momento: ${top.join(" · ")}. La classifica completa è nella Live Dashboard.`;
  }
  if (q.includes("targh") || q.includes("prezz") || q.includes("cost") || q.includes("abbonament")) {
    return "Le targhe REVISORE sono abbonamenti annuali: Silver (punteggio 3.5-3.9) 200€, Oro (4.0-4.7) 350€, Diamond (4.8+) 500€. Includono targa fisica, monitoraggio live 12 mesi e badge digitale. Puoi richiedere un'ispezione dalla pagina Abbonamenti.";
  }
  if (q.includes("algoritm") || q.includes("punteggio") || q.includes("come funziona")) {
    return "Il punteggio REVISORE è una media ponderata di tre fonti: 40% ispezione professionale (protocollo UNI 11312), 30% reputazione online (Google + TripAdvisor), 30% valutazioni della community. È un punteggio vivo: si aggiorna a ogni nuova valutazione.";
  }
  if (q.includes("registr") || q.includes("account") || q.includes("accedi")) {
    return "Registrarsi è gratuito: tocca Accedi in alto a destra e crea il tuo account. Da registrato puoi lasciare valutazioni sulle strutture ispezionate e seguire i punteggi live.";
  }
  if (q.includes("chi") && (q.includes("revisore") || q.includes("fondator") || q.includes("siete"))) {
    return "REVISORE è la piattaforma italiana di ispezione e certificazione dell'ospitalità: ispezioni professionali in incognito con metodologia UNI 11312, un algoritmo che unisce ispezione, reputazione online e community, e targhe fisiche per le strutture certificate.";
  }
  return `Sono Yara, l'assistente di REVISORE. Posso aiutarti su strutture ispezionate, punteggi, targhe e abbonamenti, come funziona l'algoritmo e la registrazione. In questo momento le strutture certificate sono ${places.length}, la migliore è ${sorted[0]?.name ?? "—"} con ${sorted[0]?.finalScore.toFixed(2) ?? "—"}. Per tutto il resto scrivi a info@revisore.it.`;
}

// POST /api/assistant
router.post("/", async (req, res) => {
  const body = chatBody.safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi" });
  }
  const messages = body.data.messages;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return void res.status(400).json({ error: "Manca la domanda" });

  if (!process.env.ANTHROPIC_API_KEY) {
    const reply = await fallbackReply(lastUser.content);
    return void res.json({ reply, engine: "concierge" });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: SYSTEM_KNOWLEDGE,
          cache_control: { type: "ephemeral" },
        },
        { type: "text", text: await liveDataBlock() },
      ],
      messages,
    });
    if (response.stop_reason === "refusal") {
      return void res.json({
        reply: "Non posso aiutarti su questo argomento. Posso rispondere su strutture, punteggi, targhe e su come funziona REVISORE.",
        engine: "ai",
      });
    }
    const textBlock = response.content.find((b) => b.type === "text");
    res.json({ reply: textBlock?.text ?? "Non ho una risposta in questo momento. Riprova.", engine: "ai" });
  } catch (err) {
    console.error("Assistente AI non disponibile, uso il concierge:", err);
    const reply = await fallbackReply(lastUser.content);
    res.json({ reply, engine: "concierge" });
  }
});

export default router;
