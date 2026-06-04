'use client';

import { useState, useMemo } from 'react';
import { MapPin, Search, Check, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useRoutes,
  useSubscriptions,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '../../../presentation/hooks/useRoutes';
import { routeColor } from '../../../presentation/lib/routeColor';

const PAGE_SIZE = 10;

export default function RoutesPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  const { data: result, isLoading: loadingRoutes } = useRoutes({
    page,
    pageSize: PAGE_SIZE,
    q: debouncedQ || undefined,
  });

  const routes = result?.data ?? [];
  const total = result?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const { data: subscriptions = [], isLoading: loadingSubs } = useSubscriptions();
  const subscribeMutation = useSubscribeMutation();
  const unsubscribeMutation = useUnsubscribeMutation();

  const subscribedMap = useMemo(
    () => new Map(subscriptions.map((s) => [s.routeId, s.id])),
    [subscriptions],
  );

  function handleSearch(value: string) {
    setQ(value);
    setPage(1);
    // Only send non-empty q to backend (min(1) validation)
    setDebouncedQ(value.trim() || '');
  }

  const isLoading = loadingRoutes || loadingSubs;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">Rutas</h1>
          <p className="text-sm text-[#94A3B8]">
            {subscriptions.length} suscripción{subscriptions.length !== 1 ? 'es' : ''} activa
            {subscriptions.length !== 1 ? 's' : ''}
            {total > 0 && ` · ${total} rutas`}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
        <input
          type="text"
          placeholder="Buscar por nombre, origen o destino..."
          value={q}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#475569] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#2563EB] text-sm transition-colors"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-[#1E293B] animate-pulse" />
          ))}
        </div>
      ) : routes.length === 0 ? (
        <div className="text-center py-16 text-[#94A3B8]">
          <MapPin size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No se encontraron rutas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {routes.map((route) => {
            const subscriptionId = subscribedMap.get(route.id);
            const isSubscribed = subscriptionId !== undefined;
            const color = routeColor(route.id);

            return (
              <div
                key={route.id}
                className={`bg-[#1E293B] border rounded-xl p-4 space-y-3 transition-colors ${
                  isSubscribed ? 'border-[#2563EB]/60' : 'border-[#475569]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-[#F1F5F9] truncate">{route.name}</span>
                  </div>
                  {isSubscribed && (
                    <span className="flex items-center gap-1 text-xs text-[#2563EB] flex-shrink-0">
                      <Check size={12} />
                      Suscrito
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#94A3B8] space-y-1">
                  <p><span className="text-[#64748B]">Origen: </span>{route.origin}</p>
                  <p><span className="text-[#64748B]">Destino: </span>{route.destination}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    route.active ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#334155] text-[#64748B]'
                  }`}>
                    {route.active ? 'Activa' : 'Inactiva'}
                  </span>

                  {isSubscribed ? (
                    <button
                      onClick={() => unsubscribeMutation.mutate(subscriptionId!)}
                      disabled={unsubscribeMutation.isPending}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#334155] hover:bg-[#EF4444]/20 hover:text-[#EF4444] text-[#94A3B8] transition-colors disabled:opacity-50"
                      aria-label={`Desuscribirse de ${route.name}`}
                    >
                      <Minus size={12} />
                      Desuscribirse
                    </button>
                  ) : (
                    <button
                      onClick={() => subscribeMutation.mutate(route.id)}
                      disabled={subscribeMutation.isPending}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#2563EB]/20 hover:bg-[#2563EB] text-[#2563EB] hover:text-white transition-colors disabled:opacity-50"
                      aria-label={`Suscribirse a ${route.name}`}
                    >
                      <Plus size={12} />
                      Suscribirse
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="p-2 rounded-lg bg-[#1E293B] border border-[#475569] text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-[#94A3B8]">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded-lg bg-[#1E293B] border border-[#475569] text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
            aria-label="Página siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
