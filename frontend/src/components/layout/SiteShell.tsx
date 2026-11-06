import type { ReactNode } from 'react';
import { CommandPalette } from './CommandPalette';
import { Footer } from './Footer';
import { SideRail } from './SideRail';
import { TopBar } from './TopBar';

/** Persistent chrome around every route: rail (desktop), bar (mobile), palette, footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="fixed left-4 top-3 z-[70] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SideRail />
      <TopBar />
      <div className="lg:pl-[256px]">
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </div>
  );
}
