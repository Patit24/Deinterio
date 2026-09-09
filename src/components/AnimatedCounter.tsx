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

  const valueStr = String(value).trim();
  // Support prefixes, numbers with optional decimals (e.g. 4.9), and any trailing suffix (e.g. "★", "/5", "+")
  const match = valueStr.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);

  const prefix = match ? match[1] : '';
  const targetNum = match ? parseFloat(match[2].replace(/,/g, '')) : NaN;
  const suffix = match ? match[3] : '';
  const hasDecimal = match ? match[2].includes('.') : false;
  const decimalPlaces = hasDecimal ? (match![2].split('.')[1]?.length || 1) : 0;

  useEffect(() => {
    if (!isInView || isNaN(targetNum)) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function: easeOutExpo for dramatic slowdown at the end
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easedProgress * targetNum;

      setDisplayValue(hasDecimal ? current.toFixed(decimalPlaces) : Math.floor(current).toLocaleString('en-US'));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(hasDecimal ? targetNum.toFixed(decimalPlaces) : targetNum.toLocaleString('en-US'));
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNum, duration, hasDecimal, decimalPlaces]);

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
