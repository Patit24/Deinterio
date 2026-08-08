import React, { useState, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
      className="relative w-full h-[350px] sm:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[#1A1917]/10 shadow-md"
      data-cursor="DRAG"
    >
      {/* After Image (Full width background) */}
      <img src={afterImage} alt="After Luxury Interior" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 border border-white/50 text-[10px] uppercase font-mono text-[#1B4D3E] font-semibold backdrop-blur-md shadow-sm">
        AFTER (LUMIÈRE ARCHITECTURE)
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute top-0 bottom-0 left-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Raw Construction"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1A1917]/80 border border-[#1A1917]/20 text-[10px] uppercase font-mono text-white backdrop-blur-md">
          BEFORE (RAW SITE DEMOLITION)
        </div>
      </div>

      {/* Divider Bar & Drag Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#A88B57] cursor-ew-resize z-20 shadow-[0_0_15px_rgba(168,139,87,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF8F3] border-2 border-[#1A1917] flex items-center justify-center shadow-xl">
          <SlidersHorizontal className="w-4 h-4 text-[#1A1917]" />
        </div>
      </div>
    </div>
  );
};
