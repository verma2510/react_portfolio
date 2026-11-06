import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Project } from '../../data/portfolioData';
import { projectNumber } from '../../lib/content';
import { Chip } from '../ui/Chip';
import { ProjectLinks } from './ProjectLinks';
import { SystemMap } from './SystemMap';

/**
 * Dense, scannable index of the remaining projects.
 * Each row expands in place (disclosure pattern) to reveal full detail.
 */
export function ProjectLedger({ items }: { items: Project[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-line">
      <div className="hidden grid-cols-[56px_1.4fr_1fr_1.4fr_64px_40px] gap-4 border-b border-line py-3 md:grid" aria-hidden>
        {['No.', 'Project', 'Focus', 'Stack', 'Year', ''].map((h) => (
          <span key={h} className="label text-[10px]">
            {h}
          </span>
        ))}
      </div>

      <ul>
        {items.map((p) => {
          const isOpen = open === p.slug;
          const panelId = `ledger-${p.slug}`;
          return (
            <li key={p.slug} className="border-b border-line">
              <h4>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                  className="group grid w-full grid-cols-[40px_1fr_32px] items-center gap-x-4 gap-y-1 py-5 text-left transition-colors md:grid-cols-[56px_1.4fr_1fr_1.4fr_64px_40px] md:gap-4"
                >
                  <span className={`font-mono text-[12px] transition-colors ${isOpen ? 'text-accent-text' : 'text-faint group-hover:text-ink-2'}`}>
                    {projectNumber(p)}
                  </span>
                  <span className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold tracking-tight text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    {p.title}
                  </span>
                  <span className="col-start-2 row-start-2 text-[13px] text-muted md:col-start-auto md:row-start-auto md:text-[14px]">
                    {p.role} · <span className="text-accent-text">{p.impact}</span>
                  </span>
                  <span className="hidden flex-wrap gap-1 md:flex">
                    {p.stack.slice(0, 3).map((t) => (
                      <Chip key={t} tech={t}>
                        {t}
                      </Chip>
                    ))}
                    {p.stack.length > 3 && <Chip>+{p.stack.length - 3}</Chip>}
                  </span>
                  <span className="hidden font-mono text-[12px] text-muted md:block">{p.year}</span>
                  <span
                    className={`col-start-3 row-span-2 row-start-1 inline-flex h-8 w-8 items-center justify-center justify-self-end rounded-full border transition-all duration-500 ease-out-expo md:col-start-auto md:row-span-1 md:row-start-auto ${
                      isOpen ? 'rotate-45 border-accent bg-accent text-accent-ink' : 'border-line text-muted group-hover:border-line-strong group-hover:text-ink'
                    }`}
                    aria-hidden
                  >
                    <Plus size={15} />
                  </span>
                </button>
              </h4>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-label={`${p.title} details`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-8 pt-2 md:grid-cols-12 md:pl-[72px]">
                      <div className="md:col-span-6">
                        <ul className="space-y-3">
                          {p.description.map((d) => (
                            <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-1.5 md:hidden">
                          {p.stack.map((t) => (
                            <Chip key={t} tech={t}>
                              {t}
                            </Chip>
                          ))}
                        </div>
                        <div className="mt-6">
                          <ProjectLinks project={p} size="sm" />
                        </div>
                      </div>
                      <div className="md:col-span-6">
                        <SystemMap stack={p.stack} label={`${p.title} · system map`} />
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
