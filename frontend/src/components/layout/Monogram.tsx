/** "A·" mark — mirrors /public/favicon.svg. */
export function Monogram({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="14" className="fill-ink" />
      <path
        d="M15 46 L25 18 H30 L40 46 M19 36 H36"
        fill="none"
        className="stroke-bg"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="44" r="4" className="fill-accent" />
    </svg>
  );
}
