import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, X } from 'lucide-react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb,
  SiGit, SiDocker, SiFirebase, SiFigma,
  SiCplusplus, SiStreamlit, SiOpenai,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const solarData = portfolioData.skills.solarSystem;

/* ──────────────────────────────────────────────
   Icon Map — maps data keys to branded SVG icons
   ────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  react: SiReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  node: SiNodedotjs,
  python: SiPython,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  docker: SiDocker,
  aws: FaAws,
  firebase: SiFirebase,
  figma: SiFigma,
  cpp: SiCplusplus,
  streamlit: SiStreamlit,
  openai: SiOpenai,
};

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface SkillData {
  name: string;
  icon: string;
  proficiency: number;
  years: number;
  note: string;
}

interface CategoryData {
  category: string;
  orbitRadius: number;
  color: string;
  rotationSpeed: number;
  rotationDirection: number;
  skills: SkillData[];
}

/* ──────────────────────────────────────────────
   LAYOUT CONSTANTS — concentric ellipses
   ────────────────────────────────────────────── */
// Fixed orbital radii per category — unique, well-separated
const ORBIT_RADII = [150, 280, 420, 560]; // Frontend, Backend, Tools, Others — 130px gaps
const ELLIPSE_RATIO = 0.42; // height/width ratio for perspective look

/* ──────────────────────────────────────────────
   Star Field (CSS box-shadow trick)
   ────────────────────────────────────────────── */
function generateStars(count: number): string {
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 2400;
    const y = Math.random() * 2400;
    const size = Math.random() < 0.08 ? 1.5 : 0.7;
    const opacity = 0.15 + Math.random() * 0.55;
    stars.push(`${x}px ${y}px 0 ${size}px rgba(148,163,184,${opacity})`);
  }
  return stars.join(', ');
}

const STARS_1 = generateStars(100);
const STARS_2 = generateStars(50);

/* ──────────────────────────────────────────────
   Ellipse position helpers
   ────────────────────────────────────────────── */
function ellipsePosition(angleDeg: number, rx: number, ry: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * rx,
    y: Math.sin(rad) * ry,
  };
}




/* ──────────────────────────────────────────────
   Proficiency Arc (hand-drawn SVG)
   ────────────────────────────────────────────── */
