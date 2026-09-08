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

export interface LeadItem {
  id: string;
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
  notes?: string;
  estimatedAmount?: string;
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
    title: 'Space Planning & 3D VR Design Approval',
    category: 'Design & Planning',
    description: 'Finalization of 3D VR renders, furniture layout, electrical conduit mapping, and material swatches.',
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
      { phase: '02', title: '3D VR Walkthrough', status: 'Completed', date: 'Feb 01, 2026' },
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
    solution: 'Full turnkey architectural execution managed by a dedicated CEPT/IIT principal architect. Includes 3D VR spatial simulation, itemized fixed BOQ, and weekly live video progress telemetry.',
    materials: ['Italian Botticino & Calacatta Marble', 'CenturyPly Marine Plywood', 'Hafele & Hettich Hardware', 'Saint-Gobain Gypsum False Ceilings', 'Asian Paints Royale Aspira Velvet Finish'],
    process: ['Discovery & Floorplan Review', '3D VR Spatial Walkthrough', 'Itemized Guaranteed BOQ Signing', 'Precision Factory Joinery Production', 'Handover & 10-Year Warranty Certificate'],
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
    process: ['3D Laser Wall & Plumbing Audit', 'Precision Factory Joinery Woodworking', 'Live IoT Progress Dispatch', 'On-Site Dustless Installation', 'Final 45-Point Water & Hinge Inspection'],
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
    id: 'smart-automation',
    title: 'Smart Home Automation & Lighting Control',
    tagline: 'Real-time mobile PM project telemetry app integrated with smart lighting and climate zoning.',
    category: 'Spatial Technology',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Live Project Progress App', 'Automated Scene Lighting', 'Motorized Curtain Control', 'Climate Sensors'],
    highlights: 'Track daily site progress photos, milestone logs, and material dispatches in real-time.',
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
];

const INITIAL_PRICING: PricingTierItem[] = [
  {
    id: 'essentials',
    name: 'Essentials Tier',
    price: '₹1,250',
    unit: '/ sq.ft',
    tag: 'Turnkey Foundation',
    desc: 'Ideal for 2BHK/3BHK apartments seeking solid structural durability and clean minimalist design.',
    features: [
      'CenturyPly Commercial Marine Grade Plywood',
      'Hettich Soft-Close Drawer Runners',
      'Merino Matte 0.8mm Laminate Finish',
      'Saint-Gobain False Ceiling with Warm LEDs',
      'Asian Paints Royale Shyne Finish',
      '5-Year Material Warranty',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Tier',
    price: '₹1,850',
    unit: '/ sq.ft',
    popular: true,
    tag: 'Most Popular',
    desc: 'Our flagship turnkey residential tier combining CenturyPly BWP marine plywood, Hafele fittings, and acrylic kitchens.',
    features: [
      'CenturyPly Club Prime 710 BWP Plywood',
      'Hafele Sensys 110° Soft-Close Hardware',
      'High-Gloss Acrylic Kitchen Doors',
      'Quartz Heat-Resistant Countertops',
      'Floor-to-Ceiling Wardrobes with Sensor LEDs',
      'Live PM Progress Telemetry',
      '10-Year Digital Warranty Certificate',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Signature',
    price: '₹2,600',
    unit: '/ sq.ft',
    tag: 'Bespoke Sanctuaries',
    desc: 'Uncompromising luxury for penthouses and villas featuring Italian Botticino marble, teak fluting, and full smart automation.',
    features: [
      'Italian Botticino & Calacatta Marble Paneling',
      'Bespoke Teak Wood Fluted Accent Walls',
      'Motorized Drapery & Curtains',
      'Smart Lighting & Climate Automation',
      'Double-Height Chandelier Ceiling Slots',
      'Dedicated Principal Architect Project Lead',
      'Lifetime Maintenance & Annual Audit',
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
    } catch (err) {
      console.error('Error writing dataStore to localStorage:', err);
    }
  }

  // --- CLIENT ACCOUNTS ---
  getClients(): ClientAccount[] {
    return this.getStorage<ClientAccount[]>('deinterio_clients', INITIAL_CLIENTS);
  }

  saveClients(clients: ClientAccount[]): void {
    this.setStorage('deinterio_clients', clients);
  }

  authenticateClient(username: string, pass: string): ClientAccount | null {
    const clients = this.getClients();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();
    return clients.find(c => c.username.toLowerCase() === cleanUser && c.password === cleanPass) || null;
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
}

export const dataStore = new DataStoreService();
