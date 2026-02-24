import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-100 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            Things I've Built
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Featured Projects
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => {
            const isWide = index === 0 || index === 3;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group glass-panel rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 ${isWide ? 'lg:col-span-2' : 'lg:col-span-1'}`}
            >
              <div className="p-8 flex-1 flex flex-col h-full relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Github size={120} className="text-indigo-500 -mt-10 -mr-10" />
                </div>
                
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">
                  {project.name}
                </h4>
                
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2 text-xs uppercase tracking-wider relative z-10">
                  The Problem:
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium italic text-sm opacity-90 relative z-10">
                  "{project.problemId}"
                </p>

                <p className="text-slate-800 dark:text-slate-200 mb-8 font-normal flex-1 leading-relaxed border-l-2 border-indigo-500 pl-4 relative z-10">
                  {project.outcome}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-300 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 relative z-10">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-500/20"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors"
                    >
                      <Github size={16} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