function ProficiencyArc({ proficiency, color, size = 52 }: { proficiency: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeWidth="3"
        className="text-slate-200 dark:text-slate-700" />
      <motion.circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (proficiency / 100) * circ }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}55)` }}
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Skill Tooltip (floating card)
   ────────────────────────────────────────────── */
function SkillTooltip({ skill, color, onClose }: { skill: SkillData; color: string; onClose: () => void }) {
  const Icon = ICON_MAP[skill.icon];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="absolute z-[60] left-1/2 -translate-x-1/2 top-full mt-4 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-slate-200 dark:border-slate-700/60 p-5 pointer-events-auto"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose}
        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
        <X size={14} />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <ProficiencyArc proficiency={skill.proficiency} color={color} size={48} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} style={{ color }} />}
            <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{skill.name}</p>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{skill.years} yr{skill.years > 1 ? 's' : ''} experience</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">Mastery</span>
        <span className="text-sm font-bold" style={{ color }}>{skill.proficiency}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">"{skill.note}"</p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Skill Moon (icon-based node on orbit)
   ────────────────────────────────────────────── */
function SkillMoon({
  skill, angle, orbitRx, orbitRy, color, catIndex, skillIndex,
  selectedSkill, onSelectSkill, isDimmed, onPause, onResume,
}: {
  skill: SkillData;
  angle: number;
  orbitRx: number;
  orbitRy: number;
  color: string;
  catIndex: number;
  skillIndex: number;
  selectedSkill: string | null;
  onSelectSkill: (id: string | null) => void;
  isDimmed: boolean;
  onPause: () => void;
  onResume: () => void;
}) {
  const Icon = ICON_MAP[skill.icon];
  const moonSize = 36 + (skill.proficiency / 100) * 16; // 36–52px
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100 + catIndex * 220 + skillIndex * 90);
    return () => clearTimeout(timer);
  }, [catIndex, skillIndex]);

  const pos = ellipsePosition(angle, orbitRx, orbitRy);
  const skillId = `${catIndex}-${skillIndex}`;
  const isSelected = selectedSkill === skillId;

  return (
    <div
      className="absolute pointer-events-auto"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top: `calc(50% + ${pos.y}px)`,
        transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
        opacity: mounted ? (isDimmed ? 0.15 : 1) : 0,
        zIndex: isSelected ? 50 : 15,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
      }}
    >
      <motion.button
        onClick={(e) => { e.stopPropagation(); onSelectSkill(isSelected ? null : skillId); }}
        whileHover={{ scale: 1.25 }}
        className="relative flex items-center justify-center rounded-full cursor-pointer group/moon focus:outline-none"
        style={{
          width: moonSize,
          height: moonSize,
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, ${color}30 100%)`,
          border: `2px solid ${color}88`,
          boxShadow: isSelected
            ? `0 0 24px ${color}66, 0 0 48px ${color}33`
            : `0 0 12px ${color}33, 0 0 4px ${color}22`,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Brand icon */}
        {Icon && <Icon size={moonSize * 0.45} style={{ color }} />}

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover/moon:opacity-30 transition-opacity duration-300"
          style={{ border: `2px solid ${color}` }} />

        {/* Hover label */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover/moon:opacity-100 transition-opacity duration-200 pointer-events-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700/50">
          {skill.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isSelected && <SkillTooltip skill={skill} color={color} onClose={() => onSelectSkill(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Category Planet
   ────────────────────────────────────────────── */
function CategoryPlanet({
  category, angle, orbitRx, orbitRy, color, index, onClick, isFocused, isDimmed, onPause, onResume
}: {
  category: string; angle: number; orbitRx: number; orbitRy: number; color: string;
  index: number; onClick: () => void;
  isFocused: boolean; isDimmed: boolean;
  onPause: () => void;
  onResume: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100 + index * 180);
    return () => clearTimeout(timer);
  }, [index]);

  const pos = ellipsePosition(angle, orbitRx, orbitRy);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      className="absolute pointer-events-auto cursor-pointer group/planet"
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top: `calc(50% + ${pos.y}px)`,
        transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
        opacity: mounted ? (isDimmed ? 0.15 : 1) : 0,
        zIndex: 20,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
      }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-110"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}ee, ${color}99)`,
          boxShadow: isFocused
            ? `0 0 35px ${color}66, 0 0 70px ${color}22`
            : `0 0 18px ${color}33`,
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        }}>
        <span className="text-white text-[10px] md:text-xs font-bold tracking-wide text-center leading-tight px-1">
          {category.split(' ')[0]}
        </span>
      </div>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium opacity-0 group-hover/planet:opacity-100 transition-opacity">
        {category}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mobile Accordion
   ────────────────────────────────────────────── */
