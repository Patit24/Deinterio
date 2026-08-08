import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Check, X, Building2, Home, Utensils,
  Landmark, ShoppingBag, GraduationCap, Trophy, Users, Clock,
  Flame, Box, ShieldCheck, Gem, TrendingUp
} from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

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
    accent: '#C9A84C',
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
    accent: '#E07B39',
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
    accent: '#6AADA3',
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
    accent: '#D4AF37',
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
    accent: '#6B9E71',
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
    specs: 'Ground-up luxury structural execution, private courtyards, automated swimming pool decks, double-height grand dining salons, and imported Italian travertine facade elevations.',
    invest: '₹50L – ₹3.5Cr',
    accent: '#B59258',
    type: 'widgets' as const,
    widgets: [
      { label: 'Villas', val: '75+', icon: Home, hi: true },
      { label: 'Spa', val: 'Pvt.', icon: Sparkles, hi: false },
      { label: 'Stone', val: 'Tuscan', icon: Gem, hi: false },
      { label: 'IoT', val: 'Full', icon: Box, hi: false },
    ],
  },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
];

type Card = typeof CARDS[0];

/* ─────────────────────────────────────────────────────────────────────── */
/*  CARD MIDDLE WIDGET                                                      */
/* ─────────────────────────────────────────────────────────────────────── */
const CardMid: React.FC<{ card: Card }> = ({ card }) => {
  if (card.type === 'widgets' && card.widgets) {
    return (
      <div className="grid grid-cols-4 gap-2.5">
        {card.widgets.map((w, i) => {
          const Icon = w.icon;
          return (
            <div
              key={i}
              className={`rounded-xl p-3 flex flex-col gap-2 ${
                w.hi
                  ? 'bg-white shadow-xl'
                  : 'bg-black/50 border border-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${w.hi ? 'text-amber-600' : 'text-white/60'}`} />
              <div>
                <div className={`text-[10px] font-mono uppercase tracking-wider mb-0.5 ${w.hi ? 'text-amber-700' : 'text-white/40'}`}>
                  {w.label}
                </div>
                <div className={`text-sm font-bold font-mono ${w.hi ? 'text-gray-900' : 'text-white'}`}>
                  {w.val}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (card.type === 'tags' && card.tags) {
    return (
      <div className="flex flex-wrap gap-2">
        {card.tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-900 text-[11px] font-mono font-semibold shadow-md"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[8px] shrink-0">✓</span>
            {tag}
          </span>
        ))}
      </div>
    );
  }

  if (card.type === 'chart') {
    return (
      <div className="bg-black/50 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-white/70 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: card.accent }} />
            {card.chartLabel}
          </span>
          <span className="text-xl font-serif font-light" style={{ color: card.accent }}>
            {card.chartVal}
          </span>
        </div>
        <svg className="w-full h-12" viewBox="0 0 400 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`cg-${card.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={card.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={card.accent} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d="M0,38 C60,22 100,40 140,18 S220,3 260,28 S330,45 400,8 L400,50 L0,50Z" fill={`url(#cg-${card.id})`} />
          <path d="M0,38 C60,22 100,40 140,18 S220,3 260,28 S330,45 400,8" fill="none" stroke={card.accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return null;
};

/* ─────────────────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                                          */
/* ─────────────────────────────────────────────────────────────────────── */
export const MaterialsLibrary: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [modal, setModal] = useState<Card | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const total = CARDS.length;
  const card = CARDS[idx];

  // Cooldown flag — prevents multiple cards jumping on one scroll gesture
  const canSwitch = useRef(true);
  const cooldownMs = 700; // ms to wait before allowing next card switch

  const goTo = useCallback((nextIdx: number, newDir: number) => {
    if (!canSwitch.current) return;
    canSwitch.current = false;
    setDir(newDir);
    setIdx(nextIdx);
    setTimeout(() => { canSwitch.current = true; }, cooldownMs);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      // Only intercept when section is in the sticky viewport
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;

      const going = e.deltaY > 0 ? 1 : -1;

      if (going === 1 && idx < total - 1) {
        e.preventDefault();
        goTo(idx + 1, 1);
      } else if (going === -1 && idx > 0) {
        e.preventDefault();
        goTo(idx - 1, -1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [idx, total, goTo]);

  const cardVariants = {
    // Cards slide from bottom (down scroll) or top (up scroll)
    enter: (d: number) => ({ y: d > 0 ? '80%' : '-80%', opacity: 0, scale: 0.94 }),
    show: {
      y: '0%', opacity: 1, scale: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }
    },
    exit: (d: number) => ({
      y: d > 0 ? '-20%' : '20%', opacity: 0, scale: 1.03,
      transition: { duration: 0.5, ease: [0.4, 0, 0.6, 1] as [number,number,number,number] }
    }),
  };

  const scrollTo = (i: number) => {
    if (!sectionRef.current) return;
    const top = sectionRef.current.offsetTop;
    // Jump to 40% into the target card's zone for reliable triggering
    const step = sectionRef.current.offsetHeight / total;
    window.scrollTo({ top: top + step * (i + 0.4), behavior: 'smooth' });
  };

  return (
    <section id="materials" className="relative" style={{ background: '#0D0D0D' }}>

      {/* SCROLL TRACK */}
      {/* Each card occupies 100vh — one wheel scroll triggers the next card */}
      <div ref={sectionRef} style={{ height: `${total * 100}vh` }} className="relative">

        {/* STICKY SHELL */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

          {/* ── TOP HEADER BAR ──────────────────────────────────────────── */}
          <div className="shrink-0 flex items-center justify-between px-6 lg:px-10 py-4 border-b border-white/[0.06]" style={{ background: '#0D0D0D' }}>
            {/* Left: label + heading */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: card.accent }} />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/80 font-semibold">
                  Architectural Verticals
                </span>
              </div>
              <h2 className="font-serif text-xl lg:text-2xl font-normal text-white">
                Interiors Designed for{' '}
                <span className="italic font-normal text-gold-gradient" style={{ color: card.accent }}>Every Lifestyle</span>
              </h2>
            </div>

            {/* Right: counter pill */}
            <div className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-full border text-xs font-mono font-bold text-white"
                style={{ borderColor: `${card.accent}50`, background: `${card.accent}15` }}
              >
                {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* ── MAIN GRID ───────────────────────────────────────────────── */}
          <div className="flex-1 min-h-0 grid grid-cols-[64px_1fr] xl:grid-cols-[64px_1fr_280px] overflow-hidden">

            {/* ── COL 1: Vertical thumb rail ──────────────────────────── */}
            <div
              className="flex flex-col items-center justify-center gap-4 py-6 border-r border-white/[0.06]"
              style={{ background: '#080808' }}
            >
              {CARDS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => scrollTo(i)}
                  title={c.category}
                  className="relative flex flex-col items-center gap-1 group"
                >
                  {/* Thumb image */}
                  <div
                    className="overflow-hidden rounded-lg transition-all duration-300"
                    style={{
                      width: i === idx ? 38 : 28,
                      height: i === idx ? 48 : 36,
                      outline: i === idx ? `2px solid ${card.accent}` : '2px solid transparent',
                      outlineOffset: 2,
                      opacity: i === idx ? 1 : 0.35,
                    }}
                  >
                    <img src={c.image} alt={c.category} className="w-full h-full object-cover" />
                  </div>
                  {/* Number */}
                  <span
                    className="text-[9px] font-mono font-bold transition-all"
                    style={{ color: i === idx ? card.accent : 'rgba(255,255,255,0.2)' }}
                  >
                    {c.num}
                  </span>
                </button>
              ))}
            </div>

            {/* ── COL 2: Card viewport ────────────────────────────────── */}
            <div className="relative flex items-center justify-center p-5 lg:p-8 overflow-hidden">
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
                  {/* ── CARD SHELL ──────────────────────────────────────── */}
                  <div
                    className="relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                    style={{ height: 'min(68vh, 560px)' }}
                    onClick={() => setModal(card)}
                  >
                    {/* Background photo */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Strong gradient — no haziness */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.15) 100%)'
                    }} />

                    {/* Accent line at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
                    />

                    {/* ── CARD CONTENT — clean flex column ───────────────── */}
                    <div className="absolute inset-0 flex flex-col p-6 sm:p-7">

                      {/* ROW 1: Category + Badge (top) */}
                      <div className="flex items-center justify-between shrink-0">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur text-[11px] font-mono text-white/90">
                          {card.category}
                        </span>
                        <span
                          className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold"
                          style={{ background: `${card.accent}20`, border: `1px solid ${card.accent}50`, color: card.accent }}
                        >
                          {card.badge}
                        </span>
                      </div>

                      {/* SPACER */}
                      <div className="flex-1" />

                      {/* ROW 2: Widget / Tags / Chart (middle-bottom) */}
                      <div className="shrink-0 mb-5">
                        <CardMid card={card} />
                      </div>

                      {/* ROW 3: Title + description (above meta) */}
                      <div className="shrink-0 mb-4">
                        <h3 className="font-serif font-normal text-white leading-tight mb-1" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">{card.desc}</p>
                      </div>

                      {/* ROW 4: Meta strip (bottom) */}
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
                            <div className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest">Investment</div>
                            <div className="text-sm font-mono font-bold text-white">{card.invest}</div>
                          </div>
                          <button
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg"
                            style={{ background: card.accent }}
                          >
                            <ArrowRight className="w-4.5 h-4.5 text-black" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Below-card progress */}
                  <div className="mt-4 h-1 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: card.accent }}
                      animate={{ width: `${((idx + 1) / total) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-mono text-white/70 font-medium">Scroll to explore</span>
                    <span className="text-xs font-mono font-bold" style={{ color: card.accent }}>
                      {idx + 1} of {total}
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── COL 3: Right info panel (xl only) ──────────────────── */}
            <div
              className="hidden xl:flex flex-col justify-between py-7 px-6 border-l border-white/10 overflow-hidden"
              style={{ background: '#121316' }}
            >
              {/* Top: description */}
              <div>
                <p className="text-xs text-white/90 font-normal leading-relaxed tracking-wide">
                  Scroll through our six dedicated space verticals — each crafted with precision material engineering and bespoke design philosophy.
                </p>
              </div>

              {/* Middle: card specs */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`sp-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Category label */}
                  <div
                    className="text-xs font-mono uppercase tracking-[0.2em] font-bold"
                    style={{ color: card.accent }}
                  >
                    {card.category} · {card.badge}
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ background: `linear-gradient(90deg, ${card.accent}80, transparent)` }} />

                  {/* Specs */}
                  <p className="text-xs text-white/95 font-normal leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                    {card.specs}
                  </p>

                  {/* Investment box */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{ background: `${card.accent}18`, borderColor: `${card.accent}40` }}
                  >
                    <div className="text-[10px] font-mono text-white/80 uppercase font-bold tracking-widest mb-1">Investment Range</div>
                    <div className="font-mono font-extrabold text-xl text-white">
                      {card.invest}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom: CTA */}
              <div className="space-y-3">
                <a
                  href="#contact"
                  className="w-full py-3 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg cursor-pointer"
                  style={{ background: card.accent }}
                >
                  DISCUSS YOUR PROJECT <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {AVATARS.map((s, i) => (
                      <img key={i} src={s} alt="" className="w-5 h-5 rounded-full ring-2 ring-[#121316] object-cover" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-white/90 font-semibold">500+ happy clients</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── BOTTOM STATS BAR ────────────────────────────────────────── */}
          <div
            className="shrink-0 border-t border-white/10"
            style={{ background: '#121316' }}
          >
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
                      <Icon className="w-4 h-4 shrink-0" style={{ color: card.accent }} />
                      <div>
                        <div className="font-mono text-sm font-extrabold text-white leading-none">{s.val}</div>
                        <div className="text-[10px] font-mono text-white/80 uppercase font-semibold tracking-wider mt-1">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BEFORE/AFTER MODAL ──────────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 30 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="relative w-full max-w-3xl rounded-[28px] overflow-hidden shadow-2xl"
              style={{ background: '#111' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent top line */}
              <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${modal.accent}, transparent)` }} />

              {/* Header */}
              <div className="flex items-start justify-between p-6 sm:p-7">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2"
                    style={{ background: `${modal.accent}20`, color: modal.accent, border: `1px solid ${modal.accent}40` }}
                  >
                    {modal.category} · {modal.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">{modal.title}</h3>
                  <p className="text-sm text-white/40 mt-1">{modal.desc}</p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="p-2.5 rounded-full border border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-all mt-1 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 sm:px-7 pb-7 space-y-5 max-h-[60vh] overflow-y-auto">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-white/25 mb-2">
                    <span>← Drag to reveal transformation →</span>
                    <span style={{ color: modal.accent }}>{modal.invest}</span>
                  </div>
                  <BeforeAfterSlider beforeImage={modal.beforeImg} afterImage={modal.afterImg} />
                </div>
                <div
                  className="p-5 rounded-xl border"
                  style={{ background: `${modal.accent}08`, borderColor: `${modal.accent}25` }}
                >
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: modal.accent }}>
                    Architectural Specifications
                  </div>
                  <p className="text-sm text-white/55 font-light leading-relaxed">{modal.specs}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
