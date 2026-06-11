import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { db } from "../db.js";
import { communityRatings, places } from "../schema.js";
import { requireAuth } from "../auth.js";

const router = Router();

// GET /api/account/ratings — le valutazioni dell'utente loggato
router.get("/ratings", requireAuth, async (req, res) => {
  const rows = await db
    .select({
      id: communityRatings.id,
      placeId: communityRatings.placeId,
      score: communityRatings.score,
      comment: communityRatings.comment,
      createdAt: communityRatings.createdAt,
      placeName: places.name,
      placeCity: places.city,
    })
    .from(communityRatings)
    .innerJoin(places, eq(communityRatings.placeId, places.id))
    .where(eq(communityRatings.userId, req.user!.id))
    .orderBy(desc(communityRatings.createdAt), desc(communityRatings.id));
  res.json(rows);
});

export default router;
