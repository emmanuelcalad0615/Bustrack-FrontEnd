# BusTrack — Guía de colores para el frontend

> Sistema de diseño de color para el cliente de **BusTrack**: rastreo de buses en tiempo real (GTFS SIMUR Bogotá), suscripción a rutas, GPS en vivo y alertas de proximidad (Haversine, umbral 500 m).
>
> Esta guía está **mapeada a las entidades reales del backend** (`Bus.active`, `Route.active`, frescura de `BusLocation`, `Alert` leída/no leída, proximidad, roles `USER`/`ADMIN`). Cada color tiene una **condición de uso**, no es decorativo.
>
> **Regla de oro:** el color NUNCA es el único portador de significado (≈8 % de hombres son daltónicos). Cada estado lleva además icono + texto.

---

## 0. Filosofía

- **UI neutra, datos saturados.** La interfaz (fondos, paneles, texto) es gris/azul apagado para que los buses y rutas en el mapa resalten.
- **Dark mode como base.** Apps de monitoreo/dispatch se usan horas seguidas; el dark reduce fatiga y da más contraste a marcadores sobre mapa.
- **Semántica de estado por encima de la marca.** El verde/ámbar/rojo de los estados de bus importa más que el color de marca.
- **Mapa base desaturado** (tipo CARTO Positron / Dark Matter) para que la capa de datos sea la protagonista.

---

## 1. Tokens base (neutros de UI)

Escala slate (Tailwind). Dark mode como tema primario, light como alterno.

### Dark (tema primario)

| Token | Uso | Hex |
|---|---|---|
| `--bg` | Fondo app / canvas mapa | `#0F172A` |
| `--surface` | Paneles, sidebars, cards | `#1E293B` |
| `--surface-2` | Card elevada, header, modal | `#334155` |
| `--border` | Bordes, divisores | `#475569` |
| `--text` | Texto primario | `#F1F5F9` |
| `--text-muted` | Texto secundario, labels | `#94A3B8` |
| `--text-disabled` | Texto inactivo | `#64748B` |

### Light (tema alterno)

| Token | Uso | Hex |
|---|---|---|
| `--bg` | Fondo app | `#F8FAFC` |
| `--surface` | Paneles, cards | `#FFFFFF` |
| `--surface-2` | Card elevada | `#F1F5F9` |
| `--border` | Bordes | `#E2E8F0` |
| `--text` | Texto primario | `#0F172A` |
| `--text-muted` | Texto secundario | `#475569` |
| `--text-disabled` | Texto inactivo | `#94A3B8` |

---

## 2. Color de marca (acento)

Azul = transporte + confianza. Es el color de botones primarios, links, tab activo y la **ruta seleccionada** en el mapa.

| Token | Uso | Hex |
|---|---|---|
| `--primary` | Botón primario, link, selección | `#2563EB` |
| `--primary-hover` | Hover botón primario | `#1D4ED8` |
| `--primary-pressed` | Click / activo | `#1E40AF` |
| `--primary-subtle` | Fondo de badge/chip de marca | `#1E3A8A` (dark) / `#DBEAFE` (light) |
| `--focus-ring` | Anillo de foco accesible | `#60A5FA` |

> Alternativa de marca si se prefiere teal (más “movilidad/transporte público”): `--primary = #0D9488`, hover `#0F766E`.

---

## 3. Estado del BUS  → entidad `Bus` + frescura de `BusLocation`

El backend guarda **solo la última posición** de cada bus (`BusLocation`, upsert). Por eso el estado “en vivo” se deriva del **timestamp** de esa última posición + el flag `Bus.active`.

| Estado | Condición (datos reales) | Color | Hex | Icono sugerido |
|---|---|---|---|---|
| **En ruta / en vivo** | `Bus.active === true` y última posición < 30 s | Verde | `#22C55E` | ● lleno + pulso |
| **Señal desactualizada** | `Bus.active === true` y última posición 30 s – 2 min | Ámbar | `#F59E0B` | ◐ + “hace Xs” |
| **Sin señal / perdido** | `Bus.active === true` y última posición > 2 min | Rojo | `#EF4444` | ▲ alerta |
| **Fuera de servicio** | `Bus.active === false` | Gris | `#6B7280` | ○ vacío |
| **Sin GPS** | `Bus.active === true` y nunca reportó posición | Gris azulado | `#64748B` | ⃠ sin punto |

> Umbrales (30 s / 2 min) ajústalos a tu frecuencia real de `POST /locations/:busId`. Defínelos como constantes (`FRESH_MS`, `STALE_MS`) para no repartir números mágicos por el front.

