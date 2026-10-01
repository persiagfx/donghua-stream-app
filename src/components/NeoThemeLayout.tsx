import React from 'react';
import { NeoHeroSlider } from './NeoHeroSlider';
import { NeoCarouselRow } from './NeoCarouselRow';
import { WeeklySchedule } from './WeeklySchedule';
import { Donghua } from '../types/donghua';
import { Flame, Sparkles, TrendingUp, Zap, Crown, ShieldAlert, Award, Compass } from 'lucide-react';

interface NeoThemeLayoutProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenSubscription: () => void;
  onNavigateToArchive: () => void;
  onNavigateToRealms: () => void;
}

export const NeoThemeLayout: React.FC<NeoThemeLayoutProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite,
  onOpenSubscription,
  onNavigateToArchive,
  onNavigateToRealms
}) => {
  // Categorized slices
  const trendingList = donghuaList.slice(0, 7);
  const cultivationList = donghuaList.filter((d) => d.genres.some((g) => g.includes('شیان‌شیا') || g.includes('تزکیه')));
  const sciFiAndMysteryList = donghuaList.filter((d) => d.genres.some((g) => g.includes('علمی') || g.includes('رازآلود') || g.includes('گیمینگ') || g.includes('ماوراء')));
  const newlyAdded = donghuaList.slice(7);

  return (
    <div className="space-y-10 pb-16 bg-[#06070b]">
      {/* 1. Ultra Modern Cinematic Hero Slider */}
      <NeoHeroSlider
        featuredList={trendingList.slice(0, 5)}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 2. Trending Row (Horizontal Continuous Carousel) */}
      <NeoCarouselRow
        title="پربازدیدترین انیمه‌های چینی در حال پخش"
        subtitle="عناوین پرمخاطب با کیفیت ۴K و دوبله همزمان اختصاصی"
        icon={<Flame className="w-5 h-5 text-amber-400" />}
        items={trendingList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 3. Neo VIP Membership Pass Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-[#0e1626] to-[#070912] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
          <div className="relative z-10 max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300">
              <Crown className="w-3.5 h-3.5 text-cyan-400" />
              <span>اشتراک ساعتی، روزانه و ماهانه با فعال‌سازی آنی</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              تماشای بدون وقفه تمامی انیمه‌ها با کیفیت اولترا اچ‌دی
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              با شروع از ۲۵,۰۰۰ تومان برای اشتراک ساعتی، یا خرید مستقیم و تکی هر قسمت با ۹,۰۰۰ تومان.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenSubscription}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-cyan-950 cursor-pointer whitespace-nowrap"
            >
              مشاهده تعرفه‌ها و خرید اشتراک
            </button>
          </div>
        </div>
      </section>

      {/* 4. Cultivation & Xianxia Blockbusters */}
      <NeoCarouselRow
        title="شاهکارهای جاودانه شیان‌شیا و تناسخ"
        subtitle="حماسه‌های نبرد آسمان‌ها، جهان بی‌نقص و مرتد فناناپذیر"
        icon={<Zap className="w-5 h-5 text-cyan-400" />}
        items={cultivationList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 5. Sci-Fi, Cyberpunk & Mystery */}
      <NeoCarouselRow
        title="عناوین علمی‌تخیلی، سایبرپانک و رازآلود"
        subtitle="از بلعیده شده در کهکشان تا ارباب اسرار و آواتار پادشاه"
        icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        items={sciFiAndMysteryList.length > 0 ? sciFiAndMysteryList : newlyAdded}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 6. Cultivation Pathway Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0d101a] to-black border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>دانشنامه مراحل تزکیه معنوی تائو</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              سطح قدرت قهرمانان انیمه در کدام قلمرو است؟
            </h4>
            <p className="text-xs text-zinc-400">
              آشنایی با ۸ قلمرو: تراکم چی، هسته طلایی، روح اولیه و صعود جاودانگی.
            </p>
          </div>

          <button
            onClick={onNavigateToRealms}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0"
          >
            مشاهده قلمروهای تزکیه
          </button>
        </div>
      </section>

      {/* 7. Weekly Broadcast Schedule */}
      <WeeklySchedule
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
