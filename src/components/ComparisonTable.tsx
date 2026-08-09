import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Award, ShieldCheck } from 'lucide-react';

const COMPARISON = [
  { feature: 'Hidden Cost', note: 'No hidden costs. Every quotation is itemized. No surprises.', deinterio: true, others: false },
  { feature: 'Weekly Updates', note: 'Weekly photos, videos, progress reports & milestone approvals', deinterio: true, others: false },
  { feature: 'Project App', note: 'Live client telemetry dashboard with 24/7 access', deinterio: true, others: false },
  { feature: 'Dedicated PM', note: 'One architect. One project manager. One WhatsApp group.', deinterio: true, others: 'warning' },
  { feature: 'Material Reports', note: 'Every plywood, laminate, fitting & invoice visible inside dashboard', deinterio: true, others: false },
  { feature: 'Quality Reports', note: 'Trained carpenters, precision installation & 45-point quality audit', deinterio: true, others: false },
  { feature: 'Video Progress', note: 'Live site camera & site walkthrough video logs', deinterio: true, others: false },
  { feature: 'Digital Warranty', note: 'Digital warranty vault storing invoices, manuals & 10-yr coverage', deinterio: true, others: false },
];

interface ComparisonTableProps {
  showImage?: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ showImage = false }) => {
  return (
    <section
      id="about"
      className="relative bg-[#F8F6F0] overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Two-column grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh] items-center">

        {/* ── CARD PANEL (LEFT) ─────────────────────────────────── */}
        <div className={`relative flex items-center justify-center p-6 sm:p-10 lg:p-14 order-first ${!showImage ? 'hidden lg:flex' : ''}`}>
          {showImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Deinterio Luxury Residence"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13362B]/90 backdrop-blur-md text-[10px] font-mono text-[#C8AA7A] font-bold uppercase tracking-wider w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% SPECIFICATION GUARANTEE</span>
                </div>
                <h3 className="font-serif text-2xl font-normal">Action Area I Villa — New Town</h3>
                <p className="text-xs text-gray-200 font-light">
                  CenturyPly Club Prime 710 BWP Marine Plywood & Hafele German fittings throughout.
                </p>
              </div>
            </motion.div>
          ) : (
            /* On Home Page Desktop: Keep left panel clear for flying hero card */
            <div className="relative w-[240px] sm:w-[320px] aspect-[3/4] hidden lg:block" />
          )}
        </div>

        {/* ── TEXT CONTENT PANEL (RIGHT) ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-16 lg:py-20 bg-[#F8F6F0] order-last"
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1A1917]/10 text-[10px] uppercase tracking-[0.22em] text-[#8C6D3B] font-mono font-semibold shadow-sm w-fit mb-6"
          >
            <Award className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>The Deinterio Advantage</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl xl:text-5xl font-normal text-[#1A1917] leading-tight mb-3"
          >
            Why Homeowners Switch To{' '}
            <span className="italic text-gold-gradient">Deinterio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-[#5A5852] font-light leading-relaxed max-w-md mb-10"
          >
            People don't buy wardrobes or modular kitchens—they buy trust, certainty, status, and peace of mind. Compare our transparency against local contractors & platforms.
          </motion.p>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-white rounded-2xl border border-[#1A1917]/8 shadow-sm overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-[1fr_80px_80px] border-b border-[#1A1917]/8 bg-[#FAF8F4]">
              <div className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-[#5A5852]">
                Standard & Commitment
              </div>
              <div className="px-2 py-3 text-center text-[10px] font-mono uppercase tracking-widest text-[#8C6D3B] font-bold">
                Us
              </div>
              <div className="px-2 py-3 text-center text-[10px] font-mono uppercase tracking-widest text-[#5A5852]">
                Others
              </div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-[#1A1917]/5">
              {COMPARISON.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  className="grid grid-cols-[1fr_80px_80px] hover:bg-[#FAF8F4] transition-colors"
                >
                  <div className="px-5 py-3.5">
                    <span className="text-[12.5px] text-[#1A1917] font-medium block leading-snug">{row.feature}</span>
                    <span className="text-[10.5px] text-[#5A5852] font-mono mt-0.5 block leading-relaxed">{row.note}</span>
                  </div>
                  {/* Deinterio column */}
                  <div className="flex items-center justify-center bg-[#A88B57]/5">
                    <div className="w-7 h-7 rounded-full bg-[#13362B] flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                  </div>
                  {/* Others column */}
                  <div className="flex items-center justify-center">
                    {row.others === 'warning' ? (
                      <span className="text-sm">⚠️</span>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-[11px] font-mono text-[#8C6D3B] uppercase tracking-widest"
          >
            ↓ Scroll to explore our services
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
