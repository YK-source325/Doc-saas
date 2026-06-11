import { db } from "./db.js";
import { communityRatings, places } from "./schema.js";
import { computeFinalScore, computePlaqueStatus } from "./scoring.js";

export type PlaceRow = typeof places.$inferSelect;

export interface EnrichedPlace extends Omit<PlaceRow, "plaqueStatus"> {
  plaqueStatus: string;
  communityScore: number | null;
  communityRatingCount: number;
  finalScore: number;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function communityAverage(scores: number[]): number | null {
  if (scores.length === 0) return null;
  return round2(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function enrichPlace(place: PlaceRow, ratingScores: number[]): EnrichedPlace {
  const communityScore = communityAverage(ratingScores);
  const finalScore = computeFinalScore(
    place.revisoreScore,
    place.googleScore,
    place.tripadvisorScore,
    communityScore
  );
  return {
    ...place,
    communityScore,
    communityRatingCount: ratingScores.length,
    finalScore,
    plaqueStatus: place.plaqueStatus === "revoked" ? "revoked" : computePlaqueStatus(finalScore),
  };
}

export async function loadRatingScoresByPlace(): Promise<Map<number, number[]>> {
  const rows = await db
    .select({ placeId: communityRatings.placeId, score: communityRatings.score })
    .from(communityRatings);
  const map = new Map<number, number[]>();
  for (const row of rows) {
    const list = map.get(row.placeId) ?? [];
    list.push(row.score);
    map.set(row.placeId, list);
  }
  return map;
}

export async function loadEnrichedPlaces(): Promise<EnrichedPlace[]> {
  const [rows, scoresByPlace] = await Promise.all([
    db.select().from(places),
    loadRatingScoresByPlace(),
  ]);
  return rows.map((p) => enrichPlace(p, scoresByPlace.get(p.id) ?? []));
}

export function monthsActive(plaqueIssuedAt: string | null): number | null {
  if (!plaqueIssuedAt) return null;
  const issued = new Date(plaqueIssuedAt);
  if (Number.isNaN(issued.getTime())) return null;
  const now = new Date();
  const months =
    (now.getFullYear() - issued.getFullYear()) * 12 + (now.getMonth() - issued.getMonth());
  return Math.max(0, months);
}

export function renewalDueAt(plaqueIssuedAt: string | null): string | null {
  if (!plaqueIssuedAt) return null;
  const issued = new Date(plaqueIssuedAt);
  if (Number.isNaN(issued.getTime())) return null;
  issued.setFullYear(issued.getFullYear() + 1);
  return issued.toISOString().slice(0, 10);
}
