import FadeInSection from "../components/FadeInSection";

export default function Privacy() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FAF8F4]">
      <FadeInSection>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[4px] text-[#A8842C] mb-3">Documenti Legali</p>
          <h1 className="font-brand text-3xl sm:text-4xl text-[#141414] mb-10">
            Privacy Policy & Cookie Policy
          </h1>
          <div className="prose prose-sm max-w-none text-[#141414]/80 space-y-8">

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">1. Titolare del Trattamento</h2>
              <p>
                Il titolare del trattamento dei dati personali è <strong>REVISORE</strong>, raggiungibile
                all'indirizzo email <a href="mailto:info@revisore.it" className="text-[#A8842C] underline">info@revisore.it</a>.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">2. Dati Raccolti</h2>
              <p>Raccogliamo le seguenti categorie di dati personali:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Dati di registrazione:</strong> nome, indirizzo email, password (cifrata).</li>
                <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, ora e data di accesso (tramite log del server).</li>
                <li><strong>Dati forniti volontariamente:</strong> valutazioni, commenti, richieste di abbonamento.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">3. Finalità e Base Giuridica</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Erogazione del servizio</strong> (art. 6.1.b GDPR) — gestione account, accesso alla piattaforma.</li>
                <li><strong>Adempimento obblighi legali</strong> (art. 6.1.c GDPR) — conservazione dei log di sicurezza.</li>
                <li><strong>Interesse legittimo</strong> (art. 6.1.f GDPR) — prevenzione frodi, sicurezza del sistema.</li>
                <li><strong>Consenso</strong> (art. 6.1.a GDPR) — cookie analitici e di marketing, se accettati.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">4. Conservazione dei Dati</h2>
              <p>
                I dati di account vengono conservati per tutta la durata del rapporto contrattuale e per i successivi 5 anni,
                salvo obblighi di legge più lunghi. I log di navigazione vengono conservati per 12 mesi.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">5. Diritti dell'Interessato</h2>
              <p>Ai sensi degli artt. 15–22 GDPR, hai il diritto di:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Accedere ai tuoi dati personali</li>
                <li>Rettificarli o aggiornarli</li>
                <li>Richiederne la cancellazione ("diritto all'oblio")</li>
                <li>Limitare il trattamento</li>
                <li>Portabilità dei dati</li>
                <li>Opporti al trattamento</li>
                <li>Revocare il consenso in qualsiasi momento</li>
              </ul>
              <p className="mt-3">
                Per esercitare i tuoi diritti, scrivi a{" "}
                <a href="mailto:info@revisore.it" className="text-[#A8842C] underline">info@revisore.it</a>.
                Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
                (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#A8842C] underline">www.garanteprivacy.it</a>).
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">6. Trasferimento Dati Extra-UE</h2>
              <p>
                I dati possono essere trattati da fornitori di infrastruttura (hosting, database cloud) ubicati
                in paesi extra-UE che offrono garanzie adeguate ai sensi dell'art. 46 GDPR
                (es. Standard Contractual Clauses o decisioni di adeguatezza della Commissione Europea).
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">7. Cookie Policy</h2>
              <p>
                Questo sito utilizza esclusivamente <strong>cookie tecnici strettamente necessari</strong> al
                funzionamento della piattaforma (gestione sessione autenticata). Non utilizziamo
                cookie di profilazione o di tracciamento di terze parti senza preventivo consenso.
              </p>
              <p className="mt-3">
                <strong>Cookie tecnici (sempre attivi):</strong>
              </p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-xs border border-black/10">
                  <thead className="bg-[#141414] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Nome</th>
                      <th className="px-3 py-2 text-left">Scopo</th>
                      <th className="px-3 py-2 text-left">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-mono">revisore_session</td>
                      <td className="px-3 py-2">Autenticazione utente</td>
                      <td className="px-3 py-2">Sessione</td>
                    </tr>
                    <tr className="border-t border-black/10 bg-white/50">
                      <td className="px-3 py-2 font-mono">cookie_consent</td>
                      <td className="px-3 py-2">Memorizza preferenze cookie</td>
                      <td className="px-3 py-2">1 anno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Puoi gestire o eliminare i cookie tramite le impostazioni del tuo browser. La disabilitazione
                dei cookie tecnici potrebbe compromettere il funzionamento del servizio.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">8. Sicurezza</h2>
              <p>
                Adottiamo misure tecniche e organizzative adeguate a proteggere i dati da accessi
                non autorizzati, perdita, distruzione o divulgazione illecita, in conformità all'art. 32 GDPR.
                Le password sono archiviate in forma cifrata mediante algoritmi di hashing sicuri.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-xl text-[#141414] mb-3">9. Aggiornamenti</h2>
              <p>
                La presente policy può essere aggiornata periodicamente. Le modifiche sostanziali saranno
                comunicate tramite avviso sul sito. L'ultima revisione è del <strong>12 giugno 2026</strong>.
              </p>
            </section>

          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
