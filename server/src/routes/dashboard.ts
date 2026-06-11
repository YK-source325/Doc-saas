import { Router } from "express";
import { db } from "../db.js";
import { communityRatings } from "../schema.js";
import {
  loadEnrichedPlaces,
  monthsActive,
  renewalDueAt,
  round2,
} from "../enrich.js";

const router = Router();

// GET /api/dashboard/stats
router.get("/stats", async (_req, res) => {
  const [enriched, ratings] = await Promise.all([
    loadEnrichedPlaces(),
    db.select({ id: communityRatings.id }).from(communityRatings),
  ]);
  const currentYear = new Date().getFullYear();
  const byStatus = (status: string) => enriched.filter((p) => p.plaqueStatus === status).length;
  res.json({
    totalInspected: enriched.length,
    activePlaques: byStatus("active"),
    warningPlaques: byStatus("warning"),
    atRiskPlaques: byStatus("at_risk"),
    revokedPlaques: byStatus("revoked"),
    totalCommunityRatings: ratings.length,
    averageFinalScore:
      enriched.length === 0
        ? 0
        : round2(enriched.reduce((a, p) => a + p.finalScore, 0) / enriched.length),
    inspectionsThisYear: enriched.filter(
      (p) => new Date(p.inspectedAt).getFullYear() === currentYear
    ).length,
  });
});

// GET /api/dashboard/leaderboard
router.get("/leaderboard", async (_req, res) => {
  const enriched = await loadEnrichedPlaces();
  const sorted = [...enriched].sort((a, b) => b.finalScore - a.finalScore);
  res.json(
    sorted.map((p, i) => ({
      rank: i + 1,
      placeId: p.id,
      name: p.name,
      city: p.city,
      type: p.type,
      finalScore: p.finalScore,
      plaqueStatus: p.plaqueStatus,
      trend: p.finalScore >= 4.0 ? "up" : p.finalScore >= 3.0 ? "stable" : "down",
    }))
  );
});

// GET /api/dashboard/plaque-alerts
router.get("/plaque-alerts", async (_req, res) => {
  const enriched = await loadEnrichedPlaces();
  const alerts = enriched
    .filter((p) => p.plaqueStatus === "warning" || p.plaqueStatus === "at_risk")
    .sort((a, b) => a.finalScore - b.finalScore)
    .map((p) => ({
      ...p,
      monthsActive: monthsActive(p.plaqueIssuedAt),
      renewalDueAt: renewalDueAt(p.plaqueIssuedAt),
    }));
  res.json(alerts);
});

export default router;
