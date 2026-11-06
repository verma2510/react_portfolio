import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

const { hobbies } = portfolioData;

export function OffClock() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16), behavior: 'smooth' });
  };

  const arrow =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-2 transition-all hover:border-line-strong hover:text-ink disabled:opacity-30';

  return (
    <section id="off-clock" aria-labelledby="off-clock-title" className="bg-bg-elev/60 py-20 md:py-24">
      <Container>
        <SectionHeader
          section="off-clock"
          eyebrow="Off the clock"
          title="Beyond the"
          accent="code."
          aside={
            <div className="flex gap-2">
              <button type="button" className={arrow} onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Scroll left">
                <ArrowLeft size={16} />
              </button>
              <button type="button" className={arrow} onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Scroll right">
                <ArrowRight size={16} />
              </button>
            </div>
          }
        />

        <Reveal>
          <ul
            ref={track}
            onScroll={updateEdges}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
          >
            {hobbies.map((h, i) => (
              <li key={h.title} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${h.title} — view photo (new tab)`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-[14px] border border-line bg-surface-2">
                    <img
                      src={h.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover grayscale-[25%] transition-[transform,filter] duration-1000 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10.5px] text-white/90 backdrop-blur">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="mt-4 text-[17px] font-semibold tracking-tight text-ink">{h.title}</p>
                  <p className="mt-1 text-[14px] text-muted">{h.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
