import { portfolioData } from '../../data/portfolioData';
import { splitGrade } from '../../lib/derive';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

/** 05 — Education and certifications. */
export function Credentials() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" aria-labelledby="cred-title" className="py-24 md:py-36">
      <SectionHeader
        id="cred-title"
        no="05"
        title="Credentials"
        kicker={`${education.length} schools — ${certifications.length} certifications`}
      />

      <div className="wrap">
        <h3 className="label mb-3 text-mute">Education</h3>
        {education.map((edu, i) => {
          const grade = splitGrade(edu.grade);
          return (
            <Reveal
              as="article"
              key={edu.degree}
              delay={i * 80}
              className="grid grid-cols-12 gap-x-4 gap-y-5 border-t border-fg py-8 md:py-12"
            >
              <p className="label col-span-12 md:col-span-2">{edu.duration}</p>
              <div className="col-span-12 md:col-span-5">
                <h4 className="text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.02] font-black tracking-[-0.04em]">{edu.degree}</h4>
                <p className="mt-3 font-semibold">{edu.institution}</p>
                <p className="label mt-1 text-mute">{edu.location}</p>
              </div>
              <div className="col-span-5 md:col-span-2">
                <p className="text-[clamp(2.5rem,4.5vw,4rem)] leading-none font-black tracking-[-0.05em] tabular-nums">{grade.value}</p>
                {grade.unit && <p className="label mt-2 text-mute">{grade.unit}</p>}
              </div>
              <ul className="col-span-7 space-y-2 text-sm leading-snug md:col-span-3">
                {edu.highlights.map((h) => (
                  <li key={h} className="grid grid-cols-[0.9rem_1fr] gap-1.5">
                    <span className="mt-1.5 block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <div id="certifications" data-anchor className="wrap mt-20 md:mt-28">
        <div className="flex items-end justify-between border-b-2 border-fg pb-3">
          <h3 className="text-2xl font-black tracking-[-0.04em] md:text-4xl">Certifications</h3>
          <span className="label text-mute">Verified externally ↗</span>
        </div>
        <ul>
          {certifications.map((cert, i) => (
            <Reveal as="li" key={`${cert.name}-${cert.issuer}`} delay={i * 60} className="border-b border-line">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cert.name} — ${cert.issuer}, ${cert.date}. Verify (opens in new tab)`}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 px-2 py-5 transition-colors hover:bg-fg hover:text-bg md:-mx-2 md:w-[calc(100%+1rem)] md:py-6"
              >
                <span className="label col-span-2 md:col-span-1">C.{String(i + 1).padStart(2, '0')}</span>
                <span className="col-span-10 text-xl leading-tight font-black tracking-[-0.03em] md:col-span-6 md:text-3xl">{cert.name}</span>
                <span className="col-span-10 col-start-3 text-sm font-semibold md:col-span-3 md:col-start-auto">{cert.issuer}</span>
                <span className="label col-span-6 col-start-3 opacity-70 md:col-span-1 md:col-start-auto">{cert.date}</span>
                <span className="label col-span-4 text-right md:col-span-1">
                  Verify <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
