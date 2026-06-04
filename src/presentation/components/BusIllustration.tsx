type Props = { className?: string };

/**
 * Hero bus illustration — flat, geometric side-view city bus in the BusTrack
 * palette, with a pulsing live-GPS marker (SVG SMIL, no JS) and motion lines.
 * Echoes the animated status dots in the hero so it reads as one design.
 */
export function BusIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 440 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bus rastreado por GPS en tiempo real"
      className={className}
    >
      {/* Motion / speed lines */}
      <g opacity="0.5">
        <line x1="2" y1="120" x2="48" y2="120" stroke="#22C55E" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="opacity" values="0;0.8;0" dur="1.6s" repeatCount="indefinite" begin="0s" />
        </line>
        <line x1="10" y1="150" x2="44" y2="150" stroke="#2563EB" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="opacity" values="0;0.7;0" dur="1.6s" repeatCount="indefinite" begin="0.4s" />
        </line>
        <line x1="6" y1="90" x2="40" y2="90" stroke="#475569" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="opacity" values="0;0.6;0" dur="1.6s" repeatCount="indefinite" begin="0.8s" />
        </line>
      </g>

      {/* Ground line */}
      <line x1="60" y1="196" x2="430" y2="196" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

      {/* Bus body */}
      <rect x="70" y="64" width="330" height="116" rx="20" fill="#2563EB" />
      {/* Roof highlight */}
      <rect x="70" y="64" width="330" height="22" rx="20" fill="#3B82F6" />
      {/* Lower accent band */}
      <rect x="70" y="158" width="330" height="22" rx="11" fill="#1D4ED8" />

      {/* Windshield */}
      <path d="M384 92 q14 2 14 20 v18 h-30 V96 q0-4 16-4 Z" fill="#0F172A" />
      <path d="M384 92 q14 2 14 20 v18 h-30 V96 q0-4 16-4 Z" fill="#06B6D4" opacity="0.18" />

      {/* Passenger windows */}
      {[96, 156, 216, 276].map((x) => (
        <g key={x}>
          <rect x={x} y="96" width="48" height="40" rx="6" fill="#0F172A" />
          <rect x={x} y="96" width="48" height="40" rx="6" fill="#06B6D4" opacity="0.14" />
        </g>
      ))}

      {/* Door */}
      <rect x="100" y="142" width="40" height="38" rx="4" fill="#0F172A" opacity="0.55" />
      <line x1="120" y1="144" x2="120" y2="178" stroke="#475569" strokeWidth="1.5" />

      {/* Headlight */}
      <circle cx="392" cy="150" r="5" fill="#F59E0B" />

      {/* Route badge on the side */}
      <rect x="150" y="146" width="120" height="26" rx="13" fill="#1D4ED8" />
      <text x="210" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill="#F1F5F9" fontFamily="Arial, sans-serif" letterSpacing="2">
        BOGOTÁ
      </text>

      {/* Wheels */}
      {[140, 330].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="182" r="22" fill="#0F172A" />
          <circle cx={cx} cy="182" r="22" fill="none" stroke="#475569" strokeWidth="3" />
          <circle cx={cx} cy="182" r="7" fill="#94A3B8" />
        </g>
      ))}

      {/* Live GPS marker above the bus */}
      <g>
        {/* pulse ring */}
        <circle cx="235" cy="44" r="10" fill="#22C55E" opacity="0.5">
          <animate attributeName="r" values="10;24;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* pin */}
        <path d="M235 20 a16 16 0 0 1 16 16 c0 12 -16 26 -16 26 s-16 -14 -16 -26 a16 16 0 0 1 16 -16 Z" fill="#22C55E" />
        <circle cx="235" cy="36" r="6" fill="#0F172A" />
      </g>
    </svg>
  );
}
