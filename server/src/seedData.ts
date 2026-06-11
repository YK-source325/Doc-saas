// Dati di seed dimostrativi — 100 strutture realistiche italiane (anonimizzate)
// Ogni riferimento a esercizi reali è casuale e non intenzionale.

type PlaceType = "hotel" | "restaurant" | "bar" | "agriturismo";
type PlaceStatus = "active" | "warning" | "at_risk";

interface SeedPlace {
  name: string;
  type: PlaceType;
  city: string;
  address: string;
  inspectedAt: string;
  revisoreScore: number;
  googleScore: number | null;
  tripadvisorScore: number | null;
  plaqueStatus: PlaceStatus;
  plaqueIssuedAt: string;
  lat?: number;
  lng?: number;
}

export const SEED_PLACES: SeedPlace[] = [
  // ---- VENEZIA ----
  { name: "Hotel Laguna d'Oro",         type: "hotel",      city: "Venezia",  address: "Riva degli Specchi 12",         inspectedAt: "2025-03-15", revisoreScore: 4.8, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-15", lat: 45.4408, lng: 12.3155 },
  { name: "Osteria al Squero",           type: "restaurant", city: "Venezia",  address: "Fondamenta Nani 944",           inspectedAt: "2025-04-10", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-10", lat: 45.4303, lng: 12.3245 },
  { name: "Bacaro del Molo",             type: "bar",        city: "Venezia",  address: "Campo San Giacomo 78",          inspectedAt: "2025-05-20", revisoreScore: 4.2, googleScore: 4.1, tripadvisorScore: 4.0, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-20", lat: 45.4380, lng: 12.3360 },
  { name: "Pensione ai Dogi",            type: "hotel",      city: "Venezia",  address: "Salizada dei Greci 18",         inspectedAt: "2025-06-01", revisoreScore: 3.7, googleScore: 3.5, tripadvisorScore: 3.6, plaqueStatus: "warning", plaqueIssuedAt: "2025-06-01", lat: 45.4360, lng: 12.3420 },

  // ---- ROMA ----
  { name: "Trattoria del Vicolo",        type: "restaurant", city: "Roma",     address: "Vicolo delle Lanterne 45",      inspectedAt: "2025-06-01", revisoreScore: 3.8, googleScore: 3.5, tripadvisorScore: 3.4, plaqueStatus: "warning", plaqueIssuedAt: "2025-06-01", lat: 41.8902, lng: 12.4923 },
  { name: "Hotel Dei Fori Imperiali",    type: "hotel",      city: "Roma",     address: "Via Sacra 5",                   inspectedAt: "2025-02-14", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-02-14", lat: 41.8955, lng: 12.4823 },
  { name: "Caffe Sant'Eustachio",        type: "bar",        city: "Roma",     address: "Piazza Sant'Eustachio 82",      inspectedAt: "2025-03-22", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-22", lat: 41.8988, lng: 12.4732 },
  { name: "Ristorante Settimio all'Arancio", type: "restaurant", city: "Roma", address: "Via dell'Arancio 50",           inspectedAt: "2025-07-03", revisoreScore: 4.5, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-03", lat: 41.9042, lng: 12.4736 },
  { name: "Pizzeria da Remo",            type: "restaurant", city: "Roma",     address: "Piazza Santa Maria Liberatrice 44", inspectedAt: "2025-08-15", revisoreScore: 4.4, googleScore: 4.5, tripadvisorScore: 4.3, plaqueStatus: "active", plaqueIssuedAt: "2025-08-15", lat: 41.8752, lng: 12.4734 },
  { name: "Bar San Calisto",             type: "bar",        city: "Roma",     address: "Piazza San Calisto 4",          inspectedAt: "2025-09-10", revisoreScore: 2.4, googleScore: 2.6, tripadvisorScore: 2.5, plaqueStatus: "at_risk", plaqueIssuedAt: "2025-09-10", lat: 41.8908, lng: 12.4693 },

  // ---- NAPOLI ----
  { name: "Bar Stella del Porto",        type: "bar",        city: "Napoli",   address: "Piazza del Molo 1",             inspectedAt: "2025-08-20", revisoreScore: 2.5, googleScore: 2.8, tripadvisorScore: 2.9, plaqueStatus: "at_risk", plaqueIssuedAt: "2025-08-20", lat: 40.8400, lng: 14.2588 },
  { name: "Pizzeria Fuoco Verace",       type: "restaurant", city: "Napoli",   address: "Via dei Forni 32",              inspectedAt: "2025-09-10", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-10", lat: 40.8522, lng: 14.2681 },
  { name: "Grand Hotel Parker's",        type: "hotel",      city: "Napoli",   address: "Corso Vittorio Emanuele 135",   inspectedAt: "2025-04-05", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-05", lat: 40.8404, lng: 14.2309 },
  { name: "Trattoria da Nennella",       type: "restaurant", city: "Napoli",   address: "Vico Lungo Teatro Nuovo 103",   inspectedAt: "2025-10-11", revisoreScore: 4.3, googleScore: 4.4, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-11", lat: 40.8449, lng: 14.2496 },
  { name: "Caffè Gambrinus",             type: "bar",        city: "Napoli",   address: "Via Chiaia 1",                  inspectedAt: "2025-05-15", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-15", lat: 40.8362, lng: 14.2491 },

  // ---- FIRENZE ----
  { name: "Osteria del Borgo Antico",    type: "restaurant", city: "Firenze",  address: "Borgo dei Mercanti 43r",        inspectedAt: "2025-07-15", revisoreScore: 4.3, googleScore: 4.2, tripadvisorScore: 4.1, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-15", lat: 43.7696, lng: 11.2558 },
  { name: "Hotel Brunelleschi",          type: "hotel",      city: "Firenze",  address: "Piazza Santa Elisabetta 3",     inspectedAt: "2025-03-08", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-08", lat: 43.7724, lng: 11.2544 },
  { name: "Trattoria Mario",             type: "restaurant", city: "Firenze",  address: "Via Rosina 2r",                 inspectedAt: "2025-06-20", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-20", lat: 43.7743, lng: 11.2516 },
  { name: "Caffè Rivoire",               type: "bar",        city: "Firenze",  address: "Piazza della Signoria 5r",      inspectedAt: "2025-04-18", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-18", lat: 43.7697, lng: 11.2559 },
  { name: "Agriturismo Le Colline",      type: "agriturismo", city: "Firenze", address: "Via di Greve 201",              inspectedAt: "2025-09-25", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-25", lat: 43.7520, lng: 11.2200 },

  // ---- MILANO ----
  { name: "Four Seasons Hotel Milano",   type: "hotel",      city: "Milano",   address: "Via Gesù 6",                    inspectedAt: "2025-01-20", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-01-20", lat: 45.4694, lng: 9.1970 },
  { name: "Ristorante Cracco",           type: "restaurant", city: "Milano",   address: "Galleria Vittorio Emanuele II", inspectedAt: "2025-02-28", revisoreScore: 4.8, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-02-28", lat: 45.4654, lng: 9.1896 },
  { name: "Bar Basso",                   type: "bar",        city: "Milano",   address: "Via Plinio 39",                 inspectedAt: "2025-03-14", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-14", lat: 45.4810, lng: 9.2148 },
  { name: "Trattoria Milanese",          type: "restaurant", city: "Milano",   address: "Via Santa Marta 11",            inspectedAt: "2025-04-22", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-22", lat: 45.4640, lng: 9.1846 },
  { name: "Hotel Berna",                 type: "hotel",      city: "Milano",   address: "Via Napo Torriani 18",          inspectedAt: "2025-05-30", revisoreScore: 3.6, googleScore: 3.4, tripadvisorScore: 3.5, plaqueStatus: "warning", plaqueIssuedAt: "2025-05-30", lat: 45.4830, lng: 9.2050 },

  // ---- TORINO ----
  { name: "Hotel Turin Palace",          type: "hotel",      city: "Torino",   address: "Via Sacchi 8",                  inspectedAt: "2025-02-10", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-02-10", lat: 45.0632, lng: 7.6761 },
  { name: "Ristorante Del Cambio",       type: "restaurant", city: "Torino",   address: "Piazza Carignano 2",            inspectedAt: "2025-03-25", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-25", lat: 45.0693, lng: 7.6826 },
  { name: "Caffe San Carlo",             type: "bar",        city: "Torino",   address: "Piazza San Carlo 156",          inspectedAt: "2025-04-12", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-12", lat: 45.0681, lng: 7.6826 },
  { name: "Trattoria dell'Oca",          type: "restaurant", city: "Torino",   address: "Via della Basilica 19",         inspectedAt: "2025-07-08", revisoreScore: 4.2, googleScore: 4.1, tripadvisorScore: 4.0, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-08", lat: 45.0743, lng: 7.6729 },

  // ---- BOLOGNA ----
  { name: "Hotel Corona d'Oro",          type: "hotel",      city: "Bologna",  address: "Via Oberdan 12",                inspectedAt: "2025-05-05", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-05", lat: 44.4964, lng: 11.3431 },
  { name: "Osteria dell'Orsa",           type: "restaurant", city: "Bologna",  address: "Via Mentana 1",                 inspectedAt: "2025-06-14", revisoreScore: 4.5, googleScore: 4.6, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-14", lat: 44.4997, lng: 11.3505 },
  { name: "Bar Rosa Rose",               type: "bar",        city: "Bologna",  address: "Via Augusto Righi 8",           inspectedAt: "2025-08-01", revisoreScore: 4.1, googleScore: 4.0, tripadvisorScore: 3.9, plaqueStatus: "active",  plaqueIssuedAt: "2025-08-01", lat: 44.4970, lng: 11.3488 },
  { name: "Agriturismo Terre Rosse",     type: "agriturismo", city: "Bologna", address: "Via Monte Sole 34",             inspectedAt: "2025-10-02", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-02", lat: 44.4200, lng: 11.1500 },

  // ---- BERGAMO ----
  { name: "Ristorante La Vetta",         type: "restaurant", city: "Bergamo",  address: "Via dei Colli 17",              inspectedAt: "2025-04-20", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-20", lat: 45.7000, lng: 9.6700 },
  { name: "Hotel Piazza Vecchia",        type: "hotel",      city: "Bergamo",  address: "Via Colleoni 6",                inspectedAt: "2025-03-30", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-30", lat: 45.7035, lng: 9.6661 },
  { name: "Caffè del Tasso",             type: "bar",        city: "Bergamo",  address: "Piazza Vecchia 3",              inspectedAt: "2025-06-22", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-22", lat: 45.7038, lng: 9.6657 },
  { name: "Agriturismo Le Selve",        type: "agriturismo", city: "Bergamo", address: "Via Borghetto 45",              inspectedAt: "2025-09-18", revisoreScore: 4.3, googleScore: 4.2, tripadvisorScore: 4.1, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-18", lat: 45.6700, lng: 9.6200 },

  // ---- ALBA / PIEMONTE ----
  { name: "Relais Le Vigne",             type: "hotel",      city: "Alba",     address: "Località Bricco Alto 39",       inspectedAt: "2025-10-05", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-05", lat: 44.6990, lng: 8.0350 },
  { name: "Ristorante Piazza Duomo",     type: "restaurant", city: "Alba",     address: "Piazza Risorgimento 4",         inspectedAt: "2025-05-12", revisoreScore: 5.0, googleScore: 4.9, tripadvisorScore: 4.8, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-12", lat: 44.7006, lng: 8.0348 },
  { name: "Agriturismo Cascina Merlot",  type: "agriturismo", city: "Alba",    address: "Strada Barolo 22",              inspectedAt: "2025-07-30", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-30", lat: 44.6600, lng: 7.9300 },

  // ---- BELLAGIO / COMO ----
  { name: "Grand Hotel Belvedere",       type: "hotel",      city: "Bellagio", address: "Lungolago Regina 8",            inspectedAt: "2025-05-10", revisoreScore: 4.7, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-10", lat: 45.9843, lng: 9.2601 },
  { name: "Ristorante Bilacus",          type: "restaurant", city: "Bellagio", address: "Via Serbelloni 32",             inspectedAt: "2025-06-08", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-08", lat: 45.9848, lng: 9.2608 },
  { name: "Hotel Villa d'Este",          type: "hotel",      city: "Cernobbio", address: "Via Regina 40",                inspectedAt: "2025-04-01", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-01", lat: 45.8415, lng: 9.0796 },

  // ---- AMALFI / CAMPANIA ----
  { name: "Hotel Santa Caterina",        type: "hotel",      city: "Amalfi",   address: "Via Mauro Comite 9",            inspectedAt: "2025-05-18", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-18", lat: 40.6339, lng: 14.6026 },
  { name: "Ristorante La Caravella",     type: "restaurant", city: "Amalfi",   address: "Via Matteo Camera 12",          inspectedAt: "2025-06-25", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-25", lat: 40.6340, lng: 14.6028 },
  { name: "Bar Il Tari",                 type: "bar",        city: "Amalfi",   address: "Piazza Duomo 7",                inspectedAt: "2025-07-15", revisoreScore: 4.0, googleScore: 3.9, tripadvisorScore: 3.8, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-15", lat: 40.6341, lng: 14.6032 },
  { name: "Hotel Caruso",                type: "hotel",      city: "Ravello",  address: "Piazza San Giovanni del Toro 2", inspectedAt: "2025-08-12", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active", plaqueIssuedAt: "2025-08-12", lat: 40.6492, lng: 14.6140 },

  // ---- SICILIA ----
  { name: "Grand Hotel Villa Igiea",     type: "hotel",      city: "Palermo",  address: "Salita Belmonte 43",            inspectedAt: "2025-03-18", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-18", lat: 38.1348, lng: 13.3650 },
  { name: "Ristorante Bye Bye Blues",    type: "restaurant", city: "Palermo",  address: "Via del Garofalo 23",           inspectedAt: "2025-04-28", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-28", lat: 38.1072, lng: 13.3420 },
  { name: "Bar del Capo",                type: "bar",        city: "Palermo",  address: "Piazza Bellini 4",              inspectedAt: "2025-06-10", revisoreScore: 3.5, googleScore: 3.4, tripadvisorScore: 3.3, plaqueStatus: "warning", plaqueIssuedAt: "2025-06-10", lat: 38.1157, lng: 13.3624 },
  { name: "Hotel Excelsior Palace",      type: "hotel",      city: "Taormina", address: "Via Toselli 8",                 inspectedAt: "2025-07-20", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-20", lat: 37.8500, lng: 15.2885 },
  { name: "Ristorante Il Barcaiolo",     type: "restaurant", city: "Taormina", address: "Piazza Sant'Antonio 1",         inspectedAt: "2025-08-25", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-08-25", lat: 37.8510, lng: 15.2878 },

  // ---- SARDEGNA ----
  { name: "Hotel Cala di Volpe",         type: "hotel",      city: "Arzachena", address: "Località Cala di Volpe",       inspectedAt: "2025-06-15", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-15", lat: 41.0800, lng: 9.5200 },
  { name: "Agriturismo Su Vrau",         type: "agriturismo", city: "Nuoro",   address: "Loc. Sas Candelas 12",          inspectedAt: "2025-09-05", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-05", lat: 40.3240, lng: 9.3275 },
  { name: "Ristorante Corsaro",          type: "restaurant", city: "Cagliari", address: "Viale Regina Margherita 28",    inspectedAt: "2025-05-22", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-22", lat: 39.2254, lng: 9.1234 },

  // ---- TOSCANA EXTRA ----
  { name: "Castello di Velona Resort",   type: "hotel",      city: "Montalcino", address: "Loc. Velona 1",               inspectedAt: "2025-04-15", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-15", lat: 43.0556, lng: 11.4867 },
  { name: "Osteria Le Logge",            type: "restaurant", city: "Siena",   address: "Via del Porrione 33",            inspectedAt: "2025-06-30", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-30", lat: 43.3187, lng: 11.3308 },
  { name: "Agriturismo Poggio al Sole",  type: "agriturismo", city: "Pienza",  address: "Loc. Pieve di Corsignano 8",    inspectedAt: "2025-10-15", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-15", lat: 43.0777, lng: 11.6780 },
  { name: "Hotel Villa Bordoni",         type: "hotel",      city: "Greve in Chianti", address: "Via San Cresci 31",     inspectedAt: "2025-08-08", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-08-08", lat: 43.5804, lng: 11.3089 },

  // ---- UMBRIA ----
  { name: "Relais Il Canalicchio",       type: "hotel",      city: "Perugia",  address: "Via della Piaggiola 18",        inspectedAt: "2025-07-10", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-10", lat: 43.1122, lng: 12.3888 },
  { name: "Trattoria del Borgo",         type: "restaurant", city: "Assisi",   address: "Via Borgo Aretino 6",           inspectedAt: "2025-09-15", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-15", lat: 43.0707, lng: 12.6197 },

  // ---- PUGLIA ----
  { name: "Masseria Torre Coccaro",      type: "hotel",      city: "Fasano",   address: "Contrada Coccaro 8",            inspectedAt: "2025-05-28", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-28", lat: 40.8222, lng: 17.3553 },
  { name: "Ristorante Il Frantoio",      type: "restaurant", city: "Fasano",   address: "SS 16 Km 874",                  inspectedAt: "2025-06-18", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-18", lat: 40.8300, lng: 17.3600 },
  { name: "Agriturismo Masseria Grieco", type: "agriturismo", city: "Alberobello", address: "Contrada Cozzovallo 120",   inspectedAt: "2025-10-25", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-25", lat: 40.7860, lng: 17.2342 },
  { name: "Hotel Palazzo Ducale",        type: "hotel",      city: "Lecce",    address: "Via G. Paladini 65",            inspectedAt: "2025-07-25", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-25", lat: 40.3514, lng: 18.1718 },
  { name: "Ristorante Alle due Corti",   type: "restaurant", city: "Lecce",    address: "Corte dei Giugni 1",            inspectedAt: "2025-08-30", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-08-30", lat: 40.3516, lng: 18.1738 },

  // ---- LIGURIA ----
  { name: "Hotel Cenobio dei Dogi",      type: "hotel",      city: "Camogli",  address: "Via Cuneo 34",                  inspectedAt: "2025-04-20", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-20", lat: 44.3461, lng: 9.1538 },
  { name: "Ristorante Da Puny",          type: "restaurant", city: "Portofino", address: "Piazza Martiri dell'Olivetta 5", inspectedAt: "2025-05-25", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active", plaqueIssuedAt: "2025-05-25", lat: 44.3030, lng: 9.2100 },
  { name: "Bar Dorin",                   type: "bar",        city: "Genova",   address: "Via San Bernardo 68r",          inspectedAt: "2025-07-12", revisoreScore: 3.8, googleScore: 3.7, tripadvisorScore: 3.6, plaqueStatus: "warning", plaqueIssuedAt: "2025-07-12", lat: 44.4093, lng: 8.9344 },

  // ---- TRENTINO / ALTO ADIGE ----
  { name: "Hotel Adler Dolomiti",        type: "hotel",      city: "Ortisei",  address: "Via Rezia 7",                   inspectedAt: "2025-02-20", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-02-20", lat: 46.5742, lng: 11.6742 },
  { name: "Restaurant Zur Rose",         type: "restaurant", city: "Appiano",  address: "Josef-Innerhofer-Platz 2",      inspectedAt: "2025-03-05", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-05", lat: 46.5647, lng: 11.2591 },
  { name: "Agriturismo Maso Corto",      type: "agriturismo", city: "Naturno", address: "Via Maso Corto 2",              inspectedAt: "2025-09-28", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-28", lat: 46.6500, lng: 10.9500 },

  // ---- VENETO EXTRA ----
  { name: "Villa Cipriani",              type: "hotel",      city: "Asolo",    address: "Via Canova 298",                inspectedAt: "2025-04-08", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-08", lat: 45.8009, lng: 11.9126 },
  { name: "Osteria Dalla Libera",        type: "restaurant", city: "Padova",   address: "Piazza Cavour 15",              inspectedAt: "2025-05-14", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-05-14", lat: 45.4064, lng: 11.8768 },
  { name: "Hotel Villa Michelangelo",    type: "hotel",      city: "Vicenza",  address: "Via Sacco 35",                  inspectedAt: "2025-06-28", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-28", lat: 45.5455, lng: 11.5354 },
  { name: "Ristorante El Coq",           type: "restaurant", city: "Vicenza",  address: "Contra' Pedemuro San Biagio 25", inspectedAt: "2025-07-20", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active", plaqueIssuedAt: "2025-07-20", lat: 45.5484, lng: 11.5354 },

  // ---- EMILIA EXTRA ----
  { name: "Hotel i Portici",             type: "hotel",      city: "Bologna",  address: "Via dell'Indipendenza 69",      inspectedAt: "2025-03-12", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-03-12", lat: 44.5014, lng: 11.3411 },
  { name: "Ristorante Diana",            type: "restaurant", city: "Bologna",  address: "Via dell'Indipendenza 24",      inspectedAt: "2025-04-25", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-04-25", lat: 44.5003, lng: 11.3420 },
  { name: "Bar Zaccheria",               type: "bar",        city: "Modena",   address: "Via Albinelli 12",              inspectedAt: "2025-06-05", revisoreScore: 2.9, googleScore: 2.8, tripadvisorScore: 2.7, plaqueStatus: "at_risk", plaqueIssuedAt: "2025-06-05", lat: 44.6484, lng: 10.9260 },
  { name: "Osteria Francescana",         type: "restaurant", city: "Modena",   address: "Via Stella 22",                 inspectedAt: "2025-02-05", revisoreScore: 5.0, googleScore: 4.9, tripadvisorScore: 4.8, plaqueStatus: "active",  plaqueIssuedAt: "2025-02-05", lat: 44.6464, lng: 10.9265 },
  { name: "Agriturismo La Quercia",      type: "agriturismo", city: "Parma",   address: "Strada Montechiarugolo 44",     inspectedAt: "2025-10-18", revisoreScore: 4.4, googleScore: 4.3, tripadvisorScore: 4.2, plaqueStatus: "active",  plaqueIssuedAt: "2025-10-18", lat: 44.7300, lng: 10.4800 },

  // ---- MARCHE ----
  { name: "Hotel Fortino Napoleonico",   type: "hotel",      city: "Portonovo", address: "Via Poggio 166",               inspectedAt: "2025-07-05", revisoreScore: 4.7, googleScore: 4.6, tripadvisorScore: 4.5, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-05", lat: 43.5722, lng: 13.6400 },
  { name: "Ristorante Uliassi",          type: "restaurant", city: "Senigallia", address: "Banchina di Levante 6",       inspectedAt: "2025-08-18", revisoreScore: 4.9, googleScore: 4.8, tripadvisorScore: 4.7, plaqueStatus: "active",  plaqueIssuedAt: "2025-08-18", lat: 43.7204, lng: 13.2161 },

  // ---- CALABRIA ----
  { name: "Agriturismo Locanda di Alia", type: "agriturismo", city: "Castrovillari", address: "Via Jetticelle 55",       inspectedAt: "2025-09-12", revisoreScore: 4.5, googleScore: 4.4, tripadvisorScore: 4.3, plaqueStatus: "active",  plaqueIssuedAt: "2025-09-12", lat: 39.8128, lng: 16.2048 },
  { name: "Hotel Baia dell'Est",         type: "hotel",      city: "Tropea",   address: "Viale Stazione 22",             inspectedAt: "2025-07-28", revisoreScore: 4.3, googleScore: 4.2, tripadvisorScore: 4.1, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-28", lat: 38.6720, lng: 15.8985 },

  // ---- BASILICATA ----
  { name: "Sextantio Le Grotte della Civita", type: "hotel", city: "Matera",  address: "Via Civita 28",                 inspectedAt: "2025-06-22", revisoreScore: 4.8, googleScore: 4.7, tripadvisorScore: 4.6, plaqueStatus: "active",  plaqueIssuedAt: "2025-06-22", lat: 40.6659, lng: 16.6095 },
  { name: "Ristorante Baccanti",         type: "restaurant", city: "Matera",   address: "Via Sant'Angelo 58",            inspectedAt: "2025-07-18", revisoreScore: 4.6, googleScore: 4.5, tripadvisorScore: 4.4, plaqueStatus: "active",  plaqueIssuedAt: "2025-07-18", lat: 40.6659, lng: 16.6082 },
];

export const SEED_RATINGS = [
  { placeId: 1, score: 4.7, comment: "Servizio impeccabile, vista mozzafiato sulla laguna.",      authorName: "Marco Rossi" },
  { placeId: 1, score: 4.8, comment: "Hotel di lusso autentico, personale straordinario.",         authorName: "Giulia Bianchi" },
  { placeId: 2, score: 4.5, comment: "Cicchetti genuini, nessuna trappola turistica.",             authorName: "Luca Ferrari" },
  { placeId: 3, score: 4.2, comment: "Aperitivo rilassato, prezzi onesti per Venezia.",            authorName: "Sara De Luca" },
  { placeId: 5, score: 3.7, comment: "Cucina tradizionale buona, tavoli un po' ravvicinati.",      authorName: "Davide Costa" },
  { placeId: 6, score: 4.9, comment: "Il caffè migliore di Roma senza discutere.",                 authorName: "Anna Colombo" },
  { placeId: 7, score: 4.6, comment: "Menù stagionale con ingredienti di qualità.",                authorName: "Paolo Greco" },
  { placeId: 8, score: 4.5, comment: "La pizza fritta è un'esperienza a sé.",                      authorName: "Sofia Marino" },
  { placeId: 11, score: 4.4, comment: "Impasto a lungo lievitato, si sente la differenza.",        authorName: "Roberto Esposito" },
  { placeId: 12, score: 4.7, comment: "Hotel con personalità, non il solito quattro stelle.",      authorName: "Elena Ricci" },
  { placeId: 13, score: 4.3, comment: "Trattoria caotica ma autentica, prezzi giusti.",            authorName: "Giorgio Conti" },
  { placeId: 14, score: 4.8, comment: "Il caffè è un rito qui, non solo una bevanda.",             authorName: "Federica Morelli" },
  { placeId: 15, score: 4.2, comment: "Ribollita eccellente, ottimo rapporto qualità-prezzo.",     authorName: "Antonio Leone" },
  { placeId: 16, score: 4.8, comment: "Suite elegante con vista sull'Arno mozzafiato.",            authorName: "Chiara Gallo" },
  { placeId: 17, score: 4.6, comment: "Paste al ragù indimenticabili, servizio caloroso.",         authorName: "Francesco Serra" },
  { placeId: 18, score: 4.5, comment: "Tavolino in piazza, tramonto su Santa Croce.",              authorName: "Valentina Marini" },
  { placeId: 19, score: 4.7, comment: "L'agriturismo ideale a dieci minuti da Firenze.",           authorName: "Alessandro Ferri" },
  { placeId: 20, score: 4.9, comment: "Hotel che non lascia spazio alle lamentele.",               authorName: "Beatrice Lombardi" },
  { placeId: 21, score: 4.8, comment: "Il migliore Negroni della mia vita.",                       authorName: "Marco Rossi" },
  { placeId: 22, score: 4.4, comment: "Risotto al midollo perfetto, servizio puntuale.",           authorName: "Giulia Bianchi" },
  { placeId: 25, score: 4.8, comment: "Hotel con storia, ogni dettaglio curato.",                  authorName: "Luca Ferrari" },
  { placeId: 26, score: 4.9, comment: "Ristorante storico che mantiene il livello.",               authorName: "Sara De Luca" },
  { placeId: 30, score: 4.6, comment: "Cucina bolognese autentica, nessuna concessione al turismo.", authorName: "Davide Costa" },
  { placeId: 33, score: 4.9, comment: "La vetta della gastronomia bergamasca.",                    authorName: "Anna Colombo" },
  { placeId: 36, score: 4.8, comment: "Relais nelle Langhe: silenzio e vino eccellente.",          authorName: "Paolo Greco" },
  { placeId: 37, score: 5.0, comment: "Esperienza gastronomica totale, impeccabile.",              authorName: "Sofia Marino" },
  { placeId: 40, score: 4.8, comment: "Hotel che fa innamorare del Lago di Como.",                 authorName: "Roberto Esposito" },
  { placeId: 44, score: 4.7, comment: "Vista sul golfo di Napoli, colazione sontuosa.",            authorName: "Elena Ricci" },
  { placeId: 47, score: 4.9, comment: "Hotel nei Sassi: dormire nella storia.",                    authorName: "Giorgio Conti" },
];

export const SEED_USERS = [
  { email: "dev@revisore.it",     password: "revisore-dev-2026",     name: "Yevhen Khara",  role: "developer" },
  { email: "partner@revisore.it", password: "revisore-partner-2026", name: "Partner Demo",  role: "partner" },
  { email: "utente@revisore.it",  password: "revisore-utente-2026",  name: "Utente Demo",   role: "user" },
];
