import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight } from 'lucide-react';
import { dataStore, type BlogArticle } from '../services/dataStore';

interface BlogPageProps {
  onOpenBooking: () => void;
}

export const ARTICLES: BlogArticle[] = dataStore.getBlogs();

export const BlogPage: React.FC<BlogPageProps> = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [articles, setArticles] = useState<BlogArticle[]>(() => dataStore.getBlogs());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleUpdate = () => {
      setArticles(dataStore.getBlogs());
    };
    window.addEventListener('deinterio_datastore_updated', handleUpdate);
    return () => window.removeEventListener('deinterio_datastore_updated', handleUpdate);
  }, []);

  // Filter published articles for visitors
  const publishedArticles = articles.filter((a) => a.status === 'PUBLISHED' || !a.status);

  // Dynamic category pills
  const categories = ['All', ...Array.from(new Set(publishedArticles.map((a) => a.category).filter(Boolean)))];

  const filteredArticles = selectedCat === 'All'
    ? publishedArticles
    : publishedArticles.filter((a) => a.category === selectedCat);

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
          {categories.map((cat) => (
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

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-gray-500 font-mono text-sm">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art) => {
              const displayDate = art.publishedDate || (art as any).date || 'Recently Published';
              return (
                <a
                  key={art.slug || art.id}
                  href={`#/blog/${art.slug}`}
                  className="bg-white rounded-3xl border border-[#E2DDD6] overflow-hidden shadow-xs hover-lift transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-56 relative overflow-hidden bg-gray-100">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-[#13362B]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#C8AA7A] uppercase tracking-wider font-bold">
                        {art.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8C6D3B]">
                        <span>{displayDate}</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h3 className="font-serif text-xl font-normal text-[#1A1917] group-hover:text-[#13362B] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>

                      <p className="text-xs text-[#5A5852] font-light leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono font-bold text-[#13362B] group-hover:underline">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-[#A88B57] group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};
