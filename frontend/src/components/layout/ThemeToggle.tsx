import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../providers/ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <Sun size={16} className={`absolute transition-all duration-500 ease-out-expo ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
      <Moon size={16} className={`absolute transition-all duration-500 ease-out-expo ${theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} />
    </button>
  );
}
