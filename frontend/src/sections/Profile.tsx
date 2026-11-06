import { m } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

const { about, hero, experience } = portfolioData;

export function Profile() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="profile" aria-labelledby="profile-title" className="bg-bg-elev/60 py-20 md:py-24">
      <Container>
        <SectionHeader section="profile" eyebrow="Profile" title="The origin" accent="story." />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5 lg:col-span-4">
            <figure className="group">
              <div className="relative overflow-hidden rounded-[14px] border border-line bg-surface-2">
                <img
                  src={about.photoUrl}
                  alt={`Portrait of ${hero.name}`}
                  width={900}
                  height={1170}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[filter,transform] duration-1000 ease-out-expo group-hover:scale-[1.02] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />
                <span className="absolute bottom-3 left-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/90 backdrop-blur">
                  {hero.name}
                </span>
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted">
                <span>{experience[0].role}</span>
                <span className="text-faint">fig. 01</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="md:col-span-7 lg:col-span-8">
            <Reveal>
              <p className="text-[clamp(1.35rem,2.3vw,1.85rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <p className="mt-6 text-[17px] leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}

            {/* Milestones */}
            <Reveal delay={0.1} className="mt-12">
              <h3 className="label mb-6">Milestones</h3>
              <ol className="relative grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                <m.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-line-strong xl:block"
                />
                {about.milestones.map((ms, i) => {
                  const last = i === about.milestones.length - 1;
                  return (
                    <li key={ms.year} className="relative border-l border-line pl-5 xl:border-l-0 xl:pl-0">
                      <span
                        aria-hidden
                        className={`absolute -left-[5.5px] top-[1px] h-[10px] w-[10px] rounded-full border-2 xl:left-0 ${
                          last ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
                        }`}
                      />
                      <p className={`font-mono text-[13px] xl:pt-6 ${last ? 'text-accent-text' : 'text-ink'}`}>{ms.year}</p>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{ms.text}</p>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
