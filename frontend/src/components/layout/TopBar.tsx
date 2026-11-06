import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useScroll } from 'framer-motion';
import { ArrowDownToLine, Menu, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { portfolioData } from '../../data/portfolioData';
import { SECTIONS, sectionNumber } from '../../lib/content';
import { useSectionNav } from '../../hooks/useSectionNav';
import { useActiveSectionState } from '../../providers/ActiveSectionProvider';
import { useCommandMenu } from '../../providers/CommandProvider';
import { Monogram } from './Monogram';
import { SocialIcons } from './SocialIcons';
import { ThemeToggle } from './ThemeToggle';

/** Mobile / tablet navigation: compact bar + full-screen index sheet. */
export function TopBar() {
  const [open, setOpen] = useState(false);
  const { active } = useActiveSectionState();
  const goTo = useSectionNav();
  const { setOpen: setPalette } = useCommandMenu();
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the sheet on route change (state adjusted during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll + Esc to close while the sheet is open
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  const activeLabel = SECTIONS.find((s) => s.id === active)?.label;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${portfolioData.hero.name} — home`}>
            <Monogram size={28} />
            <span className="truncate text-[14px] font-semibold tracking-tight">{portfolioData.hero.name}</span>
            {activeLabel && (
              <span className="hidden truncate font-mono text-[11px] text-faint sm:inline">
                / {sectionNumber(active)} {activeLabel}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPalette(true)}
              aria-label="Search and jump to"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-2"
            >
              <Search size={16} />
            </button>
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bg"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        <m.div className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} aria-hidden />
      </header>

      {/* Sibling of the header: its backdrop-filter would otherwise become the containing block for this fixed sheet */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-14 z-30 flex flex-col lg:hidden overflow-y-auto bg-bg px-4 pb-8 pt-4 sm:px-6"
          >
            <nav aria-label="Sections">
              <ol className="divide-y divide-line border-y border-line">
                {SECTIONS.map((s, i) => (
                  <m.li
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.35 }}
                  >
                    <a
                      href={s.id === 'index' ? '/' : `/#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        // let the sheet unmount and scroll unlock before scrolling
                        requestAnimationFrame(() => goTo(s.id));
                      }}
                      aria-current={active === s.id ? 'location' : undefined}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span className={`font-mono text-[11px] ${active === s.id ? 'text-accent-text' : 'text-faint'}`}>
                        {sectionNumber(s.id)}
                      </span>
                      <span className={`text-[26px] font-semibold tracking-tight ${active === s.id ? 'text-ink' : 'text-ink-2'}`}>
                        {s.label}
                      </span>
                    </a>
                  </m.li>
                ))}
              </ol>
            </nav>
            <div className="mt-auto space-y-4 pt-8">
              <a
                href={portfolioData.hero.resumeUrl}
                download
                className="flex items-center justify-between rounded-xl bg-ink px-4 py-3.5 text-sm font-medium text-bg"
              >
                Download résumé <ArrowDownToLine size={16} aria-hidden />
              </a>
              <SocialIcons className="-ml-2" />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
