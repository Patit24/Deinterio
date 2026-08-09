import React, { useState } from 'react';
import { 
  Building2, 
  Construction, 
  Clock, 
  Users, 
  Award, 
  MapPin, 
  Calendar, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal, 
  X,
  Target,
  Zap,
  Image as ImageIcon,
  CreditCard,
  MessageSquare,
  FileText
} from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ProjectsTrackerSectionProps {
  onOpenDashboard: () => void;
  onOpenBooking: () => void;
}

export const ProjectsTrackerSection: React.FC<ProjectsTrackerSectionProps> = ({ onOpenDashboard, onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState('ALL PROJECTS');
  const [selectedLiveProject, setSelectedLiveProject] = useState<any | null>(null);
  const [selectedCompletedProject, setSelectedCompletedProject] = useState<any | null>(null);
  const [activeMapPin, setActiveMapPin] = useState<any | null>({
    name: 'Lakeview Villa',
    location: 'New Town, Kolkata',
    status: 'Completed',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
  });

  // Top Statistics Bar Data
  const statsData = [
    { number: '420+', label: 'Projects Delivered', icon: Building2 },
    { number: '17', label: 'Homes Under Construction', icon: Construction },
    { number: '98%', label: 'On-Time Completion', icon: Clock },
    { number: '4.9★', label: 'Average Client Rating', icon: Users },
    { number: '10 Yrs', label: 'Warranty Guarantee', icon: Award },
  ];

  // Filters List
  const filters = [
    'ALL PROJECTS',
    'ONGOING',
    'COMPLETED',
    'APARTMENTS',
    'VILLAS',
    'COMMERCIAL',
    'OFFICES',
    'RESTAURANTS',
  ];

  // Live Ongoing Projects (Left Column)
  const liveProjects = [
    {
      id: 'live-1',
      name: 'Moderna Apartment',
      location: 'New Town, Kolkata',
      type: 'Apartment (3 BHK)',
      currentStage: 'False Ceiling Work',
      stageIcon: Target,
      progress: 62,
      estCompletion: '28 Aug, 2026',
      manager: 'Arijit D.',
      managerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      badge: 'Live',
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
      stageIcon: Zap,
      progress: 48,
      estCompletion: '12 Oct, 2026',
      manager: 'Pooja S.',
      managerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      badge: 'Live',
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
      stageIcon: Target,
      progress: 35,
      estCompletion: '05 Sep, 2026',
      manager: 'Sourav M.',
      managerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Live',
      pmNote: 'Italian marble tile alignment underway in master bedroom and dining hall.',
      timeline: [
        { milestone: 'Site Measurement', date: '01 Jun, 2026', status: 'Completed' },
        { milestone: 'Civil & Wall Plastering', date: '20 Jun, 2026', status: 'Completed' },
        { milestone: 'Marble Flooring Laying', date: '28 Jul, 2026', status: 'Active' },
        { milestone: 'Modular Wardrobes Fitting', date: '15 Aug, 2026', status: 'Upcoming' },
        { milestone: 'Final Painting & Handover', date: '05 Sep, 2026', status: 'Upcoming' },
      ],
    },
  ];

  // Recently Completed Projects (Right Column Grid)
  const completedProjects = [
    {
      id: 'comp-1',
      name: 'Woodstone Residence',
      location: 'Ballygunge, Kolkata',
      type: '4BHK Apartment',
      area: '3,450 sq.ft',
      completedDate: 'May 2026',
      duration: '14 Weeks',
      rating: '5.0',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      testimonial: 'Deinterio Interior Group transformed our 4BHK apartment in Ballygunge beyond expectation.',
      clientName: 'Sujit & Mousumi Dutta',
    },
    {
      id: 'comp-2',
      name: 'Lakeview Villa',
      location: 'New Town, Kolkata',
      type: 'Villa',
      area: '5,200 sq.ft',
      completedDate: 'April 2026',
      duration: '20 Weeks',
      rating: '4.9',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      testimonial: 'Superb execution of modular kitchen, false ceiling, and dining chandelier.',
      clientName: 'Subir & Poulomi Ghosh',
    },
    {
      id: 'comp-3',
      name: 'Thinkspace Office',
      location: 'Salt Lake, Kolkata',
      type: 'Commercial Office',
      area: '2,800 sq.ft',
      completedDate: 'March 2026',
      duration: '10 Weeks',
      rating: '4.8',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      testimonial: 'Modern acoustic glass workstations and bank office branch design.',
      clientName: 'Apex Financial Services',
    },
  ];

  // Kolkata Map Pins
  const mapPins = [
    { id: 1, name: 'Lakeview Villa', location: 'New Town, Kolkata', status: 'Completed', top: '30%', left: '70%', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Salt Lake Penthouse', location: 'Salt Lake, Kolkata', status: 'Completed', top: '42%', left: '62%', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Siddha Sky Villa', location: 'Rajarhat, Kolkata', status: 'Live', top: '22%', left: '80%', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'South Kolkata Estate', location: 'Behala, Kolkata', status: 'Live', top: '75%', left: '35%', img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Woodstone Residence', location: 'Ballygunge, Kolkata', status: 'Completed', top: '65%', left: '52%', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'EM Bypass Residency', location: 'EM Bypass, Kolkata', status: 'Live', top: '58%', left: '68%', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    { id: 7, name: 'Riverview Heights', location: 'Howrah, Kolkata', status: 'Completed', top: '50%', left: '25%', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80' },
    { id: 8, name: 'North Green Bungalow', location: 'Barasat, Kolkata', status: 'Live', top: '15%', left: '60%', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 bg-[#F8F7F2]">
      
      {/* 1. TOP STATS BAR CARD */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#EAE6DF]">
          {statsData.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 px-3 py-2 first:pl-0">
                <div className="w-11 h-11 rounded-full bg-[#F6F2EA] border border-[#D4C3A3] flex items-center justify-center text-[#8C6D3B] shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1917] tracking-tight block leading-none">
                    {stat.number}
                  </span>
                  <span className="text-[11px] font-sans text-[#6B6862] font-medium mt-1 block">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-[11px] font-sans uppercase tracking-wider transition-all font-semibold ${
              activeFilter === filter
                ? 'bg-[#13362B] text-white shadow-md'
                : 'bg-white border border-[#E5E0D8] text-[#5A5852] hover:border-[#13362B] hover:text-[#13362B]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 3. SPLIT-SCREEN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LIVE PROJECTS (Currently Transforming Spaces) - 5 Cols */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE6DF] p-6 space-y-6 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE6DF] pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#13362B] font-bold font-mono">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span>LIVE PROJECTS</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1917] font-semibold mt-1">
                  Currently Transforming Spaces
                </h3>
              </div>
              
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-full bg-[#13362B] text-white text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-[#0D241D] transition-all flex items-center justify-center gap-1 shrink-0 w-full sm:w-auto"
              >
                <span>VIEW ALL LIVE PROJECTS</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Stacked Live Project Cards */}
            <div className="space-y-5">
              {liveProjects.map((project) => {
                const StageIcon = project.stageIcon;
                return (
                  <div
                    key={project.id}
                    className="p-3.5 rounded-xl border border-[#EAE6DF] hover:border-[#13362B] transition-all duration-300 bg-[#FAF9F5]/60 hover:bg-white flex flex-col sm:flex-row gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden shrink-0">
                      <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#13362B]/90 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {project.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2.5">
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#1A1917] leading-snug">{project.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-[#6B6862] mt-0.5">
                          <MapPin className="w-3 h-3 text-[#A88B57]" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      {/* Current Stage */}
                      <div>
                        <span className="text-[10px] text-[#8C8880] uppercase tracking-wider font-mono block">Current Stage</span>
                        <div className="flex items-center gap-1.5 text-xs text-[#1A1917] font-semibold mt-0.5">
                          <StageIcon className="w-3.5 h-3.5 text-[#13362B]" />
                          <span>{project.currentStage}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-end text-[11px] font-bold text-[#13362B]">
                          {project.progress}%
                        </div>
                        <div className="w-full h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#13362B] rounded-full transition-all duration-700"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Completion & PM */}
                      <div className="flex justify-between items-center text-[10px] text-[#6B6862] pt-1 border-t border-[#EAE6DF]/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#A88B57]" /> Est. Completion: <strong className="text-[#1A1917]">{project.estCompletion}</strong>
                        </span>
                        <div className="flex items-center gap-1">
                          <img src={project.managerAvatar} alt={project.manager} className="w-4 h-4 rounded-full object-cover" />
                          <span>PM: <strong className="text-[#1A1917]">{project.manager}</strong></span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Dashboard Access Banner inside Left Box */}
          <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#EBE5DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mt-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E0D8CB] flex items-center justify-center text-[#8C6D3B] shrink-0 shadow-2xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-[#1A1917] block text-xs sm:text-sm">Want full access to your project updates?</span>
                <span className="text-[#6B6862] text-[11px] block mt-0.5 leading-snug">Log in to your dashboard and track everything in real-time.</span>
              </div>
            </div>

            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#13362B] text-white text-xs font-semibold hover:bg-[#0D241D] transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
            >
              <span>ACCESS DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: COMPLETED PROJECTS & MAP - 7 Cols */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE6DF] p-6 space-y-6 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE6DF] pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#A88B57] font-bold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>COMPLETED PROJECTS</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1917] font-semibold mt-1">
                  Recently Completed Projects
                </h3>
              </div>
              
              <button
                onClick={() => setActiveFilter('COMPLETED')}
                className="px-4 py-2 rounded-full border border-[#E5E0D8] bg-white text-[#1A1917] text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-[#13362B] hover:text-white transition-all flex items-center justify-center gap-1 shrink-0 w-full sm:w-auto"
              >
                <span>VIEW ALL COMPLETED</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Completed Projects 3-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {completedProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-[#EAE6DF] overflow-hidden bg-white hover:border-[#13362B] transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <div className="relative h-36 overflow-hidden">
                    <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#13362B]/90 text-white text-[9px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1A1917] leading-snug">{project.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-[#6B6862] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#A88B57]" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#6B6862] space-y-1 pt-1 border-t border-[#EAE6DF]">
                      <div className="flex justify-between">
                        <span>{project.type}</span>
                        <strong className="text-[#1A1917]">{project.area}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>{project.completedDate}</span>
                        <strong className="text-[#1A1917]">{project.duration}</strong>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedCompletedProject(project)}
                      className="w-full py-2 mt-2 rounded-lg bg-[#F9F8F3] border border-[#E5E0D8] text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1917] hover:bg-[#13362B] hover:text-white transition-all flex items-center justify-center gap-1"
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP SECTION INSIDE RIGHT CONTAINER */}
          <div className="rounded-xl border border-[#EAE6DF] bg-[#F7F5EE] p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-[#1A1917] uppercase tracking-wider text-[11px]">
                PROJECTS ACROSS KOLKATA
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#13362B]" /> Live Projects</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#B48F57]" /> Completed Projects</span>
              </div>
            </div>

            {/* Map Interactive Frame */}
            <div className="relative h-44 rounded-lg bg-[#EAE5D9] border border-[#DCD5C6] overflow-hidden flex items-center justify-center bg-noise">
              {/* Map Vector Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-40 stroke-[#8C867A]" fill="none">
                <path d="M 80 0 Q 140 100 110 200" strokeWidth="5" stroke="#C5BCAE" />
                <line x1="0" y1="60" x2="500" y2="90" strokeDasharray="4 4" />
                <line x1="100" y1="120" x2="500" y2="150" strokeDasharray="4 4" />
              </svg>

              <span className="absolute top-2 left-2 text-[9px] font-mono text-[#6B6862] bg-white/80 px-2 py-0.5 rounded border border-[#DCD5C6]">
                Hooghly River & Kolkata Metropolitan Area
              </span>

              {/* Pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActiveMapPin(pin)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-10"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold shadow-md ${
                    pin.status === 'Live' ? 'bg-[#13362B] animate-pulse' : 'bg-[#B48F57]'
                  }`}>
                    <MapPin className="w-3 h-3" />
                  </div>
                </button>
              ))}

              {/* Active Map Pin Popup Card */}
              {activeMapPin && (
                <div className="absolute right-3 bottom-3 w-56 bg-white rounded-lg border border-[#EAE6DF] p-2.5 shadow-xl flex items-center gap-2.5 animate-fade-in z-20">
                  <img src={activeMapPin.img} alt={activeMapPin.name} className="w-14 h-14 rounded-md object-cover" />
                  <div className="flex-1 text-[10px]">
                    <h5 className="font-bold text-[#1A1917] leading-tight">{activeMapPin.name}</h5>
                    <span className="text-[#6B6862] block">{activeMapPin.location}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#13362B] text-white text-[8px] font-bold uppercase inline-block mt-1">
                      {activeMapPin.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 4. BOTTOM DARK FOREST GREEN GLASSMORPHISM CLIENT BANNER */}
      <div className="rounded-2xl bg-[#13362B] text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#B48F57] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white">Already a Deinterio Client?</h3>
            <p className="text-xs text-white/80 font-sans mt-0.5 max-w-xl leading-relaxed">
              Track your project in real time with daily updates, progress photos, payment status, designer chat, and project documents.
            </p>

            {/* Features Icons Row */}
            <div className="flex flex-wrap gap-4 pt-3 text-[10px] font-mono text-white/90">
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-[#B48F57]" /> 17 Homes Under Construction</span>
              <span className="flex items-center gap-1.5"><ImageIcon className="w-3 h-3 text-[#B48F57]" /> 3 Kitchens Installing Today</span>
              <span className="flex items-center gap-1.5"><CreditCard className="w-3 h-3 text-[#B48F57]" /> 12 Designers Working</span>
              <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-[#B48F57]" /> 7 Site Visits Today</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3 h-3 text-[#B48F57]" /> Live Photo Logs</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenDashboard}
          className="px-6 py-3.5 rounded-xl bg-[#B48F57] hover:bg-[#C59F67] text-white font-mono font-semibold uppercase tracking-wider text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <span>ACCESS CLIENT DASHBOARD</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* MODAL 1: LIVE TIMELINE */}
      {selectedLiveProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#EAE6DF] max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#13362B] font-bold">🟢 Live Project Milestone Log</span>
                <h4 className="font-serif text-xl font-bold text-[#1A1917]">{selectedLiveProject.name}</h4>
                <span className="text-xs text-[#6B6862]">{selectedLiveProject.location} • PM: {selectedLiveProject.manager}</span>
              </div>
              <button onClick={() => setSelectedLiveProject(null)} className="p-2 rounded-full bg-gray-100 text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {selectedLiveProject.timeline.map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg border border-[#EAE6DF] bg-[#FAF9F5] flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-[#1A1917]">{item.milestone}</h5>
                    <span className="text-[10px] text-[#6B6862]">{item.date}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                    item.status === 'Completed' ? 'bg-[#13362B] text-white' : item.status === 'Active' ? 'bg-[#B48F57] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: COMPLETED BEFORE & AFTER */}
      {selectedCompletedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#EAE6DF] max-w-3xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#B48F57] font-bold">✔ Completed Transformation</span>
                <h4 className="font-serif text-xl font-bold text-[#1A1917]">{selectedCompletedProject.name}</h4>
                <span className="text-xs text-[#6B6862]">{selectedCompletedProject.location} • Area: {selectedCompletedProject.area}</span>
              </div>
              <button onClick={() => setSelectedCompletedProject(null)} className="p-2 rounded-full bg-gray-100 text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <BeforeAfterSlider beforeImage={selectedCompletedProject.beforeImg} afterImage={selectedCompletedProject.afterImg} />

            <p className="text-xs italic text-[#5A5852] font-serif border-t pt-3">
              "{selectedCompletedProject.testimonial}" — <strong className="font-sans not-italic font-bold text-[#13362B]">{selectedCompletedProject.clientName}</strong>
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
