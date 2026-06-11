import { Router } from "express";
import { db } from "../db.js";
import { communityRatings } from "../schema.js";
import { loadEnrichedPlaces, round2 } from "../enrich.js";
import { requireRole } from "../auth.js";

const router = Router();

const ECONOMIC_PROJECTION = [
  { year: "Anno 1 (2026-27)", members: "0–20.000",        revenue: "5.000–25.000€",    result: "Investimento",  positive: false },
  { year: "Anno 2 (2027-28)", members: "20.000–80.000",   revenue: "40.000–100.000€",  result: "+10k/+50k€",    positive: true },
  { year: "Anno 3 (2028-29)", members: "80.000–200.000",  revenue: "100.000–250.000€", result: "+50k/+170k€",   positive: true },
  { year: "Anno 4 (2029-30)", members: "200.000–500.000", revenue: "200.000–500.000€", result: "+120k/+380k€",  positive: true },
  { year: "Anno 5 (2030-31)", members: "500.000+",        revenue: "500k–1M+€",        result: "+380k/+800k€",  positive: true },
];

const PLAQUE_PRICING = [
  { tier: "SILVER",  range: "Score 3.5–3.9", annualFee: 200 },
  { tier: "ORO",     range: "Score 4.0–4.7", annualFee: 350 },
  { tier: "DIAMOND", range: "Score 4.8+",    annualFee: 500 },
];

// GET /api/partner/overview — solo partner e developer
router.get("/overview", requireRole("partner", "developer"), async (_req, res) => {
  const [enriched, ratings] = await Promise.all([
    loadEnrichedPlaces(),
    db.select({ id: communityRatings.id }).from(communityRatings),
  ]);
  const active = enriched.filter((p) => p.plaqueStatus === "active");
  const tierFee = (score: number) => (score >= 4.8 ? 500 : score >= 4.0 ? 350 : score >= 3.5 ? 200 : 0);
  res.json({
    kpi: {
      totalInspected: enriched.length,
      activePlaques: active.length,
      averageFinalScore:
        enriched.length === 0
          ? 0
          : round2(enriched.reduce((a, p) => a + p.finalScore, 0) / enriched.length),
      totalCommunityRatings: ratings.length,
      annualRecurringRevenue: enriched.reduce((a, p) => a + tierFee(p.finalScore), 0),
    },
    plaquePricing: PLAQUE_PRICING,
    economicProjection: ECONOMIC_PROJECTION,
  });
});

export default router;
