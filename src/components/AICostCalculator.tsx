import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Sparkles, Check, ChevronDown, ChevronUp, Plus, Minus, 
  User, Phone, Mail, MapPin, Download, Calendar, ArrowRight, ArrowLeft, 
  ShieldCheck, RefreshCw, Layers, Home, Armchair, Utensils, Bed, Bath,
  CheckSquare, Square, Ruler, Sparkle, Zap, Paintbrush, Box
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataStore } from '../services/dataStore';
import type { RoomDimensionItem, ServiceScopeItem } from '../services/dataStore';
import { generateQuotationPDF } from '../utils/quotationPdfGenerator';

interface AICostCalculatorProps {
  onOpenBooking: () => void;
}

type BHKType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5 BHK+';
type PackageTier = 'Economy' | 'Luxury' | 'Premium';

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

const DIMENSION_PRESETS = [
  { label: '10 × 10 ft', length: 10, width: 10, sqft: 100 },
  { label: '10 × 12 ft', length: 10, width: 12, sqft: 120 },
  { label: '12 × 12 ft', length: 12, width: 12, sqft: 144 },
  { label: '12 × 14 ft', length: 12, width: 14, sqft: 168 },
];

export const AICostCalculator: React.FC<AICostCalculatorProps> = ({ onOpenBooking }) => {
  // 1: BHK, 2: Room Counts & Measurements, 3: Package Tier & Scope, 4: Personal Details, 5: Quote
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedBHK, setSelectedBHK] = useState<BHKType>('2 BHK');
  const [expandedBHK, setExpandedBHK] = useState<BHKType | null>('2 BHK');

  const [rooms, setRooms] = useState<RoomCounts>({
    livingRoom: 1,
    kitchen: 1,
    bedroom: 2,
    bathroom: 2,
    dining: 1,
  });

  // Room Dimension Schedule
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensionItem[]>([
    { id: 'dim-living', roomName: 'Living Room', length: 14, width: 12, sqft: 168, preset: 'Custom' },
    { id: 'dim-bed-1', roomName: 'Master Bedroom', length: 12, width: 14, sqft: 168, preset: '12 × 14 ft' },
    { id: 'dim-bed-2', roomName: 'Bedroom 2', length: 10, width: 12, sqft: 120, preset: '10 × 12 ft' },
    { id: 'dim-kitchen', roomName: 'Modular Kitchen', length: 10, width: 8, sqft: 80, preset: 'Custom' },
    { id: 'dim-dining', roomName: 'Dining Area', length: 10, width: 10, sqft: 100, preset: '10 × 10 ft' },
    { id: 'dim-bath-1', roomName: 'Master Bathroom', length: 7, width: 6, sqft: 42, preset: 'Custom' },
    { id: 'dim-bath-2', roomName: 'Common Bathroom', length: 6, width: 6, sqft: 36, preset: 'Custom' },
  ]);

  // Package Tier (Exact Rates: Economy = 1000, Luxury = 1200, Premium = 1500)
  const [packageTier, setPackageTier] = useState<PackageTier>('Luxury');

  // Service Scope Checkboxes
  const [serviceScope, setServiceScope] = useState<ServiceScopeItem>({
    furniture: true,
    painting: true,
    electrical: true,
    falseCeiling: true,
  });

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: '',
    city: 'Kolkata',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quotationId, setQuotationId] = useState<string>('');
  const [hasDownloadedPDF, setHasDownloadedPDF] = useState<boolean>(false);

  // BHK standard room initialization
  const applyBHKDefaults = (bhk: BHKType) => {
    setSelectedBHK(bhk);
    let bedCount = 1;
    let bathCount = 1;

    if (bhk === '1 BHK') { bedCount = 1; bathCount = 1; }
    else if (bhk === '2 BHK') { bedCount = 2; bathCount = 2; }
    else if (bhk === '3 BHK') { bedCount = 3; bathCount = 2; }
    else if (bhk === '4 BHK') { bedCount = 4; bathCount = 3; }
    else if (bhk === '5 BHK+') { bedCount = 5; bathCount = 4; }

    const newRooms: RoomCounts = {
      livingRoom: 1,
      kitchen: 1,
      bedroom: bedCount,
      bathroom: bathCount,
      dining: 1,
    };
    setRooms(newRooms);
    rebuildRoomDimensions(newRooms);
  };

  const rebuildRoomDimensions = (currentRooms: RoomCounts) => {
    const list: RoomDimensionItem[] = [];
    if (currentRooms.livingRoom > 0) {
      for (let i = 1; i <= currentRooms.livingRoom; i++) {
        list.push({
          id: `dim-living-${i}`,
          roomName: currentRooms.livingRoom > 1 ? `Living Room ${i}` : 'Living Room',
          length: 14,
          width: 12,
          sqft: 168,
          preset: 'Custom',
        });
      }
    }
    if (currentRooms.bedroom > 0) {
      for (let i = 1; i <= currentRooms.bedroom; i++) {
        const name = i === 1 ? 'Master Bedroom' : `Bedroom ${i}`;
        const preset = i === 1 ? '12 × 14 ft' : '10 × 12 ft';
        const length = i === 1 ? 12 : 10;
        const width = i === 1 ? 14 : 12;
        list.push({
          id: `dim-bed-${i}`,
          roomName: name,
          length,
          width,
          sqft: length * width,
          preset,
        });
      }
    }
    if (currentRooms.kitchen > 0) {
      list.push({
        id: `dim-kitchen-1`,
        roomName: 'Modular Kitchen',
        length: 10,
        width: 8,
        sqft: 80,
        preset: 'Custom',
      });
    }
    if (currentRooms.dining > 0) {
      list.push({
        id: `dim-dining-1`,
        roomName: 'Dining Area',
        length: 10,
        width: 10,
        sqft: 100,
        preset: '10 × 10 ft',
      });
    }
    if (currentRooms.bathroom > 0) {
      for (let i = 1; i <= currentRooms.bathroom; i++) {
        list.push({
          id: `dim-bath-${i}`,
          roomName: i === 1 ? 'Master Bathroom' : `Bathroom ${i}`,
          length: 7,
          width: 6,
          sqft: 42,
          preset: 'Custom',
        });
      }
    }
    setRoomDimensions(list);
  };

  const updateRoomCount = (roomKey: keyof RoomCounts, delta: number) => {
    const updated = {
      ...rooms,
      [roomKey]: Math.max(0, rooms[roomKey] + delta),
    };
    setRooms(updated);
    rebuildRoomDimensions(updated);
  };

  const handleDimensionChange = (id: string, length: number, width: number, preset: string = 'Custom') => {
    const safeL = Math.max(1, length || 1);
    const safeW = Math.max(1, width || 1);
    setRoomDimensions(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, length: safeL, width: safeW, sqft: safeL * safeW, preset }
          : item
      )
    );
  };

  const handlePresetSelect = (id: string, presetLabel: string) => {
    const found = DIMENSION_PRESETS.find(p => p.label === presetLabel);
    if (found) {
      handleDimensionChange(id, found.length, found.width, found.label);
    }
  };

  // Calculations
  const getTotalArea = (): number => {
    return roomDimensions.reduce((acc, curr) => acc + curr.sqft, 0);
  };

  const getTierRate = (): number => {
    switch (packageTier) {
      case 'Economy': return 1000;
      case 'Luxury': return 1200;
      case 'Premium': return 1500;
      default: return 1200;
    }
  };

  const FALSE_CEILING_RATE = 120; // ₹120 per sq.ft

  const calculateTotal = (): number => {
    const totalArea = getTotalArea();
    const baseRate = getTierRate();

    // Scope weight adjustment if some elements deselected
    let scopeMultiplier = 0;
    if (serviceScope.furniture) scopeMultiplier += 0.65;
    if (serviceScope.painting) scopeMultiplier += 0.20;
    if (serviceScope.electrical) scopeMultiplier += 0.15;

    // Base interior turnkey cost
    const baseWoodworkAndFinishes = totalArea * baseRate * scopeMultiplier;

    // False Ceiling cost (@ ₹120 per sq.ft)
    const falseCeilingArea = serviceScope.falseCeiling ? Math.round(totalArea * 0.85) : 0;
    const falseCeilingCost = falseCeilingArea * FALSE_CEILING_RATE;

    const total = baseWoodworkAndFinishes + falseCeilingCost;
    return Math.max(150000, Math.round(total / 1000) * 1000);
  };

  const totalInvestment = calculateTotal();
  const totalCarpet = getTotalArea();
  const falseCeilingSqft = serviceScope.falseCeiling ? Math.round(totalCarpet * 0.85) : 0;
  const falseCeilingCost = falseCeilingSqft * FALSE_CEILING_RATE;
  const estimatedWeeks = Math.max(4, Math.round(totalCarpet / 150) + (packageTier === 'Premium' ? 3 : 1));

  const allScopeSelected =
    serviceScope.furniture &&
    serviceScope.painting &&
    serviceScope.electrical &&
    serviceScope.falseCeiling;

  const toggleAllScope = () => {
    const targetState = !allScopeSelected;
    setServiceScope({
      furniture: targetState,
      painting: targetState,
      electrical: targetState,
      falseCeiling: targetState,
    });
  };

  // Submit Details
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

    const generatedQuoteId = `DQ-${Date.now().toString().slice(-6)}`;
    setQuotationId(generatedQuoteId);

    try {
      dataStore.addLead({
        quotationId: generatedQuoteId,
        name: userDetails.name.trim(),
        email: userDetails.email.trim() || `${userDetails.phone}@client.deinterio.com`,
        phone: userDetails.phone.trim(),
        type: `${selectedBHK} (${packageTier} Tier @ ₹${getTierRate()}/sq.ft)`,
        budget: `₹${(calculateTotal() / 100000).toFixed(2)} Lakhs`,
        city: userDetails.city || 'Kolkata',
        status: 'NEW',
        details: `${roomDimensions.length} spaces measured (${totalCarpet} sq.ft total). Tier: ${packageTier}. False ceiling: ${serviceScope.falseCeiling ? `${falseCeilingSqft} sq.ft` : 'No'}`,
        carpetArea: `${totalCarpet} sq.ft`,
        packageTier: packageTier,
        ratePerSqft: getTierRate(),
        totalAreaSqft: totalCarpet,
        falseCeilingSqft,
        falseCeilingCost,
        rooms: { ...rooms },
        roomDimensions: [...roomDimensions],
        serviceScope: { ...serviceScope },
        estimatedAmount: `₹${calculateTotal().toLocaleString('en-IN')}`,
        notes: `Custom measurements: ${roomDimensions.map(r => `${r.roomName}: ${r.length}x${r.width}=${r.sqft}sq.ft`).join(', ')}. Scope: ${Object.entries(serviceScope).filter(([, v]) => v).map(([k]) => k).join(', ')}`,
      });
    } catch (err) {
      console.warn('Could not record lead:', err);
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#A88B57', '#D4AF37', '#13362B', '#1A1917'],
    });
  };

  const handleDownloadQuotation = () => {
    const quoteNum = quotationId || `DQ-${Date.now().toString().slice(-6)}`;
    if (!quotationId) setQuotationId(quoteNum);

    generateQuotationPDF({
      quotationId: quoteNum,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      clientName: userDetails.name.trim() || 'Valued Homeowner',
      clientPhone: userDetails.phone.trim() || '+91 98300 XXXXX',
      clientEmail: userDetails.email.trim() || undefined,
      city: userDetails.city || 'Kolkata',
      bhkType: selectedBHK,
      carpetArea: `${totalCarpet} sq.ft`,
      packageTier: packageTier,
      ratePerSqft: getTierRate(),
      totalAreaSqft: totalCarpet,
      falseCeilingSqft,
      falseCeilingCost,
      rooms: { ...rooms },
      roomDimensions: [...roomDimensions],
      serviceScope: { ...serviceScope },
      estimatedWeeks: estimatedWeeks,
      totalAmountFormatted: `₹${(calculateTotal() / 100000).toFixed(2)} Lakhs (₹${calculateTotal().toLocaleString('en-IN')})`,
    });

    setHasDownloadedPDF(true);

    try {
      const leads = dataStore.getLeads();
      const currentLead = leads.find(l => l.quotationId === quoteNum || l.phone === userDetails.phone.trim());
      if (currentLead) {
        dataStore.updateLeadStatus(currentLead.id, 'QUOTATION_SENT', 'Client downloaded official PDF quotation');
      }
    } catch (err) {
      console.warn('Error updating lead status:', err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setHasDownloadedPDF(false);
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
          <span>DEINTERIO TURNKEY ESTIMATOR</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1A1917]">
          Calculate Your <span className="italic text-gold-gradient">Home Interior Rate</span>
        </h2>
        <p className="text-sm text-[#5A5852] font-light leading-relaxed max-w-xl mx-auto">
          Specify exact room square footage, select materials tier (Economy, Luxury, Premium), and customize service scope.
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
            { num: 2, label: 'Measurements' },
            { num: 3, label: 'Tier & Scope' },
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select your apartment layout</h3>
                <p className="text-xs text-[#5A5852] font-light">Choose your BHK to configure room counts and dimensions</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
                {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'] as BHKType[]).map((type) => {
                  const isSelected = selectedBHK === type;
                  const startingPrice = 
                    type === '1 BHK' ? 'Starting from ₹2.00 Lakhs' :
                    type === '2 BHK' ? 'Starting from ₹3.50 Lakhs' :
                    type === '3 BHK' ? 'Starting from ₹6.50 Lakhs' :
                    type === '4 BHK' ? 'Starting from ₹9.50 Lakhs' :
                    'Starting from ₹12.50 Lakhs';

                  return (
                    <button
                      key={type}
                      onClick={() => applyBHKDefaults(type)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#13362B] border-[#13362B] text-white shadow-lg scale-[1.02]'
                          : 'bg-white border-[#1A1917]/10 text-[#1A1917] hover:border-[#A88B57]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="font-serif text-lg font-bold">{type}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-[#D4AF37]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#13362B]" />}
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C6D3B]'}`}>
                        {startingPrice}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-end pt-4 border-t border-[#1A1917]/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-full bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#0D241D] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>NEXT: ROOM MEASUREMENTS</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ROOM MEASUREMENTS & SQFT SELECTION */}
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Specify Room Dimensions & Square Footage</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  Pick preset measurements (10×10, 10×12, 12×14) or customize Length × Width in feet
                </p>
              </div>

              {/* Room Counters Bar */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#1A1917]/10 max-w-2xl mx-auto flex flex-wrap items-center justify-around gap-2 text-xs font-mono">
                <span className="font-bold text-[#13362B] flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#D4AF37]" /> Rooms Included:
                </span>
                <span className="px-2 py-1 rounded bg-[#FAF8F3] border">{rooms.livingRoom} Living</span>
                <span className="px-2 py-1 rounded bg-[#FAF8F3] border">{rooms.bedroom} Bed</span>
                <span className="px-2 py-1 rounded bg-[#FAF8F3] border">{rooms.kitchen} Kitchen</span>
                <span className="px-2 py-1 rounded bg-[#FAF8F3] border">{rooms.dining} Dining</span>
                <span className="px-2 py-1 rounded bg-[#FAF8F3] border">{rooms.bathroom} Bath</span>
              </div>

              {/* Room Measurement Cards List */}
              <div className="space-y-3 max-w-2xl mx-auto max-h-[50vh] overflow-y-auto pr-1">
                {roomDimensions.map((room) => (
                  <div
                    key={room.id}
                    className="p-4 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-sm hover:border-[#A88B57]/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1917]/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        <strong className="font-serif text-base text-[#1A1917]">{room.roomName}</strong>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[#5A5852]">Calculated Area:</span>
                        <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-white font-bold text-sm">
                          {room.sqft} sq.ft
                        </span>
                      </div>
                    </div>

                    {/* Dimension Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Presets */}
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#5A5852] block mb-1">Preset Dimension:</label>
                        <select
                          value={room.preset || 'Custom'}
                          onChange={(e) => handlePresetSelect(room.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#1A1917]/15 text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                        >
                          <option value="Custom">Custom (Manual Entry)</option>
                          {DIMENSION_PRESETS.map(p => (
                            <option key={p.label} value={p.label}>{p.label} ({p.sqft} sq.ft)</option>
                          ))}
                        </select>
                      </div>

                      {/* Manual L x W inputs */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] font-mono uppercase text-[#5A5852] block mb-1">Length (ft):</label>
                          <input
                            type="number"
                            min="4"
                            max="60"
                            value={room.length}
                            onChange={(e) => handleDimensionChange(room.id, Number(e.target.value), room.width, 'Custom')}
                            className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#1A1917]/15 text-xs font-mono text-center font-bold text-[#13362B]"
                          />
                        </div>
                        <span className="text-[#5A5852] font-mono pt-4">×</span>
                        <div className="flex-1">
                          <label className="text-[10px] font-mono uppercase text-[#5A5852] block mb-1">Width (ft):</label>
                          <input
                            type="number"
                            min="4"
                            max="60"
                            value={room.width}
                            onChange={(e) => handleDimensionChange(room.id, room.length, Number(e.target.value), 'Custom')}
                            className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#1A1917]/15 text-xs font-mono text-center font-bold text-[#13362B]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Area Live Summary */}
              <div className="p-4 rounded-2xl bg-[#13362B] text-white flex items-center justify-between max-w-2xl mx-auto shadow-md">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] block font-bold">Total Measured Carpet</span>
                  <span className="font-serif text-xl font-bold">{totalCarpet} sq.ft</span>
                </div>
                <div className="text-right text-xs font-mono text-white/80">
                  <span>Across {roomDimensions.length} designated areas</span>
                </div>
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
                  <span>NEXT: TIER & SCOPE</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PACKAGE QUALITY & SERVICE SCOPE SELECTION */}
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select Package Tier & Scope of Work</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  Choose your sq.ft finish rate and check the specific services you require
                </p>
              </div>

              {/* 3-Tier Rates Selection */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C6D3B] font-bold block mb-3 text-center">
                  Select Finish Quality Grade (Per Sq.Ft Rate)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      tier: 'Economy' as PackageTier,
                      rate: 1000,
                      tag: 'Value Standard',
                      desc: 'ISI 710 Hardwood BWP Plywood, Ebco/Godrej hardware, 0.8mm laminates.',
                    },
                    {
                      tier: 'Luxury' as PackageTier,
                      rate: 1200,
                      tag: 'Popular Choice',
                      desc: 'Century Sainik 710 BWP Marine Plywood, Hettich soft-close, 1mm laminates.',
                    },
                    {
                      tier: 'Premium' as PackageTier,
                      rate: 1500,
                      tag: 'Turnkey Luxury',
                      desc: 'Century Club Prime 710 BWP, Hafele/Blum fittings, PU Polish & Acrylic.',
                    },
                  ].map((item) => {
                    const isSelected = packageTier === item.tier;

                    return (
                      <div
                        key={item.tier}
                        onClick={() => setPackageTier(item.tier)}
                        className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#13362B] border-[#13362B] text-white shadow-xl ring-2 ring-[#D4AF37] scale-[1.02]'
                            : 'bg-white border-[#1A1917]/10 hover:border-[#A88B57]/50 text-[#1A1917]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif text-lg font-bold">{item.tier}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#D4AF37] text-[#13362B] font-bold' : 'bg-gray-100 text-gray-600'}`}>
                              {item.tag}
                            </span>
                          </div>

                          <div className="my-2">
                            <span className={`font-serif text-2xl font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-[#13362B]'}`}>
                              ₹{item.rate.toLocaleString('en-IN')}
                            </span>
                            <span className={`text-xs font-mono ml-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>/ sq.ft</span>
                          </div>

                          <p className={`text-[11px] font-light leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#5A5852]'}`}>
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 text-center">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C6D3B]'}`}>
                            {isSelected ? '✓ SELECTED TIER' : 'CLICK TO SELECT'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service Scope Checkboxes */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1917]/10 pb-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1A1917]">Select Scope of Services</h4>
                    <p className="text-xs text-[#5A5852] font-mono">Tick which services you want included in your quote</p>
                  </div>
                  <button
                    onClick={toggleAllScope}
                    className="px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#A88B57]/30 text-xs font-mono font-bold text-[#8C6D3B] hover:bg-[#13362B] hover:text-white transition-all cursor-pointer"
                  >
                    {allScopeSelected ? 'Deselect All' : 'Select All (Complete Turnkey)'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Furniture */}
                  <label
                    onClick={() => setServiceScope(prev => ({ ...prev, furniture: !prev.furniture }))}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      serviceScope.furniture
                        ? 'bg-[#13362B]/5 border-[#13362B] text-[#13362B]'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {serviceScope.furniture ? <CheckSquare className="w-4 h-4 text-[#13362B]" /> : <Square className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div>
                      <strong className="text-xs font-serif block text-[#1A1917]">Modular Furniture & Woodwork</strong>
                      <span className="text-[11px] font-mono text-[#5A5852]">Wardrobes, TV units, Modular Kitchen, Beds & Storage</span>
                    </div>
                  </label>

                  {/* Painting */}
                  <label
                    onClick={() => setServiceScope(prev => ({ ...prev, painting: !prev.painting }))}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      serviceScope.painting
                        ? 'bg-[#13362B]/5 border-[#13362B] text-[#13362B]'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {serviceScope.painting ? <CheckSquare className="w-4 h-4 text-[#13362B]" /> : <Square className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div>
                      <strong className="text-xs font-serif block text-[#1A1917]">Wall Painting & Polishing</strong>
                      <span className="text-[11px] font-mono text-[#5A5852]">Asian Paints Royale Luxury Emulsion + Primer & Putty</span>
                    </div>
                  </label>

                  {/* Electrical */}
                  <label
                    onClick={() => setServiceScope(prev => ({ ...prev, electrical: !prev.electrical }))}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      serviceScope.electrical
                        ? 'bg-[#13362B]/5 border-[#13362B] text-[#13362B]'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {serviceScope.electrical ? <CheckSquare className="w-4 h-4 text-[#13362B]" /> : <Square className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div>
                      <strong className="text-xs font-serif block text-[#1A1917]">Electrical & Lighting Work</strong>
                      <span className="text-[11px] font-mono text-[#5A5852]">Concealed wiring, modular switches, LED spots & coves</span>
                    </div>
                  </label>

                  {/* False Ceiling */}
                  <label
                    onClick={() => setServiceScope(prev => ({ ...prev, falseCeiling: !prev.falseCeiling }))}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      serviceScope.falseCeiling
                        ? 'bg-[#13362B]/5 border-[#13362B] text-[#13362B]'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {serviceScope.falseCeiling ? <CheckSquare className="w-4 h-4 text-[#13362B]" /> : <Square className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-serif text-[#1A1917]">Designer False Ceiling</strong>
                        <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#8C6D3B] text-[10px] font-mono font-bold">₹120 / sq.ft</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#5A5852]">
                        Gyproc Saint-Gobain boards ({falseCeilingSqft} sq.ft ~ ₹{falseCeilingCost.toLocaleString('en-IN')})
                      </span>
                    </div>
                  </label>
                </div>
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Receive Your Official Quotation</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  Your customized estimation is calculated. Enter your contact details to generate and download the quotation.
                </p>
              </div>

              {/* Live Mini Preview */}
              <div className="p-4 rounded-2xl bg-white border border-[#1A1917]/10 max-w-md mx-auto space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Configuration:</span>
                  <strong>{selectedBHK} ({totalCarpet} sq.ft)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Finish Tier:</span>
                  <strong className="text-[#8C6D3B]">{packageTier} (₹{getTierRate()}/sq.ft)</strong>
                </div>
                {serviceScope.falseCeiling && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">False Ceiling:</span>
                    <strong>{falseCeilingSqft} sq.ft @ ₹120/sq.ft (₹{falseCeilingCost.toLocaleString('en-IN')})</strong>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 text-[#13362B] font-bold text-sm">
                  <span>Estimated Total:</span>
                  <span>₹{(totalInvestment / 100000).toFixed(2)} Lakhs</span>
                </div>
              </div>

              <form onSubmit={handleSubmitDetails} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C6D3B] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Sourav Mukherjee"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white border text-xs font-mono text-[#1A1917] focus:outline-none transition-all ${
                        formErrors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-[#1A1917]/15 focus:border-[#13362B]'
                      }`}
                    />
                  </div>
                  {formErrors.name && <p className="text-[11px] text-red-500 font-mono mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C6D3B] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 98300 12345"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white border text-xs font-mono text-[#1A1917] focus:outline-none transition-all ${
                        formErrors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-[#1A1917]/15 focus:border-[#13362B]'
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-500 font-mono mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C6D3B] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. sourav@example.com"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#1A1917]/15 text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5">
                    Property Location in Kolkata
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C6D3B] absolute left-4 top-1/2 -translate-y-1/2" />
                    <select
                      value={userDetails.city}
                      onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#1A1917]/15 text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    >
                      <option value="South Kolkata (Ballygunge, Alipore, New Alipore)">South Kolkata (Ballygunge, Alipore)</option>
                      <option value="New Town & Rajarhat (Action Area 1/2/3)">New Town & Rajarhat</option>
                      <option value="Salt Lake (Sector 1-5)">Salt Lake (Sector 1-5)</option>
                      <option value="EM Bypass & Garia">EM Bypass & Garia</option>
                      <option value="North Kolkata (Dum Dum, Shyambazar)">North Kolkata</option>
                      <option value="Howrah & Hooghly">Howrah & Hooghly</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#13362B] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0D241D] transition-all shadow-xl cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>VIEW OFFICIAL QUOTATION</span>
                  </button>
                </div>
              </form>

              <div className="flex justify-start pt-2 border-t border-[#1A1917]/10">
                <button
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
                  <div><span className="text-[#5A5852]">BHK Layout:</span> {selectedBHK}</div>
                  <div><span className="text-[#5A5852]">Package Tier:</span> {packageTier} (₹{getTierRate()}/sq.ft)</div>
                  <div><span className="text-[#5A5852]">Total Area:</span> {totalCarpet} sq.ft</div>
                  <div><span className="text-[#5A5852]">Timeline:</span> ~{estimatedWeeks} Weeks</div>
                  {serviceScope.falseCeiling && (
                    <div className="col-span-2 text-emerald-800">
                      <span className="text-[#5A5852]">False Ceiling:</span> {falseCeilingSqft} sq.ft @ ₹120/sq.ft (₹{falseCeilingCost.toLocaleString('en-IN')})
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#1A1917]/10">
                  <span className="text-[11px] font-mono text-[#5A5852] block mb-1">Measured Rooms:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {roomDimensions.map(d => (
                      <span key={d.id} className="px-2 py-0.5 rounded-md bg-[#FAF8F3] text-[10px] font-mono text-[#13362B] font-bold border border-[#13362B]/20">
                        {d.roomName}: {d.length}×{d.width} ({d.sqft} sq.ft)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A1917]/10">
                  <span className="text-[11px] font-mono text-[#5A5852] block mb-1">Service Scope Included:</span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {serviceScope.furniture && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Furniture</span>}
                    {serviceScope.painting && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Painting</span>}
                    {serviceScope.electrical && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Electrical</span>}
                    {serviceScope.falseCeiling && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ False Ceiling (@ ₹120)</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={handleDownloadQuotation}
                  className="w-full py-4 px-6 rounded-full bg-[#D4AF37] hover:bg-[#C29B28] text-[#13362B] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 text-[#13362B]" />
                  <span>{hasDownloadedPDF ? 'DOWNLOAD PDF QUOTATION AGAIN' : 'DOWNLOAD PDF QUOTATION'}</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
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

                {hasDownloadedPDF && (
                  <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-lg text-center mt-1 flex items-center justify-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official Quotation #{quotationId} generated & recorded in client consultation registry.</span>
                  </p>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </motion.section>
  );
};
