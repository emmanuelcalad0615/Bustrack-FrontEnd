'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bus, Map, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUnreadCount } from '../hooks/useAlerts';
import { Logo } from './Logo';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const unreadCount = useUnreadCount();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Bus, badge: 0 },
    { href: '/routes', label: 'Rutas', icon: Bus, badge: 0 },
    { href: '/map', label: 'Mapa', icon: Map, badge: 0 },
    { href: '/alerts', label: 'Alertas', icon: Bell, badge: unreadCount },
  ];

  return (
    <nav className="bg-[#1E293B] border-b border-[#475569] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" aria-label="BusTrack — inicio">
          <Logo size={26} />
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon, badge }) => (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname === href
                  ? 'bg-[#2563EB]/20 text-[#2563EB]'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155]'
              }`}
            >
              <Icon size={15} />
              {label}
              {badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname === '/admin'
                  ? 'bg-[#7C3AED]/20 text-[#7C3AED]'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155]'
              }`}
            >
              <Settings size={15} />
              Admin
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-[#94A3B8]">{user?.name}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            user?.role === 'ADMIN'
              ? 'bg-[#7C3AED]/20 text-[#7C3AED]'
              : 'bg-[#334155] text-[#64748B]'
          }`}
        >
          {user?.role}
        </span>
        <button
          onClick={logout}
          className="text-[#94A3B8] hover:text-[#EF4444] transition-colors"
          aria-label="Cerrar sesión"
        >
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
}
