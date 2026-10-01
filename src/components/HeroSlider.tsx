import React, { useState, useEffect } from 'react';
import { Play, Info, Flame, ChevronRight, ChevronLeft, Bookmark, Check } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { DonghuaVisual } from './DonghuaVisual';

interface HeroSliderProps {
  featuredList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  featuredList,
  onSelectDonghua,
  favorites,
  onToggleFavorite
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotation every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const current = featuredList[currentIndex] || featuredList[0];
  if (!current) return null;

  const isFav = favorites.includes(current.id);

  return (
    <section className="relative w-full overflow-hidden bg-[#07090e] border-b border-white/5">
      {/* Background Visual Banner */}
      <div className="absolute inset-0 z-0">
        <DonghuaVisual donghua={current} variant="banner" className="h-full" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col justify-end min-h-[560px] lg:min-h-[640px]">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Line (No static pills as mandated by design skill) */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-300 font-medium mb-3">
            <span className="text-emerald-400 font-semibold">{current.studio}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{current.releaseYear}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400 font-bold">★ {current.rating}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{current.episodesCurrent} از {current.episodesTotal} قسمت</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400">{current.status}</span>
          </div>

          {/* English Subtitle and Persian Tagline */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-sans mb-2 font-medium">
            <span>{current.titleEn}</span>
            {current.taglineFa && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-amber-300/90 text-xs hidden sm:inline">{current.taglineFa}</span>
              </>
            )}
          </div>

          {/* Primary Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none mb-4" style={{ textWrap: 'balance' }}>
            {current.titleFa}
          </h1>

          {/* Synopsis with line clamp */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed line-clamp-3 mb-6 max-w-2xl">
            {current.synopsisFa}
          </p>

          {/* Cultivation system inline notice */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
            <span className="text-amber-300 font-semibold">سیستم قدرت:</span>
            <span>{current.cultivationSystem}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-emerald-300">{current.currentRealmFa}</span>
          </div>

          {/* Action Button Row */}
          <div className="flex items-center flex-wrap gap-4">
            {/* Primary Action */}
            <button
              onClick={() => onSelectDonghua(current, true)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-950 cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>تماشای آنلاین و دانماکو</span>
            </button>

            {/* Secondary Action: Lore & Info */}
            <button
              onClick={() => onSelectDonghua(current, false)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-200 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Info className="w-4 h-4" />
              <span>شناسنامه و شخصیت‌ها</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleFavorite(current.id)}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                isFav
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
              }`}
              title={isFav ? 'حذف از نشان‌شده‌ها' : 'افزودن به نشان‌شده‌ها'}
            >
              {isFav ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Carousel thumbnail selectors */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
            {featuredList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer text-right shrink-0 ${
                  idx === currentIndex
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-black/60'
                }`}
              >
                <div className="w-8 h-11 rounded overflow-hidden shrink-0 bg-black">
                  {item.posterUrl ? (
                    <img
                      src={item.posterUrl}
                      alt={item.titleFa}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-950 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="hidden md:block pr-1 min-w-[100px] max-w-[140px]">
                  <div className="text-xs font-bold text-white truncate">
                    {item.titleFa}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-sans truncate">
                    {item.titleEn}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length)}
              className="p-2 rounded-lg bg-black/60 hover:bg-black border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredList.length)}
              className="p-2 rounded-lg bg-black/60 hover:bg-black border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
