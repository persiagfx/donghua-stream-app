import React from 'react';
import { X, Play, Trash2, BookmarkCheck } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { DonghuaVisual } from './DonghuaVisual';

interface FavoritesDrawerProps {
  favorites: string[];
  donghuaList: Donghua[];
  onClose: () => void;
  onSelect: (donghua: Donghua, playNow?: boolean) => void;
  onRemoveFavorite: (id: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favorites,
  donghuaList,
  onClose,
  onSelect,
  onRemoveFavorite
}) => {
  const favoriteItems = donghuaList.filter((d) => favorites.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0b0f17] border-l border-white/10 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#07090e]">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              فهرست نشان‌شده‌ها ({favoriteItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {favoriteItems.length > 0 ? (
            favoriteItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelect(item, false);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                    <DonghuaVisual donghua={item} variant="card" className="h-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {item.titleFa}
                    </div>
                    <div className="text-xs text-zinc-400 font-sans truncate">
                      {item.titleEn}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {item.episodesCurrent} قسمت پخش شده
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelect(item, true);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                    title="پخش آنلاین"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="حذف از فهرست"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-zinc-500 text-sm">
              هیچ عنوانی هنوز در فهرست نشان‌شده‌ها قرار نگرفته است. با کلیک بر روی علامت بوک‌مارک در هر انیمه، آن را ذخیره کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
