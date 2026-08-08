import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Lock, Home, User, DollarSign, Calendar, ShieldCheck, Award, Users, ChevronDown, ExternalLink, Play, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential (2BHK / 3BHK)',
    budget: '₹15 Lakhs - ₹30 Lakhs',
    details: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  const encodedAddress = encodeURIComponent('Action Area I, New Town, Kolkata, West Bengal 700156');
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  const faqs = [
    {
      q: 'How long does an initial discovery consultation take?',
      a: 'Initial consultations take approximately 45 to 60 minutes. Our senior architect reviews your floorplan, spatial priorities, material preferences, and budget parameters.',
    },
    {
      q: 'Is there any cost for site measurements or initial quote generation?',
      a: 'No. Site laser measurement scans and 100% itemized BOQ quotations across Kolkata are completely complimentary with zero obligations.',
    },
    {
      q: 'Can I visit your Rajarhat Experience Studio & Material Vault?',
      a: 'Yes! Our 14,000 sq.ft experience studio in Rajarhat is open Monday through Saturday from 10:00 AM to 7:30 PM. Walk-ins are welcome, or you can schedule a private tour.',
    },
    {
      q: 'What is your typical project execution timeline?',
      a: 'Modular kitchens & wardrobes are delivered in 30-45 days. Complete turnkey residential villa transformations are completed within 75-90 days, backed by our penalty clause.',
    },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F6F0] text-[#1A1917] font-sans relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-12">

        {/* ==================== TIER 1: ELEGANT 2-COLUMN CONTACT & FORM LAYOUT ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: STUDIO HQ & DIRECT CONTACT CARDS (Span 5 on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Studio HQ Card */}
            <div className="rounded-3xl bg-[#13362B] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
              {/* Background Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20"
                style={{ backgroundImage: `radial-gradient(circle at top right, #C8AA7A, transparent 70%)` }}
              />

              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C8AA7A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EXPERIENCE STUDIO HQ</span>
                </div>
                <h3 className="font-serif text-3xl font-normal leading-tight">
                  Deinterio Interior Group Studio HQ
                </h3>
                <p className="text-xs text-[#D4C3A3] font-light leading-relaxed">
                  Step inside our 14,000 sq.ft material vault. Experience German soft-close cabinetry, 200+ imported quartz & veneer swatches, and 4K VR spatial walkthroughs.
                </p>
              </div>

              {/* Contact Info List */}
              <div className="space-y-3 text-xs font-mono text-gray-200 border-t border-white/10 pt-4 relative z-10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8AA7A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Studio Address:</span>
                    <span className="text-[#D4C3A3] block mt-0.5">Action Area I, New Town, Rajarhat Main Rd, Kolkata 700156</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                  <div>
                    <span className="font-bold text-white">Direct Line:</span>
                    <a href="tel:+919830000000" className="text-[#C8AA7A] hover:underline ml-2">+91 98300 00000</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                  <div>
                    <span className="font-bold text-white">Concierge Email:</span>
                    <a href="mailto:concierge@deinterio.com" className="text-[#D4C3A3] hover:underline ml-2">concierge@deinterio.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C8AA7A] shrink-0" />
                  <div>
                    <span className="font-bold text-white">Visiting Hours:</span>
                    <span className="text-[#D4C3A3] ml-2">Mon - Sat: 10:00 AM - 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 relative z-10">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] text-xs font-mono font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Get GPS Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="tel:+919830000000"
                  className="py-3 px-4 rounded-xl border border-white/30 hover:bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8AA7A]" />
                  <span>Call Architect</span>
                </a>
              </div>
            </div>

            {/* 4 Trust Guarantee Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs space-y-1">
                <Award className="w-5 h-5 text-[#8C6D3B]" />
                <div className="text-xs font-bold text-[#1A1917]">Free Discovery</div>
                <div className="text-[10px] font-mono text-[#6B6560]">Zero Obligation</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs space-y-1">
                <Users className="w-5 h-5 text-[#8C6D3B]" />
                <div className="text-xs font-bold text-[#1A1917]">Expert Architects</div>
                <div className="text-[10px] font-mono text-[#6B6560]">10+ Yrs Mastery</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs space-y-1">
                <Clock className="w-5 h-5 text-[#8C6D3B]" />
                <div className="text-xs font-bold text-[#1A1917]">On-Time Handover</div>
                <div className="text-[10px] font-mono text-[#6B6560]">Penalty Backed</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#8C6D3B]" />
                <div className="text-xs font-bold text-[#1A1917]">10-Yr Warranty</div>
                <div className="text-[10px] font-mono text-[#6B6560]">Hettich & CenturyPly</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LUXURY ARCHITECTURAL INQUIRY FORM (Span 7 on Desktop) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E2DDD6] shadow-xl p-6 sm:p-10 space-y-6">
            
            <div className="border-b border-[#E2DDD6] pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8C6D3B]">
                <MessageSquare className="w-3.5 h-3.5 text-[#A88B57]" />
                <span>DIRECT ARCHITECT INQUIRY</span>
              </div>
              <h3 className="font-serif text-3xl font-normal text-[#1A1917]">
                Share Your Project Requirements
              </h3>
              <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                Fill in your property specifications below to receive an itemized BOQ estimate and 3D spatial consultation from our lead senior architect.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#FAF8F4] border border-[#13362B]/20 text-center space-y-4 py-12 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#13362B] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7 text-[#C8AA7A]" />
                </div>
                <h4 className="font-serif text-2xl text-[#13362B] font-normal">Project Inquiry Dispatched!</h4>
                <p className="text-xs sm:text-sm text-[#5A5852] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#13362B]">{formData.fullName}</strong>. Our Principal Architect will review your specs and contact you within <strong className="underline">2 hours</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#13362B] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Mr. Rajesh Singhania"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs text-[#1A1917] placeholder:text-[#8C8377] focus:outline-none focus:border-[#13362B] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="tel"
                        placeholder="+91 98300 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs text-[#1A1917] placeholder:text-[#8C8377] focus:outline-none focus:border-[#13362B] transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs text-[#1A1917] placeholder:text-[#8C8377] focus:outline-none focus:border-[#13362B] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                      Property Type *
                    </label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full pl-10 pr-8 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-medium text-[#1A1917] focus:outline-none focus:border-[#13362B] appearance-none cursor-pointer"
                      >
                        <option>Residential (2BHK / 3BHK)</option>
                        <option>Luxury 4BHK / Sky Penthouse</option>
                        <option>Independent Villa / Bungalow</option>
                        <option>Commercial Café / Boutique</option>
                        <option>Corporate Office Hub</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8C6D3B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Budget Tier */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                    Project Budget Tier *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-10 pr-8 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-medium text-[#1A1917] focus:outline-none focus:border-[#13362B] appearance-none cursor-pointer"
                    >
                      <option>₹15 Lakhs - ₹30 Lakhs (Essentials Package)</option>
                      <option>₹30 Lakhs - ₹60 Lakhs (Premium Turnkey Tier)</option>
                      <option>₹60 Lakhs - ₹1 Crore (Luxury Custom Residence)</option>
                      <option>₹1 Crore - ₹2.5 Crore+ (Ultra Luxury Signature Villa)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8C6D3B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Details & Location */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917]">
                    Property Location & Specific Requirements *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-3.5" />
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify your property location in Kolkata (e.g. New Town, Ballygunge, Alipore), target completion date, or aesthetic vision..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs text-[#1A1917] placeholder:text-[#8C8377] focus:outline-none focus:border-[#13362B] transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.005] transition-all cursor-pointer"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="w-4 h-4 text-[#C8AA7A]" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-[#6B6560]">
                  <Lock className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  <span>100% Privacy Protected. All communications are strictly covered under NDA.</span>
                </div>

              </form>
            )}

          </div>

        </div>


        {/* ==================== TIER 2: INTERACTIVE STUDIO MAP & VR EXPERIENCE DECK ==================== */}
        <div className="rounded-3xl bg-white border border-[#E2DDD6] p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E2DDD6]">
            
            {/* Partition 1: Studio Location + Interactive Map */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 justify-between pr-0 lg:pr-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C6D3B] font-bold">
                  <MapPin className="w-4 h-4 text-[#13362B]" />
                  <span>Studio Location Map</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">
                    Action Area I Studio HQ
                  </h4>
                  <p className="text-xs font-mono text-[#5A5852] mt-1 leading-relaxed">
                    Action Area I, New Town,<br />
                    Rajarhat Main Rd,<br />
                    Kolkata, West Bengal 700156
                  </p>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2DDD6] bg-[#FAF8F4] hover:bg-white text-xs font-mono uppercase tracking-wider text-[#13362B] font-bold shadow-2xs transition-all"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C6D3B]" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full xl:w-52 h-48 rounded-2xl overflow-hidden border border-[#E2DDD6] shadow-xs shrink-0 relative group">
                <iframe
                  title="Deinterio Studio HQ Kolkata Map"
                  src={googleMapsEmbedUrl}
                  className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-700"
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Partition 2: 360° Studio VR Experience */}
            <div className="pt-8 lg:pt-0 lg:px-8 flex flex-col xl:flex-row items-start xl:items-center gap-6 justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C6D3B] font-bold">
                  <Sparkles className="w-4 h-4 text-[#13362B]" />
                  <span>Tactile Material Vault</span>
                </div>
                <p className="text-xs text-[#5A5852] leading-relaxed font-light">
                  Touch and feel imported Italian veneers, Hettich German soft-close mechanisms, and quartz island slabs in person.
                </p>
                <button
                  onClick={() => setActiveModal('tour')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2DDD6] bg-[#FAF8F4] hover:bg-white text-xs font-mono uppercase tracking-wider text-[#13362B] font-bold shadow-2xs transition-all cursor-pointer"
                >
                  <span>VR 3D Walkthrough</span>
                  <Play className="w-3 h-3 text-[#8C6D3B] fill-[#8C6D3B]" />
                </button>
              </div>

              <div className="w-full xl:w-52 h-48 rounded-2xl overflow-hidden border border-[#E2DDD6] shadow-xs shrink-0 relative group">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
                  alt="Deinterio Material Vault Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
                  Rajarhat HQ
                </span>
              </div>
            </div>

            {/* Partition 3: Detailed Visiting Hours */}
            <div className="pt-8 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C6D3B] font-bold">
                  <Clock className="w-4 h-4 text-[#13362B]" />
                  <span>Studio Hours</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-[#1A1917]">
                  <div className="flex justify-between pb-2 border-b border-[#E2DDD6]">
                    <span className="text-[#6B6560]">Mon - Fri:</span>
                    <span className="font-bold text-[#13362B]">10:00 AM - 7:30 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#E2DDD6]">
                    <span className="text-[#6B6560]">Saturday:</span>
                    <span className="font-bold text-[#13362B]">10:00 AM - 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6560]">Sunday:</span>
                    <span className="font-bold text-[#8C6D3B] uppercase">By Appointment</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('visit')}
                className="w-full py-3 rounded-xl bg-[#FAF8F4] border border-[#D4C3A3] text-xs font-mono uppercase tracking-widest text-[#13362B] font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#8C6D3B]" />
                <span>Reserve Private Visit</span>
              </button>
            </div>

          </div>
        </div>


        {/* ==================== TIER 3: FREQUENTLY ASKED QUESTIONS ACCORDION ==================== */}
        <div className="rounded-3xl bg-white border border-[#E2DDD6] p-6 sm:p-10 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase tracking-wider">
              CLIENT FEASIBILITY & FAQ
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#1A1917]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#E2DDD6]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-serif text-lg text-[#1A1917] hover:text-[#13362B] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C6D3B] transition-transform duration-300 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeFaq === idx && (
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed pt-3 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* VR Walkthrough & Visit Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E2DDD6] shadow-2xl space-y-6 text-[#1A1917] relative">
            <div className="flex justify-between items-center border-b border-[#E2DDD6] pb-4">
              <h3 className="font-serif text-2xl font-normal text-[#13362B]">
                {activeModal === 'tour' ? 'Studio VR Experience' : 'Schedule Studio Appointment'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8F4] text-[#1A1917] flex items-center justify-center font-mono font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#5A5852] leading-relaxed">
              {activeModal === 'tour' 
                ? 'Our 360° VR spatial walkthrough allows you to inspect completed Ballygunge and New Town penthouses in immersive detail. Submit your contact details below to receive a direct VR session link.'
                : 'Select your preferred appointment date. Enjoy dedicated studio parking, complimentary Italian espresso, and hands-on material testing with our Senior Architects.'}
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs" />
              <input type="tel" placeholder="WhatsApp / Phone Number" className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono" />
              <button
                onClick={() => { setActiveModal(null); alert('Appointment Reserved! Our Studio Manager will connect with you on WhatsApp shortly.'); }}
                className="w-full py-3.5 rounded-xl bg-[#13362B] text-white font-mono text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md"
              >
                Confirm Studio Reservation
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
