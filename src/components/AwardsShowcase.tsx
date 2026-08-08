import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Globe, Building2, Flag, Star } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { TiltCard } from './TiltCard';

export const AwardsShowcase: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F1E9] py-24 overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full border border-[#D4AF37]/10 -translate-x-1/2 -translate-y-1/2 blur-[2px]" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full border border-[#D4AF37]/5 translate-x-1/3 translate-y-1/3 blur-[2px]" />
        
        {/* Subtle glow spots */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Row: Title + Hero Award */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
          
          {/* Title Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#8C6D3B] uppercase">Our Global Recognition</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-[4rem] leading-[1.1] text-[#1A1917] mb-6">
              Honors & <br/>
              <span className="italic text-[#A88B57]">International Awards</span>
            </h2>
            <p className="text-[#5A5852] text-sm lg:text-base leading-relaxed max-w-sm">
              Celebrating excellence in design, innovation and creating extraordinary spaces worldwide.
            </p>
          </motion.div>

          {/* Hero Award Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white via-white/50 to-[#D4AF37]/30 shadow-2xl">
              <div className="relative bg-gradient-to-br from-[#FDFBF7]/95 to-[#F4F0E6]/95 backdrop-blur-xl rounded-[15px] border border-white/60 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                
                <div className="relative z-10 p-8 lg:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="text-5xl lg:text-6xl font-serif text-[#A88B57] mb-2 tracking-tight">2026</div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-4">Winner</div>
                    <h3 className="text-3xl lg:text-4xl font-serif text-[#1A1917] mb-1">Awwwards</h3>
                    <h3 className="text-3xl lg:text-4xl font-serif text-[#1A1917] mb-4">Site of the Day</h3>
                    <p className="text-sm text-[#5A5852] mb-6">Digital Architecture Experience</p>
                    <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#8C6D3B] uppercase">Awwwards International Jury</div>
                  </div>
                  
                  {/* 3D Trophy Graphic Representation */}
                  <div className="relative w-full sm:w-[240px] aspect-square flex items-center justify-center mt-8 sm:mt-0">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/30 transition-colors"></div>
                    
                    {/* Background faint number */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-[14rem] font-serif text-[#A88B57]/5 leading-none pointer-events-none select-none">
                      26
                    </div>
                    
                    {/* Trophy structure */}
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div 
                        whileHover={{ rotateY: 15, scale: 1.05 }}
                        className="w-24 h-36 bg-gradient-to-br from-[#F4D068] via-[#D4AF37] to-[#8C6D3B] shadow-2xl relative border-l border-t border-white/40 flex items-center justify-center transform preserve-3d cursor-pointer"
                        style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                      >
                         <Trophy className="w-8 h-8 text-white/90 drop-shadow-md" />
                      </motion.div>
                      {/* Marble Base */}
                      <div className="w-32 h-6 bg-gradient-to-r from-[#2A2A2A] to-[#1A1917] border-t border-white/20 shadow-2xl mt-[-2px] z-20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { year: '2025', title: 'AD100 Top\nArchitectural Studio', cat: 'Luxury Residential Interior', jury: 'Architectural Digest', bgNum: '25' },
            { year: '2025', title: 'World Luxury\nDesign Award', cat: 'Best Villa Renovation (Lake Como)', jury: 'Milan Design Biennale', bgNum: '25' },
            { year: '2024', title: 'European\nProperty Award', cat: 'Best Penthouse Interior (London)', jury: 'International Property Awards', bgNum: '24' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard dataCursor="AWARD" className="h-full rounded-2xl p-[1px] bg-gradient-to-br from-white via-white/40 to-[#D4AF37]/20 shadow-lg">
                <div className="relative h-full bg-gradient-to-br from-[#FDFBF7]/95 to-[#F4F0E6]/95 backdrop-blur-xl rounded-[15px] border border-white/60 p-8 overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[10rem] font-serif text-[#A88B57]/5 leading-none pointer-events-none select-none group-hover:text-[#A88B57]/10 transition-colors">
                    {item.bgNum}
                  </div>
                  
                  <div className="relative z-10 mb-8 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0 bg-gradient-to-br from-white to-[#F8F6F0] shadow-sm icon-spin-hover">
                      <Trophy className="w-5 h-5 text-[#A88B57]" />
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-[#A88B57]">{item.year}</div>
                      <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase">Winner</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="font-serif text-[1.35rem] leading-tight text-[#1A1917] mb-2 whitespace-pre-line">{item.title}</h3>
                    <p className="text-xs text-[#5A5852] mb-6">{item.cat}</p>
                    <div className="text-[9px] font-mono font-bold tracking-[0.15em] text-[#8C6D3B] uppercase">{item.jury}</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white via-white/40 to-[#D4AF37]/20 shadow-lg"
        >
          <div className="relative bg-gradient-to-br from-[#FDFBF7]/95 to-[#F4F0E6]/95 backdrop-blur-xl rounded-[15px] border border-white/60 p-6 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[15px]" />
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#A88B57]/20">
              {[
                { num: '28+', label: 'International Awards', sub: 'Across architecture & interior design excellence', Icon: Globe },
                { num: '150+', label: 'Luxury Projects', sub: 'Successfully delivered worldwide', Icon: Building2 },
                { num: '17+', label: 'Countries Served', sub: 'Bringing design visions to life globally', Icon: Flag },
                { num: '98%', label: 'Client Satisfaction', sub: 'Trusted by discerning clients worldwide', Icon: Star },
              ].map((stat, i) => (
                <div key={i} className={`flex items-start gap-4 ${i !== 0 ? 'lg:pl-8' : ''}`}>
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0 bg-gradient-to-br from-white to-[#F8F6F0] shadow-sm icon-spin-hover">
                    <stat.Icon className="w-5 h-5 text-[#A88B57]" />
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-[#A88B57] mb-1">
                      <AnimatedCounter value={stat.num} />
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.1em] text-[#1A1917] uppercase mb-1.5">{stat.label}</div>
                    <p className="text-[11px] text-[#5A5852] leading-snug">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
