import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            The Chapters
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Work Experience
          </motion.h3>
        </div>

        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-0 md:left-8 top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />

          <div className="space-y-16">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative pl-8 md:pl-24 group"
              >
                <div className="absolute left-[-5px] md:left-[27px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.2)] dark:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] group-hover:scale-125 transition-transform duration-300 z-10" />

                <div className="flex flex-col mb-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50">
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold w-max mb-3">
                    {exp.duration}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h4>
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base mt-1 md:mt-0">
                      @ {exp.company}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mt-6">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                        <span className="text-indigo-500 mr-4 font-bold select-none mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