**Marcador en mapa:** punto del color del estado + **borde blanco de 2 px** (halo), porque el mapa tiene fondo variable y sin borde el marcador se pierde. El bus seleccionado lleva además anillo `--primary`.

---

## 4. Estado de la RUTA → entidad `Route`

| Estado | Condición | Color | Hex |
|---|---|---|---|
| **Ruta activa** | `Route.active === true` | usa color categórico (sección 5) | — |
| **Ruta inactiva** | `Route.active === false` | Gris desaturado | `#94A3B8` |
| **Ruta suscrita** | está en `GET /subscriptions/me` | resalta con `--primary` (borde/acento) | `#2563EB` |

La ruta **suscrita** es la que más le importa al usuario → dale el acento de marca o un grosor de línea mayor en el mapa, no un color nuevo.

---

## 5. Colores categóricos de RUTAS en el mapa

Cada línea GTFS = un color distinto y distinguible. Paleta cualitativa (estilo Tableau 10 / ColorBrewer Set2), alta saturación, legible sobre fondo neutro:

| # | Hex | | # | Hex |
|---|---|---|---|---|
| 1 | `#4E79A7` | | 6 | `#76B7B2` |
| 2 | `#F28E2B` | | 7 | `#59A14F` |
| 3 | `#E15759` | | 8 | `#EDC948` |
| 4 | `#B07AA1` | | 9 | `#FF9DA7` |
| 5 | `#9C755F` | | 10 | `#BAB0AC` |

**Reglas:**
- Asigna color por `routeId` de forma estable (`color = PALETA[routeId % PALETA.length]`) para que una ruta tenga siempre el mismo color entre sesiones.
- Si el feed GTFS trae `route_color`, **respétalo** (es el color oficial de la línea); usa la paleta de arriba solo como fallback cuando venga vacío.
- No mezcles estos colores categóricos con el verde/ámbar/rojo de estado: esos están reservados a salud del bus.

---

## 6. Estado de ALERTAS → entidad `Alert` + proximidad (Haversine, 500 m)

| Estado | Condición | Color | Hex |
|---|---|---|---|
| **Alerta de proximidad (no leída)** | `Alert` con `read === false` | Rojo/acento urgente | `#EF4444` |
| **Alerta leída** | `read === true` (tras `PATCH /alerts/:id/read`) | Gris muted | `#94A3B8` |
| **Bus dentro del umbral** | distancia ≤ 500 m (`POST /alerts/proximity`) | Verde “llegando” | `#22C55E` |
| **Bus acercándose** | 500 m – 1 km | Ámbar | `#F59E0B` |
| **Badge contador no leídas** | `count > 0` | Rojo sobre `--surface` | `#EF4444` |

- **Punto/badge de no leída:** círculo rojo, pero acompáñalo de número o icono de campana — no solo el color.
- **Rojo = urgente real.** No abuses; si toda la UI es roja, nada destaca. Reserva rojo para “bus llegando” / alerta sin leer.

---

## 7. Estados semánticos genéricos (formularios, toasts, feedback)

Respuestas del API tienen forma `{ ok: boolean, ... }`. Mapea el feedback visual así:

| Significado | Token | Hex | Disparador típico |
|---|---|---|---|
| Éxito | `--success` | `#22C55E` | `201 { ok: true }` (bus creado, suscripción ok) |
| Advertencia | `--warning` | `#F59E0B` | señal GPS vieja, sesión por expirar |
| Error | `--danger` | `#EF4444` | `4xx/5xx { ok: false, error }` |
| Info | `--info` | `#06B6D4` | sincronización GTFS en curso |

Cada token con su variante **subtle** para fondos de banner/toast (ej. `--success-subtle = #14532D` en dark, `#DCFCE7` en light).

---

## 8. Roles (`USER` / `ADMIN`)

Los endpoints `/sync/*` son solo ADMIN. Marca visualmente el modo admin para evitar acciones por error:

| Rol | Color de badge | Hex |
|---|---|---|
| `USER` | Gris/marca neutra | `#64748B` |
| `ADMIN` | Acento distintivo (violeta) | `#7C3AED` |

Badge de rol en el header + las acciones destructivas/admin (sincronizar rutas, generar buses) con botón en `--danger` o violeta, nunca igual a una acción normal.

---

## 9. Accesibilidad (obligatorio)

