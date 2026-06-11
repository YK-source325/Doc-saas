import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

// Accetta la variabile di qualunque provider collegato da Vercel:
// Neon imposta DATABASE_URL, Supabase/Vercel Postgres impostano POSTGRES_URL.
const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  "postgres://revisore:revisore@localhost:5432/revisore";

const isLocal =
  connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

const pool = new pg.Pool({
  connectionString,
  // I provider cloud richiedono SSL; in locale no.
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
