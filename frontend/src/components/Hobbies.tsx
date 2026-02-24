import { motion } from 'framer-motion';
import { Camera, Mountain, Book, Music, Gamepad, Coffee } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Helper component for Hobby Icons
const HobbyIcon = ({ name, className = "" }: { name: string, className?: string }) => {
  switch (name.toLowerCase()) {
    case 'camera': return <Camera className={className} />;
    case 'mountain': return <Mountain className={className} />;
    case 'book': return <Book className={className} />;
    case 'music': return <Music className={className} />;
    case 'gamepad': return <Gamepad className={className} />;
    case 'coffee': return <Coffee className={className} />;
    default: return <Coffee className={className} />; // Fallback
  }
};

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            Beyond the Code
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            My Hobbies
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto xl:max-w-5xl">
          {portfolioData.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl text-center hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all group hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <HobbyIcon name={hobby.icon} className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {hobby.name}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
