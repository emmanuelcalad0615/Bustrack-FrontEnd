'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Radio, Pause } from 'lucide-react';
import { useBusesWithLocation, useLiveSimulation } from '../../../presentation/hooks/useMap';

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
  const { entries, isLoading, busIds } = useBusesWithLocation();
  const [liveSim, setLiveSim] = useState(false);

  useLiveSimulation(busIds, liveSim);

  const liveCount = entries.filter((e) => e.state === 'live').length;
  const totalCount = entries.length;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">Mapa en vivo</h1>
          <p className="text-sm text-[#94A3B8]">
            {isLoading
              ? 'Cargando buses...'
              : `${liveCount} en vivo · ${totalCount} total · actualiza cada 12 s`}
          </p>
        </div>

        <button
          onClick={() => setLiveSim((v) => !v)}
          disabled={busIds.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
            liveSim
              ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
              : 'bg-[#1E293B] text-[#94A3B8] border border-[#475569] hover:text-[#F1F5F9]'
          }`}
          aria-pressed={liveSim}
        >
          {liveSim ? (
            <>
              <Radio size={15} className="animate-pulse" />
              Simulación en vivo · ON
            </>
          ) : (
            <>
              <Pause size={15} />
              Simulación en vivo · OFF
            </>
          )}
        </button>
      </div>

      {liveSim && (
        <p className="text-xs text-[#22C55E] flex-shrink-0 -mt-2">
          Reposicionando buses cada 10 s — los marcadores se mueven en tiempo real.
        </p>
      )}

      <div className="flex-1 min-h-0">
        <BusMap entries={entries} />
      </div>
    </div>
  );
}
