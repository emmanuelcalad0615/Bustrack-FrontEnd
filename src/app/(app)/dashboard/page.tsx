'use client';

import { useAuth } from '../../../presentation/hooks/useAuth';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#F1F5F9]">BusTrack</h1>
            <p className="text-sm text-[#94A3B8]">
              Bienvenido, {user?.name} —{' '}
              <span className={user?.role === 'ADMIN' ? 'text-[#7C3AED]' : 'text-[#64748B]'}>
                {user?.role}
              </span>
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="bg-[#1E293B] border border-[#475569] rounded-xl p-6">
          <p className="text-[#94A3B8] text-sm">Dashboard — próximas fases</p>
        </div>
      </div>
    </div>
  );
}
