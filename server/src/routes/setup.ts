import { Router } from "express";
import { sql } from "drizzle-orm";
import { db } from "../db.js";
import { communityRatings, places, users } from "../schema.js";
import { hashPassword } from "../auth.js";
import { SEED_PLACES, SEED_RATINGS, SEED_USERS } from "../seedData.js";

async function initialize(): Promise<boolean> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS places (
      id serial PRIMARY KEY,
      name text NOT NULL,
      type text NOT NULL,
      city text NOT NULL,
      address text NOT NULL,
      inspected_at text NOT NULL,
      revisore_score real NOT NULL,
      google_score real,
      tripadvisor_score real,
      plaque_status text NOT NULL DEFAULT 'active',
      plaque_issued_at text,
      image_url text,
      created_at timestamp DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS community_ratings (
      id serial PRIMARY KEY,
      place_id integer NOT NULL REFERENCES places(id),
      score real NOT NULL,
      comment text,
      author_name text NOT NULL,
      created_at timestamp DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      email text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      name text NOT NULL,
      role text NOT NULL DEFAULT 'user',
      created_at timestamp DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS subscription_requests (
      id serial PRIMARY KEY,
      structure_name text NOT NULL,
      contact_name text NOT NULL,
      email text NOT NULL,
      phone text,
      city text NOT NULL,
      type text NOT NULL,
      tier text NOT NULL,
      message text,
      status text NOT NULL DEFAULT 'new',
      created_at timestamp DEFAULT now()
    )
  `);
  await db.execute(sql`ALTER TABLE community_ratings ADD COLUMN IF NOT EXISTS user_id integer`);

  const existing = await db.select({ id: places.id }).from(places).limit(1);
  if (existing.length > 0) return false;

  await db.insert(places).values(SEED_PLACES);
  await db.insert(communityRatings).values(SEED_RATINGS);
  await db.insert(users).values(
    SEED_USERS.map((u) => ({
      email: u.email,
      passwordHash: hashPassword(u.password),
      name: u.name,
      role: u.role,
    }))
  );
  return true;
}

let initPromise: Promise<boolean> | null = null;

// Inizializzazione automatica e idempotente: parte alla prima richiesta API,
// crea le tabelle se mancano e carica i dati demo solo se il database è vuoto.
// In caso di errore (es. database non ancora collegato) riprova alla richiesta successiva.
export function ensureDatabaseReady(): Promise<boolean> {
  if (!initPromise) {
    initPromise = initialize().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

const router = Router();

// GET /api/setup — mantenuto per controllo manuale; il sito si inizializza da solo.
router.get("/", async (_req, res) => {
  const seeded = await ensureDatabaseReady();
  res.json({
    status: "ok",
    message: seeded
      ? `Database inizializzato: ${SEED_PLACES.length} strutture, ${SEED_RATINGS.length} valutazioni, ${SEED_USERS.length} account.`
      : "Database già inizializzato: nessuna modifica.",
    seeded,
  });
});

export default router;
