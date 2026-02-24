import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-50 ${
          isHovering ? 'scale-150 bg-indigo-500/20' : 'scale-100'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
