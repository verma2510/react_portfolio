import { SECTIONS, scrollToId } from '../../lib/sections';

/** Desktop-only vertical index. Doubles as a reading-position indicator. */
export function SideRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed top-(--header-h) bottom-0 left-0 z-30 hidden w-14 flex-col border-r border-line bg-bg lg:flex"
    >
      <ol>
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(s.id);
                }}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative flex h-11 items-center justify-center border-b border-line font-mono text-[11px] transition-colors ${
                  isActive ? 'bg-accent text-onaccent' : 'text-mute hover:bg-fg hover:text-bg'
                }`}
              >
                {s.no}
                <span className="pointer-events-none absolute top-1/2 left-full ml-px -translate-x-1 -translate-y-1/2 bg-fg px-2.5 py-1.5 font-mono text-[11px] tracking-wider whitespace-nowrap text-bg uppercase opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <p className="label mt-auto mb-6 self-center text-mute [writing-mode:vertical-rl] rotate-180" aria-hidden="true">
        Portfolio — {new Date().getFullYear()}
      </p>
    </nav>
  );
}
