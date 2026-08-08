import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Contact HQ & Studio Visit"
        description="Visit our North Kolkata design studio, get instant Google GPS directions, or book a 1-on-1 discovery consultation with our Lead Architect."
      />

      <Breadcrumbs
        items={[{ label: 'Contact' }]}
        categoryBadge="STUDIO HQ & DIRECT INQUIRY"
        title="Contact Deinterio HQ & Schedule Studio Visit"
        subtitle="Visit our 3,500 sq.ft North Kolkata design studio & tactile material vault, talk directly with our lead architects, or submit a project inquiry."
      />

      {/* Embedded Contact Component */}
      <ContactSection />
    </>
  );
};
