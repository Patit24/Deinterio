import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Portfolio } from '../components/Portfolio';
import { ProjectsTrackerSection } from '../components/ProjectsTrackerSection';
import { SEOHead } from '../components/SEOHead';
import { MapPin, ArrowRight, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { dataStore } from '../services/dataStore';

interface ProjectsPageProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenBooking,
  onOpenDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const caseStudies = dataStore.getProjects();

  const filteredProjects = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <>
      <SEOHead
        title="Featured Projects & Live Project Tracker"
        description="Explore Deinterio's luxury 4BHK penthouses, heritage villas, commercial spaces, and inspect live ongoing project milestones across Kolkata."
      />

      <Breadcrumbs
        items={[{ label: 'Projects & Live Show' }]}
        categoryBadge="CURATED PORTFOLIO & LIVE TRACKER"
        title="Curated Masterpieces & Kolkata Live Project Show"
        subtitle="Explore delivered luxury residences across Ballygunge, Alipore, New Town, and Rajarhat. Every case study contains complete BOQ specs, before/after transformations, and verified client ratings."
      />

      {/* Filter Controls & Case Studies Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-[#A88B57]" />
            <span>FILTER BY PROPERTY TYPE:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Villa', 'Penthouse', 'Duplex', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#13362B] text-white shadow-md'
                    : 'bg-white text-[#6B6560] border border-[#E2DDD6] hover:border-[#A88B57]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-[#E2DDD6] overflow-hidden shadow-xs hover-lift transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-72 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#13362B]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-mono text-[#C8AA7A] uppercase tracking-wider font-bold">
                    {project.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[#13362B]">
                    {project.budget}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#8C6D3B] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                    <span className="text-xs font-mono text-[#A88B57] font-bold">{project.timeline}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#1A1917] group-hover:text-[#13362B] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                    {project.story}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.materials.map((mat, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#6B6560]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`#/projects/${project.id}`}
                  className="w-full py-3.5 rounded-xl bg-[#FAF8F4] hover:bg-[#13362B] text-[#13362B] hover:text-white border border-[#D4C3A3] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Open Dedicated Case Study</span>
                  <ArrowRight className="w-4 h-4 text-[#A88B57] group-hover/btn:text-[#C8AA7A] group-hover/btn:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pinpinned Masterpieces Portfolio */}
      <Portfolio />

      {/* Kolkata Live Projects Tracker Map */}
      <ProjectsTrackerSection
        onOpenDashboard={onOpenDashboard}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};
