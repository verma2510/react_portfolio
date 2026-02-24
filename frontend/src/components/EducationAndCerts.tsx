import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Helper component to map icon names to actual Lucide components
const IconBadge = ({ type, className = "" }: { type: string, className?: string }) => {
  switch (type.toLowerCase()) {
    case 'award': return <Award className={className} />;
    case 'bookopen': return <BookOpen className={className} />;
    default: return <Award className={className} />;
  }
};

export function EducationAndCerts() {
  return (
    <section id="education" className="py-24 relative bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            The Foundation
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Education & Certifications
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h4 className="flex items-center gap-3 text-2xl font-semibold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <GraduationCap className="text-indigo-500" />
              Education
            </h4>
            <div className="space-y-6">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-2xl border-l-4 border-l-indigo-500 hover:-translate-y-1 transition-transform"
                >
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {edu.degree}
                  </h5>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                      {edu.institution}
                    </span>
                    <span className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-xs font-semibold">
                      {edu.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="flex items-center gap-3 text-2xl font-semibold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Award className="text-indigo-500" />
              Certifications
            </h4>
            <div className="grid gap-6">
              {portfolioData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 glass-panel p-5 rounded-2xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-colors group"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-600 dark:text-indigo-400">
                    <IconBadge type={cert.icon} />
                  </div>
                  <div>
                    <h5 className="text-md font-bold text-slate-900 dark:text-white leading-tight">
                      {cert.name}
                    </h5>
                    <div className="flex gap-3 text-sm mt-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {cert.issuer}
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        • {cert.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
