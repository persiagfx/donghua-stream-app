import React from 'react';
import { X, Play, Music, Sparkles, Shield, Sword, Bookmark, Check, Crown } from 'lucide-react';
import { Donghua, Character, OSTTrack } from '../types/donghua';
import { DonghuaVisual } from './DonghuaVisual';
import { toPersianDigits } from '../utils/farsiDigits';

interface DonghuaDetailModalProps {
  donghua: Donghua;
  onClose: () => void;
  onPlay: (donghua: Donghua) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  playingTrackId: string | null;
  onPlayTrack: (track: OSTTrack) => void;
  onOpenSubscription?: () => void;
}

export const DonghuaDetailModal: React.FC<DonghuaDetailModalProps> = ({
  donghua,
  onClose,
  onPlay,
  isFavorite,
  onToggleFavorite,
  playingTrackId,
  onPlayTrack,
  onOpenSubscription
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c1017] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col">
        {/* Banner Backdrop */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <DonghuaVisual donghua={donghua} variant="banner" className="h-full" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Play CTA over banner bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/80 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-sans font-medium mb-1">
                {donghua.titleEn}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {donghua.titleFa}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlay(donghua)}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>تماشای آنلاین</span>
              </button>

              <button
                onClick={() => onToggleFavorite(donghua.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
                title={isFavorite ? 'حذف از نشان‌شده‌ها' : 'افزودن به نشان‌شده‌ها'}
              >
                {isFavorite ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Metadata Bar with Persian digits */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-400 border-b border-white/5 pb-4">
            <span className="text-emerald-400 font-semibold">{donghua.studio}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>سال {toPersianDigits(donghua.releaseYear)}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400 font-bold">★ {toPersianDigits(donghua.rating)} امتیاز</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{toPersianDigits(donghua.episodesCurrent)} قسمت پخش شده</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300">{toPersianDigits(donghua.viewsCount)} بازدید</span>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-sm font-bold text-zinc-200 mb-2">خلاصه داستان</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {donghua.synopsisFa}
            </p>
          </div>

          {/* Cultivation system details */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-400 font-bold mb-1">سیستم و سبک تزکیه:</div>
              <div className="text-sm text-white font-medium">{donghua.cultivationSystem}</div>
            </div>
            <div className="sm:text-left">
              <div className="text-xs text-zinc-400 mb-1">قلمرو فعلی قهرمان داستان:</div>
              <div className="text-sm text-emerald-300 font-bold">{donghua.currentRealmFa}</div>
            </div>
          </div>

          {/* Characters Section */}
          {donghua.characters && donghua.characters.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2">
                <Sword className="w-4 h-4 text-emerald-400" />
                <span>شخصیت‌های کلیدی و سلاح‌های معنوی</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donghua.characters.map((char) => (
                  <div
                    key={char.nameEn}
                    className="p-4 rounded-xl bg-[#080b10] border border-white/5 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">
                          {char.nameFa}
                        </div>
                        <div className="text-xs text-zinc-500 font-sans">
                          {char.nameEn}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {char.cultivationRealm}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {char.descriptionFa}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex flex-col gap-1 text-[11px] text-zinc-400">
                      <div>
                        <span className="text-zinc-500">سلاح / اثر باستانی: </span>
                        <span className="text-amber-300/90">{char.spiritWeapon}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">فرقه / سازمان: </span>
                        <span className="text-zinc-300">{char.faction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OST & Ambient Music preview */}
          {donghua.ostList && donghua.ostList.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2">
                <Music className="w-4 h-4 text-emerald-400" />
                <span>موسیقی متن و تیتراژ اختصاصی (اجرای زنده ساز سنتی)</span>
              </h3>
              <div className="space-y-2">
                {donghua.ostList.map((track) => {
                  const isCurrentTrack = playingTrackId === track.id;
                  return (
                    <div
                      key={track.id}
                      className="p-3 rounded-xl bg-[#080b10] border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onPlayTrack(track)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            isCurrentTrack
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/15'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {track.titleFa}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {track.artistFa}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                        <span>{track.duration}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-400 uppercase">
                          {track.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
