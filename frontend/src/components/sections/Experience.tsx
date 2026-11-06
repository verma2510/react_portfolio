import { portfolioData } from '../../data/portfolioData';
import {
  careerStats,
  formatMonths,
  isPresent,
  monthIndex,
  parseMonth,
  roleDuration,
  shortCompany,
  slugify,
  type Experience as Role,
} from '../../lib/derive';
import { scrollToId } from '../../lib/sections';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';

/** Proportional time axis from the first role to today. */
function Timeline({ roles }: { roles: Role[] }) {
  const now = new Date();
  const spans = roles.map((r) => ({
    role: r,
    start: monthIndex(parseMonth(r.period.start, now)),
    end: monthIndex(parseMonth(r.period.end, now)) + 1,
  }));
  const min = Math.min(...spans.map((s) => s.start));
  const max = Math.max(...spans.map((s) => s.end));
  const total = max - min;
  const pct = (m: number) => ((m - min) / total) * 100;

  const firstYear = Math.floor(min / 12) + 1;
  const years: number[] = [];
  for (let y = firstYear; y * 12 < max; y++) years.push(y);

  return (
    <Reveal className="wrap mb-16 md:mb-24">
      <div className="label mb-3 flex justify-between text-mute">
        <span>{roles[roles.length - 1].period.start}</span>
        <span>Time on the job — to scale</span>
        <span>Today</span>
      </div>
      <div className="relative h-16 border-y-2 border-fg md:h-20">
        {years.map((y) => (
          <div key={y} className="absolute inset-y-0 border-l border-dashed border-line" style={{ left: `${pct(y * 12)}%` }}>
            <span className="label absolute top-full mt-2 -translate-x-1/2 text-mute">{y}</span>
          </div>
        ))}
        {spans.map(({ role, start, end }) => {
          const current = isPresent(role.period.end);
          return (
            <button
              key={role.company}
              type="button"
              onClick={() => scrollToId(`role-${slugify(role.company)}`)}
              title={`${role.company} · ${role.period.start} – ${role.period.end}`}
              className={`group absolute inset-y-2 flex items-end overflow-hidden px-2 pb-1.5 text-left transition-colors md:inset-y-3 ${
                current ? 'bg-accent text-onaccent' : 'bg-fg text-bg hover:bg-accent hover:text-onaccent'
              }`}
              style={{ left: `${pct(start)}%`, width: `calc(${pct(end) - pct(start)}% - 3px)` }}
            >
              <span className="label truncate">{shortCompany(role.company)}</span>
            </button>
          );
        })}
      </div>
    </Reveal>
  );
}

function RoleRow({ role, index }: { role: Role; index: number }) {
  const current = isPresent(role.period.end);
  const tooltips = (role.stackTooltips ?? {}) as Record<string, string | undefined>;

  return (
    <article
      id={`role-${slugify(role.company)}`}
      data-anchor
      className="grid grid-cols-12 gap-x-4 gap-y-8 border-t border-fg py-10 md:py-16"
    >
      <Reveal className="col-span-12 flex flex-row flex-wrap items-baseline gap-x-4 gap-y-2 md:col-span-3 md:flex-col">
        <span className="label">({String(index + 1).padStart(2, '0')})</span>
        <p className="label">
          {role.period.start} — {role.period.end}
        </p>
        <p className="label text-mute">{roleDuration(role)}</p>
        {current && (
          <span className="label mt-2 inline-flex items-center gap-2 bg-accent px-2 py-1 text-onaccent">
            <span className="h-1.5 w-1.5 animate-pulse bg-onaccent" aria-hidden="true" /> Current role
          </span>
        )}
      </Reveal>

      <Reveal delay={80} className="col-span-12 md:col-span-5">
        <h3 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[0.88] font-black tracking-[-0.05em]">{role.company}</h3>
        <p className="mt-4 text-lg font-bold tracking-tight">{role.role}</p>
        <p className="mt-2 max-w-md text-mute">{role.descriptor}</p>
        <blockquote className="mt-10 border-l-4 border-accent pl-5 text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.2] font-bold tracking-[-0.025em]">
          {role.pullQuote}
        </blockquote>
      </Reveal>

      <Reveal delay={160} className="col-span-12 flex flex-col gap-8 md:col-span-4">
        <div>
          <h4 className="label mb-3">Key contributions</h4>
          <ol className="border-t border-line">
            {role.achievements.map((a, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line py-3 text-[0.95rem] leading-relaxed">
                <span className="label pt-1 text-mute">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="label mb-2">Scope</h4>
          <p className="text-sm leading-relaxed text-mute">{role.responsibilities.join(' / ')}</p>
        </div>
        <div>
          <h4 className="label mb-3">Stack</h4>
          <ul className="flex flex-wrap gap-1.5">
            {role.stack.map((t) => (
              <li key={t}>
                <Tag hint={tooltips[t]}>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  );
}

/** 02 — Experience. */
export function Experience() {
  const roles = portfolioData.experience;
  const career = careerStats();

  return (
    <section id="experience" aria-labelledby="exp-title" className="py-24 md:py-36">
      <SectionHeader
        id="exp-title"
        no="02"
        title="Experience"
        kicker={`${String(career.roles).padStart(2, '0')} roles — ${formatMonths(career.months)} in industry`}
        intro="From generative-AI research to production CRM, analytics and e-commerce platforms."
      />
      <Timeline roles={roles} />
      <div className="wrap">
        {roles.map((role, i) => (
          <RoleRow key={role.company} role={role} index={i} />
        ))}
      </div>
    </section>
  );
}
