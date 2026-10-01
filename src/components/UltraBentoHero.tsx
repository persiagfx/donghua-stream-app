import React, { useState, useEffect } from 'react';
import { Play, Info, Bookmark, Check, ChevronRight, ChevronLeft, TrendingUp, Crown } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { INITIAL_DONGHUA_LIST } from '../data/donghuaData';
import { toPersianDigits } from '../utils/farsiDigits';

interface UltraBentoHeroProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenSubscription: () => void;
}

export const UltraBentoHero: React.FC<UltraBentoHeroProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite,
  onOpenSubscription
}) => {
  const safeList = (donghuaList && donghuaList.length > 0) ? donghuaList : INITIAL_DONGHUA_LIST;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentIndex = Math.max(0, Math.min(selectedIndex, safeList.length - 1));
  const featured = safeList[currentIndex] || safeList[0] || INITIAL_DONGHUA_LIST[0];
  const sideList = safeList.slice(0, 5);

  // Auto rotation every 9 seconds
  useEffect(() => {
    if (sideList.length <= 1) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => {
        const next = typeof prev === 'number' && !isNaN(prev) ? prev + 1 : 0;
        return next % sideList.length;
      });
    }, 9000);
    return () => clearInterval(timer);
  }, [sideList.length]);

  const isFav = favorites.includes(featured.id);

  // Priority: 16:9 widescreen wallpaper backdrop
  const bannerImage = featured.bannerUrl || featured.posterUrl || INITIAL_DONGHUA_LIST[0].bannerUrl;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      {/* Bento Grid Split: Large Full-Photo Stage (8 cols) + Live Trending Deck (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Stage: Pure 16:9 Widescreen Photo with Clean Minimal Controls */}
        <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] rounded-3xl overflow-hidden border border-white/10 bg-[#070a12] shadow-2xl flex flex-col justify-between p-6 sm:p-8 group">
          {/* Full-bleed 16:9 HD Artwork */}
          {bannerImage && (
            <img
              key={`banner-${featured.id}`}
              src={bannerImage}
              alt={featured.titleFa}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-100 contrast-105 saturate-105 transition-all duration-700 group-hover:scale-102"
              onError={(e) => {
                if (featured.posterUrl && e.currentTarget.src !== featured.posterUrl) {
                  e.currentTarget.src = featured.posterUrl;
                }
              }}
            />
          )}

          {/* Gentle Bottom Gradient Scrim Only Behind Minimal Text (Leaves 80% of photo totally unobstructed) */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

          {/* Top Controls: Sleek and Minimal Slide Buttons (No distracting video quality badges) */}
          <div className="relative z-10 flex items-center justify-end">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-lg">
              <button
                onClick={() => setSelectedIndex((prev) => (prev - 1 + sideList.length) % sideList.length)}
                className="p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="بنر قبلی"
                aria-label="بنر قبلی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-sans px-2 text-zinc-300 font-semibold">
                {toPersianDigits(currentIndex + 1)} / {toPersianDigits(sideList.length)}
              </span>
              <button
                onClick={() => setSelectedIndex((prev) => (prev + 1) % sideList.length)}
                className="p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="بنر بعدی"
                aria-label="بنر بعدی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Area: Minimal Clean Explanation ("یکم توضیحات") */}
          <div className="relative z-10 max-w-xl space-y-2 text-right">
            <div className="text-xs sm:text-sm text-cyan-300 font-sans font-semibold tracking-wide drop-shadow-md">
              {featured.titleEn}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-xl">
              {featured.titleFa}
            </h1>

            {/* Compact Metadata Line */}
            <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-200 font-medium drop-shadow-md pt-0.5">
              <span className="text-amber-400 font-bold">★ {toPersianDigits(featured.rating || 9.8)} امتیاز</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span>قسمت {toPersianDigits(featured.episodesCurrent || 1)}</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span className="text-emerald-400 font-semibold">{featured.status || 'در حال پخش'}</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span className="text-zinc-300">{featured.currentRealmFa}</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center flex-wrap gap-3 pt-2">
              <button
                onClick={() => onSelectDonghua(featured, true)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all duration-200 shadow-xl shadow-cyan-950/60 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>تماشای آنلاین قسمت {toPersianDigits(featured.episodesCurrent || 1)}</span>
              </button>

              <button
                onClick={() => onSelectDonghua(featured, false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <Info className="w-4 h-4" />
                <span>جزئیات داستان</span>
              </button>

              <button
                onClick={() => onToggleFavorite(featured.id)}
                className={`p-2.5 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-cyan-500/25 text-cyan-300 border-cyan-500/50'
                    : 'bg-black/60 text-zinc-300 border-white/20 hover:bg-black/80'
                }`}
                title={isFav ? 'نشان‌شده' : 'افزودن به نشان‌شده‌ها'}
              >
                {isFav ? <Check className="w-4 h-4 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Trending Deck (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#080b12] p-5 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>{toPersianDigits(5)} انیمه داغ و پرمخاطب امروز</span>
              </div>
              <span className="text-[11px] text-zinc-400">به‌روزرسانی زنده</span>
            </div>

            {/* List of top 5 items with Persian digits */}
            <div className="space-y-2">
              {sideList.map((item, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank Number Badge with Persian Digits */}
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        idx === 0 ? 'bg-amber-400 text-black shadow-md' :
                        idx === 1 ? 'bg-slate-300 text-black' :
                        idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-zinc-400'
                      }`}>
                        {toPersianDigits(idx + 1)}
                      </span>

                      {/* Poster Thumbnail */}
                      <div className="w-10 h-14 rounded-xl overflow-hidden shrink-0 bg-black">
                        {item.posterUrl && (
                          <img
                            src={item.posterUrl}
                            alt={item.titleFa}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Title & Stats */}
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                          {item.titleFa}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-sans truncate">
                          {item.titleEn}
                        </div>
                        <div className="text-[10px] text-amber-400 mt-0.5">
                          ★ {toPersianDigits(item.rating || 9.8)} · قسمت {toPersianDigits(item.episodesCurrent || 1)}
                        </div>
                      </div>
                    </div>

                    {/* Active Equalizer Soundwave icon */}
                    {isSelected && (
                      <div className="flex items-end gap-0.5 h-4 shrink-0 px-1">
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-3" />
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom VIP Promo in Bento Card */}
          <div className="pt-4 border-t border-white/5 mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>اشتراک ساعتی (از {toPersianDigits('25,000')} ت)</span>
            </div>

            <button
              onClick={onOpenSubscription}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors cursor-pointer shadow-md"
            >
              خرید اشتراک
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
