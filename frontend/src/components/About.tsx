import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position exclusively for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate smooth parallax image translation
  const imgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Entrance Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <span className="font-jetbrains text-sm tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
            01 / About
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            The Origin Story.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Photo with Parallax */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[500px] md:h-[650px] w-full rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800/60 shadow-xl group"
          >
            {/* The image itself moves contrary to the page scroll */}
            <motion.div style={{ y: imgY }} className="absolute inset-x-0 -top-20 -bottom-20">
              <img 
                src={portfolioData.about.photoUrl} 
                alt="Aman V. Origin" 
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 ease-out scale-105"
              />
            </motion.div>
            
            {/* Subtle overlay gradients for cinematic mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/10 opacity-70 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          </motion.div>

          {/* Right Column - Bio and Milestones */}
          <div className="flex flex-col justify-center">
            
            <div className="space-y-8 mb-16">
              {portfolioData.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-light"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-8 mt-auto border-t border-slate-200 dark:border-slate-800/60">
              {/* Animated Progress Line Base */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="absolute top-8 left-0 right-0 h-[1px] bg-slate-300 dark:bg-slate-700 origin-left"
              />
              {/* Highlight Fill Overlay */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-indigo-500 to-cyan-400 origin-left"
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative z-10 pt-5">
                {portfolioData.about.milestones.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.8 + (i * 0.15), ease: "easeOut" }}
                    className="flex flex-col"
                  >
                    {/* Node */}
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center -translate-y-[29px] md:-translate-y-8 mb-2 shadow-sm transition-colors duration-300 hover:border-cyan-400">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-cyan-400" />
                    </div>
                    {/* Text */}
                    <span className="font-jetbrains text-sm md:text-[13px] font-bold tracking-tight text-slate-900 dark:text-white mb-1.5 -mt-2">
                      {m.year}
                    </span>
                    <span className="text-sm md:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                      {m.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
