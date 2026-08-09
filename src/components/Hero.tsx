import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ArrowRight, 
  Crown, 
  Play, 
  X,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePortfolio: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePortfolio, onOpenCalculator }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-driven card exit on Desktop & Tablet
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Left card: slides further left and fades on Desktop & Tablet
  const leftX  = useTransform(scrollYProgress, [0, 0.5], ['0%',  '-120%']);
  const leftOp = useTransform(scrollYProgress, [0, 0.4],  [1,    0]);

  // Right card: mirrors left on Desktop & Tablet
  const rightX  = useTransform(scrollYProgress, [0, 0.5], ['0%', '120%']);
  const rightOp = useTransform(scrollYProgress, [0, 0.4], [1,    0]);

  // Center card: translates into About grid slot on Desktop & Tablet
  const centerScale  = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const centerOp     = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const centerY      = useTransform(scrollYProgress, [0, 1], ['0vh', '110vh']);
  const centerRightX = useTransform(scrollYProgress, [0, 1], ['0vw', '-25vw']);

  return (
    <section ref={heroRef} id="hero" className="relative w-full pt-28 pb-12 lg:pt-32 lg:pb-16 bg-[#F8F6F0] text-[#1A1917] flex flex-col justify-center min-h-[100vh] lg:min-h-screen z-20">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[520px] opacity-[0.07] select-none"
          style={{ filter: 'invert(1)', mixBlendMode: 'multiply' }}
        />
        <svg className="w-full h-full opacity-30" aria-hidden="true">
          <path d="M -100,200 Q 400,-100 900,400 T 1900,200" fill="none" stroke="rgba(168, 139, 87, 0.25)" strokeWidth="1.5" />
          <path d="M -100,400 Q 500,100 1100,600 T 2100,400" fill="none" stroke="rgba(168, 139, 87, 0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#A88B57]/10 via-[#F3EFE6]/50 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* CENTERED EDITORIAL HERO CONTENT */}
      <div className="max-w-5xl mx-auto w-full text-center relative z-10 px-4 sm:px-8 space-y-6 mb-8 lg:mb-12 mt-12 lg:mt-0">
        
        {/* Crown Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5EFDF] border border-[#D4C3A3] text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C6D3B] shadow-sm"
        >
          <Crown className="w-4 h-4 text-[#A88B57]" />
          <span>DEINTERIO INTERIOR GROUP • A UNIT OF ALL IN ONE CONTRACTUAL SERVICES PVT LTD</span>
        </motion.div>

        {/* Giant Centered Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.5rem] font-normal tracking-tight leading-[1.05] text-[#1A1917]">
            Designing Kolkata's <br />
            <span className="font-serif italic text-gold-gradient font-light">
              Finest Homes.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-[#5A5852] font-light max-w-2xl mx-auto leading-relaxed tracking-wide space-y-2"
        >
          <strong className="block text-[#1A1917] font-semibold text-base sm:text-lg">
            Luxury interiors with complete transparency, live project tracking, and guaranteed quality—crafted around your lifestyle.
          </strong>
          <span>
            Whether it's a premium apartment in New Town, a villa in Rajarhat, or a heritage home in South Kolkata, we transform spaces into timeless living experiences.
          </span>
        </motion.p>

        {/* Centered Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenBooking}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest shadow-xl hover:bg-[#0D241D] transition-all duration-300 cursor-pointer"
          >
            <span>BOOK FREE DESIGN CONSULTATION</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsPlayingVideo(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-[#1A1917]/10 text-[#1A1917] text-xs font-mono font-semibold uppercase tracking-wider hover:border-[#A88B57] shadow-sm transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#A88B57] fill-[#A88B57]" />
            <span>WATCH REAL HOME STORIES</span>
          </motion.button>
        </motion.div>

      </div>

      {/* BOTTOM 3 OVERLAPPING ARCHITECTURAL CARD CLUSTER */}
      <div className="max-w-6xl mx-auto w-full relative z-10 px-4 sm:px-8 mb-4 lg:mb-8 flex justify-center items-center">
        <div className="relative flex items-center justify-center w-full max-w-4xl min-h-[360px] sm:min-h-[400px]">
          
          {/* LEFT OVERLAPPING CARD */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -12 }}
            animate={{ opacity: 1, x: 0, rotate: -7 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
            style={isMobile ? {} : { x: leftX, opacity: leftOp }}
            className="absolute left-0 sm:left-12 w-[180px] sm:w-[260px] aspect-[3/4] rounded-[28px] overflow-hidden border border-[#1A1917]/10 bg-white shadow-xl z-10 cursor-pointer group"
          >
            <img
              src="/isometric_3d_villa_cutout.png"
              alt="Architectural 3D Villa Cutout"
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#1A1917] uppercase tracking-wider shadow-xs">
                3D Villa Cutout
              </span>
              <h4 className="font-serif text-lg text-white font-medium mt-2">Smart IoT Telemetry</h4>
            </div>
          </motion.div>

          {/* RIGHT OVERLAPPING CARD */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 12 }}
            animate={{ opacity: 1, x: 0, rotate: 7 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
            style={isMobile ? {} : { x: rightX, opacity: rightOp }}
            className="absolute right-0 sm:right-12 w-[180px] sm:w-[260px] aspect-[3/4] rounded-[28px] overflow-hidden border border-[#1A1917]/10 bg-white shadow-xl z-10 cursor-pointer group"
          >
            <img
              src="/premium_design_studio.jpg"
              alt="Bespoke Design Studio Workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#1A1917] uppercase tracking-wider shadow-xs">
                Material Vault
              </span>
              <h4 className="font-serif text-lg text-white font-medium mt-2">Bespoke Design Studio</h4>
            </div>
          </motion.div>

          {/* CENTER FLYING CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={
              isMobile
                ? {}
                : { 
                    scale: centerScale, 
                    opacity: centerOp,
                    y: centerY,
                    x: centerRightX
                  }
            }
            className="absolute z-30 w-[240px] sm:w-[320px] aspect-[3/4] rounded-[32px] overflow-hidden border-4 border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-center"
          >
            <img
              src="/ultra_hero_living_room.jpg"
              alt="Deinterio Masterpiece Italian Interior"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/85 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-40">
              <div
                onClick={() => setIsPlayingVideo(true)}
                className="p-3.5 rounded-2xl bg-[#1A1917]/90 text-white backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-3 cursor-pointer group/btn"
              >
                <div className="w-9 h-9 rounded-xl bg-[#A88B57] text-white flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <div className="text-xs font-bold font-serif text-white">Deinterio Masterpiece</div>
                  <div className="text-[10px] font-mono text-[#D4C3A3]">Tap for 360° Studio Tour</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-[#13362B] text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C8AA7A]">
                Deinterio Studio 360° Walkthrough
              </span>
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                title="Deinterio Video Story"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
