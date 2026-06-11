import { sql } from "drizzle-orm";
import { db } from "./db.js";
import { communityRatings, places, users } from "./schema.js";
import { hashPassword } from "./auth.js";
import { SEED_PLACES, SEED_RATINGS, SEED_USERS } from "./seedData.js";

async function seed() {
  await db.execute(sql`TRUNCATE TABLE community_ratings, places, users RESTART IDENTITY CASCADE`);

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

  console.log(
    `Seed completato: ${SEED_PLACES.length} strutture, ${SEED_RATINGS.length} valutazioni, ${SEED_USERS.length} utenti.`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed fallito:", err);
  process.exit(1);
});
