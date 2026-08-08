import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Sparkles, Check, ChevronDown, ChevronUp, Plus, Minus, 
  User, Phone, Mail, MapPin, Download, Calendar, ArrowRight, ArrowLeft, 
  ShieldCheck, RefreshCw, Layers, Home, Armchair, Utensils, Bed, Bath
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AICostCalculatorProps {
  onOpenBooking: () => void;
}

type BHKType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5 BHK+';
type BHKSize = 'Small' | 'Large';
type PackageTier = 'Essentials' | 'Premium' | 'Luxury';

interface RoomCounts {
  livingRoom: number;
  kitchen: number;
  bedroom: number;
  bathroom: number;
  dining: number;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  city: string;
}

export const AICostCalculator: React.FC<AICostCalculatorProps> = ({ onOpenBooking }) => {
  // Step State: 1: BHK, 2: Rooms, 3: Package, 4: Personal Details, 5: Price Result
  const [step, setStep] = useState<number>(1);

  // Form Selections
  const [selectedBHK, setSelectedBHK] = useState<BHKType>('2 BHK');
  const [expandedBHK, setExpandedBHK] = useState<BHKType | null>('2 BHK');
  const [selectedSize, setSelectedSize] = useState<BHKSize>('Small');

  const [rooms, setRooms] = useState<RoomCounts>({
    livingRoom: 1,
    kitchen: 1,
    bedroom: 2,
    bathroom: 2,
    dining: 1,
  });

  const [packageTier, setPackageTier] = useState<PackageTier>('Premium');

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: '',
    city: 'Kolkata',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // BHK Definitions & Size Details
  const bhkOptions: { type: BHKType; smallArea: string; largeArea: string }[] = [
    { type: '1 BHK', smallArea: 'Below 500 sq ft', largeArea: 'Above 500 sq ft' },
    { type: '2 BHK', smallArea: 'Below 800 sq ft', largeArea: 'Above 800 sq ft' },
    { type: '3 BHK', smallArea: 'Below 1200 sq ft', largeArea: 'Above 1200 sq ft' },
    { type: '4 BHK', smallArea: 'Below 1800 sq ft', largeArea: 'Above 1800 sq ft' },
    { type: '5 BHK+', smallArea: 'Below 2500 sq ft', largeArea: 'Above 2500 sq ft' },
  ];

  // Room Increment/Decrement
  const updateRoomCount = (room: keyof RoomCounts, delta: number) => {
    setRooms((prev) => ({
      ...prev,
      [room]: Math.max(0, prev[room] + delta),
    }));
  };

  // Price Calculation Logic
  const getEstimatedArea = (): number => {
    switch (selectedBHK) {
      case '1 BHK': return selectedSize === 'Small' ? 450 : 650;
      case '2 BHK': return selectedSize === 'Small' ? 750 : 950;
      case '3 BHK': return selectedSize === 'Small' ? 1150 : 1450;
      case '4 BHK': return selectedSize === 'Small' ? 1750 : 2200;
      case '5 BHK+': return selectedSize === 'Small' ? 2600 : 3500;
      default: return 900;
    }
  };

  const getBaseRate = (): number => {
    switch (packageTier) {
      case 'Essentials': return 1250;
      case 'Premium': return 1850;
      case 'Luxury': return 2600;
    }
  };

  const calculateTotal = (): number => {
    const area = getEstimatedArea();
    const rate = getBaseRate();
    const roomMultiplier = 
      rooms.livingRoom * 140000 + 
      rooms.kitchen * 160000 + 
      rooms.bedroom * 110000 + 
      rooms.bathroom * 55000 + 
      rooms.dining * 75000;

    const baseCost = area * rate;
    const rawTotal = baseCost + roomMultiplier * 0.45;
    return Math.round(rawTotal / 5000) * 5000;
  };

  const totalInvestment = calculateTotal();
  const estimatedWeeks = Math.round((getEstimatedArea() / 140) + (packageTier === 'Luxury' ? 3 : 1));

  // Form Validation & Submission
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};

    if (!userDetails.name.trim()) errors.name = 'Please enter your full name';
    if (!userDetails.phone.trim() || userDetails.phone.length < 10) errors.phone = 'Please enter a valid 10-digit mobile number';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);
    setStep(5);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#A88B57', '#D4AF37', '#13362B', '#1A1917'],
    });
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
  };

  return (
    <motion.section
      id="calculator"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-4 sm:px-8 max-w-7xl mx-auto text-[#1A1917]"
    >
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-12 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1A1917]/10 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8C6D3B] shadow-sm">
          <Calculator className="w-3.5 h-3.5 text-[#A88B57]" />
          <span>TURNKEY INTERIOR ESTIMATOR</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1A1917]">
          Calculate Your <span className="italic text-gold-gradient">Home Interior Rate</span>
        </h2>
        <p className="text-sm text-[#5A5852] font-light leading-relaxed max-w-xl mx-auto">
          Get an instant, customized interior valuation tailored to your home layout & material preferences across Kolkata.
        </p>
      </motion.div>

      {/* Stepper Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#1A1917]/10 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-[#A88B57] -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {[
            { num: 1, label: 'BHK Type' },
            { num: 2, label: 'Rooms' },
            { num: 3, label: 'Package' },
            { num: 4, label: 'Details' },
            { num: 5, label: 'Quote' },
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => {
                  if (s.num < step || isSubmitted) setStep(s.num);
                }}
                disabled={s.num > step && !isSubmitted}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                  step === s.num
                    ? 'bg-[#13362B] text-white shadow-lg scale-110 border-2 border-[#D4AF37]'
                    : step > s.num
                    ? 'bg-[#A88B57] text-white'
                    : 'bg-white border border-[#1A1917]/20 text-[#5A5852]'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4 text-white" /> : s.num}
              </button>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5852] mt-2 hidden sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator Container */}
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#FDFBF7] to-[#F4F0E6] rounded-[32px] border border-white/80 shadow-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#A88B57]/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          
          {/* STEP 1: BHK TYPE SELECTION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select your BHK type</h3>
                <p className="text-xs text-[#5A5852] font-light">Choose your apartment layout and carpet size preference</p>
              </div>

              <div className="space-y-3 max-w-xl mx-auto">
                {bhkOptions.map((item) => {
                  const isSelected = selectedBHK === item.type;
                  const isExpanded = expandedBHK === item.type;

                  return (
                    <div 
                      key={item.type}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isSelected 
                          ? 'bg-white border-[#A88B57] shadow-md' 
                          : 'bg-white/80 border-[#1A1917]/10 hover:border-[#A88B57]/50'
                      }`}
                    >
                      {/* Main Accordion Header */}
                      <button
                        onClick={() => {
                          setSelectedBHK(item.type);
                          setExpandedBHK(isExpanded ? null : item.type);
                        }}
                        className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#A88B57] bg-[#A88B57]/10' : 'border-[#1A1917]/30'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#A88B57]" />}
                          </div>
                          <span className="font-serif text-lg text-[#1A1917] font-medium">{item.type}</span>
                        </div>
                        <div className="text-[#5A5852]">
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-[#A88B57]" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {/* Expanded Sub-option (Small vs Large) */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 pt-1 grid grid-cols-2 gap-3 border-t border-[#1A1917]/5 bg-[#FAF8F3]/50"
                        >
                          {(['Small', 'Large'] as BHKSize[]).map((size) => {
                            const isSizeSelected = isSelected && selectedSize === size;
                            const areaLabel = size === 'Small' ? item.smallArea : item.largeArea;

                            return (
                              <button
                                key={size}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBHK(item.type);
                                  setSelectedSize(size);
                                }}
                                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                                  isSizeSelected
                                    ? 'bg-[#13362B] border-[#13362B] text-white shadow-sm'
                                    : 'bg-white border-[#1A1917]/10 text-[#1A1917] hover:border-[#A88B57]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-serif font-semibold">{size}</span>
                                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSizeSelected ? 'border-white bg-white' : 'border-[#1A1917]/30'}`}>
                                    {isSizeSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#13362B]" />}
                                  </div>
                                </div>
                                <span className={`text-[10px] font-mono block ${isSizeSelected ? 'text-white/80' : 'text-[#5A5852]'}`}>
                                  {areaLabel}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-end pt-4 border-t border-[#1A1917]/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#0D241D] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>NEXT: ROOM SELECTION</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ROOM COUNTER SELECTION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select the rooms you’d like us to design</h3>
                <p className="text-xs text-[#5A5852] font-light">Customize the exact quantity of rooms in your renovation plan</p>
              </div>

              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { key: 'livingRoom' as keyof RoomCounts, label: 'Living Room', icon: Armchair },
                  { key: 'kitchen' as keyof RoomCounts, label: 'Kitchen', icon: Utensils },
                  { key: 'bedroom' as keyof RoomCounts, label: 'Bedroom', icon: Bed },
                  { key: 'bathroom' as keyof RoomCounts, label: 'Bathroom', icon: Bath },
                  { key: 'dining' as keyof RoomCounts, label: 'Dining Area', icon: Home },
                ].map((room) => {
                  const IconComponent = room.icon;
                  const count = rooms[room.key];

                  return (
                    <div
                      key={room.key}
                      className="p-4 rounded-2xl bg-white border border-[#1A1917]/10 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#A88B57]/20 flex items-center justify-center text-[#8C6D3B]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-serif text-base text-[#1A1917] font-medium">{room.label}</span>
                      </div>

                      {/* Counter Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateRoomCount(room.key, -1)}
                          disabled={count === 0}
                          className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#1A1917]/15 flex items-center justify-center text-[#1A1917] hover:bg-[#13362B] hover:text-white disabled:opacity-30 disabled:hover:bg-[#FAF8F3] disabled:hover:text-[#1A1917] transition-all cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-lg text-[#13362B]">
                          {count}
                        </span>
                        <button
                          onClick={() => updateRoomCount(room.key, 1)}
                          className="w-9 h-9 rounded-full bg-[#13362B] text-white flex items-center justify-center hover:bg-[#A88B57] transition-all cursor-pointer shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1917]/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full bg-white border border-[#1A1917]/15 text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider hover:border-[#A88B57] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#0D241D] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>NEXT: PACKAGE TIER</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PACKAGE QUALITY SELECTION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select your interior package tier</h3>
                <p className="text-xs text-[#5A5852] font-light">Choose from our curated material standards and finish quality</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    tier: 'Essentials' as PackageTier,
                    priceTag: '₹₹',
                    desc: 'A range of essential home interior solutions perfect for all your basic needs.',
                    features: ['Affordable pricing', 'Convenient modular designs', 'CenturyPly 710 Grade'],
                    imgUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400',
                  },
                  {
                    tier: 'Premium' as PackageTier,
                    priceTag: '₹₹₹',
                    desc: 'Superior home interior solutions that take your interiors to the next level.',
                    features: ['Mid-range luxury pricing', 'Customized space planning', 'Hettich German Hardware'],
                    imgUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400',
                  },
                  {
                    tier: 'Luxury' as PackageTier,
                    priceTag: '₹₹₹₹',
                    desc: 'Opulent, bespoke interior architecture tailored for grand residences.',
                    features: ['Bespoke heritage wood', 'Italian Marble flooring', 'Hafele & Blum Systems'],
                    imgUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400',
                  },
                ].map((item) => {
                  const isSelected = packageTier === item.tier;

                  return (
                    <div
                      key={item.tier}
                      onClick={() => setPackageTier(item.tier)}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#A88B57] shadow-xl ring-2 ring-[#A88B57]/30 scale-[1.02]'
                          : 'bg-white/80 border-[#1A1917]/10 hover:border-[#A88B57]/40'
                      }`}
                    >
                      <div>
                        {/* Header & Radio */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#A88B57] bg-[#A88B57]' : 'border-[#1A1917]/30'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="font-serif text-lg font-bold text-[#1A1917]">{item.tier}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#8C6D3B]">{item.priceTag}</span>
                        </div>

                        <p className="text-[11px] text-[#5A5852] font-light leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        {/* Image Preview */}
                        <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3] relative">
                          <img src={item.imgUrl} alt={item.tier} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Checklist */}
                        <ul className="space-y-2">
                          {item.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[11px] text-[#1A1917]">
                              <Check className="w-3.5 h-3.5 text-[#13362B] shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1A1917]/5 text-center">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-[#13362B]' : 'text-[#5A5852]'}`}>
                          {isSelected ? '✓ SELECTED TIER' : 'CLICK TO SELECT'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1917]/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-white border border-[#1A1917]/15 text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider hover:border-[#A88B57] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#0D241D] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>NEXT: SUBMIT DETAILS</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PERSONAL DETAILS SUBMISSION FORM */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Submit Details to Unlock Price</h3>
                <p className="text-xs text-[#5A5852] font-light">Provide your contact info to calculate your exact turnkey valuation</p>
              </div>

              <form onSubmit={handleSubmitDetails} className="space-y-4 max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#1A1917]/10 shadow-sm">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8C6D3B]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anirban Das"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-all ${
                      formErrors.name ? 'border-red-500 bg-red-50/50' : 'border-[#1A1917]/15 focus:border-[#A88B57] bg-[#FAF8F3]'
                    }`}
                  />
                  {formErrors.name && <p className="text-[10px] text-red-500 font-mono">{formErrors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8C6D3B]" />
                    <span>Mobile Phone *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-all ${
                      formErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-[#1A1917]/15 focus:border-[#A88B57] bg-[#FAF8F3]'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-500 font-mono">{formErrors.phone}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8C6D3B]" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. anirban@example.com"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#1A1917]/15 focus:border-[#A88B57] bg-[#FAF8F3] text-sm font-sans focus:outline-none"
                  />
                </div>

                {/* City / Property Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8C6D3B]" />
                    <span>Project Location / City</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alipore, Kolkata"
                    value={userDetails.city}
                    onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#1A1917]/15 focus:border-[#A88B57] bg-[#FAF8F3] text-sm font-sans focus:outline-none"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#B59258] via-[#D4AF37] to-[#B59258] text-[#1A1917] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>SUBMIT & REVEAL PRICE QUOTE</span>
                  </button>
                </div>
              </form>

              {/* Navigation Footer */}
              <div className="flex items-center justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-white border border-[#1A1917]/15 text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider hover:border-[#A88B57] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: FINAL REVEALED PRICE QUOTE RESULT */}
          {step === 5 && isSubmitted && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#13362B]/10 border border-[#13362B]/20 text-xs font-mono font-bold uppercase text-[#13362B]">
                <Check className="w-3.5 h-3.5 text-[#13362B]" />
                <span>OFFICIAL ESTIMATION GENERATED FOR {userDetails.name.toUpperCase()}</span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3B] block font-bold mb-1">
                  Estimated Turnkey Investment
                </span>

                <div className="font-serif text-4xl sm:text-6xl font-normal text-[#13362B]">
                  ₹{(totalInvestment / 100000).toFixed(2)} <span className="text-2xl text-[#A88B57]">Lakhs</span>
                </div>

                <p className="text-xs font-mono text-[#5A5852] mt-1">
                  ₹{totalInvestment.toLocaleString('en-IN')} Total Valuation (Inclusive of GST & Execution)
                </p>
              </div>

              {/* Selected Summary Breakdown Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#1A1917]/10 text-left space-y-4 max-w-md mx-auto shadow-sm">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C6D3B] font-bold border-b border-[#1A1917]/10 pb-2">
                  Project Configuration Summary
                </h4>

                <div className="grid grid-cols-2 gap-y-2 text-xs font-mono text-[#1A1917]">
                  <div><span className="text-[#5A5852]">BHK Layout:</span> {selectedBHK} ({selectedSize})</div>
                  <div><span className="text-[#5A5852]">Package Tier:</span> {packageTier}</div>
                  <div><span className="text-[#5A5852]">Est. Carpet:</span> {getEstimatedArea()} sq.ft</div>
                  <div><span className="text-[#5A5852]">Timeline:</span> ~{estimatedWeeks} Weeks</div>
                </div>

                <div className="pt-2 border-t border-[#1A1917]/10">
                  <span className="text-[11px] font-mono text-[#5A5852] block mb-1">Rooms Included:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rooms.livingRoom > 0 && <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">{rooms.livingRoom} Living</span>}
                    {rooms.kitchen > 0 && <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">{rooms.kitchen} Kitchen</span>}
                    {rooms.bedroom > 0 && <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">{rooms.bedroom} Bedroom</span>}
                    {rooms.bathroom > 0 && <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">{rooms.bathroom} Bath</span>}
                    {rooms.dining > 0 && <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">{rooms.dining} Dining</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-full bg-[#13362B] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-[#0D241D] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>BOOK SITE VISIT</span>
                </button>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto py-4 px-6 rounded-full bg-white border border-[#1A1917]/20 text-[#1A1917] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-[#A88B57] transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#A88B57]" />
                  <span>RECALCULATE</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </motion.section>
  );
};

