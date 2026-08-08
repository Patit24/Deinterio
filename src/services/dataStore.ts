import React from 'react';

export interface ClientAccount {
  id: string;
  username: string;
  password: string;
  clientName: string;
  projectName: string;
  projectCode: string;
  location: string;
  manager: string;
  progress: number;
  currentPhase: string;
  paidMilestone: string;
  totalMilestone: string;
  nextStageTitle: string;
  phases: { phase: string; title: string; status: 'Completed' | 'In Progress' | 'Upcoming'; date: string }[];
  dailyPhotos: { title: string; type: string; time: string; img: string }[];
  approvals: { id: string; title: string; status: 'Pending Review' | 'Approved'; desc: string }[];
  documents: { title: string; size: string; date: string; url?: string }[];
  chatMessages: { sender: string; text: string; time: string }[];
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
  details?: string;
}

// Initial Seed Data
const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: 'client-1',
    username: 'client',
    password: 'password123',
    clientName: 'Rahul & Priya Verma',
    projectName: 'New Town Residence — Kolkata',
    projectCode: 'DENTORIO LIVE TRACKER #D-402',
    location: 'Action Area I, New Town',
    manager: 'Sourav Banerjee',
    progress: 72,
    currentPhase: 'Modular Kitchen Assembly & Master Bedroom Wardrobe Fitting',
    paidMilestone: '₹18,50,000',
    totalMilestone: '₹24,00,000',
    nextStageTitle: 'Pay Stage 4',
    phases: [
      { phase: '01', title: 'Discovery Consultation & Site Measurement', status: 'Completed', date: 'Jun 10, 2026' },
      { phase: '02', title: 'Space Planning & 3D Visualization', status: 'Completed', date: 'Jun 24, 2026' },
      { phase: '03', title: 'Material Selection & Quotation Approval', status: 'Completed', date: 'Jul 08, 2026' },
      { phase: '04', title: 'Modular Kitchen & Wardrobes Assembly', status: 'In Progress', date: 'Aug 03, 2026 (Active)' },
      { phase: '05', title: 'False Ceiling, Lighting & Interior Styling', status: 'Upcoming', date: 'Aug 20, 2026' },
      { phase: '06', title: 'Quality Inspection & Final Handover', status: 'Upcoming', date: 'Sep 10, 2026' },
    ],
    dailyPhotos: [
      { title: 'Modular Kitchen Cabinet Unboxing', type: 'Site Photo', time: 'Today, 10:00 AM', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Living Room False Ceiling Progress', type: 'Site Photo', time: 'Yesterday, 04:30 PM', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Master Bedroom Wardrobe Alignment', type: 'Site Photo', time: 'Aug 01, 2026', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80' },
    ],
    approvals: [
      { id: '1', title: 'Modular Kitchen Laminate Finish (Merino High Gloss)', status: 'Pending Review', desc: 'Sample swatch #M-802 with champagne gold aluminum handles.' },
      { id: '2', title: 'Living Room Cove Lighting & LED Strips', status: 'Approved', desc: 'Warm 3000K indirect ceiling LEDs.' },
    ],
    documents: [
      { title: 'Dentorio Interior Contract & BOQ Quotation.pdf', size: '4.2 MB', date: 'Jun 10, 2026' },
      { title: 'Tax Invoice Milestone 3 (Paid).pdf', size: '1.1 MB', date: 'Jul 16, 2026' },
      { title: 'Dentorio 10-Year Post-Completion Warranty.pdf', size: '2.8 MB', date: 'Jun 12, 2026' },
    ],
    chatMessages: [
      { sender: 'Project Manager Sourav', text: 'Namaste! The Hettich soft-close fittings & CenturyPly marine plywood arrived at the New Town site today.', time: '10:15 AM' },
      { sender: 'You', text: 'Great! Are we on track for the false ceiling and lighting installation this Friday?', time: '10:42 AM' },
      { sender: 'Project Manager Sourav', text: 'Yes, ahead of schedule! Updated 3D renders and daily site photos uploaded for review.', time: '11:05 AM' },
    ],
  },
  {
    id: 'client-2',
    username: 'ballygunge',
    password: 'password123',
    clientName: 'Dr. Debabrata Roy',
    projectName: 'Ballygunge Heritage Villa',
    projectCode: 'DENTORIO LIVE TRACKER #D-108',
    location: 'Ballygunge Circular Road, South Kolkata',
    manager: 'Ananya Mukherjee',
    progress: 100,
    currentPhase: 'Handover Completed — Warranty Active',
    paidMilestone: '₹48,00,000',
    totalMilestone: '₹48,00,000',
    nextStageTitle: 'Warranty Active',
    phases: [
      { phase: '01', title: 'Discovery & Structural Audit', status: 'Completed', date: 'Jan 15, 2026' },
      { phase: '02', title: '3D VR Walkthrough', status: 'Completed', date: 'Feb 01, 2026' },
      { phase: '03', title: 'German Woodworking Production', status: 'Completed', date: 'Mar 10, 2026' },
      { phase: '04', title: 'Italian Marble Cladding', status: 'Completed', date: 'Apr 05, 2026' },
      { phase: '05', title: '45-Point Quality Inspection', status: 'Completed', date: 'May 12, 2026' },
      { phase: '06', title: 'Key Handover & Warranty Activation', status: 'Completed', date: 'Jun 01, 2026' },
    ],
    dailyPhotos: [
      { title: 'Handover Photography', type: 'Finished Photo', time: 'Jun 01, 2026', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    ],
    approvals: [
      { id: '1', title: 'Italian Botticino Marble Slab Inspection', status: 'Approved', desc: 'Verified 0% cracks and polished finish.' },
    ],
    documents: [
      { title: 'Final Handover Certificate & 10-Year Digital Warranty.pdf', size: '5.1 MB', date: 'Jun 01, 2026' },
    ],
    chatMessages: [
      { sender: 'Principal Architect Ananya', text: 'Congratulations Dr. Roy! Your Ballygunge Villa digital 10-year warranty is active.', time: '09:00 AM' },
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
    materials: ['Italian Botticino & Calacatta Marble', 'CenturyPly Marine Plywood', 'Hettich German Hardware', 'Saint-Gobain Gypsum False Ceilings', 'Asian Paints Royale Aspira Velvet Finish'],
    process: ['Discovery & Floorplan Review', '3D VR Spatial Walkthrough', 'Itemized Guaranteed BOQ Signing', 'German Joinery Production', 'Handover & 10-Year Warranty Certificate'],
  },
  {
    id: 'modular-kitchens',
    title: 'German High-Gloss Modular Kitchens',
    tagline: 'Custom island & parallel kitchens engineered for Indian cooking styles with Hafele fittings.',
    category: 'Kitchen Architecture',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Hafele Soft-Close Tandem Boxes', 'Quartz Heat-Resistant Counters', 'Merino High Gloss Laminate', 'Under-Cabinet Sensor LEDs'],
    highlights: '0.5mm precision CNC joinery manufactured at our Rajarhat woodworking facility.',
    problem: 'Traditional kitchen contractors suffer from warping plywood under Indian humidity, bubbling laminates, rusty hinges within 2 years, and unorganized storage space.',
    solution: 'Deinterio German Modular Kitchens feature 100% CenturyPly Club Prime BWP Marine Plywood, 0.5mm PUR edge-banded acrylic doors, Hafele German soft-close tandem boxes, and custom spice/grain pullouts.',
    materials: ['CenturyPly Club Prime 710 BWP Plywood', 'Hafele Sensys 110° Soft-Close Hinges', 'Merino High-Gloss Acrylic Sheet', 'Kaff Smart Touch Induction & Chimney', 'Quartz Heat & Stain Resistant Countertop'],
    process: ['3D Laser Wall & Plumbing Audit', 'Factory CNC Precision Woodworking', 'Sub-Zero IoT Telemetry Dispatch', 'On-Site Dustless Installation', 'Final 45-Point Water & Hinge Inspection'],
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
    title: 'Sub-Zero IoT Home Automation & Climate Control',
    tagline: 'Real-time mobile PM project telemetry app integrated with smart lighting and climate zoning.',
    category: 'Spatial Technology',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
    deliverables: ['Live Project Progress App', 'Automated Scene Lighting', 'Motorized Curtain Control', 'Sub-Zero Climate Sensors'],
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
    materials: ['CenturyPly Marine Plywood', 'Hettich German Fittings', 'Italian Botticino Marble', 'Saint-Gobain Gypsum'],
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
    id: 'alipore-duplex',
    title: 'Alipore Royal Duplex Sanctuary',
    category: 'Duplex Residence',
    location: 'Alipore Road, South Kolkata',
    budget: '₹55 Lakhs',
    timeline: '18 Weeks',
    area: '4,500 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    story: 'Opulent duplex apartment with double-height ceiling in the living lounge, motorized sheer drapery, and custom champagne gold metal inlays.',
    materials: ['Champagne Gold Metal Inlays', 'Calacatta Marble', 'Custom Velvet Upholstery', 'Somfy Motorized Tracks'],
    badge: 'Luxury Duplex • Alipore',
  },
  {
    id: 'rajarhat-cafe',
    title: 'Artisan Coffee Roasters & Lounge',
    category: 'Commercial Café',
    location: 'Chinar Park, Rajarhat, Kolkata',
    budget: '₹28 Lakhs',
    timeline: '10 Weeks',
    area: '2,400 sq.ft',
    rating: '5.0 ★★★★★',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    beforeImg: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    story: 'Industrial brutalist coffee bar fusing raw fluted teak wood, brass espresso countertops, exposed brickwork, and warm ambient neon signages.',
    materials: ['Warm Brass Fixtures', 'Fluted Teak Paneling', 'Terrazzo Flooring', 'Custom Upholstery'],
    badge: 'Commercial Café • Rajarhat',
  },
];

const INITIAL_PRICING: PricingTierItem[] = [
  {
    id: 'essentials',
    name: 'Essentials Tier',
    price: '₹1,250',
    unit: '/ sq.ft',
    tag: 'Smart Contemporary',
    desc: 'Ideal for 2BHK / 3BHK rental or first-home interiors requiring high durability and clean modern aesthetics.',
    features: [
      'CenturyPly Commercial Marine Grade Plywood',
      'Hettich Basic Soft-Close Drawer Runners',
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
    desc: 'Our flagship turnkey residential tier combining CenturyPly BWP marine plywood, Hafele German fittings, and acrylic kitchens.',
    features: [
      'CenturyPly Club Prime 710 BWP Plywood',
      'Hafele Sensys 110° Soft-Close Hardware',
      'High-Gloss Acrylic Kitchen Doors',
      'Quartz Heat-Resistant Countertops',
      'Floor-to-Ceiling Wardrobes with Sensor LEDs',
      'Sub-Zero IoT PM Live Progress Telemetry',
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
      'Somfy Motorized Drapery & Curtains',
      'Sub-Zero IoT Smart Lighting & Climate Automation',
      'Double-Height Chandelier Ceiling Slots',
      'Dedicated Principal Architect Project Lead',
      'Lifetime Maintenance & Annual Audit',
    ],
  },
];

const INITIAL_LEADS: LeadItem[] = [
  { id: 'lead-1', name: 'Dr. Tariq Al-Mansoor', email: 'tariq@estate.ae', phone: '+91 98311 00293', type: 'Villa (5,200 sqft)', budget: '₹48 Lakhs', city: 'Kolkata', date: 'Today, 14:20', details: 'Interested in Ballygunge Heritage Villa style layout.' },
  { id: 'lead-2', name: 'Arthur Vance', email: 'vance@manor.co.uk', phone: '+91 98302 99182', type: '4BHK Penthouse (3,800 sqft)', budget: '₹34 Lakhs', city: 'New Town', date: 'Yesterday', details: 'Wants German modular kitchen and Sub-Zero automation.' },
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

  addLead(lead: Omit<LeadItem, 'id' | 'date'>): void {
    const leads = this.getLeads();
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    leads.unshift(newLead);
    this.setStorage('deinterio_leads', leads);
  }
}

export const dataStore = new DataStoreService();
