import React from 'react';
import { HeroSlider } from './HeroSlider';
import { DonghuaCard } from './DonghuaCard';
import { WeeklySchedule } from './WeeklySchedule';
import { Donghua } from '../types/donghua';
import { TrendingUp, Sparkles, Crown, ChevronLeft } from 'lucide-react';

interface ClassicThemeLayoutProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenSubscription: () => void;
  onNavigateToArchive: () => void;
  onNavigateToRealms: () => void;
}

export const ClassicThemeLayout: React.FC<ClassicThemeLayoutProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite,
  onOpenSubscription,
  onNavigateToArchive,
  onNavigateToRealms
}) => {
  const featuredList = donghuaList.slice(0, 5);

  return (
    <div className="space-y-12 pb-16">
      {/* Cinematic Hero Spotlight Carousel */}
      <HeroSlider
        featuredList={featuredList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* Trending & Masterpieces Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>محبوب‌ترین انیمه‌های چینی در حال پخش</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              برترین‌های شیان‌شیا و اکشن رزمی
            </h2>
          </div>

          <button
            onClick={onNavigateToArchive}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <span>مشاهده آرشیو کامل ({donghuaList.length})</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Donghua Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donghuaList.slice(0, 8).map((item) => (
            <DonghuaCard
              key={item.id}
              donghua={item}
              onSelect={onSelectDonghua}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Subscription & VIP Promotion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#181a24] to-[#07090e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
              <Crown className="w-4 h-4" />
              <span>پکیج‌های منعطف اشتراک VIP (ساعتی، روزانه، ماهانه یا خرید تکی قسمت)</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              دسترسی فوری بدون محدودیت به تمامی کیفیت‌های ۴K و ۶۰ فریم
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              با اشتراک ساعتی (شروع از ۲۵,۰۰۰ تومان) فیلم‌های امشب را تماشا کنید، یا قسمت مورد نظر خود را با ۹,۰۰۰ تومان به صورت تکی بخرید.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenSubscription}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-950 cursor-pointer whitespace-nowrap"
            >
              مشاهده پلن‌ها و خرید اشتراک
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Broadcast Preview Section */}
      <WeeklySchedule
        donghuaList={donghuaList}
        onSelectDonghua={onSelectDonghua}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {/* Second Tier / More Animes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>عناوین فانتزی، تناسخ و اساطیری</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مجموعه انیمه‌های جدید اضافه شده
            </h2>
          </div>

          <button
            onClick={onNavigateToArchive}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donghuaList.slice(8).map((item) => (
            <DonghuaCard
              key={item.id}
              donghua={item}
              onSelect={onSelectDonghua}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
