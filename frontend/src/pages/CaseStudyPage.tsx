import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, projectNeighbours, projectNumber, findSkill, layerOf, LAYER_META } from '../lib/content';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useSectionNav } from '../hooks/useSectionNav';
import { useActiveSectionState } from '../providers/ActiveSectionProvider';
import { Container } from '../components/layout/Container';
import { ProjectLinks } from '../components/projects/ProjectLinks';
import { ProjectSpec } from '../components/projects/ProjectSpec';
import { SystemMap } from '../components/projects/SystemMap';
import { Chip } from '../components/ui/Chip';
import { Reveal } from '../components/ui/Reveal';
import { TechIcon } from '../components/ui/TechIcon';

export default function CaseStudyPage() {
  const { slug = '' } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { setActive } = useActiveSectionState();
  const goTo = useSectionNav();

  useDocumentMeta(project?.title, project ? `${project.title} — ${project.description[0]}` : undefined);
  useEffect(() => {
    setActive('work');
  }, [setActive]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // may return a Promise in newer browsers — never return it
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const { prev, next } = projectNeighbours(project.slug);
  const [overview, ...features] = project.description;

  return (
    <article aria-labelledby="case-title" className="pb-20 md:pb-28">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0 -z-10 bg-transparent! [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="pb-12 pt-8 lg:pb-16 lg:pt-12">
          <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
            <a
              href="/#work"
              onClick={(e) => {
                e.preventDefault();
                goTo('work');
              }}
              className="group inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              All work
            </a>
            <span className="label">
              Case study <span className="text-accent-text">{projectNumber(project)}</span> / {String(projects.length).padStart(2, '0')}
            </span>
          </nav>

          <Reveal className="mt-12 flex flex-wrap items-center gap-2">
            <Chip tone="accent">{project.role}</Chip>
            <Chip>{project.category}</Chip>
            <Chip>{project.year}</Chip>
          </Reveal>
          <Reveal delay={0.04}>
            <h1 id="case-title" className="mt-5 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-ink">
              {project.title}
              <span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] italic leading-[1.2] text-ink-2 lg:col-span-8">{overview}</p>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ProjectLinks project={project} showCaseStudy={false} />
            </div>
          </Reveal>
        </Container>
      </header>

      <Container className="pt-10 md:pt-14">
        <Reveal>
          <ProjectSpec project={project} />
        </Reveal>

        {/* Architecture */}
        <section aria-labelledby="arch-title" className="mt-16">
          <Reveal className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="arch-title" className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Architecture <span className="font-serif font-normal italic text-ink-2">at a glance</span>
            </h2>
            <span className="label hidden sm:inline">Derived from stack</span>
          </Reveal>
          <Reveal delay={0.05}>
            <SystemMap stack={project.stack} label={`${project.title} · system map`} />
          </Reveal>
        </section>

        {/* Narrative */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <section aria-labelledby="features-title" className="lg:col-span-7">
            <Reveal>
              <h2 id="features-title" className="label mb-4 border-b border-line-strong pb-3 text-ink">
                Features & implementation
              </h2>
              <ol className="divide-y divide-line">
                {(features.length ? features : [overview]).map((f, i) => (
                  <li key={f} className="grid grid-cols-[36px_1fr] gap-3 py-5 text-[16px] leading-relaxed text-ink-2">
                    <span className="font-mono text-[11px] leading-[2.1] text-accent-text">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </Reveal>

            {project.contributions && project.contributions.length > 0 && (
              <Reveal className="mt-12">
                <h2 className="label mb-4 border-b border-line-strong pb-3 text-ink">Key engineering contributions</h2>
                <ul className="space-y-3">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                      <span className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Reveal className="mt-12">
                <h2 className="label mb-4 border-b border-line-strong pb-3 text-ink">Challenges & solutions</h2>
                <div className="space-y-4">
                  {project.challenges.map((c) => (
                    <div key={c.problem} className="panel grid gap-4 p-5 sm:grid-cols-2">
                      <div>
                        <span className="label text-[10px]">Problem</span>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{c.problem}</p>
                      </div>
                      <div>
                        <span className="label text-[10px] text-accent-text">Solution</span>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </section>

          {/* Stack breakdown */}
          <section aria-labelledby="stack-breakdown-title" className="lg:col-span-5">
            <Reveal delay={0.05} className="lg:sticky lg:top-8">
              <h2 id="stack-breakdown-title" className="label mb-4 border-b border-line-strong pb-3 text-ink">
                Stack breakdown
              </h2>
              <ul className="divide-y divide-line">
                {project.stack.map((t) => {
                  const skill = findSkill(t);
                  return (
                    <li key={t} className="flex items-start gap-3 py-3.5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink-2">
                        <TechIcon name={t} size={15} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[15px] font-medium text-ink">{t}</span>
                          <span className="label text-[10px]">{LAYER_META[layerOf(t)].label}</span>
                        </div>
                        {skill?.note && <p className="mt-0.5 text-[13px] text-muted">{skill.note}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </section>
        </div>

        {/* Prev / next */}
        {prev && next && (
          <nav aria-label="More case studies" className="mt-20 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            {[
              { p: prev, dir: 'Previous', Icon: ArrowLeft },
              { p: next, dir: 'Next', Icon: ArrowRight },
            ].map(({ p, dir, Icon }) => (
              <Link
                key={dir}
                to={`/work/${p.slug}`}
                className={`group flex flex-col gap-3 bg-bg p-6 transition-colors hover:bg-surface sm:p-8 ${dir === 'Next' ? 'sm:items-end sm:text-right' : ''}`}
              >
                <span className="label flex items-center gap-2">
                  {dir === 'Previous' && <Icon size={13} className="transition-transform duration-300 group-hover:-translate-x-0.5" />}
                  {dir} · {projectNumber(p)}
                  {dir === 'Next' && <Icon size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
                </span>
                <span className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">{p.title}</span>
                <span className="text-[13.5px] text-muted">
                  {p.role} · {p.year}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </article>
  );
}
