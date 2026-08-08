import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Single unified cursor container reference
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Move unified cursor container immediately to exact mouse coordinates
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;

      // Check for custom text badge or interactive hover state
      const dataEl = target?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveEl = target?.closest('button, a, input, select, textarea, [role="button"]') as HTMLElement | null;

      if (dataEl) {
        setCursorText(dataEl.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else if (interactiveEl) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onDown = () => setIsClicked(true);
    const onUp = () => setIsClicked(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none" style={{ cursor: 'none' }}>
      {/* UNIFIED CURSOR CONTAINER — Keeps Dot & Circle 100% Locked Together at Exact Mouse Pointer */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
          willChange: 'transform',
        }}
      >
        {/* Precision Center Dot */}
        <div className="w-2 h-2 rounded-full bg-[#1A1917] absolute z-10 shadow-sm" />

        {/* Outer Ring Centered Perfectly Around the Dot */}
        <div
          className="w-10 h-10 rounded-full border border-[#A88B57] flex items-center justify-center backdrop-blur-[1px] relative transition-all duration-200 ease-out"
          style={{
            transform: `scale(${isClicked ? 0.75 : isHovered ? (cursorText ? 1.7 : 1.3) : 1})`,
            borderColor: isHovered ? '#A88B57' : 'rgba(168, 139, 87, 0.45)',
            backgroundColor: isHovered ? 'rgba(168, 139, 87, 0.1)' : 'transparent',
          }}
        >
          {cursorText && (
            <span className="text-[7px] font-mono font-bold tracking-widest text-[#1A1917] uppercase bg-white/95 border border-[#1A1917]/10 rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm absolute">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
