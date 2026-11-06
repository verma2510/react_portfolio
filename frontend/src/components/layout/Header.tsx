import { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { scrollToId, sectionById } from '../../lib/sections';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  active: string;
  onOpenIndex: () => void;
  shortcut: string;
}

/** Fixed top bar: identity · live section readout · actions · scroll progress. */
export function Header({ active, onOpenIndex, shortcut }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const progressRef = useRef<HTMLDivElement>(null);
  const current = sectionById(active);

  // Scroll progress written straight to the DOM — no re-renders.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId('home');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-(--header-h) border-b border-line bg-bg/92 backdrop-blur-md">
      <a
        href="#home"
        onClick={goHome}
        aria-label="Back to top"
        className="hidden h-full w-14 shrink-0 items-center justify-center border-r border-line bg-fg text-sm font-black tracking-[-0.06em] text-bg transition-colors hover:bg-accent hover:text-onaccent lg:flex"
      >
        AV
      </a>

      <div className="wrap grid h-full grid-cols-12 items-center gap-x-4">
        <a href="#home" onClick={goHome} className="col-span-7 flex items-baseline gap-2 truncate md:col-span-3">
          <span className="text-base font-extrabold tracking-[-0.03em]">{portfolioData.hero.name}</span>
          <span className="label hidden text-mute sm:inline">/ SDE</span>
        </a>

        <p className="label col-span-4 hidden items-center gap-3 md:flex" aria-live="polite">
          <span className="text-mute">Now viewing</span>
          <span key={current.id} className="inline-flex items-center gap-2 animate-[swap_0.5s_var(--ease-swiss)]">
            <span className="block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            {current.no} — {current.label}
          </span>
        </p>

        <div className="col-span-5 flex items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="label hidden h-8 items-center border border-line px-3 transition-colors hover:border-fg sm:inline-flex"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <a
            href={portfolioData.hero.resumeUrl}
            download
            className="label hidden h-8 items-center gap-1.5 border border-line px-3 transition-colors hover:border-fg sm:inline-flex"
          >
            Résumé <span aria-hidden="true">↓</span>
          </a>
          <button
            type="button"
            onClick={onOpenIndex}
            aria-haspopup="dialog"
            className="label inline-flex h-8 items-center gap-2 bg-fg px-3 text-bg transition-colors hover:bg-accent hover:text-onaccent"
          >
            Index
            <kbd className="hidden border border-current/30 px-1 font-mono text-[10px] opacity-70 md:inline">{shortcut}</kbd>
          </button>
        </div>
      </div>

      <div
        ref={progressRef}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent"
        aria-hidden="true"
      />
    </header>
  );
}
