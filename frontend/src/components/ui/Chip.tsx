import type { ReactNode } from 'react';
import { TechIcon } from './TechIcon';

interface ChipProps {
  children: ReactNode;
  tech?: string;
  tone?: 'default' | 'accent';
  title?: string;
  className?: string;
}

/** Small bordered token for technologies, tags and statuses. */
export function Chip({ children, tech, tone = 'default', title, className = '' }: ChipProps) {
  const toneClass =
    tone === 'accent'
      ? 'border-transparent bg-accent-soft text-accent-text'
      : 'border-line bg-surface text-ink-2 hover:border-line-strong';
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11.5px] leading-none transition-colors ${toneClass} ${className}`}
    >
      {tech && <TechIcon name={tech} size={12} className="shrink-0 opacity-80" />}
      {children}
    </span>
  );
}
