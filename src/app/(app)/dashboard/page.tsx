'use client';

import Link from 'next/link';
import { MapPin, Map, Bell } from 'lucide-react';
import { useAuth } from '../../../presentation/hooks/useAuth';
import { useSubscriptions } from '../../../presentation/hooks/useRoutes';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: subscriptions = [] } = useSubscriptions();

  const cards = [
    { href: '/routes', label: 'Rutas', icon: MapPin, value: `${subscriptions.length} suscritas`, color: '#2563EB' },
    { href: '/map', label: 'Mapa en vivo', icon: Map, value: 'Ver buses', color: '#22C55E' },
    { href: '/alerts', label: 'Alertas', icon: Bell, value: 'Ver alertas', color: '#F59E0B' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#F1F5F9]">Dashboard</h1>
        <p className="text-sm text-[#94A3B8]">Bienvenido, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ href, label, icon: Icon, value, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-[#1E293B] border border-[#475569] rounded-xl p-5 hover:border-[#2563EB]/50 transition-colors space-y-3"
          >
            <Icon size={20} style={{ color }} aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[#F1F5F9]">{label}</p>
              <p className="text-xs text-[#94A3B8]">{value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
