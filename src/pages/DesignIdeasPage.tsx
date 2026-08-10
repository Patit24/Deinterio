import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCircle2, 
  Maximize2, 
  X, 
  ShieldCheck, 
  Ruler, 
  Tag, 
  Compass, 
  LayoutGrid, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export interface DesignIdeaItem {
  id: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  style: string;
  budgetRange: string;
  image: string;
  gallery: string[];
  description: string;
  keyFeatures: string[];
  materials: string[];
  dimensions: string;
  idealFor: string;
}

interface DesignIdeasPageProps {
  categorySlug?: string;
  onOpenBooking: (prefillCategory?: string) => void;
}

export const CATEGORIES_DATA = [
  { slug: 'modular-kitchen', name: 'Modular Kitchen Designs', count: 124, icon: '🍳', heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', desc: 'Ergonomic L-shaped, Parallel, and Island modular kitchens with German hardware & waterproof marine plywood.' },
  { slug: 'wardrobe', name: 'Wardrobe Designs', count: 98, icon: '🚪', heroImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80', desc: 'Floor-to-ceiling sliding wardrobes, walk-in closets, and lacquered glass finishes.' },
  { slug: 'bathroom', name: 'Bathroom Designs', count: 86, icon: '🚿', heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', desc: 'Spa-inspired luxury vanities, frameless glass shower enclosures, and Italian marble wall claddings.' },
  { slug: 'master-bedroom', name: 'Master Bedroom Designs', count: 112, icon: '🛏️', heroImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', desc: 'Acoustic headboards, warm cove ceiling lighting, integrated dressers, and serene color palettes.' },
  { slug: 'living-room', name: 'Living Room Designs', count: 145, icon: '🛋️', heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', desc: 'Italian minimalist lounge layouts, fluted wall louvers, custom sofa seating, and media walls.' },
  { slug: 'pooja-room', name: 'Pooja Room Designs', count: 54, icon: '🕉️', heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', desc: 'Traditional Corian Mandirs with intricate CNC jaali work, warm LED backlighting, and brass bells.' },
  { slug: 'tv-unit', name: 'TV Unit Designs', count: 76, icon: '📺', heroImage: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80', desc: 'Floating marble TV consoles, concealed cable management, integrated bookshelf & display ledges.' },
  { slug: 'false-ceiling', name: 'False Ceiling Designs', count: 92, icon: '✨', heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', desc: 'Cove ambient lighting, magnetic track lights, wooden rafter accents, and clean perimeter drop ceilings.' },
  { slug: 'kids-bedroom', name: 'Kids Bedroom Designs', count: 48, icon: '🎈', heroImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', desc: 'Study units with magnetic whiteboards, bunk beds with storage drawers, and durable non-toxic finishes.' },
  { slug: 'balcony', name: 'Balcony Designs', count: 62, icon: '🌿', heroImage: 'https://images.unsplash.com/photo-1533779283484-839983806689?auto=format&fit=crop&w=1200&q=80', desc: 'Vertical green gardens, weather-proof deck tile flooring, bar counters, and cozy outdoor seating.' },
  { slug: 'dining-room', name: 'Dining Room Designs', count: 68, icon: '🍽️', heroImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', desc: '6-seater onyx marble dining tables, pendant chandeliers, and integrated cutlery buffets.' },
  { slug: 'foyer', name: 'Foyer Designs', count: 42, icon: '🔑', heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', desc: 'Statement shoe consoles, entryway full-length mirrors, key drop trays, and ambient wall sconces.' },
  { slug: 'guest-bedroom', name: 'Guest Bedroom Designs', count: 50, icon: '🛋️', heroImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80', desc: 'Foldable Murphy wall beds, compact study desks, and dual-door sliding wardrobes.' },
  { slug: 'wall-decor', name: 'Wall Decor & Paint', count: 70, icon: '🎨', heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', desc: 'Textured Royale play finishes, charcoal louvers, metallic wallpapers, and art gallery framing.' },
  { slug: 'flooring-tiles', name: 'Tile & Flooring Designs', count: 58, icon: '📐', heroImage: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80', desc: 'Glazed vitrified tiles, Italian Statuario marble, SPC wooden flooring, and chevron hardwood.' },
  { slug: 'study-room', name: 'Study Room & Home Bar', count: 46, icon: '📚', heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', desc: 'Ergonomic dual-monitor workstations, floating bookshelves, and wine rack home bar counters.' },
  { slug: 'crockery-unit', name: 'Crockery Unit Designs', count: 38, icon: '🥂', heroImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80', desc: 'Tinted glass showcase cabinets, warm LED strip highlights, and push-to-open soft close drawers.' },
  { slug: 'space-saving', name: 'Space Saving Furniture', count: 52, icon: '⚡', heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', desc: 'Multi-functional pull-out dining tables, hidden storage ottomans, and modular convertible sofas.' },
];

export const DESIGN_IDEAS_ITEMS: DesignIdeaItem[] = [
  // 1. Modular Kitchen Designs
  {
    id: 'kit-1',
    title: 'L-Shaped Handleless Acrylic Kitchen with Quartz Island',
    categorySlug: 'modular-kitchen',
    categoryName: 'Modular Kitchen Designs',
    style: 'Modern Minimalist',
    budgetRange: '₹3.2L – ₹6.5L',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'],
    description: 'High-gloss champagne acrylic handleless kitchen with Gola profile channels, quartz stone island counter, built-in microwave oven tower, and Hafele tandem box drawers.',
    keyFeatures: ['Gola Profile Handleless Shutters', 'Quartz Anti-Stain Countertop', 'Built-in Appliance Tall Unit', 'Hafele Magic Corner Pullout'],
    materials: ['CenturyPly 710 BWP Plywood', 'Merino High Gloss Acrylic', 'Hafele Soft Close Fittings', 'Kaff Built-in Hob'],
    dimensions: '14ft x 12ft (168 sq.ft)',
    idealFor: '3BHK & 4BHK Luxury Apartments'
  },
  {
    id: 'kit-2',
    title: 'Parallel German Kitchen in Matt Charcoal & Oak',
    categorySlug: 'modular-kitchen',
    categoryName: 'Modular Kitchen Designs',
    style: 'Contemporary Industrial',
    budgetRange: '₹2.8L – ₹4.8L',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'],
    description: 'Sleek parallel layout optimized for maximum efficiency with anti-fingerprint matt charcoal shutters paired with warm natural oak upper cabinets.',
    keyFeatures: ['Anti-Fingerprint Super Matt Finish', 'Dual Counter Efficiency Layout', 'Under-Cabinet Profile Lights', 'Granite Double Bowl Sink'],
    materials: ['Fenix NTM Matt Laminate', 'Blum Servo-Drive Drawers', 'Franke Granite Sink'],
    dimensions: '10ft x 8ft (80 sq.ft)',
    idealFor: 'Urban Apartments & High-Rise Flats'
  },
  {
    id: 'kit-3',
    title: 'Contemporary White & Brass Island Kitchen',
    categorySlug: 'modular-kitchen',
    categoryName: 'Modular Kitchen Designs',
    style: 'Italian Minimalist',
    budgetRange: '₹4.2L – ₹7.8L',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'],
    description: 'Ultra-luxurious open kitchen with a waterfall marble counter, brass pendant lighting, and seamless built-in refrigerator wall paneling.',
    keyFeatures: ['Waterfall Marble Island', 'Brass Pendant Lights', 'Soft-Touch Touchless Drawers', 'Integrated Wine Cooler'],
    materials: ['Italian Carrara Marble', 'Burma Teak Cabinets', 'Bosch Built-in Appliances'],
    dimensions: '16ft x 14ft (224 sq.ft)',
    idealFor: 'Villas & Penthouses'
  },

  // 2. Wardrobe Designs
  {
    id: 'ward-1',
    title: 'Lacquered Glass Floor-to-Ceiling Sliding Wardrobe',
    categorySlug: 'wardrobe',
    categoryName: 'Wardrobe Designs',
    style: 'Italian Modern',
    budgetRange: '₹1.9L – ₹3.4L',
    image: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80'],
    description: 'Full-height 9ft sliding wardrobe with tinted black lacquered glass doors, internal sensor LED clothing rods, velvet accessory organizer drawers, and built-in tie racks.',
    keyFeatures: ['Top-Hung Soft-Closing Slider', 'Automatic Motion Sensor LEDs', 'Velvet Watch & Jewel Tray', 'Lacquered Glass Reflective Panel'],
    materials: ['Hettich InLine XL Sliding Track', 'Asahi Lacquered Glass', 'Century Plywood Core'],
    dimensions: '10ft Width x 9ft Height',
    idealFor: 'Master Bedrooms & Walk-in Closets'
  },
  {
    id: 'ward-2',
    title: 'Glass-Door Walk-In Closet Suite with Island Unit',
    categorySlug: 'wardrobe',
    categoryName: 'Wardrobe Designs',
    style: 'Warm Luxury',
    budgetRange: '₹3.8L – ₹6.2L',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80'],
    description: 'Dedicated dressing room featuring bronze aluminum glass doors, sensor-lit shoe display shelves, and a marble-top central accessory island.',
    keyFeatures: ['Bronze Glass Aluminum Doors', 'Marble Top Accessory Island', 'Sensor Lighting Shelves', 'Full-Height Mirror Unit'],
    materials: ['Toughened Tinted Glass', 'Century Plywood Core', 'Hafele Soft-Close Tracks'],
    dimensions: '12ft x 10ft (120 sq.ft)',
    idealFor: 'Master Bedroom Walk-in Dressing Rooms'
  },

  // 3. Bathroom Designs
  {
    id: 'bath-1',
    title: 'Statuario Marble Spa Bathroom with LED Mirror',
    categorySlug: 'bathroom',
    categoryName: 'Bathroom Designs',
    style: 'Italian Minimalist',
    budgetRange: '₹1.8L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'],
    description: 'A luxurious master bathroom clad in seamless Italian Statuario marble tile wall paneling. Features a wall-hung floating teak vanity, thermostatic matt black shower fixtures, and a frameless round LED smart mirror.',
    keyFeatures: ['Wall-hung Floating Teak Vanity', 'Matt Black Grohe Sanitary Ware', 'Frameless LED Touch Mirror', 'Niche Recessed LED Lighting'],
    materials: ['Statuario Italian Marble Tiles', 'Century Marine Plywood Vanity', 'Grohe Thermostatic Shower', 'Saint-Gobain Toughened Glass'],
    dimensions: '8ft x 10ft (80 sq.ft)',
    idealFor: 'Master Bedrooms & Luxury Apartments'
  },
  {
    id: 'bath-2',
    title: 'Terrazzo & Rose Gold Compact Powder Room',
    categorySlug: 'bathroom',
    categoryName: 'Bathroom Designs',
    style: 'Modern Eclectic',
    budgetRange: '₹1.2L – ₹2.4L',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80'],
    description: 'Compact yet striking powder room design featuring terrazzo wall accenting, brush rose gold brassware, vessel bowl basin, and warm ambient pendant lighting.',
    keyFeatures: ['Custom Terrazzo Backsplash', 'Rose Gold Monobloc Tap', 'Wall-Mounted Geberit Tank', 'Concealed Exhaust System'],
    materials: ['Custom Terrazzo Tiles', 'Kohler Sanitary Ware', 'Brass PVD Coated Fittings'],
    dimensions: '5ft x 6ft (30 sq.ft)',
    idealFor: 'Foyer Powder Rooms & Compact Flats'
  },
  {
    id: 'bath-3',
    title: 'Japanese Zen Bath with Teak Slats & Rain Shower',
    categorySlug: 'bathroom',
    categoryName: 'Bathroom Designs',
    style: 'Japandi Luxury',
    budgetRange: '₹2.5L – ₹4.8L',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'],
    description: 'Serene Japandi style bathroom incorporating anti-skid wooden teak slat flooring in shower enclosure, freestanding oval soaking tub, and ceiling recessed rain head shower.',
    keyFeatures: ['Freestanding Acrylic Soaking Tub', 'Teak Wood Shower Decking', 'Ceiling Rain Shower Jet', 'Anti-Fog Smart Mirror'],
    materials: ['Natural Burma Teak Decking', 'Villeroy & Boch Tub', 'Hansgrohe Raindance Shower'],
    dimensions: '12ft x 10ft (120 sq.ft)',
    idealFor: 'Villas, Penthouses & Bungalows'
  },

  // 4. Master Bedroom Designs
  {
    id: 'bed-1',
    title: 'Warm Velvet Upholstered Panel Bedroom with Fluted Louvers',
    categorySlug: 'master-bedroom',
    categoryName: 'Master Bedroom Designs',
    style: 'Warm Luxury',
    budgetRange: '₹3.5L – ₹6.2L',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'],
    description: 'Opulent master bedroom with full-wall floor-to-ceiling plush velvet cushioned headboard, fluted wooden louver side panels, brass bedside sconce lights, and floating side tables.',
    keyFeatures: ['Full-Wall Acoustic Velvet Headboard', 'Charcoal & Gold Fluted Louvers', 'Warm Cove Drop Ceiling', 'Floating Bedside Nightstands'],
    materials: ['Plush Velvet Upholstery', 'CenturyPly Core', 'Warm 3000K Strip Lights'],
    dimensions: '16ft x 14ft (224 sq.ft)',
    idealFor: 'Master Bedroom Suites'
  },
  {
    id: 'bed-2',
    title: 'Italian Minimalist Suite with Concealed Wardrobe & Cove Lighting',
    categorySlug: 'master-bedroom',
    categoryName: 'Master Bedroom Designs',
    style: 'Italian Minimalist',
    budgetRange: '₹2.9L – ₹5.4L',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Sleek master suite featuring a low-profile platform bed, veneered wall paneling with integrated warm ambient cove LEDs, and a concealed flush wardrobe wall.',
    keyFeatures: ['Platform Bed Frame', 'Concealed Wardrobe Wall', 'Peripheral Drop Ceiling', 'Wooden Floor Tiles'],
    materials: ['Teak Veneer Paneling', 'Century Plywood', 'Saint-Gobain Gypsum Ceiling'],
    dimensions: '14ft x 12ft (168 sq.ft)',
    idealFor: 'Contemporary Apartments'
  },

  // 5. Living Room Designs
  {
    id: 'liv-1',
    title: 'Italian Marble Living Room with Floating Console & Louvers',
    categorySlug: 'living-room',
    categoryName: 'Living Room Designs',
    style: 'Contemporary Classic',
    budgetRange: '₹4.5L – ₹8.5L',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Expansive living room design featuring an Italian Botticino marble wall backdrop, custom L-shaped suede sofa, brass ring chandelier, and floating veneer media console.',
    keyFeatures: ['Book-matched Italian Marble Backdrop', 'L-Shaped Custom Sectional Sofa', 'Brass Ring LED Chandelier', 'Concealed Audio Cable Raceway'],
    materials: ['Italian Botticino Marble', 'Natural Walnut Veneer', 'Teak Wood Framework'],
    dimensions: '22ft x 16ft (352 sq.ft)',
    idealFor: 'Living Rooms & Grand Lounges'
  },
  {
    id: 'liv-2',
    title: 'Skyline High-Rise Living Room with Panoramic Floor Windows',
    categorySlug: 'living-room',
    categoryName: 'Living Room Designs',
    style: 'Modern Minimalist',
    budgetRange: '₹3.8L – ₹7.2L',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Airy high-rise living area with neutral linen upholstery, double-height ceiling curtains, motorized smart shade automation, and accent lounge armchairs.',
    keyFeatures: ['Motorized Smart Curtain Track', 'Linen Upholstered Sectional', 'Ambient Magnetic Track Lights', 'Low-Profile Coffee Table'],
    materials: ['Imported Linen Fabric', 'Century Plywood', 'Somfy Curtain Motors'],
    dimensions: '20ft x 15ft (300 sq.ft)',
    idealFor: 'Penthouses & High-Rise Apartments'
  },

  // 6. Pooja Room Designs
  {
    id: 'pooja-1',
    title: 'Corian CNC Jaali Mandir with Brass Bells & LED Backlight',
    categorySlug: 'pooja-room',
    categoryName: 'Pooja Room Designs',
    style: 'Traditional Modern',
    budgetRange: '₹1.5L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'],
    description: 'Sanctuary Mandir with white DuPont Corian CNC carved Om lattice jaali wall, warm ambient backlight, solid teak wood altar drawers, and hanging brass bells.',
    keyFeatures: ['DuPont Corian CNC Carved Jaali', 'Soft Warm LED Backdrop Illumination', 'Teak Wood Storage Drawers', 'Brass Hanging Bells'],
    materials: ['DuPont White Corian', 'Solid Teak Wood', 'Brass Fixtures'],
    dimensions: '6ft x 5ft (30 sq.ft)',
    idealFor: 'Dedicated Pooja Rooms & Nook Corners'
  },

  // 7. TV Unit Designs
  {
    id: 'tv-1',
    title: 'Floating Marble TV Console with Charcoal Louvers & Display Ledges',
    categorySlug: 'tv-unit',
    categoryName: 'TV Unit Designs',
    style: 'Modern Minimalist',
    budgetRange: '₹1.2L – ₹2.5L',
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80'],
    description: 'Wall-mounted media center featuring a white quartz tile backdrop panel, vertical charcoal louvers, floating drawer unit, and ambient glass artifact display ledges.',
    keyFeatures: ['Floating Handleless Drawer Unit', 'Charcoal Fluted Paneling', 'Concealed Cable Raceway', 'Warm Under-Shelf LED Strips'],
    materials: ['Quartz Tile Backdrop', 'Charcoal Polymer Louvers', 'Century Plywood Core'],
    dimensions: '9ft Width x 7ft Height',
    idealFor: 'Living Rooms & Bedroom TV Walls'
  },
  {
    id: 'tv-2',
    title: 'Walnut Wood & Black Slate Media Wall with Fireplace Insert',
    categorySlug: 'tv-unit',
    categoryName: 'TV Unit Designs',
    style: 'Warm Luxury',
    budgetRange: '₹1.8L – ₹3.5L',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'],
    description: 'Bespoke walnut veneer media wall incorporating an electric flame fireplace insert, concealed soundbar slot, and soft warm ambient strip lights.',
    keyFeatures: ['Electric Fireplace Insert Unit', 'Concealed Soundbar Slot', 'Natural Walnut Veneer', 'Push-to-Open Storage Drawers'],
    materials: ['American Walnut Veneer', 'Black Slate Stone Tile', 'Century Plywood'],
    dimensions: '11ft Width x 8ft Height',
    idealFor: 'Spacious Living Rooms'
  },

  // 8. False Ceiling Designs
  {
    id: 'ceiling-1',
    title: 'Dual-Tier Perimeter Drop Cove Ceiling with Magnetic Track Light',
    categorySlug: 'false-ceiling',
    categoryName: 'False Ceiling Designs',
    style: 'Modern Architectural',
    budgetRange: '₹120 – ₹220 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'],
    description: 'Architectural false ceiling featuring a recessed central cove with warm COB strip lights, black magnetic track spotlights, and crisp Saint-Gobain gypsum finishing.',
    keyFeatures: ['Saint-Gobain Gypsum Board Finish', 'Black Magnetic Track Spotlights', 'Concealed Curtain Channel Cove', 'Zero Cracking Guarantee'],
    materials: ['Saint-Gobain Gypsum Boards', 'Gypsteel Framing', 'Philips LED Strip & Tracks'],
    dimensions: 'Customized per Room Size',
    idealFor: 'Living Rooms, Dining & Bedrooms'
  },
  {
    id: 'ceiling-2',
    title: 'Wooden Rafter Accent Ceiling with Recessed Warm LED Slots',
    categorySlug: 'false-ceiling',
    categoryName: 'False Ceiling Designs',
    style: 'Warm Japandi',
    budgetRange: '₹150 – ₹260 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'],
    description: 'Warm natural oak wooden rafter ceiling design over dining and living areas, adding architectural warmth and concealing HVAC vents.',
    keyFeatures: ['Burma Teak Wooden Rafters', 'Recessed Diffused LED Strips', 'AC Duct Concealment', 'Acoustic Sound Dampening'],
    materials: ['Teak Wood Rafters', 'Saint-Gobain Gypsum', 'Warm 3000K Lighting'],
    dimensions: 'Customized per Room Size',
    idealFor: 'Dining Rooms & Foyer Areas'
  },

  // 9. Kids Bedroom Designs
  {
    id: 'kids-1',
    title: 'Playful Loft Bunk Bed with Storage Stairs & Integrated Study',
    categorySlug: 'kids-bedroom',
    categoryName: 'Kids Bedroom Designs',
    style: 'Playful Modern',
    budgetRange: '₹2.2L – ₹3.8L',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'],
    description: 'Custom dual kids bedroom featuring a safe wooden loft bunk bed with built-in storage step drawers, ergonomic study desk, pinboard wall, and non-toxic pastel laminates.',
    keyFeatures: ['Storage Drawer Step Stairs', 'Ergonomic Dual Study Desk', 'Magnetic Whiteboard Panel', 'Rounded Soft Edges for Safety'],
    materials: ['Non-Toxic Laminates', 'Century Plywood Core', 'Soft-Close Safety Hinges'],
    dimensions: '12ft x 11ft (132 sq.ft)',
    idealFor: 'Shared Kids Bedrooms & Youth Rooms'
  },

  // 10. Balcony Designs
  {
    id: 'balc-1',
    title: 'Vertical Green Garden Balcony with Decking Tiles & Bar Unit',
    categorySlug: 'balcony',
    categoryName: 'Balcony Designs',
    style: 'Urban Oasis',
    budgetRange: '₹85,000 – ₹1.8L',
    image: 'https://images.unsplash.com/photo-1533779283484-839983806689?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1533779283484-839983806689?auto=format&fit=crop&w=1200&q=80'],
    description: 'High-rise balcony transformation featuring weather-proof Composite WPC wooden deck tiles, lush artificial green wall paneling, fold-down coffee bar counter, and warm bistro lights.',
    keyFeatures: ['Interlocking WPC Decking Tiles', 'Lush Vertical Green Wall', 'Fold-down Granite Bar Counter', 'Weather-proof LED String Lighting'],
    materials: ['WPC Composite Decking', 'Artificial Turf Wall', 'Black Powder-Coated Metal Railing'],
    dimensions: '12ft x 5ft (60 sq.ft)',
    idealFor: 'Apartment Balconies & Sit-Out Decks'
  },

  // 11. Dining Room Designs
  {
    id: 'dine-1',
    title: '6-Seater Onyx Marble Dining Table with Chandelier & Glass Buffet',
    categorySlug: 'dining-room',
    categoryName: 'Dining Room Designs',
    style: 'Contemporary Luxury',
    budgetRange: '₹3.2L – ₹5.8L',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'],
    description: 'Elegant dining space centered around an onyx marble top 6-seater dining table with brass accent legs, upholstered velvet chairs, floating glass crockery console, and pendant chandelier.',
    keyFeatures: ['6-Seater Onyx Marble Table Top', 'Plush Upholstered Dining Chairs', 'Brass Ring Chandelier Unit', 'Tinted Glass Buffet Console'],
    materials: ['Onyx Italian Marble', 'PVD Brass Coated Stainless Steel', 'Century Plywood'],
    dimensions: '14ft x 12ft (168 sq.ft)',
    idealFor: 'Dining Rooms & Open Living Spaces'
  },

  // 12. Foyer Designs
  {
    id: 'foyer-1',
    title: 'Statement Entryway Foyer with Shoe Console & Full Mirror',
    categorySlug: 'foyer',
    categoryName: 'Foyer Designs',
    style: 'Modern Luxury',
    budgetRange: '₹95,000 – ₹1.9L',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'],
    description: 'Welcoming entryway foyer design featuring a floating shoe console with louvers, full-height bronze tinted mirror paneling, key drop ledge, and warm accent wall sconce lighting.',
    keyFeatures: ['Floating Shoe Console with Ventilation', 'Full-Height Tinted Mirror Panel', 'Key Drop Drawer Tray', 'Warm Wall Sconce Illumination'],
    materials: ['Bronze Tinted Mirror', 'Teak Wood Veneer', 'PVD Brass Handles'],
    dimensions: '7ft x 5ft (35 sq.ft)',
    idealFor: 'Apartment Entryways & Villa Foyers'
  },

  // 13. Guest Bedroom Designs
  {
    id: 'guest-1',
    title: 'Compact Guest Room with Foldable Murphy Wall Bed & Study Desk',
    categorySlug: 'guest-bedroom',
    categoryName: 'Guest Bedroom Designs',
    style: 'Space Saving Modern',
    budgetRange: '₹1.8L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'],
    description: 'Multi-functional guest bedroom designed with a hydraulic foldable Murphy queen wall bed that seamlessly transforms the room into a home office study space during daytime.',
    keyFeatures: ['Hydraulic Foldable Murphy Bed', 'Integrated Study Desk Panel', '2-Door Sliding Wardrobe', 'Soft Ambient Headboard LED'],
    materials: ['German Hydraulic Wall Bed Hardware', 'Century Plywood Core', 'Laminate Finish'],
    dimensions: '11ft x 10ft (110 sq.ft)',
    idealFor: 'Guest Rooms & Multi-purpose Spaces'
  },

  // 14. Wall Decor & Paint Designs
  {
    id: 'wall-1',
    title: 'Asian Paints Royale Metallic Texture with Fluted Louver Panel',
    categorySlug: 'wall-decor',
    categoryName: 'Wall Decor & Paint',
    style: 'Contemporary Art',
    budgetRange: '₹45 – ₹110 / sq.ft',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'],
    description: 'Feature accent wall featuring Asian Paints Royale Play metallic texture finish flanked by charcoal gray polymer fluted louver strips and brass inlay profiles.',
    keyFeatures: ['Asian Paints Royale Metallic Finish', 'Charcoal Polymer Fluted Louvers', 'PVD Brass Inlay Strips', 'Wipeable & Scratch Resistant'],
    materials: ['Asian Paints Royale Play', 'Polymer Louvers', 'Brass Inlay Profiles'],
    dimensions: 'Customized per Wall Dimensions',
    idealFor: 'Living Room Feature Walls & Headboards'
  },

  // 15. Tile & Flooring Designs
  {
    id: 'floor-1',
    title: 'Italian Statuario Marble & Chevron SPC Hardwood Flooring',
    categorySlug: 'flooring-tiles',
    categoryName: 'Tile & Flooring Designs',
    style: 'Luxury Classic',
    budgetRange: '₹140 – ₹380 / sq.ft',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80'],
    description: 'Premium floor layout combining mirror-polished Italian Statuario marble slabs in the living hall with warm chevron SPC hardwood flooring in private bedrooms.',
    keyFeatures: ['Mirror-Polished Italian Marble Finish', '100% Waterproof SPC Hardwood Planks', 'Chevron Patterned Precision Jointing', 'Stain Resistant Sealing'],
    materials: ['Italian Statuario Marble', 'German SPC Hardwood Planks', 'Epoxy Grout Filling'],
    dimensions: 'Customized per Floor Plan',
    idealFor: 'Luxury Residences, Villas & Penthouses'
  },

  // 16. Study Room & Home Bar Designs
  {
    id: 'study-1',
    title: 'Ergonomic Executive Dual-Monitor Desk with Floating Bookshelves',
    categorySlug: 'study-room',
    categoryName: 'Study Room & Home Bar',
    style: 'Executive Modern',
    budgetRange: '₹1.6L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'],
    description: 'Dedicated executive home office study featuring a custom walnut desk with concealed wire management, dual-monitor arm mounts, floating bookshelf ledges, and warm task lighting.',
    keyFeatures: ['Concealed Power & Data Wire Raceway', 'Floating LED Bookshelf Ledges', 'Acoustic Wall Paneling', 'Leather Executive Chair'],
    materials: ['American Walnut Veneer', 'Century Plywood Core', 'Acoustic Felt Paneling'],
    dimensions: '10ft x 9ft (90 sq.ft)',
    idealFor: 'Home Offices & Executive Workspaces'
  },

  // 17. Crockery Unit Designs
  {
    id: 'crock-1',
    title: 'Tinted Glass LED Showcase Cabinet with Push-to-Open Drawers',
    categorySlug: 'crockery-unit',
    categoryName: 'Crockery Unit Designs',
    style: 'Modern Luxury',
    budgetRange: '₹1.1L – ₹2.4L',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'],
    description: 'Sophisticated dining wall crockery showcase cabinet featuring dark bronze aluminum framed glass doors, warm 3000K LED shelf lighting, and cutlery organizer drawers.',
    keyFeatures: ['Bronze Aluminum Glass Doors', 'Vertical LED Strip Shelf Lighting', 'Push-to-Open Soft Close Drawers', 'Velvet Cutlery Organizers'],
    materials: ['Toughened Tinted Glass', 'Hettich Push Hardware', 'Century Plywood Core'],
    dimensions: '7ft Width x 8ft Height',
    idealFor: 'Dining Rooms & Kitchen Alcoves'
  },

  // 18. Space Saving Furniture Designs
  {
    id: 'space-1',
    title: 'Multi-Functional Convertible Pullout Table & Hidden Storage Unit',
    categorySlug: 'space-saving',
    categoryName: 'Space Saving Furniture',
    style: 'Smart Ergonomic',
    budgetRange: '₹75,000 – ₹1.6L',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    description: 'Smart space-saving furniture solution featuring a pull-out dining table that slides flush into living room cabinetry, combined with hidden storage ottoman seating.',
    keyFeatures: ['Flush Pull-Out Extension Mechanism', 'Hidden Under-Seat Storage Ottomans', 'Scratch Resistant Acrylic Top', 'German Sliding Hardware'],
    materials: ['German Transformable Hardware', 'Century Ply 710', 'Scratch-Proof Laminate'],
    dimensions: 'Custom Convertible Sizing',
    idealFor: 'Compact 1BHK, 2BHK & Studio Flats'
  },
];

export const DesignIdeasPage: React.FC<DesignIdeasPageProps> = ({ categorySlug, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<DesignIdeaItem | null>(null);

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    } else {
      setSelectedCategory('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  const activeCategoryObj = CATEGORIES_DATA.find((c) => c.slug === selectedCategory);

  const filteredItems = DESIGN_IDEAS_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categorySlug === selectedCategory;
    const matchesStyle = selectedStyle === 'all' || item.style.toLowerCase().includes(selectedStyle.toLowerCase());
    return matchesCategory && matchesStyle;
  });

  const availableStyles = ['all', 'Italian Minimalist', 'Modern Minimalist', 'Japandi Luxury', 'Contemporary Classic', 'Warm Luxury', 'Traditional Modern'];

  return (
    <>
      <SEOHead
        title={activeCategoryObj ? `${activeCategoryObj.name} • Deinterio Luxury Ideas` : 'Interior Design Ideas & Room Inspirations'}
        description="Explore 500+ curated interior design ideas for kitchens, bedrooms, bathrooms, wardrobes, living rooms, and false ceilings with live material specs & instant quotes."
      />

      {/* Header Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Design Ideas', href: '#/design-ideas' },
          ...(activeCategoryObj ? [{ label: activeCategoryObj.name }] : [])
        ]}
        categoryBadge="DEINTERIO DESIGN GALLERY & CATALOG"
        title={activeCategoryObj ? activeCategoryObj.name : 'Curated Luxury Interior Design Ideas'}
        subtitle={activeCategoryObj ? activeCategoryObj.desc : 'Browse hand-crafted architectural room concepts engineered with 100% itemized pricing, German hardware, and 10-year warranties.'}
      />

      {/* Hero Category Showcase Banner when a category is selected */}
      {activeCategoryObj && (
        <section className="bg-[#FAF8F4] border-b border-[#E2DDD6] py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
                <span>{activeCategoryObj.icon}</span>
                <span>{activeCategoryObj.count}+ DESIGN CONCEPTS AVAILABLE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917]">
                {activeCategoryObj.name}
              </h1>
              <p className="text-sm sm:text-base text-[#5A5852] font-light leading-relaxed max-w-2xl">
                {activeCategoryObj.desc}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenBooking(activeCategoryObj.name)}
                  className="px-6 py-3 rounded-xl bg-[#13362B] text-[#C8AA7A] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C8AA7A]" />
                  <span>Get Free Consultation for {activeCategoryObj.name}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={activeCategoryObj.heroImage}
                  alt={activeCategoryObj.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Category Horizontal Selector Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#A88B57]" />
              <span>EXPLORE ROOM CATEGORIES ({CATEGORIES_DATA.length})</span>
            </span>
            <span className="text-xs font-mono text-[#6B6560]">Click category to filter designs</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2">
            <a
              href="#/design-ideas"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#13362B] text-[#C8AA7A] font-bold shadow-md border border-[#C8AA7A]/40'
                  : 'bg-white border border-[#E2DDD6] text-[#1A1917] hover:border-[#13362B]'
              }`}
            >
              All Design Ideas
            </a>

            {CATEGORIES_DATA.map((cat) => (
              <a
                key={cat.slug}
                href={`#/design-ideas/${cat.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = `#/design-ideas/${cat.slug}`;
                  setSelectedCategory(cat.slug);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#13362B] text-[#C8AA7A] font-bold shadow-md border border-[#C8AA7A]/40'
                    : 'bg-white border border-[#E2DDD6] text-[#1A1917] hover:border-[#13362B]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Style Filter Bar & Page Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F9F6F0] border border-[#EBE5DA]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-[#8C6D3B] shrink-0" />
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-[#1A1917] shrink-0">Filter Style:</span>
              {availableStyles.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStyle(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                    selectedStyle === st
                      ? 'bg-[#1A1917] text-white font-bold'
                      : 'bg-white text-[#5A5852] border border-[#E2DDD6] hover:bg-[#FAF8F4]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#6B6560]">
            <LayoutGrid className="w-4 h-4 text-[#A88B57]" />
            <span>Showing <strong>{filteredItems.length}</strong> Design Concepts</span>
          </div>
        </div>

        {/* Design Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E2DDD6] shadow-sm hover:shadow-2xl hover:border-[#13362B] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1917]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-[#13362B] shadow-sm">
                      {item.categoryName}
                    </span>

                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#1A1917] flex items-center justify-center hover:bg-[#13362B] hover:text-[#C8AA7A] transition-colors shadow-sm"
                      title="Inspect Full Specs & Photos"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Budget Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#C8AA7A] bg-[#13362B]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C8AA7A]/30">
                      Est: {item.budgetRange}
                    </span>
                    <span className="text-[10px] font-mono text-gray-300">
                      {item.style}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-normal text-[#1A1917] leading-snug group-hover:text-[#13362B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Key Feature Bullets */}
                  <div className="pt-2 space-y-1.5 border-t border-[#E2DDD6]">
                    {item.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#3A3833]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#13362B] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with GET FREE QUOTE BUTTON */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onOpenBooking(item.categoryName)}
                  className="w-full py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group/btn"
                >
                  <span>GET FREE QUOTE FOR THIS DESIGN</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveModalItem(item)}
                  className="w-full py-2 text-center text-[11px] font-mono text-[#8C6D3B] hover:text-[#13362B] font-semibold underline underline-offset-4 cursor-pointer block"
                >
                  Inspect Full Material Specs & Photos →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RELATED DESIGN CATEGORIES SECTION */}
        <div className="pt-12 border-t border-[#E2DDD6] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">EXPLORE SIMILAR ROOM CATEGORIES</span>
              <h3 className="font-serif text-2xl font-normal text-[#1A1917] mt-1">Transform Other Spaces in Your Residence</h3>
            </div>

            <a
              href="#/design-ideas"
              className="text-xs font-mono font-bold text-[#13362B] hover:text-[#8C6D3B] flex items-center gap-1"
            >
              <span>VIEW ALL 18 CATEGORIES</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES_DATA.filter((c) => c.slug !== selectedCategory).slice(0, 4).map((cat) => (
              <a
                key={cat.slug}
                href={`#/design-ideas/${cat.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = `#/design-ideas/${cat.slug}`;
                  setSelectedCategory(cat.slug);
                }}
                className="group relative rounded-2xl overflow-hidden border border-[#E2DDD6] bg-white hover:border-[#13362B] shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#13362B]">
                    {cat.icon} {cat.count}+ Concepts
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917] group-hover:text-[#13362B] transition-colors">{cat.name}</h4>
                  <p className="text-xs text-[#5A5852] font-light mt-1 line-clamp-2">{cat.desc}</p>
                </div>
                <div className="text-xs font-mono font-bold text-[#8C6D3B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM CONSULTATION BANNER */}
        <div className="rounded-3xl bg-[#13362B] text-white p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>DIRECT ARCHITECT CONSULTATION</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
              Like a Specific Design Idea? <br />
              <span className="italic text-[#C8AA7A]">Get an Exact Itemized BOQ Quote</span>
            </h3>
            <p className="text-xs sm:text-base text-[#D4C3A3] font-light leading-relaxed">
              Our principal architects will customize any design idea to fit your exact floor plan dimensions, material choices, and budget.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => onOpenBooking(activeCategoryObj ? activeCategoryObj.name : 'General Design Consultation')}
              className="px-8 py-4 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-mono uppercase font-bold text-xs tracking-wider transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>BOOK FREE DESIGN CONSULTATION</span>
            </button>
          </div>
        </div>

      </section>

      {/* DETAILED INSPECTION MODAL */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-[#1A1917]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto text-[#1A1917]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#E2DDD6] bg-white">
                <div>
                  <span className="px-3 py-0.5 rounded-full bg-[#13362B]/10 text-[10px] font-mono font-bold text-[#13362B] uppercase tracking-wider">
                    {activeModalItem.categoryName} • {activeModalItem.style}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1917] mt-1">{activeModalItem.title}</h3>
                </div>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2.5 rounded-full bg-[#1A1917]/5 text-[#1A1917] hover:bg-[#1A1917]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#E2DDD6]">
                  <img src={activeModalItem.image} alt={activeModalItem.title} className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2DDD6]">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-serif text-xl font-medium text-[#1A1917]">Design Concept Details</h4>
                    <p className="text-sm text-[#5A5852] font-light leading-relaxed">
                      {activeModalItem.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-wider block">Key Architectural Elements:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeModalItem.keyFeatures.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#3A3833]">
                            <CheckCircle2 className="w-4 h-4 text-[#13362B] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E2DDD6] space-y-4 shadow-xs">
                    <h4 className="font-serif text-lg font-medium text-[#13362B]">Verified Specifications</h4>

                    <div className="space-y-2 text-xs font-mono text-[#5A5852]">
                      <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                        <span>Est. Budget:</span>
                        <strong className="text-[#13362B] font-bold">{activeModalItem.budgetRange}</strong>
                      </div>
                      <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                        <span>Dimensions:</span>
                        <strong className="text-[#1A1917]">{activeModalItem.dimensions}</strong>
                      </div>
                      <div className="flex justify-between border-b border-[#E2DDD6] pb-1.5">
                        <span>Ideal For:</span>
                        <strong className="text-[#1A1917]">{activeModalItem.idealFor}</strong>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C6D3B] block mb-2">
                        Verified Materials Grade
                      </span>
                      <div className="space-y-1.5">
                        {activeModalItem.materials.map((mat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#1A1917]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#13362B] shrink-0" />
                            <span>{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const catName = activeModalItem.categoryName;
                        setActiveModalItem(null);
                        onOpenBooking(catName);
                      }}
                      className="w-full py-3 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#0E271F] transition-colors shadow-md cursor-pointer"
                    >
                      Get Quote for This Design
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
