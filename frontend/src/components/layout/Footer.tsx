import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} {portfolioData.hero.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-2 font-serif text-[17px] italic text-ink-2">
          Crafted with intent.
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </p>
        <div className="flex items-center gap-4">
          <span className="label">Built with React · Node.js · Tailwind CSS</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
