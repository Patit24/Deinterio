import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MaterialsLibrary } from '../components/MaterialsLibrary';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface MaterialsPageProps {
  onOpenBooking: () => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <SEOHead
        title="Bespoke Materials Vault & Swatches"
        description="Inspect CenturyPly marine plywood, Hettich German soft-close fittings, Italian Botticino marble, and acrylic laminates."
      />

      <Breadcrumbs
        items={[{ label: 'Materials' }]}
        categoryBadge="BESPOKE MATERIAL VAULT"
        title="Authentic Architectural Materials & Sample Swatches"
        subtitle="We reject sub-standard commercial ply and unbranded fittings. All wood, marble, hardware, and fabrics are hologram verified with direct factory warranties."
      />

      {/* Materials Library & Swatches Explorer */}
      <MaterialsLibrary />

      {/* Material Guarantee Banner */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#13362B] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono text-[#C8AA7A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>DIGITAL HOLOGRAM CERTIFICATION</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal">
              100% CenturyPly & Hettich <span className="italic text-[#C8AA7A]">Authenticity</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#D4C3A3] font-light leading-relaxed">
              Every dispatched crate includes digital QR codes linking directly to CenturyPly Club Prime BWP 710 plywood holograms and Hettich Germany laser-etched serial numbers.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] font-semibold text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md"
          >
            Order Sample Tactile Box
          </button>
        </div>
      </section>
    </>
  );
};
