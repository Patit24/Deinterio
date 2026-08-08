import React, { useState } from 'react';
import { User, Video, MapPin, CheckCircle2, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('In-Person Site Visit');
  const [selectedDate, setSelectedDate] = useState('2026-08-10');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [propertyType, setPropertyType] = useState('3BHK Apartment');
  const [location, setLocation] = useState('New Town, Kolkata');
  const [budget, setBudget] = useState('₹10 Lakhs – ₹20 Lakhs');
  const [message, setMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
    confetti({
      particleCount: 100,
      spread: 70,
      colors: ['#A88B57', '#1B4D3E', '#1A1917'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#F9F8F3] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto text-[#1A1917]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1917]/10 bg-white">
          <div>
            <span className="text-xs uppercase font-mono text-[#8C6D3B] font-semibold">Deinterio Interior Group Appointment</span>
            <h3 className="font-serif text-3xl font-medium text-[#1A1917]">Let's Design Your Dream Space</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1A1917]/5 border border-[#1A1917]/10 text-[#1A1917]/70 hover:text-[#1A1917]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!isConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <p className="text-xs sm:text-sm text-[#5A5852] font-light">
                Book a free consultation with our senior architects at Deinterio Interior Group. Specializing in Residential, Commercial, and Corporate interiors across Kolkata.
              </p>

              {/* Consultation Format */}
              <div>
                <label className="text-xs uppercase font-mono text-[#5A5852] block mb-2 font-semibold">01 / Preferred Consultation Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { format: 'In-Person Site Visit', icon: MapPin },
                    { format: 'Office Meeting', icon: User },
                    { format: 'Video Call', icon: Video },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.format}
                        type="button"
                        onClick={() => setSelectedFormat(item.format)}
                        className={`p-3 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                          selectedFormat === item.format
                            ? 'bg-[#1B4D3E]/10 border-[#1B4D3E] text-[#1B4D3E] font-semibold'
                            : 'bg-white border-[#1A1917]/10 text-[#5A5852] hover:border-[#1A1917]/20'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#8C6D3B]" />
                        <span>{item.format}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                    required
                  />
                </div>
              </div>

              {/* Category & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Business Vertical</label>
                  <select
                    value={propertyCategory}
                    onChange={(e) => {
                      setPropertyCategory(e.target.value);
                      setPropertyType(e.target.value === 'Residential' ? '3BHK Apartment' : e.target.value === 'Commercial' ? 'Café / Restaurant' : 'Corporate Bank / Office');
                    }}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                  >
                    <option value="Residential">Residential (Home)</option>
                    <option value="Commercial">Commercial (Business)</option>
                    <option value="Corporate">Corporate (Institutional)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Specific Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                  >
                    {propertyCategory === 'Residential' && (
                      <>
                        <option value="2BHK Apartment">2BHK Apartment</option>
                        <option value="3BHK Apartment">3BHK Apartment</option>
                        <option value="4BHK Apartment / Penthouse">4BHK Apartment / Penthouse</option>
                        <option value="Bungalow / Villa">Bungalow / Villa</option>
                      </>
                    )}
                    {propertyCategory === 'Commercial' && (
                      <>
                        <option value="Café / Restaurant">Café / Restaurant</option>
                        <option value="Hotel / Resort">Hotel / Resort</option>
                        <option value="Retail Store / Showroom">Retail Store / Showroom</option>
                      </>
                    )}
                    {propertyCategory === 'Corporate' && (
                      <>
                        <option value="Bank / Financial Branch">Bank / Financial Branch</option>
                        <option value="School / Educational Campus">School / Educational Campus</option>
                        <option value="Hospital / Medical Clinic">Hospital / Medical Clinic</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Location in Kolkata</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                  >
                    <option value="Kolkata - 700090 (Nabin Chandra Das Rd)">Kolkata - 700090 (Head Office)</option>
                    <option value="New Town, Kolkata">New Town, Kolkata</option>
                    <option value="Salt Lake">Salt Lake, Kolkata</option>
                    <option value="Rajarhat">Rajarhat</option>
                    <option value="Ballygunge & South Kolkata">Ballygunge & South Kolkata</option>
                    <option value="Howrah">Howrah</option>
                    <option value="Behala & Alipore">Behala & Alipore</option>
                    <option value="Barasat & North Kolkata">Barasat & North Kolkata</option>
                  </select>
                </div>
              </div>

              {/* Budget & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Project Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                  >
                    <option value="₹5 Lakhs – ₹10 Lakhs">₹5 Lakhs – ₹10 Lakhs</option>
                    <option value="₹10 Lakhs – ₹20 Lakhs">₹10 Lakhs – ₹20 Lakhs</option>
                    <option value="₹20 Lakhs – ₹35 Lakhs">₹20 Lakhs – ₹35 Lakhs</option>
                    <option value="₹35 Lakhs+">₹35 Lakhs+</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-mono text-[#5A5852] block mb-1">Message / Requirements</label>
                  <input
                    type="text"
                    placeholder="E.g. 3BHK turnkey interior, Café space planning..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#A88B57]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1B4D3E] to-[#12362B] text-xs font-semibold uppercase tracking-widest text-[#F9F8F3] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center space-y-6 py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#1B4D3E]/10 border border-[#1B4D3E] flex items-center justify-center mx-auto text-[#1B4D3E]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono text-[#8C6D3B]">Consultation Booked</span>
                <h3 className="font-serif text-3xl text-[#1A1917] font-semibold">Thank You, {name || 'Valued Patron'}!</h3>
                <p className="text-xs text-[#5A5852] mt-2 font-mono">
                  Deinterio Interior Group's senior architect will contact you shortly to confirm your {selectedFormat} on {selectedDate}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#1A1917]/10 max-w-md mx-auto text-left text-xs text-[#1A1917] space-y-2 font-mono shadow-sm">
                <div className="flex justify-between">
                  <span className="text-[#5A5852]">Vertical & Type:</span>
                  <span>{propertyCategory} ({propertyType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5852]">Location:</span>
                  <span>{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5852]">Confirmation SMS/Email:</span>
                  <span className="text-[#1B4D3E]">Sent to {phone || email}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
