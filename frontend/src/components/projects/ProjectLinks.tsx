import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type { Project } from '../../data/portfolioData';
import { ButtonA, ButtonLink } from '../ui/Button';

/** Case study / live / source actions. Live & source render only when links exist. */
export function ProjectLinks({ project, showCaseStudy = true, size = 'md' }: { project: Project; showCaseStudy?: boolean; size?: 'sm' | 'md' }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {showCaseStudy && (
        <ButtonLink to={`/work/${project.slug}`} size={size} aria-label={`Read the ${project.title} case study`}>
          Case study
          <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
        </ButtonLink>
      )}
      {project.liveLink && (
        <ButtonA href={project.liveLink} target="_blank" variant="secondary" size={size} aria-label={`Open ${project.title} live demo (new tab)`}>
          Live demo
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
        </ButtonA>
      )}
      {project.githubLink && (
        <ButtonA href={project.githubLink} target="_blank" variant="secondary" size={size} aria-label={`View ${project.title} source on GitHub (new tab)`}>
          <SiGithub size={14} aria-hidden />
          Source
        </ButtonA>
      )}
    </div>
  );
}
