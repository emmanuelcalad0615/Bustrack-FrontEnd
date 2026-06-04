'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Pencil, Trash2, RefreshCw, Zap, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';
import { RequireAdmin } from '../../../presentation/guards/RequireAdmin';
import { useRoutes } from '../../../presentation/hooks/useRoutes';
import {
  useBuses,
  useCreateRouteMutation, useUpdateRouteMutation, useDeleteRouteMutation,
  useCreateBusMutation, useUpdateBusMutation, useDeleteBusMutation,
  useSyncRoutesMutation, useSeedBusesMutation,
  useSimulateGpsMutation, useSimulateAllGpsMutation,
} from '../../../presentation/hooks/useAdmin';
import { createRouteSchema } from '../../../application/dtos/RouteDtos';
import { createBusSchema } from '../../../application/dtos/BusDtos';
import type { Route, Bus } from '../../../domain/entities';

type Tab = 'routes' | 'buses';

const inputCls = 'w-full rounded-lg bg-[#0F172A] border border-[#475569] px-3 py-2 text-[#F1F5F9] text-sm focus:outline-none focus:border-[#2563EB] transition-colors';

function RouteForm({ onDone, initial }: { onDone: () => void; initial?: Route }) {
  const createMutation = useCreateRouteMutation();
  const updateMutation = useUpdateRouteMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: initial?.name ?? '',
      origin: initial?.origin ?? '',
      destination: initial?.destination ?? '',
      active: initial?.active ?? true,
    },
  });

  async function onSubmit(data: { name: string; origin: string; destination: string; active: boolean }) {
    if (initial) {
      await updateMutation.mutateAsync({ id: initial.id, dto: data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F172A] border border-[#475569] rounded-xl p-4">
      <div>
        <input {...register('name')} placeholder="Nombre" className={inputCls} />
        {errors.name && <p className="text-xs text-[#EF4444] mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register('origin')} placeholder="Origen" className={inputCls} />
        {errors.origin && <p className="text-xs text-[#EF4444] mt-1">{errors.origin.message}</p>}
      </div>
      <div>
        <input {...register('destination')} placeholder="Destino" className={inputCls} />
        {errors.destination && <p className="text-xs text-[#EF4444] mt-1">{errors.destination.message}</p>}
      </div>
      <div className="sm:col-span-3 flex gap-2">
        <button type="submit" disabled={isSubmitting}
          className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2">
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          {initial ? 'Guardar' : 'Crear ruta'}
        </button>
        <button type="button" onClick={onDone}
          className="px-4 py-1.5 bg-[#334155] text-[#94A3B8] text-sm rounded-lg hover:text-[#F1F5F9] transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

function BusForm({ onDone, routes, initial }: { onDone: () => void; routes: Route[]; initial?: Bus }) {
  const createMutation = useCreateBusMutation();
  const updateMutation = useUpdateBusMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createBusSchema),
    defaultValues: {
      plate: initial?.plate ?? '',
      model: initial?.model ?? '',
      capacity: initial?.capacity ?? 40,
      routeId: initial?.routeId ?? 0,
      active: initial?.active ?? true,
    },
  });

  async function onSubmit(data: { plate: string; model: string; capacity: number; routeId: number; active: boolean }) {
    if (initial) {
      await updateMutation.mutateAsync({ id: initial.id, dto: data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0F172A] border border-[#475569] rounded-xl p-4">
      <div>
        <input {...register('plate')} placeholder="Placa" className={inputCls} />
        {errors.plate && <p className="text-xs text-[#EF4444] mt-1">{errors.plate.message}</p>}
      </div>
      <div>
        <input {...register('model')} placeholder="Modelo" className={inputCls} />
        {errors.model && <p className="text-xs text-[#EF4444] mt-1">{errors.model.message}</p>}
      </div>
      <div>
        <input {...register('capacity', { valueAsNumber: true })} type="number" placeholder="Capacidad" className={inputCls} />
        {errors.capacity && <p className="text-xs text-[#EF4444] mt-1">{errors.capacity.message}</p>}
      </div>
      <div>
        <select {...register('routeId', { valueAsNumber: true })} className={inputCls}>
          <option value={0}>Ruta…</option>
          {routes.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        {errors.routeId && <p className="text-xs text-[#EF4444] mt-1">{errors.routeId.message}</p>}
      </div>
      <div className="col-span-2 sm:col-span-4 flex gap-2">
        <button type="submit" disabled={isSubmitting}
          className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2">
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          {initial ? 'Guardar' : 'Crear bus'}
        </button>
        <button type="button" onClick={onDone}
          className="px-4 py-1.5 bg-[#334155] text-[#94A3B8] text-sm rounded-lg hover:text-[#F1F5F9] transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

const PAGE_SIZE = 10;

function Pagination({ page, totalPages, onPrev, onNext, disabled }: {
  page: number; totalPages: number; onPrev: () => void; onNext: () => void; disabled?: boolean;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      <button onClick={onPrev} disabled={page === 1 || disabled}
        className="p-1.5 rounded-lg bg-[#0F172A] border border-[#475569] text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
        aria-label="Página anterior"><ChevronLeft size={14} /></button>
      <span className="text-xs text-[#94A3B8]">{page} / {totalPages}</span>
      <button onClick={onNext} disabled={page === totalPages || disabled}
        className="p-1.5 rounded-lg bg-[#0F172A] border border-[#475569] text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
        aria-label="Página siguiente"><ChevronRight size={14} /></button>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('routes');
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [showBusForm, setShowBusForm] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [routePage, setRoutePage] = useState(1);
  const [busPage, setBusPage] = useState(1);

  // Paginated route table
  const { data: routeResult, isLoading: loadingRoutes } = useRoutes({ page: routePage, pageSize: PAGE_SIZE });
  const routes = routeResult?.data ?? [];
  const routeTotal = routeResult?.total ?? 0;
  const routeTotalPages = Math.ceil(routeTotal / PAGE_SIZE) || 1;

  // All routes for bus form selector (pageSize 100 = backend max)
  const { data: allRoutesResult } = useRoutes({ pageSize: 100 });
  const allRoutes = allRoutesResult?.data ?? [];

  // Paginated bus table
  const { data: busResult, isLoading: loadingBuses } = useBuses({ page: busPage, pageSize: PAGE_SIZE });
  const buses = busResult?.data ?? [];
  const busTotal = busResult?.total ?? 0;
  const busTotalPages = Math.ceil(busTotal / PAGE_SIZE) || 1;

  const deleteRouteMutation = useDeleteRouteMutation();
  const deleteBusMutation = useDeleteBusMutation();
  const syncRoutesMutation = useSyncRoutesMutation();
  const seedBusesMutation = useSeedBusesMutation();
  const simulateGpsMutation = useSimulateGpsMutation();
  const simulateAllGpsMutation = useSimulateAllGpsMutation();

  function confirmDeleteRoute(id: number, name: string) {
    if (confirm(`¿Eliminar ruta "${name}"? Esta acción no se puede deshacer.`)) {
      deleteRouteMutation.mutate(id);
    }
  }

  function confirmDeleteBus(id: number, plate: string) {
    if (confirm(`¿Eliminar bus "${plate}"? Esta acción no se puede deshacer.`)) {
      deleteBusMutation.mutate(id);
    }
  }

  const tabBtn = (t: Tab) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      tab === t ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
    }`;

  return (
    <RequireAdmin>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[#F1F5F9]">Panel Admin</h1>
            <p className="text-sm text-[#7C3AED]">Solo administradores</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => syncRoutesMutation.mutate()} disabled={syncRoutesMutation.isPending}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#7C3AED]/40 text-[#7C3AED] hover:bg-[#7C3AED]/10 text-sm transition-colors disabled:opacity-50">
              {syncRoutesMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Sync rutas OSM
            </button>
            <button onClick={() => seedBusesMutation.mutate(2)} disabled={seedBusesMutation.isPending}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10 text-sm transition-colors disabled:opacity-50">
              {seedBusesMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              Seed buses
            </button>
            <button
              onClick={() => simulateAllGpsMutation.mutate(buses.map((b) => b.id))}
              disabled={simulateAllGpsMutation.isPending || busTotal === 0}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/10 text-sm transition-colors disabled:opacity-50"
            >
              {simulateAllGpsMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
              Simular GPS todos
            </button>
          </div>
        </div>

        <div className="flex gap-1 bg-[#1E293B] p-1 rounded-xl w-fit">
          <button className={tabBtn('routes')} onClick={() => setTab('routes')}>Rutas ({routeTotal})</button>
          <button className={tabBtn('buses')} onClick={() => setTab('buses')}>Buses ({busTotal})</button>
        </div>

        {tab === 'routes' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => { setShowRouteForm(true); setEditingRoute(null); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/20 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-sm rounded-lg transition-colors">
                <Plus size={14} /> Nueva ruta
              </button>
            </div>
            {showRouteForm && !editingRoute && <RouteForm onDone={() => setShowRouteForm(false)} />}
            {loadingRoutes ? <div className="h-32 bg-[#1E293B] rounded-xl animate-pulse" /> : (
              <>
                <div className="bg-[#1E293B] border border-[#475569] rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#334155] text-[#94A3B8] text-xs">
                        <th className="text-left px-4 py-3">Nombre</th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">Origen</th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">Destino</th>
                        <th className="text-left px-4 py-3">Estado</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]">
                      {routes.map((r) => (
                        <>
                          <tr key={r.id} className="hover:bg-[#334155]/30 transition-colors">
                            <td className="px-4 py-3 text-[#F1F5F9] font-medium">{r.name}</td>
                            <td className="px-4 py-3 text-[#94A3B8] hidden sm:table-cell">{r.origin}</td>
                            <td className="px-4 py-3 text-[#94A3B8] hidden sm:table-cell">{r.destination}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${r.active ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#334155] text-[#64748B]'}`}>
                                {r.active ? 'Activa' : 'Inactiva'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 justify-end">
                                <button onClick={() => { setEditingRoute(r); setShowRouteForm(false); }}
                                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors"
                                  aria-label={`Editar ${r.name}`}>
                                  <Pencil size={14} />
                                </button>
                                <button onClick={() => confirmDeleteRoute(r.id, r.name)} disabled={deleteRouteMutation.isPending}
                                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors disabled:opacity-50"
                                  aria-label={`Eliminar ${r.name}`}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {editingRoute?.id === r.id && (
                            <tr key={`edit-${r.id}`}>
                              <td colSpan={5} className="px-4 py-3">
                                <RouteForm initial={r} onDone={() => setEditingRoute(null)} />
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={routePage}
                  totalPages={routeTotalPages}
                  onPrev={() => setRoutePage((p) => p - 1)}
                  onNext={() => setRoutePage((p) => p + 1)}
                  disabled={loadingRoutes}
                />
              </>
            )}
          </div>
        )}

        {tab === 'buses' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => { setShowBusForm(true); setEditingBus(null); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/20 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-sm rounded-lg transition-colors">
                <Plus size={14} /> Nuevo bus
              </button>
            </div>
            {showBusForm && !editingBus && <BusForm routes={allRoutes} onDone={() => setShowBusForm(false)} />}
            {loadingBuses ? <div className="h-32 bg-[#1E293B] rounded-xl animate-pulse" /> : (
              <>
                <div className="bg-[#1E293B] border border-[#475569] rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#334155] text-[#94A3B8] text-xs">
                        <th className="text-left px-4 py-3">Placa</th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">Modelo</th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">Cap.</th>
                        <th className="text-left px-4 py-3">Estado</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]">
                      {buses.map((b) => (
                        <>
                          <tr key={b.id} className="hover:bg-[#334155]/30 transition-colors">
                            <td className="px-4 py-3 text-[#F1F5F9] font-medium">{b.plate}</td>
                            <td className="px-4 py-3 text-[#94A3B8] hidden sm:table-cell">{b.model}</td>
                            <td className="px-4 py-3 text-[#94A3B8] hidden sm:table-cell">{b.capacity}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${b.active ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#334155] text-[#64748B]'}`}>
                                {b.active ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 justify-end">
                                <button
                                  onClick={() => simulateGpsMutation.mutate(b.id)}
                                  disabled={simulateGpsMutation.isPending}
                                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors disabled:opacity-50"
                                  aria-label={`Simular GPS de ${b.plate}`}
                                  title="Simular GPS"
                                >
                                  <Navigation size={14} />
                                </button>
                                <button onClick={() => { setEditingBus(b); setShowBusForm(false); }}
                                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors"
                                  aria-label={`Editar ${b.plate}`}>
                                  <Pencil size={14} />
                                </button>
                                <button onClick={() => confirmDeleteBus(b.id, b.plate)} disabled={deleteBusMutation.isPending}
                                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors disabled:opacity-50"
                                  aria-label={`Eliminar ${b.plate}`}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {editingBus?.id === b.id && (
                            <tr key={`edit-${b.id}`}>
                              <td colSpan={5} className="px-4 py-3">
                                <BusForm routes={allRoutes} initial={b} onDone={() => setEditingBus(null)} />
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={busPage}
                  totalPages={busTotalPages}
                  onPrev={() => setBusPage((p) => p - 1)}
                  onNext={() => setBusPage((p) => p + 1)}
                  disabled={loadingBuses}
                />
              </>
            )}
          </div>
        )}
      </div>
    </RequireAdmin>
  );
}
