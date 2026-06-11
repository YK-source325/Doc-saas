import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://revisore:revisore@localhost:5432/revisore",
});

export const db = drizzle(pool, { schema });
