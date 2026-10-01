import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles, Film } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { DonghuaCard } from './DonghuaCard';

interface DonghuaArchiveProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, playNow?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const DonghuaArchive: React.FC<DonghuaArchiveProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite
}) => {
  const [selectedGenre, setSelectedGenre] = useState('همه');
  const [selectedStudio, setSelectedStudio] = useState('همه');
  const [sortBy, setSortBy] = useState<'rating' | 'episodes' | 'year'>('rating');

  const genres = ['همه', 'شیان‌شیا', 'اکشن', 'علمی‌تخیلی', 'اساطیری', 'فانتزی', 'رازآلود'];
  const studios = ['همه', 'Sparkly Key', 'Shanghai Foch Film', 'Wonder Cat', 'Bilibili'];

  const filteredAndSorted = useMemo(() => {
    return donghuaList
      .filter((item) => {
        const matchesGenre =
          selectedGenre === 'همه' || item.genres.some((g) => g.includes(selectedGenre));
        const matchesStudio =
          selectedStudio === 'همه' || item.studio.includes(selectedStudio);
        return matchesGenre && matchesStudio;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'episodes') return b.episodesCurrent - a.episodesCurrent;
        if (sortBy === 'year') return b.releaseYear - a.releaseYear;
        return 0;
      });
  }, [donghuaList, selectedGenre, selectedStudio, sortBy]);

  return (
    <section className="py-12 bg-[#07090e] min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>مجموعه جامع و برترین عناوین شیان‌شیا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              آرشیو کامل انیمه‌های چینی (دونگهوا)
            </h2>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">مرتب‌سازی:</span>
            <div className="flex items-center gap-1 p-1 bg-[#0e121b] border border-white/5 rounded-lg">
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  sortBy === 'rating' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                بالاترین امتیاز
              </button>
              <button
                onClick={() => setSortBy('episodes')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  sortBy === 'episodes' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                بیشترین قسمت‌ها
              </button>
              <button
                onClick={() => setSortBy('year')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  sortBy === 'year' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                جدیدترین
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-3 p-4 bg-[#0c1017] border border-white/5 rounded-2xl mb-8">
          {/* Genre Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-zinc-400 shrink-0 font-medium ml-2">ژانر:</span>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedGenre === g
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Studio Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5">
            <span className="text-xs text-zinc-400 shrink-0 font-medium ml-2">استودیو سازنده:</span>
            {studios.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStudio(s)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedStudio === s
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSorted.map((donghua) => (
            <DonghuaCard
              key={donghua.id}
              donghua={donghua}
              onSelect={onSelectDonghua}
              isFavorite={favorites.includes(donghua.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
