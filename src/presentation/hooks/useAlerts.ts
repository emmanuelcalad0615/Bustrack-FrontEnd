'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getMyAlerts,
  markAlertRead,
  deleteAlert,
  checkProximity,
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

export function useCheckProximityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ latitude, longitude }: { latitude: number; longitude: number }) =>
      checkProximity.execute(latitude, longitude),
    onSuccess: (result) => {
      toast.success(
        result.alertsCreated > 0
          ? `${result.alertsCreated} alerta${result.alertsCreated !== 1 ? 's' : ''} creada${result.alertsCreated !== 1 ? 's' : ''}`
          : 'No hay buses cercanos en tus rutas',
      );
      qc.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
