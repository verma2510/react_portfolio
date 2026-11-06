import { useEffect, useState, type ReactNode } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { SECTION_IDS } from '../../lib/sections';
import { CommandIndex } from './CommandIndex';
import { GridOverlay } from './GridOverlay';
import { Header } from './Header';
import { SideRail } from './SideRail';

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Global frame: header, side rail, command index, grid overlay and hotkeys. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const active = useActiveSection(SECTION_IDS);
  const [indexOpen, setIndexOpen] = useState(false);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIndexOpen((o) => !o);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.key === '/') {
        e.preventDefault();
        setIndexOpen(true);
      } else if (e.key.toLowerCase() === 'g') {
        setGrid((g) => !g);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="label sr-only z-[70] bg-accent px-3 py-2 text-onaccent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Header active={active} onOpenIndex={() => setIndexOpen(true)} shortcut={isMac ? '⌘K' : 'Ctrl K'} />
      <SideRail active={active} />
      {children}
      <CommandIndex open={indexOpen} onClose={() => setIndexOpen(false)} active={active} />
      <GridOverlay visible={grid} />
    </>
  );
}
