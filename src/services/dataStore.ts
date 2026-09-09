import React from 'react';

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  startDate?: string;
  estCompletionDate?: string;
  completedDate?: string;
  progressPercent: number;
  notes?: string;
  photos?: string[];
  documents?: string[];
}

export interface ClientAccount {
  id: string;
  username: string;
  password: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  projectName: string;
  projectCode: string;
  location: string;
  manager: string;
  managerPhone?: string;
  progress: number;
  currentPhase: string;
  paidMilestone: string;
  totalMilestone: string;
  nextStageTitle: string;
  startDate?: string;
  expectedCompletionDate?: string;
  lastUpdatedDate?: string;
  phases: { phase: string; title: string; status: 'Completed' | 'In Progress' | 'Upcoming'; date: string }[];
  workItems: WorkItem[];
  dailyPhotos: { title: string; type: string; time: string; img: string; category?: string }[];
  approvals: { id: string; title: string; status: 'Pending Review' | 'Approved'; desc: string }[];
  documents: { title: string; size: string; date: string; url?: string; type?: string }[];
  chatMessages: { sender: string; text: string; time: string; isClient?: boolean }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  deliverables: string[];
  highlights: string;
  problem?: string;
  solution?: string;
  materials?: string[];
  process?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  timeline: string;
  area: string;
  rating: string;
  image: string;
  beforeImg: string;
  afterImg: string;
  story: string;
  materials: string[];
  badge: string;
}

export interface PricingTierItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  popular?: boolean;
  tag: string;
  desc: string;
  features: string[];
}

export interface RoomDimensionItem {
  id: string;
  roomName: string;
  length: number;
  width: number;
  sqft: number;
  preset?: string;
}

export interface ServiceScopeItem {
  furniture: boolean;
  painting: boolean;
  electrical: boolean;
  falseCeiling: boolean;
}

export interface ElectricalPointsConfig {
  lights: number;
  fans: number;
  acPoints: number;
  geyserPoints: number;
  microwavePoints: number;
  fridgePoints: number;
  chimneyPoints: number;
  totalPoints?: number;
}

export interface TradeBreakdownItem {
  trade: string;
  selection: string;
  rateInfo: string;
  cost: number;
}

export interface LeadItem {
  id: string;
  quotationId?: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  city: string;
  date: string;
  status: 'NEW' | 'CONTACTED' | 'SITE_VISIT_SCHEDULED' | 'QUOTATION_SENT' | 'CONVERTED' | 'REJECTED' | 'CLOSED';
  details?: string;
  requirements?: string[];
  carpetArea?: string;
  packageTier?: string;
  rooms?: {
    livingRoom?: number;
    kitchen?: number;
    bedroom?: number;
    bathroom?: number;
    dining?: number;
    roomCount?: number;
  };
  roomDimensions?: RoomDimensionItem[];
  serviceScope?: ServiceScopeItem;
  totalAreaSqft?: number;
  ratePerSqft?: number;
  falseCeilingSqft?: number;
  falseCeilingCost?: number;
  electricalPoints?: ElectricalPointsConfig;
  tradeBreakdown?: TradeBreakdownItem[];
  staircaseIncluded?: boolean;
  notes?: string;
  estimatedAmount?: string;
}

export interface TrackerProject {
  id: string;
  name: string;
  location: string;
  type: string;
  currentStage: string;
  progress: number;
  estCompletion: string;
  manager: string;
  managerAvatar?: string;
  heroImage: string;
  badge: 'Live' | 'Completed';
  status: 'WORKING' | 'COMPLETED';
  pmNote: string;
  area?: string;
  rating?: string;
  completedDate?: string;
  beforeImg?: string;
  afterImg?: string;
  duration?: string;
  testimonial?: string;
  clientName?: string;
  timeline?: { milestone: string; date: string; status: 'Completed' | 'Active' | 'Upcoming' }[];
}

export interface ClientStory {
  id: string | number;
  client: string;
  location: string;
  duration: string;
  lang: string;
  thumbnail: string;
  videoUrl: string;
  quote?: string;
  rating?: string;
  featured?: boolean;
}

