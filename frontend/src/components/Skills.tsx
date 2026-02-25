import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  Database, Server, Code, FileCode, Cpu, 
  GitBranch, Terminal, Blocks, Palette, 
  Sparkles, Cloud, Flame, PenTool, Braces, Box, Package
} from 'lucide-react';

// Maps string icons from portfolioData to real Lucide components
const ICON_MAP: Record<string, React.ElementType<{ className?: string }>> = {
  Code, FileCode, Palette, Sparkles, Cpu, Terminal, Database, 
  GitBranch, Package, Cloud, Flame, PenTool, Braces, Box
};

// Static marquee skills array just for visual presentation at the bottom
const MARQUEE_SKILLS: Array<{ name: string; icon: React.ElementType<{ className?: string }> }> = [
  { name: 'Django', icon: Server },
  { name: 'Express', icon: Blocks },
  { name: 'PostgreSQL', icon: Database },
  { name: 'React', icon: Code },
  { name: 'TypeScript', icon: FileCode },
  { name: 'Python', icon: Terminal },
  { name: 'JavaScript', icon: FileCode }, 
  { name: 'Git', icon: GitBranch },
  { name: 'Node.js', icon: Cpu },
  { name: 'MongoDB', icon: Database},
];

const half = Math.ceil(MARQUEE_SKILLS.length / 2);
const ROW1 = MARQUEE_SKILLS.slice(0, half);
const ROW2 = MARQUEE_SKILLS.slice(half);

// Use 8 copies of each to ensure enough width for seamlessly looping ultra-wide monitors
const duplicatedRow1 = Array(8).fill(ROW1).flat();
const duplicatedRow2 = Array(8).fill(ROW2).flat();

function CircularProgress({ percentage, label, index }: { percentage: number, label: string, index: number }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="flex flex-col items-center justify-center group"
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-3">
        {/* Background Ring */}
        <svg className="w-full h-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-200 dark:text-slate-800"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 + (index * 0.1) }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" /> {/* indigo-500 */}
              <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white transition-colors">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
            02 / Skills
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            The Arsenal.
          </h2>
        </motion.div>

        {/* Top 5 Highlight Skills (Circular Progress) */}
        <div className="mb-24 flex flex-wrap justify-center gap-10 md:gap-16">
          {portfolioData.skills.topSkills.map((skill, index) => (
            <CircularProgress 
              key={skill.name} 
              index={index} 
              percentage={skill.level} 
              label={skill.name} 
            />
          ))}
        </div>

        {/* Categories Grid (Pills/Tags) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {Object.entries(portfolioData.skills.categories).map(([category, skills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: catIndex * 0.1, ease: "easeOut" }}
              className="glass-panel p-8 md:p-10 rounded-3xl group border border-slate-200 dark:border-slate-800/60 hover:border-indigo-500/30 dark:hover:border-cyan-500/30 transition-colors duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                {category}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-wrap gap-4"
              >
                {skills.map((skill) => {
                  const Icon = (ICON_MAP[skill.icon] || Code) as React.ElementType<{ className?: string }>;
                  return (
                    <motion.div
                      variants={itemVariants}
                      key={skill.name}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-cyan-400/20 hover:border-indigo-400/50 dark:hover:border-cyan-400/50 transition-all duration-300 cursor-default"
                    >
                      <Icon className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                      {skill.name}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full flex flex-col gap-6 md:gap-10 marquee-container pt-8 pb-12 mt-12 bg-indigo-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/50">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedRow1.map((skill, index) => (
            <div key={`r1-${index}`} className="flex flex-col items-center justify-center gap-3 group px-4 md:px-8">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm border border-slate-200 dark:border-slate-700/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:group-hover:shadow-cyan-400/20 group-hover:border-indigo-400/50 shrink-0">
                <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-400 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-cyan-400" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {duplicatedRow2.map((skill, index) => (
            <div key={`r2-${index}`} className="flex flex-col items-center justify-center gap-3 group px-4 md:px-8">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm border border-slate-200 dark:border-slate-700/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20 dark:group-hover:shadow-indigo-400/20 group-hover:border-cyan-400/50 shrink-0">
                <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-400 transition-colors duration-300 group-hover:text-cyan-600 dark:group-hover:text-indigo-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
