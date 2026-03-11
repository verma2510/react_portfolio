import { motion, AnimatePresence, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiFramer, SiRedux, SiJavascript,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiFastapi,
  SiGit, SiDocker, SiFirebase, SiFigma, SiExpress, SiSocketdotio, SiDatabricks,
  SiStreamlit, SiOpenai, SiDjango, SiVercel, SiNetlify, SiRender, SiRailway
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

/* ──────────────────────────────────────────────
   Icon Map
   ────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  react: SiReact, typescript: SiTypescript, tailwind: SiTailwindcss,
  framer: SiFramer, redux: SiRedux, express: SiExpress, javascript: SiJavascript,
  fastapi: SiFastapi, django: SiDjango, vercel: SiVercel,
  netlify: SiNetlify, render: SiRender, railway: SiRailway,
  socketdotio: SiSocketdotio, dsa: SiDatabricks, node: SiNodedotjs,
  python: SiPython, postgresql: SiPostgresql, mongodb: SiMongodb,
  git: SiGit, docker: SiDocker, aws: FaAws, firebase: SiFirebase,
  figma: SiFigma, streamlit: SiStreamlit, openai: SiOpenai
};

/* ──────────────────────────────────────────────
   Data & Types
   ────────────────────────────────────────────── */
const streamData = portfolioData.skills.dualStream;

interface StreamSkill {
  name: string;
  icon: string;
  proficiency: number;
}

interface StreamRow {
  row: number;
  direction: 'left' | 'right';
  speed: number;
  skills: StreamSkill[];
}

/* ──────────────────────────────────────────────
   Count-up hook
   ────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 500) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, active, duration]);

  return value;
}

/* ──────────────────────────────────────────────
   Skill Icon Item — shows icon; hover reveals
   name + proficiency bar as floating tooltip
   ────────────────────────────────────────────── */
function SkillItem({
  skill,
  isHovered,
  anyHovered,
  onHover,
  onLeave,
  globalId,
}: {
  skill: StreamSkill;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  globalId: string;
}) {
  const Icon = ICON_MAP[skill.icon];
  const count = useCountUp(skill.proficiency, isHovered);

  return (
    <span
      className="inline-flex items-center justify-center relative cursor-default select-none"
      onMouseEnter={() => onHover(globalId)}
      onMouseLeave={onLeave}
      style={{
        opacity: anyHovered && !isHovered ? 0.15 : 1,
        transition: 'opacity 0.35s ease',
      }}
    >
      {/* Icon */}
      <span
        className="flex items-center justify-center rounded-2xl transition-all duration-300"
        style={{
          width: 68,
          height: 68,
          background: isHovered
            ? 'var(--skill-glow)'
            : 'var(--skill-glow-dim)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          border: isHovered ? '1px solid var(--skill-border)' : '1px solid transparent',
        }}
      >
        {Icon && (
          <Icon
            size={34}
            className="transition-colors duration-300"
            style={{
              color: isHovered
                ? 'var(--skill-accent)'
                : 'var(--skill-icon)',
            }}
          />
        )}
      </span>

      {/* Hover tooltip — name + proficiency bar (positioned ABOVE icon) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >


            <div
              className="relative z-10 flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border backdrop-blur-md whitespace-nowrap"
              style={{
                background: 'rgba(15,23,42,0.90)',
                borderColor: 'var(--skill-border)',
                boxShadow: '0 -4px 24px rgba(0,0,0,0.25), 0 0 12px var(--skill-shadow)',
                minWidth: 110,
              }}
            >
              {/* Name + percentage */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-white tracking-tight">
                  {skill.name}
                </span>
                <span
                  className="text-[11px] font-bold"
                  style={{
                    color: 'var(--skill-accent)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {count}%
                </span>
              </div>

              {/* Proficiency bar */}
              <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--skill-accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>

            {/* Arrow pointing down */}
            <div className="flex justify-center -mt-1.5">
              <div
                className="w-2.5 h-2.5 rotate-45 border-r border-b"
                style={{
                  background: 'rgba(15,23,42,0.95)',
                  borderColor: 'var(--skill-border)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ──────────────────────────────────────────────
   Marquee Row — infinite scroll of icons
   ────────────────────────────────────────────── */
function MarqueeRow({
  stream,
  isPaused,
  hoveredSkill,
  anyHovered,
  onHover,
  onLeave,
  entranceComplete,
}: {
  stream: StreamRow;
  isPaused: boolean;
  hoveredSkill: string | null;
  anyHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  entranceComplete: boolean;
}) {
  const tripled = useMemo(
    () => [...stream.skills, ...stream.skills, ...stream.skills],
    [stream.skills]
  );

  const direction = stream.direction;
  const animName = direction === 'left' ? 'marquee' : 'marquee-reverse';
  const slideFrom = direction === 'left' ? '-100%' : '100%';

  return (
    <motion.div
      className="relative w-screen"
      style={{ marginLeft: 'calc(-50vw + 50%)', overflowX: 'clip', overflowY: 'visible' }}
      initial={{ x: slideFrom, opacity: 0 }}
      animate={
        entranceComplete
          ? { x: '0%', opacity: 1 }
          : { x: slideFrom, opacity: 0 }
      }
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Subtle baseline rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-slate-300 dark:bg-slate-700"
        style={{ opacity: 0.06 }}
      />

      <div
        className="flex items-center gap-6 md:gap-10 pt-16 pb-6 md:pt-20 md:pb-10 whitespace-nowrap px-4"
        style={{
          animation: entranceComplete
            ? `${animName} ${stream.speed}s linear infinite`
            : 'none',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {tripled.map((skill, i) => {
          const globalId = `r${stream.row}-${skill.name}-${i}`;
          const isHovered = hoveredSkill === globalId;
          return (
            <SkillItem
              key={globalId}
              skill={skill}
              isHovered={isHovered}
              anyHovered={anyHovered}
              onHover={onHover}
              onLeave={onLeave}
              globalId={globalId}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MAIN — Skills Section: "The Arsenal"
   ────────────────────────────────────────────── */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const anyHovered = hoveredSkill !== null;
  const isPaused = anyHovered;

  const handleHover = useCallback((id: string) => setHoveredSkill(id), []);
  const handleLeave = useCallback(() => setHoveredSkill(null), []);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setEntranceComplete(true), 900);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      <style>{`
        #skills {
          --skill-accent: #6366f1;
          --skill-dim: #94a3b8;
          --skill-icon: #64748b;
          --skill-glow: rgba(99,102,241,0.12);
          --skill-glow-dim: rgba(99,102,241,0.03);
          --skill-border: rgba(99,102,241,0.2);
          --skill-shadow: rgba(99,102,241,0.08);
        }
        .dark #skills {
          --skill-accent: #22d3ee;
          --skill-dim: #475569;
          --skill-icon: #94a3b8;
          --skill-glow: rgba(34,211,238,0.12);
          --skill-glow-dim: rgba(34,211,238,0.03);
          --skill-border: rgba(34,211,238,0.2);
          --skill-shadow: rgba(34,211,238,0.08);
        }
      `}</style>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 0.7px, transparent 0.7px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ═══════ Section Heading — clip-path wipe ═══════ */}
        <div className="text-center mb-8 md:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="block text-xs md:text-sm tracking-[0.3em] uppercase mb-5 text-indigo-600 dark:text-cyan-400"
          // style={{ color: 'var(--skill-accent) dark:text-cyan-400' }}
          >
            02 / Skills
          </motion.span>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold text-slate-900 dark:text-white leading-[0.95] tracking-tight"
            // style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            The Arsenal.
          </motion.h2>

          {/* <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-5 text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-md mx-auto tracking-wide"
          >
            Two streams of mastery, always in motion.
          </motion.p> */}
        </div>
      </div>

      {/* ═══════ Marquee Rows — full viewport width ═══════ */}
      <div className="flex flex-col gap-2 md:gap-3">
        {streamData.map((stream, i) => (
          <MarqueeRow
            key={stream.row}
            stream={stream as StreamRow}
            isPaused={isPaused}
            hoveredSkill={hoveredSkill}
            anyHovered={anyHovered}
            onHover={handleHover}
            onLeave={handleLeave}
            entranceComplete={entranceComplete}
          />
        ))}
      </div>
    </section>
  );
}