// Initial Seed Data
const DEFAULT_WORK_ITEMS: WorkItem[] = [
  {
    id: 'w-1',
    title: '3D Laser Site Measurement & BIM Survey',
    category: 'Design & Planning',
    description: 'Sub-millimeter 3D spatial laser scanning of walls, ceiling heights, and plumbing conduits.',
    status: 'COMPLETED',
    startDate: 'Jun 10, 2026',
    completedDate: 'Jun 12, 2026',
    progressPercent: 100,
    notes: 'Laser point cloud scan verified. Structural floorplan signed by client.',
    photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-2',
    title: 'Space Planning & 3D Design Approval',
    category: 'Design & Planning',
    description: 'Finalization of 3D architectural renders, furniture layout, electrical conduit mapping, and material swatches.',
    status: 'COMPLETED',
    startDate: 'Jun 14, 2026',
    completedDate: 'Jun 24, 2026',
    progressPercent: 100,
    notes: 'Approved Italian Statuario marble TV backdrop and high-gloss kitchen finishes.',
    photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-3',
    title: 'Civil & Wall Chasing Preparation',
    category: 'Civil & Structural',
    description: 'Wall chasing for hidden electrical wiring, Sika chemical waterproofing coating in wet areas.',
    status: 'COMPLETED',
    startDate: 'Jun 26, 2026',
    completedDate: 'Jul 05, 2026',
    progressPercent: 100,
    notes: 'Waterproofing flood test passed with 100% dry slab certification.',
    photos: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-4',
    title: 'Electrical & Smart Conduit Wiring',
    category: 'Electrical & Plumbing',
    description: 'Concealed copper wiring, Havells MCB distribution box setup, ambient LED strip channels.',
    status: 'COMPLETED',
    startDate: 'Jul 07, 2026',
    completedDate: 'Jul 18, 2026',
    progressPercent: 100,
    notes: 'All electrical conduits pressure tested. Smart lighting loops pre-wired.',
    photos: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-5',
    title: 'False Ceiling Gypsteel Framing & Gypsum Board Installation',
    category: 'Ceiling & Lighting',
    description: 'Saint-Gobain Gypsteel framing installation, perimeter drop cove ceiling, curtain pocket slots.',
    status: 'COMPLETED',
    startDate: 'Jul 20, 2026',
    completedDate: 'Jul 30, 2026',
    progressPercent: 100,
    notes: 'Cove lighting slots completed with zero sag or cracking.',
    photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-6',
    title: 'Modular Kitchen Cabinet & Hardware Assembly',
    category: 'Modular Woodworking',
    description: 'Installation of 100% CenturyPly BWP Marine Plywood carcasses, Hafele soft-close tandem drawers, and acrylic doors.',
    status: 'IN_PROGRESS',
    startDate: 'Aug 02, 2026',
    estCompletionDate: 'Aug 14, 2026',
    progressPercent: 75,
    notes: 'Base cabinets aligned. Quartz countertop templating active.',
    photos: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-7',
    title: 'Master Bedroom Floor-to-Ceiling Wardrobes',
    category: 'Modular Woodworking',
    description: 'Lacquered glass sliding door installation, internal sensor LED lighting, velvet organizer drawers.',
    status: 'IN_PROGRESS',
    startDate: 'Aug 05, 2026',
    estCompletionDate: 'Aug 18, 2026',
    progressPercent: 60,
    notes: 'Sliding top-hung track mounted. Velvet drawer fitting under progress.',
    photos: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'w-8',
    title: 'Asian Paints Royale Premium Painting & Fluted Paneling',
    category: 'Finishes & Decor',
    description: 'Putty sanding, Royale Aspira velvet emulsion paint application, and solid teak fluted louver installation.',
    status: 'PENDING',
    startDate: 'Aug 20, 2026',
    estCompletionDate: 'Aug 28, 2026',
    progressPercent: 0,
    notes: 'Scheduled to start post wardrobe installation.',
  },
  {
    id: 'w-9',
    title: 'Furniture Fitting, Lighting Fixtures & Deep Cleaning',
    category: 'Furniture & Styling',
    description: 'Custom sectional sofa placement, chandelier hanging, smart switch plate installation, and deep site cleaning.',
    status: 'PENDING',
    startDate: 'Sep 01, 2026',
    estCompletionDate: 'Sep 06, 2026',
    progressPercent: 0,
    notes: 'Final touchup phase.',
  },
  {
    id: 'w-10',
    title: '45-Point QA Audit, Client Inspection & Key Handover',
    category: 'Handover & QA',
    description: 'Comprehensive 45-point quality audit, water pressure test, hinge alignment, and 10-year warranty certificate issuance.',
    status: 'PENDING',
    startDate: 'Sep 08, 2026',
    estCompletionDate: 'Sep 10, 2026',
    progressPercent: 0,
    notes: 'Final formal handover milestone.',
  },
];

