import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { sectionNumber, type SectionId } from '../../lib/content';

interface SectionHeaderProps {
  section: SectionId;
  eyebrow: string;
  /** Plain part of the headline */
  title: string;
  /** Serif-italic emphasis appended to the headline */
  accent?: string;
  lead?: ReactNode;
  aside?: ReactNode;
}

/**
 * Editorial section opener: numbered mono eyebrow on a hairline,
 * large sans headline with a serif-italic accent, optional lead + aside.
 */
export function SectionHeader({ section, eyebrow, title, accent, lead, aside }: SectionHeaderProps) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal className="flex items-center gap-3 border-t border-line pt-4">
        <span className="label text-accent-text">{sectionNumber(section)}</span>
        <span className="label">{eyebrow}</span>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal delay={0.05} className="md:col-span-8">
          <h2 id={`${section}-title`} className="text-[clamp(2.25rem,5.2vw,4.25rem)] font-semibold leading-[0.98] text-ink">
            {title}
            {accent && (
              <>
                {' '}
                <span className="font-serif font-normal italic tracking-[-0.01em] text-ink-2">{accent}</span>
              </>
            )}
          </h2>
          {lead && <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">{lead}</p>}
        </Reveal>
        {aside && (
          <Reveal delay={0.12} className="md:col-span-4 md:justify-self-end">
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
