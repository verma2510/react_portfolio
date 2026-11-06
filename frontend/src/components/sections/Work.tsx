import { portfolioData } from '../../data/portfolioData';
import { pad2 } from '../../lib/derive';
import { SectionHeader } from '../ui/SectionHeader';
import { CaseStudy } from '../work/CaseStudy';
import { ProjectIndex } from '../work/ProjectIndex';

/** 01 — Selected work: featured case studies, then the full index. */
export function Work() {
  const all = portfolioData.projects.map((project, index) => ({ project, index }));
  const featured = all.filter((p) => p.project.featured);
  const rest = all.filter((p) => !p.project.featured);

  return (
    <section id="projects" aria-labelledby="work-title" className="py-24 md:py-36">
      <SectionHeader
        id="work-title"
        no="01"
        title="Selected work"
        kicker={`${pad2(all.length)} projects — ${pad2(featured.length)} featured`}
        intro="Each project is laid out as a system: what it does, how the stack is layered, and where to see it running."
      />

      {featured.map(({ project, index }, i) => (
        <CaseStudy key={project.title} project={project} index={index} flip={i % 2 === 1} />
      ))}

      {rest.length > 0 && <ProjectIndex projects={rest} />}
    </section>
  );
}
