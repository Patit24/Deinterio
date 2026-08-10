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
  style: string; // e.g. Minimalist, Italian Luxury, Scandinavian, Classic Heritage
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
  { slug: 'wardrobe', name: 'Wardrobe Designs', count: 98, icon: '🚪', heroImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80', desc: 'Floor-to-ceiling floor sliding wardrobes, walk-in closets, and lacquered glass finishes.' },
  { slug: 'bathroom', name: 'Bathroom Designs', count: 86, icon: '🚿', heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', desc: 'Spa-inspired luxury vanities, frameless glass shower enclosures, and Italian marble wall claddings.' },
  { slug: 'master-bedroom', name: 'Master Bedroom Designs', count: 112, icon: '🛏️', heroImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', desc: 'Acoustic headboards, warm cove ceiling lighting, integrated dressers, and serene color palettes.' },
  { slug: 'living-room', name: 'Living Room Designs', count: 145, icon: '🛋️', heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', desc: 'Italian minimalist lounge layouts, fluted wall louvers, custom sofa seating, and media walls.' },
  { slug: 'pooja-room', name: 'Pooja Room Designs', count: 54, icon: '🕉️', heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', desc: 'Traditional Corian Mandirs with intricate CNC jaali work, warm LED backlighting, and brass bells.' },
  { slug: 'tv-unit', name: 'TV Unit Designs', count: 76, icon: '📺', heroImage: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80', desc: 'Floating marble TV consoles, concealed cable management, integrated bookshelf & display ledges.' },
  { slug: 'false-ceiling', name: 'False Ceiling Designs', count: 92, icon: '✨', heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', desc: 'Cove ambient lighting, magnetic track lights, wooden rafter accents, and clean perimeter drop ceilings.' },
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
  // Bathroom Designs
  {
    id: 'bath-1',
    title: 'Statuario Marble Spa Bathroom with LED Mirror',
    categorySlug: 'bathroom',
    categoryName: 'Bathroom Designs',
    style: 'Italian Minimalist',
    budgetRange: '₹1.8L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    ],
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
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
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
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Serene Japandi style bathroom incorporating anti-skid wooden teak slat flooring in shower enclosure, freestanding oval soaking tub, and ceiling recessed rain head shower.',
    keyFeatures: ['Freestanding Acrylic Soaking Tub', 'Teak Wood Shower Decking', 'Ceiling Rain Shower Jet', 'Anti-Fog Smart Mirror'],
    materials: ['Natural Burma Teak Decking', 'Villeroy & Boch Tub', 'Hansgrohe Raindance Shower'],
    dimensions: '12ft x 10ft (120 sq.ft)',
    idealFor: 'Villas, Penthouses & Bungalows'
  },

  // Modular Kitchen Designs
  {
    id: 'kit-1',
    title: 'L-Shaped Handleless Acrylic Kitchen with Island',
    categorySlug: 'modular-kitchen',
    categoryName: 'Modular Kitchen Designs',
    style: 'Modern Minimalist',
    budgetRange: '₹3.2L – ₹6.5L',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
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
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Sleek parallel layout optimized for maximum efficiency with anti-fingerprint matt charcoal shutters paired with warm natural oak upper cabinets.',
    keyFeatures: ['Anti-Fingerprint Super Matt Finish', 'Dual Counter Efficiency Layout', 'Under-Cabinet Profile Lights', 'Granite Double Bowl Sink'],
    materials: ['Fenix NTM Matt Laminate', 'Blum Servo-Drive Drawers', 'Franke Granite Sink'],
    dimensions: '10ft x 8ft (80 sq.ft)',
    idealFor: 'Urban Apartments & High-Rise Flats'
  },

  // Wardrobe Designs
  {
    id: 'ward-1',
    title: 'Lacquered Glass Floor-to-Ceiling Sliding Wardrobe',
    categorySlug: 'wardrobe',
    categoryName: 'Wardrobe Designs',
    style: 'Italian Modern',
    budgetRange: '₹1.9L – ₹3.4L',
    image: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Full-height 9ft sliding wardrobe with tinted black lacquered glass doors, internal sensor LED clothing rods, velvet accessory organizer drawers, and built-in tie racks.',
    keyFeatures: ['Top-Hung Soft-Closing Slider', 'Automatic Motion Sensor LEDs', 'Velvet Watch & Jewel Tray', 'Lacquered Glass Reflective Panel'],
    materials: ['Hettich InLine XL Sliding Track', 'Asahi Lacquered Glass', 'Century Plywood Core'],
    dimensions: '10ft Width x 9ft Height',
    idealFor: 'Master Bedrooms & Walk-in Closets'
  },

  // Master Bedroom Designs
  {
    id: 'bed-1',
    title: 'Warm Velvet Upholstered Panel Bedroom with Fluted Louvers',
    categorySlug: 'master-bedroom',
    categoryName: 'Master Bedroom Designs',
    style: 'Warm Luxury',
    budgetRange: '₹3.5L – ₹6.2L',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Opulent master bedroom with full-wall floor-to-ceiling plush velvet cushioned headboard, fluted wooden louver side panels, brass bedside sconce lights, and floating side tables.',
    keyFeatures: ['Full-Wall Acoustic Velvet Headboard', 'Charcoal & Gold Fluted Louvers', 'Warm Cove Drop Ceiling', 'Floating Bedside Nightstands'],
    materials: ['Plush Velvet Upholstery', 'CenturyPly Core', 'Warm 3000K Strip Lights'],
    dimensions: '16ft x 14ft (224 sq.ft)',
    idealFor: 'Master Bedroom Suites'
  },

  // Living Room Designs
  {
    id: 'liv-1',
    title: 'Italian Marble Living Room with Floating Console & Louvers',
    categorySlug: 'living-room',
    categoryName: 'Living Room Designs',
    style: 'Contemporary Classic',
    budgetRange: '₹4.5L – ₹8.5L',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Expansive living room design featuring an Italian Botticino marble wall backdrop, custom L-shaped suede sofa, brass ring chandelier, and floating veneer media console.',
    keyFeatures: ['Book-matched Italian Marble Backdrop', 'L-Shaped Custom Sectional Sofa', 'Brass Ring LED Chandelier', 'Concealed Audio Cable Raceway'],
    materials: ['Italian Botticino Marble', 'Natural Walnut Veneer', 'Teak Wood Framework'],
    dimensions: '22ft x 16ft (352 sq.ft)',
    idealFor: 'Living Rooms & Grand Lounges'
  },

  // Pooja Room Designs
  {
    id: 'pooja-1',
    title: 'Corian CNC Jaali Mandir with Brass Bells & LED Backlight',
    categorySlug: 'pooja-room',
    categoryName: 'Pooja Room Designs',
    style: 'Traditional Modern',
    budgetRange: '₹1.5L – ₹3.2L',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Sanctuary Mandir with white DuPont Corian CNC carved Om lattice jaali wall, warm ambient backlight, solid teak wood altar drawers, and hanging brass bells.',
    keyFeatures: ['DuPont Corian CNC Carved Jaali', 'Soft Warm LED Backdrop Illumination', 'Teak Wood Storage Drawers', 'Brass Hanging Bells'],
    materials: ['DuPont White Corian', 'Solid Teak Wood', 'Brass Fixtures'],
    dimensions: '6ft x 5ft (30 sq.ft)',
    idealFor: 'Dedicated Pooja Rooms & Nook Corners'
  },

  // TV Unit Designs
  {
    id: 'tv-1',
    title: 'Floating Marble TV Unit with Charcoal Louvers & Display Ledges',
    categorySlug: 'tv-unit',
    categoryName: 'TV Unit Designs',
    style: 'Modern Minimalist',
    budgetRange: '₹1.2L – ₹2.5L',
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Wall-mounted media center featuring a white quartz tile backdrop panel, vertical charcoal louvers, floating drawer unit, and ambient glass artifact display ledges.',
    keyFeatures: ['Floating Handleless Drawer Unit', 'Charcoal Fluted Paneling', 'Concealed Cable Raceway', 'Warm Under-Shelf LED Strips'],
    materials: ['Quartz Tile Backdrop', 'Charcoal Polymer Louvers', 'Century Plywood Core'],
    dimensions: '9ft Width x 7ft Height',
    idealFor: 'Living Rooms & Bedroom TV Walls'
  },

  // False Ceiling Designs
  {
    id: 'ceiling-1',
    title: 'Dual-Tier Perimeter Drop Cove Ceiling with Magnetic Track Light',
    categorySlug: 'false-ceiling',
    categoryName: 'False Ceiling Designs',
    style: 'Modern Architectural',
    budgetRange: '₹120 – ₹220 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Architectural false ceiling featuring a recessed central cove with warm COB strip lights, black magnetic track spotlights, and crisp Saint-Gobain gypsum finishing.',
    keyFeatures: ['Saint-Gobain Gypsum Board Finish', 'Black Magnetic Track Spotlights', 'Concealed Curtain Channel Cove', 'Zero Cracking Guarantee'],
    materials: ['Saint-Gobain Gypsum Boards', 'Gypsteel Framing', 'Philips LED Strip & Tracks'],
    dimensions: 'Customized per Room Size',
    idealFor: 'Living Rooms, Dining & Bedrooms'
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

  // Unique styles list for filter
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
