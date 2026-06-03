'use client';

import { Bell, BellOff, Trash2, MapPin, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  useAlerts,
  useMarkReadMutation,
  useDeleteAlertMutation,
  useCheckProximityMutation,
} from '../../../presentation/hooks/useAlerts';

export default function AlertsPage() {
  const { data: alerts = [], isLoading } = useAlerts();
  const markRead = useMarkReadMutation();
  const deleteAlert = useDeleteAlertMutation();
  const checkProximity = useCheckProximityMutation();

  const unreadCount = alerts.filter((a) => !a.read).length;

  function handleCheckProximity() {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        checkProximity.mutate({ latitude: coords.latitude, longitude: coords.longitude }),
      () => alert('Permiso de ubicación denegado'),
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">Alertas</h1>
          <p className="text-sm text-[#94A3B8]">
            {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todo al día'}
          </p>
        </div>
        <button
          onClick={handleCheckProximity}
          disabled={checkProximity.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB]/20 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-sm font-medium transition-colors disabled:opacity-50"
          aria-label="Buscar buses cerca de mi ubicación"
        >
          {checkProximity.isPending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <MapPin size={15} />
          )}
          Buscar buses cerca
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-[#1E293B] animate-pulse" />
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-16 text-[#94A3B8]">
          <Bell size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No tienes alertas</p>
          <p className="text-xs mt-1">Usa "Buscar buses cerca" para generar alertas de proximidad</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                alert.read
                  ? 'bg-[#1E293B] border-[#334155]'
                  : 'bg-[#EF4444]/5 border-[#EF4444]/30'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {alert.read ? (
                  <BellOff size={16} className="text-[#475569]" aria-label="Leída" />
                ) : (
                  <Bell size={16} className="text-[#EF4444]" aria-label="No leída" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm ${alert.read ? 'text-[#94A3B8]' : 'text-[#F1F5F9]'}`}>
                  {alert.message}
                </p>
                <p className="text-xs text-[#475569] mt-0.5">
                  Bus #{alert.busId} ·{' '}
                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true, locale: es })}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {!alert.read && (
                  <button
                    onClick={() => markRead.mutate(alert.id)}
                    disabled={markRead.isPending}
                    className="text-xs px-2 py-1 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155] transition-colors disabled:opacity-50"
                    aria-label="Marcar como leída"
                  >
                    Marcar leída
                  </button>
                )}
                <button
                  onClick={() => deleteAlert.mutate(alert.id)}
                  disabled={deleteAlert.isPending}
                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors disabled:opacity-50"
                  aria-label="Eliminar alerta"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
