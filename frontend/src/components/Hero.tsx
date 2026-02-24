import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ThreeBackground } from './ThreeBackground';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <ThreeBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-8 shadow-sm border border-indigo-100 dark:border-indigo-500/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {portfolioData.hero.tagline}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
        >
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
            {portfolioData.hero.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="glass-panel p-6 md:p-8 rounded-2xl max-w-2xl mx-auto shadow-xl"
        >
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
            {portfolioData.hero.originStory}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          className="absolute bottom-12"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors group">
            <span className="text-xs font-semibold tracking-widest uppercase transition-transform group-hover:-translate-y-1">Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent dark:from-slate-600"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
