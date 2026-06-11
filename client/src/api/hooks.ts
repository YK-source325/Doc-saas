import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "./index";
import type {
  CommunityRating,
  DashboardStats,
  EnrichedPlace,
  LeaderboardEntry,
  LiveScore,
  PartnerOverview,
  Place,
  PlaceDetail,
  PlaqueAlert,
  User,
} from "../types";

export interface PlaceFilters {
  type?: string;
  city?: string;
  status?: string;
}

export function usePlaces(filters?: PlaceFilters) {
  return useQuery({
    queryKey: ["places", filters],
    queryFn: async () => {
      const { data } = await api.get<EnrichedPlace[]>("/places", { params: filters });
      return data;
    },
  });
}

export function usePlace(id: number) {
  return useQuery({
    queryKey: ["place", id],
    queryFn: async () => {
      const { data } = await api.get<PlaceDetail>(`/places/${id}`);
      return data;
    },
    enabled: Number.isFinite(id),
  });
}

export function useLiveScore(id: number) {
  return useQuery({
    queryKey: ["live-score", id],
    queryFn: async () => {
      const { data } = await api.get<LiveScore>(`/places/${id}/live-score`);
      return data;
    },
    enabled: Number.isFinite(id),
  });
}

export function useRatings(id: number) {
  return useQuery({
    queryKey: ["ratings", id],
    queryFn: async () => {
      const { data } = await api.get<CommunityRating[]>(`/places/${id}/ratings`);
      return data;
    },
    enabled: Number.isFinite(id),
  });
}

export function usePostRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { placeId: number; score: number; comment?: string }) => {
      const { data } = await api.post<CommunityRating>(
        `/places/${payload.placeId}/ratings`,
        { score: payload.score, comment: payload.comment }
      );
      return data;
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["place", vars.placeId] });
      queryClient.invalidateQueries({ queryKey: ["live-score", vars.placeId] });
      queryClient.invalidateQueries({ queryKey: ["ratings", vars.placeId] });
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>("/dashboard/stats");
      return data;
    },
    refetchInterval: 30000,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await api.get<LeaderboardEntry[]>("/dashboard/leaderboard");
      return data;
    },
    refetchInterval: 30000,
  });
}

export function usePlaqueAlerts() {
  return useQuery({
    queryKey: ["plaque-alerts"],
    queryFn: async () => {
      const { data } = await api.get<PlaqueAlert[]>("/dashboard/plaque-alerts");
      return data;
    },
    refetchInterval: 30000,
  });
}

export function usePartnerOverview(enabled: boolean) {
  return useQuery({
    queryKey: ["partner-overview"],
    queryFn: async () => {
      const { data } = await api.get<PartnerOverview>("/partner/overview");
      return data;
    },
    enabled,
    refetchInterval: 30000,
  });
}

// --- Mutations pannello sviluppatore ---

export interface PlaceInput {
  name: string;
  type: string;
  city: string;
  address: string;
  inspectedAt: string;
  revisoreScore: number;
  googleScore?: number | null;
  tripadvisorScore?: number | null;
  plaqueStatus?: string;
  plaqueIssuedAt?: string | null;
  imageUrl?: string | null;
}

export function useCreatePlace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PlaceInput) => {
      const { data } = await api.post<Place>("/places", payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}

export function useUpdatePlace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<PlaceInput> & { id: number }) => {
      const { data } = await api.put<Place>(`/places/${id}`, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}

export function useDeletePlace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/places/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}

export function useSetPlaqueStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, plaqueStatus }: { id: number; plaqueStatus: string }) => {
      const { data } = await api.patch<Place>(`/places/${id}/plaque-status`, { plaqueStatus });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}

// --- Auth ---

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>("/auth/me");
        return data;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
