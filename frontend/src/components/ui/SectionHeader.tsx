import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  no: string;
  title: ReactNode;
  kicker: string;
  intro?: ReactNode;
  id?: string;
}

/**
 * Section opener: heavy rule, index number, oversized title and a
 * right-hand metadata column. Asymmetric 1 / 7 / 4 split.
 */
export function SectionHeader({ no, title, kicker, intro, id }: SectionHeaderProps) {
  return (
    <header className="wrap">
      <div className="grid grid-cols-12 gap-x-4 border-t-2 border-fg pt-4 pb-12 md:pt-5 md:pb-20">
        <span className="label col-span-12 mb-6 md:col-span-1 md:mb-0" aria-hidden="true">
          ({no})
        </span>
        <h2
          id={id}
          className="col-span-12 text-[clamp(3rem,9vw,9rem)] font-black leading-[0.84] tracking-[-0.055em] md:col-span-7"
        >
          <Reveal as="span" variant="mask">
            {title}
          </Reveal>
        </h2>
        <Reveal
          delay={150}
          className="col-span-12 mt-8 flex flex-col gap-3 md:col-span-4 md:mt-1 md:items-end md:text-right"
        >
          <p className="label text-mute">{kicker}</p>
          {intro && <p className="max-w-sm text-base leading-relaxed text-mute">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}
