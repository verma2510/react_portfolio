import { portfolioData } from '../../data/portfolioData';
import { optimisedSrc, type Hobby } from '../../lib/derive';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

/** Asymmetric placement on the 12-column grid; cycles if more hobbies are added. */
const LAYOUT = [
  { place: 'col-span-2 md:col-span-5', aspect: 'aspect-[4/5]' },
  { place: 'col-span-1 md:col-span-3 md:col-start-7 md:mt-28', aspect: 'aspect-[3/4]' },
  { place: 'col-span-1 md:col-span-3 md:col-start-10', aspect: 'aspect-[3/5]' },
  { place: 'col-span-2 md:col-span-6 md:col-start-2 md:-mt-10', aspect: 'aspect-[4/3]' },
  { place: 'col-span-1 md:col-span-3 md:col-start-8 md:mt-16', aspect: 'aspect-[3/4]' },
  { place: 'col-span-1 md:col-span-4 md:col-start-5', aspect: 'aspect-[4/5]' },
];

type Slot = (typeof LAYOUT)[number];

function HobbyTile({ hobby, index, slot }: { hobby: Hobby; index: number; slot: Slot }) {
  const { place: placement, aspect } = slot;

  return (
    <Reveal as="li" delay={(index % 3) * 90} className={placement}>
      <a
        href={hobby.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${hobby.title}: ${hobby.description} (opens photo in new tab)`}
        className="group block"
      >
        <div className={`relative overflow-hidden bg-panel ${aspect}`}>
          <picture>
            <source srcSet={optimisedSrc(hobby.image)} type="image/webp" />
            <img
              src={hobby.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          </picture>
          <span className="label absolute top-2.5 left-2.5 bg-bg px-1.5 py-0.5">H.{String(index + 1).padStart(2, '0')}</span>
          <span
            aria-hidden="true"
            className="absolute right-2.5 bottom-2.5 grid h-9 w-9 translate-y-2 place-items-center bg-accent text-onaccent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            ↗
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-fg pt-2">
          <h3 className="text-xl font-black tracking-[-0.03em] md:text-2xl">{hobby.title}</h3>
        </div>
        <p className="mt-1 text-sm leading-snug text-mute">{hobby.description}</p>
      </a>
    </Reveal>
  );
}

/** 06 — Off-hours. */
export function OffHours() {
  const hobbies = portfolioData.hobbies as Hobby[];
  return (
    <section id="hobbies" aria-labelledby="off-title" className="py-24 md:py-36">
      <SectionHeader
        id="off-title"
        no="06"
        title="Beyond the code"
        kicker={`${String(hobbies.length).padStart(2, '0')} pursuits`}
        intro="What keeps the curiosity running when the editor is closed."
      />
      <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-y-16">
        {hobbies.map((h, i) => (
          <HobbyTile key={h.title} hobby={h} index={i} slot={LAYOUT[i % LAYOUT.length]} />
        ))}
      </ul>
    </section>
  );
}
