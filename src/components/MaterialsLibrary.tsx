import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Check, X, Building2, Home, Utensils,
  Landmark, ShoppingBag, GraduationCap, Trophy, Users, Clock,
  Flame, Box, ShieldCheck, Gem, TrendingUp
} from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';

/* ─────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                    */
/* ─────────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 1, num: '01',
    title: 'Residential Interiors',
    category: 'Residential', badge: '528+ Homes', subtext: '500+ Happy Families',
    desc: '2BHK · 3BHK · 4BHK · Villas · Penthouses',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    specs: 'Complete turnkey residential architecture including Italian marble wall cladding, acoustic false ceiling slots, modular kitchens, and custom imported wardrobe cabinetry.',
    invest: '₹18L – ₹65L',
    accent: '#8C6D3B',
    type: 'widgets' as const,
    widgets: [
      { label: 'Families', val: '500+', icon: Users, hi: true },
      { label: 'On-Time', val: '100%', icon: ShieldCheck, hi: false },
      { label: 'VR Tour', val: '3D', icon: Box, hi: false },
      { label: 'Warranty', val: '10 Yrs', icon: Trophy, hi: false },
    ],
  },
  {
    id: 2, num: '02',
    title: 'Cafes & Restaurants',
    category: 'Commercial', badge: '120+ Projects', subtext: '120+ Business Spaces',
    desc: 'Vibrant dining atmospheres & experiential spaces',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
    specs: 'Vibrant experiential dining atmospheres, acoustic seating layouts, custom mood lighting setups, industrial bar counters, and commercial kitchen ventilation engineering.',
    invest: '₹15L – ₹45L',
    accent: '#8C6D3B',
    type: 'tags' as const,
    tags: ['@Acoustics_Lead', '@Mood_Lighting', '@Commercial_Kitchen', '@DMX_Controller', '@Principal_Architect'],
  },
  {
    id: 3, num: '03',
    title: 'Banks & Financial Hubs',
    category: 'Corporate', badge: '85+ Workspaces', subtext: '85+ Corporate Clients',
    desc: 'Secure. Smart. Professional.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    specs: 'High-security banking infrastructure, bullet-resistant glass cash counter paneling, vault acoustic treatment, managerial cabins, and smart automated HVAC integration.',
    invest: '₹25L – ₹90L',
    accent: '#8C6D3B',
    type: 'chart' as const,
    chartLabel: 'Workspace Productivity', chartVal: '+42%',
  },
  {
    id: 4, num: '04',
    title: 'Hotels & Retail Stores',
    category: 'Hospitality', badge: '65+ Projects', subtext: '65+ Hospitality Projects',
    desc: 'Premium spaces that leave a lasting impression',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    specs: 'Ultra-luxury resort & hotel reception lounges, boutique guest suites, high-end retail showroom display shelving, double-height glass facades, and immersive ambient lighting.',
    invest: '₹35L – ₹1.5Cr',
    accent: '#8C6D3B',
    type: 'widgets' as const,
    widgets: [
      { label: 'Hotels', val: '65+', icon: ShoppingBag, hi: true },
      { label: 'Facades', val: 'Dbl Ht', icon: Building2, hi: false },
      { label: 'Marble', val: 'Italy', icon: Gem, hi: false },
      { label: 'Stars', val: '5 ★', icon: Trophy, hi: false },
    ],
  },
  {
    id: 5, num: '05',
    title: 'Schools & Educational',
    category: 'Institutional', badge: '40+ Campuses', subtext: '40+ Institutions',
    desc: 'Inspiring spaces for future generations',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    specs: 'Ergonomic classroom architecture, smart auditorium seating systems, acoustic lecture halls, STEM laboratory casework, and collaborative campus research library centers.',
    invest: '₹40L – ₹2.0Cr',
    accent: '#8C6D3B',
    type: 'tags' as const,
    tags: ['@STEM_Lab', '@Auditorium_Acoustics', '@Ergonomic_EN1729', '@Campus_Masterplan'],
  },
  {
    id: 6, num: '06',
    title: 'Bungalow & Villa Architecture',
    category: 'Turnkey', badge: '75+ Villas', subtext: '75+ Luxury Villas',
    desc: 'Exquisite living, crafted with precision',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90',
    beforeImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    specs: 'Independent bungalow structural modifications, private swimming pool lounges, Italian marble entrance rotundas, and smart motorized perimeter gate integration.',
    invest: '₹50L – ₹3.5Cr',
    accent: '#8C6D3B',
    type: 'widgets' as const,
    widgets: [
      { label: 'Villas', val: '75+', icon: Home, hi: true },
      { label: 'Pools', val: 'Custom', icon: Utensils, hi: false },
      { label: 'Automation', val: 'Full', icon: Sparkles, hi: false },
      { label: 'Structure', val: 'RCC', icon: Landmark, hi: false },
    ],
  },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
];

const cardVariants: any = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 30 : -30,
    scale: 0.98,
  }),
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -30 : 30,
    scale: 0.98,
    transition: { duration: 0.3 },
  }),
};

function CardMid({ card }: { card: typeof CARDS[0] }) {
  if (card.type === 'widgets' && card.widgets) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {card.widgets.map((w, i) => {
          const Icon = w.icon;
          return (
            <div
              key={i}
              className={`rounded-xl p-2.5 sm:p-3 text-center border backdrop-blur-md transition-all ${
                w.hi
                  ? 'bg-white/95 border-[#8C6D3B] text-[#1A1917] shadow-md'
                  : 'bg-black/40 border-white/20 text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 mx-auto mb-1 ${w.hi ? 'text-[#8C6D3B]' : 'text-white/80'}`} />
              <div className="text-[9px] font-mono uppercase tracking-wider opacity-80">{w.label}</div>
              <div className="text-xs font-mono font-bold mt-0.5">{w.val}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (card.type === 'tags' && card.tags) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((t, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur text-[10px] font-mono text-white/90"
          >
            {t}
          </span>
        ))}
      </div>
    );
  }

  if (card.type === 'chart') {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/95 border border-[#8C6D3B] backdrop-blur text-[#1A1917] shadow-md">
        <TrendingUp className="w-4 h-4 text-[#8C6D3B]" />
        <div>
          <div className="text-[9px] font-mono uppercase text-[#5A5852] font-semibold">{card.chartLabel}</div>
          <div className="text-sm font-mono font-bold text-[#13362B]">{card.chartVal}</div>
        </div>
      </div>
    );
  }

  return null;
}

export const MaterialsLibrary: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [modal, setModal] = useState<typeof CARDS[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { shouldDisableScrollMotion } = useResponsiveMotion();

  const total = CARDS.length;
  const card = CARDS[idx];

  const goTo = useCallback((nextIdx: number, overrideDir?: number) => {
    const clamped = Math.max(0, Math.min(total - 1, nextIdx));
    if (clamped === idx) return;
    setDir(overrideDir ?? (clamped > idx ? 1 : -1));
    setIdx(clamped);
  }, [idx, total]);

  useEffect(() => {
    if (shouldDisableScrollMotion) return; // Native instant scrolling on mobile

    const onWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inZone = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!inZone) return;

      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0 && idx < total - 1) {
        e.preventDefault();
        goTo(idx + 1, 1);
      } else if (e.deltaY < 0 && idx > 0) {
        e.preventDefault();
        goTo(idx - 1, -1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [idx, total, goTo, shouldDisableScrollMotion]);

  const scrollTo = (i: number) => {
    if (!sectionRef.current) return;
    const top = sectionRef.current.offsetTop;
    const step = sectionRef.current.offsetHeight / total;
    window.scrollTo({ top: top + step * (i + 0.4), behavior: 'smooth' });
  };

  return (
    <section id="materials" className="relative py-28 lg:py-36 bg-[#F6F3EE] text-[#1A1917]">

      {/* MOBILE DISPLAY (Clean Warm Theme Card Deck - No Scroll Traps) */}
      {shouldDisableScrollMotion ? (
        <div className="py-8 px-4 space-y-8 max-w-md mx-auto">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD6] text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D3B] font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>Architectural Verticals</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#1A1917]">
              Interiors Designed for <span className="italic text-[#8C6D3B]">Every Lifestyle</span>
            </h2>
          </div>

          <div className="space-y-6">
            {CARDS.map((c) => (
              <div key={c.id} className="rounded-3xl bg-white border border-[#E2DDD6] p-5 space-y-4 shadow-lg">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-[#E2DDD6]">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#13362B] text-white text-[10px] font-mono font-bold uppercase shadow-xs">
                    {c.num} · {c.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#1A1917] font-normal">{c.title}</h3>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">{c.specs}</p>
                  <div className="pt-2 text-xs font-mono text-[#8C6D3B] flex justify-between border-t border-[#E2DDD6]">
                    <span>Investment: <strong className="text-[#13362B]">{c.invest}</strong></span>
                    <span>{c.subtext}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* DESKTOP & TABLET DISPLAY (Clean Warm Theme 3-Column Studio Layout) */
        <div ref={sectionRef} style={{ height: `${total * 100}vh` }} className="relative">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[#F6F3EE]">

            {/* ── TOP HEADER BAR ──────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[#E2DDD6] bg-[#FAF8F4]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D3B] font-bold">
                    Architectural Verticals
                  </span>
                </div>
                <h2 className="font-serif text-xl lg:text-2xl font-normal text-[#1A1917]">
                  Interiors Designed for{' '}
                  <span className="italic font-normal text-[#8C6D3B]">Every Lifestyle</span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-full border border-[#D4C3A3] bg-[#F5EFDF] text-xs font-mono font-bold text-[#8C6D3B] shadow-2xs">
                  {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* ── MAIN GRID ───────────────────────────────────────────────── */}
            <div className="flex-1 min-h-0 grid grid-cols-[72px_1fr] xl:grid-cols-[72px_1fr_320px] overflow-hidden">

              {/* ── COL 1: Vertical thumb rail ──────────────────────────── */}
              <div className="flex flex-col items-center justify-center gap-4 py-6 border-r border-[#E2DDD6] bg-[#FAF8F4]">
                {CARDS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => scrollTo(i)}
                    title={c.category}
                    className="relative flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div
                      className="overflow-hidden rounded-xl transition-all duration-300 shadow-xs"
                      style={{
                        width: i === idx ? 42 : 32,
                        height: i === idx ? 52 : 40,
                        outline: i === idx ? '2px solid #8C6D3B' : '2px solid transparent',
                        outlineOffset: 2,
                        opacity: i === idx ? 1 : 0.45,
                      }}
                    >
                      <img src={c.image} alt={c.category} className="w-full h-full object-cover" />
                    </div>
                    <span
                      className="text-[9.5px] font-mono font-bold transition-all"
                      style={{ color: i === idx ? '#8C6D3B' : '#5A5852' }}
                    >
                      {c.num}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── COL 2: Card viewport ────────────────────────────────── */}
              <div className="relative flex items-center justify-center p-5 lg:p-8 overflow-hidden bg-[#F6F3EE]">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={idx}
                    custom={dir}
                    variants={cardVariants}
                    initial="enter"
                    animate="show"
                    exit="exit"
                    className="w-full max-w-2xl"
                  >
                    <div
                      className="relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl border-4 border-white group"
                      style={{ height: 'min(66vh, 540px)' }}
                      onClick={() => setModal(card)}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#8C6D3B] to-transparent" />

                      <div className="absolute inset-0 flex flex-col p-6 sm:p-7">
                        <div className="flex items-center justify-between shrink-0">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/30 backdrop-blur text-[11px] font-mono text-white/90">
                            {card.category}
                          </span>
                          <span className="px-3.5 py-1.5 rounded-full bg-[#13362B] border border-[#C8AA7A]/50 text-[11px] font-mono font-bold text-[#C8AA7A] shadow-md">
                            {card.badge}
                          </span>
                        </div>

                        <div className="flex-1" />

                        <div className="shrink-0 mb-5">
                          <CardMid card={card} />
                        </div>

                        <div className="shrink-0 mb-4">
                          <h3 className="font-serif font-normal text-white leading-tight mb-1" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
                            {card.title}
                          </h3>
                          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">{card.desc}</p>
                        </div>

                        <div className="shrink-0 flex items-center justify-between pt-4 border-t border-white/20">
                          <div className="flex items-center gap-2.5">
                            <div className="flex -space-x-2">
                              {AVATARS.map((src, i) => (
                                <img key={i} src={src} alt="" className="w-6 h-6 rounded-full ring-2 ring-black object-cover" />
                              ))}
                            </div>
                            <span className="text-xs font-mono text-white/90 font-medium">{card.subtext}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                              <div className="text-[10px] font-mono text-[#C8AA7A] font-bold uppercase tracking-widest">Investment</div>
                              <div className="text-sm font-mono font-bold text-white">{card.invest}</div>
                            </div>
                            <button
                              className="w-10 h-10 rounded-full bg-[#13362B] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg border border-[#C8AA7A]"
                            >
                              <ArrowRight className="w-4.5 h-4.5 text-[#C8AA7A]" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="mt-4 h-1.5 rounded-full bg-[#E2DDD6] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#8C6D3B]"
                        animate={{ width: `${((idx + 1) / total) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-mono text-[#5A5852] font-medium">Scroll through space verticals</span>
                      <span className="text-xs font-mono font-bold text-[#8C6D3B]">
                        {idx + 1} of {total}
                      </span>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── COL 3: Right info panel (xl only - Theme Aligned Warm Card) ──────────────────── */}
              <div className="hidden xl:flex flex-col justify-between py-7 px-6 border-l border-[#E2DDD6] bg-[#FAF8F4] overflow-hidden">
                <div>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed tracking-wide">
                    Scroll through our six dedicated space verticals — each crafted with precision material engineering and bespoke design philosophy.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`sp-${idx}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#8C6D3B]">
                      {card.category} · {card.badge}
                    </div>

                    <div className="h-px bg-gradient-to-r from-[#8C6D3B] to-transparent" />

                    <p className="text-xs text-[#1A1917] font-light leading-relaxed bg-white p-4 rounded-2xl border border-[#E2DDD6] shadow-xs">
                      {card.specs}
                    </p>

                    <div className="rounded-2xl p-4 border border-[#D4C3A3] bg-[#F5EFDF]">
                      <div className="text-[10px] font-mono text-[#8C6D3B] uppercase font-bold tracking-widest mb-1">
                        Investment Range
                      </div>
                      <div className="font-mono font-extrabold text-xl text-[#13362B]">
                        {card.invest}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="space-y-3">
                  <a
                    href="#/contact"
                    className="w-full py-3.5 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider bg-[#13362B] text-white flex items-center justify-center gap-2 transition-all hover:bg-[#0E271F] shadow-md cursor-pointer"
                  >
                    <span>DISCUSS YOUR PROJECT</span>
                    <ArrowRight className="w-4 h-4 text-[#C8AA7A]" />
                  </a>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {AVATARS.map((s, i) => (
                        <img key={i} src={s} alt="" className="w-5 h-5 rounded-full ring-2 ring-white object-cover" />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[#5A5852] font-semibold">500+ happy clients</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── BOTTOM STATS BAR (Theme Aligned Deep Forest Green Bar) ────────────────────────── */}
            <div className="shrink-0 border-t border-[#C8AA7A]/20 bg-[#13362B] text-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-10 py-3.5">
                <div className="flex items-center justify-between gap-6 overflow-x-auto">
                  {[
                    { icon: Building2, val: '500+', label: 'Homes Delivered' },
                    { icon: Trophy, val: '100%', label: 'On-Time Guarantee' },
                    { icon: Users, val: '10 Yrs', label: 'Material Warranty' },
                    { icon: Clock, val: '45 Days', label: 'Turnkey Execution' },
                    { icon: Flame, val: 'Zero', label: 'Hidden Costs' },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 shrink-0">
                        <Icon className="w-4 h-4 shrink-0 text-[#C8AA7A]" />
                        <div>
                          <div className="font-mono text-sm font-extrabold text-white leading-none">{s.val}</div>
                          <div className="text-[10px] font-mono text-[#D4C3A3] uppercase font-semibold tracking-wider mt-1">{s.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── BEFORE/AFTER MODAL ──────────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <div
            className="fixed inset-0 z-50 bg-[#1A1917]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setModal(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-[28px] overflow-hidden shadow-2xl bg-[#FAF8F4] border border-[#E2DDD6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-[3px] bg-gradient-to-r from-transparent via-[#8C6D3B] to-transparent" />

              <div className="flex items-start justify-between p-6 sm:p-7">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2 bg-[#F5EFDF] text-[#8C6D3B] border border-[#D4C3A3]">
                    {modal.category} · {modal.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#13362B]">{modal.title}</h3>
                  <p className="text-sm text-[#5A5852] font-light mt-1">{modal.desc}</p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="p-2.5 rounded-full border border-[#E2DDD6] bg-white hover:bg-[#13362B] hover:text-white text-[#1A1917] transition-all shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 sm:px-7 pb-7 space-y-5 max-h-[60vh] overflow-y-auto">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-[#5A5852] mb-2">
                    <span>← Drag to reveal transformation →</span>
                    <span className="text-[#8C6D3B] font-bold">{modal.invest}</span>
                  </div>
                  <BeforeAfterSlider beforeImage={modal.beforeImg} afterImage={modal.afterImg} />
                </div>
                <div className="p-5 rounded-2xl border border-[#D4C3A3] bg-[#F5EFDF]">
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-2 font-bold text-[#8C6D3B]">
                    Architectural Specifications
                  </div>
                  <p className="text-sm text-[#1A1917] font-light leading-relaxed">{modal.specs}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
