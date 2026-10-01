import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, Info, Bookmark, Check } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { toPersianDigits } from '../utils/farsiDigits';

interface NeoCarouselRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  items: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const NeoCarouselRow: React.FC<NeoCarouselRowProps> = ({
  title,
  subtitle,
  icon,
  items,
  onSelectDonghua,
  favorites,
  onToggleFavorite
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Row Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
            {icon && <span className="text-cyan-400">{icon}</span>}
            <span>{title}</span>
            <span className="text-xs text-zinc-500 font-normal">({toPersianDigits(items.length)})</span>
          </div>
          {subtitle && (
            <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Scroll Nav Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-[#0e1422] hover:bg-white/10 border border-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="اسکرول به راست"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-[#0e1422] hover:bg-white/10 border border-white/5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="اسکرول به چپ"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Continuous Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((donghua) => {
          const isFav = favorites.includes(donghua.id);
          return (
            <div
              key={donghua.id}
              className="group relative flex-none w-[180px] sm:w-[210px] bg-[#0c1018] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              {/* Poster Image Stage */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
                {donghua.posterUrl ? (
                  <img
                    src={donghua.posterUrl}
                    alt={donghua.titleFa}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-cyan-950 to-black flex items-center justify-center p-3 text-center text-xs font-bold text-white">
                    {donghua.titleFa}
                  </div>
                )}

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-black/30 pointer-events-none" />

                {/* Top Badges with Persian digits */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    ۴K اولترا
                  </span>

                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/90 text-black">
                    قسمت {toPersianDigits(donghua.episodesCurrent)}
                  </span>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 p-3">
                  <button
                    onClick={() => onSelectDonghua(donghua, true)}
                    className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-transform duration-200 hover:scale-110 shadow-lg shadow-cyan-950 cursor-pointer"
                    title="پخش سریع"
                  >
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                  </button>

                  <button
                    onClick={() => onSelectDonghua(donghua, false)}
                    className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title="جزئیات"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(donghua.id);
                    }}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-cyan-600 text-white'
                        : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90'
                    }`}
                    title={isFav ? 'حذف از نشان‌شده‌ها' : 'نشان کردن'}
                  >
                    {isFav ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  {/* Studio and Rating */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span className="text-cyan-400 truncate max-w-[100px]">{donghua.studio.split('/')[0]}</span>
                    <span className="text-amber-400 font-bold">★ {toPersianDigits(donghua.rating)}</span>
                  </div>

                  <h3
                    onClick={() => onSelectDonghua(donghua, false)}
                    className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {donghua.titleFa}
                  </h3>

                  <div className="text-[10px] text-zinc-500 font-sans truncate mt-0.5">
                    {donghua.titleEn}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                  <span className="truncate">{donghua.genres[0]}</span>
                  <span className="text-zinc-300 font-medium">پخش {donghua.broadcastDayFa}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
