# REVISORE

Piattaforma AI di Ispezione e Certificazione dell'Ospitalità Italiana.
Fondatore: **Yevhen Khara** © 2026.

## Stack

| Livello | Tecnologia |
| --- | --- |
| Backend | Node.js 20+, Express 5, TypeScript, Zod |
| Database | PostgreSQL, Drizzle ORM |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS v3 |
| Dati | Axios + TanStack Query v5 (auto-refresh 30s su dashboard) |
| Auth | Email + password (bcrypt), sessione JWT in cookie httpOnly, 3 ruoli |

## Avvio rapido

```bash
# 1. Database (PostgreSQL in esecuzione)
createuser revisore --pwprompt          # password: revisore
createdb revisore --owner revisore
# oppure imposta DATABASE_URL (default: postgres://revisore:revisore@localhost:5432/revisore)

# 2. Server (porta 8080)
cd server
npm install
npm run db:push      # crea le tabelle
npm run db:seed      # 8 strutture, 18 valutazioni, 3 account demo
npm run dev

# 3. Client (porta 5173, proxy /api → 8080)
cd client
npm install
npm run dev
```

### Produzione

```bash
cd client && npm run build      # genera client/dist
cd ../server && NODE_ENV=production JWT_SECRET=<segreto-forte> npm start
```

Il server Express serve `client/dist` per tutti i path non-API.

## Account demo (da cambiare in produzione)

| Ruolo | Email | Password | Accesso |
| --- | --- | --- | --- |
| Sviluppatore | `dev@revisore.it` | `revisore-dev-2026` | Pannello `/admin` (CRUD strutture, stato targhe) + Area Partner |
| Partner | `partner@revisore.it` | `revisore-partner-2026` | Area `/partner` (KPI, modello di ricavo, proiezione 5 anni) |
| Utente | `utente@revisore.it` | `revisore-utente-2026` | Valutazioni community |

La registrazione pubblica (`/registrati`) crea sempre account con ruolo **utente**.

## L'algoritmo

Score finale = ponderazione dinamica di tre fonti (i pesi si rinormalizzano se una fonte manca):

- **40%** Ispezione Revisore (protocollo UNI 11312)
- **30%** Reputazione online (media Google + TripAdvisor)
- **30%** Community score (valutazioni utenti registrati)

Stato targa derivato dallo score live: `active` ≥ 4.0, `warning` ≥ 3.0, `at_risk` < 3.0.
Tier targa: DIAMOND ≥ 4.8, ORO ≥ 4.0, SILVER ≥ 3.5.

## API principali

```
GET  /api/healthz
GET  /api/places?type=&city=&status=
GET  /api/places/:id                     (+ recentRatings)
GET  /api/places/:id/live-score
GET  /api/places/:id/ratings
POST /api/places/:id/ratings             (login richiesto)
GET  /api/dashboard/stats
GET  /api/dashboard/leaderboard
GET  /api/dashboard/plaque-alerts
POST /api/auth/register | login | logout
GET  /api/auth/me
GET  /api/partner/overview               (ruolo partner/developer)
POST/PUT/PATCH/DELETE /api/places...     (ruolo developer)
```

## Pagine

| Percorso | Contenuto |
| --- | --- |
| `/` | Hero con KPI animati, algoritmo, top eccellenze, 3 livelli, proiezione economica |
| `/places` | Directory con filtri (città, categoria, stato) |
| `/places/:id` | Score live con breakdown, info struttura, valutazioni e form community |
| `/dashboard` | Command center: KPI, allarmi revoca, leaderboard live (refresh 30s) |
| `/targhe` | I tre tier (Silver/Oro/Diamond), come funziona, strutture certificate |
| `/trailer` | Trailer cinematico animato "Che cos'è REVISORE?" |
| `/chi-siamo` | Profilo fondatore, pilastri, roadmap, certificazioni, kit di ispezione |
| `/media` | Scene animate dei 6 video + sceneggiature professionali per le riprese reali |
| `/partner` | Area riservata investitori (KPI live, modello di ricavo, proiezione) |
| `/admin` | Pannello sviluppatore (CRUD strutture, stato targhe) |
