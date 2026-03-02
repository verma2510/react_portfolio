import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExperienceEntry {
  company: string;
  role: string;
  period: { start: string; end: string };
  descriptor: string;
  pullQuote: string;
  achievements: string[];
  responsibilities: string[];
  stack: string[];
  stackTooltips?: Record<string, string>;
  duration: string;
}

// ─── Hook: Intersection-Observer-based active index ──────────────────────────
function useActiveSection(refs: React.RefObject<HTMLDivElement | null>[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.45 }
      );
      obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [refs]);

  return activeIndex;
}

// ─── Left Panel — Company Name with animated border ──────────────────────────
function CompanyNameDisplay({ exp }: { exp: ExperienceEntry }) {
  return (
    <motion.div
      key={exp.company}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="exp-name-display"
    >
      <h2 className="exp-company-name">{exp.company}</h2>
      <p className="exp-role-mono" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>{exp.role}</p>
      <p className="exp-period-mono" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>
        {exp.period.start} — {exp.period.end}
      </p>
      <p className="exp-descriptor" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>{exp.descriptor}</p>
    </motion.div>
  );
}

// ─── Left Index Item ──────────────────────────────────────────────────────────
function IndexItem({
  company,
  isActive,
  onClick,
}: {
  company: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`exp-index-item ${isActive ? 'exp-index-item--active' : ''}`}
      aria-current={isActive ? 'true' : undefined}
    >
      {/* Animated left bar */}
      <span className="exp-index-bar" aria-hidden="true">
        <motion.span
          className="exp-index-bar-fill"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <motion.span
        className="exp-index-label"
        animate={{
          opacity: isActive ? 1 : 0.35,
          fontWeight: isActive ? 600 : 400,
        }}
        transition={{ duration: 0.3 }}
      >
        {company}
      </motion.span>
    </button>
  );
}

// ─── Achievement Line with clip-path wipe ─────────────────────────────────────
function AchievementLine({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="exp-achievement-row" >
      <span className="exp-achievement-rule" aria-hidden="true" />
      <motion.span
        className="exp-achievement-text"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </div>
  );
}

// ─── Stack Tag with tooltip ───────────────────────────────────────────────────
function StackTag({
  tech,
  tooltip,
}: {
  tech: string;
  tooltip?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="exp-stack-tag"
      style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tech}
      <AnimatePresence>
        {hovered && tooltip && (
          <motion.span
            className="exp-stack-tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// ─── Right Panel — Single Company Block ──────────────────────────────────────
function CompanyBlock({
  exp,
  blockRef,
}: {
  exp: ExperienceEntry;
  blockRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Merge the scroll-target ref and our own inView ref
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (blockRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [blockRef]
  );

  return (
    <motion.div
      ref={setRefs}
      className="exp-block"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Pull Quote */}
      {exp.pullQuote && (
        <blockquote
          className="exp-pull-quote mt-2"
          style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}
        >
          <span className="exp-pull-quote-mark" aria-hidden="true">
            "
          </span>
          {exp.pullQuote}
          <span className="exp-pull-quote-mark" aria-hidden="true">
            "
          </span>
        </blockquote>
      )}

      {/* Achievements */}
      <div className="exp-achievements-group">
        {exp.achievements.map((a, i) => (
          <AchievementLine key={i} text={a} delay={i * 0.15} />
        ))}
      </div>

      {/* Responsibilities */}
      <div className="exp-responsibilities-section">
        <p className="exp-section-label" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>Responsibilities</p>
        <div className="exp-responsibilities-grid">
          {exp.responsibilities.map((r, i) => (
            <span key={i} className="exp-responsibility-item">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: stack + duration */}
      <div className="exp-bottom-row" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>
        <div className="exp-stack-group" style={{ fontFamily: '"Google Sans", sans-serif', fontStyle: 'normal' }}>
          {exp.stack.map((tech) => (
            <StackTag
              key={tech}
              tech={tech}
              tooltip={exp.stackTooltips?.[tech]}
            />
          ))}
        </div>
        <span className="exp-duration-stat">{exp.duration}</span>
      </div>

      {/* Full-width separator */}
      <div className="exp-block-rule" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Experience() {
  const experiences = portfolioData.experience as unknown as ExperienceEntry[];

  const sectionRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // One ref per company block (right panel)
  const blockRefs = useRef<React.RefObject<HTMLDivElement | null>[]>(
    experiences.map(() => ({ current: null }))
  );

  // Active index via IntersectionObserver
  const activeIndex = useActiveSection(blockRefs.current);

  // Smooth-scroll right panel to the clicked company
  const scrollToCompany = (index: number) => {
    const target = blockRefs.current[index]?.current;
    if (!target || !rightPanelRef.current) return;
    const panel = rightPanelRef.current;
    const targetTop = target.offsetTop;
    panel.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  // Section entrance
  const sectionInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const activeExp = experiences[activeIndex];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="exp-section"
    >
      {/* ── Section Header ── */}
      <motion.div
        className="exp-header"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="exp-eyebrow">03 / Experience</span>
        <h2 className="exp-heading">Battles Fought.</h2>
      </motion.div>

      {/* ── Editorial Spread ── */}
      <div className="exp-spread">

        {/* LEFT PANEL — sticky */}
        <motion.aside
          className="exp-left-panel"
          initial={{ opacity: 0, x: -60 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* Animated company name */}
          <AnimatePresence mode="wait">
            <CompanyNameDisplay key={activeIndex} exp={activeExp} />
          </AnimatePresence>

          {/* Navigation index */}
          <nav className="exp-index-nav" aria-label="Company navigation">
            {experiences.map((exp, i) => (
              <IndexItem
                key={exp.company}
                company={exp.company}
                isActive={i === activeIndex}
                onClick={() => scrollToCompany(i)}
              />
            ))}
          </nav>
        </motion.aside>

        {/* THIN DIVIDER */}
        <div className="exp-divider" aria-hidden="true" />

        {/* RIGHT PANEL — scrollable */}
        <motion.div
          ref={rightPanelRef}
          className="exp-right-panel"
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          {experiences.map((exp, i) => (
            <CompanyBlock
              key={exp.company}
              exp={exp}
              blockRef={blockRefs.current[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
