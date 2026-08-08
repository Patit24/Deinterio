import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, Star, MapPin, Smile, Home, Award, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { TiltCard } from './TiltCard';

export const VideoTestimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  // Client Stories Data
  const featuredStory = {
    id: 1,
    client: 'Anirban & Swati Sengupta',
    location: 'Uniworld City, New Town, Kolkata',
    duration: '02:15',
    lang: 'EN / BN',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
  };

  const stories = [
    {
      id: 2,
      client: 'Rajesh & Pooja Agarwal',
      location: 'Ballygunge Circular Road, Kolkata',
      duration: '01:45',
      lang: 'EN / HN',
      thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    {
      id: 3,
      client: 'Dr. Debasis Roy & Family',
      location: 'Salt Lake Sector III, Kolkata',
      duration: '02:30',
      lang: 'EN / BN',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
  ];

  // Client Avatars Stack for Featured Card
  const clientAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  ];

  // Press / As Seen In Logos
  const pressLogos = [
    { name: 'ARCHITECTURAL DIGEST', fontStyle: 'font-serif font-bold text-xs sm:text-sm tracking-widest' },
    { name: 'AD100', fontStyle: 'font-serif font-extrabold text-sm sm:text-base tracking-widest' },
    { name: 'ELLE DECOR', fontStyle: 'font-serif font-semibold text-xs sm:text-sm tracking-widest' },
    { name: 'designboom', fontStyle: 'font-sans font-bold text-xs sm:text-sm tracking-tighter' },
    { name: 'INTERIOR DESIGN', fontStyle: 'font-serif font-bold text-xs sm:text-sm tracking-wider' },
    { name: 'ARCHITECTURE TODAY', fontStyle: 'font-mono text-[10px] sm:text-xs tracking-wider font-bold' },
    { name: 'dezeen', fontStyle: 'font-sans font-extrabold text-xs sm:text-sm tracking-tight' },
  ];

  return (
    <section className="relative w-full bg-[#FAF8F3] py-20 lg:py-28 overflow-hidden" style={{ isolation: 'isolate' }}>
      
      {/* Background Soft Glow & Ambient Shadows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/60 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ROW 1: HEADER & FEATURED STORY HERO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Left Column: Header Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#8C6D3B] uppercase">
                CLIENT STORIES
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] text-[#1A1917] font-normal">
              Real Experiences. <br />
              <span className="italic text-[#A88B57]">Real Transformations.</span>
            </h2>

            <p className="text-sm text-[#5A5852] font-light leading-relaxed max-w-md">
              Heartfelt stories from our clients who trusted Deinterio to design and deliver their dream spaces.
            </p>

            {/* Watch All Reviews Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveVideo(featuredStory)}
                className="group inline-flex items-center gap-3.5 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A1917]/5 border border-[#1A1917]/10 flex items-center justify-center text-[#1A1917] group-hover:bg-[#13362B] group-hover:text-white transition-all shadow-sm">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#1A1917] uppercase group-hover:text-[#A88B57] transition-colors">
                  WATCH ALL REVIEWS →
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Featured Story Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <TiltCard 
              dataCursor="WATCH" 
              className="rounded-[32px] p-1 bg-gradient-to-br from-white via-white/60 to-[#D4AF37]/30 shadow-2xl overflow-hidden"
            >
              <div 
                onClick={() => setActiveVideo(featuredStory)}
                className="relative aspect-[16/9.5] sm:aspect-[16/9] rounded-[28px] overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={featuredStory.thumbnail}
                  alt={featuredStory.client}
                  className="w-full h-full object-cover hover-rotate-img"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[10px] font-mono font-bold tracking-widest text-[#1A1917] uppercase shadow-sm">
                    FEATURED STORY
                  </span>

                  <span className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90">
                    {featuredStory.duration} <span className="opacity-60 ml-1">{featuredStory.lang}</span>
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/85 backdrop-blur-md border border-white/80 text-[#1A1917] flex items-center justify-center shadow-2xl group-hover:bg-white group-hover:text-[#13362B] transition-all"
                  >
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                  </motion.div>
                </div>

                {/* Bottom Overlay Glass Card */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/70 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A1917] font-medium leading-tight">
                        {featuredStory.client}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#5A5852] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6D3B]" />
                        <span>{featuredStory.location}</span>
                      </div>
                    </div>

                    {/* Client Avatars Stack */}
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-2.5 overflow-hidden">
                        {clientAvatars.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Client Avatar"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-sm"
                          />
                        ))}
                      </div>
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAE5DA] border-2 border-white flex items-center justify-center text-[10px] font-mono font-bold text-[#1A1917] shadow-sm ml-1">
                        +12
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* ROW 2: 2 CARDS + 1 STATS COLUMN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Card 1: Rajesh & Pooja Agarwal */}
          {stories[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-4"
            >
              <TiltCard dataCursor="PLAY" className="rounded-[28px] p-1 bg-gradient-to-br from-white via-white/50 to-[#D4AF37]/20 shadow-xl overflow-hidden h-full">
                <div
                  onClick={() => setActiveVideo(stories[0])}
                  className="relative aspect-[4/3] rounded-[24px] overflow-hidden group cursor-pointer h-full flex flex-col justify-between p-5"
                >
                  {/* Background Image */}
                  <img
                    src={stories[0].thumbnail}
                    alt={stories[0].client}
                    className="absolute inset-0 w-full h-full object-cover hover-rotate-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[#A88B57] flex items-center justify-center shadow-sm">
                      <Quote className="w-4 h-4 fill-current" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90">
                      {stories[0].duration} <span className="opacity-60 ml-1">{stories[0].lang}</span>
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="relative z-10 flex items-center justify-center my-4">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-[#1A1917] flex items-center justify-center shadow-xl group-hover:bg-white transition-all"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </motion.div>
                  </div>

                  {/* Bottom Pill Card Overlay */}
                  <div className="relative z-10 p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 flex items-center justify-between gap-3 shadow-md">
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#1A1917] leading-tight">
                        {stories[0].client}
                      </h4>
                      <p className="text-[10px] font-mono text-[#5A5852] truncate mt-0.5">
                        {stories[0].location}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/90 border border-white flex items-center justify-center text-[#1A1917] shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* Card 2: Dr. Debasis Roy & Family */}
          {stories[1] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-4"
            >
              <TiltCard dataCursor="PLAY" className="rounded-[28px] p-1 bg-gradient-to-br from-white via-white/50 to-[#D4AF37]/20 shadow-xl overflow-hidden h-full">
                <div
                  onClick={() => setActiveVideo(stories[1])}
                  className="relative aspect-[4/3] rounded-[24px] overflow-hidden group cursor-pointer h-full flex flex-col justify-between p-5"
                >
                  {/* Background Image */}
                  <img
                    src={stories[1].thumbnail}
                    alt={stories[1].client}
                    className="absolute inset-0 w-full h-full object-cover hover-rotate-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[#A88B57] flex items-center justify-center shadow-sm">
                      <Quote className="w-4 h-4 fill-current" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90">
                      {stories[1].duration} <span className="opacity-60 ml-1">{stories[1].lang}</span>
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="relative z-10 flex items-center justify-center my-4">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-[#1A1917] flex items-center justify-center shadow-xl group-hover:bg-white transition-all"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </motion.div>
                  </div>

                  {/* Bottom Pill Card Overlay */}
                  <div className="relative z-10 p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 flex items-center justify-between gap-3 shadow-md">
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#1A1917] leading-tight">
                        {stories[1].client}
                      </h4>
                      <p className="text-[10px] font-mono text-[#5A5852] truncate mt-0.5">
                        {stories[1].location}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/90 border border-white flex items-center justify-center text-[#1A1917] shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* Column 3: Stats Box (Stacked Vertically) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4"
          >
            <div className="p-1 rounded-[28px] bg-gradient-to-br from-white via-white/60 to-[#D4AF37]/20 shadow-xl h-full">
              <div className="bg-[#FAF7F2]/90 backdrop-blur-xl rounded-[24px] border border-white/80 p-6 flex flex-col justify-between h-full space-y-4">
                
                {[
                  { icon: Smile, value: '200+', label: 'Happy Families' },
                  { icon: Home, value: '150+', label: 'Projects Completed' },
                  { icon: Award, value: '12+', label: 'Years of Excellence' },
                  { icon: Star, value: '4.9/5', label: 'Average Client Rating' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4 py-1">
                      <div className="w-11 h-11 rounded-full bg-white border border-[#1A1917]/10 flex items-center justify-center text-[#A88B57] shrink-0 shadow-xs icon-spin-hover">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-serif text-2xl lg:text-3xl text-[#1A1917] font-normal leading-none mb-1">
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-xs font-mono text-[#5A5852] font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </motion.div>

        </div>

        {/* ROW 3: AS SEEN IN PRESS LOGOS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-1 rounded-full bg-gradient-to-br from-white via-white/70 to-[#D4AF37]/20 shadow-md"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-full border border-white/80 py-4 px-6 sm:px-10 flex flex-wrap items-center justify-between gap-6">
            
            {/* Left Label */}
            <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#A88B57] uppercase border-r border-[#1A1917]/10 pr-6 shrink-0 hidden sm:block">
              AS SEEN IN
            </div>

            {/* Publication Logos */}
            <div className="flex flex-wrap items-center justify-around flex-1 gap-6 sm:gap-8">
              {pressLogos.map((logo, idx) => (
                <span
                  key={idx}
                  className={`text-[#1A1917]/65 hover:text-[#1A1917] transition-colors cursor-pointer ${logo.fontStyle}`}
                >
                  {logo.name}
                </span>
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1917]/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/60 backdrop-blur-md">
                <span className="text-xs font-mono text-white/90 font-bold">{activeVideo.client} — {activeVideo.location}</span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.client}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

