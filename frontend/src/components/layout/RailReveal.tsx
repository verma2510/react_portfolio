import { AnimatePresence, m, useScroll } from 'framer-motion';
import { PanelLeftOpen, Search } from 'lucide-react';
import { SECTIONS, sectionNumber } from '../../lib/content';
import { shortcutLabel } from '../../lib/platform';
import { useActiveSectionState } from '../../providers/ActiveSectionProvider';
import { useCommandMenu } from '../../providers/CommandProvider';
import { useRail } from '../../providers/RailProvider';

/**
 * Desktop-only controls shown while the side rail is hidden:
 * a compact floating pill (show sidebar · current section · search)
 * and a hairline reading-progress bar across the top.
 */
export function RailReveal() {
  const { collapsed, setCollapsed } = useRail();
  const { setOpen } = useCommandMenu();
  const { active } = useActiveSectionState();
  const { scrollYProgress } = useScroll();
  const label = SECTIONS.find((s) => s.id === active)?.label;

  return (
    <AnimatePresence>
      {collapsed && (
        <m.div
          key="rail-reveal"
          className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <m.div className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} aria-hidden />

          <m.div
            initial={{ x: -12 }}
            animate={{ x: 0, transition: { delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            className="pointer-events-auto absolute left-4 top-4 flex items-center gap-1 rounded-full border border-line bg-bg/80 p-1 shadow-[var(--shadow-panel)] backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Show sidebar"
              aria-controls="side-rail"
              aria-expanded={false}
              title={`Show sidebar (${shortcutLabel('B')})`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <PanelLeftOpen size={16} />
            </button>
            {label && (
              <span className="hidden items-center gap-1.5 px-2 font-mono text-[11px] text-muted xl:inline-flex" aria-live="polite">
                <span className="text-accent-text">{sectionNumber(active)}</span>
                {label}
              </span>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Search and jump to"
              title={`Jump to… (${shortcutLabel('K')})`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <Search size={15} />
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
