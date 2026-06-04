'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useBusesWithLocation } from '../../../presentation/hooks/useMap';

const BusMap = dynamic(
  () => import('../../../presentation/components/BusMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#1E293B] rounded-xl border border-[#475569]">
        <Loader2 size={24} className="animate-spin text-[#2563EB]" />
      </div>
    ),
  },
);

export default function MapPage() {
  const { entries, isLoading } = useBusesWithLocation();

  const liveCount = entries.filter((e) => e.state === 'live').length;
  const totalCount = entries.length;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-5rem)]">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-semibold text-[#F1F5F9]">Mapa en vivo</h1>
        <p className="text-sm text-[#94A3B8]">
          {isLoading
            ? 'Cargando buses...'
            : `${liveCount} en vivo · ${totalCount} total · actualiza cada 5 s`}
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <BusMap entries={entries} />
      </div>
    </div>
  );
}
