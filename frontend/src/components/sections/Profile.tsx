import { portfolioData } from '../../data/portfolioData';
import { optimisedSrc } from '../../lib/derive';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

/** 04 — Profile: portrait, story and milestones. */
export function Profile() {
  const { about, hero } = portfolioData;

  return (
    <section id="about" aria-labelledby="profile-title" className="py-24 md:py-36">
      <SectionHeader id="profile-title" no="04" title="Profile" kicker="The person behind the commits" />

      <div className="wrap grid grid-cols-12 gap-x-4 gap-y-12">
        <Reveal className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4">
          <figure className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-panel">
              <picture>
                <source srcSet={optimisedSrc(about.photoUrl)} type="image/webp" />
                <img
                  src={about.photoUrl}
                  alt={`Portrait of ${hero.name}`}
                  width={1200}
                  height={1560}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover contrast-[1.08] grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </picture>
              <div className="pointer-events-none absolute inset-0 bg-accent opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20" />
              <span className="label absolute top-3 left-3 bg-bg px-1.5 py-0.5">Fig. A</span>
            </div>
            <figcaption className="label mt-3 flex justify-between text-mute">
              <span>{hero.name}</span>
              <span>Software Development Engineer</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
              {hero.originStory}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100} as="p" className="text-[1.05rem] leading-relaxed">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="wrap mt-20 md:mt-28">
        <p className="label mb-4 text-mute">Milestones</p>
        <ol className="grid grid-cols-1 border-t-2 border-fg sm:grid-cols-2 lg:grid-cols-4">
          {about.milestones.map((m, i) => {
            const present = /present/i.test(m.year);
            return (
              <Reveal
                as="li"
                key={m.year}
                delay={i * 100}
                className={`border-b border-line py-6 sm:pr-6 ${i > 0 ? 'sm:border-l sm:pl-6' : ''} ${i === 2 ? 'sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6' : ''}`}
              >
                <span
                  className={`block text-[clamp(3rem,6vw,5.5rem)] leading-[0.85] font-black tracking-[-0.06em] ${
                    present ? 'text-accent' : ''
                  }`}
                >
                  {m.year}
                </span>
                <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-mute">{m.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
