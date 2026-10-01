import React, { useState } from 'react';
import { Award, Flame, Play, TrendingUp, Star, ChevronLeft } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { toPersianDigits } from '../utils/farsiDigits';

interface TrendingLeaderboardProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
}

export const TrendingLeaderboard: React.FC<TrendingLeaderboardProps> = ({
  donghuaList,
  onSelectDonghua
}) => {
  const [activeTab, setActiveTab] = useState<'hot' | 'score' | 'views'>('hot');

  // Sort by criteria
  const sortedList = [...donghuaList].sort((a, b) => {
    if (activeTab === 'score') return b.rating - a.rating;
    if (activeTab === 'views') return parseFloat(b.viewsCount) - parseFloat(a.viewsCount);
    return b.episodesCurrent - a.episodesCurrent;
  }).slice(0, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span>جدول رتبه‌بندی تماشاگران (۱۰ عنوان برتر)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            برترین انیمه‌های پرمخاطب پلتفرم
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-[#090d15] p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('hot')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'hot' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            داغ‌ترین امروز
          </button>
          <button
            onClick={() => setActiveTab('score')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'score' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            بالاترین امتیاز
          </button>
          <button
            onClick={() => setActiveTab('views')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'views' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            بیشترین بازدید
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Ranking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedList.map((item, index) => {
          const rank = index + 1;
          const hotnessScore = Math.round(99000 - index * 4200);

          return (
            <div
              key={item.id}
              onClick={() => onSelectDonghua(item, false)}
              className="p-3.5 rounded-2xl bg-[#090d15] border border-white/5 hover:border-amber-500/40 hover:bg-[#0d1320] transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Large Metallic Rank Number with Persian Digits */}
                <div className={`w-10 text-center font-black text-2xl sm:text-3xl shrink-0 ${
                  rank === 1 ? 'text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]' :
                  rank === 2 ? 'text-slate-300 drop-shadow-[0_2px_8px_rgba(203,213,225,0.4)]' :
                  rank === 3 ? 'text-amber-600 drop-shadow-[0_2px_8px_rgba(180,83,9,0.4)]' :
                  'text-zinc-600'
                }`}>
                  {rank < 10 ? `۰${toPersianDigits(rank)}` : toPersianDigits(rank)}
                </div>

                {/* Poster Thumbnail */}
                <div className="w-12 h-16 rounded-xl overflow-hidden shrink-0 bg-black">
                  {item.posterUrl && (
                    <img
                      src={item.posterUrl}
                      alt={item.titleFa}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>

                {/* Title & Info */}
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    {item.titleFa}
                  </div>
                  <div className="text-xs text-zinc-400 font-sans truncate">
                    {item.titleEn}
                  </div>

                  {/* Hotness bar */}
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-400">
                    <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{toPersianDigits(hotnessScore.toLocaleString('en-US'))}</span>
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span>{item.studio.split('/')[0]}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="text-emerald-400 font-bold">★ {toPersianDigits(item.rating)}</span>
                  </div>
                </div>
              </div>

              {/* Quick Play Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDonghua(item, true);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black text-zinc-300 transition-all shrink-0 cursor-pointer shadow-sm"
                title="تماشای آنلاین"
              >
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
