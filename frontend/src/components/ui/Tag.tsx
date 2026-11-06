import { useId } from 'react';

interface TagProps {
  children: string;
  /** Optional explanation shown on hover / keyboard focus. */
  hint?: string;
  tone?: 'outline' | 'solid';
}

/** Technology chip. With a `hint`, becomes focusable and shows a tooltip. */
export function Tag({ children, hint, tone = 'outline' }: TagProps) {
  const id = useId();
  const base =
    tone === 'solid'
      ? 'bg-fg text-bg border-fg'
      : 'border-fg/80 text-fg hover:bg-fg hover:text-bg';

  if (!hint) {
    return <span className={`inline-block border px-2 py-0.5 text-xs font-medium transition-colors ${base}`}>{children}</span>;
  }

  return (
    <span className="group/tag relative inline-block">
      <span
        tabIndex={0}
        aria-describedby={id}
        className={`inline-block cursor-help border px-2 py-0.5 text-xs font-medium transition-colors focus-visible:bg-fg focus-visible:text-bg ${base}`}
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 hidden w-max max-w-60 animate-[swap_0.25s_var(--ease-swiss)] bg-fg px-2.5 py-1.5 text-xs leading-snug text-bg group-focus-within/tag:block group-hover/tag:block"
      >
        {hint}
      </span>
    </span>
  );
}
