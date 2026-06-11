export interface Place {
  id: number;
  name: string;
  type: string;
  city: string;
  address: string;
  inspectedAt: string;
  revisoreScore: number;
  googleScore: number | null;
  tripadvisorScore: number | null;
  plaqueStatus: "active" | "warning" | "at_risk" | "revoked";
  plaqueIssuedAt: string | null;
  imageUrl: string | null;
  lat: number | null;
  lng: number | null;
}

export interface EnrichedPlace extends Place {
  communityScore: number | null;
  communityRatingCount: number;
  finalScore: number;
}

export interface CommunityRating {
  id: number;
  placeId: number;
  score: number;
  comment: string | null;
  authorName: string;
  createdAt: string;
  isVerified: boolean;
  isAnonymous: boolean;
}

export interface ScoreHistoryEntry {
  id: number;
  placeId: number;
  finalScore: number;
  recordedAt: string;
}

export interface PlaceDetail extends EnrichedPlace {
  recentRatings: CommunityRating[];
}

export interface LiveScore {
  placeId: number;
  revisoreScore: number;
  revisoreWeight: number;
  googleScore: number | null;
  tripadvisorScore: number | null;
  onlinePlatformScore: number | null;
  onlineWeight: number;
  communityScore: number | null;
  communityWeight: number;
  finalScore: number;
  plaqueStatus: string;
  monthsActive: number | null;
  renewalDueAt: string | null;
}

export interface DashboardStats {
  totalInspected: number;
  activePlaques: number;
  warningPlaques: number;
  atRiskPlaques: number;
  revokedPlaques: number;
  totalCommunityRatings: number;
  averageFinalScore: number;
  inspectionsThisYear: number;
}

export interface LeaderboardEntry {
  rank: number;
  placeId: number;
  name: string;
  city: string;
  type: string;
  finalScore: number;
  plaqueStatus: string;
  trend: "up" | "stable" | "down";
}

export interface PlaqueAlert extends EnrichedPlace {
  monthsActive: number | null;
  renewalDueAt: string | null;
}

export type Role = "user" | "partner" | "developer";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface PartnerOverview {
  kpi: {
    totalInspected: number;
    activePlaques: number;
    averageFinalScore: number;
    totalCommunityRatings: number;
    annualRecurringRevenue: number;
  };
  plaquePricing: { tier: string; range: string; annualFee: number }[];
  economicProjection: {
    year: string;
    members: string;
    revenue: string;
    result: string;
    positive: boolean;
  }[];
}
