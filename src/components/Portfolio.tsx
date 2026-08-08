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
      <div className="sticky top-24 h-[calc(100vh-100px)] flex flex-col justify-between py-4 px-4 sm:px-8 max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1917]/10 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1A1917]/10 text-[10px] uppercase tracking-[0.22em] text-[#8C6D3B] font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>Scroll Down Vertically to Reveal Masterpieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1917] mt-1">
              Featured <span className="italic text-gold-gradient">Masterpieces</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-white border border-[#1A1917]/10 shadow-xs">
            {['All', 'Villa', 'Penthouse', '3BHK', 'Corporate', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1917] text-white font-bold shadow-md'
                    : 'text-[#1A1917]/70 hover:text-[#1A1917]'
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
            className="flex gap-8 items-center"
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group/card relative w-[88vw] max-w-4xl h-[420px] sm:h-[480px] shrink-0 rounded-[36px] overflow-hidden bg-[#1A1917] cursor-pointer shadow-2xl border border-[#1A1917]/20 hover:border-[#A88B57] transition-all duration-500"
                data-cursor="EXPLORE"
              >
                {/* Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover-rotate-img opacity-90 group-hover/card:opacity-100"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/95 via-[#1A1917]/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="px-4 py-1.5 rounded-full bg-white/95 text-xs uppercase font-mono tracking-widest text-[#1A1917] font-semibold backdrop-blur-md shadow-md">
                    {project.badge}
                  </span>

                  <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-white/50 flex items-center justify-center text-[#1A1917] group-hover/card:scale-110 group-hover/card:bg-[#A88B57] group-hover/card:text-white transition-all shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content & Specs */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A88B57]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-5xl text-white font-medium group-hover/card:text-[#F3EFE6] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  {/* Specs Bar */}
                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/20 text-xs sm:text-sm font-mono text-white/90 gap-4">
                    <div className="flex flex-wrap items-center gap-6">
                      <span>Turnkey Investment: <strong className="text-[#A88B57] font-bold">{project.budget}</strong></span>
                      <span>Carpet Area: <strong>{project.area}</strong></span>
                      <span>Duration: <strong>{project.timeline}</strong></span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A88B57] font-bold group-hover/card:translate-x-1 transition-transform">
                      <SlidersHorizontal className="w-4 h-4" /> Interactive Before & After Slider ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM HINT FOOTER */}
        <div className="flex items-center justify-between text-xs font-mono text-[#5A5852] pt-2 border-t border-[#1A1917]/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13362B] animate-ping" />
            <span className="uppercase font-bold tracking-wider text-[#1A1917]">Display Pinned: Continue Scrolling Vertically to Slide Cards</span>
          </div>

          <span className="text-xs font-bold text-[#8C6D3B]">Click Card to Reveal Before/After Slider</span>
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
            <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
              
              {/* Interactive Before & After Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-[#5A5852]">
                  <span>Drag Slider to Reveal Before & After Transformation</span>
                  <span className="text-[#13362B] font-bold">100% Deinterio Turnkey Execution</span>
                </div>
                <BeforeAfterSlider beforeImage={activeProject.beforeImg} afterImage={activeProject.afterImg} />
              </div>

              {/* Story & Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                <div className="md:col-span-8 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#8C6D3B] font-bold">Architectural Concept & Execution Story</h4>
                  <p className="text-sm text-[#5A5852] font-light leading-relaxed">{activeProject.story}</p>
                </div>

                <div className="md:col-span-4 p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 font-mono text-xs">
                  <h5 className="text-xs uppercase tracking-wider text-[#1A1917] font-bold border-b border-[#1A1917]/10 pb-2">Key Project Specs</h5>
                  <div className="flex justify-between">
                    <span className="text-[#5A5852]">Turnkey Budget:</span>
                    <span className="font-bold text-[#8C6D3B]">{activeProject.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5852]">Carpet Area:</span>
                    <span className="font-bold">{activeProject.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5852]">Execution Time:</span>
                    <span className="font-bold">{activeProject.timeline}</span>
                  </div>
                </div>

              </div>

              {/* Materials & Hardware Palette */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#8C6D3B] font-bold mb-3">Authentic Materials & Branded Hardware Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.materials.map((mat: string, idx: number) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white border border-[#1A1917]/10 text-xs font-mono text-[#1A1917] flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#13362B]" />
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
