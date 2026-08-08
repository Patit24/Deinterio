import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, ArrowRight, ShieldCheck, Wrench, Layers, Award, Sparkles } from 'lucide-react';
import { dataStore } from '../services/dataStore';

interface ServiceDetailPageProps {
  slug?: string;
  onOpenBooking: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug = 'modular-kitchens',
  onOpenBooking,
}) => {
  const servicesList = dataStore.getServices();
  const service = servicesList.find((s) => s.id === slug) || servicesList[1] || servicesList[0];

  const problemText = service.problem || 'Traditional interior contractors suffer from material substitution, unorganized storage, and unverified fittings.';
  const solutionText = service.solution || 'Deinterio features 100% CenturyPly Club Prime BWP Marine Plywood, 0.5mm PUR edge-banding, and Hafele German hardware.';
  const materialsList = service.materials || ['CenturyPly Club Prime BWP Plywood', 'Hafele Soft-Close Hinges', 'Quartz Countertop'];
  const processList = service.process || ['3D Spatial Scan', 'Factory CNC Woodworking', 'Sub-Zero IoT Telemetry Dispatch', 'On-Site Installation', '45-Point Audit'];

  return (
    <>
      <SEOHead
        title={service.title}
        description={service.tagline}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '#/services' },
          { label: service.title },
        ]}
        categoryBadge={service.category}
        title={service.title}
        subtitle={service.tagline}
      />

      {/* Hero Visual Section */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[420px] relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
            <div className="text-white space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-widest block">
                GUARANTEED BLUEPRINT • 10-YEAR WARRANTY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal">{service.title}</h2>
              <p className="text-xs sm:text-sm text-gray-200 font-light">{service.highlights}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#FFF5F5] border border-red-200 space-y-4">
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block">
              THE TRADITIONAL INDUSTRY PROBLEM
            </span>
            <h3 className="font-serif text-2xl font-normal text-red-950">Why Most Interiors Fail</h3>
            <p className="text-sm text-red-900/80 font-light leading-relaxed">
              {problemText}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F0F7F4] border border-[#13362B]/20 space-y-4">
            <span className="text-xs font-mono font-bold text-[#13362B] uppercase tracking-widest block">
              THE DEINTERIO ARCHITECTURAL SOLUTION
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#13362B]">Engineered Precision</h3>
            <p className="text-sm text-[#13362B]/80 font-light leading-relaxed">
              {solutionText}
            </p>
          </div>
        </div>
      </section>

      {/* Compatible Materials & Hardware Specs */}
      <section className="py-16 px-4 sm:px-8 bg-[#F4EFDF] border-y border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-widest block">
              SPECIFICATIONS & HARDWARE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
              Certified <span className="italic text-gold-gradient">Material Standards</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsList.map((mat: string, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E2DDD6] flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#13362B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#1A1917]">{mat}</h4>
                  <span className="text-[11px] font-mono text-[#8C6D3B]">100% Hologram Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Booking Call to Action */}
      <section className="py-16 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal">
            Get an Itemized BOQ for <span className="italic text-[#C8AA7A]">{service.title}</span>
          </h2>
          <p className="text-sm text-[#D4C3A3] font-light">
            Book a discovery call to receive a transparent price breakdown and 3D spatial layout preview.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Request Service BOQ
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
