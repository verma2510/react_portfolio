import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Building2, Calendar, Award } from 'lucide-react';

export function Education() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            05 / Education
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            The Foundation.
          </h2>
        </motion.div>

        {/* Education Milestone Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbars"
        >
          {portfolioData.education.map((edu, index) => (
            <motion.div 
              variants={cardVariants}
              key={index}
              className="group min-w-full md:min-w-[450px] lg:min-w-[500px] snap-center relative p-8 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 transition-all duration-500 overflow-hidden flex flex-col h-[320px] bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900"
            >
              {/* Decorative Geometric Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-cyan-500/5 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-8 right-8 text-indigo-200 dark:text-cyan-900/50 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors duration-500">
                <GraduationCap size={48} strokeWidth={1} />
              </div>

              {/* Main Info */}
              <div className="relative z-10 mb-auto transition-transform duration-500 group-hover:-translate-y-2">
                <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 pr-12 line-clamp-2">
                  {edu.degree}
                </h4>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 font-medium">
                    <Building2 size={16} className="mr-3 text-indigo-500 dark:text-cyan-400" />
                    {edu.institution}
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm ">
                    <Calendar size={14} className="mr-3" />
                    {edu.duration}
                  </div>
                  <div className="flex items-center text-slate-700 dark:text-slate-300 font-semibold mt-2">
                    <Award size={16} className="mr-3 text-amber-500 dark:text-amber-400" />
                    {edu.grade}
                  </div>
                </div>
              </div>

              {/* Expandable Highlights (Revealed on hover) */}
              <div className="absolute left-8 right-8 bottom-8 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800 mb-4" />
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-indigo-500 dark:text-cyan-400 mr-2 opacity-70">›</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
