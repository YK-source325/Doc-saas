import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db.js";
import { subscriptionRequests } from "../schema.js";
import { requireRole } from "../auth.js";

const router = Router();

const requestBody = z.object({
  structureName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  city: z.string().min(2).max(80),
  type: z.enum(["hotel", "restaurant", "bar", "agriturismo"]),
  tier: z.enum(["SILVER", "ORO", "DIAMOND"]),
  message: z.string().max(600).optional(),
});

// POST /api/subscriptions — richiesta pubblica di abbonamento/ispezione
router.post("/", async (req, res) => {
  const body = requestBody.safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi", details: body.error.flatten() });
  }
  const [created] = await db
    .insert(subscriptionRequests)
    .values({
      ...body.data,
      phone: body.data.phone ?? null,
      message: body.data.message ?? null,
    })
    .returning();
  res.status(201).json(created);
});

// GET /api/subscriptions — solo developer
router.get("/", requireRole("developer"), async (_req, res) => {
  const rows = await db
    .select()
    .from(subscriptionRequests)
    .orderBy(desc(subscriptionRequests.createdAt), desc(subscriptionRequests.id));
  res.json(rows);
});

// PATCH /api/subscriptions/:id — cambio stato, solo developer
router.patch("/:id", requireRole("developer"), async (req, res) => {
  const id = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!id.success) return void res.status(400).json({ error: "Id non valido" });
  const body = z
    .object({ status: z.enum(["new", "contacted", "active", "rejected"]) })
    .safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: "Dati non validi" });
  const [updated] = await db
    .update(subscriptionRequests)
    .set({ status: body.data.status })
    .where(eq(subscriptionRequests.id, id.data))
    .returning();
  if (!updated) return void res.status(404).json({ error: "Richiesta non trovata" });
  res.json(updated);
});

export default router;
