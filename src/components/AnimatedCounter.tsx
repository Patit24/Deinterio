import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string | number; // e.g. "28+", "150+", "98%", "500+"
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState('0');

  // Parse prefix, number, and suffix (e.g., "150+" -> num: 150, suffix: "+")
  const valueStr = String(value);
  const match = valueStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);

  const prefix = match ? match[1] : '';
  const targetNum = match ? parseFloat(match[2].replace(/,/g, '')) : 0;
  const suffix = match ? match[3] : '';

  useEffect(() => {
    if (!isInView || isNaN(targetNum)) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function: easeOutExpo for dramatic slowdown at the end
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * targetNum);

      setDisplayValue(current.toLocaleString('en-US'));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNum.toLocaleString('en-US'));
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNum, duration]);

  if (isNaN(targetNum)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
