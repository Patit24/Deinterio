import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HorizontalTimeline } from '../components/HorizontalTimeline';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, ShieldCheck, Clock, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface ProcessPageProps {
  onOpenBooking: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Lifestyle Discovery & Studio Consultation',
      desc: 'We map your family routine, aesthetic preferences, Vastu requirements, storage needs, and target budget during an initial 1-on-1 session.',
      deliverable: 'Lifestyle Brief & Conceptual Zoning Layout',
      duration: '1–2 Days',
    },
    {
      num: '02',
      title: '3D Laser Spatial Scan & Structural Audit',
      desc: 'Our engineers conduct millimeter-accurate 3D laser scans of your home to inspect load-bearing walls, electrical conduits, and plumbing slots.',
      deliverable: 'Sub-Millimeter Architectural CAD Drawing',
      duration: '2 Days',
    },
    {
      num: '03',
      title: 'Material Moodboard & Tactile Selection',
      desc: 'Visit our North Kolkata studio vault to inspect CenturyPly marine plywood samples, Hettich soft-close hardware, Italian marble slabs, and laminates.',
      deliverable: 'Approved Tactile Material Spec Board',
      duration: '3–5 Days',
    },
    {
      num: '04',
      title: '4K VR Spatial Walkthrough & Itemized BOQ',
      desc: 'Walk through your future home in 4K VR. Every item is locked in a fixed, itemized BOQ contract backed by our zero-cost-surprise guarantee.',
      deliverable: 'Fixed Contract & VR Render Deck',
      duration: '3 Days',
    },
    {
      num: '05',
      title: 'German Factory Woodworking & Joinery',
      desc: 'All modular kitchen cabinets, wardrobes, and panelling are CNC-machined at our 14,000 sq.ft Rajarhat facility with 0.5mm edge-banding tolerances.',
      deliverable: 'Hologram Barcoded Cabinet Modules',
      duration: '14–21 Days',
    },
    {
      num: '06',
      title: 'On-Site Precision Assembly & IoT Cabling',
      desc: 'Factory modules arrive in sealed crates. Our certified carpenters install joinery while electrical engineers configure hardwired Sub-Zero IoT sensors.',
      deliverable: 'Clean Dustless On-Site Execution',
      duration: '14–21 Days',
    },
    {
      num: '07',
      title: '45-Point Quality Inspection & Water Audit',
      desc: 'Our independent QA inspector conducts 45 rigorous checks: drawer load tests, plumbing pressure audits, hinge alignments, and paint finish checks.',
      deliverable: 'Signed QA Audit Certificate',
      duration: '2 Days',
    },
    {
      num: '08',
      title: 'Key Handover & 10-Year Digital Warranty Activation',
      desc: 'We perform deep cleaning, present your keys in a luxury velvet box, and activate your digital 10-year warranty portal.',
      deliverable: 'Digital Warranty Certificate & Maintenance Kit',
      duration: 'Day 45 Handover',
    },
  ];

  return (
    <>
      <SEOHead
        title="Our 8-Step Turnkey Execution Process"
        description="From discovery consultation and 3D laser scan to German woodworking, 45-point QA audit, and 10-year warranty handover."
      />

      <Breadcrumbs
        items={[{ label: 'Process' }]}
        categoryBadge="TURNKEY METHODOLOGY ROADMAP"
        title="Our 8-Step Customer Journey & Execution Process"
        subtitle="We eliminated the guesswork from home interiors. Every phase is backed by dedicated project managers, live mobile telemetry app updates, and penalty-backed timelines."
      />

      {/* Horizontal Interactive Timeline Component */}
      <HorizontalTimeline />

      {/* Detailed Step-by-Step Cards */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F4] border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
            <Layers className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>THE 8-PHASE DEINTERIO GUARANTEE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1917]">
            Complete Execution <span className="italic text-gold-gradient">Breakdown</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-[#E2DDD6] shadow-xs space-y-4 relative hover-lift transition-all">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#A88B57] bg-[#FAF8F4] px-3 py-1 rounded-full border border-[#D4C3A3]">
                  PHASE {step.num}
                </span>
                <span className="text-xs font-mono font-bold text-[#13362B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#A88B57]" />
                  {step.duration}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-[#1A1917]">{step.title}</h3>
              <p className="text-xs text-[#5A5852] font-light leading-relaxed">{step.desc}</p>

              <div className="pt-3 border-t border-[#E2DDD6]/60 flex items-center gap-2 text-xs font-mono text-[#8C6D3B]">
                <CheckCircle2 className="w-4 h-4 text-[#13362B]" />
                <span>Deliverable: <strong>{step.deliverable}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal">
            Ready to Begin Phase 01 <span className="italic text-[#C8AA7A]">Discovery</span>?
          </h2>
          <p className="text-sm text-[#D4C3A3] font-light">
            Book your free discovery consultation today with our Principal Architect.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Start Phase 01 Consultation
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
