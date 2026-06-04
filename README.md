# BusTrack — Frontend

Real-time bus tracking for Bogotá (GTFS SIMUR data via OpenStreetMap). This is the web client for the BusTrack platform: users subscribe to routes, watch buses move live on a map, and get proximity alerts when a bus is near.

 **Live demo:** [https://bustrack-frontend-gules.vercel.app](https://bustrack-frontend-gules.vercel.app)

---

## Features

- **Auth + roles** — register / login with `USER` and `ADMIN` roles. Session persisted in `localStorage` (JWT, 24h expiry).
- **Routes + subscriptions** — browse routes, subscribe/unsubscribe to the ones you ride.
- **Live GPS map** — buses move in real time on a Leaflet map. Marker color reflects GPS freshness (live / stale / lost / offline / no-gps).
- **Proximity alerts** — Haversine-based alerts (500 m threshold) when a subscribed bus is near; read / unread state with an unread badge.
- **Admin panel** — CRUD for routes & buses + GTFS sync (`ADMIN` only).
- **Public landing page** — marketing page at `/` with CTAs to login / register.

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Server state | TanStack Query v5 (cache, polling) |
| UI / auth state | Zustand v5 + persist |
| HTTP | Axios + interceptors (Bearer, 401 handling) |
| Forms | React Hook Form + Zod v4 |
| Styles | Tailwind CSS v4 (`@theme` tokens) |
| Map | react-leaflet + CARTO Dark Matter tiles (free, no token) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Notifications | react-hot-toast |
| Dates | date-fns |
| Tests | Vitest + React Testing Library |

---

## Architecture — Clean Architecture

Dependency rule: `domain ← application ← infrastructure ← presentation ← app`.

```
src/
├── domain/          # Entities (types), repository interfaces, errors
├── application/     # DTOs, ports, usecases
├── infrastructure/  # httpClient, HTTP repos, storage, DI container, config
├── presentation/    # Zustand stores, React Query hooks, components, guards, providers, lib
└── app/             # Next.js App Router pages — (auth), (app), (marketing) route groups
```

- `domain` imports nothing external (no axios, react, or next).
- `application` imports only from `domain`.
- Composition root = `src/infrastructure/di/container.ts`.

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment

Create `.env.local` (see `.env.example`):

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=https://bustrack-backend-production-2fa2.up.railway.app/api/v1
# Local backend instead:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# Map center (Bogotá)
NEXT_PUBLIC_MAP_CENTER_LAT=4.711
NEXT_PUBLIC_MAP_CENTER_LNG=-74.0721
```

### Run

```bash
npm run dev        # dev server → http://localhost:3000
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run test       # vitest (run)
npm run test:watch # vitest (watch)
```

---

## Pages

| Route | Description | Access |
|---|---|---|
| `/` | Public landing page | Public |
| `/login` | Sign in | Public |
| `/register` | Sign up | Public |
| `/dashboard` | Subscribed routes, unread alerts, quick actions | Auth |
| `/routes` | Route list + subscribe / unsubscribe | Auth |
| `/map` | Live bus map + GPS state | Auth |
| `/alerts` | Alert list + "find buses nearby" (proximity) | Auth |
| `/admin` | CRUD routes/buses + GTFS sync | `ADMIN` |

Logged-in users hitting `/` are redirected to `/dashboard`.

---

## Backend API

The frontend consumes a REST API. Response envelope: `{ ok: true, data }` / `{ ok: false, error }`.

- **Base URL:** `https://bustrack-backend-production-2fa2.up.railway.app/api/v1`
- **Swagger:** `https://bustrack-backend-production-2fa2.up.railway.app/api/docs/`
- **Auth:** JWT Bearer in `Authorization: Bearer <token>`.

Notes:
- IDs are `number`.
- `GET /routes` and `GET /buses` are paginated (`{ ok, data, total, page, limit }`).
- `GET /buses` does **not** include location — GPS is fetched per bus via `GET /locations/:busId`.
- The backend runs a simulator that moves active buses every ~5s; the map polls `/locations/:busId` (~5s) to follow them.

---

## Deployment

Deployed on **Vercel** → [https://bustrack-frontend-gules.vercel.app](https://bustrack-frontend-gules.vercel.app)

The landing page prerenders as static; app pages run client-side against the Railway-hosted backend. For production, the backend's `FRONTEND_URL` (CORS) must include the deployed Vercel domain.
