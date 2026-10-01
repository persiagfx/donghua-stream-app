import React from 'react';
import { Search, Music, BookmarkCheck, Crown, ShieldAlert, LogIn, LogOut, Sparkles } from 'lucide-react';
import { UserSubscription, UserAccount } from '../types/donghua';
import { toPersianDigits } from '../utils/farsiDigits';

interface NavbarProps {
  activeTab: 'home' | 'schedule' | 'archive' | 'realms';
  setActiveTab: (tab: 'home' | 'schedule' | 'archive' | 'realms') => void;
  onOpenSearch: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  currentSubscription: UserSubscription | null;
  onOpenSubscription: () => void;
  onOpenAdmin: () => void;
  currentUser: UserAccount | null;
  onOpenAuth: (intentMsg?: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  favoritesCount,
  onOpenFavorites,
  isAudioPlaying,
  onToggleAudio,
  currentSubscription,
  onOpenSubscription,
  onOpenAdmin,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070c]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('home')}
            className="text-right focus:outline-none group flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-cyan-950">
              XR
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-black tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors leading-none">
                XIANREALM
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-tight">
                عالم دونگهوا
              </span>
            </div>
          </button>

          {/* Primary Navigation Links (Clean, Single Line) */}
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-semibold text-zinc-400">
            <button
              onClick={() => setActiveTab('home')}
              className={`cursor-pointer transition-colors hover:text-white py-1 ${
                activeTab === 'home' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              صفحه اصلی
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`cursor-pointer transition-colors hover:text-white py-1 ${
                activeTab === 'schedule' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              جدول پخش
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`cursor-pointer transition-colors hover:text-white py-1 ${
                activeTab === 'archive' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              آرشیو انیمه‌ها
            </button>
            <button
              onClick={() => setActiveTab('realms')}
              className={`cursor-pointer transition-colors hover:text-white py-1 ${
                activeTab === 'realms' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              قلمروها
            </button>
          </nav>
        </div>

        {/* User Actions Bar (Streamlined, No Clutter) */}
        <div className="flex items-center gap-2">
          {/* Admin Panel Access (Only for Admin role) */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl transition-all cursor-pointer shadow-sm shadow-amber-950"
              title="ورود به پنل مدیریت کل سامانه"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>پنل مدیریت</span>
            </button>
          )}

          {/* Subscription VIP Button */}
          {currentSubscription ? (
            <button
              onClick={onOpenSubscription}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-xl hover:bg-amber-500/25 transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{currentSubscription.planName}</span>
              <span className="sm:hidden">VIP</span>
            </button>
          ) : (
            <button
              onClick={onOpenSubscription}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>خرید اشتراک</span>
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            aria-label="جستجو"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Watchlist Bookmark */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            aria-label="نشان‌شده‌ها"
            title="انیمه‌های نشان‌شده"
          >
            <BookmarkCheck className="w-4 h-4 text-cyan-400" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-cyan-600 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {toPersianDigits(favoritesCount)}
              </span>
            )}
          </button>

          {/* Traditional Audio Toggle (Subtle) */}
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'توقف موسیقی' : 'پخش موسیقی سنتی'}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              isAudioPlaying
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-emerald-400 animate-pulse' : ''}`} />
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 mr-1">
              <div className={`w-7 h-7 rounded-lg ${currentUser.avatarBg || 'bg-cyan-600'} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-zinc-200 max-w-[85px] sm:max-w-[110px] truncate hidden sm:inline px-1">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                title="خروج از حساب"
                className="p-1 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-cyan-950 mr-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>ورود / ثبت‌نام</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Row only for small screens */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-white/5 bg-[#080b12] text-xs text-zinc-400">
        <button
          onClick={() => setActiveTab('home')}
          className={`py-1 ${activeTab === 'home' ? 'text-cyan-400 font-bold' : ''}`}
        >
          خانه
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`py-1 ${activeTab === 'schedule' ? 'text-cyan-400 font-bold' : ''}`}
        >
          جدول پخش
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`py-1 ${activeTab === 'archive' ? 'text-cyan-400 font-bold' : ''}`}
        >
          آرشیو
        </button>
        <button
          onClick={() => setActiveTab('realms')}
          className={`py-1 ${activeTab === 'realms' ? 'text-cyan-400 font-bold' : ''}`}
        >
          قلمروها
        </button>
      </div>
    </header>
  );
};
