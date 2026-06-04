'use client';

import { useMemo, useEffect, useRef } from 'react';
import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  listBuses,
  getBusLocation,
  getMySubscriptions,
  simulateBusGps,
} from '../../infrastructure/di/container';
import { getBusState } from '../lib/busState';
import type { Bus, BusLocation } from '../../domain/entities';
import type { BusVisualState } from '../lib/busState';

export type BusMapEntry = {
  bus: Bus;
  location: BusLocation | null;
  state: BusVisualState;
  lastSeenAt: Date | null;
};

export function useBusesWithLocation(): {
  entries: BusMapEntry[];
  isLoading: boolean;
  busIds: number[];
} {
  const { data: subscriptions = [], isLoading: loadingSubs } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => getMySubscriptions.execute(),
  });

  const subscribedRouteIds = useMemo(
    () => Array.from(new Set(subscriptions.map((s) => s.routeId))),
    [subscriptions],
  );

  // Fetch buses per subscribed route (§14.2 — GET /buses?routeId=X&pageSize=100)
  const busQueries = useQueries({
    queries: subscribedRouteIds.map((routeId) => ({
      queryKey: ['buses', { routeId, pageSize: 100 }],
      queryFn: () => listBuses.execute({ routeId, pageSize: 100 }),
    })),
  });

  const subscribedBuses = useMemo<Bus[]>(
    () => busQueries.flatMap((q) => q.data?.data ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(busQueries.map((q) => q.data?.data?.map((b) => b.id)))],
  );

  const loadingBuses = loadingSubs || busQueries.some((q) => q.isLoading);

  const locationQueries = useQueries({
    queries: subscribedBuses.map((bus) => ({
      queryKey: ['location', bus.id],
      queryFn: () => getBusLocation.execute(bus.id),
      refetchInterval: 5_000, // §14.2 — backend simulador mueve cada ~5 s
      retry: false,
    })),
  });

  const isLoading = loadingBuses || locationQueries.some((q) => q.isLoading);

  const entries: BusMapEntry[] = subscribedBuses.map((bus, i) => {
    const location = locationQueries[i]?.data ?? null;
    const lastSeenAt = location ? new Date(location.updatedAt) : null;
    return {
      bus,
      location,
      state: getBusState(bus, lastSeenAt),
      lastSeenAt,
    };
  });

  const busIds = subscribedBuses.map((b) => b.id);

  return { entries, isLoading, busIds };
}

/**
 * Manual GPS simulation loop — only needed if the backend auto-simulator is off.
 * When `enabled`, calls /simulate for each bus every `intervalMs`.
 */
export function useLiveSimulation(busIds: number[], enabled: boolean, intervalMs = 10_000) {
  const qc = useQueryClient();
  const busIdsRef = useRef(busIds);
  busIdsRef.current = busIds;

  useEffect(() => {
    if (!enabled || busIdsRef.current.length === 0) return;

    let cancelled = false;

    async function tick() {
      const ids = busIdsRef.current;
      await Promise.all(ids.map((id) => simulateBusGps.execute(id).catch(() => null)));
      if (cancelled) return;
      ids.forEach((id) => qc.invalidateQueries({ queryKey: ['location', id] }));
    }

    void tick();
    const interval = setInterval(tick, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [enabled, intervalMs, qc]);
}
