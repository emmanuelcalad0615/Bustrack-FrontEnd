export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://bustrack-backend-production-2fa2.up.railway.app/api/v1';

export const MAP_CENTER = {
  lat: Number(process.env.NEXT_PUBLIC_MAP_CENTER_LAT ?? 4.711),
  lng: Number(process.env.NEXT_PUBLIC_MAP_CENTER_LNG ?? -74.0721),
};
