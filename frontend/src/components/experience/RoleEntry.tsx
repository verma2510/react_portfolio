import { useState } from 'react';
import type { ExperienceEntry } from '../../data/portfolioData';
import { formatMonths, roleAnchor, type TimelineRole } from '../../lib/content';
import { TechIcon } from '../ui/TechIcon';
import { Reveal } from '../ui/Reveal';

/** One role, laid out like an engineering release note. */
export function RoleEntry({ role, index }: { role: TimelineRole; index: number }) {
  const e: ExperienceEntry = role.entry;
  const titleId = `${roleAnchor(e.company)}-title`;
  const [focusTech, setFocusTech] = useState<string | null>(null);
  const readout = focusTech ? e.stackTooltips?.[focusTech] : undefined;

  return (
    <article id={roleAnchor(e.company)} aria-labelledby={titleId} className="grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-10">
      {/* Meta column */}
      <Reveal className="md:col-span-4">
        <div className="md:sticky md:top-8">
          <div className="flex items-center gap-2 font-mono text-[12px] text-muted">
            {role.current && <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ok" aria-hidden />}
            <time>{e.period.start}</time>
            <span className="text-faint">—</span>
            <time className={role.current ? 'text-ok' : ''}>{e.period.end}</time>
          </div>
          <h3 id={titleId} className="mt-4 text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-tight text-ink">
            {e.company}
          </h3>
          <p className="mt-1 text-[15px] text-ink-2">{e.role}</p>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{e.descriptor}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
            <span className="text-faint">{String(index + 1).padStart(2, '0')}</span>
            {role.current ? `${formatMonths(role.months)} · ongoing` : e.duration}
          </p>
        </div>
      </Reveal>

      {/* Content column */}
      <div className="md:col-span-8">
        <Reveal as="div">
          <blockquote className="relative font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] italic leading-[1.18] text-ink">
            <span className="absolute -left-1 -top-3 font-serif text-[3rem] not-italic leading-none text-accent opacity-80 md:-left-6" aria-hidden>
              “
            </span>
            <p className="pl-6 md:pl-0">{e.pullQuote}</p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <h4 className="label mb-3">Key outcomes</h4>
          <ol className="divide-y divide-line border-y border-line">
            {e.achievements.map((a, i) => (
              <li key={a} className="grid grid-cols-[32px_1fr] gap-3 py-4 text-[15px] leading-relaxed text-ink-2">
                <span className="font-mono text-[11px] leading-[1.9] text-accent-text">{String(i + 1).padStart(2, '0')}</span>
                {a}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="label mb-3">Responsibilities</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {e.responsibilities.map((r) => (
                <li key={r} className="text-[13.5px] text-muted before:mr-2 before:text-faint before:content-['/']">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="label mb-3">Stack in use</h4>
            <ul className="flex flex-wrap gap-1.5" onMouseLeave={() => setFocusTech(null)}>
              {e.stack.map((t) => {
                const hasTip = !!e.stackTooltips?.[t];
                const on = focusTech === t;
                return (
                  <li key={t}>
                    <span
                      tabIndex={hasTip ? 0 : undefined}
                      onMouseEnter={() => hasTip && setFocusTech(t)}
                      onFocus={() => hasTip && setFocusTech(t)}
                      onBlur={() => setFocusTech(null)}
                      className={`inline-flex cursor-default items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11.5px] transition-colors ${
                        on ? 'border-accent bg-accent-soft text-ink' : 'border-line bg-surface text-ink-2 hover:border-line-strong'
                      }`}
                    >
                      <TechIcon name={t} size={12} className={on ? 'text-accent' : ''} />
                      {t}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p aria-live="polite" className="mt-3 min-h-[2.6em] border-l-2 border-line-strong pl-3 text-[12.5px] leading-snug text-muted">
              {readout ? (
                <>
                  <span className="font-medium text-ink">{focusTech}</span> — {readout}
                </>
              ) : (
                <span className="text-faint">Select a technology to see how it was used.</span>
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
