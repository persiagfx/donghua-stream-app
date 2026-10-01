import React, { useState, useEffect } from 'react';
import { Play, Info, Bookmark, Check, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Crown } from 'lucide-react';
import { Donghua } from '../types/donghua';

interface NeoHeroSliderProps {
  featuredList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const NeoHeroSlider: React.FC<NeoHeroSliderProps> = ({
  featuredList,
  onSelectDonghua,
  favorites,
  onToggleFavorite
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerActive, setIsTrailerActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const current = featuredList[currentIndex] || featuredList[0];
  if (!current) return null;

  const isFav = favorites.includes(current.id);
  const bannerImage = current.bannerUrl || current.posterUrl;

  return (
    <section className="relative w-full h-[620px] lg:h-[720px] overflow-hidden bg-[#06070b]">
      {/* Background High-Impact Backdrop */}
      <div className="absolute inset-0 z-0">
        {bannerImage && (
          <img
            key={current.id}
            src={bannerImage}
            alt={current.titleFa}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 animate-fade-in filter brightness-[0.65] contrast-110"
          />
        )}

        {/* Neo Gradient Scrims: Multi-layer depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-[#06070b]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070b] via-[#06070b]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-[#06070b] pointer-events-none" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16 lg:pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Unboxed Metadata Line (Zero-Pill discipline) */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
            <span className="text-cyan-400 font-bold">{current.studio.split('/')[0]}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>سال {current.releaseYear}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400 font-bold">★ {current.rating}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{current.episodesCurrent} قسمت پخش شده</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-emerald-400 font-semibold">{current.status}</span>
          </div>

          {/* English Kicker and Persian Title */}
          <div className="text-xs sm:text-sm text-cyan-300/90 font-medium tracking-wide">
            {current.titleEn}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
            {current.titleFa}
          </h1>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3 max-w-xl">
            {current.synopsisFa}
          </p>

          {/* Realm & Power System */}
          <div className="text-xs text-zinc-400 flex items-center gap-2 pt-1">
            <span className="text-amber-400 font-semibold">قلمرو فعلی:</span>
            <span className="text-white">{current.currentRealmFa}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-cyan-300">{current.genres.join(' / ')}</span>
          </div>

          {/* Action Button Cluster */}
          <div className="flex items-center flex-wrap gap-3 pt-3">
            <button
              onClick={() => onSelectDonghua(current, true)}
              className="flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl transition-all duration-200 shadow-xl shadow-cyan-950/50 cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>پخش قسمت {current.episodesCurrent}</span>
            </button>

            <button
              onClick={() => onSelectDonghua(current, false)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-200 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              <Info className="w-4 h-4" />
              <span>اطلاعات و قسمت‌ها</span>
            </button>

            <button
              onClick={() => onToggleFavorite(current.id)}
              className={`p-3 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                isFav
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
              }`}
              title={isFav ? 'نشان‌شده' : 'افزودن به نشان‌شده‌ها'}
            >
              {isFav ? <Check className="w-4 h-4 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Neo Horizontal Thumbnail Selector Carousel */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 max-w-4xl">
            {featuredList.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2.5 p-1.5 rounded-xl border transition-all cursor-pointer text-right shrink-0 ${
                    isSelected
                      ? 'bg-cyan-600/25 border-cyan-500 shadow-lg shadow-cyan-950/40 text-white ring-1 ring-cyan-500/50'
                      : 'bg-black/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-black/80'
                  }`}
                >
                  <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 bg-black">
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        alt={item.titleFa}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-xs font-bold text-cyan-300">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="hidden sm:block pr-1 max-w-[130px]">
                    <div className="text-xs font-bold text-white truncate">
                      {item.titleFa}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-sans truncate">
                      {item.titleEn}
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                      ★ {item.rating}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length)}
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredList.length)}
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
