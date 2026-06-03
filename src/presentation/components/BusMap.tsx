'use client';

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import 'leaflet/dist/leaflet.css';
import { MAP_CENTER } from '../../infrastructure/config/env';
import { BUS_COLOR, BUS_LABEL } from '../lib/busState';
import type { BusMapEntry } from '../hooks/useMap';

const LEGEND_STATES = ['live', 'stale', 'lost', 'nogps', 'offline'] as const;

type Props = { entries: BusMapEntry[] };

export default function BusMap({ entries }: Props) {
  const withLocation = entries.filter((e) => e.location !== null);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#475569]">
      <MapContainer
        center={[MAP_CENTER.lat, MAP_CENTER.lng]}
        zoom={12}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {withLocation.map(({ bus, location, state, lastSeenAt }) => (
          <CircleMarker
            key={bus.id}
            center={[location!.latitude, location!.longitude]}
            radius={9}
            pathOptions={{
              fillColor: BUS_COLOR[state],
              fillOpacity: 1,
              color: '#ffffff',
              weight: 2,
            }}
          >
            <Tooltip>
              <div className="text-xs space-y-0.5">
                <p className="font-semibold">{bus.plate}</p>
                <p style={{ color: BUS_COLOR[state] }}>{BUS_LABEL[state]}</p>
                {lastSeenAt && (
                  <p className="text-gray-400">
                    {formatDistanceToNow(lastSeenAt, { addSuffix: true, locale: es })}
                  </p>
                )}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-[#1E293B]/90 backdrop-blur border border-[#475569] rounded-lg px-3 py-2 space-y-1">
        {LEGEND_STATES.map((s) => (
          <div key={s} className="flex items-center gap-2 text-xs text-[#F1F5F9]">
            <span
              className="w-3 h-3 rounded-full border-2 border-white flex-shrink-0"
              style={{ backgroundColor: BUS_COLOR[s] }}
              aria-hidden="true"
            />
            {BUS_LABEL[s]}
          </div>
        ))}
      </div>

      {/* Bus count */}
      <div className="absolute top-4 right-4 z-[1000] bg-[#1E293B]/90 backdrop-blur border border-[#475569] rounded-lg px-3 py-1.5 text-xs text-[#F1F5F9]">
        {withLocation.length} bus{withLocation.length !== 1 ? 'es' : ''} en mapa
      </div>
    </div>
  );
}
