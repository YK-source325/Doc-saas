import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "revisore-dev-secret-cambiami";
const COOKIE_NAME = "revisore_token";
const TOKEN_TTL = "7d";

export type Role = "user" | "partner" | "developer";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function setAuthCookie(res: Response, user: AuthUser): void {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_TTL });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME);
}

export function readAuthUser(req: Request): AuthUser | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthUser & jwt.JwtPayload;
    return { id: payload.id, email: payload.email, name: payload.name, role: payload.role };
  } catch {
    return null;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const user = readAuthUser(req);
  if (!user) {
    res.status(401).json({ error: "Autenticazione richiesta" });
    return;
  }
  req.user = user;
  next();
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = readAuthUser(req);
    if (!user) {
      res.status(401).json({ error: "Autenticazione richiesta" });
      return;
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({ error: "Permessi insufficienti" });
      return;
    }
    req.user = user;
    next();
  };
}
