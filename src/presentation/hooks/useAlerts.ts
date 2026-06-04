'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getMyAlerts,
  markAlertRead,
  deleteAlert,
  checkProximity,
  getRandomLocation,
} from '../../infrastructure/di/container';

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => getMyAlerts.execute(),
  });
}

export function useUnreadCount(): number {
  const { data = [] } = useAlerts();
  return data.filter((a) => !a.read).length;
}

export function useMarkReadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => markAlertRead.execute(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteAlertMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAlert.execute(id),
    onSuccess: () => {
      toast.success('Alerta eliminada');
      qc.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

// Real-device geolocation → POST /alerts/proximity (default 500 m threshold)
export function useCheckProximityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ latitude, longitude }: { latitude: number; longitude: number }) =>
      checkProximity.execute(latitude, longitude),
    onSuccess: (result) => {
      if (result.alertsCreated > 0) {
        toast.success(
          `${result.alertsCreated} alerta${result.alertsCreated !== 1 ? 's' : ''} creada${result.alertsCreated !== 1 ? 's' : ''}`,
        );
      } else {
        toast('No hay buses cerca. Suscríbete a una ruta para recibir alertas.');
      }
      qc.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

// GET /alerts/random-location → POST /alerts/proximity (default 500 m — guaranteed near a bus)
export function useRandomProximityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const location = await getRandomLocation.execute();
      // No thresholdMeters → backend default 500 m. random-location already < 400 m from a bus.
      return checkProximity.execute(location.latitude, location.longitude);
    },
    onSuccess: (result) => {
      if (result.alertsCreated > 0) {
        toast.success(
          `${result.alertsCreated} alerta${result.alertsCreated !== 1 ? 's' : ''} creada${result.alertsCreated !== 1 ? 's' : ''}`,
        );
      } else {
        // strategy: 'random' — no subscriptions or no positioned buses
        toast('No hay buses cerca. Suscríbete a una ruta para recibir alertas.');
      }
      qc.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
