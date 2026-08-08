import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Sparkles, KeyRound, Shield } from 'lucide-react';

interface FooterProps {
  onOpenBooking?: () => void;
  onOpenDashboard?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenDashboard,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#13362B] text-white pt-20 pb-12 border-t border-[#13362B]/20 relative overflow-hidden">
      {/* Background Radial Gold Glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-15"
        style={{ backgroundImage: `radial-gradient(circle at bottom right, #C8AA7A, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-white/10 pb-12">
          
          {/* Column 1: Brand & HQ with INTERIOR GROUP Subtitle */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#/" className="flex items-center gap-3.5 group">
              <img
                src="/logo-dark-bg.png"
                alt="Deinterio Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-[0.18em] uppercase text-white">
                  DEINTERIO
                </span>
                <span className="text-[9.5px] font-sans uppercase tracking-[0.25em] text-[#C8AA7A] mt-1 font-bold">
                  INTERIOR GROUP
                </span>
              </div>
            </a>

            <p className="text-xs text-[#D4C3A3] font-light max-w-sm leading-relaxed">
              Designing Kolkata's finest residences with 100% material transparency, German precision woodworking, fixed BOQ pricing, and live PM project telemetry.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                <span>Action Area I, New Town, Kolkata 700156</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                <span>Direct Line: +91 98300 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                <span>Inquiries: concierge@deinterio.com</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#C8AA7A]">
              <span>★ 420+ Residences</span>
              <span>• 98% On-Time</span>
              <span>• 10-Yr Warranty</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-wider block">
              PAGES DIRECTORY
            </span>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li><a href="#/" className="hover:text-white transition-colors">Home Sanctuary</a></li>
              <li><a href="#/about" className="hover:text-white transition-colors">About Us & Legacy</a></li>
              <li><a href="#/services" className="hover:text-white transition-colors">Services Overview</a></li>
              <li><a href="#/projects" className="hover:text-white transition-colors">Projects & Live Tracker</a></li>
              <li><a href="#/process" className="hover:text-white transition-colors">Process Roadmap</a></li>
              <li><a href="#/materials" className="hover:text-white transition-colors">Materials Library</a></li>
              <li><a href="#/pricing" className="hover:text-white transition-colors">Pricing & Packages</a></li>
              <li><a href="#/calculator" className="hover:text-white transition-colors">AI Cost Estimator</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-wider block">
              SERVICES BLUEPRINTS
            </span>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li><a href="#/services/modular-kitchens" className="hover:text-white transition-colors">German Modular Kitchens</a></li>
              <li><a href="#/services/turnkey-luxury-interiors" className="hover:text-white transition-colors">Turnkey Villa Interiors</a></li>
              <li><a href="#/services/smart-home-automation" className="hover:text-white transition-colors">Sub-Zero IoT Smart Homes</a></li>
              <li><a href="#/services/master-bedroom-suites" className="hover:text-white transition-colors">Master Bedroom Suites</a></li>
              <li><a href="#/services/heritage-restoration" className="hover:text-white transition-colors">Heritage Bungalow Restoration</a></li>
            </ul>
          </div>

          {/* Column 4: Portals & Help */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#C8AA7A] uppercase tracking-wider block">
              PORTALS & HELP
            </span>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              {onOpenDashboard && (
                <li>
                  <button onClick={onOpenDashboard} className="text-[#C8AA7A] hover:text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Client Dashboard</span>
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li>
                  <button onClick={onOpenAdmin} className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Shield className="w-3.5 h-3.5 text-[#C8AA7A]" />
                    <span>Admin CMS Panel</span>
                  </button>
                </li>
              )}
              <li><a href="#/contact" className="hover:text-white transition-colors">Contact HQ & Studio Map</a></li>
              <li><a href="#/faq" className="hover:text-white transition-colors">FAQ & Support Center</a></li>
              <li><a href="#/blog" className="hover:text-white transition-colors">Architectural Insights</a></li>
              <li><a href="#/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#/terms" className="hover:text-white transition-colors">Terms & 10-Yr Warranty</a></li>
            </ul>

            {onOpenBooking && (
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#13362B]" />
                  <span>Book Studio Tour</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C8AA7A]" />
            <span>© 2026 Deinterio Interior Group. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#/terms" className="hover:text-white transition-colors">Warranty Terms</a>
            <a href="#/contact" className="hover:text-white transition-colors">Studio HQ Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
