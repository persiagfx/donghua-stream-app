import React from 'react';
import { UltraBentoHero } from './UltraBentoHero';
import { LiveDanmakuTicker } from './LiveDanmakuTicker';
import { NeoCarouselRow } from './NeoCarouselRow';
import { TrendingLeaderboard } from './TrendingLeaderboard';
import { CharacterHallOfFame } from './CharacterHallOfFame';
import { WeeklySchedule } from './WeeklySchedule';
import { Donghua } from '../types/donghua';
import { Flame, Sparkles, Zap, Crown, Compass, Award } from 'lucide-react';

interface UltraModernLayoutProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenSubscription: () => void;
  onNavigateToArchive: () => void;
  onNavigateToRealms: () => void;
}

export const UltraModernLayout: React.FC<UltraModernLayoutProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite,
  onOpenSubscription,
  onNavigateToArchive,
  onNavigateToRealms
}) => {
  const trendingList = donghuaList.slice(0, 8);
  const cultivationList = donghuaList.filter((d) => d.genres.some((g) => g.includes('شیان‌شیا') || g.includes('تزکیه')));
  const sciFiList = donghuaList.filter((d) => d.genres.some((g) => g.includes('علمی') || g.includes('رازآلود') || g.includes('گیمینگ') || g.includes('ماوراء')));
  const allOther = donghuaList.slice(8);

  return (
    <div className="space-y-6 pb-16 bg-[#05070c]">
      {/* 1. Grand Split Bento Hero Stage (Tencent / Bilibili 2026 Style) */}
      <UltraBentoHero
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onOpenSubscription={onOpenSubscription}
      />

      {/* 2. Real-Time Danmaku Live Ticker Feed */}
      <LiveDanmakuTicker />

      {/* 3. Horizontal Continuous Carousels */}
      <NeoCarouselRow
        title="پربازدیدترین انیمه‌های فصلی در حال پخش"
        subtitle="بالاترین نرخ رضایت بینندگان و کیفیت استریم ۴K ۶۰ فریم"
        icon={<Flame className="w-5 h-5 text-amber-400" />}
        items={trendingList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 4. Top 10 Official Leaderboard (Ranking Chart) */}
      <TrendingLeaderboard
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
      />

      {/* 5. VIP Subscription Fast Activation Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#101422] to-[#070912] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
              <Crown className="w-3.5 h-3.5" />
              <span>پکیج‌های منعطف تماشا و خرید تکی قسمت‌ها</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              اشتراک ساعتی (۳ ساعته ۲۵ هزار ت) یا ماهانه طلایی
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              بدون نیاز به پرداخت هزینه‌های سنگین، می‌توانید تنها برای چند ساعت ماراتن فیلم یا خرید دائمی یک قسمت (۹ هزار ت) اقدام کنید.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenSubscription}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-amber-950 cursor-pointer whitespace-nowrap"
            >
              مشاهده پلن‌ها و خرید
            </button>
          </div>
        </div>
      </section>

      {/* 6. Cultivation Xianxia Blockbusters */}
      <NeoCarouselRow
        title="حماسه‌های جاودانه شیان‌شیا و تناسخ"
        subtitle="نبرد برای شکستن مرزهای فانی و رسیدن به جاودانگی حقیقی"
        icon={<Zap className="w-5 h-5 text-cyan-400" />}
        items={cultivationList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 7. Character Hall of Fame & Legends */}
      <CharacterHallOfFame
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
      />

      {/* 8. Sci-Fi, Cyberpunk & Fantasy Row */}
      <NeoCarouselRow
        title="انیمه‌های علمی‌تخیلی، سایبرپانک و جهان‌های موازی"
        subtitle="از نبردهای فضایی بلعیده شده در کهکشان تا مه خاکستری ارباب اسرار"
        icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        items={sciFiList.length > 0 ? sciFiList : allOther}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 9. Interactive Day-by-Day Broadcast Schedule */}
      <WeeklySchedule
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
