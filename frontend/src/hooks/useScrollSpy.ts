import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const id of [...ids].reverse()) {
        const element = document.getElementById(id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          // Add window.scrollY to get absolute position relative to document
          const absoluteTop = top + window.scrollY;
          if (scrollPosition >= absoluteTop - 100) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
