import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WaterWaveTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  as?: any;
}

/**
 * WaterWaveText Wrapper Component
 * Wraps text elements with cursor-reactive liquid wave distortion and ambient specular shimmer.
 */
export const WaterWaveText: React.FC<WaterWaveTextProps> = ({
  children,
  className = '',
  intensity = 1,
  as: Component = 'span',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 6 * intensity, y: y * 4 * intensity });
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseOffset({ x: 0, y: 0 });
      }}
      data-water-wave="true"
      className={`relative inline-block transition-transform duration-300 ease-out cursor-default ${className}`}
      style={{
        transform: isHovered
          ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) rotate(${mouseOffset.x * 0.4}deg)`
          : 'translate3d(0,0,0) rotate(0deg)',
      }}
    >
      {children}
      {/* Liquid Refraction Specular Shimmer */}
      {isHovered && (
        <motion.span
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 mix-blend-overlay"
        />
      )}
    </Component>
  );
};
