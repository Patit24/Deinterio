import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  type?: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type = 'privacy' }) => {
  const isPrivacy = type === 'privacy';

  const title = isPrivacy ? 'Privacy Policy & Data Security' : 'Terms of Service & 10-Year Digital Warranty Policy';
  const subtitle = isPrivacy
    ? 'Deinterio Interior Group respects your privacy. Learn how we handle project client data and live PM telemetry authentication.'
    : 'Complete contractual terms governing fixed BOQ guarantees, 0.5% weekly delay penalty clauses, and 10-year CenturyPly/Hettich digital warranty certificates.';

  return (
    <>
      <SEOHead
        title={title}
        description={subtitle}
      />

      <Breadcrumbs
        items={[{ label: isPrivacy ? 'Privacy Policy' : 'Terms & Warranty' }]}
        categoryBadge="LEGAL & GUARANTEES"
        title={title}
        subtitle={subtitle}
      />

      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2DDD6] space-y-6 text-sm font-light text-[#5A5852] leading-relaxed">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#13362B] uppercase tracking-wider bg-[#FAF8F4] px-3 py-1 rounded-full border border-[#D4C3A3]">
            <ShieldCheck className="w-4 h-4 text-[#A88B57]" />
            <span>EFFECTIVE DATE: AUGUST 2026</span>
          </div>

          {isPrivacy ? (
            <>
              <h3 className="font-serif text-xl font-medium text-[#1A1917]">1. Data Collection & Privacy</h3>
              <p>
                We collect personal information such as client name, phone number, email address, property address, and floorplan uploads strictly for project estimations, studio bookings, and client dashboard telemetry access.
              </p>

              <h3 className="font-serif text-xl font-medium text-[#1A1917]">2. Confidentiality & Security</h3>
              <p>
                All project floorplans, 3D laser spatial scans, site photos, and itemized BOQ documents are encrypted using AES-256 standard and stored on secure Firebase Cloud infrastructure. We never sell or share client data to third-party telemarketers.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl font-medium text-[#1A1917]">1. Fixed BOQ Price Lock Guarantee</h3>
              <p>
                Once the final Bill of Quantities (BOQ) is signed by the client and Deinterio Principal Architect, the total contractual cost is locked. Deinterio absorbs any price increases in raw materials or hardware.
              </p>

              <h3 className="font-serif text-xl font-medium text-[#1A1917]">2. Penalty-Backed Handover Clause</h3>
              <p>
                If project handover extends beyond the agreed completion date due to execution delays caused by Deinterio, a 0.5% penalty per week will be deducted from the final milestone payment up to a maximum of 5%.
              </p>

              <h3 className="font-serif text-xl font-medium text-[#1A1917]">3. Digital 10-Year Warranty Terms</h3>
              <p>
                All marine plywood cabinets and Hettich hardware feature a 10-year warranty covering joinery integrity, hinge replacement, and termite protection. Warranty claims can be logged via the client portal.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
};
