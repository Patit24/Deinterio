import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AICostCalculator } from '../components/AICostCalculator';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { dataStore } from '../services/dataStore';

interface PricingPageProps {
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
  const tiers = dataStore.getPricing();

  return (
    <>
      <SEOHead
        title="Pricing Packages & Turnkey Rates"
        description="Compare Deinterio's turnkey interior package tiers: Essentials, Premium, and Luxury Signature."
      />

      <Breadcrumbs
        items={[{ label: 'Pricing & Packages' }]}
        categoryBadge="TRANSPARENT PRICING TIERS"
        title="Turnkey Package Tiers & Guaranteed BOQ Rates"
        subtitle="No hidden fees, no mid-project price escalation. Choose the architectural package tier that aligns with your sanctuary goals."
      />

      {/* Package Tiers Grid */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={tier.id || idx}
              className={`rounded-3xl p-8 border transition-all relative flex flex-col justify-between ${
                tier.popular
                  ? 'bg-[#13362B] text-white border-[#13362B] shadow-2xl scale-105 z-10'
                  : 'bg-white text-[#1A1917] border-[#E2DDD6] shadow-xs'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C8AA7A] text-[#13362B] px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                  ★ {tier.tag}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${tier.popular ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                    {tier.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold">{tier.price}</span>
                    <span className={`text-xs font-mono ${tier.popular ? 'text-gray-300' : 'text-[#6B6560]'}`}>{tier.unit}</span>
                  </div>
                  <p className={`text-xs font-light mt-3 leading-relaxed ${tier.popular ? 'text-[#D4C3A3]' : 'text-[#5A5852]'}`}>
                    {tier.desc}
                  </p>
                </div>

                <div className={`space-y-3 pt-6 border-t ${tier.popular ? 'border-white/20' : 'border-[#E2DDD6]'}`}>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${tier.popular ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                    Package Deliverables:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? 'text-[#C8AA7A]' : 'text-[#13362B]'}`} />
                        <span className={tier.popular ? 'text-gray-100 font-light' : 'text-[#1A1917]'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                    tier.popular
                      ? 'bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B]'
                      : 'bg-[#13362B] hover:bg-[#0E271F] text-white'
                  }`}
                >
                  Select {tier.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Cost Estimator */}
      <AICostCalculator onOpenBooking={onOpenBooking} />
    </>
  );
};
