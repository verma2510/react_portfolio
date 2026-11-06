import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { slugify, type Project } from '../../lib/derive';
import { OPEN_PROJECT_EVENT } from '../../lib/sections';
import { Reveal } from '../ui/Reveal';
import { ProjectPlate } from './ProjectPlate';
import { Overview, ProjectLinks, SpecList } from './ProjectParts';
import { StackTopology } from './StackTopology';

interface IndexProps {
  projects: { project: Project; index: number }[];
}

/**
 * Tabular project index. Rows expand in place into a compact case file;
 * on fine pointers a generative plate follows the cursor as a preview.
 */
export function ProjectIndex({ projects }: IndexProps) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, frame: 0 });

  // Allow the command index / deep links to expand a row.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (projects.some((p) => slugify(p.project.title) === slug)) {
        setOpen((prev) => new Set(prev).add(slug));
      }
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, [projects]);

  const toggle = (slug: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const onMove = (e: React.MouseEvent) => {
    const p = pointer.current;
    p.x = e.clientX;
    p.y = e.clientY;
    if (p.frame) return;
    p.frame = requestAnimationFrame(() => {
      p.frame = 0;
      if (previewRef.current) previewRef.current.style.transform = `translate3d(${p.x + 28}px, ${p.y - 110}px, 0)`;
    });
  };

  const preview = hovered !== null ? projects.find((p) => p.index === hovered) : undefined;

  return (
    <div className="wrap">
      <div className="flex items-end justify-between border-b-2 border-fg pb-3">
        <h3 className="text-2xl font-black tracking-[-0.04em] md:text-4xl">Index — further work</h3>
        <span className="label text-mute">{String(projects.length).padStart(2, '0')} entries</span>
      </div>

      <div className="label hidden grid-cols-12 gap-x-4 border-b border-line py-2 text-mute md:grid" aria-hidden="true">
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Project</span>
        <span className="col-span-2">Role</span>
        <span className="col-span-3">Stack</span>
        <span className="col-span-1">Year</span>
      </div>

      <ul onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        {projects.map(({ project, index }, row) => {
          const slug = slugify(project.title);
          const isOpen = open.has(slug);
          const panelId = `case-${slug}`;
          const description = Array.isArray(project.description) ? project.description : [project.description];

          return (
            <Reveal as="li" key={slug} delay={row * 70} id={`project-${slug}`} data-anchor className="border-b border-line">
              <h4>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(slug)}
                  onMouseEnter={() => setHovered(isOpen ? null : index)}
                  onFocus={() => setHovered(null)}
                  className={`group grid w-full grid-cols-12 items-baseline gap-x-4 px-2 py-5 text-left transition-colors md:-mx-2 md:w-[calc(100%+1rem)] md:py-6 ${
                    isOpen ? 'bg-fg text-bg' : 'hover:bg-fg hover:text-bg'
                  }`}
                >
                  <span className="label col-span-2 md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
                  <span className="col-span-8 text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[0.95] font-black tracking-[-0.05em] md:col-span-4">
                    {project.title}
                  </span>
                  <span className="col-span-2 hidden text-sm font-semibold md:block">{project.role}</span>
                  <span className="label col-span-3 hidden opacity-70 md:block">{project.stack.join(' / ')}</span>
                  <span className="label col-span-1 hidden md:block">{project.year}</span>
                  <span
                    aria-hidden="true"
                    className={`col-span-2 justify-self-end text-3xl leading-none font-light transition-transform duration-300 md:col-span-1 ${
                      isOpen ? 'rotate-45' : 'group-hover:rotate-90'
                    }`}
                  >
                    +
                  </span>
                  <span className="label col-span-10 col-start-3 mt-2 opacity-70 md:hidden">
                    {project.role} · {project.year}
                  </span>
                </button>
              </h4>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-label={`${project.title} case file`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-4 gap-y-8 pt-8 pb-12">
                      <div className="group col-span-12 md:col-span-4">
                        <ProjectPlate
                          title={project.title}
                          index={index}
                          year={project.year}
                          category={project.category}
                          stackSize={project.stack.length}
                        />
                        <div className="mt-6">
                          <SpecList project={project} />
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-4">
                        <h5 className="label mb-3">Overview</h5>
                        <Overview points={description} />
                      </div>
                      <div className="col-span-12 flex flex-col gap-8 md:col-span-4">
                        <div>
                          <h5 className="label mb-3">System — by layer</h5>
                          <StackTopology stack={project.stack} />
                        </div>
                        <ProjectLinks project={project} />
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </ul>

      {/* Cursor-follow preview (decorative, fine pointers only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-72 [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className={`transition-all duration-300 ease-(--ease-swiss) ${
            preview ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          {preview && (
            <ProjectPlate
              live
              title={preview.project.title}
              index={preview.index}
              year={preview.project.year}
              category={preview.project.category}
              stackSize={preview.project.stack.length}
              className="shadow-[12px_12px_0_0_var(--c-accent)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
