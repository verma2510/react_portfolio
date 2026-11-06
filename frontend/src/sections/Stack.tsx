import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData, type Skill } from '../data/portfolioData';
import { roleAnchor, skillCount, skillEvidence } from '../lib/content';
import { Container } from '../components/layout/Container';
import { Meter } from '../components/ui/Meter';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechIcon } from '../components/ui/TechIcon';

const groups = portfolioData.skills;
const ALL = 'All';

export function Stack() {
  const [filter, setFilter] = useState<string>(ALL);
  const [selected, setSelected] = useState<{ skill: Skill; category: string }>({
    skill: groups[0].skills[0],
    category: groups[0].category,
  });

  const visible = useMemo(() => (filter === ALL ? groups : groups.filter((g) => g.category === filter)), [filter]);

  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 md:py-24">
      <Container>
        <SectionHeader
          section="stack"
          eyebrow="Technical stack"
          title="Tools I"
          accent="reach for."
          lead="A capability matrix rather than a logo wall — proficiency, time in use, and where each tool shows up in real work."
          aside={
            <p className="font-mono text-[12px] text-muted">
              <span className="text-2xl text-ink">{skillCount}</span> technologies
              <span className="mx-2 text-faint">·</span>
              <span className="text-2xl text-ink">{groups.length}</span> domains
            </p>
          }
        />

        {/* Domain filter */}
        <Reveal>
          <div role="group" aria-label="Filter by domain" className="no-scrollbar -mx-4 mb-8 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {[ALL, ...groups.map((g) => g.category)].map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ${
                    active ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {c}
                  <span className={`ml-1.5 font-mono text-[10.5px] ${active ? 'text-bg/60' : 'text-faint'}`}>
                    {c === ALL ? skillCount : groups.find((g) => g.category === c)?.skills.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Matrix */}
          <div className="lg:col-span-7">
            <AnimatePresence initial={false}>
              {visible.map((g) => (
                <m.div
                  key={g.category}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mb-8 last:mb-0"
                >
                  <h3 className="label mb-2 flex items-center justify-between border-b border-line-strong pb-2">
                    <span className="text-ink">{g.category}</span>
                    <span className="hidden sm:inline">Proficiency · Years</span>
                  </h3>
                  <ul>
                    {g.skills.map((s) => {
                      const isSel = selected.skill.name === s.name;
                      return (
                        <li key={s.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setSelected({ skill: s, category: g.category })}
                            onFocus={() => setSelected({ skill: s, category: g.category })}
                            onClick={() => setSelected({ skill: s, category: g.category })}
                            aria-controls="skill-inspector"
                            aria-pressed={isSel}
                            className={`group grid w-full grid-cols-[28px_1fr_auto] items-center gap-x-3 gap-y-1 border-b border-line px-2 py-3 text-left transition-colors sm:grid-cols-[28px_1fr_auto_44px] ${
                              isSel ? 'bg-surface-2/70' : 'hover:bg-surface-2/40'
                            }`}
                          >
                            <TechIcon name={s.icon} size={17} className={`transition-colors ${isSel ? 'text-accent' : 'text-muted group-hover:text-ink'}`} />
                            <span className="min-w-0">
                              <span className="block text-[15px] font-medium text-ink">{s.name}</span>
                              {s.note && <span className="block truncate text-[12.5px] text-muted lg:hidden">{s.note}</span>}
                            </span>
                            <Meter value={s.proficiency} label={s.name} active={isSel} />
                            <span className="hidden text-right font-mono text-[12px] text-muted sm:block">{s.years ? `${s.years}y` : '—'}</span>
                          </button>
                          {isSel && (
                            <div className="border-b border-line bg-surface-2/40 px-3 pb-3 pt-1 lg:hidden">
                              <EvidenceList skill={s} compact />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Inspector */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-8">
              <SkillInspector skill={selected.skill} category={selected.category} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SkillInspector({ skill, category }: { skill: Skill; category: string }) {
  return (
    <aside id="skill-inspector" aria-live="polite" aria-label="Skill details" className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="label">Inspector</span>
        <span className="label text-faint">{category}</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={skill.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="p-5"
        >
          <div className="flex items-center gap-4">
            <span className="blueprint flex h-14 w-14 items-center justify-center rounded-xl border border-line text-ink">
              <TechIcon name={skill.icon} size={26} />
            </span>
            <div>
              <p className="text-[22px] font-semibold tracking-tight text-ink">{skill.name}</p>
              {skill.note && <p className="text-[13.5px] text-muted">{skill.note}</p>}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            <div className="bg-surface p-3">
              <dt className="label text-[10px]">Proficiency</dt>
              <dd className="mt-1 font-mono text-xl text-ink">
                {skill.proficiency}
                <span className="text-[12px] text-faint">/100</span>
              </dd>
            </div>
            <div className="bg-surface p-3">
              <dt className="label text-[10px]">In use</dt>
              <dd className="mt-1 font-mono text-xl text-ink">{skill.years ? `${skill.years} yr${skill.years > 1 ? 's' : ''}` : '—'}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <h4 className="label mb-2">Shows up in</h4>
            <EvidenceList skill={skill} />
          </div>
        </m.div>
      </AnimatePresence>
    </aside>
  );
}

function EvidenceList({ skill, compact = false }: { skill: Skill; compact?: boolean }) {
  const ev = skillEvidence(skill);
  if (ev.projects.length === 0 && ev.roles.length === 0) {
    return <p className="py-2 text-[13px] text-muted">Not tied to a specific listed project or role.</p>;
  }
  const rowCls = `group flex items-center justify-between ${compact ? 'py-2 text-[13px]' : 'py-2.5 text-[13.5px]'}`;
  return (
    <ul className={`divide-y divide-line ${compact ? '' : 'border-y border-line'}`} aria-label={`Where ${skill.name} is used`}>
      {ev.roles.map((r) => (
        <li key={r.company}>
          <a href={`#${roleAnchor(r.company)}`} className={rowCls}>
            <span className="text-ink-2 group-hover:text-ink">{r.company}</span>
            <span className="label text-[10px]">Role</span>
          </a>
        </li>
      ))}
      {ev.projects.map((p) => (
        <li key={p.slug}>
          <Link to={`/work/${p.slug}`} className={rowCls}>
            <span className="text-ink-2 group-hover:text-ink">{p.title}</span>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted group-hover:text-accent-text">
              Project <ArrowUpRight size={12} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
