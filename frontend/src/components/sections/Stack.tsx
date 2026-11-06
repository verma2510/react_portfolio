import type { CSSProperties } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { usageMatrix, type SkillGroup } from '../../lib/derive';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

function GroupBlock({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <Reveal className="mb-14 last:mb-0">
      <div className="mb-2 flex items-baseline justify-between border-t-2 border-fg pt-4">
        <h3 className="text-2xl font-black tracking-[-0.04em] md:text-3xl">
          <span className="label mr-3 align-middle text-mute">{String.fromCharCode(65 + index)}</span>
          {group.category}
        </h3>
        <span className="label text-mute">{String(group.skills.length).padStart(2, '0')} tools</span>
      </div>
      <ul>
        {group.skills.map((s, i) => (
          <li key={s.name} className="group grid grid-cols-12 items-center gap-x-3 gap-y-1 border-b border-line py-3">
            <span className="col-span-5 font-bold tracking-tight md:col-span-3">{s.name}</span>
            <span className="bar-track relative col-span-5 h-3 md:col-span-4" role="img" aria-label={`Proficiency ${s.proficiency} out of 100`}>
              <span
                className="bar-fill absolute inset-y-0 left-0 w-full bg-fg group-hover:bg-accent"
                style={{ '--p': s.proficiency / 100, '--d': `${i * 60}ms` } as CSSProperties}
              />
            </span>
            <span className="label col-span-2 text-right tabular-nums md:col-span-1">{s.proficiency}</span>
            <span className="col-span-12 text-xs leading-snug text-mute md:col-span-4">
              <span className="label mr-2 text-fg">
                {s.years} yr{s.years > 1 ? 's' : ''}
              </span>
              {s.note}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** Technology × project/role matrix — where each tool has actually been used. */
function UsageMatrix() {
  const { columns, rows } = usageMatrix(2);
  return (
    <Reveal className="wrap mt-24 md:mt-32">
      <div className="grid grid-cols-12 gap-x-4 border-t-2 border-fg pt-4">
        <h3 className="col-span-12 text-3xl font-black tracking-[-0.04em] md:col-span-6 md:text-5xl">Where it's been used</h3>
        <p className="col-span-12 mt-3 max-w-md text-sm text-mute md:col-span-5 md:col-start-8 md:mt-1">
          Every technology that appears in two or more projects or roles, plotted against where it was applied.{' '}
          <span className="whitespace-nowrap">
            <span className="mx-1 inline-block h-2.5 w-2.5 bg-fg align-middle" /> project
          </span>{' '}
          <span className="whitespace-nowrap">
            <span className="mx-1 inline-block h-2.5 w-2.5 bg-accent align-middle" /> professional role
          </span>
        </p>
      </div>

      <div className="no-scrollbar relative mt-8 overflow-x-auto" tabIndex={0} aria-label="Usage matrix, scrollable">
        <table className="w-full min-w-[720px] border-collapse">
          <caption className="sr-only">Technologies by project and role</caption>
          <thead>
            <tr>
              <th scope="col" className="label w-40 border-b border-fg pb-3 text-left align-bottom text-mute">
                Technology
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="h-48 border-b border-fg px-1 pb-3 align-bottom">
                  <span
                    className={`label mx-auto block [writing-mode:vertical-rl] rotate-180 text-left whitespace-nowrap ${
                      c.kind === 'role' ? 'text-fg' : 'text-mute'
                    }`}
                  >
                    {c.kind === 'role' ? '● ' : ''}
                    {c.label}
                  </span>
                </th>
              ))}
              <th scope="col" className="label w-14 border-b border-fg pb-3 text-right align-bottom text-mute">
                Σ
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tech} className="group">
                <th scope="row" className="border-b border-line py-2 pr-4 text-left text-sm font-bold group-hover:text-accent">
                  {r.tech}
                </th>
                {r.cells.map((used, i) => (
                  <td key={columns[i].key} className="border-b border-l border-line text-center group-hover:bg-fg/5">
                    {used ? (
                      <span
                        className={`mx-auto block h-4 w-4 ${columns[i].kind === 'role' ? 'bg-accent' : 'bg-fg'}`}
                        aria-label="used"
                        role="img"
                      />
                    ) : (
                      <span className="sr-only">not used</span>
                    )}
                  </td>
                ))}
                <td className="border-b border-l border-line text-right font-mono text-sm font-medium tabular-nums">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

/** 03 — Stack: proficiency by discipline + usage matrix. */
export function Stack() {
  const groups = portfolioData.skills.solarSystem;
  const total = groups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" aria-labelledby="stack-title" className="py-24 md:py-36">
      <SectionHeader
        id="stack-title"
        no="03"
        title="Stack"
        kicker={`${total} technologies — ${groups.length} disciplines`}
        intro="Proficiency on a 0–100 scale, with years of hands-on use and where each tool fits."
      />

      <div className="wrap grid grid-cols-12 gap-x-4 gap-y-12">
        <aside className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="label mb-4 text-mute">Reading the scale</p>
            <div className="bar-track relative h-3 w-full border-x border-fg">
              <span className="absolute inset-y-0 left-0 w-[70%] bg-fg" />
            </div>
            <div className="label mt-2 flex justify-between text-mute">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <ul className="mt-8 border-t border-line">
              {groups.map((g, i) => (
                <li key={g.category} className="flex items-baseline justify-between border-b border-line py-2.5">
                  <span className="font-bold tracking-tight">
                    <span className="label mr-2 text-mute">{String.fromCharCode(65 + i)}</span>
                    {g.category}
                  </span>
                  <span className="label text-mute">
                    avg {Math.round(g.skills.reduce((n, s) => n + s.proficiency, 0) / g.skills.length)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-9">
          {groups.map((g, i) => (
            <GroupBlock key={g.category} group={g} index={i} />
          ))}
        </div>
      </div>

      <UsageMatrix />
    </section>
  );
}
