import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { dataStore, type BlogArticle } from '../services/dataStore';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft } from 'lucide-react';

interface ArticleDetailPageProps {
  slug?: string;
  onOpenBooking: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug = 'kolkata-interior-trends-2026',
  onOpenBooking,
}) => {
  const [articles, setArticles] = useState<BlogArticle[]>(() => dataStore.getBlogs());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleUpdate = () => {
      setArticles(dataStore.getBlogs());
    };
    window.addEventListener('deinterio_datastore_updated', handleUpdate);
    return () => window.removeEventListener('deinterio_datastore_updated', handleUpdate);
  }, []);

  const article = articles.find((a) => a.slug === slug || a.id === slug) || articles[0];

  if (!article) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#1A1917]">Article Not Found</h2>
        <p className="text-sm font-mono text-gray-500">The requested article could not be located.</p>
        <a href="#/blog" className="inline-block px-5 py-2.5 rounded-xl bg-[#13362B] text-white font-mono text-xs uppercase">
          Back to Insights
        </a>
      </div>
    );
  }

  const publishDate = article.publishedDate || (article as any).date || 'Recently Published';

  return (
    <>
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.excerpt}
      />

      <Breadcrumbs
        items={[
          { label: 'Insights', href: '#/blog' },
          { label: article.category },
        ]}
        categoryBadge={article.category}
        title={article.title}
        subtitle={`Published ${publishDate} • ${article.readTime} • By ${article.author}`}
      />

      <article className="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 text-[#1A1917]">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[350px] sm:h-[450px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {article.imageCaption && (
          <p className="text-center text-xs font-mono text-[#6B6560] italic -mt-4">
            {article.imageCaption}
          </p>
        )}

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2DDD6] space-y-6 leading-relaxed text-sm sm:text-base font-light text-[#3A3832] shadow-xs">
          {article.excerpt && (
            <p className="font-normal text-[#1A1917] text-lg leading-relaxed italic border-l-4 border-[#A88B57] pl-4 bg-[#FAF8F4] py-3 rounded-r-xl">
              "{article.excerpt}"
            </p>
          )}

          <div className="space-y-4 pt-4 border-t border-[#E2DDD6]">
            {(article.content || '').split('\n\n').map((rawParagraph, idx) => {
              const paragraph = rawParagraph.trim();
              if (!paragraph) return null;

              // Markdown In-Article Image: ![alt](url)
              const imgMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
              if (imgMatch) {
                const altText = imgMatch[1];
                const imgUrl = imgMatch[2];
                return (
                  <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-[#E2DDD6] bg-[#FAF8F4] shadow-xs">
                    <img
                      src={imgUrl}
                      alt={altText || article.title}
                      className="w-full h-auto max-h-[520px] object-cover"
                      loading="lazy"
                    />
                    {altText && (
                      <figcaption className="p-3 text-center text-xs font-mono text-[#6B6560] italic border-t border-[#E2DDD6] bg-white">
                        {altText}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              // Markdown Heading 2: ## Title
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-normal text-[#13362B] pt-6 border-b border-[#E2DDD6] pb-2">
                    {paragraph.replace(/^##\s+/, '')}
                  </h2>
                );
              }

              // Markdown Heading 3: ### Title
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-normal text-[#13362B] pt-4">
                    {paragraph.replace(/^###\s+/, '')}
                  </h3>
                );
              }

              // Markdown Blockquote: > text
              if (paragraph.startsWith('>')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-[#13362B] pl-4 italic text-base text-[#13362B] bg-[#F0F7F4] p-4 rounded-r-xl my-4">
                    {paragraph.replace(/^>\s*/, '')}
                  </blockquote>
                );
              }

              // Markdown Bullet List: - item or * item
              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                const items = paragraph.split('\n').map(line => line.replace(/^[-*]\s*/, '').trim());
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-[#3A3832]">
                    {items.map((it, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">{it}</li>
                    ))}
                  </ul>
                );
              }

              // Standard Paragraph
              return (
                <p key={idx} className="leading-relaxed font-light whitespace-pre-line text-[#3A3832]">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="pt-8 border-t border-[#E2DDD6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="#/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#13362B] uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className="w-4 h-4 text-[#A88B57]" />
              <span>Back to All Articles</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
            >
              Discuss Floorplan with Architect →
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
