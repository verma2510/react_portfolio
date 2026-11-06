import { ArrowUpRight, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

const { education, certifications } = portfolioData;

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="py-20 md:py-24">
      <Container>
        <SectionHeader
          section="credentials"
          eyebrow="Education & certifications"
          title="The"
          accent="foundation."
        />

        {/* Education ledger */}
        <div>
          <Reveal className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold text-ink">Education</h3>
            <span className="label">{education.length} records</span>
          </Reveal>
          <ol className="border-t border-line-strong">
            {education.map((ed, i) => (
              <Reveal as="li" key={ed.degree} delay={0.04 * i} className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8">
                <div className="font-mono text-[12px] text-muted md:col-span-2">{ed.duration}</div>
                <div className="md:col-span-7">
                  <h4 className="text-[clamp(1.15rem,1.9vw,1.4rem)] font-semibold leading-snug text-ink">{ed.degree}</h4>
                  <p className="mt-1 text-[14.5px] text-ink-2">{ed.institution}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                    <MapPin size={13} aria-hidden /> {ed.location}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {ed.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="label text-[10px]">Grade</span>
                  <p className="mt-1 text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                    {ed.grade}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <Reveal className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold text-ink">Certifications</h3>
            <span className="label">{certifications.length} verified</span>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            {certifications.map((c, i) => (
              <Reveal as="li" key={`${c.name}-${c.date}`} delay={0.04 * i} className="bg-bg">
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${c.name} from ${c.issuer} (new tab)`}
                  className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-surface sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="label">{c.issuer}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors group-hover:text-accent-text">
                      Verify
                      <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold leading-snug tracking-tight text-ink">{c.name}</p>
                    <p className="mt-1 font-mono text-[12px] text-faint">{c.date}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
