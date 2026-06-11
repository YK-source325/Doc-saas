import { Router } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db.js";
import { users } from "../schema.js";
import {
  clearAuthCookie,
  hashPassword,
  readAuthUser,
  setAuthCookie,
  verifyPassword,
  type AuthUser,
  type Role,
} from "../auth.js";

const router = Router();

function publicUser(row: typeof users.$inferSelect): AuthUser {
  return { id: row.id, email: row.email, name: row.name, role: row.role as Role };
}

const registerBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(80),
});

// POST /api/auth/register — sempre ruolo "user"
router.post("/register", async (req, res) => {
  const body = registerBody.safeParse(req.body);
  if (!body.success) {
    return void res.status(400).json({ error: "Dati non validi", details: body.error.flatten() });
  }
  const email = body.data.email.toLowerCase();
  const [existing] = await db.select().from(users).where(eq(users.email, email));
  if (existing) return void res.status(409).json({ error: "Email già registrata" });

  const [created] = await db
    .insert(users)
    .values({
      email,
      passwordHash: hashPassword(body.data.password),
      name: body.data.name,
      role: "user",
    })
    .returning();
  const user = publicUser(created);
  setAuthCookie(res, user);
  res.status(201).json(user);
});

const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const body = loginBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: "Dati non validi" });
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, body.data.email.toLowerCase()));
  if (!row || !verifyPassword(body.data.password, row.passwordHash)) {
    return void res.status(401).json({ error: "Credenziali non valide" });
  }
  const user = publicUser(row);
  setAuthCookie(res, user);
  res.json(user);
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  const user = readAuthUser(req);
  if (!user) return void res.status(401).json({ error: "Non autenticato" });
  res.json(user);
});

export default router;
