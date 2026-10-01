import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UltraModernLayout } from './components/UltraModernLayout';
import { WeeklySchedule } from './components/WeeklySchedule';
import { CultivationRealmsView } from './components/CultivationRealmsView';
import { DonghuaArchive } from './components/DonghuaArchive';
import { DonghuaPlayerModal } from './components/DonghuaPlayerModal';
import { DonghuaDetailModal } from './components/DonghuaDetailModal';
import { SearchModal } from './components/SearchModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { INITIAL_DONGHUA_LIST, SUBSCRIPTION_PLANS } from './data/donghuaData';
import { Donghua, OSTTrack, UserSubscription, SubscriptionPlan, UserAccount } from './types/donghua';
import { xianAudio } from './utils/audioSynth';
import { toPersianDigits } from './utils/farsiDigits';
import { Flame, Sparkles, Zap, Award, Calendar, Crown, Compass, User, LogIn } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'archive' | 'realms'>('home');
  const [activePlayerDonghua, setActivePlayerDonghua] = useState<Donghua | null>(null);
  const [activeDetailDonghua, setActiveDetailDonghua] = useState<Donghua | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [pendingEpisode, setPendingEpisode] = useState<{ donghua: Donghua; episodeNumber: number } | null>(null);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('xian_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authIntentMessage, setAuthIntentMessage] = useState<string>('');

  // Donghua List state with bulletproof fallback and banner synchronization
  const [donghuaList, setDonghuaList] = useState<Donghua[]>(() => {
    try {
      const saved = localStorage.getItem('xian_donghua_list');
      if (!saved) return INITIAL_DONGHUA_LIST;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return INITIAL_DONGHUA_LIST;
      }
      // Ensure all 16 initial donghuas exist with their fresh metadata and banners
      const map = new Map<string, Donghua>();
      INITIAL_DONGHUA_LIST.forEach((d) => map.set(d.id, d));
      parsed.forEach((d: any) => {
        if (d && d.id) {
          const fresh = map.get(d.id);
          if (fresh) {
            map.set(d.id, {
              ...fresh,
              ...d,
              bannerUrl: fresh.bannerUrl,
              posterUrl: fresh.posterUrl,
              episodes: (d.episodes && d.episodes.length > 0) ? d.episodes : fresh.episodes,
              genres: fresh.genres || d.genres || []
            });
          } else {
            map.set(d.id, d);
          }
        }
      });
      const list = Array.from(map.values());
      return list.length > 0 ? list : INITIAL_DONGHUA_LIST;
    } catch {
      return INITIAL_DONGHUA_LIST;
    }
  });

  // User Subscription state persisted
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(() => {
    try {
      const saved = localStorage.getItem('xian_user_subscription');
      if (!saved) return null;
      const parsed: UserSubscription = JSON.parse(saved);
      if (parsed.expiresAt < Date.now()) return null;
      return parsed;
    } catch {
      return null;
    }
  });

  // User Individually Purchased Chapters / Episodes
  const [purchasedChapters, setPurchasedChapters] = useState<{ [donghuaId: string]: number[] }>(() => {
    try {
      const saved = localStorage.getItem('xian_purchased_chapters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xian_favorites');
      return saved ? JSON.parse(saved) : ['btth', 'record-of-mortal', 'renegade-immortal'];
    } catch {
      return ['btth', 'record-of-mortal', 'renegade-immortal'];
    }
  });

  // Background Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<OSTTrack | null>(null);

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem('xian_donghua_list', JSON.stringify(donghuaList));
    } catch {
      // Ignore
    }
  }, [donghuaList]);

  useEffect(() => {
    try {
      localStorage.setItem('xian_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (userSubscription) {
        localStorage.setItem('xian_user_subscription', JSON.stringify(userSubscription));
      } else {
        localStorage.removeItem('xian_user_subscription');
      }
    } catch {
      // Ignore
    }
  }, [userSubscription]);

  useEffect(() => {
    try {
      localStorage.setItem('xian_purchased_chapters', JSON.stringify(purchasedChapters));
    } catch {
      // Ignore
    }
  }, [purchasedChapters]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectDonghua = (donghua: Donghua, playNow: boolean = false) => {
    if (playNow) {
      setActivePlayerDonghua(donghua);
    } else {
      setActiveDetailDonghua(donghua);
    }
  };

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      xianAudio.stop();
      setIsAudioPlaying(false);
      setCurrentTrack(null);
    } else {
      xianAudio.playMelody('guzheng', 'ambient-guzheng');
      setIsAudioPlaying(true);
    }
  };

  const handlePlaySpecificTrack = (track: OSTTrack) => {
    if (currentTrack?.id === track.id && isAudioPlaying) {
      xianAudio.stop();
      setIsAudioPlaying(false);
      setCurrentTrack(null);
    } else {
      setCurrentTrack(track);
      xianAudio.playMelody(track.scaleMode, track.id);
      setIsAudioPlaying(true);
    }
  };

  const handleOpenAuth = (intentMsg?: string) => {
    setAuthIntentMessage(intentMsg || '');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    // If user was prompted because of subscription, reopen subscription modal
    if (authIntentMessage) {
      setIsSubscriptionOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('xian_active_user');
    } catch {
      // Ignore
    }
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
    const expiresAt = Date.now() + plan.durationHours * 3600 * 1000;
    const newSub: UserSubscription = {
      planId: plan.id,
      planName: plan.nameFa,
      expiresAt,
      isActive: true
    };
    setUserSubscription(newSub);
  };

  const handleBuyChapter = (donghuaId: string, episodeNumber: number) => {
    setPurchasedChapters((prev) => {
      const existing = prev[donghuaId] || [];
      if (existing.includes(episodeNumber)) return prev;
      return {
        ...prev,
        [donghuaId]: [...existing, episodeNumber]
      };
    });
  };

  const handleAddDonghua = (newD: Donghua) => {
    setDonghuaList((prev) => [newD, ...prev]);
  };

  const handleUpdateDonghua = (updatedD: Donghua) => {
    setDonghuaList((prev) =>
      prev.map((item) => (item.id === updatedD.id ? updatedD : item))
    );
    if (activePlayerDonghua?.id === updatedD.id) {
      setActivePlayerDonghua(updatedD);
    }
    if (activeDetailDonghua?.id === updatedD.id) {
      setActiveDetailDonghua(updatedD);
    }
  };

  const handleDeleteDonghua = (id: string) => {
    setDonghuaList((prev) => prev.filter((item) => item.id !== id));
  };

  const safeDonghuaList = (donghuaList && donghuaList.length > 0) ? donghuaList : INITIAL_DONGHUA_LIST;

  return (
    <div className="min-h-screen bg-[#05070c] text-[#f1f3f8] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        currentSubscription={userSubscription}
        onOpenSubscription={() => {
          setPendingEpisode(null);
          setIsSubscriptionOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main View Router - Flagship Ultra-Modern Layout as permanent theme */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <UltraModernLayout
            donghuaList={safeDonghuaList}
            onSelectDonghua={handleSelectDonghua}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenSubscription={() => {
              setPendingEpisode(null);
              setIsSubscriptionOpen(true);
            }}
            onNavigateToArchive={() => setActiveTab('archive')}
            onNavigateToRealms={() => setActiveTab('realms')}
          />
        )}

        {activeTab === 'schedule' && (
          <WeeklySchedule
            donghuaList={safeDonghuaList}
            onSelectDonghua={handleSelectDonghua}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'archive' && (
          <DonghuaArchive
            donghuaList={safeDonghuaList}
            onSelectDonghua={handleSelectDonghua}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'realms' && <CultivationRealmsView />}
      </main>

      {/* Persistent Audio Visualizer Bar */}
      <MusicPlayerBar
        currentTrack={currentTrack}
        isPlaying={isAudioPlaying}
        onTogglePlay={handleToggleAudio}
        onClose={() => {
          xianAudio.stop();
          setIsAudioPlaying(false);
          setCurrentTrack(null);
        }}
      />

      {/* Video & Danmaku Player Modal with VIP lock handling */}
      {activePlayerDonghua && (
        <DonghuaPlayerModal
          donghua={activePlayerDonghua}
          userSubscription={userSubscription}
          purchasedEpisodes={purchasedChapters[activePlayerDonghua.id] || []}
          onOpenSubscriptionModal={(pending) => {
            setPendingEpisode(pending || null);
            setIsSubscriptionOpen(true);
          }}
          onClose={() => setActivePlayerDonghua(null)}
        />
      )}

      {/* Donghua Lore & Detail Modal */}
      {activeDetailDonghua && (
        <DonghuaDetailModal
          donghua={activeDetailDonghua}
          onClose={() => setActiveDetailDonghua(null)}
          onPlay={(d) => {
            setActiveDetailDonghua(null);
            setActivePlayerDonghua(d);
          }}
          isFavorite={favorites.includes(activeDetailDonghua.id)}
          onToggleFavorite={toggleFavorite}
          playingTrackId={currentTrack?.id || null}
          onPlayTrack={handlePlaySpecificTrack}
          onOpenSubscription={() => {
            setPendingEpisode(null);
            setIsSubscriptionOpen(true);
          }}
        />
      )}

      {/* Subscription & Chapter Purchase Modal (Requires Login) */}
      {isSubscriptionOpen && (
        <SubscriptionModal
          currentSubscription={userSubscription}
          onSubscribe={handleSubscribe}
          onBuyChapter={handleBuyChapter}
          pendingEpisode={pendingEpisode}
          currentUser={currentUser}
          onRequireLogin={(msg) => {
            setIsSubscriptionOpen(false);
            handleOpenAuth(msg);
          }}
          onClose={() => {
            setIsSubscriptionOpen(false);
            setPendingEpisode(null);
          }}
        />
      )}

      {/* Authentication Modal (Sign Up & Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthIntentMessage('');
        }}
        onLoginSuccess={handleLoginSuccess}
        intentMessage={authIntentMessage}
      />

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanel
          donghuaList={donghuaList}
          onAddDonghua={handleAddDonghua}
          onUpdateDonghua={handleUpdateDonghua}
          onDeleteDonghua={handleDeleteDonghua}
          subscriptionPlans={SUBSCRIPTION_PLANS}
          currentUser={currentUser}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Search & Filter Modal */}
      {isSearchOpen && (
        <SearchModal
          donghuaList={donghuaList}
          onClose={() => setIsSearchOpen(false)}
          onSelect={handleSelectDonghua}
        />
      )}

      {/* Watchlist / Favorites Drawer */}
      {isFavoritesOpen && (
        <FavoritesDrawer
          favorites={favorites}
          donghuaList={donghuaList}
          onClose={() => setIsFavoritesOpen(false)}
          onSelect={handleSelectDonghua}
          onRemoveFavorite={toggleFavorite}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
