import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useState, useMemo, useCallback, useEffect } from 'react';
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
  skill, angle, orbitRadius, color, catIndex, skillIndex,
  selectedSkill, onSelectSkill, isDimmed, isPaused
}: {
  skill: SkillData;
  angle: number;
  orbitRadius: number;
  color: string;
  catIndex: number;
  skillIndex: number;
  selectedSkill: string | null;
  onSelectSkill: (id: string | null) => void;
  isDimmed: boolean;
  isPaused: boolean;
}) {
  const Icon = ICON_MAP[skill.icon];
  const moonSize = 30 + (skill.proficiency / 100) * 14; // 30–44px
  const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
  const y = Math.sin((angle * Math.PI) / 180) * orbitRadius * 0.45;
  const skillId = `${catIndex}-${skillIndex}`;
  const isSelected = selectedSkill === skillId;

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 50 : 15,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: isDimmed ? 0.12 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 + catIndex * 0.22 + skillIndex * 0.09 }}
    >
      <motion.button
        onClick={(e) => { e.stopPropagation(); onSelectSkill(isSelected ? null : skillId); }}
        whileHover={{ scale: 1.2 }}
        className="relative flex items-center justify-center rounded-full cursor-pointer group/moon focus:outline-none"
        style={{
          width: moonSize,
          height: moonSize,
          background: `radial-gradient(circle at 35% 35%, white 0%, ${color}18 100%)`,
          border: `2px solid ${color}55`,
          boxShadow: isSelected
            ? `0 0 20px ${color}55, 0 0 40px ${color}22`
            : `0 0 8px ${color}22`,
          transition: 'box-shadow 0.3s ease, opacity 0.4s ease',
        }}
      >
        {/* Brand icon */}
        {Icon && <Icon size={moonSize * 0.45} style={{ color }} />}

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover/moon:opacity-30 transition-opacity duration-300"
          style={{ border: `2px solid ${color}`, animation: isPaused ? 'none' : undefined }} />

        {/* Hover label */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover/moon:opacity-100 transition-opacity duration-200 pointer-events-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700/50">
          {skill.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isSelected && <SkillTooltip skill={skill} color={color} onClose={() => onSelectSkill(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Category Planet
   ────────────────────────────────────────────── */
function CategoryPlanet({
  category, orbitRadius, color, index, onClick, isFocused, isDimmed
}: {
  category: string; orbitRadius: number; color: string;
  index: number; onClick: () => void;
  isFocused: boolean; isDimmed: boolean;
}) {
  const baseAngles = [225, 50, 145, 315];
  const angle = baseAngles[index % baseAngles.length];
  const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
  const y = Math.sin((angle * Math.PI) / 180) * orbitRadius * 0.45;

  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="absolute pointer-events-auto cursor-pointer focus:outline-none group/planet z-20"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: isDimmed ? 0.15 : 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.25 + index * 0.18 }}
      whileHover={{ scale: 1.15 }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-shadow duration-300"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}ee, ${color}99)`,
          boxShadow: isFocused
            ? `0 0 35px ${color}66, 0 0 70px ${color}22`
            : `0 0 18px ${color}33`,
        }}>
        <span className="text-white text-[10px] md:text-xs font-bold tracking-wide text-center leading-tight px-1">
          {category.split(' ')[0]}
        </span>
      </div>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium opacity-0 group-hover/planet:opacity-100 transition-opacity">
        {category}
      </span>
    </motion.button>
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
   MAIN: Skills Section — Skill Solar System
   ────────────────────────────────────────────── */
export function Skills() {
  const [focusedCategory, setFocusedCategory] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleCanvasClick = useCallback(() => { setSelectedSkill(null); }, []);

  // Camera transform for focused category
  const cam = useMemo(() => {
    if (focusedCategory === null) return { scale: 1, x: 0, y: 0 };
    const cat = solarData[focusedCategory];
    const angles = [225, 50, 145, 315];
    const a = angles[focusedCategory % angles.length];
    const px = Math.cos((a * Math.PI) / 180) * cat.orbitRadius;
    const py = Math.sin((a * Math.PI) / 180) * cat.orbitRadius * 0.45;
    return { scale: 1.6, x: -px, y: -py };
  }, [focusedCategory]);

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
          className="hidden md:block relative mx-auto overflow-hidden"
          style={{ height: '850px', maxWidth: '1100px' }}
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
                  transform: 'scale(3)',
                  animation: 'pulse 4s ease-in-out infinite',
                }} />
              {/* Core sphere */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center relative z-10"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #a5b4fc, #6366f1, #4338ca)',
                  boxShadow: '0 0 50px rgba(99,102,241,0.45), 0 0 100px rgba(99,102,241,0.15)',
                }}>
                <span className="text-white font-bold text-lg md:text-xl tracking-wider">AV</span>
              </div>
            </motion.div>

            {/* ── ORBITS + PLANETS + MOONS ── */}
            {solarData.map((cat, catIndex) => {
              const isDimmed = focusedCategory !== null && focusedCategory !== catIndex;
              const isFocused = focusedCategory === catIndex;
              const orbitC = 2 * Math.PI * cat.orbitRadius;

              // Distribute moons around the planet
              const baseAngles = [225, 50, 145, 315];
              const planetAngle = baseAngles[catIndex % baseAngles.length];
              const spread = 55;
              const moonAngles = cat.skills.map((_, i) => {
                const step = spread / (cat.skills.length - 1 || 1);
                return planetAngle - spread / 2 + i * step;
              });

              // Rotation animation style
              const rotDir = cat.rotationDirection === 1 ? '' : ' reverse';
              const rotStyle: React.CSSProperties = {
                animation: isPaused
                  ? 'none'
                  : `spin ${cat.rotationSpeed}s linear infinite${rotDir}`,
                transformOrigin: '50% 50%',
                position: 'absolute' as const,
                inset: 0,
              };

              return (
                <div key={cat.category}>
                  {/* Orbit Ring — does NOT rotate (stays visible as reference) */}
                  <svg
                    className="absolute left-1/2 top-1/2 pointer-events-none"
                    style={{
                      width: cat.orbitRadius * 2,
                      height: cat.orbitRadius * 0.9,
                      marginLeft: -cat.orbitRadius,
                      marginTop: -cat.orbitRadius * 0.45,
                      opacity: isDimmed ? 0.06 : 0.2,
                      transition: 'opacity 0.5s ease',
                    }}
                  >
                    <motion.ellipse
                      cx={cat.orbitRadius} cy={cat.orbitRadius * 0.45}
                      rx={cat.orbitRadius - 1} ry={cat.orbitRadius * 0.45 - 1}
                      fill="none" stroke={cat.color} strokeWidth="1"
                      strokeDasharray={orbitC}
                      initial={{ strokeDashoffset: orbitC }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.15 + catIndex * 0.3 }}
                    />
                    {/* Second dashed ring for depth */}
                    <ellipse
                      cx={cat.orbitRadius} cy={cat.orbitRadius * 0.45}
                      rx={cat.orbitRadius - 1} ry={cat.orbitRadius * 0.45 - 1}
                      fill="none" stroke={cat.color} strokeWidth="0.5"
                      strokeDasharray="5 8" opacity="0.3"
                    />
                  </svg>

                  {/* Rotating container for planets + moons */}
                  <div style={rotStyle}>
                    {/* Planet */}
                    <CategoryPlanet
                      category={cat.category} orbitRadius={cat.orbitRadius}
                      color={cat.color} index={catIndex}
                      onClick={() => { setFocusedCategory(isFocused ? null : catIndex); setSelectedSkill(null); }}
                      isFocused={isFocused} isDimmed={isDimmed}
                    />

                    {/* Moons */}
                    {cat.skills.map((skill, si) => (
                      <SkillMoon key={skill.name}
                        skill={skill} angle={moonAngles[si]} orbitRadius={cat.orbitRadius}
                        color={cat.color} catIndex={catIndex} skillIndex={si}
                        selectedSkill={selectedSkill}
                        onSelectSkill={setSelectedSkill}
                        isDimmed={isDimmed} isPaused={isPaused}
                      />
                    ))}
                  </div>
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
