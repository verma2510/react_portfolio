import type { Project } from '../../data/portfolioData';

/** Compact spec sheet: role, year, platform, outcome. */
export function ProjectSpec({ project, className = '' }: { project: Project; className?: string }) {
  const rows = [
    { k: 'Role', v: project.role },
    { k: 'Year', v: project.year },
    { k: 'Platform', v: project.category },
    { k: 'Outcome', v: project.impact, accent: true },
  ];
  return (
    <div className={`@container ${className}`}>
      <dl className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-line @xl:grid-cols-4">
        {rows.map((r, i) => (
          <div
            key={r.k}
            className={`bg-surface/60 px-4 py-3 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line @xl:border-t-0' : ''} ${
              i === 2 ? '@xl:border-l' : ''
            }`}
          >
            <dt className="label text-[10px]">{r.k}</dt>
            <dd className={`mt-1 text-[14px] font-medium leading-snug ${r.accent ? 'text-accent-text' : 'text-ink'}`}>{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
