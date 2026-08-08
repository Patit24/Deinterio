import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ARTICLES } from './BlogPage';
import { SEOHead } from '../components/SEOHead';
import { Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

interface ArticleDetailPageProps {
  slug?: string;
  onOpenBooking: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug = 'kolkata-interior-trends-2026',
  onOpenBooking,
}) => {
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
      />

      <Breadcrumbs
        items={[
          { label: 'Insights', href: '#/blog' },
          { label: article.category },
        ]}
        categoryBadge={article.category}
        title={article.title}
        subtitle={`Published ${article.date} • ${article.readTime} • By ${article.author}`}
      />

      <article className="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 text-[#1A1917]">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2DDD6] space-y-6 leading-relaxed text-sm sm:text-base font-light text-[#3A3832]">
          <p className="font-normal text-[#1A1917] text-lg leading-relaxed italic border-l-4 border-[#A88B57] pl-4">
            "{article.excerpt}"
          </p>

          <div className="space-y-4 pt-4 border-t border-[#E2DDD6]">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('###')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl font-normal text-[#13362B] pt-4">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph.trim()}</p>;
            })}
          </div>

          <div className="pt-8 border-t border-[#E2DDD6] flex items-center justify-between">
            <a
              href="#/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#13362B] uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className="w-4 h-4 text-[#A88B57]" />
              <span>Back to Articles</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
            >
              Discuss Floorplan with Author →
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
