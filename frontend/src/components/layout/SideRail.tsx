import { m, useScroll, useSpring } from 'framer-motion';
import { ArrowDownToLine, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../../data/portfolioData';
import { SECTIONS, sectionNumber } from '../../lib/content';
import { shortcutLabel } from '../../lib/platform';
import { useSectionNav } from '../../hooks/useSectionNav';
import { useActiveSectionState } from '../../providers/ActiveSectionProvider';
import { useCommandMenu } from '../../providers/CommandProvider';
import { Monogram } from './Monogram';
import { SocialIcons } from './SocialIcons';
import { ThemeToggle } from './ThemeToggle';

const current = portfolioData.experience[0];

/**
 * Desktop navigation: a fixed "workspace" rail with identity, live status,
 * numbered section index with reading progress, search and utilities.
 */
export function SideRail() {
  const { active } = useActiveSectionState();
  const goTo = useSectionNav();
  const { setOpen } = useCommandMenu();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[256px] flex-col border-r border-line bg-bg/85 backdrop-blur-xl lg:flex">
      {/* Identity */}
      <div className="px-6 pt-7">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${portfolioData.hero.name} — home`}>
          <Monogram size={34} />
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold tracking-tight text-ink">{portfolioData.hero.name}</span>
            <span className="block truncate text-[12px] text-muted">{current.role}</span>
          </span>
        </Link>

        <div className="mt-6 rounded-lg border border-line bg-surface/70 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ok" aria-hidden />
            <span className="label text-[10px]">Currently</span>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-2">
            {current.company}
            <span className="text-faint"> · since {current.period.start}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 flex w-full items-center gap-2 rounded-lg border border-line px-3 py-2 text-left text-[13px] text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <Search size={14} aria-hidden />
          <span className="flex-1">Jump to…</span>
          <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">{shortcutLabel('K')}</kbd>
        </button>
      </div>

      {/* Section index */}
      <nav aria-label="Sections" className="relative mt-8 flex-1 overflow-y-auto px-3">
        <div className="absolute bottom-2 left-[22px] top-2 w-px bg-line" aria-hidden>
          <m.div className="h-full w-full origin-top bg-accent" style={{ scaleY: progress }} />
        </div>
        <ol>
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={s.id === 'index' ? '/' : `/#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(s.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className="group relative flex items-center gap-3 rounded-md py-[7px] pl-8 pr-3 text-[13.5px] transition-colors"
                >
                  <span
                    className={`absolute left-[19px] h-[7px] w-[7px] rounded-full border transition-all duration-300 ${
                      isActive ? 'scale-100 border-accent bg-accent' : 'scale-75 border-line-strong bg-bg group-hover:border-ink/50'
                    }`}
                    aria-hidden
                  />
                  <span className={`font-mono text-[10.5px] transition-colors ${isActive ? 'text-accent-text' : 'text-faint'}`}>
                    {sectionNumber(s.id)}
                  </span>
                  <span
                    className={`transition-all duration-300 ease-out-quart ${
                      isActive ? 'translate-x-0.5 font-medium text-ink' : 'text-muted group-hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Utilities */}
      <div className="space-y-3 border-t border-line px-6 py-5">
        <a
          href={portfolioData.hero.resumeUrl}
          download
          className="group flex items-center justify-between rounded-lg bg-ink px-3.5 py-2.5 text-[13px] font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Download résumé
          <ArrowDownToLine size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
        </a>
        <div className="flex items-center justify-between">
          <SocialIcons className="-ml-2" />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
