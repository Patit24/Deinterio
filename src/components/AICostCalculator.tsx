import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Sparkles, Check, Plus, Minus, 
  User, Phone, Mail, MapPin, Download, Calendar, ArrowRight, ArrowLeft, 
  Ruler, Zap, Paintbrush, Layers, Sparkle, RefreshCw, CheckCircle2,
  Tv, Wind, Flame, Refrigerator, ShieldCheck, FileText, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataStore } from '../services/dataStore';
import type { RoomDimensionItem, ElectricalPointsConfig, TradeBreakdownItem } from '../services/dataStore';
import { generateQuotationPDF } from '../utils/quotationPdfGenerator';

interface AICostCalculatorProps {
  onOpenBooking: () => void;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface SingleSpace {
  id: string;
  name: string;
  length: number;
  width: number;
  sqft: number;
  preset: string;
  isRemovable?: boolean;
}

const ROOM_PRESETS = [
  { label: '10 × 10 ft (100 sq.ft)', length: 10, width: 10, sqft: 100 },
  { label: '10 × 12 ft (120 sq.ft)', length: 10, width: 12, sqft: 120 },
  { label: '12 × 12 ft (144 sq.ft)', length: 12, width: 12, sqft: 144 },
  { label: '12 × 14 ft (168 sq.ft)', length: 12, width: 14, sqft: 168 },
  { label: '14 × 16 ft (224 sq.ft)', length: 14, width: 16, sqft: 224 },
];

const KITCHEN_PRESETS = [
  { label: '8 × 8 ft (64 sq.ft)', length: 8, width: 8, sqft: 64 },
  { label: '8 × 10 ft (80 sq.ft)', length: 8, width: 10, sqft: 80 },
  { label: '10 × 10 ft (100 sq.ft)', length: 10, width: 10, sqft: 100 },
  { label: '10 × 12 ft (120 sq.ft)', length: 10, width: 12, sqft: 120 },
];

const BATHROOM_PRESETS = [
  { label: '5 × 6 ft (30 sq.ft)', length: 5, width: 6, sqft: 30 },
  { label: '5 × 7 ft (35 sq.ft)', length: 5, width: 7, sqft: 35 },
  { label: '6 × 8 ft (48 sq.ft)', length: 6, width: 8, sqft: 48 },
];

const STAIR_PRESETS = [
  { label: 'Standard Flight 6 × 12 ft (72 sq.ft)', length: 6, width: 12, sqft: 72 },
  { label: 'Duplex Central 8 × 12 ft (96 sq.ft)', length: 8, width: 12, sqft: 96 },
  { label: 'Grand Villa 10 × 14 ft (140 sq.ft)', length: 10, width: 14, sqft: 140 },
];

export const AICostCalculator: React.FC<AICostCalculatorProps> = ({ onOpenBooking }) => {
  // Steps: 1: Spaces & Dimensions, 2: Trades & Rates, 3: Itemized BOQ, 4: Quote & Download
  const [step, setStep] = useState<number>(1);

  // ============================================================================
  // STEP 1: SPATIAL DIMENSIONS (Rooms, Kitchen, Bathrooms, Staircase, Living)
  // ============================================================================
  const [roomCount, setRoomCount] = useState<number>(2);
  const [rooms, setRooms] = useState<SingleSpace[]>([
    { id: 'room-1', name: 'Room 1', length: 12, width: 12, sqft: 144, preset: '12 × 12 ft (144 sq.ft)' },
    { id: 'room-2', name: 'Room 2', length: 10, width: 12, sqft: 120, preset: '10 × 12 ft (120 sq.ft)' },
  ]);

  const [hasLiving, setHasLiving] = useState<boolean>(true);
  const [livingSpace, setLivingSpace] = useState<SingleSpace>({
    id: 'living',
    name: 'Living & Hall Area',
    length: 14,
    width: 14,
    sqft: 196,
    preset: '14 × 14 ft (196 sq.ft)',
  });

  const [hasKitchen, setHasKitchen] = useState<boolean>(true);
  const [kitchenSpace, setKitchenSpace] = useState<SingleSpace>({
    id: 'kitchen',
    name: 'Modular Kitchen Space',
    length: 8,
    width: 10,
    sqft: 80,
    preset: '8 × 10 ft (80 sq.ft)',
  });

  const [bathroomCount, setBathroomCount] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<SingleSpace[]>([
    { id: 'bath-1', name: 'Bathroom 1', length: 5, width: 7, sqft: 35, preset: '5 × 7 ft (35 sq.ft)' },
    { id: 'bath-2', name: 'Bathroom 2', length: 5, width: 7, sqft: 35, preset: '5 × 7 ft (35 sq.ft)' },
  ]);

  const [hasStaircase, setHasStaircase] = useState<boolean>(false);
  const [staircaseSpace, setStaircaseSpace] = useState<SingleSpace>({
    id: 'staircase',
    name: 'Staircase / Internal Stairs',
    length: 6,
    width: 12,
    sqft: 72,
    preset: 'Standard Flight 6 × 12 ft (72 sq.ft)',
  });

  // Handle Room Count Change
  const handleRoomCountChange = (count: number) => {
    const target = Math.max(1, Math.min(8, count));
    setRoomCount(target);
    const updated: SingleSpace[] = [];
    for (let i = 1; i <= target; i++) {
      const existing = rooms[i - 1];
      if (existing) {
        updated.push({ ...existing, name: `Room ${i}` });
      } else {
        const defaultPreset = i === 1 ? ROOM_PRESETS[2] : ROOM_PRESETS[1];
        updated.push({
          id: `room-${i}`,
          name: `Room ${i}`,
          length: defaultPreset.length,
          width: defaultPreset.width,
          sqft: defaultPreset.sqft,
          preset: defaultPreset.label,
        });
      }
    }
    setRooms(updated);
  };

  // Handle Bathroom Count Change
  const handleBathroomCountChange = (count: number) => {
    const target = Math.max(0, Math.min(6, count));
    setBathroomCount(target);
    const updated: SingleSpace[] = [];
    for (let i = 1; i <= target; i++) {
      const existing = bathrooms[i - 1];
      if (existing) {
        updated.push({ ...existing, name: `Bathroom ${i}` });
      } else {
        updated.push({
          id: `bath-${i}`,
          name: `Bathroom ${i}`,
          length: 5,
          width: 7,
          sqft: 35,
          preset: '5 × 7 ft (35 sq.ft)',
        });
      }
    }
    setBathrooms(updated);
  };

  // Dimension Change Helper
  const updateSpaceDimension = (
    setter: React.Dispatch<React.SetStateAction<SingleSpace>>,
    length: number,
    width: number,
    preset: string = 'Custom'
  ) => {
    const safeL = Math.max(1, length || 1);
    const safeW = Math.max(1, width || 1);
    setter(prev => ({
      ...prev,
      length: safeL,
      width: safeW,
      sqft: safeL * safeW,
      preset,
    }));
  };

  const updateArraySpaceDimension = (
    array: SingleSpace[],
    setter: React.Dispatch<React.SetStateAction<SingleSpace[]>>,
    id: string,
    length: number,
    width: number,
    preset: string = 'Custom'
  ) => {
    const safeL = Math.max(1, length || 1);
    const safeW = Math.max(1, width || 1);
    setter(
      array.map(item =>
        item.id === id
          ? { ...item, length: safeL, width: safeW, sqft: safeL * safeW, preset }
          : item
      )
    );
  };

  // Calculate Total Square Footage
  const totalRoomsSqft = rooms.reduce((acc, r) => acc + r.sqft, 0);
  const livingSqft = hasLiving ? livingSpace.sqft : 0;
  const kitchenSqft = hasKitchen ? kitchenSpace.sqft : 0;
  const bathroomsSqft = bathrooms.reduce((acc, b) => acc + b.sqft, 0);
  const stairsSqft = hasStaircase ? staircaseSpace.sqft : 0;

  const totalCarpetArea = totalRoomsSqft + livingSqft + kitchenSqft + bathroomsSqft + stairsSqft;

  // ============================================================================
  // STEP 2: TRADE PRICING ENGINE & SCOPE (False Ceiling, Carpentry, Electrical, Paint, Floor, Wallpaper, Logos)
  // ============================================================================
  
  // 1. False Ceiling: None / ₹90 / ₹120 / ₹150
  type FalseCeilingTier = 'NONE' | 'BASIC_90' | 'DESIGNER_120' | 'LUXURY_150';
  const [falseCeilingTier, setFalseCeilingTier] = useState<FalseCeilingTier>('DESIGNER_120');

  // 2. Carpentry & Furniture: None / ₹1,000 / ₹1,200 / ₹1,500
  type CarpentryTier = 'NONE' | 'ECONOMY_1000' | 'PREMIUM_1200' | 'LUXURY_1500';
  const [carpentryTier, setCarpentryTier] = useState<CarpentryTier>('PREMIUM_1200');

  // 3. Electrical Work: Point-Based System
  const [includeElectrical, setIncludeElectrical] = useState<boolean>(true);
  const [electricalPoints, setElectricalPoints] = useState<ElectricalPointsConfig>({
    lights: Math.max(8, roomCount * 4 + 4),
    fans: Math.max(3, roomCount + 1),
    acPoints: Math.max(1, roomCount),
    geyserPoints: Math.max(1, bathroomCount),
    microwavePoints: 1,
    fridgePoints: 1,
    chimneyPoints: 1,
  });

  const updateElectricalPoint = (key: keyof ElectricalPointsConfig, delta: number) => {
    setElectricalPoints(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  // 4. Wall Painting: Asian Paints / Berger (None / Plastic ₹20 / Normal ₹25 / Premium ₹35)
  type PaintingTier = 'NONE' | 'PLASTIC_20' | 'NORMAL_25' | 'PREMIUM_35';
  const [paintingTier, setPaintingTier] = useState<PaintingTier>('NORMAL_25');

  // 5. Flooring Work: None / Tiles ₹75 / GVT ₹115 / Marble/Wood ₹195
  type FlooringTier = 'NONE' | 'TILES_75' | 'GVT_115' | 'MARBLE_195';
  const [flooringTier, setFlooringTier] = useState<FlooringTier>('NONE');

  // 6. Wallpaper Work: None / Accent ₹55 / 3D Textured ₹85
  type WallpaperTier = 'NONE' | 'ACCENT_55' | 'TEXTURED_85';
  const [wallpaperTier, setWallpaperTier] = useState<WallpaperTier>('NONE');

  // 7. Logos & Feature Wall Work: None / Nameplate ₹3500 / Jali ₹8500 / Lobby Paneling ₹16000
  type LogosTier = 'NONE' | 'NAMEPLATE_3500' | 'JALI_8500' | 'ENTRANCE_16000';
  const [logosTier, setLogosTier] = useState<LogosTier>('NONE');

  // ============================================================================
  // COST CALCULATIONS
  // ============================================================================
  
  // 1. False Ceiling
  const getCeilingRate = () => {
    switch (falseCeilingTier) {
      case 'BASIC_90': return 90;
      case 'DESIGNER_120': return 120;
      case 'LUXURY_150': return 150;
      default: return 0;
    }
  };
  const ceilingSqft = falseCeilingTier !== 'NONE' ? Math.round(totalCarpetArea * 0.85) : 0;
  const ceilingCost = ceilingSqft * getCeilingRate();

  // 2. Carpentry & Furniture
  const getCarpentryRate = () => {
    switch (carpentryTier) {
      case 'ECONOMY_1000': return 1000;
      case 'PREMIUM_1200': return 1200;
      case 'LUXURY_1500': return 1500;
      default: return 0;
    }
  };
  const carpentryCost = totalCarpetArea * getCarpentryRate();

  // 3. Electrical (Points)
  const LIGHT_POINT_RATE = 350;
  const FAN_POINT_RATE = 500;
  const AC_POINT_RATE = 1200;
  const GEYSER_POINT_RATE = 1000;
  const MICROWAVE_POINT_RATE = 850;
  const FRIDGE_POINT_RATE = 750;
  const CHIMNEY_POINT_RATE = 750;

  const totalElectricalPoints = 
    electricalPoints.lights +
    electricalPoints.fans +
    electricalPoints.acPoints +
    electricalPoints.geyserPoints +
    electricalPoints.microwavePoints +
    electricalPoints.fridgePoints +
    electricalPoints.chimneyPoints;

  const electricalCost = includeElectrical ? (
    (electricalPoints.lights * LIGHT_POINT_RATE) +
    (electricalPoints.fans * FAN_POINT_RATE) +
    (electricalPoints.acPoints * AC_POINT_RATE) +
    (electricalPoints.geyserPoints * GEYSER_POINT_RATE) +
    (electricalPoints.microwavePoints * MICROWAVE_POINT_RATE) +
    (electricalPoints.fridgePoints * FRIDGE_POINT_RATE) +
    (electricalPoints.chimneyPoints * CHIMNEY_POINT_RATE)
  ) : 0;

  // 4. Painting
  const getPaintingRate = () => {
    switch (paintingTier) {
      case 'PLASTIC_20': return 20;
      case 'NORMAL_25': return 25;
      case 'PREMIUM_35': return 35;
      default: return 0;
    }
  };
  const wallSurfaceArea = paintingTier !== 'NONE' ? Math.round(totalCarpetArea * 2.8) : 0;
  const paintingCost = wallSurfaceArea * getPaintingRate();

  // 5. Flooring
  const getFlooringRate = () => {
    switch (flooringTier) {
      case 'TILES_75': return 75;
      case 'GVT_115': return 115;
      case 'MARBLE_195': return 195;
      default: return 0;
    }
  };
  const flooringCost = totalCarpetArea * getFlooringRate();

  // 6. Wallpaper
  const getWallpaperCost = () => {
    switch (wallpaperTier) {
      case 'ACCENT_55': return 120 * 55; // 120 sq.ft accent wall @ ₹55 = ₹6,600
      case 'TEXTURED_85': return 150 * 85; // 150 sq.ft 3D vinyl @ ₹85 = ₹12,750
      default: return 0;
    }
  };
  const wallpaperCost = getWallpaperCost();

  // 7. Logos / Feature Wall
  const getLogosCost = () => {
    switch (logosTier) {
      case 'NAMEPLATE_3500': return 3500;
      case 'JALI_8500': return 8500;
      case 'ENTRANCE_16000': return 16000;
      default: return 0;
    }
  };
  const logosCost = getLogosCost();

  // Grand Total
  const totalTurnkeyCost = Math.max(
    50000,
    ceilingCost + carpentryCost + electricalCost + paintingCost + flooringCost + wallpaperCost + logosCost
  );

  const estimatedWeeks = Math.max(3, Math.round(totalCarpetArea / 160) + (carpentryTier === 'LUXURY_1500' ? 2 : 1));

  // Build Itemized Trade Breakdown list
  const tradeBreakdown: TradeBreakdownItem[] = [];

  if (carpentryTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'Carpentry & Modular Furniture',
      selection: carpentryTier === 'ECONOMY_1000' ? 'Economy Grade (Hardwood BWP + 0.8mm Laminate)' :
                 carpentryTier === 'PREMIUM_1200' ? 'Premium Grade (Century Sainik 710 + 1mm Matte + Hettich)' :
                 'Luxury Grade (Century Club Prime 710 + Acrylic/PU + Hafele/Blum)',
      rateInfo: `₹${getCarpentryRate()}/sq.ft on ${totalCarpetArea} sq.ft`,
      cost: carpentryCost,
    });
  }

  if (falseCeilingTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'False Ceiling Work',
      selection: falseCeilingTier === 'BASIC_90' ? 'Standard Gypsum False Ceiling with LED Cutouts' :
                 falseCeilingTier === 'DESIGNER_120' ? 'Designer POP & Ambient Cove Lighting Channels' :
                 'Luxury Wooden Rafters / CNC Jali & Multi-level Acoustic Ceiling',
      rateInfo: `₹${getCeilingRate()}/sq.ft on ${ceilingSqft} sq.ft`,
      cost: ceilingCost,
    });
  }

  if (includeElectrical) {
    tradeBreakdown.push({
      trade: 'Electrical Work',
      selection: `${totalElectricalPoints} Points (Lights: ${electricalPoints.lights}, Fans: ${electricalPoints.fans}, AC: ${electricalPoints.acPoints}, Geyser: ${electricalPoints.geyserPoints}, Microwave: ${electricalPoints.microwavePoints}, Fridge: ${electricalPoints.fridgePoints}, Chimney: ${electricalPoints.chimneyPoints})`,
      rateInfo: 'Point-based execution (Finolex/Havells concealed copper wiring)',
      cost: electricalCost,
    });
  }

  if (paintingTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'Wall Painting (Asian Paints / Berger)',
      selection: paintingTier === 'PLASTIC_20' ? 'Plastic Paint / Tractor Emulsion (Putty + Primer + 2 Coats)' :
                 paintingTier === 'NORMAL_25' ? 'Normal Acrylic Emulsion (Apcolite / Berger Easy Clean)' :
                 'Premium Royale Luxury Emulsion / Berger Silk Touch',
      rateInfo: `₹${getPaintingRate()}/sq.ft on ${wallSurfaceArea} sq.ft wall area`,
      cost: paintingCost,
    });
  }

  if (flooringTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'Flooring Work',
      selection: flooringTier === 'TILES_75' ? 'Vitrified Tiles (Kajaria/Somany 2×2 or 2×4 ft)' :
                 flooringTier === 'GVT_115' ? 'Premium Large Glazed Vitrified Slabs' :
                 'Luxury Italian Marble / Engineered Wooden Flooring',
      rateInfo: `₹${getFlooringRate()}/sq.ft on ${totalCarpetArea} sq.ft`,
      cost: flooringCost,
    });
  }

  if (wallpaperTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'Wallpaper Work',
      selection: wallpaperTier === 'ACCENT_55' ? 'Accent Feature Wallpaper (Bed back / TV unit)' :
                 'Premium 3D Textured European Vinyl Wallpaper',
      rateInfo: wallpaperTier === 'ACCENT_55' ? '₹55/sq.ft (~120 sq.ft)' : '₹85/sq.ft (~150 sq.ft)',
      cost: wallpaperCost,
    });
  }

  if (logosTier !== 'NONE') {
    tradeBreakdown.push({
      trade: 'Logos & Feature Wall Work',
      selection: logosTier === 'NAMEPLATE_3500' ? '3D Acrylic / Metallic Residence Nameplate & Monogram' :
                 logosTier === 'JALI_8500' ? 'Backlit CNC Jali / Corian Temple / Feature Wall Logo' :
                 'Full Architectural Entrance Lobby Logo & Fluted Wall Paneling',
      rateInfo: 'Fixed Architectural Fabrication',
      cost: logosCost,
    });
  }

  // All spatial dimensions compiled into standard RoomDimensionItem list
  const allDimensionItems: RoomDimensionItem[] = [
    ...rooms.map(r => ({ id: r.id, roomName: r.name, length: r.length, width: r.width, sqft: r.sqft, preset: r.preset })),
    ...(hasLiving ? [{ id: livingSpace.id, roomName: livingSpace.name, length: livingSpace.length, width: livingSpace.width, sqft: livingSpace.sqft, preset: livingSpace.preset }] : []),
    ...(hasKitchen ? [{ id: kitchenSpace.id, roomName: kitchenSpace.name, length: kitchenSpace.length, width: kitchenSpace.width, sqft: kitchenSpace.sqft, preset: kitchenSpace.preset }] : []),
    ...bathrooms.map(b => ({ id: b.id, roomName: b.name, length: b.length, width: b.width, sqft: b.sqft, preset: b.preset })),
    ...(hasStaircase ? [{ id: staircaseSpace.id, roomName: staircaseSpace.name, length: staircaseSpace.length, width: staircaseSpace.width, sqft: staircaseSpace.sqft, preset: staircaseSpace.preset }] : []),
  ];

  // User contact details form
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: '',
    city: 'Kolkata',
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [quotationId, setQuotationId] = useState<string>('');
  const [hasDownloadedPDF, setHasDownloadedPDF] = useState<boolean>(false);

  // Submit Details & Generate Quote
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
    const generatedId = `DQ-${Date.now().toString().slice(-6)}`;
    setQuotationId(generatedId);
    setStep(4);

    try {
      dataStore.addLead({
        quotationId: generatedId,
        name: userDetails.name.trim(),
        email: userDetails.email.trim() || `${userDetails.phone}@client.deinterio.com`,
        phone: userDetails.phone.trim(),
        type: `${roomCount} Rooms (${totalCarpetArea} sq.ft Customized BOQ)`,
        budget: `₹${(totalTurnkeyCost / 100000).toFixed(2)} Lakhs`,
        city: userDetails.city || 'Kolkata',
        status: 'NEW',
        details: `${roomCount} rooms, kitchen: ${hasKitchen ? `${kitchenSpace.sqft} sqft` : 'No'}, bath: ${bathroomCount}, stairs: ${hasStaircase ? 'Yes' : 'No'}. Total: ${totalCarpetArea} sq.ft.`,
        carpetArea: `${totalCarpetArea} sq.ft`,
        packageTier: carpentryTier !== 'NONE' ? (carpentryTier === 'LUXURY_1500' ? 'Luxury' : carpentryTier === 'PREMIUM_1200' ? 'Premium' : 'Economy') : 'Custom Trades',
        ratePerSqft: getCarpentryRate() || 1200,
        totalAreaSqft: totalCarpetArea,
        falseCeilingSqft: ceilingSqft,
        falseCeilingCost: ceilingCost,
        electricalPoints: { ...electricalPoints, totalPoints: totalElectricalPoints },
        tradeBreakdown: [...tradeBreakdown],
        staircaseIncluded: hasStaircase,
        estimatedAmount: `₹${totalTurnkeyCost.toLocaleString('en-IN')}`,
        rooms: {
          roomCount,
          livingRoom: hasLiving ? 1 : 0,
          kitchen: hasKitchen ? 1 : 0,
          bedroom: roomCount,
          bathroom: bathroomCount,
        },
        roomDimensions: [...allDimensionItems],
        serviceScope: {
          furniture: carpentryTier !== 'NONE',
          painting: paintingTier !== 'NONE',
          electrical: includeElectrical,
          falseCeiling: falseCeilingTier !== 'NONE',
        },
        notes: `Rooms: ${rooms.map(r => `${r.name}: ${r.length}x${r.width}=${r.sqft}`).join(', ')}. Trades: ${tradeBreakdown.map(t => t.trade).join(', ')}`,
      });
    } catch (err) {
      console.warn('Lead capture warning:', err);
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#A88B57', '#D4AF37', '#13362B', '#1A1917'],
    });
  };

  // Download PDF Quotation
  const handleDownloadPDF = () => {
    setHasDownloadedPDF(true);
    generateQuotationPDF({
      quotationId: quotationId || `DQ-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      clientName: userDetails.name || 'Valued Client',
      clientPhone: userDetails.phone || '+91 98300 00000',
      clientEmail: userDetails.email || 'client@deinterio.com',
      city: userDetails.city || 'Kolkata, WB',
      bhkType: `${roomCount} Room Residence`,
      carpetArea: `${totalCarpetArea} sq.ft`,
      packageTier: carpentryTier !== 'NONE' ? (carpentryTier === 'LUXURY_1500' ? 'Luxury (₹1500/sq.ft)' : carpentryTier === 'PREMIUM_1200' ? 'Premium (₹1200/sq.ft)' : 'Economy (₹1000/sq.ft)') : 'Custom BOQ',
      ratePerSqft: getCarpentryRate() || 1200,
      totalAreaSqft: totalCarpetArea,
      falseCeilingSqft: ceilingSqft,
      falseCeilingCost: ceilingCost,
      roomDimensions: allDimensionItems.map(d => ({
        id: d.id,
        roomName: d.roomName,
        length: d.length,
        width: d.width,
        sqft: d.sqft,
        preset: d.preset,
      })),
      serviceScope: {
        furniture: carpentryTier !== 'NONE',
        painting: paintingTier !== 'NONE',
        electrical: includeElectrical,
        falseCeiling: falseCeilingTier !== 'NONE',
      },
      electricalPoints: { ...electricalPoints, totalPoints: totalElectricalPoints },
      tradeBreakdown: [...tradeBreakdown],
      staircaseIncluded: hasStaircase,
      estimatedWeeks,
      totalAmountFormatted: `₹${totalTurnkeyCost.toLocaleString('en-IN')}`,
    });
  };

  const resetCalculator = () => {
    setStep(1);
    setQuotationId('');
    setHasDownloadedPDF(false);
  };

  return (
    <motion.section 
      id="calculator"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1A1917]/10 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8C6D3B] shadow-xs">
          <Calculator className="w-3.5 h-3.5 text-[#A88B57]" />
          <span>DEINTERIO TURNKEY ESTIMATOR & BOQ WIZARD</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917]">
          Itemized Interior <span className="italic text-gold-gradient">Valuation Engine</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed max-w-xl mx-auto">
          Specify exact room square footage, select materials tier (Economy, Luxury, Premium), and customize service scope.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="max-w-3xl mx-auto mb-8 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#1A1917]/10 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-[#A88B57] -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'Spaces & Dimensions' },
            { num: 2, label: 'Scope & Trade Rates' },
            { num: 3, label: 'Itemized BOQ' },
            { num: 4, label: 'Official Quote' },
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => {
                  if (s.num < step || quotationId) setStep(s.num);
                }}
                disabled={s.num > step && !quotationId}
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

      {/* Main Wizard Box */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#FDFBF7] to-[#F4F0E6] rounded-[32px] border border-white/80 shadow-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#A88B57]/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">

          {/* ========================================================================= */}
          {/* STEP 1: SPACES & DIMENSIONS (No forced bedroom names)                     */}
          {/* ========================================================================= */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Specify Your Space & Dimensions</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  How many rooms do you have? Enter lengths & widths or choose standard presets.
                </p>
              </div>

              {/* 1. ROOM COUNTER */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1917]/5 pb-3">
                  <div>
                    <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B] block">
                      Number of Enclosed Rooms
                    </label>
                    <span className="text-[11px] font-mono text-[#6B6560]">
                      Select how many rooms are included in this renovation
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleRoomCountChange(num)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          roomCount === num
                            ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs scale-105'
                            : 'bg-[#FAF8F4] hover:bg-neutral-100 text-[#1A1917] border border-[#E2DDD6]'
                        }`}
                      >
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Individual Room Cards (Room 1, Room 2, etc.) */}
                <div className="space-y-3 pt-1">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-[#1A1917] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                          <span>{room.name}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                          {room.sqft} sq.ft
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Preset select */}
                        <div>
                          <select
                            value={room.preset}
                            onChange={(e) => {
                              const found = ROOM_PRESETS.find(p => p.label === e.target.value);
                              if (found) {
                                updateArraySpaceDimension(rooms, setRooms, room.id, found.length, found.width, found.label);
                              } else {
                                updateArraySpaceDimension(rooms, setRooms, room.id, room.length, room.width, 'Custom');
                              }
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                          >
                            <option value="Custom">Custom Dimensions</option>
                            {ROOM_PRESETS.map(p => (
                              <option key={p.label} value={p.label}>{p.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Length x Width */}
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="4"
                            max="50"
                            value={room.length}
                            onChange={(e) => updateArraySpaceDimension(rooms, setRooms, room.id, Number(e.target.value), room.width, 'Custom')}
                            className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                            title="Length in feet"
                          />
                          <span className="text-gray-400 font-mono text-xs">×</span>
                          <input
                            type="number"
                            min="4"
                            max="50"
                            value={room.width}
                            onChange={(e) => updateArraySpaceDimension(rooms, setRooms, room.id, room.length, Number(e.target.value), 'Custom')}
                            className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                            title="Width in feet"
                          />
                          <span className="text-[11px] font-mono text-gray-500 shrink-0">ft</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. LIVING & HALL AREA */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B] flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasLiving}
                      onChange={(e) => setHasLiving(e.target.checked)}
                      className="w-4 h-4 rounded text-[#13362B] accent-[#13362B]"
                    />
                    <span>Living & Hall Space</span>
                  </label>
                  {hasLiving && (
                    <span className="px-2 py-0.5 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      {livingSpace.sqft} sq.ft
                    </span>
                  )}
                </div>

                {hasLiving && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={livingSpace.preset}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '12 × 14 ft (168 sq.ft)') updateSpaceDimension(setLivingSpace, 12, 14, val);
                        else if (val === '14 × 16 ft (224 sq.ft)') updateSpaceDimension(setLivingSpace, 14, 16, val);
                        else if (val === '14 × 20 ft (280 sq.ft)') updateSpaceDimension(setLivingSpace, 14, 20, val);
                        else updateSpaceDimension(setLivingSpace, livingSpace.length, livingSpace.width, 'Custom');
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    >
                      <option value="Custom">Custom Dimensions</option>
                      <option value="12 × 14 ft (168 sq.ft)">12 × 14 ft (168 sq.ft)</option>
                      <option value="14 × 16 ft (224 sq.ft)">14 × 16 ft (224 sq.ft)</option>
                      <option value="14 × 20 ft (280 sq.ft)">14 × 20 ft (280 sq.ft)</option>
                    </select>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="6"
                        max="60"
                        value={livingSpace.length}
                        onChange={(e) => updateSpaceDimension(setLivingSpace, Number(e.target.value), livingSpace.width, 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-gray-400 font-mono text-xs">×</span>
                      <input
                        type="number"
                        min="6"
                        max="60"
                        value={livingSpace.width}
                        onChange={(e) => updateSpaceDimension(setLivingSpace, livingSpace.length, Number(e.target.value), 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-[11px] font-mono text-gray-500 shrink-0">ft</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. MODULAR KITCHEN */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B] flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasKitchen}
                      onChange={(e) => setHasKitchen(e.target.checked)}
                      className="w-4 h-4 rounded text-[#13362B] accent-[#13362B]"
                    />
                    <span>Kitchen Space</span>
                  </label>
                  {hasKitchen && (
                    <span className="px-2 py-0.5 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      {kitchenSpace.sqft} sq.ft
                    </span>
                  )}
                </div>

                {hasKitchen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={kitchenSpace.preset}
                      onChange={(e) => {
                        const found = KITCHEN_PRESETS.find(p => p.label === e.target.value);
                        if (found) {
                          updateSpaceDimension(setKitchenSpace, found.length, found.width, found.label);
                        } else {
                          updateSpaceDimension(setKitchenSpace, kitchenSpace.length, kitchenSpace.width, 'Custom');
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    >
                      <option value="Custom">Custom Dimensions</option>
                      {KITCHEN_PRESETS.map(p => (
                        <option key={p.label} value={p.label}>{p.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="5"
                        max="30"
                        value={kitchenSpace.length}
                        onChange={(e) => updateSpaceDimension(setKitchenSpace, Number(e.target.value), kitchenSpace.width, 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-gray-400 font-mono text-xs">×</span>
                      <input
                        type="number"
                        min="5"
                        max="30"
                        value={kitchenSpace.width}
                        onChange={(e) => updateSpaceDimension(setKitchenSpace, kitchenSpace.length, Number(e.target.value), 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-[11px] font-mono text-gray-500 shrink-0">ft</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. BATHROOMS */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1917]/5 pb-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B]">
                      Bathrooms ({bathroomCount})
                    </label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleBathroomCountChange(num)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold cursor-pointer ${
                          bathroomCount === num
                            ? 'bg-[#13362B] text-[#C8AA7A]'
                            : 'bg-[#FAF8F4] border border-[#E2DDD6]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {bathrooms.length > 0 && (
                  <div className="space-y-2">
                    {bathrooms.map(bath => (
                      <div key={bath.id} className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] flex flex-col sm:flex-row items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1A1917]">{bath.name}</span>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <select
                            value={bath.preset}
                            onChange={(e) => {
                              const found = BATHROOM_PRESETS.find(p => p.label === e.target.value);
                              if (found) {
                                updateArraySpaceDimension(bathrooms, setBathrooms, bath.id, found.length, found.width, found.label);
                              } else {
                                updateArraySpaceDimension(bathrooms, setBathrooms, bath.id, bath.length, bath.width, 'Custom');
                              }
                            }}
                            className="px-2 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono flex-1 sm:flex-none"
                          >
                            <option value="Custom">Custom</option>
                            {BATHROOM_PRESETS.map(p => (
                              <option key={p.label} value={p.label}>{p.label}</option>
                            ))}
                          </select>
                          <span className="px-2 py-0.5 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs shrink-0">
                            {bath.sqft} sq.ft
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. STAIRCASE / INTERNAL STAIRS (Duplex, Villa, Bungalow) */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B] flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasStaircase}
                      onChange={(e) => setHasStaircase(e.target.checked)}
                      className="w-4 h-4 rounded text-[#13362B] accent-[#13362B]"
                    />
                    <span>Staircase / Internal Stairs (Duplex & Villa)</span>
                  </label>
                  {hasStaircase && (
                    <span className="px-2 py-0.5 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      {staircaseSpace.sqft} sq.ft
                    </span>
                  )}
                </div>

                {hasStaircase && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={staircaseSpace.preset}
                      onChange={(e) => {
                        const found = STAIR_PRESETS.find(p => p.label === e.target.value);
                        if (found) {
                          updateSpaceDimension(setStaircaseSpace, found.length, found.width, found.label);
                        } else {
                          updateSpaceDimension(setStaircaseSpace, staircaseSpace.length, staircaseSpace.width, 'Custom');
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    >
                      <option value="Custom">Custom Dimensions</option>
                      {STAIR_PRESETS.map(p => (
                        <option key={p.label} value={p.label}>{p.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="4"
                        max="30"
                        value={staircaseSpace.length}
                        onChange={(e) => updateSpaceDimension(setStaircaseSpace, Number(e.target.value), staircaseSpace.width, 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-gray-400 font-mono text-xs">×</span>
                      <input
                        type="number"
                        min="4"
                        max="30"
                        value={staircaseSpace.width}
                        onChange={(e) => updateSpaceDimension(setStaircaseSpace, staircaseSpace.length, Number(e.target.value), 'Custom')}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-center font-bold text-[#13362B]"
                      />
                      <span className="text-[11px] font-mono text-gray-500 shrink-0">ft</span>
                    </div>
                  </div>
                )}
              </div>

              {/* TOTAL SQUARE FOOTAGE DISPLAY */}
              <div className="p-5 rounded-2xl bg-[#13362B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#D4AF37] block font-bold tracking-wider">
                    Total Measured Square Footage
                  </span>
                  <div className="font-serif text-3xl font-bold flex items-baseline gap-2">
                    <span>{totalCarpetArea}</span>
                    <span className="text-base text-gray-300 font-mono font-normal">sq.ft</span>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-white/80">
                  <span>{roomCount} Rooms</span>
                  {hasKitchen && <span> • Kitchen</span>}
                  {bathroomCount > 0 && <span> • {bathroomCount} Bath</span>}
                  {hasStaircase && <span> • Staircase</span>}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4 border-t border-[#1A1917]/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#13362B] hover:bg-[#1b483a] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
                >
                  <span>Next: Choose Trades & Rates</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: INTERIOR WORK CATEGORIES & CUSTOM RATES                           */}
          {/* ========================================================================= */}
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Select Work Categories & Materials</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  Select specific trade rates for False Ceiling, Carpentry, Electrical Points, Painting, Flooring & Decor
                </p>
              </div>

              {/* 1. FALSE CEILING WORK */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1A1917]">1. False Ceiling Work</h4>
                    <p className="text-[11px] font-mono text-[#6B6560]">Rates vary ₹90 to ₹150 per sq.ft based on design & lighting coves</p>
                  </div>
                  {falseCeilingTier !== 'NONE' && (
                    <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      ₹{ceilingCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { tier: 'NONE' as FalseCeilingTier, label: 'None / Skip', rate: '₹0', desc: 'No ceiling work requested' },
                    { tier: 'BASIC_90' as FalseCeilingTier, label: 'Standard Gypsum', rate: '₹90/sq.ft', desc: 'Plain false ceiling with downlight cutouts' },
                    { tier: 'DESIGNER_120' as FalseCeilingTier, label: 'Designer POP & Cove', rate: '₹120/sq.ft', desc: 'Peripheral coves & ambient indirect lighting slots' },
                    { tier: 'LUXURY_150' as FalseCeilingTier, label: 'Luxury Wooden / CNC', rate: '₹150/sq.ft', desc: 'Wooden rafters, CNC jali & floating acoustic profile' },
                  ].map(item => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setFalseCeilingTier(item.tier)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        falseCeilingTier === item.tier
                          ? 'bg-[#13362B] text-white border-[#13362B] shadow-sm'
                          : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917] hover:border-[#8C6D3B]'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs font-serif">{item.label}</strong>
                        </div>
                        <span className={`text-xs font-mono font-bold block ${falseCeilingTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                        <p className={`text-[10px] leading-tight mt-1 ${falseCeilingTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. CARPENTRY & MODULAR WOODWORK */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1A1917]">2. Carpentry & Modular Furniture Work</h4>
                    <p className="text-[11px] font-mono text-[#6B6560]">Rates vary ₹1,000 to ₹1,500 per sq.ft depending on plywood grade & hardware</p>
                  </div>
                  {carpentryTier !== 'NONE' && (
                    <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      ₹{carpentryCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { tier: 'NONE' as CarpentryTier, label: 'None / Skip', rate: '₹0', desc: 'No carpentry or modular storage requested' },
                    { tier: 'ECONOMY_1000' as CarpentryTier, label: 'Economy Grade', rate: '₹1,000/sq.ft', desc: 'Hardwood BWP Plywood, 0.8mm Laminate, Ebco hardware' },
                    { tier: 'PREMIUM_1200' as CarpentryTier, label: 'Premium Marine', rate: '₹1,200/sq.ft', desc: 'Century Sainik 710 BWP, 1mm Matte Laminate, Hettich soft-close' },
                    { tier: 'LUXURY_1500' as CarpentryTier, label: 'Luxury Turnkey', rate: '₹1,500/sq.ft', desc: 'Century Club Prime 710, PU Polish/Acrylic, Hafele/Blum' },
                  ].map(item => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setCarpentryTier(item.tier)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        carpentryTier === item.tier
                          ? 'bg-[#13362B] text-white border-[#13362B] shadow-sm'
                          : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917] hover:border-[#8C6D3B]'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs font-serif">{item.label}</strong>
                        </div>
                        <span className={`text-xs font-mono font-bold block ${carpentryTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                        <p className={`text-[10px] leading-tight mt-1 ${carpentryTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. ELECTRICAL WORK (POINT-BASED SYSTEM) */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <div>
                    <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#13362B] flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeElectrical}
                        onChange={(e) => setIncludeElectrical(e.target.checked)}
                        className="w-4 h-4 rounded text-[#13362B] accent-[#13362B]"
                      />
                      <span>3. Electrical Contracting (Point-Based Calculation)</span>
                    </label>
                    <p className="text-[11px] font-mono text-[#6B6560]">
                      Concealed Finolex/Havells wiring, modular switches, power points for lights, fans & heavy appliances
                    </p>
                  </div>
                  {includeElectrical && (
                    <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      {totalElectricalPoints} Points • ₹{electricalCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {includeElectrical && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1 text-center">
                    {[
                      { key: 'lights' as keyof ElectricalPointsConfig, label: 'Light Points', rate: '₹350' },
                      { key: 'fans' as keyof ElectricalPointsConfig, label: 'Fan Points', rate: '₹500' },
                      { key: 'acPoints' as keyof ElectricalPointsConfig, label: 'AC Points', rate: '₹1,200' },
                      { key: 'geyserPoints' as keyof ElectricalPointsConfig, label: 'Geyser Points', rate: '₹1,000' },
                      { key: 'microwavePoints' as keyof ElectricalPointsConfig, label: 'Microwave', rate: '₹850' },
                      { key: 'fridgePoints' as keyof ElectricalPointsConfig, label: 'Fridge', rate: '₹750' },
                      { key: 'chimneyPoints' as keyof ElectricalPointsConfig, label: 'Chimney', rate: '₹750' },
                    ].map(point => (
                      <div key={point.key} className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] flex flex-col justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#1A1917] block leading-tight">{point.label}</span>
                        <span className="text-[10px] font-mono text-[#8C6D3B]">{point.rate}/pt</span>
                        
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateElectricalPoint(point.key, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-[#E2DDD6] flex items-center justify-center hover:bg-gray-100 cursor-pointer text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-xs text-[#13362B]">{electricalPoints[point.key]}</span>
                          <button
                            type="button"
                            onClick={() => updateElectricalPoint(point.key, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-[#E2DDD6] flex items-center justify-center hover:bg-gray-100 cursor-pointer text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. WALL PAINTING (ASIAN PAINTS / BERGER) */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1A1917]">4. Wall Painting Work (Asian Paints / Berger)</h4>
                    <p className="text-[11px] font-mono text-[#6B6560]">Choose between Plastic Paint (₹20), Normal Acrylic (₹25), or Premium Royale (₹35)</p>
                  </div>
                  {paintingTier !== 'NONE' && (
                    <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      ₹{paintingCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { tier: 'NONE' as PaintingTier, label: 'None / Skip', rate: '₹0', desc: 'No wall painting requested' },
                    { tier: 'PLASTIC_20' as PaintingTier, label: 'Plastic Paint', rate: '₹20/sq.ft', desc: 'Asian Paints Tractor Emulsion / Berger (Putty + Primer + 2 Coats)' },
                    { tier: 'NORMAL_25' as PaintingTier, label: 'Normal Acrylic Color', rate: '₹25/sq.ft', desc: 'Asian Paints Apcolite / Berger Easy Clean smooth washable finish' },
                    { tier: 'PREMIUM_35' as PaintingTier, label: 'Premium Luxury Royale', rate: '₹35/sq.ft', desc: 'Asian Paints Royale Luxury / Berger Silk Touch high-sheen finish' },
                  ].map(item => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setPaintingTier(item.tier)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paintingTier === item.tier
                          ? 'bg-[#13362B] text-white border-[#13362B] shadow-sm'
                          : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917] hover:border-[#8C6D3B]'
                      }`}
                    >
                      <div>
                        <strong className="text-xs font-serif block mb-1">{item.label}</strong>
                        <span className={`text-xs font-mono font-bold block ${paintingTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                        <p className={`text-[10px] leading-tight mt-1 ${paintingTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. FLOORING WORK */}
              <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1A1917]">5. Flooring Work</h4>
                    <p className="text-[11px] font-mono text-[#6B6560]">Tiles laying, Large slabs, or Italian marble / wooden flooring</p>
                  </div>
                  {flooringTier !== 'NONE' && (
                    <span className="px-2.5 py-1 rounded-md bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                      ₹{flooringCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { tier: 'NONE' as FlooringTier, label: 'Existing Kept', rate: '₹0', desc: 'Retain current flooring' },
                    { tier: 'TILES_75' as FlooringTier, label: 'Vitrified Tiles', rate: '₹75/sq.ft', desc: 'Kajaria / Somany 2×2 or 2×4 ft tile laying & epoxy grout' },
                    { tier: 'GVT_115' as FlooringTier, label: 'Glazed Large Slabs', rate: '₹115/sq.ft', desc: 'Large format 4×2 or 6×4 ft vitrified slabs' },
                    { tier: 'MARBLE_195' as FlooringTier, label: 'Italian Marble / Wood', rate: '₹195/sq.ft', desc: 'Imported marble or engineered hardwood flooring' },
                  ].map(item => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setFlooringTier(item.tier)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        flooringTier === item.tier
                          ? 'bg-[#13362B] text-white border-[#13362B] shadow-sm'
                          : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917] hover:border-[#8C6D3B]'
                      }`}
                    >
                      <div>
                        <strong className="text-xs font-serif block mb-1">{item.label}</strong>
                        <span className={`text-xs font-mono font-bold block ${flooringTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                        <p className={`text-[10px] leading-tight mt-1 ${flooringTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. WALLPAPER & 7. LOGOS / FEATURE WALL (2-COL ROW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wallpaper */}
                <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1A1917]">6. Wallpaper Work</h4>
                      <p className="text-[10px] font-mono text-[#6B6560]">Accent feature walls or textured vinyl</p>
                    </div>
                    {wallpaperTier !== 'NONE' && (
                      <span className="px-2 py-0.5 rounded bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                        ₹{wallpaperCost.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {[
                      { tier: 'NONE' as WallpaperTier, label: 'None', rate: '₹0', desc: 'No wallpaper' },
                      { tier: 'ACCENT_55' as WallpaperTier, label: 'Accent Feature Wallpaper', rate: '₹55/sq.ft', desc: '~120 sq.ft feature wall behind bed/TV unit' },
                      { tier: 'TEXTURED_85' as WallpaperTier, label: '3D Textured Vinyl', rate: '₹85/sq.ft', desc: '~150 sq.ft imported European luxury embossed' },
                    ].map(item => (
                      <button
                        key={item.tier}
                        type="button"
                        onClick={() => setWallpaperTier(item.tier)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                          wallpaperTier === item.tier
                            ? 'bg-[#13362B] text-white border-[#13362B]'
                            : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917]'
                        }`}
                      >
                        <div>
                          <strong className="text-xs font-serif">{item.label}</strong>
                          <p className={`text-[10px] ${wallpaperTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                        <span className={`text-xs font-mono font-bold ${wallpaperTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logos & Feature Wall */}
                <div className="p-5 rounded-2xl bg-white border border-[#1A1917]/10 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1A1917]/5 pb-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1A1917]">7. Logos & Feature Wall</h4>
                      <p className="text-[10px] font-mono text-[#6B6560]">Metallic nameplate, CNC temple jali, entrance logo</p>
                    </div>
                    {logosTier !== 'NONE' && (
                      <span className="px-2 py-0.5 rounded bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs">
                        ₹{logosCost.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {[
                      { tier: 'NONE' as LogosTier, label: 'None', rate: '₹0', desc: 'No decorative feature work' },
                      { tier: 'NAMEPLATE_3500' as LogosTier, label: '3D Residence Monogram', rate: '₹3,500', desc: 'Laser-cut acrylic / brushed brass nameplate' },
                      { tier: 'JALI_8500' as LogosTier, label: 'Backlit CNC Jali Logo', rate: '₹8,500', desc: 'Corian temple or living room backlit feature panel' },
                      { tier: 'ENTRANCE_16000' as LogosTier, label: 'Entrance Lobby Paneling', rate: '₹16,000', desc: 'Fluted wooden paneling & integrated metal signage' },
                    ].map(item => (
                      <button
                        key={item.tier}
                        type="button"
                        onClick={() => setLogosTier(item.tier)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                          logosTier === item.tier
                            ? 'bg-[#13362B] text-white border-[#13362B]'
                            : 'bg-[#FAF8F4] border-[#E2DDD6] text-[#1A1917]'
                        }`}
                      >
                        <div>
                          <strong className="text-xs font-serif">{item.label}</strong>
                          <p className={`text-[10px] ${logosTier === item.tier ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                        <span className={`text-xs font-mono font-bold ${logosTier === item.tier ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                          {item.rate}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-[#1A1917]/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E2DDD6] hover:border-[#8C6D3B] text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4 text-[#8C6D3B]" />
                  <span>Back to Measurements</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#13362B] hover:bg-[#1b483a] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap order-1 sm:order-2"
                >
                  <span>Review Itemized BOQ</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: ITEMIZED BOQ BREAKDOWN & SUMMARY                                  */}
          {/* ========================================================================= */}
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
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Transparent Itemized BOQ</h3>
                <p className="text-xs text-[#5A5852] font-light">
                  Exact item-by-item breakdown based on your {totalCarpetArea} sq.ft measurements and selected rates
                </p>
              </div>

              {/* BOQ Table */}
              <div className="p-6 rounded-3xl bg-white border border-[#1A1917]/10 space-y-4 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C6D3B] font-bold block">SPECIFICATION AUDIT</span>
                    <h4 className="font-serif text-lg font-bold text-[#1A1917]">Schedule of Trade Costs</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#13362B] font-bold">
                    {totalCarpetArea} sq.ft Total Carpet
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2DDD6] text-[#6B6560]">
                        <th className="py-2.5 px-2 uppercase font-bold">Trade & Specification</th>
                        <th className="py-2.5 px-2 uppercase font-bold text-center">Rate / Calculation</th>
                        <th className="py-2.5 px-2 uppercase font-bold text-right">Estimated Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DDD6]">
                      {tradeBreakdown.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF8F4]/50">
                          <td className="py-3 px-2">
                            <strong className="text-sm font-serif block text-[#1A1917]">{item.trade}</strong>
                            <span className="text-[11px] text-gray-500">{item.selection}</span>
                          </td>
                          <td className="py-3 px-2 text-center text-gray-600 text-[11px] whitespace-nowrap">
                            {item.rateInfo}
                          </td>
                          <td className="py-3 px-2 text-right font-bold text-sm text-[#13362B] whitespace-nowrap">
                            ₹{item.cost.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Grand Total Bar */}
                <div className="p-4 rounded-2xl bg-[#13362B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#D4AF37] block font-bold">
                      Estimated Turnkey Investment
                    </span>
                    <span className="font-serif text-3xl font-bold">
                      ₹{(totalTurnkeyCost / 100000).toFixed(2)} <span className="text-xl text-[#A88B57]">Lakhs</span>
                    </span>
                    <p className="text-[11px] font-mono text-white/70 mt-0.5">
                      ₹{totalTurnkeyCost.toLocaleString('en-IN')} All-Inclusive Execution (No Hidden Extras)
                    </p>
                  </div>

                  <div className="text-right text-xs font-mono text-white/90">
                    <span className="block">Guaranteed Handover: ~{estimatedWeeks} Weeks</span>
                    <span className="text-[10px] text-[#D4AF37] block mt-0.5">10-Year Digital Warranty</span>
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-[#1A1917]/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E2DDD6] hover:border-[#8C6D3B] text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4 text-[#8C6D3B]" />
                  <span>Back to Trades</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#13362B] hover:bg-[#1b483a] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap order-1 sm:order-2"
                >
                  <span>Get Official Quotation</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: CONTACT FORM & INSTANT DOWNLOAD PDF                               */}
          {/* ========================================================================= */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {!quotationId ? (
                /* Contact Details Submission */
                <>
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">Receive Your Official Quotation</h3>
                    <p className="text-xs text-[#5A5852] font-light">
                      Enter your name and WhatsApp number to instantly download your stamped PDF quotation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitDetails} className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5 font-bold">
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
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5A5852] block mb-1.5 font-bold">
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

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#13362B] text-[#C8AA7A] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1b483a] transition-all shadow-xl cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>GENERATE & VIEW OFFICIAL QUOTATION</span>
                    </button>
                  </form>

                  <div className="flex justify-start pt-6 border-t border-[#1A1917]/10">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E2DDD6] hover:border-[#8C6D3B] text-[#1A1917] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#8C6D3B]" />
                      <span>Back to BOQ</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Generated Quotation Stamped Reveal & PDF Download */
                <div className="space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold uppercase text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>OFFICIAL QUOTATION #{quotationId} READY FOR {userDetails.name.toUpperCase()}</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3B] block font-bold mb-1">
                      Final Estimated Turnkey Investment
                    </span>
                    <div className="font-serif text-4xl sm:text-6xl font-normal text-[#13362B]">
                      ₹{(totalTurnkeyCost / 100000).toFixed(2)} <span className="text-2xl text-[#A88B57]">Lakhs</span>
                    </div>
                    <p className="text-xs font-mono text-[#5A5852] mt-1">
                      ₹{totalTurnkeyCost.toLocaleString('en-IN')} All-Inclusive Valuation ({totalCarpetArea} sq.ft)
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-6 rounded-2xl bg-white border border-[#E2DDD6] text-left space-y-3 max-w-lg mx-auto shadow-sm text-xs font-mono">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Client Name:</span>
                      <strong>{userDetails.name}</strong>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Property Area:</span>
                      <strong>{totalCarpetArea} sq.ft ({roomCount} Rooms, {bathroomCount} Bath)</strong>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Selected Trades:</span>
                      <strong className="text-[#13362B]">{tradeBreakdown.length} Trade Categories Included</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Execution Timeline:</span>
                      <strong className="text-emerald-700">~{estimatedWeeks} Weeks Guaranteed</strong>
                    </div>
                  </div>

                  {/* Download PDF & Action Buttons */}
                  <div className="flex flex-col gap-3 max-w-md mx-auto pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="w-full py-4 px-6 rounded-full bg-[#D4AF37] hover:bg-[#C29B28] text-[#13362B] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Download className="w-4 h-4 text-[#13362B]" />
                      <span>{hasDownloadedPDF ? 'DOWNLOAD PDF QUOTATION AGAIN' : 'DOWNLOAD PDF QUOTATION'}</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onOpenBooking}
                        className="flex-1 py-3.5 px-6 rounded-full bg-[#13362B] text-[#C8AA7A] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:bg-[#1b483a] transition-all cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>BOOK SITE VISIT</span>
                      </button>

                      <button
                        type="button"
                        onClick={resetCalculator}
                        className="py-3.5 px-5 rounded-full bg-white border border-[#E2DDD6] text-[#1A1917] font-mono text-xs font-bold uppercase flex items-center justify-center gap-1.5 hover:border-[#8C6D3B] transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>RESET</span>
                      </button>
                    </div>

                    {hasDownloadedPDF && (
                      <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 py-2 px-3 rounded-xl text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Quotation #{quotationId} downloaded and recorded in client consultation registry.</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default AICostCalculator;
