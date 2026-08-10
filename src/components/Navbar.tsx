import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ChevronDown, KeyRound, Shield, Phone, ArrowUpRight, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenDashboard,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [mobileDesignIdeasOpen, setMobileDesignIdeasOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '#/' && (currentHash === '#/' || currentHash === '')) return true;
    return currentHash.startsWith(href) && href !== '#/';
  };

  const navLinks = [
    { label: 'Home', href: '#/' },
    {
      label: 'Design Ideas',
      href: '#/design-ideas',
      isMega: true,
      megaColumns: [
        [
          { label: 'Modular Kitchen Designs', href: '#/design-ideas/modular-kitchen' },
          { label: 'Wardrobe Designs', href: '#/design-ideas/wardrobe' },
          { label: 'Bathroom Designs', href: '#/design-ideas/bathroom' },
          { label: 'Master Bedroom Designs', href: '#/design-ideas/master-bedroom' },
          { label: 'Living Room Designs', href: '#/design-ideas/living-room' },
          { label: 'Pooja Room Designs', href: '#/design-ideas/pooja-room' },
          { label: 'TV Unit Designs', href: '#/design-ideas/tv-unit' },
          { label: 'False Ceiling Designs', href: '#/design-ideas/false-ceiling' },
          { label: 'Kids Bedroom Designs', href: '#/design-ideas/kids-bedroom' },
        ],
        [
          { label: 'Balcony Designs', href: '#/design-ideas/balcony' },
          { label: 'Dining Room Designs', href: '#/design-ideas/dining-room' },
          { label: 'Foyer & Entryway Designs', href: '#/design-ideas/foyer' },
          { label: 'Guest Bedroom Designs', href: '#/design-ideas/guest-bedroom' },
          { label: 'Wall Decor & Paint Designs', href: '#/design-ideas/wall-decor' },
          { label: 'Tile & Flooring Designs', href: '#/design-ideas/flooring-tiles' },
          { label: 'Study Room & Home Bar', href: '#/design-ideas/study-room' },
          { label: 'Crockery Unit Designs', href: '#/design-ideas/crockery-unit' },
          { label: 'Space Saving Furniture', href: '#/design-ideas/space-saving' },
        ]
      ]
    },
    { label: 'About', href: '#/about' },
    {
      label: 'Services',
      href: '#/services',
      dropdown: [
        { label: 'All Services Directory', desc: 'Complete architectural interior verticals', href: '#/services' },
        { label: 'Turnkey Luxury Interiors', desc: 'End-to-end residential transformations', href: '#/services/turnkey-luxury-interiors' },
        { label: 'German Modular Kitchens', desc: 'Hafele hardware & acrylic cabinetry', href: '#/services/modular-kitchens' },
        { label: 'Master Bedroom Suites', desc: 'Custom wardrobes & acoustic acoustics', href: '#/services/master-bedroom-suites' },
        { label: 'Smart Home Automation', desc: 'IoT climate, lighting & shade control', href: '#/services/smart-home-automation' },
        { label: 'Heritage Restoration', desc: 'Colonial & heritage home preservation', href: '#/services/heritage-restoration' },
      ],
    },
    {
      label: 'Portfolio & Live',
      href: '#/projects',
      dropdown: [
        { label: 'Curated Residences', desc: 'Ballygunge villas & New Town penthouses', href: '#/projects' },
        { label: 'Kolkata Live Tracker Map', desc: 'Inspect live ongoing site telemetry', href: '#/projects' },
        { label: 'Ballygunge Villa (#D-108)', desc: '100% completed heritage transformation', href: '#/projects/ballygunge-villa' },
        { label: 'New Town Penthouse (#D-402)', desc: 'Active 72% milestone progress project', href: '#/projects/new-town-penthouse' },
      ],
    },
    {
      label: 'Craftsmanship',
      href: '#/materials',
      dropdown: [
        { label: '8-Phase Process Roadmap', desc: 'From 3D scan to 45-point QA audit', href: '#/process' },
        { label: 'Material Swatch Vault', desc: 'CenturyPly marine plywood & Hettich fittings', href: '#/materials' },
      ],
    },
    {
      label: 'Pricing & Estimator',
      href: '#/pricing',
      dropdown: [
        { label: 'Turnkey Package Tiers', desc: 'Essentials, Premium, and Luxury Signature', href: '#/pricing' },
        { label: 'AI Cost Estimator', desc: 'Generate itemized budget in 60 seconds', href: '#/calculator' },
      ],
    },
    { label: 'Contact', href: '#/contact' },
  ];

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0E271F] text-[#D4C3A3] text-[11px] font-mono py-2 px-4 border-b border-[#C8AA7A]/20 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white tracking-wider">DEINTERIO TELEMETRY LIVE:</span>
            <span className="hidden sm:inline text-[#D4C3A3]/80">12 Active Site Streams Across Kolkata & NCR</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="tel:+919830000000"
              className="hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#C8AA7A]" />
              <span className="hidden xs:inline">+91 98300 00000</span>
            </a>

            <button
              onClick={onOpenDashboard}
              className="text-[#C8AA7A] hover:text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-[#C8AA7A]" />
              <span>Client Dashboard</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="text-[#D4C3A3]/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer hidden md:flex"
            >
              <Shield className="w-3 h-3 text-[#D4C3A3]/60" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF8F4]/95 backdrop-blur-xl shadow-md border-b border-[#E2DDD6]'
            : 'bg-[#FAF8F4] border-b border-[#E2DDD6]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo with "INTERIOR GROUP" Subtitle */}
          <a href="#/" className="flex items-center gap-3.5 group shrink-0">
            <img
              src="/logo-light-nav.png"
              alt="Deinterio Logo"
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#1A1917] uppercase group-hover:text-[#13362B] transition-colors leading-none">
                DEINTERIO
              </span>
              <span className="text-[9.5px] font-sans uppercase tracking-[0.25em] text-[#8C6D3B] font-bold mt-1">
                INTERIOR GROUP
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-[13px] font-sans font-medium tracking-wide whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                    isActive(link.href)
                      ? 'text-[#13362B] font-bold bg-[#13362B]/8'
                      : 'text-[#3A3833] hover:text-[#13362B] hover:bg-[#13362B]/4'
                  }`}
                >
                  <span>{link.label}</span>
                  {(link.dropdown || link.isMega) && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </a>

                {/* MEGA DROPDOWN MENU FOR DESIGN IDEAS */}
                {link.isMega && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-[580px] rounded-3xl bg-white border border-[#E2DDD6] shadow-2xl p-6 z-50 animate-fade-in grid grid-cols-2 gap-6">
                    {link.megaColumns?.map((col, cIdx) => (
                      <div key={cIdx} className="space-y-1">
                        {col.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="group/sub flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#FAF8F4] text-xs font-sans font-medium text-[#1A1917] hover:text-[#13362B] transition-all"
                          >
                            <span>{subItem.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8AA7A] opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    ))}
                    
                    <div className="col-span-2 pt-3 border-t border-[#E2DDD6] flex items-center justify-between text-xs font-mono text-[#8C6D3B]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Compass className="w-3.5 h-3.5 text-[#13362B]" />
                        <span>500+ Curated Architectural Concepts</span>
                      </span>
                      <a href="#/design-ideas" className="text-[#13362B] hover:text-[#8C6D3B] font-bold underline underline-offset-4">
                        View All Categories →
                      </a>
                    </div>
                  </div>
                )}

                {/* STANDARD DROPDOWN MENU */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white border border-[#E2DDD6] shadow-2xl p-2.5 z-50 animate-fade-in space-y-1">
                    {link.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="group/sub flex flex-col p-3 rounded-xl hover:bg-[#FAF8F4] transition-all border border-transparent hover:border-[#E2DDD6]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-sans font-semibold text-[#1A1917] group-hover/sub:text-[#13362B]">
                            {subItem.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C8AA7A] opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                        </div>
                        {subItem.desc && (
                          <span className="text-[10px] text-[#6B6560] font-light mt-0.5">
                            {subItem.desc}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 group whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8AA7A] group-hover:rotate-12 transition-transform" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#1A1917]/5 text-[#1A1917] hover:bg-[#1A1917]/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-sm bg-[#FAF8F4] h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#E2DDD6]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo-light-nav.png"
                    alt="Deinterio Logo"
                    className="h-10 w-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-bold text-[#1A1917]">DEINTERIO</span>
                    <span className="text-[8px] font-sans uppercase tracking-wider text-[#8C6D3B] font-bold">INTERIOR GROUP</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-[#1A1917]/5 text-[#1A1917]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  if (link.isMega) {
                    return (
                      <div key={link.label} className="space-y-1">
                        <button
                          onClick={() => setMobileDesignIdeasOpen(!mobileDesignIdeasOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-sans font-semibold text-[#1A1917] hover:bg-white transition-all"
                        >
                          <span>Design Ideas</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileDesignIdeasOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {mobileDesignIdeasOpen && (
                          <div className="pl-4 space-y-1 bg-white p-2 rounded-xl border border-[#E2DDD6]">
                            <a
                              href="#/design-ideas"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2 text-xs font-mono font-bold text-[#13362B]"
                            >
                              Explore All Design Ideas →
                            </a>
                            {link.megaColumns?.[0].map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 text-xs text-[#5A5852] hover:text-[#13362B]"
                              >
                                {sub.label}
                              </a>
                            ))}
                            {link.megaColumns?.[1].map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 text-xs text-[#5A5852] hover:text-[#13362B]"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-sans transition-all ${
                        isActive(link.href)
                          ? 'bg-[#13362B] text-white font-semibold'
                          : 'text-[#1A1917] hover:bg-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#E2DDD6]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full py-3.5 rounded-xl bg-white border border-[#D4C3A3] text-center text-xs font-sans font-bold text-[#13362B] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <KeyRound className="w-4 h-4 text-[#8C6D3B]" />
                <span>Client Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-3 rounded-xl border border-[#E2DDD6] bg-white text-center text-xs font-sans text-[#6B6560] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Admin CMS Panel</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-xl bg-[#13362B] text-white text-xs font-sans uppercase font-bold tracking-wider shadow-md cursor-pointer"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
