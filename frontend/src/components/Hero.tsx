import { motion, useSpring, type Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle smooth mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // max 20px offset
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax calculations smoothed out
  const springConfig = { damping: 25, stiffness: 100 };
  const parallaxX = useSpring(mousePosition.x, springConfig);
  const parallaxY = useSpring(mousePosition.y, springConfig);

  // Parent stagger variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">


      {/* Floating Geometric Shapes & Gradient Mesh Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1, 0.8, 1],
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 0, 50, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-cyan-300/40 dark:bg-cyan-900/20 blur-[120px]"
        />
        <motion.div
          animate={{
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 0.8, 1, 1.2, 1],
            x: [0, -100, 0, 100, 0],
            y: [0, 50, 0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-300/40 dark:bg-indigo-900/20 blur-[100px]"
        />

        {/* Subtle geometric particles floating */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: Math.random() * innerHeight }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 0.3, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute z-0 border border-cyan-400/40 dark:border-cyan-500/20 rounded"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Label: The Story of */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm tracking-[0.2em] uppercase backdrop-blur-md">
              The Story of
            </span>
          </motion.div>

          {/* Developer's Name with Parallax & Amber Accent */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="relative mb-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-9xl font-semibold text-slate-900 dark:text-white tracking-tight"
            >
              {portfolioData.hero.name}
              <span className="text-indigo-600 dark:text-cyan-400">.</span>
            </motion.h1>
            {/* Elegant horizontal accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: "circOut" }}
              className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-600/60 dark:via-cyan-400/80 to-transparent origin-center"
            />
          </motion.div>

          {/* Tagline / Context with JetBrains Mono */}
          <motion.div variants={itemVariants} className="mt-8 mb-16 max-w-2xl">
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
              &ldquo;{portfolioData.hero.tagline}&rdquo;
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              to="/about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-indigo-400/50 dark:border-cyan-500/30 text-indigo-700 dark:text-cyan-400 hover:text-white overflow-hidden rounded-full transition-all duration-500"
            >
              {/* Fill effect on hover */}
              <div className="absolute inset-0 bg-indigo-600 dark:bg-cyan-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />

              <span className="relative z-10 text-sm tracking-widest uppercase font-medium">
                Begin the Journey
              </span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                ↓
              </motion.span>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Decorative cinematic gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-500" />
    </section>
  );
}
