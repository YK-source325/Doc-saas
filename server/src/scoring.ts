export const WEIGHTS = {
  REVISORE:  0.40,
  ONLINE:    0.30,
  COMMUNITY: 0.30,
};

export function computeOnlineScore(google: number | null, tripadvisor: number | null): number | null {
  const scores = [google, tripadvisor].filter((s): s is number => s !== null);
  if (scores.length === 0) return null;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
}

export function computeFinalScore(
  revisore: number,
  google: number | null,
  tripadvisor: number | null,
  community: number | null
): number {
  const online = computeOnlineScore(google, tripadvisor);
  let totalWeight = WEIGHTS.REVISORE;
  let weighted = revisore * WEIGHTS.REVISORE;
  if (online !== null) { totalWeight += WEIGHTS.ONLINE; weighted += online * WEIGHTS.ONLINE; }
  if (community !== null) { totalWeight += WEIGHTS.COMMUNITY; weighted += community * WEIGHTS.COMMUNITY; }
  return Math.round((weighted / totalWeight) * 100) / 100;
}

export function computePlaqueStatus(score: number): "active" | "warning" | "at_risk" {
  if (score >= 4.0) return "active";
  if (score >= 3.0) return "warning";
  return "at_risk";
}

export function computePlaqueTier(score: number): "DIAMOND" | "ORO" | "SILVER" | null {
  if (score >= 4.8) return "DIAMOND";
  if (score >= 4.0) return "ORO";
  if (score >= 3.5) return "SILVER";
  return null;
}