const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: 'client-1',
    username: 'client',
    password: 'password123',
    clientName: 'Rahul & Priya Verma',
    clientEmail: 'rahul.verma@gmail.com',
    clientPhone: '+91 98301 22941',
    projectName: 'New Town Residence — Kolkata',
    projectCode: 'DENTORIO LIVE TRACKER #D-402',
    location: 'Action Area I, New Town, Kolkata',
    manager: 'Sourav Banerjee',
    managerPhone: '+91 98300 11223',
    progress: 72,
    currentPhase: 'Modular Kitchen Assembly & Master Bedroom Wardrobe Fitting',
    paidMilestone: '₹18,50,000',
    totalMilestone: '₹24,00,000',
    nextStageTitle: 'Pay Stage 4',
    startDate: 'Jun 10, 2026',
    expectedCompletionDate: 'Sep 10, 2026',
    lastUpdatedDate: 'Today, 10:30 AM',
    phases: [
      { phase: '01', title: 'Discovery Consultation & Site Measurement', status: 'Completed', date: 'Jun 10, 2026' },
      { phase: '02', title: 'Space Planning & 3D Visualization', status: 'Completed', date: 'Jun 24, 2026' },
      { phase: '03', title: 'Material Selection & Quotation Approval', status: 'Completed', date: 'Jul 08, 2026' },
      { phase: '04', title: 'Modular Kitchen & Wardrobes Assembly', status: 'In Progress', date: 'Aug 03, 2026 (Active)' },
      { phase: '05', title: 'False Ceiling, Lighting & Interior Styling', status: 'Upcoming', date: 'Aug 20, 2026' },
      { phase: '06', title: 'Quality Inspection & Final Handover', status: 'Upcoming', date: 'Sep 10, 2026' },
    ],
    workItems: DEFAULT_WORK_ITEMS,
    dailyPhotos: [
      { title: 'Modular Kitchen Cabinet Unboxing', type: 'Site Photo', time: 'Today, 10:00 AM', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', category: 'During Work' },
      { title: 'Living Room False Ceiling Progress', type: 'Site Photo', time: 'Yesterday, 04:30 PM', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', category: 'During Work' },
      { title: 'Master Bedroom Wardrobe Alignment', type: 'Site Photo', time: 'Aug 01, 2026', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', category: 'During Work' },
      { title: 'Original Bare Shell Site Measurement', type: 'Before Photo', time: 'Jun 10, 2026', img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', category: 'Before Work' },
    ],
    approvals: [
      { id: '1', title: 'Modular Kitchen Laminate Finish (Merino High Gloss)', status: 'Pending Review', desc: 'Sample swatch #M-802 with champagne gold aluminum handles.' },
      { id: '2', title: 'Living Room Cove Lighting & LED Strips', status: 'Approved', desc: 'Warm 3000K indirect ceiling LEDs.' },
    ],
    documents: [
      { title: 'Dentorio Interior Contract & BOQ Quotation.pdf', size: '4.2 MB', date: 'Jun 10, 2026', type: 'Quotation' },
      { title: 'Tax Invoice Milestone 3 (Paid).pdf', size: '1.1 MB', date: 'Jul 16, 2026', type: 'Invoice' },
      { title: 'Dentorio 10-Year Post-Completion Warranty.pdf', size: '2.8 MB', date: 'Jun 12, 2026', type: 'Warranty' },
    ],
    chatMessages: [
      { sender: 'Project Manager Sourav', text: 'Namaste! The Hafele soft-close fittings & CenturyPly marine plywood arrived at the New Town site today.', time: '10:15 AM', isClient: false },
      { sender: 'Rahul Verma', text: 'Great! Are we on track for the false ceiling and lighting installation this Friday?', time: '10:42 AM', isClient: true },
      { sender: 'Project Manager Sourav', text: 'Yes, ahead of schedule! Updated 3D renders and daily site photos uploaded for review.', time: '11:05 AM', isClient: false },
    ],
  },
  {
    id: 'client-2',
    username: 'ballygunge',
    password: 'password123',
    clientName: 'Dr. Debabrata Roy',
    clientEmail: 'dr.debabrata@gmail.com',
    clientPhone: '+91 98310 99402',
    projectName: 'Ballygunge Heritage Villa',
    projectCode: 'DENTORIO LIVE TRACKER #D-108',
    location: 'Ballygunge Circular Road, South Kolkata',
    manager: 'Ananya Mukherjee',
    managerPhone: '+91 98300 55443',
    progress: 100,
    currentPhase: 'Handover Completed — Warranty Active',
    paidMilestone: '₹48,00,000',
    totalMilestone: '₹48,00,000',
    nextStageTitle: 'Warranty Active',
    startDate: 'Jan 15, 2026',
    expectedCompletionDate: 'Jun 01, 2026',
    lastUpdatedDate: 'Jun 01, 2026',
    phases: [
      { phase: '01', title: 'Discovery & Structural Audit', status: 'Completed', date: 'Jan 15, 2026' },
      { phase: '02', title: '3D Design Walkthrough', status: 'Completed', date: 'Feb 01, 2026' },
      { phase: '03', title: 'Precision Factory Woodworking', status: 'Completed', date: 'Mar 10, 2026' },
      { phase: '04', title: 'Italian Marble Cladding', status: 'Completed', date: 'Apr 05, 2026' },
      { phase: '05', title: '45-Point Quality Inspection', status: 'Completed', date: 'May 12, 2026' },
      { phase: '06', title: 'Key Handover & Warranty Activation', status: 'Completed', date: 'Jun 01, 2026' },
    ],
    workItems: DEFAULT_WORK_ITEMS.map(w => ({ ...w, status: 'COMPLETED' as const, progressPercent: 100 })),
    dailyPhotos: [
      { title: 'Handover Photography', type: 'Finished Photo', time: 'Jun 01, 2026', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', category: 'Completed Work' },
    ],
    approvals: [
      { id: '1', title: 'Italian Botticino Marble Slab Inspection', status: 'Approved', desc: 'Verified 0% cracks and polished finish.' },
    ],
    documents: [
      { title: 'Final Handover Certificate & 10-Year Digital Warranty.pdf', size: '5.1 MB', date: 'Jun 01, 2026', type: 'Warranty' },
    ],
    chatMessages: [
      { sender: 'Principal Architect Ananya', text: 'Congratulations Dr. Roy! Your Ballygunge Villa digital 10-year warranty is active.', time: '09:00 AM', isClient: false },
    ],
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'interior-architecture',
    title: 'Turnkey Luxury Interior Architecture',
    tagline: 'Complete architectural transformation from 3D laser scan to 10-year warranty handover.',
    category: 'Full Residence',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['3D Spatial Laser Scan', 'Structural Layout Planning', 'CenturyPly Marine Plywood', 'Italian Marble Wall Paneling'],
    highlights: 'Penalty-backed 98% on-time delivery with zero hidden BOQ cost overruns.',
    problem: 'Homeowners struggle with fragmented contractors, uncoordinated electricians and plumbers, hidden item BOQ price jumps, and non-certified materials.',
    solution: 'Full turnkey architectural execution managed by a dedicated CEPT/IIT principal architect. Includes 3D spatial simulation, itemized fixed BOQ, and weekly live video progress telemetry.',
    materials: ['Italian Botticino & Calacatta Marble', 'CenturyPly Marine Plywood', 'Hafele & Hettich Hardware', 'Saint-Gobain Gypsum False Ceilings', 'Asian Paints Royale Aspira Velvet Finish'],
    process: ['Discovery & Floorplan Review', '3D Spatial Walkthrough', 'Itemized Guaranteed BOQ Signing', 'Precision Factory Joinery Production', 'Handover & 10-Year Warranty Certificate'],
  },
  {
    id: 'modular-kitchens',
    title: 'High-Gloss Acrylic Modular Kitchens',
    tagline: 'Custom island & parallel kitchens engineered for Indian cooking styles with Hafele fittings.',
    category: 'Kitchen Architecture',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Hafele Soft-Close Tandem Boxes', 'Quartz Heat-Resistant Counters', 'Merino High Gloss Laminate', 'Under-Cabinet Sensor LEDs'],
    highlights: '0.5mm precision CNC joinery manufactured at our Rajarhat woodworking facility.',
    problem: 'Traditional kitchen contractors suffer from warping plywood under Indian humidity, bubbling laminates, rusty hinges within 2 years, and unorganized storage space.',
    solution: 'Deinterio Modular Kitchens feature 100% CenturyPly Club Prime BWP Marine Plywood, 0.5mm PUR edge-banded acrylic doors, Hafele soft-close tandem boxes, and custom spice/grain pullouts.',
    materials: ['CenturyPly Club Prime 710 BWP Plywood', 'Hafele Sensys 110° Soft-Close Hinges', 'Merino High-Gloss Acrylic Sheet', 'Kaff Smart Touch Induction & Chimney', 'Quartz Heat & Stain Resistant Countertop'],
    process: ['3D Laser Wall & Plumbing Audit', 'Precision Factory Joinery Woodworking', 'Live PM Progress Dispatch', 'On-Site Dustless Installation', 'Final 45-Point Water & Hinge Inspection'],
  },
  {
    id: 'master-bedrooms',
    title: 'Master Suite Sanctuaries & Wardrobes',
    tagline: 'Floor-to-ceiling floor walk-in wardrobes, upholstered headboards, and acoustic ceiling slots.',
    category: 'Bedrooms & Suites',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Glass Floor-to-Ceiling Wardrobes', 'Integrated Sensor Lighting', 'Teak Wood Fluted Accent Panels', 'Custom Velvet Upholstery'],
    highlights: 'Designed for optimal acoustic isolation and ambient 3000K warm circadian lighting.',
  },
  {
    id: 'living-lounge',
    title: 'Bespoke Living Room & Lounge Architecture',
    tagline: 'Expansive formal living areas featuring Italian marble TV consoles and concealed HVAC slots.',
    category: 'Living & Dining',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Italian Botticino Wall Cladding', 'Concealed LED Linear Slots', 'Custom Leather Sofa Suites', 'Acoustic Wall Paneling'],
    highlights: 'Seamless integration of concealed ducted AC vents and ambient ceiling coves.',
  },
  {
    id: 'living-lounge',
    title: 'Artisanal Living & Pooja Sanctuaries',
    tagline: 'Vastu-aligned Corian Mandir architecture, Italian marble TV walls, fluted teak louvers, and warm ambient lighting.',
    category: 'Living & Sacred Spaces',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Custom Corian CNC Jaali Mandir', 'Italian Statuario Marble TV Wall', 'Burma Teak Fluted Accent Walls', 'Concealed Ambient Cove Illumination'],
    highlights: 'Handcrafted spiritual sanctums and opulent living halls engineered for Kolkata luxury homes.',
    problem: 'Homeowners struggle with contractors who cannot integrate traditional Vastu Mandirs into modern minimalist living spaces without creating architectural discord.',
    solution: 'Deinterio custom-engineers precision-cut Corian Mandirs with concealed LED backlights, solid brass bells, and premium Italian marble wall cladding seamlessly integrated with ducted HVAC.',
    materials: ['Corian Solid Surface Sheet', 'Italian Statuario Marble', 'Century Plywood BWP 710', 'Antique Brass Profiles', '3000K Warm Dimming LEDs'],
    process: ['Vastu Orientation & Spatial Scan', '3D Jaali Detail Simulation', 'Factory CNC Fabrication & Polish', 'Dustless On-Site Installation', 'Sanctum Handover'],
  },
  {
    id: 'commercial-cafes',
    title: 'Commercial Boutiques & Executive Offices',
    tagline: 'High-impact retail, café, and executive headquarters designed for brand status and footfall.',
    category: 'Commercial Spaces',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Fluted Brass Counter Bars', 'Acoustic Ceilings', 'Custom Commercial Joinery', 'High-Traffic Flooring'],
    highlights: 'Turnkey fast-track execution designed for rapid commercial launch.',
  },
  {
    id: 'heritage-restoration',
    title: 'Heritage Bungalow & Colonial Restoration',
    tagline: 'Preserving Kolkata heritage architecture with Burma teak, vintage brass, and modern climate retrofits.',
    category: 'Heritage Architecture',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Original Teak Structural Restoration', 'Lime Plaster & Heritage Masonry', 'Antique Brass Hardware Retrofitting', 'Concealed Modern Ducted Climate Control'],
    highlights: 'Restoring historic residences across Ballygunge, Alipore, and North Kolkata with authentic craftsmanship.',
    problem: 'Heritage properties suffer from dampness, deteriorating lime mortar, decaying woodwork, and outdated electrical wiring that clashes with traditional aesthetics.',
    solution: 'Deinterio deploys structural preservation specialists, authentic chemical damp-proofing, handcrafted Burma teak joinery, and concealed HVAC climate systems that preserve colonial heritage.',
    materials: ['Reclaimed Burma Teak', 'Antique Solid Brass Fittings', 'Sika Chemical Damp Proofing', 'Breathable Lime Plaster', 'Belgian Stained Glass'],
    process: ['Heritage Structural & Damp Audit', '3D Laser Architectural Documentation', 'Craftsman Joinery Restoration', 'Concealed Modern Infrastructure', 'Handover & Heritage Preservation Dossier'],
  },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'ballygunge-villa',
    title: 'Ballygunge Heritage Villa',
    category: 'Villa & Bungalow',
    location: 'Ballygunge Circular Road, South Kolkata',
    budget: '₹48 Lakhs',
    timeline: '16 Weeks',
    area: '5,200 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    story: 'Complete architectural transformation of an independent South Kolkata bungalow into a modern sanctuary. Features floor-to-ceiling Italian marble wall paneling, fluted teak wood accents, and warm concealed LED ceiling slots.',
    materials: ['CenturyPly Marine Plywood', 'Hettich Soft-Close Hardware', 'Italian Botticino Marble', 'Saint-Gobain Gypsum'],
    badge: 'Residential Villa • Deinterio Signature',
  },
  {
    id: 'uniworld-penthouse',
    title: 'Uniworld City Sky Penthouse',
    category: '4BHK Penthouse',
    location: 'Action Area III, New Town, Kolkata',
    budget: '₹34 Lakhs',
    timeline: '14 Weeks',
    area: '3,800 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    story: 'High-rise luxury penthouse overlooking the New Town skyline. Designed with a custom island modular kitchen, acrylic high-gloss cabinetry, and automated smart lounge lighting.',
    materials: ['Hafele Kitchen Hardware', 'Merino High Gloss Laminate', 'Quartz Countertops', 'Warm 3000K Lighting'],
    badge: '4BHK Penthouse • New Town',
  },
  {
    id: 'park-street-residence',
    title: 'Park Street Luxury Residence',
    category: '3BHK Apartment',
    location: 'Park Street, Central Kolkata',
    budget: '₹26 Lakhs',
    timeline: '12 Weeks',
    area: '2,600 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    story: 'Contemporary 3BHK residence combining warm neutral color palettes, plush velvet sofa seating, concealed wardrobe storage, and acoustic ceiling treatment.',
    materials: ['Asian Paints Royale', 'Century Ply 710', 'Hafele Soft Close', 'Upholstered Fabric'],
    badge: '3BHK Turnkey • Central Kolkata',
  },
  {
    id: 'salt-lake-headquarters',
    title: 'Salt Lake Corporate Headquarters',
    category: 'Corporate & Bank',
    location: 'Sector V, Salt Lake, Kolkata',
    budget: '₹42 Lakhs',
    timeline: '10 Weeks',
    area: '6,000 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    story: 'High-security corporate banking workspace featuring executive glass cabins, acoustic ceiling tiles, modular workstation clusters, and ergonomic seating.',
    materials: ['Toughened Glass Partitions', 'Acoustic Ceiling Tiles', 'Modular Workstations', 'Branded Carpet Tiles'],
    badge: 'Corporate Office • Salt Lake',
  },
  {
    id: 'rajarhat-cafe',
    title: 'Rajarhat Gourmet Café & Lounge',
    category: 'Commercial',
    location: 'Chinar Park, Rajarhat, Kolkata',
    budget: '₹22 Lakhs',
    timeline: '8 Weeks',
    area: '2,400 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    story: 'Bespoke commercial café interior with warm brass ceiling lighting, fluted wooden service bar counter, and customized booth seating.',
    materials: ['Warm Brass Fixtures', 'Fluted Teak Paneling', 'Terrazzo Flooring', 'Custom Upholstery'],
    badge: 'Commercial Café • Rajarhat',
  },
];

const INITIAL_PRICING: PricingTierItem[] = [
  {
    id: 'economy',
    name: 'Economy Package',
    price: '₹1,000',
    unit: '/ sq.ft',
    tag: 'Value Standard',
    desc: 'BWR Grade Plywood standard package with Ebco/Godrej hardware, Asian Paints Royale finish, and durable 0.8mm laminates.',
    features: [
      'ISI 710 BWR Grade Hardwood Plywood',
      'Ebco / Godrej High-Durability Hardware',
      '0.8mm - 1.0mm Anti-Scratch Laminates',
      'Asian Paints Royale Luxury Emulsion',
      'Designer False Ceiling Available @ ₹120/sq.ft',
      '5-Year Material Warranty',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    price: '₹1,200',
    unit: '/ sq.ft',
    popular: true,
    tag: 'Popular Choice',
    desc: 'Century Sainik 710 BWP marine plywood with Hettich Germany soft-close fittings and 1mm merino suede/high-gloss laminates.',
    features: [
      'CenturyPly Sainik 710 BWP Marine Grade',
      'Hettich Germany Soft-Close Hinges & Channels',
      '1mm Merino / Greenlam Suede Laminates',
      'Saint-Gobain False Ceiling Framing @ ₹120/sq.ft',
      'Schneider Electric / Havells Switches',
      '10-Year Digital Warranty Certificate',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '₹1,500',
    unit: '/ sq.ft',
    tag: 'Turnkey Luxury',
    desc: 'Top-tier turnkey residential luxury featuring Century Club Prime 710 BWP, Hafele/Blum Austrian fittings, and PU polish finishes.',
    features: [
      'CenturyPly Club Prime 710 BWP Marine Grade',
      'Hafele / Blum Austrian Soft-Close Tandem Systems',
      'PU Polish & 1.2mm High-Gloss Acrylic Finishes',
      'KalingaStone / Nano-White Quartz 18mm Slabs',
      'False Ceiling with Ambient 3000K Warm LED Coves',
      'Dedicated Principal Architect Site Supervision',
      '10-Year Comprehensive Digital Warranty',
    ],
  },
];

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Sengupta',
    email: 'vikram.sen@gmail.com',
    phone: '+91 98311 00293',
    type: 'Villa (5,200 sqft)',
    budget: '₹48 Lakhs',
    city: 'Ballygunge, Kolkata',
    date: 'Today, 14:20',
    status: 'NEW',
    details: 'Interested in Ballygunge Heritage Villa style layout.',
    requirements: ['Living Room', 'Modular Kitchen', 'Master Bedroom', 'False Ceiling'],
    carpetArea: '5200',
    estimatedAmount: '₹48,00,000',
  },
  {
    id: 'lead-2',
    name: 'Ananya Sen',
    email: 'ananya.sen@gmail.com',
    phone: '+91 98302 99182',
    type: '4BHK Penthouse (3,800 sqft)',
    budget: '₹34 Lakhs',
    city: 'New Town, Kolkata',
    date: 'Yesterday',
    status: 'CONTACTED',
    details: 'Wants modular kitchen and smart automation.',
    requirements: ['Modular Kitchen', 'Wardrobe', 'Pooja Room', 'Lighting'],
    carpetArea: '3800',
    estimatedAmount: '₹34,00,000',
  },
];

const INITIAL_TRACKER_PROJECTS: TrackerProject[] = [
  {
    id: 'live-1',
    name: 'Moderna Apartment',
    location: 'New Town, Kolkata',
    type: 'Apartment (3 BHK)',
    currentStage: 'False Ceiling Work',
    progress: 62,
    estCompletion: '28 Aug, 2026',
    manager: 'Arijit D.',
    managerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'Live',
    status: 'WORKING',
    pmNote: 'Saint-Gobain gypsum ceiling frames installed. Indirect LED slot cutouts complete.',
    timeline: [
      { milestone: 'Site Preparation & Demolition', date: '10 Jun, 2026', status: 'Completed' },
      { milestone: 'Electrical & Plumbing Wiring', date: '28 Jun, 2026', status: 'Completed' },
      { milestone: 'False Ceiling & Gypsum POP', date: '20 Jul, 2026', status: 'Active' },
      { milestone: 'Modular Furniture Installation', date: '10 Aug, 2026', status: 'Upcoming' },
      { milestone: 'Final Quality Inspection & Handover', date: '28 Aug, 2026', status: 'Upcoming' },
    ],
  },
  {
    id: 'live-2',
    name: 'Siddha Sky Villa',
    location: 'Rajarhat, Kolkata',
    type: 'Villa / Bungalow',
    currentStage: 'Electrical Work',
    progress: 48,
    estCompletion: '12 Oct, 2026',
    manager: 'Pooja S.',
    managerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    badge: 'Live',
    status: 'WORKING',
    pmNote: 'Concealed copper wiring running through living room ceiling slots. DB box fixed.',
    timeline: [
      { milestone: 'Architectural Layout Approval', date: '15 May, 2026', status: 'Completed' },
      { milestone: 'Civil Masonry & Demolition', date: '10 Jun, 2026', status: 'Completed' },
      { milestone: 'Concealed Electrical & Plumbing', date: '15 Jul, 2026', status: 'Active' },
      { milestone: 'False Ceiling & Flooring', date: '25 Aug, 2026', status: 'Upcoming' },
      { milestone: 'Handover', date: '12 Oct, 2026', status: 'Upcoming' },
    ],
  },
  {
    id: 'live-3',
    name: 'Garia Garden Residence',
    location: 'Garia, Kolkata',
    type: 'Apartment (2 BHK)',
    currentStage: 'Flooring Work',
    progress: 35,
    estCompletion: '05 Sep, 2026',
    manager: 'Sourav M.',
    managerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    badge: 'Live',
    status: 'WORKING',
    pmNote: 'Italian marble tile alignment underway in master bedroom and dining hall.',
    timeline: [
      { milestone: 'Site Measurement', date: '01 Jun, 2026', status: 'Completed' },
      { milestone: 'Civil & Wall Plastering', date: '20 Jun, 2026', status: 'Completed' },
      { milestone: 'Marble Flooring Laying', date: '28 Jul, 2026', status: 'Active' },
      { milestone: 'Modular Wardrobes Fitting', date: '15 Aug, 2026', status: 'Upcoming' },
      { milestone: 'Final Painting & Handover', date: '05 Sep, 2026', status: 'Upcoming' },
    ],
  },
  {
    id: 'comp-1',
    name: 'Woodstone Residence',
    location: 'Ballygunge, Kolkata',
    type: '4BHK Apartment',
    currentStage: 'Handover Completed',
    progress: 100,
    area: '3,450 sq.ft',
    completedDate: 'May 2026',
    duration: '14 Weeks',
    rating: '5.0',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    testimonial: 'Deinterio transformed our 4BHK apartment in Ballygunge beyond expectation.',
    clientName: 'Sujit & Mousumi Dutta',
    manager: 'Sourav Banerjee',
    estCompletion: 'Handed Over',
    badge: 'Completed',
    status: 'COMPLETED',
    pmNote: 'All 45-point QA checks verified. Handover certificate & 10-year warranty activated.',
  },
  {
    id: 'comp-2',
    name: 'Lakeview Villa',
    location: 'New Town, Kolkata',
    type: 'Villa',
    currentStage: 'Handover Completed',
    progress: 100,
    area: '5,200 sq.ft',
    completedDate: 'April 2026',
    duration: '20 Weeks',
    rating: '4.9',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    testimonial: 'Superb execution of modular kitchen, false ceiling, and dining chandelier.',
    clientName: 'Subir & Poulomi Ghosh',
    manager: 'Arijit D.',
    estCompletion: 'Handed Over',
    badge: 'Completed',
    status: 'COMPLETED',
    pmNote: 'Handover complete with custom Burma teak dining set and high-gloss acrylic kitchen.',
  },
  {
    id: 'comp-3',
    name: 'Thinkspace Executive Office',
    location: 'Salt Lake, Kolkata',
    type: 'Commercial Office',
    currentStage: 'Handover Completed',
    progress: 100,
    area: '2,800 sq.ft',
    completedDate: 'March 2026',
    duration: '10 Weeks',
    rating: '4.8',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    testimonial: 'Modern acoustic glass workstations and boardroom design.',
    clientName: 'Apex Financial Services',
    manager: 'Pooja S.',
    estCompletion: 'Handed Over',
    badge: 'Completed',
    status: 'COMPLETED',
    pmNote: 'Fast-track corporate execution delivered 5 days ahead of schedule.',
  },
];

const INITIAL_CLIENT_STORIES: ClientStory[] = [
  {
    id: 'story-1',
    client: 'Anirban & Swati Sengupta',
    location: 'Uniworld City, New Town, Kolkata',
    duration: '02:15',
    lang: 'EN / BN',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: 'Deinterio gave our 4BHK apartment an international luxury feel while keeping the warm Bengali heritage touches.',
    rating: '5.0 ★',
    featured: true,
  },
  {
    id: 'story-2',
    client: 'Rajesh & Pooja Agarwal',
    location: 'Ballygunge Circular Road, Kolkata',
    duration: '01:45',
    lang: 'EN / HN',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: 'Zero hidden costs. What was quoted in the BOQ is exactly what we paid. Incredible transparency!',
    rating: '5.0 ★',
  },
  {
    id: 'story-3',
    client: 'Dr. Debasis Roy & Family',
    location: 'Salt Lake Sector III, Kolkata',
    duration: '02:30',
    lang: 'EN / BN',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: 'The 3D walkthrough was so precise that the actual handover looked 100% identical. Truly Kolkata’s best design studio.',
    rating: '4.9 ★',
  },
];

class DataStoreService {
  private getStorage<T>(key: string, defaultVal: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('deinterio_datastore_updated', { detail: { key } }));
      }
    } catch (err) {
      console.error('Error writing dataStore to localStorage:', err);
    }
  }

  // --- ADMIN SECURITY & AUTH ---
  getAdminPassword(): string {
    return this.getStorage<string>('deinterio_admin_password', 'admin123');
  }

  setAdminPassword(newPass: string): void {
    this.setStorage('deinterio_admin_password', newPass.trim() || 'admin123');
  }

  // --- CLIENT ACCOUNTS ---
  getClients(): ClientAccount[] {
    return this.getStorage<ClientAccount[]>('deinterio_clients', INITIAL_CLIENTS);
  }

  saveClients(clients: ClientAccount[]): void {
    this.setStorage('deinterio_clients', clients);
  }

  authenticateClient(usernameOrEmail: string, pass: string): ClientAccount | null {
    const clients = this.getClients();
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();
    return clients.find(c => 
      (c.username.toLowerCase() === cleanUser || 
       c.clientEmail?.toLowerCase() === cleanUser ||
       (cleanUser.length > 5 && c.clientPhone && c.clientPhone.replace(/\D/g, '').includes(cleanUser.replace(/\D/g, '')))) &&
      c.password === cleanPass
    ) || null;
  }

  saveClient(client: ClientAccount): void {
    const clients = this.getClients();
    const idx = clients.findIndex(c => c.id === client.id);
    if (idx >= 0) {
      clients[idx] = client;
    } else {
      clients.push(client);
    }
    this.saveClients(clients);
  }

  deleteClient(id: string): void {
    const clients = this.getClients().filter(c => c.id !== id);
    this.saveClients(clients);
  }

  // --- SERVICES CMS ---
  getServices(): ServiceItem[] {
    return this.getStorage<ServiceItem[]>('deinterio_services', INITIAL_SERVICES);
  }

  saveServices(services: ServiceItem[]): void {
    this.setStorage('deinterio_services', services);
  }

  saveService(service: ServiceItem): void {
    const list = this.getServices();
    const idx = list.findIndex(s => s.id === service.id);
    if (idx >= 0) {
      list[idx] = service;
    } else {
      list.push(service);
    }
    this.saveServices(list);
  }

  deleteService(id: string): void {
    const list = this.getServices().filter(s => s.id !== id);
    this.saveServices(list);
  }

  // --- PROJECTS CMS ---
  getProjects(): ProjectItem[] {
    return this.getStorage<ProjectItem[]>('deinterio_projects', INITIAL_PROJECTS);
  }

  saveProjects(projects: ProjectItem[]): void {
    this.setStorage('deinterio_projects', projects);
  }

  saveProject(project: ProjectItem): void {
    const list = this.getProjects();
    const idx = list.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
    } else {
      list.push(project);
    }
    this.saveProjects(list);
  }

  deleteProject(id: string): void {
    const list = this.getProjects().filter(p => p.id !== id);
    this.saveProjects(list);
  }

  // --- PRICING CMS ---
  getPricing(): PricingTierItem[] {
    return this.getStorage<PricingTierItem[]>('deinterio_pricing', INITIAL_PRICING);
  }

  savePricing(pricing: PricingTierItem[]): void {
    this.setStorage('deinterio_pricing', pricing);
  }

  savePricingTier(tier: PricingTierItem): void {
    const list = this.getPricing();
    const idx = list.findIndex(t => t.id === tier.id);
    if (idx >= 0) {
      list[idx] = tier;
    } else {
      list.push(tier);
    }
    this.savePricing(list);
  }

  // --- LEADS ---
  getLeads(): LeadItem[] {
    return this.getStorage<LeadItem[]>('deinterio_leads', INITIAL_LEADS);
  }

  saveLeads(leads: LeadItem[]): void {
    this.setStorage('deinterio_leads', leads);
  }

  addLead(lead: Omit<LeadItem, 'id' | 'date' | 'status'> & { status?: LeadItem['status'] }): void {
    const leads = this.getLeads();
    const newLead: LeadItem = {
      ...lead,
      status: lead.status || 'NEW',
      id: `lead-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    leads.unshift(newLead);
    this.setStorage('deinterio_leads', leads);
  }

  updateLeadStatus(leadId: string, status: LeadItem['status'], notes?: string): void {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === leadId);
    if (idx >= 0) {
      leads[idx].status = status;
      if (notes) leads[idx].notes = notes;
      this.saveLeads(leads);
    }
  }

  convertLeadToClient(leadId: string): ClientAccount | null {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return null;

    // Create client
    const newUsername = lead.name.toLowerCase().replace(/[^a-z0-9]/g, '') || `client${Date.now()}`;
    const newClient: ClientAccount = {
      id: `client-${Date.now()}`,
      username: newUsername,
      password: 'password123',
      clientName: lead.name,
      clientEmail: lead.email,
      clientPhone: lead.phone,
      projectName: `${lead.type} — ${lead.city}`,
      projectCode: `DENTORIO LIVE TRACKER #D-${Math.floor(100 + Math.random() * 900)}`,
      location: lead.city || 'Kolkata, West Bengal',
      manager: 'Sourav Banerjee',
      managerPhone: '+91 98300 11223',
      progress: 10,
      currentPhase: 'Discovery Consultation & Site Measurement',
      paidMilestone: '₹0',
      totalMilestone: lead.estimatedAmount || lead.budget || '₹15,00,000',
      nextStageTitle: 'Pay Stage 1 Booking Advance',
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expectedCompletionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdatedDate: 'Just now',
      phases: [
        { phase: '01', title: 'Discovery Consultation & Site Measurement', status: 'In Progress', date: 'Active' },
        { phase: '02', title: 'Space Planning & 3D Visualization', status: 'Upcoming', date: 'Upcoming' },
        { phase: '03', title: 'Material Selection & Quotation Approval', status: 'Upcoming', date: 'Upcoming' },
        { phase: '04', title: 'Modular Woodworking & Assembly', status: 'Upcoming', date: 'Upcoming' },
        { phase: '05', title: 'False Ceiling, Painting & Styling', status: 'Upcoming', date: 'Upcoming' },
        { phase: '06', title: 'Quality Inspection & Final Handover', status: 'Upcoming', date: 'Upcoming' },
      ],
      workItems: DEFAULT_WORK_ITEMS.map((w, idx) => ({
        ...w,
        status: idx === 0 ? ('IN_PROGRESS' as const) : ('PENDING' as const),
        progressPercent: idx === 0 ? 30 : 0,
      })),
      dailyPhotos: [],
      approvals: [],
      documents: [
        { title: `Quotation_${lead.name.replace(/\s+/g, '_')}.pdf`, size: '2.4 MB', date: 'Today', type: 'Quotation' },
      ],
      chatMessages: [
        { sender: 'System', text: 'Welcome to Deinterio Client Portal! Your project telemetry tracker is active.', time: 'Just now', isClient: false },
      ],
    };

    this.saveClient(newClient);
    this.updateLeadStatus(leadId, 'CONVERTED');

    return newClient;
  }

  // --- TRACKER PROJECTS (ONGOING & COMPLETED) ---
  getTrackerProjects(): TrackerProject[] {
    return this.getStorage<TrackerProject[]>('deinterio_tracker_projects', INITIAL_TRACKER_PROJECTS);
  }

  saveTrackerProject(proj: TrackerProject): void {
    const list = this.getTrackerProjects();
    const idx = list.findIndex((p) => p.id === proj.id);
    if (idx >= 0) {
      list[idx] = proj;
    } else {
      list.unshift(proj);
    }
    this.setStorage('deinterio_tracker_projects', list);
  }

  markTrackerProjectComplete(id: string): void {
    const list = this.getTrackerProjects();
    const item = list.find((p) => p.id === id);
    if (item) {
      item.status = 'COMPLETED';
      item.badge = 'Completed';
      item.progress = 100;
      item.currentStage = 'Handover Completed';
      item.completedDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      this.setStorage('deinterio_tracker_projects', list);
    }
  }

  deleteTrackerProject(id: string): void {
    const list = this.getTrackerProjects().filter((p) => p.id !== id);
    this.setStorage('deinterio_tracker_projects', list);
  }

  // --- CLIENT STORIES (AUTO-ROLL) ---
  getClientStories(): ClientStory[] {
    return this.getStorage<ClientStory[]>('deinterio_client_stories', INITIAL_CLIENT_STORIES);
  }

  saveClientStory(story: ClientStory): void {
    let list = this.getClientStories();
    const idx = list.findIndex((s) => s.id === story.id);
    if (idx >= 0) {
      list[idx] = story;
    } else {
      // Add new story at the beginning
      list = [story, ...list];
      // Keep maximum 4 stories: auto-remove/trim oldest
      if (list.length > 4) {
        list = list.slice(0, 4);
      }
    }
    this.setStorage('deinterio_client_stories', list);
  }

  deleteClientStory(id: string | number): void {
    const list = this.getClientStories().filter((s) => s.id !== id);
    this.setStorage('deinterio_client_stories', list);
  }
}

export const dataStore = new DataStoreService();
