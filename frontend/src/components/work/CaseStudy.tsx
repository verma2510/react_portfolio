import { slugify, type Project } from '../../lib/derive';
import { Reveal } from '../ui/Reveal';
import { ProjectPlate } from './ProjectPlate';
import { Overview, ProjectLinks, SpecList } from './ProjectParts';
import { StackTopology } from './StackTopology';

interface CaseStudyProps {
  project: Project;
  index: number;
  /** Mirror the composition for alternating, asymmetric rhythm. */
  flip?: boolean;
}

/** Full-width featured case study. */
export function CaseStudy({ project, index, flip = false }: CaseStudyProps) {
  const slug = slugify(project.title);
  const description = Array.isArray(project.description) ? project.description : [project.description];

  return (
    <article id={`project-${slug}`} data-anchor aria-labelledby={`title-${slug}`} className="wrap pb-20 md:pb-32">
      <div className="label flex items-center justify-between border-t border-fg py-3">
        <span>
          ({String(index + 1).padStart(2, '0')}) Featured case
        </span>
        <span className="text-mute">{project.role} — {project.year}</span>
      </div>

      <h3
        id={`title-${slug}`}
        className={`mt-6 mb-10 text-[clamp(3.25rem,11vw,11.5rem)] leading-[0.8] font-black tracking-[-0.06em] md:mb-14 ${
          flip ? 'md:text-right' : ''
        }`}
      >
        <Reveal as="span" variant="mask">
          {project.title}
        </Reveal>
      </h3>

      <div className="grid grid-cols-12 gap-x-4 gap-y-10">
        <Reveal
          className={`group col-span-12 md:row-start-1 md:col-span-7 ${flip ? 'md:col-start-6' : 'md:col-start-1'} ${
            flip ? 'md:mt-16' : ''
          }`}
        >
          <ProjectPlate
            title={project.title}
            index={index}
            year={project.year}
            category={project.category}
            stackSize={project.stack.length}
          />
        </Reveal>

        <Reveal
          delay={120}
          className={`col-span-12 flex flex-col gap-9 md:row-start-1 md:col-span-5 lg:col-span-4 ${
            flip ? 'md:col-start-1' : 'md:col-start-8 lg:col-start-9'
          } ${flip ? '' : 'md:mt-16'}`}
        >
          <SpecList project={project} />
          <div>
            <h4 className="label mb-3">Overview</h4>
            <Overview points={description} />
          </div>
          <div>
            <h4 className="label mb-3">System — by layer</h4>
            <StackTopology stack={project.stack} />
          </div>
          <ProjectLinks project={project} />
        </Reveal>
      </div>
    </article>
  );
}
