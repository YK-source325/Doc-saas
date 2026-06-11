// Dati di seed condivisi tra lo script CLI (seed.ts) e l'endpoint /api/setup.
// ATTENZIONE: tutte le strutture, gli indirizzi e le valutazioni sono di pura
// fantasia, a scopo dimostrativo. Ogni riferimento a esercizi reali è casuale.

export const SEED_PLACES = [
  { name: "Hotel Laguna d'Oro",        type: "hotel",      city: "Venezia",  address: "Riva degli Specchi 12",      inspectedAt: "2025-03-15", revisoreScore: 4.8, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-15" },
  { name: "Ristorante La Vetta",       type: "restaurant", city: "Bergamo",  address: "Via dei Colli 17",           inspectedAt: "2025-04-20", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-20" },
  { name: "Grand Hotel Belvedere",     type: "hotel",      city: "Bellagio", address: "Lungolago Regina 8",         inspectedAt: "2025-05-10", revisoreScore: 4.7, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-10" },
  { name: "Trattoria del Vicolo",      type: "restaurant", city: "Roma",     address: "Vicolo delle Lanterne 45",   inspectedAt: "2025-06-01", revisoreScore: 3.8, googleScore: 3.5, tripadvisorScore: 3.4, plaqueStatus: "warning", plaqueIssuedAt: "2025-06-01" },
  { name: "Osteria del Borgo Antico",  type: "restaurant", city: "Firenze",  address: "Borgo dei Mercanti 43r",     inspectedAt: "2025-07-15", revisoreScore: 4.3, googleScore: 4.2, tripadvisorScore: 4.1, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-15" },
  { name: "Bar Stella del Porto",      type: "bar",        city: "Napoli",   address: "Piazza del Molo 1",          inspectedAt: "2025-08-20", revisoreScore: 2.5, googleScore: 2.8, tripadvisorScore: 2.9, plaqueStatus: "at_risk", plaqueIssuedAt: "2025-08-20" },
  { name: "Pizzeria Fuoco Verace",     type: "restaurant", city: "Napoli",   address: "Via dei Forni 32",           inspectedAt: "2025-09-10", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-10" },
  { name: "Relais Le Vigne",           type: "hotel",      city: "Alba",     address: "Località Bricco Alto 39",    inspectedAt: "2025-10-05", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-05" },
];

export const SEED_RATINGS = [
  { placeId: 1, score: 4.7, comment: "Servizio impeccabile, vista mozzafiato sulla laguna",      authorName: "Marco Rossi" },
  { placeId: 1, score: 4.8, comment: "Hotel di lusso vero, personale straordinario",             authorName: "Giulia Bianchi" },
  { placeId: 1, score: 4.6, comment: "Un'esperienza indimenticabile a Venezia",                  authorName: "Luca Ferrari" },
  { placeId: 2, score: 4.9, comment: "Il migliore ristorante che abbia mai provato",             authorName: "Anna Colombo" },
  { placeId: 2, score: 4.8, comment: "Cucina di altissimo livello, servizio perfetto",           authorName: "Paolo Greco" },
  { placeId: 2, score: 4.7, comment: "Ogni piatto era un capolavoro",                            authorName: "Sofia Marino" },
  { placeId: 3, score: 4.6, comment: "Hotel magnifico sul lago di Como",                         authorName: "Roberto Esposito" },
  { placeId: 3, score: 4.5, comment: "Posizione perfetta, camere meravigliose",                  authorName: "Elena Ricci" },
  { placeId: 4, score: 3.6, comment: "Pasta buona ma bagni da migliorare",                       authorName: "Davide Costa" },
  { placeId: 4, score: 3.4, comment: "Cucina tradizionale, servizio molto lento",                authorName: "Marta Russo" },
  { placeId: 5, score: 4.2, comment: "Cucina toscana autentica, ambiente accogliente",           authorName: "Giorgio Conti" },
  { placeId: 5, score: 4.3, comment: "La pasta fatta in casa era divina",                        authorName: "Federica Morelli" },
  { placeId: 6, score: 2.8, comment: "Caffè pessimo, tavoli sporchi",                            authorName: "Antonio Leone" },
  { placeId: 6, score: 2.9, comment: "Sotto le aspettative, da migliorare molto",                authorName: "Chiara Gallo" },
  { placeId: 7, score: 4.4, comment: "Una delle migliori pizze mai mangiate",                    authorName: "Francesco Serra" },
  { placeId: 7, score: 4.5, comment: "Impasto perfetto, ingredienti freschissimi",               authorName: "Valentina Marini" },
  { placeId: 8, score: 4.7, comment: "Resort da sogno tra le vigne piemontesi",                  authorName: "Alessandro Ferri" },
  { placeId: 8, score: 4.8, comment: "Cena in cantina indimenticabile",                          authorName: "Beatrice Lombardi" },
];

export const SEED_USERS = [
  { email: "dev@revisore.it",     password: "revisore-dev-2026",     name: "Yevhen Khara",  role: "developer" },
  { email: "partner@revisore.it", password: "revisore-partner-2026", name: "Partner Demo",  role: "partner" },
  { email: "utente@revisore.it",  password: "revisore-utente-2026",  name: "Utente Demo",   role: "user" },
];
