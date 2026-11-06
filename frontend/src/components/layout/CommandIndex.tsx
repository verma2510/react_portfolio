import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { isPlaceholderUrl, slugify } from '../../lib/derive';
import { SECTIONS, openProject, scrollToId } from '../../lib/sections';
import { useTheme } from './ThemeProvider';

type Group = 'Sections' | 'Projects' | 'Experience' | 'Actions';

interface Entry {
  key: string;
  group: Group;
  label: string;
  meta?: string;
  run: () => void;
}

interface CommandIndexProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

function useEntries(): Entry[] {
  const { theme, toggleTheme } = useTheme();
  return useMemo(() => {
    const { projects, experience, hero, contact } = portfolioData;
    const external = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');

    const actions: Entry[] = [
      {
        key: 'resume',
        group: 'Actions',
        label: 'Download résumé',
        meta: 'PDF',
        run: () => {
          const a = document.createElement('a');
          a.href = hero.resumeUrl;
          a.download = '';
          a.click();
        },
      },
      { key: 'email', group: 'Actions', label: 'Write an email', meta: contact.email, run: () => (window.location.href = `mailto:${contact.email}`) },
      { key: 'github', group: 'Actions', label: 'Open GitHub', meta: '↗', run: external(contact.github) },
      { key: 'linkedin', group: 'Actions', label: 'Open LinkedIn', meta: '↗', run: external(contact.linkedin) },
      ...(!isPlaceholderUrl(contact.twitter)
        ? [{ key: 'twitter', group: 'Actions' as const, label: 'Open Twitter', meta: '↗', run: external(contact.twitter) }]
        : []),
      { key: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, run: toggleTheme },
    ];

    return [
      ...SECTIONS.map((s) => ({ key: `s-${s.id}`, group: 'Sections' as const, label: s.label, meta: s.no, run: () => scrollToId(s.id) })),
      ...projects.map((p) => ({
        key: `p-${p.title}`,
        group: 'Projects' as const,
        label: p.title,
        meta: `${p.role} · ${p.year}`,
        run: () => openProject(slugify(p.title)),
      })),
      ...experience.map((e) => ({
        key: `e-${e.company}`,
        group: 'Experience' as const,
        label: e.company,
        meta: e.role,
        run: () => scrollToId(`role-${slugify(e.company)}`),
      })),
      ...actions,
    ];
  }, [theme, toggleTheme]);
}

/**
 * ⌘K / Ctrl-K command index. Full-screen, type-to-filter jump list
 * across sections, projects, roles and quick actions.
 */
export function CommandIndex({ open, onClose, active }: CommandIndexProps) {
  const entries = useEntries();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<Element | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => `${e.label} ${e.meta ?? ''} ${e.group}`.toLowerCase().includes(q));
  }, [entries, query]);

  // Focus management + scroll lock
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      root.style.overflow = prev;
      (returnFocus.current as HTMLElement | null)?.focus?.();
      setQuery('');
      setCursor(0);
    };
  }, [open]);

  // Keep highlighted row in view
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const select = (entry: Entry) => {
    onClose();
    // Let the scroll lock release before navigating.
    window.setTimeout(entry.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault();
      select(results[cursor]);
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog: the input is the only tab stop besides close.
      const focusables = e.currentTarget.querySelectorAll<HTMLElement>('input, button[data-close]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // `results` is already ordered by group, so an entry's position is its keyboard index.
  const indexed = results.map((entry, idx) => ({ entry, idx }));
  const groups = (['Sections', 'Projects', 'Experience', 'Actions'] as Group[])
    .map((g) => ({ group: g, items: indexed.filter((r) => r.entry.group === g) }))
    .filter((g) => g.items.length);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-50 flex flex-col bg-bg"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.1, 1] }}
        >
          <div className="flex h-(--header-h) shrink-0 items-center border-b border-line">
            <div className="wrap flex items-center justify-between">
              <span className="label">Index — {results.length} entries</span>
              <button
                type="button"
                data-close
                onClick={onClose}
                className="label inline-flex h-8 items-center gap-2 bg-fg px-3 text-bg transition-colors hover:bg-accent hover:text-onaccent"
              >
                Close <kbd className="hidden font-mono text-[10px] opacity-70 md:inline">Esc</kbd>
              </button>
            </div>
          </div>

          <div className="wrap border-b-2 border-fg">
            <label htmlFor="cmd-q" className="sr-only">
              Jump to a section, project, company or action
            </label>
            <input
              id="cmd-q"
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              placeholder="Jump to…"
              autoComplete="off"
              spellCheck={false}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={results[cursor] ? `cmd-${results[cursor].key}` : undefined}
              className="w-full bg-transparent py-5 text-[clamp(2rem,6vw,5rem)] font-black tracking-[-0.05em] outline-none placeholder:text-mute/50 md:py-8"
            />
          </div>

          <div ref={listRef} id="cmd-list" role="listbox" aria-label="Results" className="flex-1 overflow-y-auto overscroll-contain">
            <div className="wrap grid grid-cols-12 gap-x-4 pb-24">
              {groups.length === 0 && <p className="col-span-12 py-10 text-xl text-mute">Nothing matches “{query}”.</p>}
              {groups.map(({ group, items }) => (
                <div
                  key={group}
                  role="group"
                  aria-label={group}
                  className={group === 'Sections' ? 'col-span-12 lg:col-span-7' : 'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8'}
                >
                  <p className="label sticky top-0 z-10 border-b border-line bg-bg py-3 text-mute">{group}</p>
                  {items.map(({ entry, idx }) => {
                    const highlighted = idx === cursor;
                    const isSection = entry.group === 'Sections';
                    const isCurrent = isSection && entry.key === `s-${active}`;
                    return (
                      <div
                        key={entry.key}
                        id={`cmd-${entry.key}`}
                        data-idx={idx}
                        role="option"
                        aria-selected={highlighted}
                        onMouseEnter={() => setCursor(idx)}
                        onClick={() => select(entry)}
                        className={`flex cursor-pointer items-baseline justify-between gap-4 border-b border-line px-2 transition-colors ${
                          highlighted ? 'bg-fg text-bg' : ''
                        } ${isSection ? 'py-2 md:py-1' : 'py-3'}`}
                      >
                        <span
                          className={
                            isSection
                              ? 'text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] font-black tracking-[-0.05em]'
                              : 'text-lg font-bold tracking-tight'
                          }
                        >
                          {entry.label}
                          {isCurrent && <span className="ml-3 inline-block h-3 w-3 bg-accent align-middle" aria-label="(current)" />}
                        </span>
                        {entry.meta && <span className={`label shrink-0 ${highlighted ? 'text-bg/70' : 'text-mute'}`}>{entry.meta}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="label hidden border-t border-line py-3 text-mute md:block">
            <div className="wrap flex gap-6">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
              <span className="ml-auto">G — toggle grid</span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
