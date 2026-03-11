import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = [
  { id: '/', label: 'Intro', hash: 'home' },
  { id: '/about', label: 'Origin', hash: 'about' },
  { id: '/skills', label: 'Arsenal', hash: 'skills' },
  { id: '/experience', label: 'Battles', hash: 'experience' },
  { id: '/projects', label: 'Builds', hash: 'projects' },
  { id: '/contact', label: 'Contact', hash: 'contact' },
];

export function ProgressIndicator() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);

  useEffect(() => {
    // If not on the main scrollable page, fallback to route-based active state
    if (location.pathname !== '/') {
      setActiveSection(location.pathname);
      return;
    }

    const handleScroll = () => {
      let currentId = '/';

      // Determine which section is currently active based on scroll position
      for (const section of sections) {
        const el = document.getElementById(section.hash);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is less than 50% of viewport height (meaning it's well into view)
          if (rect.top <= window.innerHeight / 2) {
            currentId = section.id;
          }
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-end pointer-events-none">
      {sections.map(({ id, label, hash }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="flex items-center gap-3 group relative pointer-events-auto">
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500 group-hover:opacity-100 group-hover:text-slate-400'
                }`}
            >
              {label}
            </motion.span>
            <Link
              to={id}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative flex items-center justify-center w-6 h-6 outline-none"
              aria-label={`Go to ${label}`}
            >
              <motion.div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 dark:bg-cyan-400 dark:shadow-[0_0_12px_rgba(34,211,238,0.8)] shadow-[0_0_12px_rgba(99,102,241,0.8)] scale-150' : 'bg-slate-400/50 group-hover:bg-slate-500'
                  }`}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
