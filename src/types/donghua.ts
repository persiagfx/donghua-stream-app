export interface DanmakuItem {
  id: string;
  text: string;
  timeSec: number;
  color: string;
  type?: 'scroll' | 'top' | 'bottom';
  user: string;
}

export interface Character {
  nameFa: string;
  nameEn: string;
  role: string;
  cultivationRealm: string;
  spiritWeapon: string;
  faction: string;
  avatarBg: string;
  descriptionFa: string;
}

export interface Episode {
  number: number;
  titleFa: string;
  duration: string;
  airDate: string;
  thumbnailColor: string;
  isVip?: boolean;
  priceTomans?: number;
}

export interface OSTTrack {
  id: string;
  titleFa: string;
  artistFa: string;
  type: 'OP' | 'ED' | 'BGM';
  duration: string;
  scaleMode: 'guzheng' | 'flute' | 'battle' | 'celestial';
}

export interface Donghua {
  id: string;
  slug: string;
  titleFa: string;
  titleEn: string;
  studio: string;
  releaseYear: number;
  rating: number;
  viewsCount: string;
  episodesTotal: number;
  episodesCurrent: number;
  synopsisFa: string;
  synopsisEn: string;
  genres: string[];
  cultivationSystem: string;
  currentRealmFa: string;
  status: 'در حال پخش' | 'پایان یافته' | 'به زودی';
  broadcastDayFa: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنجشنبه' | 'جمعه';
  broadcastTime: string;
  posterUrl?: string;
  bannerUrl?: string;
  themeColor: string;
  accentGlow: string;
  taglineFa: string;
  isVipOnly?: boolean;
  characters: Character[];
  episodes: Episode[];
  danmakuList: DanmakuItem[];
  ostList: OSTTrack[];
}

export interface CultivationRealm {
  id: number;
  nameFa: string;
  nameEn: string;
  descriptionFa: string;
  tribulation: string;
  spiritualSpan: string;
  color: string;
}

export interface SubscriptionPlan {
  id: 'hourly-3' | 'daily-1' | 'daily-3' | 'monthly-1' | 'chapter-single';
  nameFa: string;
  durationLabel: string;
  durationHours: number;
  priceTomans: number;
  descriptionFa: string;
  features: string[];
  isPopular?: boolean;
}

export interface UserSubscription {
  planId: string;
  planName: string;
  expiresAt: number; // timestamp
  isActive: boolean;
}

export interface TransactionRecord {
  id: string;
  type: 'subscription' | 'chapter' | 'wallet';
  titleFa: string;
  amountTomans: number;
  date: string;
  status: 'موفق' | 'در انتظار' | 'ناموفق';
  trackingCode: string;
  userPhoneOrEmail?: string;
}

export type UserRole = 'user' | 'admin' | 'editor';

export interface UserAccount {
  id: string;
  name: string;
  mobileOrEmail: string;
  role: UserRole;
  avatarBg: string;
  createdAt: string;
  subscription?: UserSubscription | null;
  walletTomans?: number;
}
