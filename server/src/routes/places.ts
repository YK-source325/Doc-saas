import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db.js";
import { communityRatings, places } from "../schema.js";
import { WEIGHTS, computeOnlineScore } from "../scoring.js";
import {
  enrichPlace,
  loadEnrichedPlaces,
  monthsActive,
  renewalDueAt,
} from "../enrich.js";
import { requireAuth, requireRole } from "../auth.js";

const router = Router();

const idParam = z.coerce.number().int().positive();

async function loadEnrichedPlace(id: number) {
  const [row] = await db.select().from(places).where(eq(places.id, id));
  if (!row) return null;
  const ratings = await db
    .select()
    .from(communityRatings)
    .where(eq(communityRatings.placeId, id))
    .orderBy(desc(communityRatings.createdAt), desc(communityRatings.id));
  return { row, ratings, enriched: enrichPlace(row, ratings.map((r) => r.score)) };
}

// GET /api/places?type=&city=&status=
router.get("/", async (req, res) => {
  const { type, city, status } = req.query as Record<string, string | undefined>;
  let result = await loadEnrichedPlaces();
  if (type) result = result.filter((p) => p.type === type);
  if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
  if (status) result = result.filter((p) => p.plaqueStatus === status);
  res.json(result);
});

// GET /api/places/:id
router.get("/:id", async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const data = await loadEnrichedPlace(id.data);
  if (!data) return void res.status(404).json({ error: "Struttura non trovata" });
  res.json({ ...data.enriched, recentRatings: data.ratings.slice(0, 10) });
});

// GET /api/places/:id/live-score
router.get("/:id/live-score", async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const data = await loadEnrichedPlace(id.data);
  if (!data) return void res.status(404).json({ error: "Struttura non trovata" });
  const { row, enriched } = data;
  res.json({
    placeId: row.id,
    revisoreScore: row.revisoreScore,
    revisoreWeight: WEIGHTS.REVISORE,
    googleScore: row.googleScore,
    tripadvisorScore: row.tripadvisorScore,
    onlinePlatformScore: computeOnlineScore(row.googleScore, row.tripadvisorScore),
    onlineWeight: WEIGHTS.ONLINE,
    communityScore: enriched.communityScore,
    communityWeight: WEIGHTS.COMMUNITY,
    finalScore: enriched.finalScore,
    plaqueStatus: enriched.plaqueStatus,
    monthsActive: monthsActive(row.plaqueIssuedAt),
    renewalDueAt: renewalDueAt(row.plaqueIssuedAt),
  });
});

// GET /api/places/:id/ratings
router.get("/:id/ratings", async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const ratings = await db
    .select()
    .from(communityRatings)
    .where(eq(communityRatings.placeId, id.data))
    .orderBy(desc(communityRatings.createdAt), desc(communityRatings.id));
  res.json(ratings);
});

const ratingBody = z.object({
  score: z.number().min(1).max(5),
  comment: z.string().max(300).optional(),
});

// POST /api/places/:id/ratings — richiede login, authorName dall'account
router.post("/:id/ratings", requireAuth, async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const body = ratingBody.safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi", details: body.error.flatten() });
  }
  const [place] = await db.select().from(places).where(eq(places.id, id.data));
  if (!place) return void res.status(404).json({ error: "Struttura non trovata" });

  const [created] = await db
    .insert(communityRatings)
    .values({
      placeId: id.data,
      score: body.data.score,
      comment: body.data.comment ?? null,
      authorName: req.user!.name,
      userId: req.user!.id,
    })
    .returning();
  res.status(201).json(created);
});

const placeBody = z.object({
  name: z.string().min(1),
  type: z.enum(["hotel", "restaurant", "bar", "agriturismo"]),
  city: z.string().min(1),
  address: z.string().min(1),
  inspectedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  revisoreScore: z.number().min(0).max(5),
  googleScore: z.number().min(0).max(5).nullable().optional(),
  tripadvisorScore: z.number().min(0).max(5).nullable().optional(),
  plaqueStatus: z.enum(["active", "warning", "at_risk", "revoked"]).optional(),
  plaqueIssuedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

// POST /api/places — solo developer
router.post("/", requireRole("developer"), async (req, res) => {
  const body = placeBody.safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi", details: body.error.flatten() });
  }
  const [created] = await db
    .insert(places)
    .values({
      ...body.data,
      googleScore: body.data.googleScore ?? null,
      tripadvisorScore: body.data.tripadvisorScore ?? null,
      plaqueStatus: body.data.plaqueStatus ?? "active",
      plaqueIssuedAt: body.data.plaqueIssuedAt ?? body.data.inspectedAt,
      imageUrl: body.data.imageUrl ?? null,
    })
    .returning();
  res.status(201).json(created);
});

// PUT /api/places/:id — solo developer
router.put("/:id", requireRole("developer"), async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const body = placeBody.partial().safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi", details: body.error.flatten() });
  }
  const [updated] = await db
    .update(places)
    .set(body.data)
    .where(eq(places.id, id.data))
    .returning();
  if (!updated) return void res.status(404).json({ error: "Struttura non trovata" });
  res.json(updated);
});

// PATCH /api/places/:id/plaque-status — solo developer
router.patch("/:id/plaque-status", requireRole("developer"), async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const body = z
    .object({ plaqueStatus: z.enum(["active", "warning", "at_risk", "revoked"]) })
    .safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: "Dati non validi" });
  const [updated] = await db
    .update(places)
    .set({ plaqueStatus: body.data.plaqueStatus })
    .where(eq(places.id, id.data))
    .returning();
  if (!updated) return void res.status(404).json({ error: "Struttura non trovata" });
  res.json(updated);
});

// DELETE /api/places/:id — solo developer
router.delete("/:id", requireRole("developer"), async (req, res) => {
  const id = idParam.safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  await db.delete(communityRatings).where(eq(communityRatings.placeId, id.data));
  const deleted = await db.delete(places).where(eq(places.id, id.data)).returning();
  if (deleted.length === 0) return void res.status(404).json({ error: "Struttura non trovata" });
  res.status(204).end();
});

export default router;
