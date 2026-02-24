export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <p className="text-stone-500 dark:text-stone-400 text-xs font-mono uppercase tracking-widest">
        © {currentYear} Aman V. The Origin Story. Built with React & Tailwind CSS.
      </p>
    </footer>
  );
}
