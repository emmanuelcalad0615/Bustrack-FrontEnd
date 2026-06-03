'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bus, Map, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: Bus },
  { href: '/routes', label: 'Rutas', icon: Bus },
  { href: '/map', label: 'Mapa', icon: Map },
  { href: '/alerts', label: 'Alertas', icon: Bell },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1E293B] border-b border-[#475569] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-[#F1F5F9] flex items-center gap-2">
          <Bus size={18} className="text-[#2563EB]" />
          BusTrack
        </span>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname === href
                  ? 'bg-[#2563EB]/20 text-[#2563EB]'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155]'
              }`}
            >
              <Icon size={15} />
              {label}
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
