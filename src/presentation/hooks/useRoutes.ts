'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  listRoutes,
  getMySubscriptions,
  subscribeToRoute,
  unsubscribeFromRoute,
} from '../../infrastructure/di/container';

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: () => listRoutes.execute(),
  });
}

export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => getMySubscriptions.execute(),
  });
}

export function useSubscribeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (routeId: number) => subscribeToRoute.execute(routeId),
    onSuccess: (result) => {
      if (result === null) {
        toast('Ya estás suscrito a esta ruta');
      } else {
        toast.success('Suscrito correctamente');
      }
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUnsubscribeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (subscriptionId: number) => unsubscribeFromRoute.execute(subscriptionId),
    onSuccess: () => {
      toast.success('Suscripción cancelada');
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
