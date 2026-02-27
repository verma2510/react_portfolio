import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const projects = portfolioData.projects;

/* ──────────────────────────────────────────────
   CSS Art Scenes — unique per-project mockup
   ────────────────────────────────────────────── */
function CSSArtScene({ shape }: { shape: { type: string; colors: string[] } }) {
  const [c1, c2, c3] = shape.colors;

  switch (shape.type) {
    case 'circles':
      return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c3}22, ${c1}11)` }}>
          <div className="absolute w-32 h-32 rounded-full opacity-60 animate-pulse" style={{ background: `radial-gradient(circle, ${c1}, transparent)`, top: '15%', left: '10%' }} />
          <div className="absolute w-48 h-48 rounded-full opacity-40" style={{ background: `radial-gradient(circle, ${c2}, transparent)`, top: '30%', right: '5%', animation: 'pulse 3s ease-in-out infinite reverse' }} />
          <div className="absolute w-20 h-20 rounded-full opacity-50 animate-bounce" style={{ background: c1, bottom: '15%', left: '40%', animationDuration: '4s' }} />
          <div className="absolute w-16 h-16 rounded-full border-2 opacity-40" style={{ borderColor: c2, top: '10%', right: '25%' }} />
          <div className="absolute w-40 h-40 rounded-full opacity-20" style={{ background: c3, bottom: '-10%', left: '-5%' }} />
        </div>
      );
    case 'grid':
      return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${c3}15, ${c1}08)` }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${c1}25 1px, transparent 1px), linear-gradient(90deg, ${c1}25 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }} />
          <div className="absolute rounded-lg opacity-70" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, width: '80px', height: '80px', top: '20%', left: '15%' }} />
          <div className="absolute rounded-lg opacity-50" style={{ background: `linear-gradient(135deg, ${c2}, ${c3})`, width: '60px', height: '60px', top: '50%', right: '20%' }} />
          <div className="absolute rounded-sm opacity-40 animate-pulse" style={{ background: c1, width: '40px', height: '40px', bottom: '20%', left: '45%' }} />
        </div>
      );
    case 'waves':
      return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}12, ${c3}08)` }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
            <path d="M0,120 C100,80 200,160 400,100 L400,250 L0,250 Z" fill={c3} opacity="0.3" />
            <path d="M0,160 C120,120 280,200 400,140 L400,250 L0,250 Z" fill={c2} opacity="0.3" />
            <path d="M0,190 C150,160 250,220 400,180 L400,250 L0,250 Z" fill={c1} opacity="0.25" />
          </svg>
          <div className="absolute w-6 h-6 rounded-full opacity-60 animate-bounce" style={{ background: c1, top: '20%', left: '30%', animationDuration: '3s' }} />
          <div className="absolute w-4 h-4 rounded-full opacity-50" style={{ background: c2, top: '35%', right: '25%', animation: 'bounce 2.5s infinite' }} />
        </div>
      );
    case 'diagonal':
      return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}08, ${c3}12)` }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute opacity-20" style={{
              background: i % 2 === 0 ? c1 : c2,
              width: '200%', height: '3px',
              top: `${i * 14}%`, left: '-20%',
              transform: 'rotate(-35deg)'
            }} />
          ))}
          <div className="absolute right-[15%] top-[20%] w-16 h-16 rotate-45 opacity-50" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
          <div className="absolute left-[25%] bottom-[20%] w-10 h-10 rotate-12 opacity-40 rounded-md" style={{ border: `2px solid ${c1}` }} />
        </div>
      );
    case 'rings':
      return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background: `radial-gradient(ellipse at center, ${c3}15, transparent)` }}>
          {[100, 72, 44].map((size, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${size}px`, height: `${size}px`,
              border: `2px solid ${shape.colors[i]}`,
              opacity: 0.5 - i * 0.1,
              animation: `spin ${8 + i * 4}s linear infinite${i % 2 ? ' reverse' : ''}`
            }} />
          ))}
          <div className="absolute w-8 h-8 rounded-full animate-pulse" style={{ background: `radial-gradient(circle, ${c1}, ${c2})`, opacity: 0.7 }} />
        </div>
      );
    default:
      return (
        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${c1}44, ${c2}44, ${c3}44)` }} />
      );
  }
}

