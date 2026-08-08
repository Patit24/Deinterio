import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SEOHead } from '../components/SEOHead';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Clock, Layers, Award } from 'lucide-react';
import { dataStore } from '../services/dataStore';

interface ProjectDetailPageProps {
  slug?: string;
  onOpenBooking: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug = 'ballygunge-villa',
  onOpenBooking,
}) => {
  const caseStudies = dataStore.getProjects();
  const project = caseStudies.find((p) => p.id === slug) || caseStudies[0];

  return (
    <>
      <SEOHead
        title={`${project.title} — Case Study`}
        description={`Architectural case study of ${project.title} in ${project.location}. Budget: ${project.budget}, Area: ${project.area}, Timeline: ${project.timeline}.`}
      />

      <Breadcrumbs
        items={[
          { label: 'Projects', href: '#/projects' },
          { label: project.title },
        ]}
        categoryBadge={project.badge}
        title={project.title}
        subtitle={`${project.location} • Total Investment: ${project.budget} • Execution Timeline: ${project.timeline}`}
      />

      {/* Hero Visual Preview */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[480px] relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            <div className="text-white space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#C8AA7A]">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">{project.category}</span>
                <span>Area: {project.area}</span>
                <span>Timeline: {project.timeline}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal">{project.title}</h2>
              <p className="text-xs sm:text-sm text-gray-200 font-light max-w-2xl">{project.story}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge vs Strategy Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-[#FFF5F5] border border-red-200 space-y-4">
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block">
            THE ARCHITECTURAL CHALLENGE
          </span>
          <h3 className="font-serif text-2xl font-normal text-red-950">Site & Spatial Constraints</h3>
          <p className="text-sm text-red-900/80 font-light leading-relaxed">
            The client required a complete structural interior modernization of a property without altering load-bearing masonry. Moisture seepage in outer walls and uneven ceiling heights required customized framing and waterproofing.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#F0F7F4] border border-[#13362B]/20 space-y-4">
          <span className="text-xs font-mono font-bold text-[#13362B] uppercase tracking-widest block">
            DEINTERIO EXECUTION STRATEGY
          </span>
          <h3 className="font-serif text-2xl font-normal text-[#13362B]">Sanctuary Engineering</h3>
          <p className="text-sm text-[#13362B]/80 font-light leading-relaxed">
            We deployed 3D laser scanners to create a sub-millimeter BIM model. Moisture barriers were applied using Sika chemical injection. All cabinetry was pre-manufactured at our Rajarhat German facility and assembled on-site.
          </p>
        </div>
      </section>

      {/* Before / After Transformation Slider */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-widest block">
            BEFORE & AFTER SLIDER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
            Drag to Reveal <span className="italic text-gold-gradient">Transformation</span>
          </h2>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <BeforeAfterSlider
            beforeImage={project.beforeImg}
            afterImage={project.afterImg}
          />
        </div>
      </section>

      {/* Specifications & Materials Breakdown */}
      <section className="py-16 px-4 sm:px-8 bg-[#F4EFDF] border-y border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-widest block">
              ITEMIZED BOQ SPECIFICATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
              Materials & Hardware <span className="italic text-gold-gradient">Used</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.materials.map((mat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E2DDD6] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#A88B57] block">SPEC 0{idx + 1}</span>
                <h4 className="font-serif text-lg font-medium text-[#1A1917]">{mat}</h4>
                <p className="text-xs text-[#6B6560] font-light">
                  Direct factory dispatch with QR barcode warranty tracking.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Call to Action */}
      <section className="py-16 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal">
            Want a Similar Transformation for <span className="italic text-[#C8AA7A]">Your Residence</span>?
          </h2>
          <p className="text-sm text-[#D4C3A3] font-light">
            Book a 1-on-1 consultation with our Lead Architect to discuss your floorplan and budget.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Book Free Site Consultation
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
