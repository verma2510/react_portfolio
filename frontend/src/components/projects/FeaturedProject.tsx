import type { Project } from '../../data/portfolioData';
import { projectNumber, projects } from '../../lib/content';
import { Reveal } from '../ui/Reveal';
import { ProjectLinks } from './ProjectLinks';
import { ProjectSpec } from './ProjectSpec';
import { SystemMap } from './SystemMap';

/** Full-width editorial spread for a featured project; alternates sides. */
export function FeaturedProject({ project, flip = false }: { project: Project; flip?: boolean }) {
  const [lead, ...features] = project.description;
  const headingId = `project-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className="grid gap-8 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
      <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[13px] text-accent-text">{projectNumber(project)}</span>
          <span className="font-mono text-[11px] text-faint">/ {String(projects.length).padStart(2, '0')}</span>
          <span className="label ml-auto">Featured case study</span>
        </div>

        <h3 id={headingId} className="mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)] font-semibold leading-[0.95] text-ink">
          {project.title}
        </h3>

        <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{lead}</p>

        {features.length > 0 && (
          <ul className="mt-5 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </Reveal>

      <Reveal delay={0.1} className={`flex flex-col gap-3 lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
        <SystemMap stack={project.stack} label={`${project.title} · system map`} className="lg:min-h-[260px] lg:flex-1" />
        <ProjectSpec project={project} />
      </Reveal>
    </article>
  );
}
