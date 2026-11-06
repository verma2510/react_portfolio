import { m } from 'framer-motion';
import { buildCareerTimeline, formatMonths, roleAnchor } from '../../lib/content';


/** Proportional career axis (Gantt-style) computed from role periods. */
export function CareerTimeline() {
  const t = buildCareerTimeline();
  // Oldest first reads naturally left → right
  const roles = [...t.roles].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <figure className="panel overflow-hidden p-5 sm:p-6" aria-label="Career timeline">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <span className="label">Career axis</span>
        <span className="font-mono text-[11px] text-faint">
          {formatMonths(t.totalMonths)} across {t.roles.length} roles
        </span>
      </figcaption>

      <div className="relative">
        <ol className="space-y-3">
          {roles.map((r, i) => {
            const alignRight = r.offset + r.span > 0.7 && r.offset > 0.35;
            return (
              <li key={r.entry.company} className="relative h-12">
                <a
                  href={`#${roleAnchor(r.entry.company)}`}
                  className="group absolute inset-y-0 block"
                  style={{ left: `${r.offset * 100}%`, width: `${r.span * 100}%` }}
                  aria-label={`${r.entry.company}, ${r.entry.period.start} to ${r.entry.period.end}`}
                >
                  <span
                    className={`absolute top-0 whitespace-nowrap text-[12px] font-medium text-ink-2 transition-colors group-hover:text-ink ${
                      alignRight ? 'right-0 text-right' : 'left-0'
                    }`}
                  >
                    {r.entry.company}
                    <span className="ml-2 font-mono text-[10.5px] text-faint">{formatMonths(r.months)}</span>
                  </span>
                  <m.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-x-0 bottom-0 h-3 origin-left rounded-[3px] transition-[filter] group-hover:brightness-110 ${
                      r.current ? 'bg-accent' : 'bg-ink/70'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>

        {/* Axis */}
        <div className="relative mt-4 h-6 border-t border-line-strong" aria-hidden>
          {t.years.map((y) => (
            <span key={y.year} className="absolute top-0 -translate-x-px" style={{ left: `${y.offset * 100}%` }}>
              <span className="block h-1.5 w-px bg-line-strong" />
              <span className="mt-1 block font-mono text-[10.5px] text-faint">{y.year}</span>
            </span>
          ))}
          <span className="absolute right-0 top-0 flex flex-col items-end">
            <span className="block h-1.5 w-px bg-accent" />
            <span className="mt-1 block font-mono text-[10.5px] text-accent-text">Now</span>
          </span>
        </div>
      </div>
    </figure>
  );
}
