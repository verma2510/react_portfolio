import { Container } from '../components/layout/Container';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectLedger } from '../components/projects/ProjectLedger';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { featuredProjects, otherProjects, projects } from '../lib/content';

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="pb-20 pt-10 md:pb-24 md:pt-12">
      <Container>
        <SectionHeader
          section="work"
          eyebrow="Selected work"
          title="Things I've"
          accent="built."
          lead="Featured case studies first, then the full index. Each system map is generated directly from the project's stack — client, server, data and delivery."
          aside={
            <dl className="flex gap-8 font-mono">
              <div>
                <dt className="label text-[10px]">Projects</dt>
                <dd className="mt-1 text-2xl text-ink">{String(projects.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt className="label text-[10px]">Featured</dt>
                <dd className="mt-1 text-2xl text-ink">{String(featuredProjects.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt className="label text-[10px]">Live demos</dt>
                <dd className="mt-1 text-2xl text-ink">{String(projects.filter((p) => p.liveLink).length).padStart(2, '0')}</dd>
              </div>
            </dl>
          }
        />

        {featuredProjects.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} flip={i % 2 === 1} />
        ))}

        {otherProjects.length > 0 && (
          <div className="mt-8 md:mt-12">
            <Reveal className="mb-6 flex items-end justify-between gap-4">
              <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
                Project <span className="font-serif font-normal italic text-ink-2">index</span>
              </h3>
              <span className="label">Select a row to expand</span>
            </Reveal>
            <Reveal delay={0.05}>
              <ProjectLedger items={otherProjects} />
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
