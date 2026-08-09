import { useState, useEffect } from 'react';

export function useResponsiveMotion() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', checkViewport);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  const shouldDisableScrollMotion = isMobile || prefersReducedMotion;

  return {
    isMobile,
    prefersReducedMotion,
    shouldDisableScrollMotion,
    initialState: shouldDisableScrollMotion ? 'visible' : 'hidden',
    whileInViewProp: shouldDisableScrollMotion ? undefined : 'visible',
    animateProp: shouldDisableScrollMotion ? 'visible' : undefined,
    viewportConfig: shouldDisableScrollMotion ? undefined : { once: true, margin: '-50px' },
  };
}
