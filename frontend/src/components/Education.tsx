import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Building2, Calendar, Award, MapPin } from 'lucide-react';

export function Education() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            05 / Education
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            The Foundation.
          </h2>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbars"
        >
          {portfolioData.education.map((edu, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              className="group min-w-full md:min-w-[450px] lg:min-w-[500px] snap-center h-[320px] flex-shrink-0 relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
            >
              {/* SLIDING TRACK: Holds both front and back (640px total height). Slides up by 50% on hover. */}
              <div className="absolute inset-x-0 top-0 h-[640px] transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                
                {/* ── TOP HALF: MAIN CONTENT (320px) ── */}
                <div className="w-full h-[320px] p-8 relative flex flex-col bg-slate-50 dark:bg-transparent">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-cyan-500/5 rounded-bl-[100px]" />
                  <div className="absolute top-8 right-8 text-indigo-200 dark:text-cyan-900/50 transition-colors duration-500">
                    <GraduationCap size={48} strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 pr-12 line-clamp-2">
                      {edu.degree}
                    </h4>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center text-slate-600 dark:text-slate-400 font-medium text-sm">
                        <Building2 size={15} className="mr-3 flex-shrink-0 text-indigo-500 dark:text-cyan-400" />
                        {edu.institution}
                      </div>
                      {(edu as any).location && (
                        <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm">
                          <MapPin size={14} className="mr-3 flex-shrink-0 text-indigo-400 dark:text-cyan-500" />
                          {(edu as any).location}
                        </div>
                      )}
                      <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm">
                        <Calendar size={14} className="mr-3 flex-shrink-0" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center text-slate-700 dark:text-slate-300 font-semibold mt-1">
                        <Award size={16} className="mr-3 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                        {edu.grade}
                      </div>
                    </div>

                    <p className="mt-auto text-xs text-slate-400 dark:text-slate-600 tracking-widest uppercase self-end">
                      Hover for highlights ↓
                    </p>
                  </div>
                </div>

                {/* ── BOTTOM HALF: HIGHLIGHTS PANEL (320px) ── */}
                <div className="w-full h-[320px] p-8 flex flex-col bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs tracking-widest text-indigo-500 dark:text-cyan-400 uppercase mb-4">
                    Highlights
                  </p>
                  <ul className="space-y-3 flex-1 overflow-y-auto">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="text-indigo-500 dark:text-cyan-400 mr-2 mt-0.5 flex-shrink-0">›</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-slate-400 dark:text-slate-600 tracking-widest uppercase self-start">
                    ↑ Details
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
