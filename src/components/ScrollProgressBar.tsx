import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[99999] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#A88B57] via-[#D4AF37] to-[#13362B] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
