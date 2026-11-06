import { useRef, type PointerEvent } from 'react';
import { m } from 'framer-motion';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { headlineMetrics, sectionNumber } from '../lib/content';
import { shortcutLabel } from '../lib/platform';
import { useSectionNav } from '../hooks/useSectionNav';
import { useCommandMenu } from '../providers/CommandProvider';
import { Container } from '../components/layout/Container';
import { Button, ButtonA } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';

const EASE = [0.16, 1, 0.3, 1] as const;
const { hero, experience } = portfolioData;
const current = experience[0];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const goTo = useSectionNav();
  const { setOpen } = useCommandMenu();
  const metrics = headlineMetrics();

  // Pointer-tracked spotlight on the blueprint grid (CSS vars, rAF-throttled)
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame.current);
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - r.left}px`);
      el.style.setProperty('--my', `${clientY - r.top}px`);
    });
  };

  const [first, ...rest] = hero.name.split(' ');

  return (
    <section
      id="index"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      style={{ '--mx': '70%', '--my': '20%' } as React.CSSProperties}
    >
      {/* Background: blueprint grid, masked, with a cursor spotlight */}
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 -z-10 bg-transparent! [mask-image:radial-gradient(ellipse_80%_70%_at_60%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity duration-700"
        style={{ background: 'radial-gradient(520px circle at var(--mx) var(--my), var(--accent-soft), transparent 70%)' }}
      />

      <Container className="pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-24">
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4"
        >
          <span className="label text-accent-text">{sectionNumber('index')}</span>
          <span className="label">{current.role}</span>
          <span className="label hidden text-faint sm:inline">— Full-stack · Production systems</span>
        </m.div>

        {/* Name */}
        <h1 id="hero-title" className="mt-8 text-[clamp(3.4rem,11.5vw,10rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-ink">
          <span className="sr-only">{hero.name}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.22em]">
            {[first, rest.join(' ')].map((word, wi, words) => (
              <span key={wi} className="inline-flex items-end">
                <span className="inline-flex overflow-hidden pb-[0.06em]">
                  {word.split('').map((ch, ci) => (
                    <m.span
                      key={ci}
                      className="inline-block"
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease: EASE, delay: 0.1 + wi * 0.12 + ci * 0.035 }}
                    >
                      {ch}
                    </m.span>
                  ))}
                </span>
                {wi === words.length - 1 && (
                  <m.span
                    className="pb-[0.06em] text-accent"
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
                  >
                    .
                  </m.span>
                )}
              </span>
            ))}
          </span>
        </h1>

        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
          className="mt-6 max-w-3xl font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] italic leading-[1.1] tracking-[-0.01em] text-ink-2"
        >
          {hero.tagline}
        </m.p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Intro + CTAs */}
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="max-w-xl text-[17px] leading-relaxed text-muted md:text-lg">{hero.originStory}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={() => goTo('work')}>
                View selected work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
              </Button>
              <ButtonA href={hero.resumeUrl} download variant="secondary">
                <ArrowDownToLine size={16} aria-hidden />
                Résumé
              </ButtonA>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="hidden items-center gap-2 px-2 text-[13px] text-muted transition-colors hover:text-ink md:inline-flex"
              >
                or press
                <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-2">{shortcutLabel('K')}</kbd>
                to jump anywhere
              </button>
            </div>
          </m.div>

          {/* "Now" status card */}
          <m.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
            aria-label="Current role"
            className="panel p-5 lg:col-span-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ok" aria-hidden />
                <span className="label">Now</span>
              </span>
              <span className="font-mono text-[11px] text-faint">
                {current.period.start} — {current.period.end}
              </span>
            </div>
            <p className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink">{current.role}</p>
            <p className="text-[15px] text-ink-2">{current.company}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{current.descriptor}</p>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
              {current.stack.map((t) => (
                <Chip key={t} tech={t}>
                  {t}
                </Chip>
              ))}
            </div>
          </m.aside>
        </div>

        {/* Metrics strip */}
        <m.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14 grid grid-cols-2 border-y border-line md:grid-cols-4"
        >
          {metrics.map((mt, i) => (
            <div
              key={mt.label}
              className={`flex flex-col gap-1 py-5 pr-4 ${i % 2 === 1 ? 'pl-4 md:pl-5' : ''} ${i > 0 ? 'md:border-l md:border-line md:pl-5' : ''} ${
                i % 2 === 1 ? 'border-l border-line' : ''
              } ${i >= 2 ? 'border-t border-line md:border-t-0' : ''}`}
            >
              <dt className="order-2 text-[13px] leading-snug text-ink-2">{mt.label}</dt>
              <dd className="order-1 flex items-baseline gap-1 text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                {mt.value}
                {mt.unit && <span className="text-[0.45em] font-medium tracking-normal text-accent-text">{mt.unit}</span>}
              </dd>
              <dd className="order-3 truncate font-mono text-[10.5px] uppercase tracking-[0.06em] text-faint">{mt.source}</dd>
            </div>
          ))}
        </m.dl>
      </Container>
    </section>
  );
}
