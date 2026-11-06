import { Fragment, useState } from 'react';
import { architectureOf } from '../../lib/content';
import { TechIcon } from '../ui/TechIcon';

interface SystemMapProps {
  stack: string[];
  label?: string;
  className?: string;
}

type LaneData = ReturnType<typeof architectureOf>[number];

/**
 * Blueprint-style architecture view generated from a project's stack:
 * Client → Server → (Intelligence / Data), with delivery targets as a base rail.
 * Purely derived from data — it visualises the stack, it doesn't invent one.
 */
export function SystemMap({ stack, label = 'System map', className = '' }: SystemMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const lanes = architectureOf(stack);
  const pick = (...ids: LaneData['layer'][]) => lanes.filter((l) => ids.includes(l.layer));

  const columns = [pick('client'), pick('server'), pick('ai', 'data')].filter((c) => c.length > 0);
  const base = pick('delivery', 'design');

  return (
    <figure
      className={`blueprint relative flex flex-col overflow-hidden rounded-[14px] border border-line ${className}`}
      aria-label={`${label}: ${lanes.map((l) => `${l.label} — ${l.items.join(', ')}`).join('; ')}`}
    >
      <figcaption className="flex items-center justify-between border-b border-line bg-bg-elev/70 px-4 py-2.5 backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-accent/80" />
          </span>
          <span className="label">{label}</span>
        </span>
        <span className="label hidden text-faint sm:inline">{stack.length} components</span>
      </figcaption>

      <div className="flex flex-1 flex-col items-stretch justify-center gap-0 p-4 sm:p-6 md:flex-row md:items-center">
        {columns.map((col, ci) => (
          <Fragment key={ci}>
            {ci > 0 && <Connector />}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {col.map((lane) => (
                <Lane key={lane.layer} lane={lane} hovered={hovered} onHover={setHovered} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>

      {base.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-line-strong px-4 py-3 sm:px-6">
          {base.map((lane) => (
            <div key={lane.layer} className="flex flex-wrap items-center gap-2">
              <span className="label">{lane.label}</span>
              {lane.items.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-ink-2">
                  <TechIcon name={t} size={12} /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </figure>
  );
}

function Lane({ lane, hovered, onHover }: { lane: LaneData; hovered: string | null; onHover: (t: string | null) => void }) {
  return (
    <div className="rounded-[10px] border border-line-strong bg-surface/90 p-3 shadow-[0_1px_0_var(--line)]">
      <div className="mb-2.5">
        <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink">{lane.label}</span>
        <span className="block font-mono text-[10.5px] text-faint">{lane.caption}</span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {lane.items.map((t) => {
          const active = hovered === t;
          return (
            <li key={t}>
              <span
                onMouseEnter={() => onHover(t)}
                onMouseLeave={() => onHover(null)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[12.5px] font-medium transition-all duration-300 ${
                  active
                    ? 'border-accent bg-accent-soft text-ink'
                    : hovered
                      ? 'border-line text-muted'
                      : 'border-line bg-bg-elev text-ink-2'
                }`}
              >
                <TechIcon name={t} size={13} className={active ? 'text-accent' : ''} />
                {t}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Animated data-flow connector; horizontal on desktop, vertical on mobile. */
function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center text-accent" aria-hidden>
      <svg className="hidden md:block" width="44" height="12" viewBox="0 0 44 12">
        <line x1="0" y1="6" x2="38" y2="6" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 5" className="animate-flow" />
        <path d="M37 2 L42 6 L37 10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <svg className="md:hidden" width="12" height="32" viewBox="0 0 12 32">
        <line x1="6" y1="0" x2="6" y2="26" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 5" className="animate-flow" />
        <path d="M2 25 L6 30 L10 25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </div>
  );
}
