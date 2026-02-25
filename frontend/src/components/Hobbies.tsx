import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// Generate playful, randomized CSS offsets for a loose scattered look inside a flex container
const scatterStyles = [
  'md:translate-y-4 md:-rotate-3',
  'md:-translate-y-12 md:rotate-2',
  'md:translate-y-16 md:-rotate-4',
  'md:-translate-y-4 md:rotate-6',
  'md:translate-y-8 md:rotate-1'
];

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 md:py-40 relative overflow-hidden bg-[#fffdfa] dark:bg-slate-950">
      
      {/* Ambient Warmer Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-300/20 dark:bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-300/20 dark:bg-rose-900/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen" 
          style={{ animation: 'pulse 8s infinite alternate' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="text-sm tracking-widest text-orange-500 dark:text-orange-400 uppercase mb-4 block">
            07 / Hobbies
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            Beyond the Code.
          </h2>
        </motion.div>

        {/* Scattered Layout Container */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 pt-12 pb-24">
          {portfolioData.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.3, y: 60, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.1, 
                rotate: index % 2 === 0 ? 5 : -5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1 
              }}
              className={`flex flex-col items-center text-center p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-[3rem] border border-orange-100 dark:border-orange-900/30 shadow-2xl shadow-orange-900/5 dark:shadow-black/50 ${scatterStyles[index % scatterStyles.length]} w-full sm:w-[280px] group`}
            >
              {/* Giant Emoji / Icon Container */}
              <div className="text-7xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-xl select-none">
                {hobby.emoji}
              </div>
              
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                {hobby.name}
              </h4>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
