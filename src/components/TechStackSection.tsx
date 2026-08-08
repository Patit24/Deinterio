import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Cpu, 
  Eye, 
  Wifi, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Check, 
  RotateCcw,
  Target,
  Play,
  Sliders,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Letter-by-letter 3D flip text reveal component
const LetterRevealText: React.FC<{ text: string; className?: string; isGold?: boolean }> = ({ text, className, isGold }) => {
  const letters = text.split('');
  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ perspective: '1000px' }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block whitespace-pre ${isGold ? 'relative text-[#A88B57] italic' : ''}`}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Feature Card Component matching exact design
const TechCard: React.FC<{
  num: string;
  title: string;
  desc: string;
  icon: any;
  delay: number;
}> = ({ num, title, desc, icon: Icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50, rotateX: 8, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -12,
        scale: 1.03,
        rotateX: 4,
        rotateY: 4,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative bg-white/95 rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#1A1917]/5 flex flex-col justify-between h-[340px] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-[#A88B57]/40"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      data-cursor="TECH"
    >
      {/* Radial Spotlight Light Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(168, 139, 87, 0.12), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10 space-y-5">
        {/* Soft Gold Icon Container */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
          className="w-14 h-14 rounded-2xl bg-[#F7F3EB] border border-[#E8DFC9] flex items-center justify-center text-[#A88B57] group-hover:rotate-[8deg] group-hover:bg-[#A88B57] group-hover:text-white transition-all duration-300 shadow-sm"
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        {/* Card Title & Description */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-[#1A1917] font-normal leading-tight group-hover:text-[#A88B57] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-[#6B6862] font-light leading-relaxed tracking-wide">
            {desc}
          </p>
        </div>
      </div>

      {/* Card Footer: Odometer Label & Accent Line */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#1A1917]/5">
        <motion.span 
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          className="font-mono text-xs font-bold text-[#A88B57]"
        >
          {num}
        </motion.span>

        <div className="w-10 h-[2px] bg-[#1A1917]/10 overflow-hidden rounded-full">
          <div className="w-full h-full bg-[#A88B57] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

export const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Quiz State inside Discover Your Design DNA
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Parallax Scroll Offsets
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const houseY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Mouse tilt handler for 3D model
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 8, // Max 4deg tilt
      y: (clientY / innerHeight - 0.5) * 8,
    });
  };

  const techFeatures = [
    {
      num: '01',
      icon: ShieldCheck,
      title: 'Fixed Price Promise',
      desc: 'No hidden costs. Every quotation is itemized with complete price transparency. No surprises.',
    },
    {
      num: '02',
      icon: Eye,
      title: 'Live Site Camera & Updates',
      desc: 'Watch your renovation progress from anywhere. Weekly photos, videos, progress reports & milestone approvals.',
    },
    {
      num: '03',
      icon: Target,
      title: 'Dedicated Architect & PM',
      desc: 'One architect. One project manager. One dedicated WhatsApp group for complete accountability.',
    },
    {
      num: '04',
      icon: FileCheck,
      title: 'Material Transparency Vault',
      desc: 'Every plywood, laminate, fitting, and invoice verified and visible inside your personal client dashboard.',
    },
  ];

  const quizSteps = [
    {
      question: 'What best describes your ideal home?',
      options: ['Modern & Minimal', 'Warm & Contemporary', 'Classic & Timeless', 'Luxury & Opulent'],
    },
    {
      question: 'Which spatial feature is most important to you?',
      options: ['Open Layout & Daylight', 'Acoustic Privacy & Study', 'Custom Modular Kitchen', 'Integrated IoT Telemetry'],
    },
    {
      question: 'What material finish aligns with your aesthetic?',
      options: ['Italian Calacatta Marble', 'Fluted Teak Wood', 'Satin Venetian Plaster', 'Anodized Brushed Brass'],
    },
  ];

  const handleSelectQuizOption = (opt: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentStep]: opt });
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsQuizFinished(true);
      confetti({
        particleCount: 90,
        spread: 70,
        colors: ['#A88B57', '#13362B', '#1A1917'],
      });
    }
  };

  return (
    <motion.section
      id="services"
      ref={sectionRef}
      onMouseMove={handleContainerMouseMove}
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden text-[#1A1917] bg-[#F7F5F0]"
    >
      {/* Background Architectural Contour Lines Accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none opacity-20 bg-no-repeat bg-contain" style={{ backgroundImage: `radial-gradient(circle at bottom left, rgba(168,139,87,0.3), transparent 70%)` }} />

      {/* SECTION TOP HEADER: EYEBROW, HEADLINE & 3D VILLA SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
        
        {/* Left Editorial Header (6 Cols) */}
        <motion.div style={{ y: headlineY }} className="lg:col-span-6 space-y-6">
          
          {/* Eyebrow Badge & Gold Bar */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#A88B57] block">
              POWERED BY INNOVATION. DESIGNED FOR PERFECTION.
            </span>
            <div className="w-12 h-[2px] bg-[#A88B57]" />
          </div>

          {/* Headline Reveal */}
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-normal tracking-tight leading-[1.08] text-[#1A1917]">
            <LetterRevealText text="Architectural " />
            <LetterRevealText text="Technology Stack" isGold />
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-[#6B6862] font-light max-w-xl leading-relaxed tracking-wide"
          >
            Fusing classical Italian design principles with cutting-edge spatial computing and smart home telemetry.
          </motion.p>
        </motion.div>

        {/* Right 3D Villa Render + Floating IoT Sensor Nodes + Live Telemetry Panel (6 Cols) */}
        <motion.div 
          style={{ y: houseY }}
          className="lg:col-span-6 relative flex items-center justify-center min-h-[380px]"
        >
          {/* SVG Dotted Orbital Rings & Connection Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
            <circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(168, 139, 87, 0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(168, 139, 87, 0.15)" strokeWidth="1.5" strokeDasharray="4 8" />
          </svg>

          {/* Floating 3D Villa Cutout Render */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/isometric_3d_villa_cutout.png"
              alt="Isometric 3D Architectural Villa Model Cutout"
              className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
            />

            {/* Floating IoT Nodes around Villa */}
            {[
              { top: '15%', left: '20%', label: 'Smart Air' },
              { top: '25%', left: '78%', label: 'IoT Sensor' },
              { top: '65%', left: '15%', label: 'Audio Node' },
              { top: '75%', left: '82%', label: 'Security' },
            ].map((node, idx) => (
              <motion.div
                key={idx}
                style={{ top: node.top, left: node.left }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                className="absolute z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#A88B57] text-[#8C6D3B] flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#A88B57] hover:text-white transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#A88B57]" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Dark Telemetry Dashboard Display */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-4 -right-2 sm:right-2 z-30 p-5 rounded-2xl bg-[#1C1D1F] text-white backdrop-blur-xl border border-white/10 shadow-2xl space-y-3 w-60 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-[10px] text-[#A88B57] font-bold">
                <Activity className="w-3.5 h-3.5 animate-spin text-[#A88B57]" /> LIVE TELEMETRY
              </span>
              <span className="text-[9px] bg-[#13362B] text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">🌡️ 24°C</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-white/60">Airflow Vectors:</span>
                <span className="font-bold text-white">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">IoT Telemetry:</span>
                <span className="font-bold text-[#A88B57]">0.04ms</span>
              </div>
            </div>

            {/* Live Chart Line Simulation */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '92%' }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-[#A88B57] to-[#D4AF37]"
              />
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* MIDDLE ROW: 4 WHITE ROUNDED FEATURE CARDS (01, 02, 03, 04) */}
      <motion.div style={{ y: cardsY }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {techFeatures.map((item, idx) => (
          <TechCard
            key={item.num}
            num={item.num}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            delay={idx * 0.15}
          />
        ))}
      </motion.div>

      {/* BOTTOM FULL-WIDTH CONTAINER: DISCOVER YOUR DESIGN DNA & QUIZ */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-white/95 rounded-[36px] border border-[#1A1917]/5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-6 sm:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & CTAs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3EB] border border-[#E8DFC9] text-xs font-mono text-[#8C6D3B] uppercase tracking-wider font-semibold">
              <Target className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>INTERACTIVE PERSONA MATCHER</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl text-[#1A1917] font-normal leading-tight">
              Discover Your <span className="italic text-[#A88B57]">Design DNA</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
              Help us understand your lifestyle, tastes, and aspirations so we can craft spaces that reflect your true essence.
            </p>

            {/* 3 Value Icons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1A1917]">
                <div className="w-8 h-8 rounded-full bg-[#F7F3EB] border border-[#E8DFC9] flex items-center justify-center text-[#A88B57]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Personalized Experience</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#1A1917]">
                <div className="w-8 h-8 rounded-full bg-[#F7F3EB] border border-[#E8DFC9] flex items-center justify-center text-[#A88B57]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Tailored Recommendations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest shadow-xl hover:bg-[#0D241D] transition-all duration-300"
              >
                <span>START THE JOURNEY</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white border border-[#1A1917]/10 text-[#1A1917] text-xs font-mono font-semibold uppercase tracking-wider hover:border-[#A88B57] transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-[#A88B57] fill-current" />
                <span>HOW IT WORKS</span>
              </motion.button>
            </div>
          </div>

          {/* Middle Column: Generated High-Res 3D Isometric Floor Plan Render (4 Cols) */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, rotateX: 12 }}
              whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="relative w-full max-w-[420px] flex items-center justify-center"
            >
              <img
                src="/isometric_smart_floorplan.png"
                alt="Isometric 3D Smart Floor Plan"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Right Column: Quiz Options Panel (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FAF8F3] border border-[#1A1917]/5 space-y-6">
            
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1917]">
                {!isQuizFinished ? `Step ${currentStep + 1} of ${quizSteps.length}` : 'Persona Complete'}
              </span>

              <div className="w-32 h-2 bg-[#1A1917]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#A88B57]"
                  initial={{ width: '0%' }}
                  animate={{ width: isQuizFinished ? '100%' : `${((currentStep + 1) / quizSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Step Question & Options */}
            {!isQuizFinished ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h4 className="font-serif text-lg text-[#1A1917] font-normal">
                    {quizSteps[currentStep].question}
                  </h4>

                  <div className="space-y-2.5">
                    {quizSteps[currentStep].options.map((opt, idx) => {
                      const isSelected = selectedAnswers[currentStep] === opt;
                      return (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs font-mono flex items-center justify-between transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-[#1A1917] text-white border-[#1A1917] font-bold shadow-md'
                              : 'bg-white text-[#1A1917] border-[#1A1917]/10 hover:border-[#A88B57]'
                          }`}
                        >
                          <span>{opt}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#A88B57] bg-[#A88B57]' : 'border-[#1A1917]/30'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#13362B] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h4 className="font-serif text-xl text-[#1A1917] font-normal">Design DNA Profile Ready!</h4>
                <p className="text-xs font-mono text-[#6B6862]">Your architectural recommendations have been computed.</p>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setSelectedAnswers({});
                    setIsQuizFinished(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1917] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#8C6D3B] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Persona Quiz</span>
                </button>
              </motion.div>
            )}

          </div>

        </div>
      </motion.div>

    </motion.section>
  );
};