1. **Nunca solo color para estado.** Verde/rojo son indistinguibles para daltónicos → añade icono, forma o texto (“En vivo”, “Sin señal”). El combo verde+ámbar+rojo es justo el peor caso; diferéncialos también por forma de marcador (● ◐ ▲).
2. **Contraste WCAG AA:** texto ≥ 4.5:1, elementos UI/iconos ≥ 3:1. Los neutros de la sección 1 ya cumplen sobre sus fondos.
3. **Marcadores sobre mapa:** borde/halo blanco siempre (el mapa no garantiza contraste).
4. **Foco visible:** `--focus-ring` en todo elemento interactivo navegable por teclado.
5. **Tiempo real sin fatiga:** señala cambios con un **pulso/parpadeo breve**, no cambiando el color en cada update del GPS.

---

## 10. Variables CSS listas para pegar

```css
:root {
  /* Neutros (dark) */
  --bg: #0F172A;
  --surface: #1E293B;
  --surface-2: #334155;
  --border: #475569;
  --text: #F1F5F9;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;

  /* Marca */
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  --primary-pressed: #1E40AF;
  --focus-ring: #60A5FA;

  /* Estado de bus */
  --bus-live: #22C55E;     /* en ruta, GPS fresco */
  --bus-stale: #F59E0B;    /* señal desactualizada */
  --bus-lost: #EF4444;     /* sin señal */
  --bus-offline: #6B7280;  /* fuera de servicio */
  --bus-nogps: #64748B;    /* sin GPS */

  /* Semánticos */
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --info: #06B6D4;

  /* Roles */
  --role-user: #64748B;
  --role-admin: #7C3AED;
}

[data-theme="light"] {
  --bg: #F8FAFC;
  --surface: #FFFFFF;
  --surface-2: #F1F5F9;
  --border: #E2E8F0;
  --text: #0F172A;
  --text-muted: #475569;
  --text-disabled: #94A3B8;
}

/* Paleta categórica de rutas */
:root {
  --route-1: #4E79A7;  --route-2: #F28E2B;  --route-3: #E15759;
  --route-4: #B07AA1;  --route-5: #9C755F;  --route-6: #76B7B2;
  --route-7: #59A14F;  --route-8: #EDC948;  --route-9: #FF9DA7;
  --route-10: #BAB0AC;
}
```

---

## 11. Tailwind config (si usas Tailwind)

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          pressed: '#1E40AF',
        },
        bus: {
          live: '#22C55E',
          stale: '#F59E0B',
          lost: '#EF4444',
          offline: '#6B7280',
          nogps: '#64748B',
        },
        role: {
          user: '#64748B',
          admin: '#7C3AED',
        },
        route: {
          1: '#4E79A7', 2: '#F28E2B', 3: '#E15759', 4: '#B07AA1', 5: '#9C755F',
          6: '#76B7B2', 7: '#59A14F', 8: '#EDC948', 9: '#FF9DA7', 10: '#BAB0AC',
        },
      },
    },
  },
};
```

> Los neutros y semánticos genéricos (`slate`, `green`, `amber`, `red`, `cyan`) ya vienen en la paleta default de Tailwind con los mismos hex de esta guía — no hace falta redefinirlos.

---

## 12. Helper sugerido: color de bus desde datos

Centraliza la lógica para no repartir condiciones de color por los componentes:

```ts
const FRESH_MS = 30_000;     // < 30 s = en vivo
const STALE_MS = 120_000;    // 30 s – 2 min = desactualizado

type BusVisualState = 'live' | 'stale' | 'lost' | 'offline' | 'nogps';

function getBusState(bus: { active: boolean }, lastSeenAt: Date | null): BusVisualState {
  if (!bus.active) return 'offline';
  if (!lastSeenAt) return 'nogps';
  const age = Date.now() - lastSeenAt.getTime();
  if (age < FRESH_MS) return 'live';
  if (age < STALE_MS) return 'stale';
  return 'lost';
}

const BUS_COLOR: Record<BusVisualState, string> = {
  live: '#22C55E', stale: '#F59E0B', lost: '#EF4444',
  offline: '#6B7280', nogps: '#64748B',
};

const BUS_LABEL: Record<BusVisualState, string> = {
  live: 'En vivo', stale: 'Señal vieja', lost: 'Sin señal',
  offline: 'Fuera de servicio', nogps: 'Sin GPS',
};
```

---

## Resumen de mapeo dato → color

| Dato del backend | Manda en |
|---|---|
| `Bus.active` + frescura `BusLocation` | Color del marcador de bus (sección 3) |
| `Route.active` + suscripción | Estilo de la línea de ruta (sección 4) |
| `routeId` / `route_color` GTFS | Color categórico de la línea (sección 5) |
| `Alert.read` + distancia Haversine | Color de alertas y badge (sección 6) |
| `{ ok }` de la respuesta API | Toast/feedback semántico (sección 7) |
| Rol `USER` / `ADMIN` | Badge y acciones admin (sección 8) |
