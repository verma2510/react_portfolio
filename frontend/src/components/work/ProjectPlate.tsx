import { memo, useMemo, type CSSProperties } from 'react';

/** Deterministic PRNG seeded from a string (cyrb-style hash → mulberry32). */
function seeded(input: string) {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

interface PlateProps {
  title: string;
  index: number;
  year: string;
  category: string;
  stackSize: number;
  /** Force the hover composition (used by the floating preview). */
  live?: boolean;
  className?: string;
}

const COLS = 12;
const ROWS = 8;

/**
 * A generative Swiss-poster "plate" per project: snapped rectangles on a
 * 12×8 grid, a cropped title and registration labels. Unique per title,
 * stable across renders, and costs a handful of SVG nodes.
 */
export const ProjectPlate = memo(function ProjectPlate({ title, index, year, category, stackSize, live, className = '' }: PlateProps) {
  const rects = useMemo(() => {
    const rand = seeded(title);
    return Array.from({ length: 5 }, (_, i) => {
      const w = 2 + Math.floor(rand() * 4);
      const h = 1 + Math.floor(rand() * 3);
      const x = Math.floor(rand() * (COLS - w + 1));
      const y = Math.floor(rand() * (ROWS - 3 - h + 1));
      const dx = Math.round((rand() - 0.5) * 4) * 10;
      const dy = Math.round((rand() - 0.5) * 2) * 10;
      const kind = i === 4 ? 'accent' : i < 2 ? 'solid' : 'outline';
      return { x: x * 10, y: y * 10, w: w * 10, h: h * 10, dx, dy, kind };
    });
  }, [title]);

  const fontSize = `${Math.min(30, 168 / title.length)}cqw`;

  return (
    <figure
      aria-hidden="true"
      className={`@container relative aspect-[3/2] w-full overflow-hidden bg-fg text-bg ${live ? 'plate-live' : ''} ${className}`}
    >
      <svg viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {Array.from({ length: COLS - 1 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 10} x2={(i + 1) * 10} y1={0} y2={ROWS * 10} stroke="currentColor" strokeOpacity={0.12} vectorEffect="non-scaling-stroke" />
        ))}
        {Array.from({ length: ROWS - 1 }, (_, i) => (
          <line key={`h${i}`} y1={(i + 1) * 10} y2={(i + 1) * 10} x1={0} x2={COLS * 10} stroke="currentColor" strokeOpacity={0.12} vectorEffect="non-scaling-stroke" />
        ))}
        {rects.map((r, i) => (
          <rect
            key={i}
            className="plate-rect"
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            style={{ '--dx': `${r.dx}px`, '--dy': `${r.dy}px`, transitionDelay: `${i * 40}ms` } as CSSProperties}
            fill={r.kind === 'accent' ? 'var(--c-accent)' : r.kind === 'solid' ? 'currentColor' : 'none'}
            stroke={r.kind === 'outline' ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="label absolute inset-x-3 top-3 flex items-start justify-between gap-3">
        <span className="flex flex-col items-start gap-1">
          <span className="bg-fg px-1">Fig. {String(index + 1).padStart(2, '0')}</span>
          <span className="bg-fg px-1 opacity-80">
            {year} / {stackSize} deps
          </span>
        </span>
        <span className="bg-fg px-1 text-right">{category}</span>
      </div>
      <span
        className="absolute -bottom-[0.14em] -left-[0.04em] leading-none font-black tracking-[-0.06em] whitespace-nowrap"
        style={{ fontSize }}
      >
        {title}
      </span>
    </figure>
  );
});
