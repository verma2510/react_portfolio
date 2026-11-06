import type { CSSProperties } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { careerStats, pad2, splitGrade } from '../../lib/derive';
import { scrollToId } from '../../lib/sections';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';

function Letters({ word, offset = 0 }: { word: string; offset?: number }) {
  return (
    <>
      {word.split('').map((ch, i) => (
        <span key={i} className="hero-letter" style={{ '--i': i + offset } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { hero, experience, projects, education, skills } = portfolioData;
  const current = experience[0];
  const career = careerStats();
  const degree = education[0];
  const grade = splitGrade(degree.grade);
  const [first, ...rest] = hero.name.toUpperCase().split(' ');
  const last = rest.join(' ');
  const core = skills.solarSystem
    .slice(0, 2)
    .flatMap((g) => g.skills)
    .filter((s) => s.proficiency >= 80)
    .map((s) => s.name);

  const specs = [
    { k: 'Currently', big: current.role.split(' ').map((w) => w[0]).join(''), small: `${current.role} at ${current.company}, since ${current.period.start}` },
    { k: 'Experience', big: `${career.years}+`, small: `Years across ${pad2(career.roles)} roles, shipping since ${career.sinceLabel}` },
    { k: 'Built', big: pad2(projects.length), small: `Projects, ${pad2(projects.filter((p) => p.featured).length)} featured — from CAD tooling to LLM analytics` },
    { k: 'Education', big: grade.value, small: `${grade.unit} — ${degree.degree}` },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col pt-(--header-h)">
      {/* Faint structural grid behind the type */}
      <div className="pointer-events-none absolute inset-0 top-(--header-h)" aria-hidden="true">
        <div className="wrap grid h-full grid-cols-4 gap-x-4 md:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`border-x border-line/40 ${i >= 4 ? 'hidden md:block' : ''}`} />
          ))}
        </div>
      </div>

      <div className="wrap relative flex flex-1 flex-col">
        {/* Metadata strip */}
        <div className="label grid grid-cols-12 gap-x-4 border-b border-line py-3 text-mute">
          <span className="col-span-6 md:col-span-3">(00) Index</span>
          <span className="col-span-6 text-right md:col-span-3 md:text-left">{current.role}</span>
          <span className="hidden md:col-span-3 md:block">@ {current.company}</span>
          <span className="hidden text-right md:col-span-3 md:block">Since {career.sinceLabel}</span>
        </div>

        <h1 id="hero-title" className="sr-only">
          {hero.name} — {current.role}
        </h1>

        {/* Interlocking name + annotations */}
        <div className="flex flex-1 flex-col justify-center py-8 md:py-10">
          <div className="flex items-end justify-between gap-6">
            <span aria-hidden="true" className="display block overflow-hidden pb-[0.04em] whitespace-nowrap text-[clamp(4.5rem,19vw,20rem)]">
              <Letters word={first} />
            </span>
            <Reveal delay={600} className="hidden max-w-[30ch] pb-[2.2vw] md:block">
              <p className="label mb-3 text-mute">Full-stack engineering</p>
              <p className="text-sm leading-relaxed">{core.join(' · ')}</p>
            </Reveal>
          </div>

          <div className="flex items-end justify-between gap-6">
            <Reveal delay={750} className="hidden max-w-[24ch] pb-[2.2vw] md:block">
              <p className="text-[clamp(1.25rem,1.9vw,2rem)] leading-[1.1] font-bold tracking-[-0.03em]">“{hero.tagline}”</p>
            </Reveal>
            <span aria-hidden="true" className="display ml-auto block overflow-hidden pb-[0.04em] whitespace-nowrap text-[clamp(4.5rem,19vw,20rem)]">
              <Letters word={last} offset={first.length} />
              <span className="hero-letter ml-[0.04em]" style={{ '--i': first.length + last.length } as CSSProperties}>
                <span className="inline-block h-[0.17em] w-[0.17em] bg-accent" />
              </span>
            </span>
          </div>

          <Reveal delay={500} className="mt-6 md:hidden">
            <p className="text-2xl leading-tight font-bold tracking-[-0.03em]">“{hero.tagline}”</p>
            <p className="mt-4 text-sm text-mute">{core.join(' · ')}</p>
          </Reveal>
        </div>

        {/* Spec sheet */}
        <dl className="grid grid-cols-2 border-t-2 border-fg md:grid-cols-4">
          {specs.map((s, i) => (
            <Reveal
              key={s.k}
              delay={800 + i * 90}
              className={`flex flex-col gap-2 py-5 pr-4 md:py-6 ${i % 2 === 1 ? 'border-l border-line pl-4' : ''} ${
                i === 2 ? 'border-t border-line md:border-t-0 md:border-l md:pl-4' : ''
              } ${i === 3 ? 'border-t border-line md:border-t-0' : ''}`}
            >
              <dt className="label text-mute">{s.k}</dt>
              <dd className="flex flex-col gap-1.5">
                <span className="text-4xl leading-none font-black tracking-[-0.05em] tabular-nums md:text-5xl">{s.big}</span>
                <span className="text-xs leading-snug text-mute md:text-sm">{s.small}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Calls to action */}
        <Reveal delay={1100} className="flex flex-wrap items-stretch gap-2 border-t border-line py-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('projects');
            }}
            className="group inline-flex items-center gap-3 bg-accent px-5 py-3.5 font-bold text-onaccent transition-colors hover:bg-fg hover:text-bg"
          >
            View selected work
            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href={hero.resumeUrl}
            download
            className="group inline-flex items-center gap-3 border border-fg px-5 py-3.5 font-bold transition-colors hover:bg-fg hover:text-bg"
          >
            Download résumé <span className="label opacity-60">PDF</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('contact');
            }}
            className="inline-flex items-center px-3 py-3.5 font-bold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
          >
            Get in touch
          </a>
        </Reveal>
      </div>

      {/* Stack ticker */}
      <div className="relative border-y-2 border-fg bg-bg py-3" aria-label="Technologies">
        {skills.dualStream.map((row) => (
          <Marquee key={row.row} items={row.skills} direction={row.direction} speed={row.speed} className="py-1" />
        ))}
      </div>
    </section>
  );
}