/* ──────────────────────────────────────────────
   Tech Stack Node Graph (simple SVG)
   ────────────────────────────────────────────── */
function TechGraph({ stack, highlightedTech, onTechHover, onTechLeave }: {
  stack: string[];
  highlightedTech: string | null;
  onTechHover: (tech: string) => void;
  onTechLeave: () => void;
}) {
  // Arrange nodes in a small flowing layout
  const nodePositions = useMemo(() => {
    return stack.map((_, i) => {
      const cols = Math.min(stack.length, 3);
      const row = Math.floor(i / cols);
      const col = i % cols;
      const offsetX = row % 2 === 1 ? 20 : 0;
      return {
        x: 30 + col * 70 + offsetX,
        y: 24 + row * 40
      };
    });
  }, [stack]);

  const svgHeight = Math.ceil(stack.length / 3) * 40 + 30;

  return (
    <svg width="100%" viewBox={`0 0 250 ${svgHeight}`} className="w-full max-w-[250px]">
      {/* Connection lines */}
      {stack.map((_, i) => {
        if (i === 0) return null;
        const from = nodePositions[i - 1];
        const to = nodePositions[i];
        return (
          <line key={`line-${i}`}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1" strokeDasharray="4 3"
            opacity="0.6"
          />
        );
      })}
      {/* Nodes */}
      {stack.map((tech, i) => {
        const pos = nodePositions[i];
        const isHighlighted = highlightedTech === tech;
        return (
          <g key={tech}
            onMouseEnter={() => onTechHover(tech)}
            onMouseLeave={onTechLeave}
            className="cursor-pointer"
          >
            <circle cx={pos.x} cy={pos.y} r="6"
              className={`transition-all duration-300 ${isHighlighted
                ? 'fill-indigo-500 dark:fill-cyan-400'
                : 'fill-slate-400 dark:fill-slate-600'
              }`}
              style={isHighlighted ? { filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.5))' } : {}}
            />
            <text x={pos.x + 12} y={pos.y + 4}
              className={`text-[10px] select-none transition-colors duration-300 ${isHighlighted
                ? 'fill-indigo-600 dark:fill-cyan-300 font-semibold'
                : 'fill-slate-500 dark:fill-slate-400'
              }`}
            >
              {tech}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Browser Frame Mockup
   ────────────────────────────────────────────── */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden shadow-lg bg-white dark:bg-slate-900">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <div className="flex-1 mx-4">
          <div className="h-5 rounded-md bg-slate-200 dark:bg-slate-700 max-w-[180px] mx-auto" />
        </div>
      </div>
      {/* Content */}
      <div className="aspect-[16/10] bg-slate-50 dark:bg-slate-950">
        {children}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Character-by-Character Title Animation
   ────────────────────────────────────────────── */
function AnimatedTitle({ text, keyProp }: { text: string; keyProp: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.h3
        key={keyProp}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-indigo-700 dark:text-cyan-400 tracking-tight leading-[1.1]"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.025 } },
          exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
        }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h3>
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────
   MAIN: Projects Section (Project Theatre)
   ────────────────────────────────────────────── */
export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeProject = projects[activeIndex];

  // Find which project indices share the highlighted tech
  const glowIndices = useMemo(() => {
    if (!highlightedTech) return new Set<number>();
    return new Set(
      projects.map((p, i) => p.stack.includes(highlightedTech) ? i : -1).filter(i => i !== -1)
    );
  }, [highlightedTech]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Only respond if section is largely in view
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, projects.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Animation variants
  const indexItemVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeOut' }
    })
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, x: 80, clipPath: 'inset(0 100% 0 0)' },
    visible: {
      opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const contentSlideVariants: Variants = {
    initial: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
    animate: {
      opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      opacity: 0, y: -60, clipPath: 'inset(0 0 100% 0)',
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50"
      tabIndex={-1}
    >
      {/* Dot-grid background texture */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            04 / Projects
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            Things I've Built.
          </h2>
        </motion.div>

        {/* ══════════════════════════════════════════
            DESKTOP: Project Theatre layout
            ══════════════════════════════════════════ */}
        <div className="hidden md:flex gap-8 lg:gap-12 items-start min-h-[600px]">

          {/* Left: Project Index List */}
          <motion.nav
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-56 lg:w-64 flex-shrink-0 sticky top-32 self-start"
            aria-label="Project index"
          >
            <ul className="space-y-1">
              {projects.map((project, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={indexItemVariants}
                >
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-400 group/item relative overflow-hidden ${
                      activeIndex === i
                        ? 'bg-white dark:bg-slate-800/80 shadow-md shadow-indigo-500/5 dark:shadow-cyan-400/5'
                        : 'hover:bg-white/60 dark:hover:bg-slate-800/40'
                    } ${glowIndices.has(i) && i !== activeIndex
                        ? 'ring-1 ring-indigo-400/40 dark:ring-cyan-400/30'
                        : ''
                    }`}
                  >
                    {/* Number */}
                    <span className={`text-[11px] font-mono tracking-wider block mb-0.5 transition-colors duration-300 ${
                      activeIndex === i
                        ? 'text-indigo-500 dark:text-cyan-400'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span className={`text-sm font-semibold block transition-colors duration-300 ${
                      activeIndex === i
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300'
                    }`}>
                      {project.title}
                    </span>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-2 left-4 right-4 h-[2px] bg-indigo-500 dark:bg-cyan-400 rounded-full origin-left"
                      initial={false}
                      animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Keyboard hint */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="text-[10px] text-slate-400 dark:text-slate-600 mt-6 px-4 tracking-wider uppercase"
            >
              ↑↓ keys to navigate
            </motion.p>
          </motion.nav>

          {/* Right: Active Project Display */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-8"
              >
                {/* Title + Role Tag + Year */}
                <div>
                  <AnimatedTitle text={activeProject.title} keyProp={activeIndex} />
                  <div className="flex items-center gap-3 mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/20">
                      {activeProject.role}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                      {activeProject.year}
                    </span>
                  </div>
                </div>

                {/* Browser Frame Mockup with CSS Art */}
                <BrowserFrame>
                  <CSSArtScene shape={activeProject.accentShape} />
                </BrowserFrame>

                {/* 2-Column: Description + Tech Graph */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                  {/* Left: narrative */}
                  <div>
                    <h5 className="text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3 font-semibold">
                      Problem → Solution
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-[15px]">
                      {activeProject.description}
                    </p>
                  </div>
                  {/* Right: tech stack graph */}
                  <div>
                    <h5 className="text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3 font-semibold">
                      Tech Stack
                    </h5>
                    <TechGraph
                      stack={activeProject.stack}
                      highlightedTech={highlightedTech}
                      onTechHover={setHighlightedTech}
                      onTechLeave={() => setHighlightedTech(null)}
                    />
                  </div>
                </div>

                {/* Bottom Row: Links + Impact */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/60">
                  {activeProject.liveLink && (
                    <a
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group/link"
                    >
                      Explore
                      <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                    </a>
                  )}
                  {activeProject.githubLink && (
                    <a
                      href={activeProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl transition-all"
                    >
                      <Github size={16} />
                      Source
                    </a>
                  )}
                  {activeProject.impact && (
                    <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-cyan-400">
                      <Zap size={14} className="opacity-70" />
                      {activeProject.impact}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE: Vertically scrolling case studies
            ══════════════════════════════════════════ */}
        <div className="md:hidden space-y-12">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden shadow-sm"
            >
              {/* Mockup */}
              <BrowserFrame>
                <CSSArtScene shape={project.accentShape} />
              </BrowserFrame>

              <div className="p-6 space-y-5">
                {/* Number + Title */}
                <div>
                  <span className="text-[11px] font-mono text-indigo-500 dark:text-cyan-400 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 leading-tight"
                    style={{ fontFamily: '"Google Sans", sans-serif' }}
                  >
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/20">
                      {project.role}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{project.year}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-sm">
                  {project.description}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-[11px] rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links + Impact */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg">
                      <ExternalLink size={13} /> Explore
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                      <Github size={13} /> Source
                    </a>
                  )}
                  {project.impact && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-cyan-400">
                      <Zap size={12} /> {project.impact}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
