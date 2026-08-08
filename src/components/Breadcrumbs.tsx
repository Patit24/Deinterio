import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  categoryBadge?: string;
  title: string;
  subtitle?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  categoryBadge = 'DEDICATED SUBPAGE',
  title,
  subtitle,
}) => {
  return (
    <div className="pt-28 pb-10 px-4 sm:px-8 bg-[#F4EFDF] border-b border-[#E2DDD6] relative overflow-hidden">
      {/* Subtle Contour Line Background Accent */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20"
        style={{ backgroundImage: `radial-gradient(circle at top right, rgba(168,139,87,0.35), transparent 70%)` }} 
      />

      <div className="max-w-7xl mx-auto space-y-4 relative z-10">
        
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#6B6560]">
          <a href="#/" className="flex items-center gap-1 hover:text-[#13362B] transition-colors">
            <Home className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>Home</span>
          </a>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#A88B57]/60" />
              {item.href ? (
                <a href={item.href} className="hover:text-[#13362B] transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-[#8C6D3B] font-bold uppercase tracking-wider">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title & Badge */}
        <div className="space-y-2 pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4C3A3] text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#8C6D3B] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>{categoryBadge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1917] tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base text-[#5A5852] font-light max-w-3xl leading-relaxed pt-1">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
