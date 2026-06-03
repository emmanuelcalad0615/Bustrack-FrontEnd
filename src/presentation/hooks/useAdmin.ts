'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  listBuses,
  createRoute, updateRoute, deleteRoute,
  createBus, updateBus, deleteBus,
  syncRoutes, seedBuses,
} from '../../infrastructure/di/container';
import type { CreateRouteDto, UpdateRouteDto, CreateBusDto, UpdateBusDto } from '../../domain/repositories';

export function useBuses() {
  return useQuery({ queryKey: ['buses'], queryFn: () => listBuses.execute() });
}

export function useCreateRouteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRouteDto) => createRoute.execute(dto),
    onSuccess: () => { toast.success('Ruta creada'); qc.invalidateQueries({ queryKey: ['routes'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateRouteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateRouteDto }) => updateRoute.execute(id, dto),
    onSuccess: () => { toast.success('Ruta actualizada'); qc.invalidateQueries({ queryKey: ['routes'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteRouteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRoute.execute(id),
    onSuccess: () => { toast.success('Ruta eliminada'); qc.invalidateQueries({ queryKey: ['routes'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useCreateBusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBusDto) => createBus.execute(dto),
    onSuccess: () => { toast.success('Bus creado'); qc.invalidateQueries({ queryKey: ['buses'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateBusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateBusDto }) => updateBus.execute(id, dto),
    onSuccess: () => { toast.success('Bus actualizado'); qc.invalidateQueries({ queryKey: ['buses'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteBusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBus.execute(id),
    onSuccess: () => { toast.success('Bus eliminado'); qc.invalidateQueries({ queryKey: ['buses'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useSyncRoutesMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => syncRoutes.execute(),
    onSuccess: () => { toast.success('Rutas sincronizadas desde OSM'); qc.invalidateQueries({ queryKey: ['routes'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useSeedBusesMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (busesPerRoute: number) => seedBuses.execute(busesPerRoute),
    onSuccess: () => { toast.success('Buses generados'); qc.invalidateQueries({ queryKey: ['buses'] }); },
    onError: (err: Error) => toast.error(err.message),
  });
}
