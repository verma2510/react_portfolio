import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { BadgeCheck, ExternalLink } from 'lucide-react';

export function Certifications() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="certifications" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center md:text-right"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            06 / Certifications
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            Badges of Honor.
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {portfolioData.certifications.map((cert, index) => {
            // Give cards an alternating tilt logic: odd tilts right, even tilts left
            const tiltClass = index % 2 === 0 ? '-rotate-2' : 'rotate-2';
            
            return (
              <motion.div 
                variants={cardVariants}
                key={index}
                className={`group relative h-full w-full flex flex-col rounded-3xl p-[2px] transition-all duration-500 transform ${tiltClass} hover:rotate-0 hover:-translate-y-2 hover:z-10`}
              >
                {/* Holographic Animated Border layer */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.5)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] hover:animate-holographic" />
                
                {/* Inner Card content */}
                <div className="relative h-full w-full bg-white dark:bg-slate-900 rounded-[22px] overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between z-10 flex-grow">
                  
                  {/* Verified Header */}
                  <div className="flex justify-between items-start mb-4">
                    <BadgeCheck className="text-indigo-500 dark:text-cyan-400" size={28} />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Verified
                    </span>
                  </div>

                  {/* Cert Info */}
                  <div className="mb-auto">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      {cert.name}
                    </h4>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 opacity-80">
                      {cert.date}
                    </span>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:text-indigo-800 dark:hover:text-cyan-300 transition-colors group/link"
                      >
                        Verify 
                        <ExternalLink size={12} className="ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    )}
                  </div>

                  {/* Shimmer overlay effect ON the content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
