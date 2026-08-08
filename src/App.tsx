import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Router } from './router/Router';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { WaterWaveEffect } from './components/WaterWaveEffect';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Modals
import { ConsultationBooking } from './components/ConsultationBooking';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminPortal } from './components/AdminPortal';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Global Ripple Effect on Click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('button, a, .btn-ripple') as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'ripple 600ms linear';
      circle.style.backgroundColor = 'rgba(212, 175, 55, 0.35)';
      circle.style.pointerEvents = 'none';
      circle.style.zIndex = '99';

      const style = document.createElement('style');
      style.innerHTML = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
      document.head.appendChild(style);

      target.style.position = target.style.position || 'relative';
      target.style.overflow = 'hidden';
      target.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F8F3] text-[#1A1917] selection:bg-[#A88B57]/20 selection:text-[#1A1917] overflow-x-clip font-sans">
      
      {/* 1. Preloader Blind Shutter Animation */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3. Custom Cursor & High-Visibility Water Wave Effect */}
      <CustomCursor />
      <WaterWaveEffect />

      {/* 4. Multi-Page Navigation Header */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 5. Main Content Route Container */}
      <main className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Router
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
        />
      </main>

      {/* 6. Global Multi-Page Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Portals */}
      <ConsultationBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <ClientDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}

export default App;
