import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useRef } from 'react';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position to draw the central line downwards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the center line from top to bottom as user scrolls
  const scaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Entrance Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="font-jetbrains text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            03 / Experience
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            Battles Fought.
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          
          {/* Static Center Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />
          
          {/* Animated Draw Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent -translate-x-1/2 origin-top" 
          />

          <div className="flex flex-col space-y-8 md:space-y-8">
            {portfolioData.experience.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row w-full group ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                  
                  {/* Glowing Node on Timeline */}
                  <div className="absolute left-[20px] md:left-1/2 top-[48px] md:top-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-[3px] border-indigo-500 dark:border-cyan-400 -translate-x-1/2 md:-translate-y-1/2 z-20 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Main Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div className={`glass-panel p-8 md:p-10 rounded-2xl md:rounded-3xl border-l-[3px] md:border-l-0 border-transparent transition-all duration-500 group-hover:shadow-xl group-hover:shadow-indigo-500/10 dark:group-hover:shadow-cyan-400/10 dark:hover:bg-slate-900/80 bg-slate-50 relative overflow-hidden text-left hover:-translate-y-1 ${isLeft ? 'md:border-r-[3px] hover:border-l-indigo-500 md:hover:border-l-transparent md:hover:border-r-indigo-500 dark:hover:border-l-cyan-400 dark:md:hover:border-l-transparent dark:md:hover:border-r-cyan-400' : 'md:border-l-[3px] hover:border-l-indigo-500 dark:hover:border-l-cyan-400'}`}>
                      
                      {/* Chapter Label */}
                      <span className="font-jetbrains text-xs tracking-[0.2em] font-medium text-slate-400 dark:text-slate-500 uppercase block mb-6">
                        Chapter 0{index + 1}
                      </span>
                      
                      <div className="flex flex-col gap-1 mb-6">
                        <h4 className="font-playfair text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight">
                          {exp.role}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-lg md:text-xl text-indigo-600 dark:text-cyan-400 font-medium">
                            @ {exp.company}
                          </span>
                          <span className="text-sm font-jetbrains text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50">
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            <span className="text-indigo-500 dark:text-cyan-400 font-bold select-none mr-3 mt-0.5 opacity-60">
                              ›
                            </span>
                            <span className="text-base text-slate-600 dark:text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stack Pill Row */}
                      {exp.stack && exp.stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
                          {exp.stack.map((tech, i) => (
                            <span 
                              key={i} 
                              className="font-jetbrains text-xs tracking-wide px-3 py-1.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 group-hover:border-indigo-200 dark:group-hover:border-cyan-900 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Subtle background glow effect locked inside card */}
                      <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-indigo-500/5 dark:bg-cyan-400/5 blur-3xl rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
