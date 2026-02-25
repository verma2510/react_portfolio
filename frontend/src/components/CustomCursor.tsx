import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Use requestAnimationFrame for smooth and highly performant light tracking
      animationFrameId = requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.style.setProperty('--x', `${clientX}px`);
          overlayRef.current.style.setProperty('--y', `${clientY}px`);
        }
        
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Torch Light Effect */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--x, -1000px) var(--y, -1000px), var(--torch-color, rgba(255,255,255,0.06)), transparent 40%)`,
        }}
      />
      
      {/* Subtle cursor dot */}
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-3 w-3 rounded-full border border-indigo-400/50 bg-indigo-500/20 backdrop-blur-[2px] shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(-1000px, -1000px, 0)`,
        }}
      />
    </>
  );
}
