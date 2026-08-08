import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { ChevronDown, Search, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQPageProps {
  onOpenBooking: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      cat: 'Pricing & Budget',
      q: 'How does Deinterio guarantee zero cost overruns during execution?',
      a: 'Before execution begins, we issue a 100% itemized Bill of Quantities (BOQ) covering every square foot of plywood, hardware hinge count, and paint liter. Once signed, the total price is locked contractually.',
    },
    {
      cat: 'Materials & Warranties',
      q: 'What brand warranties are included with my home interior?',
      a: 'All CenturyPly Club Prime marine plywood comes with a 25-year manufacturer warranty. Hettich German soft-close hinges come with 10-year direct replacements. Deinterio backs the entire handover with a digital 10-year warranty certificate.',
    },
    {
      cat: 'Process & Timelines',
      q: 'What is your handover timeline for a typical 3BHK penthouse?',
      a: 'A standard 3BHK penthouse is completed within 45 calendar days. Since 85% of woodworking is pre-manufactured at our Rajarhat CNC facility, on-site assembly takes only 14–18 days.',
    },
    {
      cat: 'Process & Timelines',
      q: 'What happens if Deinterio fails to deliver on time?',
      a: 'Our contracts include a legally binding 0.5% per week penalty clause. Penalty refunds are automatically credited to your final milestone payment if delays are caused by Deinterio.',
    },
    {
      cat: 'Services & Scope',
      q: 'Do you handle civil work, electrical wiring, and plumbing modifications?',
      a: 'Yes. We provide complete turnkey execution including civil masonry demolition, false ceiling electrical conduit routing, plumbing alterations, HVAC ducting, and painting.',
    },
    {
      cat: 'Materials & Warranties',
      q: 'Can I select imported Italian marble and custom veneers at your studio?',
      a: 'Yes. Our 3,500 sq.ft North Kolkata design studio vault features physical tactile samples of Italian Botticino, Calacatta marble, fluted teak wood veneers, and fabric swatches.',
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.cat === activeCategory;
    const matchesSearch = f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions & Answers"
        description="Search through Deinterio's FAQ database covering pricing, materials, warranties, timelines, and turnkey interior process."
      />

      <Breadcrumbs
        items={[{ label: 'FAQ' }]}
        categoryBadge="KNOWLEDGE HUB & HELP CENTER"
        title="Frequently Asked Architectural Questions"
        subtitle="Find instant answers to questions regarding material guarantees, BOQ pricing transparency, project timelines, and post-handover support."
      />

      {/* Search & Category Filter Section */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
        <div className="relative">
          <Search className="w-5 h-5 text-[#A88B57] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions by keyword (e.g. warranty, plywood, timeline, penalty)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#E2DDD6] text-sm text-[#1A1917] placeholder:text-[#6B6560]/60 focus:outline-none focus:border-[#13362B] shadow-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Pricing & Budget', 'Materials & Warranties', 'Process & Timelines', 'Services & Scope'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#13362B] text-white shadow-md'
                  : 'bg-white text-[#6B6560] border border-[#E2DDD6] hover:border-[#A88B57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated FAQ Accordion */}
        <div className="space-y-4 pt-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E2DDD6] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F4] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A88B57] uppercase tracking-widest block">
                      {faq.cat}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#1A1917]">{faq.q}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C6D3B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#13362B]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-xs text-[#5A5852] font-light leading-relaxed border-t border-[#E2DDD6]/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unresolved Questions CTA */}
      <section className="py-16 px-4 sm:px-8 bg-[#13362B] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl font-normal">Have a Specific Question About Your Home?</h2>
          <p className="text-xs text-[#D4C3A3] font-light">
            Our team is available 6 days a week to answer floorplan, material, and budget inquiries.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Ask an Architect Directly
          </button>
        </div>
      </section>
    </>
  );
};
