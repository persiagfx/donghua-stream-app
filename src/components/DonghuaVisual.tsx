import React, { useState } from 'react';
import { Sparkles, Flame, Zap, Sword, Shield, Compass, Mountain, Moon, Check, Award, Crown } from 'lucide-react';
import { Donghua } from '../types/donghua';

interface DonghuaVisualProps {
  donghua: Donghua;
  variant?: 'poster' | 'banner' | 'card';
  className?: string;
}

export const DonghuaVisual: React.FC<DonghuaVisualProps> = ({
  donghua,
  variant = 'card',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Theme specific visual motifs for fallback and glows
  const getThemeMotif = () => {
    switch (donghua.id) {
      case 'btth':
        return {
          icon: <Flame className="w-10 h-10 text-amber-400 animate-pulse" />,
          gradient: 'from-amber-950 via-[#180d07] to-[#07090e]',
          accentGlow: 'rgba(245, 158, 11, 0.45)',
          badgeText: 'شعله‌های بهشتی'
        };
      case 'perfect-world':
        return {
          icon: <Zap className="w-10 h-10 text-yellow-300 animate-bounce" />,
          gradient: 'from-yellow-950 via-[#191506] to-[#07090e]',
          accentGlow: 'rgba(234, 179, 8, 0.45)',
          badgeText: 'کون‌پنگ طلایی'
        };
      case 'record-of-mortal':
        return {
          icon: <Mountain className="w-10 h-10 text-emerald-400" />,
          gradient: 'from-emerald-950 via-[#061812] to-[#07090e]',
          accentGlow: 'rgba(16, 185, 129, 0.45)',
          badgeText: 'تزکیه ناب'
        };
      case 'renegade-immortal':
        return {
          icon: <Sword className="w-10 h-10 text-purple-400" />,
          gradient: 'from-purple-950 via-[#150a1f] to-[#07090e]',
          accentGlow: 'rgba(168, 85, 247, 0.45)',
          badgeText: 'تائوی کشتار'
        };
      case 'swallowed-star':
        return {
          icon: <Sparkles className="w-10 h-10 text-cyan-400 animate-spin" />,
          gradient: 'from-cyan-950 via-[#071620] to-[#07090e]',
          accentGlow: 'rgba(6, 182, 212, 0.45)',
          badgeText: 'نبرد کهکشان'
        };
      case 'soul-land-2':
        return {
          icon: <Shield className="w-10 h-10 text-sky-400" />,
          gradient: 'from-sky-950 via-[#081827] to-[#07090e]',
          accentGlow: 'rgba(56, 189, 248, 0.45)',
          badgeText: 'فرقه تانگ'
        };
      case 'lord-of-mysteries':
        return {
          icon: <Moon className="w-10 h-10 text-amber-300" />,
          gradient: 'from-stone-900 via-[#1a1410] to-[#07090e]',
          accentGlow: 'rgba(217, 119, 6, 0.45)',
          badgeText: 'کانون تاروت'
        };
      default:
        return {
          icon: <Compass className="w-10 h-10 text-emerald-400" />,
          gradient: 'from-zinc-900 via-neutral-900 to-[#07090e]',
          accentGlow: 'rgba(16, 185, 129, 0.35)',
          badgeText: 'شاهکار برگزیده'
        };
    }
  };

  const motif = getThemeMotif();
  const imageUrl = variant === 'banner' && donghua.bannerUrl ? donghua.bannerUrl : donghua.posterUrl;

  if (variant === 'banner') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#07090e] ${className}`}>
        {/* Real Official Anime Banner / Poster */}
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={donghua.titleFa}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center filter brightness-75 contrast-110 scale-105 transition-transform duration-1000 group-hover:scale-100"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r ${motif.gradient}`} />
        )}

        {/* Cinematic Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/70 to-transparent pointer-events-none" />

        {/* Ethereal Atmospheric Radial Accent */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${motif.accentGlow} 0%, transparent 60%)`
          }}
        />

        {/* Top-left Quality & Studio Badge in Persian/English */}
        <div className="absolute top-6 left-6 flex items-center gap-2 select-none">
          <div className="px-3 py-1 rounded-md bg-emerald-600/90 text-white font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5" />
            <span>کیفیت ۴K ۶۰FPS</span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-zinc-300">
            {donghua.studio.split('/')[0]}
          </div>
        </div>
      </div>
    );
  }

  // Card or Poster mode
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0c1017] group select-none ${className}`}>
      {/* Real Official Anime Poster Image */}
      {donghua.posterUrl && !imageError ? (
        <img
          src={donghua.posterUrl}
          alt={donghua.titleFa}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-b ${motif.gradient} flex flex-col justify-between p-4`}>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 mx-auto my-auto">
            {motif.icon}
          </div>
          <div className="text-center font-bold text-sm text-white">
            {donghua.titleFa}
          </div>
        </div>
      )}

      {/* Measured Dark Overlay Scrim for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/30 to-black/30 pointer-events-none" />

      {/* Top Overlays: 4K Ultra badge and Episode counter */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between z-10 pointer-events-none">
        <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm shadow-sm">
          ۴K اولترا
        </div>

        <div className="text-[11px] font-bold px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-400 border border-amber-500/30">
          قسمت {donghua.episodesCurrent}
        </div>
      </div>

      {/* Bottom Subtitle Tag */}
      <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between text-[11px] text-zinc-300 font-medium drop-shadow-md">
        <span className="text-zinc-300 tracking-wide font-sans truncate max-w-[140px]">
          {donghua.titleEn}
        </span>
        <span className="text-amber-400 font-bold">★ {donghua.rating}</span>
      </div>
    </div>
  );
};