function MobileAccordion({ data }: { data: CategoryData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="md:hidden space-y-4">
      {data.map((cat, i) => (
        <motion.div key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900/60"
        >
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center gap-4 p-5 text-left">
            {/* Rotating ring */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke={cat.color} strokeWidth="1.5" opacity="0.3"
                  strokeDasharray="4 3" style={{ animation: `spin ${12 + i * 4}s linear infinite` }} />
                <circle cx="20" cy="20" r="10" fill="none" stroke={cat.color} strokeWidth="1" opacity="0.5"
                  style={{ animation: `spin ${8 + i * 2}s linear infinite reverse` }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}44` }} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{cat.category}</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">{cat.skills.length} skills</p>
            </div>
            <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}
              className="text-slate-400">▾</motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden">
                <div className="px-5 pb-5 space-y-3">
                  {cat.skills.map((skill, si) => {
                    const Icon = ICON_MAP[skill.icon];
                    return (
                      <motion.div key={skill.name} initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.07 }}
                        className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0"
                          style={{ borderColor: `${cat.color}33`, background: `${cat.color}08` }}>
                          {Icon && <Icon size={18} style={{ color: cat.color }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                            <span className="text-xs font-bold ml-2" style={{ color: cat.color }}>{skill.proficiency}%</span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{ background: cat.color }}
                              initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + si * 0.05 }} />
                          </div>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{skill.note}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Orbit Ring — clean concentric ellipse path
   ────────────────────────────────────────────── */
function OrbitRing({
  rx, ry, color, isDimmed, catIndex,
}: {
  rx: number; ry: number; color: string; isDimmed: boolean; catIndex: number;
}) {
  const circ = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry))); // Ramanujan approx
  return (
    <svg
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: rx * 2,
        height: ry * 2,
        marginLeft: -rx,
        marginTop: -ry,
        opacity: isDimmed ? 0.06 : 0.22,
        transition: 'opacity 0.5s ease',
      }}
    >
      <motion.ellipse
        cx={rx} cy={ry}
        rx={rx - 1} ry={ry - 1}
        fill="none" stroke={color} strokeWidth="1"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.15 + catIndex * 0.3 }}
      />
      {/* Dashed secondary ring for depth */}
      <ellipse
        cx={rx} cy={ry}
        rx={rx - 1} ry={ry - 1}
        fill="none" stroke={color} strokeWidth="0.5"
        strokeDasharray="5 8" opacity="0.3"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   MAIN: Skills Section — Skill Solar System
   ────────────────────────────────────────────── */
export function Skills() {
  const [focusedCategory, setFocusedCategory] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef<number>(0);

  // Pre-compute collision-free angles for each category
  const categoryLayout = useMemo(() => {
    const allPositions: { x: number; y: number }[] = [];
    const layout: { rx: number; ry: number; planetAngle: number; moonAngles: number[] }[] = [];

    // Stagger starting angles so planets don't line up
    const planetStartAngles = [200, 40, 320, 140];

    solarData.forEach((cat, catIndex) => {
      const rx = ORBIT_RADII[catIndex];
      const ry = rx * ELLIPSE_RATIO;
      const planetAngle = planetStartAngles[catIndex];

      // Record planet position
      const planetPos = ellipsePosition(planetAngle, rx, ry);
      allPositions.push(planetPos);

      // Fan moons in a tight arc centered on the planet angle.
      // Arc half-width: 22° per skill so 4 skills = ±44° total fan.
      const arcHalf = Math.min(22 * cat.skills.length / 2, 55);
      let moonAngles: number[];
      if (cat.skills.length === 1) {
        moonAngles = [(planetAngle + 18) % 360];
      } else {
        const step = (arcHalf * 2) / (cat.skills.length - 1);
        moonAngles = cat.skills.map((_, i) =>
          (planetAngle - arcHalf + i * step + 360) % 360
        );
      }

      // Record all moon positions
      moonAngles.forEach(a => {
        allPositions.push(ellipsePosition(a, rx, ry));
      });

      layout.push({ rx, ry, planetAngle, moonAngles });
    });

    return layout;
  }, []);

  // Animation state: continuously update angles for rotation
  const [rotationOffsets, setRotationOffsets] = useState<number[]>(
    solarData.map(() => 0)
  );

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000; // seconds
      lastTime = time;

      if (!isPaused) {
        setRotationOffsets(prev =>
          prev.map((offset, i) => {
            const speed = 360 / solarData[i].rotationSpeed; // degrees per second
            const dir = solarData[i].rotationDirection;
            return offset + speed * dir * dt;
          })
        );
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused]);

  // Camera transform for focused category
  const cam = useMemo(() => {
    if (focusedCategory === null) return { scale: 1, x: 0, y: 0 };
    const layout = categoryLayout[focusedCategory];
    const angle = layout.planetAngle + rotationOffsets[focusedCategory];
    const pos = ellipsePosition(angle, layout.rx, layout.ry);
    return { scale: 1.5, x: -pos.x, y: -pos.y };
  }, [focusedCategory, categoryLayout, rotationOffsets]);

  const handleCanvasClick = useCallback(() => { setSelectedSkill(null); }, []);

  // ESC to reset
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFocusedCategory(null); setSelectedSkill(null); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section
      id="skills"
      className="py-32 md:py-40 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50"
    >
      {/* Star field — only visible in dark */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: STARS_1, width: '1px', height: '1px' }} />
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-50 transition-opacity duration-500"
        style={{ boxShadow: STARS_2, width: '1px', height: '1px' }} />

      {/* Radial glow — theme-aware */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 52%, rgba(99,102,241,0.06) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: 'radial-gradient(circle at 50% 52%, rgba(99,102,241,0.04) 0%, transparent 40%)' }} />

      {/* Light mode: dot-grid subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-0 transition-opacity duration-500"
        style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 0.8px, transparent 0.8px)', backgroundSize: '20px 20px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-6"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
            02 / Skills
          </span>
          <motion.h2
            className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white"
            initial={{ letterSpacing: '-0.05em' }}
            whileInView={{ letterSpacing: '0.02em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          >
            The Arsenal.
          </motion.h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Hover & click to explore · ESC to reset
          </p>
        </motion.div>

        {/* ══════════════════════════
            DESKTOP: Solar System
            ══════════════════════════ */}
        <div
          className="hidden md:block relative mx-auto"
          style={{ height: '860px', maxWidth: '1200px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); }}
          onClick={handleCanvasClick}
        >
          {/* Camera container */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: cam.scale,
              x: cam.x * cam.scale,
              y: cam.y * cam.scale,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            style={{ transformOrigin: '50% 50%' }}
          >
            {/* ── SUN (center core) ── */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-auto"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 70%)',
                  transform: 'scale(3)',
                  animation: 'pulse 4s ease-in-out infinite',
                }} />
              {/* Core sphere */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center relative z-10"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fca5a5, #ef4444, #b91c1c)',
                  boxShadow: '0 0 50px rgba(239, 68, 68, 0.45), 0 0 100px rgba(239, 68, 68, 0.15)',
                }}>
                <span className="text-white font-bold text-lg md:text-xl tracking-wider">AV</span>
              </div>
            </motion.div>

            {/* ── ORBITS + PLANETS + MOONS ── */}
            {solarData.map((cat, catIndex) => {
              const isDimmed = focusedCategory !== null && focusedCategory !== catIndex;
              const isFocused = focusedCategory === catIndex;
              const layout = categoryLayout[catIndex];
              const rotOffset = rotationOffsets[catIndex];

              const planetAngle = layout.planetAngle + rotOffset;

              return (
                <div key={cat.category}>
                  {/* Orbit Ring — static, does NOT rotate */}
                  <OrbitRing
                    rx={layout.rx}
                    ry={layout.ry}
                    color={cat.color}
                    isDimmed={isDimmed}
                    catIndex={catIndex}
                  />

                  {/* Planet */}
                  <CategoryPlanet
                    category={cat.category}
                    angle={planetAngle}
                    orbitRx={layout.rx}
                    orbitRy={layout.ry}
                    color={cat.color}
                    index={catIndex}
                    onClick={() => { setFocusedCategory(isFocused ? null : catIndex); setSelectedSkill(null); }}
                    isFocused={isFocused}
                    isDimmed={isDimmed}
                    onPause={() => setIsPaused(true)}
                    onResume={() => setIsPaused(false)}
                  />

                  {/* Moons — each on the same orbit, spread evenly */}
                  {cat.skills.map((skill, si) => {
                    const moonAngle = layout.moonAngles[si] + rotOffset;
                    return (
                      <SkillMoon
                        key={skill.name}
                        skill={skill}
                        angle={moonAngle}
                        orbitRx={layout.rx}
                        orbitRy={layout.ry}
                        color={cat.color}
                        catIndex={catIndex}
                        skillIndex={si}
                        selectedSkill={selectedSkill}
                        onSelectSkill={setSelectedSkill}
                        isDimmed={isDimmed}
                        onPause={() => setIsPaused(true)}
                        onResume={() => setIsPaused(false)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </motion.div>

          {/* Reset View */}
          <AnimatePresence>
            {focusedCategory !== null && (
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}
                onClick={(e) => { e.stopPropagation(); setFocusedCategory(null); setSelectedSkill(null); }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white/80 text-sm font-medium hover:bg-white dark:hover:bg-white/20 transition-colors shadow-lg"
              >
                <RotateCcw size={14} /> Reset View
              </motion.button>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute bottom-8 right-6 z-30 flex flex-col gap-2">
            {solarData.map((cat, i) => (
              <button key={cat.category}
                onClick={(e) => { e.stopPropagation(); setFocusedCategory(focusedCategory === i ? null : i); setSelectedSkill(null); }}
                className={`flex items-center gap-2 text-[11px] font-medium transition-all duration-300 px-3 py-1.5 rounded-lg ${
                  focusedCategory === i
                    ? 'bg-indigo-50 dark:bg-white/15 text-slate-800 dark:text-white'
                    : focusedCategory !== null
                      ? 'text-slate-300 dark:text-white/15 hover:text-slate-500 dark:hover:text-white/40'
                      : 'text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/80'
                }`}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                {cat.category}
              </button>
            ))}
          </div>

          {/* Pause indicator */}
          <AnimatePresence>
            {isPaused && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/40">
                ⏸ Orbits paused · explore freely
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ══════════════════════════
            MOBILE: Accordion
            ══════════════════════════ */}
        <MobileAccordion data={solarData} />
      </div>
    </section>
  );
}
