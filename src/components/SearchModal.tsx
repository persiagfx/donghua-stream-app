import React, { useState, useMemo } from 'react';
import { Search, X, Play, Film, Sparkles } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { DonghuaVisual } from './DonghuaVisual';

interface SearchModalProps {
  donghuaList: Donghua[];
  onClose: () => void;
  onSelect: (donghua: Donghua, playNow?: boolean) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  donghuaList,
  onClose,
  onSelect
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('همه');

  const genres = ['همه', 'شیان‌شیا', 'اکشن', 'علمی‌تخیلی', 'اساطیری', 'فانتزی', 'رازآلود'];

  const filtered = useMemo(() => {
    return donghuaList.filter((item) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.titleFa.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.studio.toLowerCase().includes(q) ||
        (item.taglineFa && item.taglineFa.toLowerCase().includes(q)) ||
        (item.characters && item.characters.some((c) => c.nameFa.includes(q) || c.nameEn.toLowerCase().includes(q)));

      const matchesGenre =
        selectedGenre === 'همه' ||
        item.genres.some((g) => g.includes(selectedGenre));

      return matchesQuery && matchesGenre;
    });
  }, [donghuaList, query, selectedGenre]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0d121c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#080b10]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام انیمه، عنوان چینی (斗破، 仙逆...)، پین‌یین، استودیو، شخصیت‌ها..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>

        {/* Genre Filter Buttons */}
        <div className="flex items-center gap-1.5 p-3 overflow-x-auto bg-[#0a0d15] border-b border-white/5">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGenre === g
                  ? 'bg-emerald-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item, false);
                  onClose();
                }}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                    <DonghuaVisual donghua={item} variant="card" className="h-full" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.titleFa}
                    </div>
                    <div className="text-xs text-zinc-400 font-sans">
                      {item.titleEn}
                    </div>
                    {/* Unboxed inline metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                      <span>{item.studio.split('/')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400">★ {item.rating}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.episodesCurrent} قسمت</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item, true);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>پخش</span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500 text-sm">
              موردی مطابق با عبارت جستجو یافت نشد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
