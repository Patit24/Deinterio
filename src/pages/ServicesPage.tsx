import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TechStackSection } from '../components/TechStackSection';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { dataStore } from '../services/dataStore';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const servicesList = dataStore.getServices();

  return (
    <>
      <SEOHead
        title="Architectural Services & Spatial Tech"
        description="Explore Deinterio's architectural services including turnkey luxury interiors, German modular kitchens, master suites, and IoT smart home automation."
      />

      <Breadcrumbs
        items={[{ label: 'Services' }]}
        categoryBadge="ARCHITECTURAL SERVICES DIRECTORY"
        title="Bespoke Architectural Services & Innovations"
        subtitle="Every service is backed by 100% material transparency, 0.5mm German joinery tolerances, penalty-backed delivery timelines, and digital 10-year warranty protection."
      />

      {/* Services Grid Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#E2DDD6] overflow-hidden shadow-xs hover-lift transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-60 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#13362B]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#C8AA7A] uppercase tracking-wider font-bold">
                    {service.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl font-normal text-[#1A1917] group-hover:text-[#13362B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                    {service.tagline}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E2DDD6]/60">
                    <span className="text-[11px] font-mono font-bold text-[#8C6D3B] uppercase tracking-wider block">
                      Core Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[#1A1917]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#13362B] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`#/services/${service.id}`}
                  className="w-full py-3.5 rounded-xl bg-[#FAF8F4] hover:bg-[#13362B] text-[#13362B] hover:text-white border border-[#D4C3A3] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Explore Service Blueprint</span>
                  <ArrowRight className="w-4 h-4 text-[#A88B57] group-hover/btn:text-[#C8AA7A] group-hover/btn:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proprietary Tech & Spatial Computing */}
      <TechStackSection />

      {/* Services FAQ Accordion */}
      <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F4] border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
            <Sliders className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>SERVICES FAQ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
            Frequently Asked <span className="italic text-gold-gradient">Service Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Do you offer individual room or kitchen design, or only full turnkey homes?',
              a: 'While we specialize in full turnkey residential interiors, we also execute standalone modular kitchen transformations, master suites, and commercial café projects with minimum project values of ₹8 Lakhs.',
            },
            {
              q: 'How does Deinterio guarantee 100% material authenticity?',
              a: 'All marine plywood dispatches come with CenturyPly Club Prime hologram verification tags and digital batch codes. Hettich hardware features original laser engraving and direct 10-year manufacturer warranty certificates.',
            },
            {
              q: 'What happens if project handover is delayed beyond the agreed timeline?',
              a: 'Our contracts include a legally binding 0.5% per week penalty clause. If handover is delayed due to Deinterio execution, we credit penalty refunds directly to your final milestone payment.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E2DDD6] space-y-2">
              <h3 className="font-serif text-lg font-medium text-[#1A1917]">{faq.q}</h3>
              <p className="text-xs text-[#5A5852] font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal">
            Need a Custom Architectural <span className="italic text-[#C8AA7A]">Service Blueprint</span>?
          </h2>
          <p className="text-sm text-[#D4C3A3] font-light">
            Book a 1-on-1 discovery consultation with our Principal Architect to review your floorplan.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Schedule Free Floorplan Review
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
