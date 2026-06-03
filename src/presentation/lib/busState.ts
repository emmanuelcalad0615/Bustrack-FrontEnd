const FRESH_MS = 30_000;
const STALE_MS = 120_000;

export type BusVisualState = 'live' | 'stale' | 'lost' | 'offline' | 'nogps';

export function getBusState(
  bus: { active: boolean },
  lastSeenAt: Date | null,
): BusVisualState {
  if (!bus.active) return 'offline';
  if (!lastSeenAt) return 'nogps';
  const age = Date.now() - lastSeenAt.getTime();
  if (age < FRESH_MS) return 'live';
  if (age < STALE_MS) return 'stale';
  return 'lost';
}

export const BUS_COLOR: Record<BusVisualState, string> = {
  live: '#22C55E',
  stale: '#F59E0B',
  lost: '#EF4444',
  offline: '#6B7280',
  nogps: '#64748B',
};

export const BUS_LABEL: Record<BusVisualState, string> = {
  live: 'En vivo',
  stale: 'Señal vieja',
  lost: 'Sin señal',
  offline: 'Fuera de servicio',
  nogps: 'Sin GPS',
};
