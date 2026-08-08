import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Box, Hammer, Key, Ruler, FileCheck, ShieldCheck } from 'lucide-react';

export const HorizontalTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Today (Discovery)',
      desc: 'Initial meeting to understand your lifestyle, aesthetic preference, and budget goals.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Site Measurement',
      desc: 'Precision laser measurement of your apartment, villa, or commercial space in Kolkata.',
      icon: Ruler,
    },
    {
      num: '03',
      title: '3D Design & VR',
      desc: 'Immersive 4K 3D renders and VR walkthrough before a single brick is touched.',
      icon: Box,
    },
    {
      num: '04',
      title: 'Material Selection',
      desc: 'Transparent itemized material selection from our digital & physical sample library.',
      icon: FileCheck,
    },
    {
      num: '05',
      title: 'Factory Production',
      desc: 'German machinery woodworking & precision modular furniture manufacturing.',
      icon: Sparkles,
    },
    {
      num: '06',
      title: 'Site Work & Execution',
      desc: 'On-site civil, false ceiling, electrical, plumbing & installation supervised by PM.',
      icon: Hammer,
    },
    {
      num: '07',
      title: 'Quality Control (QC)',
      desc: 'Rigorous 45-point quality audit, electrical testing, and alignment checks.',
      icon: FileCheck,
    },
    {
      num: '08',
      title: 'Handover & Delivery',
      desc: 'Deep cleaning, final walkthrough, and official key handover with peace of mind.',
      icon: Key,
    },
    {
      num: '09',
      title: '10-Year Warranty',
      desc: 'Digital warranty vault activated for long-term maintenance and annual checkups.',
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#1A1917]/10 text-xs uppercase tracking-[0.25em] text-[#8C6D3B] mb-4 shadow-sm font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
          <span>Dentorio Workflow</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1A1917] mb-4">
          Our Seamless <span className="italic text-gold-gradient">Project Process</span>
        </h2>
        <p className="text-sm text-[#5A5852] font-light">
          From concept to final key handover—our step-by-step roadmap ensures complete transparency and on-time delivery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="double-bezel group relative overflow-hidden transition-all duration-300 hover:border-[#A88B57] cursor-pointer"
              data-cursor="STEP"
            >
              <div className="double-bezel-inner p-8 flex flex-col justify-between h-full space-y-6 bg-white/90 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#8C6D3B]/40 group-hover:text-[#8C6D3B] transition-colors">
                    {step.num}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="w-12 h-12 rounded-2xl bg-[#A88B57]/10 border border-[#A88B57]/30 flex items-center justify-center text-[#8C6D3B]"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#1A1917] font-medium mb-2 group-hover:text-[#8C6D3B] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
