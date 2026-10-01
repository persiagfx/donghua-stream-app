import React from 'react';
import { Play, Bookmark, Check, Sparkles } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { DonghuaVisual } from './DonghuaVisual';
import { toPersianDigits } from '../utils/farsiDigits';

interface DonghuaCardProps {
  donghua: Donghua;
  onSelect: (donghua: Donghua, playNow?: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const DonghuaCard: React.FC<DonghuaCardProps> = ({
  donghua,
  onSelect,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <article className="group relative flex flex-col bg-[#0e121b] border border-white/5 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20">
      {/* Media Visual Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
        <DonghuaVisual donghua={donghua} variant="card" className="h-full" />

        {/* Hover Quick Play Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => onSelect(donghua, true)}
            className="p-3.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-transform duration-200 hover:scale-110 shadow-lg cursor-pointer"
            title="پخش سریع"
          >
            <Play className="w-5 h-5 fill-white translate-x-0.5" />
          </button>
          <button
            onClick={() => onSelect(donghua, false)}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-transform duration-200 hover:scale-105 cursor-pointer"
            title="جزئیات و شخصیت‌ها"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Top-Right Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(donghua.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-emerald-600/90 text-white'
              : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
          }`}
          title={isFavorite ? 'نشان شده' : 'نشان کردن'}
        >
          {isFavorite ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Card Body Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed clean metadata */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mb-1.5">
            <span className="text-emerald-400">{donghua.studio.split('/')[0]}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{toPersianDigits(donghua.releaseYear)}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400 font-bold">★ {toPersianDigits(donghua.rating)}</span>
          </div>

          {/* Primary Title */}
          <h3
            onClick={() => onSelect(donghua, false)}
            className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {donghua.titleFa}
          </h3>

          {/* English Subtitle */}
          <div className="text-xs text-zinc-500 font-sans tracking-wide mt-0.5 truncate">
            {donghua.titleEn}
          </div>

          {/* Cultivation realm unboxed descriptor */}
          <div className="text-[11px] text-zinc-400 mt-2 truncate">
            <span className="text-amber-300/80">قلمرو: </span>
            {donghua.currentRealmFa}
          </div>
        </div>

        {/* Bottom Status & Schedule Footer */}
        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
          <span>پخش {donghua.broadcastDayFa}</span>
          <span className="text-zinc-300 font-medium">
            {toPersianDigits(donghua.episodesCurrent)} قسمت
          </span>
        </div>
      </div>
    </article>
  );
};
