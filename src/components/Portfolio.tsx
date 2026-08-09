import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, X, SlidersHorizontal, MapPin, CheckCircle2 } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<any | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Ballygunge Heritage Villa',
      category: 'Villa & Bungalow',
      location: 'Ballygunge Circular Road, South Kolkata',
      budget: '₹48 Lakhs',
      timeline: '16 Weeks',
      area: '5,200 sq.ft',
      rating: '5.0 ★★★★★',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      story: 'A complete architectural interior transformation of an independent South Kolkata bungalow into a modern sanctuary. Features floor-to-ceiling Italian marble wall paneling, fluted teak wood accents, and warm concealed LED ceiling slots.',
      materials: ['CenturyPly Marine Plywood', 'Hettich German Fittings', 'Italian Botticino Marble', 'Saint-Gobain Gypsum'],
      badge: 'Residential Villa • Deinterio Signature',
    },
    {
      id: 2,
      title: 'Uniworld City Sky Penthouse',
      category: '4BHK Penthouse',
      location: 'Action Area III, New Town, Kolkata',
      budget: '₹34 Lakhs',
      timeline: '14 Weeks',
      area: '3,800 sq.ft',
      rating: '5.0 ★★★★★',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      story: 'High-rise luxury penthouse overlooking the New Town skyline. Designed with a custom island modular kitchen, acrylic high-gloss cabinetry, and automated smart lounge lighting.',
      materials: ['Hafele Kitchen Hardware', 'Merino High Gloss Laminate', 'Quartz Countertops', 'Warm 3000K Lighting'],
      badge: '4BHK Penthouse • New Town',
    },
    {
      id: 3,
      title: 'Park Street Luxury Residence',
      category: '3BHK Apartment',
      location: 'Park Street, Central Kolkata',
      budget: '₹26 Lakhs',
      timeline: '12 Weeks',
      area: '2,600 sq.ft',
      rating: '5.0 ★★★★★',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      story: 'Contemporary 3BHK residence combining warm neutral color palettes, plush velvet sofa seating, concealed wardrobe storage, and acoustic ceiling treatment.',
      materials: ['Asian Paints Royale', 'Century Ply 710', 'Hafele Soft Close', 'Upholstered Fabric'],
      badge: '3BHK Turnkey • Central Kolkata',
    },
    {
      id: 4,
      title: 'Salt Lake Corporate Headquarters',
      category: 'Corporate & Bank',
      location: 'Sector V, Salt Lake, Kolkata',
      budget: '₹42 Lakhs',
      timeline: '10 Weeks',
      area: '6,000 sq.ft',
      rating: '5.0 ★★★★★',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      story: 'High-security corporate banking workspace featuring executive glass cabins, acoustic ceiling tiles, modular workstation clusters, and ergonomic seating.',
      materials: ['Toughened Glass Partitions', 'Acoustic Ceiling Tiles', 'Modular Workstations', 'Branded Carpet Tiles'],
      badge: 'Corporate Office • Salt Lake',
    },
    {
      id: 5,
      title: 'Rajarhat Gourmet Café & Lounge',
      category: 'Commercial',
      location: 'Chinar Park, Rajarhat, Kolkata',
      budget: '₹22 Lakhs',
      timeline: '8 Weeks',
      area: '2,400 sq.ft',
      rating: '5.0 ★★★★★',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
      story: 'Bespoke commercial café interior with warm brass ceiling lighting, fluted wooden service bar counter, and customized booth seating.',
      materials: ['Warm Brass Fixtures', 'Fluted Teak Paneling', 'Terrazzo Flooring', 'Custom Upholstery'],
      badge: 'Commercial Café • Rajarhat',
    },
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Map vertical scroll progress of targetRef [0, 1] to horizontal transform
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const totalProjects = filteredProjects.length;
  // Calculate horizontal shift percentage for all cards in sequence
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(totalProjects - 1) * 82}%`]
  );

  return (
    <section id="portfolio" ref={targetRef} className="relative h-[300vh] bg-[#F8F6F0]">
      
      {/* PINNED STICKY CONTAINER (Locks display in place while scrolling vertically) */}
      <div className="sticky top-20 lg:top-24 h-[calc(100vh-90px)] flex flex-col justify-between py-4 px-4 sm:px-8 max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1917]/10 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1A1917]/10 text-[10px] uppercase tracking-[0.2em] text-[#8C6D3B] font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>FEATURED MASTERPIECES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1917] mt-1">
              Featured <span className="italic text-gold-gradient">Masterpieces</span>
            </h2>
          </div>

          {/* Category Filter Pills (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {['All', 'Villa', 'Penthouse', '3BHK', 'Corporate', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#13362B] text-[#C8AA7A] font-bold shadow-md border border-[#C8AA7A]/40'
                    : 'bg-white border border-[#E2DDD6] text-[#1A1917] hover:border-[#13362B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK PINNED TO VIEWPORT */}
        <div className="relative w-full overflow-hidden my-auto py-2">
          <motion.div
            style={{ x }}
            className="flex gap-4 sm:gap-8 items-center"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group/card relative w-[88vw] max-w-4xl h-[400px] sm:h-[480px] shrink-0 rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#1A1917] cursor-pointer shadow-2xl border border-[#1A1917]/20 hover:border-[#A88B57] transition-all duration-500"
                data-cursor="EXPLORE"
              >
                {/* Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover-rotate-img opacity-95 group-hover/card:opacity-100"
                />

                {/* High Contrast Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-10">
                  <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/95 text-[10px] sm:text-xs uppercase font-mono tracking-widest text-[#13362B] font-bold backdrop-blur-md shadow-md max-w-[75%] truncate">
                    {project.badge}
                  </span>

                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md border border-white/50 flex items-center justify-center text-[#1A1917] group-hover/card:scale-110 group-hover/card:bg-[#13362B] group-hover/card:text-[#C8AA7A] transition-all shadow-md shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content & Specs */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-10 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#C8AA7A] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C8AA7A]" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-5xl text-white font-medium group-hover/card:text-[#F3EFE6] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  {/* Specs Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-white/20 text-xs font-mono text-white/90 gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>Turnkey: <strong className="text-[#C8AA7A] font-bold">{project.budget}</strong></span>
                      <span>Area: <strong className="text-white font-bold">{project.area}</strong></span>
                      <span>Timeline: <strong className="text-white font-bold">{project.timeline}</strong></span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#C8AA7A] font-bold group-hover/card:translate-x-1 transition-transform pt-1 sm:pt-0">
                      <SlidersHorizontal className="w-3.5 h-3.5" /> Before & After Slider ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM HINT FOOTER */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#5A5852] pt-2 border-t border-[#1A1917]/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#13362B] animate-ping" />
            <span className="uppercase font-bold tracking-wider text-[#1A1917] hidden sm:inline">Display Pinned: Continue Scrolling Vertically to Slide Cards</span>
            <span className="uppercase font-bold tracking-wider text-[#1A1917] sm:hidden">Scroll Vertically to Reveal</span>
          </div>

          <span className="text-[11px] font-bold text-[#8C6D3B]">Tap Card for Details</span>
        </div>

      </div>

      {/* Interactive Project Detail & Before/After Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#F9F8F3] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto text-[#1A1917]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1A1917]/10 bg-white">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#13362B]/10 border border-[#13362B]/30 text-[10px] font-mono text-[#13362B] font-bold">
                    {activeProject.badge}
                  </span>
                  <span className="text-xs font-mono text-[#8C6D3B]">{activeProject.rating}</span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-[#1A1917] mt-1">{activeProject.title}</h3>
                <p className="text-xs text-[#5A5852] font-mono">{activeProject.location}</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-2.5 rounded-full bg-[#1A1917]/5 border border-[#1A1917]/10 hover:bg-[#1A1917]/10 text-[#1A1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Interactive Before/After Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">
                    Interactive Transformation View (Drag Slider Left / Right)
                  </span>
                </div>
                <BeforeAfterSlider
                  beforeImage={activeProject.beforeImg}
                  afterImage={activeProject.afterImg}
                />
              </div>

              {/* Story & Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#1A1917]/10">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="font-serif text-xl font-medium text-[#1A1917]">Architectural Design Narrative</h4>
                  <p className="text-sm text-[#5A5852] font-light leading-relaxed">
                    {activeProject.story}
                  </p>
                </div>

                <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#1A1917]/10">
                  <h4 className="font-serif text-lg font-medium text-[#13362B]">Project Telemetry</h4>
                  
                  <div className="space-y-2 text-xs font-mono text-[#5A5852]">
                    <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                      <span>Investment:</span>
                      <strong className="text-[#13362B] font-bold">{activeProject.budget}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                      <span>Carpet Area:</span>
                      <strong className="text-[#1A1917]">{activeProject.area}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                      <span>Execution Period:</span>
                      <strong className="text-[#1A1917]">{activeProject.timeline}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C6D3B] block mb-2">
                      Verified Material Grade
                    </span>
                    <div className="space-y-1.5">
                      {activeProject.materials.map((mat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#1A1917]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#13362B] shrink-0" />
                          <span>{mat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
