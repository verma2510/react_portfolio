import type { Project } from '../../lib/derive';

/** Numbered overview points. */
export function Overview({ points }: { points: string[] }) {
  return (
    <ol className="border-t border-line">
      {points.map((point, i) => (
        <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-2 border-b border-line py-3 text-[0.95rem] leading-relaxed">
          <span className="label pt-1 text-mute">{String(i + 1).padStart(2, '0')}</span>
          <span>{point}</span>
        </li>
      ))}
    </ol>
  );
}

/** Role / year / type / highlight as a definition list. */
export function SpecList({ project }: { project: Project }) {
  const rows = [
    ['Role', project.role],
    ['Year', project.year],
    ['Type', project.category],
    ['Highlight', project.impact],
  ].filter(([, v]) => Boolean(v));

  return (
    <dl className="grid grid-cols-2 border-t border-fg">
      {rows.map(([k, v], i) => (
        <div key={k} className={`border-b border-line py-3 ${i % 2 === 1 ? 'border-l pl-3' : 'pr-3'}`}>
          <dt className="label text-mute">{k}</dt>
          <dd className="mt-1 flex items-baseline gap-2 font-bold tracking-tight">
            {k === 'Highlight' && <span className="block h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />}
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Live + source links, or a plain note when neither is public. */
export function ProjectLinks({ project }: { project: Project }) {
  const { liveLink, githubLink, title } = project;
  if (!liveLink && !githubLink) {
    return <p className="label text-mute">No public link</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {liveLink && (
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live demo of ${title} (new tab)`}
          className="group inline-flex items-center gap-2 bg-fg px-4 py-2.5 text-sm font-bold text-bg transition-colors hover:bg-accent hover:text-onaccent"
        >
          Live demo
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      )}
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} source on GitHub (new tab)`}
          className="group inline-flex items-center gap-2 border border-fg px-4 py-2.5 text-sm font-bold transition-colors hover:bg-fg hover:text-bg"
        >
          Source
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      )}
    </div>
  );
}
