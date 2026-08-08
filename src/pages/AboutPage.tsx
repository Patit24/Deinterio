import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ComparisonTable } from '../components/ComparisonTable';
import { AwardsShowcase } from '../components/AwardsShowcase';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Building2, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <SEOHead
        title="About Us & Company Philosophy"
        description="Learn about Deinterio Interior Group — Kolkata's leading luxury interior architecture firm bringing 100% material transparency, fixed pricing, and 10-year warranties."
      />

      {/* Header Breadcrumb */}
      <Breadcrumbs
        items={[{ label: 'About Us' }]}
        categoryBadge="DEINTERIO HERITAGE & PHILOSOPHY"
        title="Designing Kolkata's Finest Living Sanctuaries"
        subtitle="We believe luxury is not just visual opulence — it is complete material transparency, live project telemetry, fixed pricing certainty, and peace of mind."
      />

      {/* Brand Story Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F4] border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>THE DEINTERIO STORY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917] leading-tight">
              Founded on <span className="italic text-gold-gradient">Uncompromising Truth</span> & Precision Engineering
            </h2>
            <p className="text-sm sm:text-base text-[#5A5852] font-light leading-relaxed">
              In 2014, Deinterio was established in South Kolkata with a simple yet ambitious vision: to eliminate the anxiety, cost overruns, and material substitution that plaguing the Indian interior design market.
            </p>
            <p className="text-sm sm:text-base text-[#5A5852] font-light leading-relaxed">
              Today, with over 420+ delivered residences across Ballygunge, Alipore, New Town, Rajarhat, and NCR, we combine classical Italian aesthetic proportion with German factory woodworking, Sub-Zero IoT smart home automation, and live PM tracking.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E2DDD6]">
              <div className="space-y-1">
                <span className="font-serif text-3xl font-bold text-[#13362B]">10+ Years</span>
                <span className="text-xs font-mono text-[#6B6560] block">Architectural Mastery</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl font-bold text-[#13362B]">100% BOQ</span>
                <span className="text-xs font-mono text-[#6B6560] block">Itemized Pricing Certainty</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Deinterio Studio HQ"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#13362B] text-white p-6 rounded-2xl shadow-xl max-w-xs space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#C8AA7A]" />
              <h4 className="font-serif text-lg font-medium">10-Year Warranty Guaranteed</h4>
              <p className="text-xs text-[#D4C3A3] font-light">
                Backed directly by CenturyPly Marine Plywood and Hettich Germany certified hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Architectural Team */}
      <section className="py-20 px-4 sm:px-8 bg-[#F4EFDF] border-y border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
              <Users className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>THE CRAFTSMEN & ARCHITECTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917]">
              Guided by <span className="italic text-gold-gradient">Master Designers</span>
            </h2>
            <p className="text-sm text-[#5A5852] font-light">
              Our multidisciplinary team combines senior interior architects, structural engineers, lighting consultants, and dedicated project managers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Ananya Mukherjee',
                role: 'Principal Interior Architect',
                exp: '14+ Yrs Experience • CEPT Alumnus',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                bio: 'Specializes in Italian minimalist space design and heritage bungalow restorations across South Kolkata.',
              },
              {
                name: 'Vikramaditya Roy',
                role: 'Head of Spatial Computing & IoT',
                exp: '12+ Yrs Experience • IIT Kharagpur',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
                bio: 'Pioneered our live Sub-Zero IoT PM telemetry app and automated climate and lighting integrations.',
              },
              {
                name: 'Siddharth Banerjee',
                role: 'Master Craftsman & Joinery Director',
                exp: '18+ Yrs Experience • German CNC Joinery',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                bio: 'Oversees our 14,000 sq.ft precision German woodworking facility in Rajarhat, ensuring 0.5mm tolerances.',
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-[#E2DDD6] shadow-xs group hover-lift transition-all">
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#13362B]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#C8AA7A]">
                    {member.exp}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-2xl font-normal text-[#1A1917]">{member.name}</h3>
                  <span className="text-xs font-mono font-bold text-[#8C6D3B] block">{member.role}</span>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distinction Comparison Table (With Image on About Page) */}
      <ComparisonTable showImage={true} />

      {/* Honors & Awards */}
      <AwardsShowcase />

      {/* Client Video Reviews */}
      <VideoTestimonials />

      {/* Final Booking Call to Action */}
      <section className="py-20 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>STUDIO VISIT & DIRECT ARCHITECT CONSULTATION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Ready to Build Your <span className="italic text-[#C8AA7A]">Dream Sanctuary</span>?
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3A3] font-light max-w-2xl mx-auto leading-relaxed">
            Schedule a free 1-on-1 discovery consultation with our principal architects at our North Kolkata studio or via 4K VR live session.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Book Free Consultation
            </button>
            <a
              href="#/contact"
              className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all"
            >
              Visit Studio HQ →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
