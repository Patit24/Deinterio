import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ComparisonTable } from '../components/ComparisonTable';
import { AwardsShowcase } from '../components/AwardsShowcase';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { TechStackSection } from '../components/TechStackSection';
import { Portfolio } from '../components/Portfolio';
import { ProjectsTrackerSection } from '../components/ProjectsTrackerSection';
import { HorizontalTimeline } from '../components/HorizontalTimeline';
import { MaterialsLibrary } from '../components/MaterialsLibrary';
import { AICostCalculator } from '../components/AICostCalculator';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenDashboard,
}) => {
  return (
    <>
      <SEOHead
        title="Luxury Home Experience Platform"
        description="Designing Kolkata's finest interiors with complete material transparency, live PM project tracking, and guaranteed craftsmanship."
      />

      {/* 1. Hero Presentation Section */}
      <Hero
        onOpenBooking={onOpenBooking}
        onExplorePortfolio={() => { window.location.hash = '#/projects'; }}
        onOpenCalculator={() => { window.location.hash = '#/calculator'; }}
      />

      {/* 2. Deinterio Advantage Comparison Table (Why Homeowners Switch To Deinterio) */}
      <ComparisonTable />

      {/* 3. Featured Services Teaser */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#1A1917]/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F4] border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>ARCHITECTURAL VERTICALS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917] mt-2">
              Featured <span className="italic text-gold-gradient">Design Services</span>
            </h2>
          </div>
          <a
            href="#/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#13362B] uppercase tracking-wider hover:underline"
          >
            <span>Explore All 6 Services</span>
            <ArrowRight className="w-4 h-4 text-[#A88B57]" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'modular-kitchens',
              title: 'German Modular Kitchens',
              desc: 'High-gloss acrylic cabinetry, Hafele soft-close hardware, and quartz island counters engineered for Indian cooking.',
              image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
              tag: 'Kitchen Architecture',
            },
            {
              id: 'interior-architecture',
              title: 'Full Turnkey Villa Interior',
              desc: 'Complete architectural transformation from 3D laser spatial scan to Italian marble walls, teak fluting, and ceiling slots.',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
              tag: 'Complete Residence',
            },
            {
              id: 'smart-automation',
              title: 'Sub-Zero IoT Automation',
              desc: 'Sub-Zero IoT smart lighting control, motorized curtains, climate zone tuning, and live mobile PM project telemetry.',
              image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
              tag: 'Smart Spatial Tech',
            },
          ].map((srv) => (
            <a
              key={srv.id}
              href={`#/services/${srv.id}`}
              className="group rounded-3xl bg-white border border-[#E2DDD6] overflow-hidden hover-lift shadow-xs transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#13362B] uppercase tracking-wider">
                  {srv.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1917] group-hover:text-[#13362B] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#5A5852] font-light mt-2 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#8C6D3B] group-hover:text-[#13362B]">
                  <span>View Dedicated Service Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Featured Masterpiece Portfolio */}
      <Portfolio />

      {/* 5. Live Projects Tracker */}
      <ProjectsTrackerSection
        onOpenDashboard={onOpenDashboard}
        onOpenBooking={onOpenBooking}
      />

      {/* 6. Process Timeline Preview */}
      <HorizontalTimeline />

      {/* 7. Materials Vault & Swatches */}
      <MaterialsLibrary />

      {/* 8. International Honors & Awards */}
      <AwardsShowcase />

      {/* 9. Client Video Reviews */}
      <VideoTestimonials />

      {/* 10. AI Cost Estimator */}
      <AICostCalculator onOpenBooking={onOpenBooking} />

      {/* 11. Contact & HQ Map */}
      <ContactSection />
    </>
  );
};
