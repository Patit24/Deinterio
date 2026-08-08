import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
          
          {/* Vertical Blind Shutter Layer (5 Columns) */}
          <div className="absolute inset-0 flex w-full h-full">
            {[0, 1, 2, 3, 4].map((colIndex) => (
              <motion.div
                key={colIndex}
                className="flex-1 h-full bg-[#111111] border-r border-white/5"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: isDone ? 0 : 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1],
                  delay: isDone ? colIndex * 0.08 : 0,
                }}
                style={{ transformOrigin: colIndex % 2 === 0 ? 'top' : 'bottom' }}
              />
            ))}
          </div>

          {/* Center Counter & Brand Logo */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: isDone ? 0 : 1, scale: isDone ? 0.9 : 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center justify-center text-white"
          >
            {/* Logo image */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Deinterio"
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="font-serif text-3xl font-medium tracking-wider mb-2 text-[#F4EBDE]">
              DENTORIO
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-6">
              KOLKATA • ARCHITECTURAL INTERIORS
            </div>

            {/* Counter percentage */}
            <div className="font-mono text-4xl font-light text-white tracking-widest">
              {progress}<span className="text-xs text-[#D4AF37]">%</span>
            </div>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-white/10 mt-4 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B59258] via-[#D4AF37] to-[#B59258]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
