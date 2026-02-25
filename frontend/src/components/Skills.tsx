import { motion } from 'framer-motion';
import { 
  Database, Server, Code, FileCode, Cpu, 
  GitBranch, Terminal, Blocks
} from 'lucide-react';

const SKILLS = [
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

const half = Math.ceil(SKILLS.length / 2);
const ROW1 = SKILLS.slice(0, half);
const ROW2 = SKILLS.slice(half);

// Use 8 copies of each to ensure enough width for seamlessly looping ultra-wide monitors.
// Reducing copies also restricts total physical width, naturally slowing down linear animations.
const duplicatedRow1 = Array(8).fill(ROW1).flat();
const duplicatedRow2 = Array(8).fill(ROW2).flat();

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            The Arsenal
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            My Skills
          </motion.h3>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full flex flex-col gap-6 md:gap-10 marquee-container pt-8 pb-12">
        
        {/* Left Fading gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent z-10 pointer-events-none" />
        {/* Right Fading gradients */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Right to Left */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedRow1.map((skill, index) => (
            <div
              key={`row1-${index}`}
              className="flex flex-col items-center justify-center gap-4 group cursor-pointer px-4 md:px-6 py-4"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700/50 transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] group-hover:shadow-indigo-500/30 dark:group-hover:shadow-indigo-400/20 group-hover:border-indigo-400/50">
                <skill.icon className="w-10 h-10 md:w-14 md:h-14 stroke-[1.5] text-slate-500 dark:text-slate-400 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
              <span className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - Left to Right */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {duplicatedRow2.map((skill, index) => (
            <div
              key={`row2-${index}`}
              className="flex flex-col items-center justify-center gap-4 group cursor-pointer px-4 md:px-6 py-4"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700/50 transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] group-hover:shadow-cyan-500/30 dark:group-hover:shadow-cyan-400/20 group-hover:border-cyan-400/50">
                <skill.icon className="w-10 h-10 md:w-14 md:h-14 stroke-[1.5] text-slate-500 dark:text-slate-400 transition-colors duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
              </div>
              <span className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
