import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AICostCalculator } from '../components/AICostCalculator';
import { SEOHead } from '../components/SEOHead';
import { Calculator, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CalculatorPageProps {
  onOpenBooking: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <SEOHead
        title="AI Turnkey Interior Cost Estimator"
        description="Compute an itemized cost estimate for your BHK layout, room counters, package tier, and material preferences."
      />

      <Breadcrumbs
        items={[{ label: 'Calculator' }]}
        categoryBadge="TURNKEY ESTIMATOR WIZARD"
        title="AI Turnkey Interior Valuation Estimator"
        subtitle="Configure your BHK layout, room counts, and preferred package tier to generate an itemized, transparent budget estimate backed by our zero-cost-surprise guarantee."
      />

      {/* Embedded 5-Step AI Cost Calculator */}
      <AICostCalculator onOpenBooking={onOpenBooking} />

      {/* Pricing Integrity Banner */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#E2DDD6]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white border border-[#E2DDD6] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#13362B]">Zero Cost Surprises</span>
            <p className="text-xs text-[#5A5852] font-light">Every item signed in the final BOQ is 100% price-locked.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2DDD6] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#13362B]">100% Itemized BOQ</span>
            <p className="text-xs text-[#5A5852] font-light">Complete transparency across square footage and hardware quantities.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2DDD6] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#13362B]">Penalty-Backed Handover</span>
            <p className="text-xs text-[#5A5852] font-light">0.5% weekly delay compensation built into contract terms.</p>
          </div>
        </div>
      </section>
    </>
  );
};
