import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpRight, Copy, CornerDownLeft, FolderGit2, Hash, Mail, Search, SunMoon } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { SECTIONS, projectNumber, projects, sectionNumber, socialLinks } from '../../lib/content';
import { copyText } from '../../lib/platform';
import { useSectionNav } from '../../hooks/useSectionNav';
import { useCommandMenu } from '../../providers/CommandProvider';
import { useTheme } from '../../providers/ThemeProvider';

interface Command {
  id: string;
  group: 'Navigate' | 'Projects' | 'Actions' | 'Links';
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
}

/** The dialog body; its state lives only while open. */
function PaletteDialog() {
  const { setOpen } = useCommandMenu();
  const { toggleTheme } = useTheme();
  const goTo = useSectionNav();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const close = () => setOpen(false);
    return [
      ...SECTIONS.map<Command>((s) => ({
        id: `section-${s.id}`,
        group: 'Navigate',
        label: s.label,
        hint: sectionNumber(s.id),
        icon: <Hash size={15} />,
        run: () => {
          close();
          goTo(s.id);
        },
      })),
      ...projects.map<Command>((p) => ({
        id: `project-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: `${projectNumber(p)} · ${p.role}`,
        keywords: p.stack.join(' '),
        icon: <FolderGit2 size={15} />,
        run: () => {
          close();
          navigate(`/work/${p.slug}`);
        },
      })),
      {
        id: 'theme',
        group: 'Actions',
        label: 'Toggle light / dark theme',
        keywords: 'mode appearance',
        icon: <SunMoon size={15} />,
        run: () => toggleTheme(),
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Download résumé',
        keywords: 'resume cv pdf',
        icon: <ArrowDownToLine size={15} />,
        run: () => {
          const a = document.createElement('a');
          a.href = portfolioData.hero.resumeUrl;
          a.download = '';
          a.click();
          close();
        },
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: portfolioData.contact.email,
        icon: <Copy size={15} />,
        run: async () => {
          const ok = await copyText(portfolioData.contact.email);
          setToast(ok ? 'Email copied to clipboard' : 'Copy failed — email is ' + portfolioData.contact.email);
        },
      },
      {
        id: 'email',
        group: 'Links',
        label: 'Send an email',
        icon: <Mail size={15} />,
        run: () => {
          window.location.href = `mailto:${portfolioData.contact.email}`;
          close();
        },
      },
      ...socialLinks().map<Command>((l) => ({
        id: `link-${l.id}`,
        group: 'Links',
        label: `Open ${l.label}`,
        hint: l.handle,
        icon: <ArrowUpRight size={15} />,
        run: () => {
          window.open(l.href, '_blank', 'noopener,noreferrer');
          close();
        },
      })),
    ];
  }, [goTo, navigate, setOpen, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Mounted fresh on every open: focus the input, lock scroll, restore focus on close
  useEffect(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const toRestore = restoreFocus;
    return () => {
      document.body.style.overflow = prev;
      toRestore.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  // Keep the highlighted option in view
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      results[cursor]?.run();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = '';

  return (
    <m.div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.985 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="panel relative w-full max-w-[560px] overflow-hidden"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Search sections, projects, actions…"
            className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
        </div>

        <ul ref={listRef} id="command-list" role="listbox" aria-label="Commands" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">No matches for “{query}”.</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            const selected = i === cursor;
            return (
              <li key={c.id} role="presentation">
                {header && <div className="label px-3 pb-1.5 pt-3">{header}</div>}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={selected}
                  data-index={i}
                  onMouseMove={() => setCursor(i)}
                  onClick={() => c.run()}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors ${
                    selected ? 'bg-surface-2 text-ink' : 'text-ink-2'
                  }`}
                >
                  <span className={selected ? 'text-accent' : 'text-faint'}>{c.icon}</span>
                  <span className="flex-1 truncate">{c.label}</span>
                  {c.hint && <span className="hidden truncate font-mono text-[11px] text-faint sm:block">{c.hint}</span>}
                  {selected && <CornerDownLeft size={13} className="text-muted" aria-hidden />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
          <span className="label text-[10px]">↑↓ navigate · ↵ select</span>
          <span role="status" aria-live="polite" className="font-mono text-[11px] text-ok">
            {toast}
          </span>
        </div>
      </m.div>
    </m.div>
  );
}

/**
 * ⌘K command palette: jump to sections and case studies, or run actions
 * (theme, résumé, copy email, socials). Implements the ARIA combobox pattern.
 */
export function CommandPalette() {
  const { open } = useCommandMenu();
  return <AnimatePresence>{open && <PaletteDialog />}</AnimatePresence>;
}
