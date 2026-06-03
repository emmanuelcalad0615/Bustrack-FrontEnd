'use client';

import { useMemo } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { listBuses, getBusLocation, getMySubscriptions } from '../../infrastructure/di/container';
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
} {
  const { data: subscriptions = [] } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => getMySubscriptions.execute(),
  });

  const { data: allBuses = [], isLoading: loadingBuses } = useQuery({
    queryKey: ['buses'],
    queryFn: () => listBuses.execute(),
  });

  const subscribedRouteIds = useMemo(
    () => new Set(subscriptions.map((s) => s.routeId)),
    [subscriptions],
  );

  const subscribedBuses = useMemo(
    () => allBuses.filter((b) => subscribedRouteIds.has(b.routeId)),
    [allBuses, subscribedRouteIds],
  );

  const locationQueries = useQueries({
    queries: subscribedBuses.map((bus) => ({
      queryKey: ['location', bus.id],
      queryFn: () => getBusLocation.execute(bus.id),
      refetchInterval: 12_000,
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

  return { entries, isLoading };
}
