import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onOpenBooking: () => void;
}

export const ARTICLES = [
  {
    slug: 'kolkata-interior-trends-2026',
    title: '2026 Luxury Interior Design Trends in Kolkata: Italian Minimalism Meets Heritage Vastu',
    excerpt: 'Explore how top luxury penthouses in New Town and villas in Ballygunge are blending fluted teak joinery with acoustic concealed LED coves.',
    category: 'Design Trends',
    date: 'August 2026',
    readTime: '6 Min Read',
    author: 'Ananya Mukherjee, Principal Architect',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    content: `
      Kolkata's luxury residential market is experiencing a profound architectural shift in 2026. Homeowners in Alipore, Ballygunge, and New Town penthouses are moving away from heavy gilded traditional woodwork toward clean, Italian minimalist lines infused with Vastu harmony.

      ### 1. Fluted Teak & Integrated Lighting Slots
      Ceiling slots with concealed 3000K warm LED channels are replacing bulky dropped false ceilings. When combined with vertical fluted teak wood paneling, spaces achieve visually expansive vertical proportion.

      ### 2. German Soft-Close & Acrylic Kitchen Architecture
      Indian cooking involves heavy spice roasting and heat. German-engineered soft-close hardware from Hafele combined with quartz countertops ensures zero stain absorption and lifetime smooth door motion.
    `,
  },
  {
    slug: 'modular-kitchen-buying-guide',
    title: 'The Ultimate Modular Kitchen Buyer’s Guide: Plywood Grades, Hardware & Countertops',
    excerpt: 'Avoid bubbling laminates and rusting hinges. A complete technical breakdown of CenturyPly BWP 710 marine plywood and Hafele tandem boxes.',
    category: 'Material Guides',
    date: 'July 2026',
    readTime: '8 Min Read',
    author: 'Siddharth Banerjee, Joinery Director',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    content: `
      Choosing the right materials for an Indian modular kitchen determines whether your investment lasts 3 years or 25 years. Here is our architectural breakdown of plywood grades and fittings.

      ### Why BWP 710 Marine Plywood is Mandatory
      Commercial grade ply (MR grade) warps under humidity and steam exposure near sink areas. CenturyPly Club Prime BWP 710 marine plywood is boiling water proof and termite resistant.
    `,
  },
  {
    slug: 'vastu-compliant-modern-homes',
    title: 'Harmonizing Vastu Principles with Ultra-Modern Luxury Apartments',
    excerpt: 'How to position your kitchen island, master bed orientation, and entrance foyers without sacrificing sleek contemporary aesthetics.',
    category: 'Architecture & Vastu',
    date: 'June 2026',
    readTime: '5 Min Read',
    author: 'Vikramaditya Roy, Spatial Engineer',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    content: `
      Vastu compliance does not require sacrificing clean modern lines. By utilizing 3D laser spatial scan software, we optimize kitchen placement in the South-East zone while concealing structural columns behind fluted marble walls.
    `,
  },
];

export const BlogPage: React.FC<BlogPageProps> = () => {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredArticles = selectedCat === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCat);

  return (
    <>
      <SEOHead
        title="Architectural Insights & Homeowner Guides"
        description="Read luxury interior design trends, material buying guides, and Vastu architectural insights by Deinterio Group."
      />

      <Breadcrumbs
        items={[{ label: 'Insights & Blog' }]}
        categoryBadge="ARCHITECTURAL INSIGHTS"
        title="Design Insights & Homeowner Guides"
        subtitle="Expert articles written by our principal architects on luxury material selection, modular kitchen engineering, and 2026 interior trends."
      />

      {/* Articles Directory Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-center gap-2 flex-wrap border-b border-[#E2DDD6] pb-6">
          {['All', 'Design Trends', 'Material Guides', 'Architecture & Vastu'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#13362B] text-white shadow-md'
                  : 'bg-white text-[#6B6560] border border-[#E2DDD6] hover:border-[#A88B57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <a
              key={art.slug}
              href={`#/blog/${art.slug}`}
              className="bg-white rounded-3xl border border-[#E2DDD6] overflow-hidden shadow-xs hover-lift transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#13362B]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#C8AA7A] uppercase tracking-wider font-bold">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8C6D3B]">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1A1917] group-hover:text-[#13362B] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono font-bold text-[#13362B] group-hover:underline">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 text-[#A88B57] group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};
