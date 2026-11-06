import type { ReactNode } from 'react';

/** Shared content width + gutters for every section. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12 ${className}`}>{children}</div>;
}
