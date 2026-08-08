import React, { useState, useEffect } from 'react';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { ProcessPage } from '../pages/ProcessPage';
import { MaterialsPage } from '../pages/MaterialsPage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { ContactPage } from '../pages/ContactPage';
import { PricingPage } from '../pages/PricingPage';
import { FAQPage } from '../pages/FAQPage';
import { BlogPage } from '../pages/BlogPage';
import { ArticleDetailPage } from '../pages/ArticleDetailPage';
import { LegalPage } from '../pages/LegalPage';

interface RouterProps {
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
}

export const Router: React.FC<RouterProps> = ({ onOpenBooking, onOpenDashboard }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  const handleOpenDashboard = onOpenDashboard || (() => {});

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parse hash route e.g., "#/services/modular-kitchens"
  const cleanPath = currentPath.replace(/^#/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);
  const route = segments[0] || '';
  const param = segments[1] || '';

  switch (route) {
    case '':
    case 'home':
      return <HomePage onOpenBooking={onOpenBooking} onOpenDashboard={handleOpenDashboard} />;

    case 'about':
      return <AboutPage onOpenBooking={onOpenBooking} />;

    case 'services':
      if (param) {
        return <ServiceDetailPage slug={param} onOpenBooking={onOpenBooking} />;
      }
      return <ServicesPage onOpenBooking={onOpenBooking} />;

    case 'projects':
      if (param) {
        return <ProjectDetailPage slug={param} onOpenBooking={onOpenBooking} />;
      }
      return <ProjectsPage onOpenBooking={onOpenBooking} onOpenDashboard={handleOpenDashboard} />;

    case 'process':
      return <ProcessPage onOpenBooking={onOpenBooking} />;

    case 'materials':
      return <MaterialsPage onOpenBooking={onOpenBooking} />;

    case 'calculator':
      return <CalculatorPage onOpenBooking={onOpenBooking} />;

    case 'contact':
      return <ContactPage />;

    case 'pricing':
      return <PricingPage onOpenBooking={onOpenBooking} />;

    case 'faq':
      return <FAQPage onOpenBooking={onOpenBooking} />;

    case 'blog':
      if (param) {
        return <ArticleDetailPage slug={param} onOpenBooking={onOpenBooking} />;
      }
      return <BlogPage onOpenBooking={onOpenBooking} />;

    case 'privacy':
      return <LegalPage type="privacy" />;

    case 'terms':
      return <LegalPage type="terms" />;

    default:
      return <HomePage onOpenBooking={onOpenBooking} onOpenDashboard={handleOpenDashboard} />;
  }
};
