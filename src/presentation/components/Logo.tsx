type LogoProps = {
  /** Pixel size of the square mark. Wordmark scales relative to this. */
  size?: number;
  /** Show the "BusTrack" wordmark next to the mark. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * BusTrack brand mark — a rounded badge with a bus silhouette and a live-GPS
 * dot, in the app palette. Reused across navbar, auth pages and landing so the
 * brand reads as one product.
 */
export function Logo({ size = 28, showWordmark = true, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="BusTrack"
        className="flex-shrink-0"
      >
        {/* Badge */}
        <rect x="0" y="0" width="32" height="32" rx="9" fill="#2563EB" />
        {/* Bus body */}
        <rect x="7" y="8.5" width="18" height="13" rx="2.5" fill="#F1F5F9" />
        {/* Windows */}
        <rect x="9" y="10.5" width="6" height="4" rx="1" fill="#2563EB" />
        <rect x="17" y="10.5" width="6" height="4" rx="1" fill="#2563EB" />
        {/* Front stripe */}
        <rect x="9" y="16.5" width="14" height="1.6" rx="0.8" fill="#94A3B8" />
        {/* Wheels */}
        <circle cx="11.5" cy="22.5" r="2.2" fill="#0F172A" />
        <circle cx="20.5" cy="22.5" r="2.2" fill="#0F172A" />
        {/* Live GPS dot */}
        <circle cx="25.5" cy="7" r="3.5" fill="#0F172A" />
        <circle cx="25.5" cy="7" r="2" fill="#22C55E" />
      </svg>
      {showWordmark && (
        <span
          className="font-bold tracking-tight text-[#F1F5F9]"
          style={{ fontSize: size * 0.6 }}
        >
          Bus<span className="text-[#2563EB]">Track</span>
        </span>
      )}
    </span>
  );
}
