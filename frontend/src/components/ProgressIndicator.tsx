import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  { id: '/', label: 'Intro' },
  { id: '/about', label: 'Origin' },
  { id: '/skills', label: 'Arsenal' },
  { id: '/experience', label: 'Battles' },
  { id: '/projects', label: 'Builds' },
  { id: '/contact', label: 'Contact' },
];

export function ProgressIndicator() {
  const location = useLocation();
  const activeSection = location.pathname;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-end pointer-events-none">
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="flex items-center gap-3 group relative pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 group-hover:opacity-100 group-hover:text-slate-400'
              }`}
            >
              {label}
            </motion.span>
            <Link 
              to={id}
              className="relative flex items-center justify-center w-6 h-6 outline-none"
              aria-label={`Go to ${label}`}
            >
               <motion.div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)] scale-150' : 'bg-slate-400/50 group-hover:bg-slate-500'
                }`}
               />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
