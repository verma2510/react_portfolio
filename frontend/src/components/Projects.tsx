import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useState } from 'react';

// Extract unique categories for filter tabs
const categories = ["All", ...Array.from(new Set(portfolioData.projects.map(p => p.category)))];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = portfolioData.projects.filter(project => 
    activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Entrance Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            04 / Projects
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white mb-10">
            Things I've Built.
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category 
                  ? 'bg-indigo-600 dark:bg-cyan-500 text-white shadow-lg shadow-indigo-600/30 dark:shadow-cyan-400/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Forced logic: the first item rendered in the "All" tab or any marked 'featured' can expand natively
              const isFeatured = project.featured && activeCategory === "All";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  key={project.title}
                  className={`group relative perspective-1000 ${isFeatured ? 'lg:col-span-2' : 'col-span-1'}`}
                >
                  {/* Card Container with Hover Tilt Effect */}
                  <div className="glass-panel h-full rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:rotate-y-1 group-hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] dark:group-hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] flex flex-col">
                    
                    {/* Image Preview Block */}
                    <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-64 md:h-80' : 'h-48 md:h-56'} bg-slate-200 dark:bg-slate-800`}>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Image Overlays */}
                      <div className="absolute inset-0 bg-indigo-900/10 dark:bg-cyan-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      
                      {/* Category Badge on Image */}
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs tracking-wider border border-white/10 uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 bg-white dark:bg-slate-950">
                      
                      <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h4>
                      
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-8 flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.stack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links row */}
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl transition-all"
                          >
                            <Github size={16} />
                            Source
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
