import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, RefreshCw, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DesignQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    vibe: '',
    focus: '',
    material: '',
    email: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      question: 'Which atmosphere speaks to your architectural soul?',
      key: 'vibe',
      options: [
        { label: 'Organic Warmth & Minimal Sand', desc: 'Soft ivory curves, travertine stone, and ambient indirect illumination.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
        { label: 'Monolithic Brutalist Luxury', desc: 'Dark espresso oak, honed graphite marble, and double-height ceiling voids.', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
        { label: 'Cyber-Glass & Anodized Bronze', desc: 'Sleek glassmorphism, floating brass rings, and smart IoT louvers.', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80' },
        { label: 'Heritage Revival Neoclassic', desc: 'Intricate crown moldings, herringbone parquet, and crystal chandeliers.', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    {
      question: 'What is your primary spatial priority?',
      key: 'focus',
      options: [
        { label: 'Panoramic View Living Horizon', desc: 'Floor-to-ceiling minimal glass framing nature or skyline views.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
        { label: 'Subterranean Wine & Art Sanctuary', desc: 'Acoustic-padded subterranean gallery with climate control.', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
        { label: 'Wellness Hydro-Spa & Infinity Pool', desc: 'Indoor reflection pool, sauna, and heated travertine loungers.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    {
      question: 'Select your preferred dominant material finish:',
      key: 'material',
      options: [
        { label: 'Italian Calacatta Oro Marble', desc: 'Warm golden veining quarried in Tuscany.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
        { label: 'Smoked Oak & Brushed Brass', desc: 'Acoustic warmth meets refined metallic precision.', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
        { label: 'Venetian Satin Plaster', desc: 'Hand-troweled velvet wall sheen.', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80' },
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        colors: ['#A88B57', '#1B4D3E', '#1A1917'],
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ vibe: '', focus: '', material: '', email: '' });
    setIsCompleted(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <div className="double-bezel relative overflow-hidden">
        <div className="double-bezel-inner p-8 sm:p-12 bg-white/90 shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1A1917]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A88B57]/10 border border-[#A88B57]/30 text-xs font-mono text-[#8C6D3B] uppercase tracking-wider mb-2 font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive Persona Matcher</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-normal">
                Discover Your <span className="italic text-gold-gradient">Design DNA</span>
              </h2>
            </div>

            {!isCompleted && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#5A5852]">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <div className="w-24 h-2 bg-[#1A1917]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A88B57] transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {!isCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-[#1A1917] font-medium">
                  {steps[currentStep].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {steps[currentStep].options.map((opt, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(steps[currentStep].key, opt.label)}
                      className="group p-4 rounded-2xl border border-[#1A1917]/10 bg-white hover:border-[#A88B57] hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
                      data-cursor="SELECT"
                    >
                      <img src={opt.img} alt={opt.label} className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                      <div>
                        <h4 className="font-serif text-base text-[#1A1917] font-medium group-hover:text-[#8C6D3B] transition-colors">{opt.label}</h4>
                        <p className="text-xs text-[#5A5852] font-light mt-1 leading-snug">{opt.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#13362B] text-white flex items-center justify-center mx-auto shadow-xl">
                <UserCheck className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3B] font-bold block mb-1">Your Curated Design Profile</span>
                <h3 className="font-serif text-3xl text-[#1A1917] font-medium">
                  {answers.vibe || 'Organic Warmth & Minimal Sand'}
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#1A1917]/10 max-w-lg mx-auto text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-[#1A1917]/10 pb-2">
                  <span className="text-[#5A5852]">Aesthetic Vibe:</span>
                  <span className="font-bold text-[#1A1917]">{answers.vibe}</span>
                </div>
                <div className="flex justify-between border-b border-[#1A1917]/10 pb-2">
                  <span className="text-[#5A5852]">Spatial Focus:</span>
                  <span className="font-bold text-[#1A1917]">{answers.focus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5852]">Dominant Finish:</span>
                  <span className="font-bold text-[#8C6D3B]">{answers.material}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1917] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#8C6D3B] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </motion.section>
  );
};
