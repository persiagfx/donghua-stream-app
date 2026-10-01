import React, { useState } from 'react';
import { 
  X, Plus, Edit, Trash2, DollarSign, Users, Film, Layers, Check, 
  Search, ShieldAlert, BarChart3, Settings, TrendingUp, Clock, Crown, Zap, 
  ArrowRight, Calendar, AlertTriangle, Eye, Lock, Unlock, MessageSquare, 
  Server, ShieldCheck, RefreshCw, Filter, Sliders, Smartphone, Tag, 
  Download, FileSpreadsheet, Ban, CheckCircle2, AlertCircle, HardDrive, 
  Activity, Play, Radio, Cpu
} from 'lucide-react';
import { Donghua, Episode, SubscriptionPlan, TransactionRecord, UserAccount, UserRole } from '../types/donghua';
import { toPersianDigits, formatPriceTomans } from '../utils/farsiDigits';

interface AdminPanelProps {
  donghuaList: Donghua[];
  onAddDonghua: (donghua: Donghua) => void;
  onUpdateDonghua: (donghua: Donghua) => void;
  onDeleteDonghua: (id: string) => void;
  subscriptionPlans: SubscriptionPlan[];
  currentUser: UserAccount | null;
  onClose: () => void;
}

interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  expiresInDays: number;
  isActive: boolean;
}

interface ModeratedDanmaku {
  id: string;
  user: string;
  animeTitle: string;
  episodeNumber: number;
  text: string;
  time: string;
  status: 'approved' | 'pending' | 'flagged';
}

const INITIAL_USERS: UserAccount[] = [
  { id: 'usr-1', name: 'آرش کیهانی', mobileOrEmail: '09123456789', role: 'user', avatarBg: 'bg-cyan-600', createdAt: '۱۴۰۴/۰۱/۱۰', walletTomans: 45000, subscription: { planId: 'monthly-1', planName: 'اشتراک طلایی ۳۰ روزه', expiresAt: Date.now() + 25 * 86400000, isActive: true } },
  { id: 'usr-2', name: 'مهسا رستگار', mobileOrEmail: '09351112233', role: 'user', avatarBg: 'bg-purple-600', createdAt: '۱۴۰۴/۰۱/۱۵', walletTomans: 18000, subscription: { planId: 'hourly-3', planName: 'اشتراک ۳ ساعته', expiresAt: Date.now() + 2 * 3600000, isActive: true } },
  { id: 'usr-3', name: 'مدیر ارشد شیان‌ریلم', mobileOrEmail: 'admin@xianrealm.com', role: 'admin', avatarBg: 'bg-amber-600', createdAt: '۱۴۰۳/۱۱/۰۱', walletTomans: 1500000 },
  { id: 'usr-4', name: 'سهراب دانایی (ویراستار)', mobileOrEmail: 'editor@xianrealm.com', role: 'editor', avatarBg: 'bg-emerald-600', createdAt: '۱۴۰۴/۰۱/۰۲', walletTomans: 250000 },
  { id: 'usr-5', name: 'فرزاد ستوده', mobileOrEmail: '09198887766', role: 'user', avatarBg: 'bg-blue-600', createdAt: '۱۴۰۴/۰۱/۱۷', walletTomans: 0, subscription: null },
  { id: 'usr-6', name: 'نگین کریمی', mobileOrEmail: '09302224455', role: 'user', avatarBg: 'bg-pink-600', createdAt: '۱۴۰۴/۰۱/۱۶', walletTomans: 9000, subscription: { planId: 'daily-1', planName: 'اشتراک روزانه', expiresAt: Date.now() + 18 * 3600000, isActive: true } }
];

const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  { id: 'tx-1', type: 'subscription', titleFa: 'اشتراک ۳۰ روزه طلایی (نامحدود)', amountTomans: 195000, date: '۱۴۰۴/۰۱/۱۸ - ۱۲:۳۴', status: 'موفق', trackingCode: 'TRX-84729103', userPhoneOrEmail: '09123456789' },
  { id: 'tx-2', type: 'chapter', titleFa: 'خرید تکی قسمت ۱۴۲ نبرد از طریق آسمان‌ها', amountTomans: 9000, date: '۱۴۰۴/۰۱/۱۸ - ۱۱:۲۰', status: 'موفق', trackingCode: 'TRX-49102847', userPhoneOrEmail: '09351112233' },
  { id: 'tx-3', type: 'subscription', titleFa: 'اشتراک ماراتن ۳ ساعته', amountTomans: 25000, date: '۱۴۰۴/۰۱/۱۷ - ۲۲:۴۵', status: 'موفق', trackingCode: 'TRX-10294857', userPhoneOrEmail: '09197778899' },
  { id: 'tx-4', type: 'subscription', titleFa: 'اشتراک روزانه ۲۴ ساعته', amountTomans: 45000, date: '۱۴۰۴/۰۱/۱۷ - ۱۸:۱۰', status: 'موفق', trackingCode: 'TRX-93847162', userPhoneOrEmail: '09015554433' },
  { id: 'tx-5', type: 'subscription', titleFa: 'اشتراک طلایی ۳۰ روزه VIP', amountTomans: 195000, date: '۱۴۰۴/۰۱/۱۶ - ۱۴:۲۲', status: 'موفق', trackingCode: 'TRX-66192834', userPhoneOrEmail: '09302224455' }
];

const INITIAL_COUPONS: Coupon[] = [
  { id: 'cp-1', code: 'NOWRUZ50', discountPercent: 50, maxUses: 500, usedCount: 312, expiresInDays: 14, isActive: true },
  { id: 'cp-2', code: 'XIANVIP', discountPercent: 30, maxUses: 200, usedCount: 84, expiresInDays: 30, isActive: true },
  { id: 'cp-3', code: 'ANIMEFAN', discountPercent: 20, maxUses: 1000, usedCount: 654, expiresInDays: 5, isActive: false }
];

const INITIAL_DANMAKU_QUEUE: ModeratedDanmaku[] = [
  { id: 'dm-1', user: 'تزکیه‌کننده_آسمان', animeTitle: 'نبرد از طریق آسمان‌ها', episodeNumber: 142, text: 'شعله خشم بودا واقعاً تو این قسمت دیوانه‌کننده بازطراحی شده بود!', time: '۲ دقیقه پیش', status: 'approved' },
  { id: 'dm-2', user: 'اسطوره_تائو', animeTitle: 'جهان بی‌نقص', episodeNumber: 184, text: 'این انیمه بهترین انیمه تاریخ چین هست و خواهد بود', time: '۵ دقیقه پیش', status: 'approved' },
  { id: 'dm-3', user: 'کاربر_مهمان', animeTitle: 'سرگذشت جاودانگی', episodeNumber: 108, text: 'اسپویل: قسمت بعد فلانی از فرقه فرار میکنه', time: '۸ دقیقه پیش', status: 'flagged' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  donghuaList,
  onAddDonghua,
  onUpdateDonghua,
  onDeleteDonghua,
  subscriptionPlans,
  currentUser,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'donghuas' | 'episodes' | 'users' | 'finance' | 'coupons' | 'danmaku' | 'system'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'vip' | 'admin'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Donghua CRUD state
  const [editingDonghua, setEditingDonghua] = useState<Donghua | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Selected donghua for episode manager
  const [selectedDonghuaForEpisodes, setSelectedDonghuaForEpisodes] = useState<Donghua>(donghuaList[0]);

  // Dynamic Data States
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [danmakuQueue, setDanmakuQueue] = useState<ModeratedDanmaku[]>(INITIAL_DANMAKU_QUEUE);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(25);
  const [newCouponUses, setNewCouponUses] = useState(100);

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'XianRealm - پایگاه رسمی انیمه چینی',
    halfPriceCdn: true,
    maintenanceMode: false,
    vipStrict4K: true,
    autoTranscodeHls: true,
    danmakuAntiSpam: true,
    edgeCacheTtlHours: 72
  });

  // Form data for adding/editing donghua
  const [formData, setFormData] = useState<Partial<Donghua>>({
    titleFa: '',
    titleEn: '',
    studio: 'Sparkly Key Animation',
    releaseYear: 2024,
    rating: 9.8,
    viewsCount: '۱.۲ میلیارد',
    episodesTotal: 52,
    episodesCurrent: 12,
    synopsisFa: '',
    synopsisEn: '',
    genres: ['شیان‌شیا', 'اکشن'],
    cultivationSystem: 'تزکیه معنوی تائو',
    currentRealmFa: 'قلمرو هسته طلایی',
    status: 'در حال پخش',
    broadcastDayFa: 'یکشنبه',
    broadcastTime: 'هر یکشنبه ساعت ۱۰:۰۰',
    posterUrl: '',
    bannerUrl: '',
    taglineFa: '',
    episodes: [
      { number: 1, titleFa: 'آغاز سرنوشت و بیداری روح معنوی', duration: '۲۴:۰۰', airDate: 'تازه‌ترین', thumbnailColor: '#0e7490', isVip: false },
      { number: 2, titleFa: 'رویارویی با دشمنان فرقه در دره تاریک', duration: '۲۳:۴۵', airDate: 'تازه‌ترین', thumbnailColor: '#0891b2', isVip: true, priceTomans: 9000 }
    ],
    characters: [],
    danmakuList: [],
    ostList: []
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEditDonghua = (d: Donghua) => {
    setEditingDonghua(d);
    setFormData(d);
    setIsAddingNew(false);
  };

  const handleSaveDonghua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleFa || !formData.titleEn) return;

    if (editingDonghua) {
      const updated: Donghua = {
        ...editingDonghua,
        ...(formData as Donghua)
      };
      onUpdateDonghua(updated);
      setEditingDonghua(null);
      showToast(`انیمه «${updated.titleFa}» با موفقیت بروزرسانی شد.`);
    } else {
      const newD: Donghua = {
        ...(formData as Donghua),
        id: `donghua-${Date.now()}`,
        slug: formData.titleEn?.toLowerCase().replace(/\s+/g, '-') || `donghua-${Date.now()}`,
        episodes: formData.episodes || [],
        characters: formData.characters || [],
        danmakuList: [],
        ostList: []
      };
      onAddDonghua(newD);
      setIsAddingNew(false);
      showToast(`انیمه جدید «${newD.titleFa}» با موفقیت افزوده شد.`);
    }
  };

  // Toggle episode VIP status
  const handleToggleEpisodeVip = (epNumber: number) => {
    if (!selectedDonghuaForEpisodes) return;
    const updatedEpisodes = selectedDonghuaForEpisodes.episodes.map((ep) =>
      ep.number === epNumber ? { ...ep, isVip: !ep.isVip, priceTomans: !ep.isVip ? 9000 : 0 } : ep
    );
    const updatedDonghua: Donghua = {
      ...selectedDonghuaForEpisodes,
      episodes: updatedEpisodes
    };
    setSelectedDonghuaForEpisodes(updatedDonghua);
    onUpdateDonghua(updatedDonghua);
    showToast(`وضعیت قسمت ${toPersianDigits(epNumber)} تغییر یافت.`);
  };

  // User role change
  const handleChangeUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    showToast(`نقش کاربری به ${newRole === 'admin' ? 'مدیر کل' : newRole === 'editor' ? 'ویراستار' : 'کاربر عادی'} تغییر کرد.`);
  };

  // Grant VIP to user
  const handleGrantUserVip = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            subscription: {
              planId: 'monthly-1',
              planName: 'اشتراک طلایی (هدیه ادمین)',
              expiresAt: Date.now() + 30 * 86400000,
              isActive: true
            }
          };
        }
        return u;
      })
    );
    showToast('اشتراک طلایی ۳۰ روزه با موفقیت به کاربر هدیه شد.');
  };

  // Add new coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newCp: Coupon = {
      id: `cp-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: newCouponPercent,
      maxUses: newCouponUses,
      usedCount: 0,
      expiresInDays: 30,
      isActive: true
    };
    setCoupons([newCp, ...coupons]);
    setNewCouponCode('');
    showToast(`کد تخفیف ${newCp.code} ایجاد شد.`);
  };

  const handleToggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleDeleteDanmaku = (id: string) => {
    setDanmakuQueue((prev) => prev.filter((d) => d.id !== id));
    showToast('نظر نامناسب حذف شد.');
  };

  const handleApproveDanmaku = (id: string) => {
    setDanmakuQueue((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'approved' } : d))
    );
    showToast('نظر با موفقیت تایید شد.');
  };

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amountTomans, 0);

  const filteredDonghuas = donghuaList.filter(
    (d) =>
      d.titleFa.includes(searchTerm) ||
      d.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.studio.includes(searchTerm)
  );

  const filteredUsers = users.filter((u) => {
    if (userFilter === 'vip') return u.subscription?.isActive;
    if (userFilter === 'admin') return u.role === 'admin' || u.role === 'editor';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#06080e] flex flex-col overflow-hidden text-zinc-200 font-sans selection:bg-amber-500/30 selection:text-amber-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Command Bar */}
      <header className="h-16 px-6 bg-[#090d16] border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-black flex items-center justify-center font-black text-xs shadow-lg shadow-amber-950">
              CMS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wide">
                  XIANREALM STUDIO CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 font-mono">
                  v3.2 PRO
                </span>
              </div>
              <span className="text-[10px] text-zinc-400">
                سامانه جامع مدیریت و توزیع محتوای ویدیویی ۴K
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-4 mr-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-300 font-semibold">سرورهای لبه: ۲۴ms (پایدار)</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>پردازش HLS: نرمال</span>
            </div>
          </div>
        </div>

        {/* User badge and close button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5 text-xs">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-[11px]">
              م
            </div>
            <div className="text-right">
              <div className="text-white font-bold leading-tight">مدیر ارشد سامانه</div>
              <div className="text-[10px] text-emerald-400">دسترسی SuperAdmin</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>خروج از پنل</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Sidebar Navigation + Right Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-60 bg-[#070b13] border-l border-white/5 flex flex-col justify-between shrink-0 p-3 overflow-y-auto">
          <div className="space-y-6">
            {/* Section 1: Analytics */}
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                مرکز آمار و تحلیل
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('analytics'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>داشبورد و نمودار فروش</span>
                </button>
              </div>
            </div>

            {/* Section 2: Media Management */}
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                مدیریت کاتالوگ و رسانه
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('donghuas'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'donghuas'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 shrink-0" />
                    <span>کاتالوگ انیمه‌ها</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'donghuas' ? 'bg-black/30 text-black' : 'bg-white/10 text-zinc-300'}`}>
                    {toPersianDigits(donghuaList.length)}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('episodes'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'episodes'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>قسمت‌ها و قفل VIP</span>
                </button>

                <button
                  onClick={() => { setActiveTab('danmaku'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'danmaku'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>پایش نظرات دانماکو</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'danmaku' ? 'bg-black/30 text-black' : 'bg-cyan-500/20 text-cyan-300'}`}>
                    {toPersianDigits(danmakuQueue.length)}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 3: Finance & Monetization */}
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                امور مالی و فروش
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('finance'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'finance'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>تراکنش‌های بانکی شاپرک</span>
                </button>

                <button
                  onClick={() => { setActiveTab('coupons'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'coupons'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tag className="w-4 h-4 shrink-0" />
                  <span>کدهای تخفیف و بن‌ها</span>
                </button>
              </div>
            </div>

            {/* Section 4: Users and CRM */}
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                کاربران و دسترسی‌ها
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('users'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'users'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>لیست کاربران و نقش‌ها</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'users' ? 'bg-black/30 text-black' : 'bg-white/10 text-zinc-300'}`}>
                    {toPersianDigits(users.length)}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 5: Infrastructure */}
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                تنظیمات زیرساخت
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('system'); setIsAddingNew(false); setEditingDonghua(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'system'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Server className="w-4 h-4 shrink-0" />
                  <span>پیکربندی CDN و سرور</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick System Metric at Sidebar Bottom */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] space-y-1.5 mt-4">
            <div className="flex justify-between text-zinc-400">
              <span>فضای ذخیره‌سازی ویدیو:</span>
              <span className="font-mono text-cyan-400 font-bold">{toPersianDigits('6.4')} / ۱۰ TB</span>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[64%]" />
            </div>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#06080e]">
          {/* TAB 1: ANALYTICS & DASHBOARD */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Stat Cards Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#090d16] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>درآمد کل پلتفرم:</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white">
                    {formatPriceTomans(totalRevenue)} <span className="text-xs font-normal text-zinc-400 font-sans">تومان</span>
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{toPersianDigits(24)}٪ رشد نسبت به هفته پیش</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>مشترکین فعال VIP:</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Crown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white">
                    {toPersianDigits(users.filter((u) => u.subscription?.isActive).length * 1280)} <span className="text-xs font-normal text-zinc-400">کاربر</span>
                  </div>
                  <div className="text-xs text-amber-400 font-medium">
                    {toPersianDigits(88)}٪ نرخ تمدید خودکار
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>بینندگان همزمان (Concurrent):</span>
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Radio className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-cyan-400">
                    {toPersianDigits('48,120')} <span className="text-xs font-normal text-zinc-400">نفر آنلاین</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    پیک ترافیک: ساعت ۲۲:۳۰
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>سلامت کشینگ CDN:</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-purple-300">
                    {toPersianDigits('96.4')}٪ <span className="text-xs font-normal text-zinc-400">Hit Rate</span>
                  </div>
                  <div className="text-xs text-emerald-400">
                    ترافیک نیم‌بهاء داخلی فعال
                  </div>
                </div>
              </div>

              {/* Visual SVG Financial Chart */}
              <div className="p-6 rounded-3xl bg-[#090d16] border border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>روند فروش و گردش مالی ۷ روز گذشته</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      تفکیک خرید اشتراک ماهانه، روزانه و خریدهای تکی هر قسمت
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      میانگین روزانه: {formatPriceTomans(340000)} تومان
                    </span>
                  </div>
                </div>

                {/* Simulated SVG Graph */}
                <div className="h-44 w-full relative flex items-end justify-between pt-6 px-4">
                  {[
                    { day: 'شنبه', amount: 180000, height: '40%' },
                    { day: 'یکشنبه', amount: 320000, height: '70%' },
                    { day: 'دوشنبه', amount: 240000, height: '55%' },
                    { day: 'سه‌شنبه', amount: 290000, height: '65%' },
                    { day: 'چهارشنبه', amount: 310000, height: '68%' },
                    { day: 'پنجشنبه', amount: 480000, height: '95%' },
                    { day: 'جمعه', amount: 420000, height: '88%' }
                  ].map((col, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {formatPriceTomans(col.amount)}
                      </div>
                      <div
                        className="w-8 sm:w-12 rounded-t-xl bg-gradient-to-t from-cyan-600/40 via-cyan-500 to-amber-400 transition-all duration-300 group-hover:brightness-125"
                        style={{ height: col.height }}
                      />
                      <div className="text-xs font-semibold text-zinc-400 pt-1">
                        {col.day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders and System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="p-5 rounded-3xl bg-[#090d16] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>تراکنش‌های اخیر شاپرک</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('finance')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                      مشاهده همه ({toPersianDigits(transactions.length)})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {transactions.slice(0, 4).map((tx) => (
                      <div
                        key={tx.id}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white">{tx.titleFa}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{toPersianDigits(tx.date)}</div>
                        </div>
                        <div className="text-left">
                          <div className="font-extrabold text-emerald-400 font-mono">
                            +{formatPriceTomans(tx.amountTomans)} ت
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">{tx.trackingCode}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live CDN Server Health */}
                <div className="p-5 rounded-3xl bg-[#090d16] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Server className="w-4 h-4 text-cyan-400" />
                      <span>وضعیت زنده خوشه‌های استریم و سرورها</span>
                    </h3>
                    <span className="text-xs text-emerald-400 font-bold">تمام سرورها فعال</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-zinc-300 mb-1">
                        <span>خوشه لبه تهران (آسیاتک برج میلاد - ۴K):</span>
                        <span className="text-emerald-400 font-bold">۲۴٪ بارگذاری</span>
                      </div>
                      <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[24%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-300 mb-1">
                        <span>خوشه لبه تبریز (ابرآروان شمال غرب):</span>
                        <span className="text-emerald-400 font-bold">۳۸٪ بارگذاری</span>
                      </div>
                      <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[38%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-300 mb-1">
                        <span>خوشه ترنسکود زنده و تولید قطعات HLS:</span>
                        <span className="text-amber-400 font-bold">۵۲٪ توان GPU</span>
                      </div>
                      <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[52%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANIME CATALOG (CRUD) */}
          {activeTab === 'donghuas' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {!isAddingNew && !editingDonghua && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="جستجوی عنوان فارسی یا انگلیسی..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#090d16] border border-white/10 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingNew(true);
                      setEditingDonghua(null);
                      setFormData({
                        titleFa: '',
                        titleEn: '',
                        studio: 'Sparkly Key Animation',
                        releaseYear: 2024,
                        rating: 9.8,
                        viewsCount: '۱.۰ میلیارد',
                        episodesTotal: 52,
                        episodesCurrent: 1,
                        synopsisFa: '',
                        synopsisEn: '',
                        genres: ['شیان‌شیا', 'اکشن'],
                        cultivationSystem: 'تزکیه معنوی تائو',
                        currentRealmFa: 'قلمرو بیداری روح',
                        status: 'در حال پخش',
                        broadcastDayFa: 'شنبه',
                        broadcastTime: 'هر شنبه ساعت ۱۰:۰۰',
                        posterUrl: '',
                        bannerUrl: '',
                        taglineFa: '',
                        episodes: [
                          { number: 1, titleFa: 'قسمت اول', duration: '۲۴:۰۰', airDate: 'تازه‌ترین', thumbnailColor: '#0e7490', isVip: false }
                        ],
                        characters: [],
                        danmakuList: [],
                        ostList: []
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-950/40"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ثبت انیمه جدید در کاتالوگ</span>
                  </button>
                </div>
              )}

              {/* Add / Edit Form */}
              {(isAddingNew || editingDonghua) ? (
                <form onSubmit={handleSaveDonghua} className="p-6 rounded-3xl bg-[#090d16] border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <h3 className="text-sm font-bold text-amber-300">
                      {editingDonghua ? `ویرایش مشخصات: ${editingDonghua.titleFa}` : 'افزودن انیمه جدید به دیتابیس پایگاه'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => { setIsAddingNew(false); setEditingDonghua(null); }}
                      className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                    >
                      انصراف
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">عنوان فارسی انیمه:</label>
                      <input
                        type="text"
                        required
                        value={formData.titleFa || ''}
                        onChange={(e) => setFormData({ ...formData, titleFa: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="نبرد از طریق آسمان‌ها"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">عنوان انگلیسی / پینیین رسمی:</label>
                      <input
                        type="text"
                        required
                        value={formData.titleEn || ''}
                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="Battle Through the Heavens"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">استودیو سازنده انیمیشن:</label>
                      <input
                        type="text"
                        value={formData.studio || ''}
                        onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">قلمرو فعلی قهرمان:</label>
                      <input
                        type="text"
                        value={formData.currentRealmFa || ''}
                        onChange={(e) => setFormData({ ...formData, currentRealmFa: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="قلمرو هسته طلایی / Dou Zong"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">تعداد قسمت‌های در دسترس:</label>
                      <input
                        type="number"
                        value={formData.episodesCurrent || 1}
                        onChange={(e) => setFormData({ ...formData, episodesCurrent: parseInt(e.target.value, 10) || 1 })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">روز پخش هفتگی:</label>
                      <select
                        value={formData.broadcastDayFa || 'یکشنبه'}
                        onChange={(e) => setFormData({ ...formData, broadcastDayFa: e.target.value as any })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((d) => (
                          <option key={d} value={d} className="bg-black text-white">{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-zinc-300 mb-1">آدرس پوستر ویدیویی (URL):</label>
                      <input
                        type="url"
                        value={formData.posterUrl || ''}
                        onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-zinc-300 mb-1">خلاصه داستان کامل:</label>
                      <textarea
                        rows={3}
                        value={formData.synopsisFa || ''}
                        onChange={(e) => setFormData({ ...formData, synopsisFa: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="داستان تزکیه و نبردهای قهرمان..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {editingDonghua ? 'بروزرسانی مشخصات انیمه' : 'ذخیره نهایی در پایگاه'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAddingNew(false); setEditingDonghua(null); }}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              ) : (
                /* Donghua Table */
                <div className="rounded-3xl border border-white/5 bg-[#090d16] overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5 text-zinc-400">
                        <th className="p-3.5">عنوان اثر</th>
                        <th className="p-3.5 hidden sm:table-cell">استودیو</th>
                        <th className="p-3.5">قسمت‌ها</th>
                        <th className="p-3.5 hidden md:table-cell">قلمرو قدرت</th>
                        <th className="p-3.5">روز انتشار</th>
                        <th className="p-3.5 text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredDonghuas.map((d) => (
                        <tr key={d.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              {d.posterUrl && (
                                <img
                                  src={d.posterUrl}
                                  alt={d.titleFa}
                                  referrerPolicy="no-referrer"
                                  className="w-8 h-11 rounded-lg object-cover bg-black shrink-0"
                                />
                              )}
                              <div>
                                <div className="font-bold text-white">{d.titleFa}</div>
                                <div className="text-[10px] text-zinc-500 font-sans">{d.titleEn}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-zinc-300 hidden sm:table-cell">
                            {d.studio.split('/')[0]}
                          </td>
                          <td className="p-3.5 text-cyan-400 font-bold font-mono">
                            {toPersianDigits(d.episodesCurrent)} / {toPersianDigits(d.episodesTotal)}
                          </td>
                          <td className="p-3.5 text-zinc-300 hidden md:table-cell">
                            {d.currentRealmFa}
                          </td>
                          <td className="p-3.5 text-zinc-400">
                            {d.broadcastDayFa}
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditDonghua(d)}
                                className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 cursor-pointer transition-colors"
                                title="ویرایش اثر"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`آیا از حذف انیمه «${d.titleFa}» اطمینان دارید؟`)) {
                                    onDeleteDonghua(d.id);
                                    showToast(`انیمه «${d.titleFa}» حذف شد.`);
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 cursor-pointer transition-colors"
                                title="حذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EPISODES & VIP PAYWALL LOCK */}
          {activeTab === 'episodes' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#090d16] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">انتخاب انیمه جهت مدیریت قفل VIP و تگ‌های قیمتی:</div>
                    <div className="text-[11px] text-zinc-400">امکان رایگان‌سازی یا قفل‌گذاری VIP برای هر قسمت به صورت مستقل</div>
                  </div>
                </div>

                <select
                  value={selectedDonghuaForEpisodes.id}
                  onChange={(e) => {
                    const found = donghuaList.find((d) => d.id === e.target.value);
                    if (found) setSelectedDonghuaForEpisodes(found);
                  }}
                  className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {donghuaList.map((d) => (
                    <option key={d.id} value={d.id} className="bg-black text-white">
                      {d.titleFa} ({toPersianDigits(d.episodes.length)} قسمت)
                    </option>
                  ))}
                </select>
              </div>

              {/* Episodes Grid with Instant Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {selectedDonghuaForEpisodes.episodes.map((ep) => (
                  <div
                    key={ep.number}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      ep.isVip
                        ? 'bg-amber-950/25 border-amber-500/30 shadow-md shadow-amber-950/20'
                        : 'bg-[#090d16] border-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-extrabold text-sm text-white">
                          قسمت {toPersianDigits(ep.number)}
                        </span>
                        {ep.isVip ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center gap-1 border border-amber-500/30">
                            <Lock className="w-2.5 h-2.5" />
                            <span>مخصوص VIP</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30">
                            <Unlock className="w-2.5 h-2.5" />
                            <span>رایگان</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-zinc-300 truncate">
                        {ep.titleFa}
                      </div>

                      <div className="text-[11px] text-zinc-500 font-mono mt-1">
                        مدت: {toPersianDigits(ep.duration)} · قیمت تکی: {ep.isVip ? `${toPersianDigits('9,000')} ت` : 'رایگان'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleEpisodeVip(ep.number)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        ep.isVip
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-black'
                      }`}
                    >
                      {ep.isVip ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>تغییر به رایگان</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>فعال‌سازی قفل VIP</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USERS & RBAC ROLES */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#090d16] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">مدیریت اعضا، احراز هویت و رتبه‌های کاربری (RBAC):</div>
                    <div className="text-[11px] text-zinc-400">تعیین دسترسی ادمین، ارتقای نقش و شارژ هدیه</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserFilter('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      userFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    همه ({toPersianDigits(users.length)})
                  </button>
                  <button
                    onClick={() => setUserFilter('vip')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      userFilter === 'vip' ? 'bg-amber-500 text-black' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    مشترکین VIP
                  </button>
                  <button
                    onClick={() => setUserFilter('admin')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      userFilter === 'admin' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    تیم مدیریت
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-3xl border border-white/5 bg-[#090d16] overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-zinc-400">
                      <th className="p-3.5">کاربر</th>
                      <th className="p-3.5">شماره موبایل / ایمیل</th>
                      <th className="p-3.5">سطح دسترسی (نقش)</th>
                      <th className="p-3.5">وضعیت اشتراک</th>
                      <th className="p-3.5">کیف پول</th>
                      <th className="p-3.5 text-center">اقدامات مدیریتی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl ${u.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white">{u.name}</div>
                              <div className="text-[10px] text-zinc-500 font-mono">عضویت: {u.createdAt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-zinc-300 font-mono" dir="ltr">
                          {toPersianDigits(u.mobileOrEmail)}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={u.role}
                            onChange={(e) => handleChangeUserRole(u.id, e.target.value as UserRole)}
                            className="bg-black/60 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="user" className="bg-black text-white">کاربر عادی</option>
                            <option value="editor" className="bg-black text-white">ویراستار محتوا</option>
                            <option value="admin" className="bg-black text-white">مدیر کل (Admin)</option>
                          </select>
                        </td>
                        <td className="p-3.5">
                          {u.subscription?.isActive ? (
                            <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-300 text-[11px] font-bold border border-amber-500/30 flex items-center gap-1 w-fit">
                              <Crown className="w-3 h-3 text-amber-400" />
                              <span>{u.subscription.planName}</span>
                            </span>
                          ) : (
                            <span className="text-zinc-500 text-[11px]">عادی (بدون بسته)</span>
                          )}
                        </td>
                        <td className="p-3.5 text-emerald-400 font-bold font-mono">
                          {formatPriceTomans(u.walletTomans || 0)} ت
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleGrantUserVip(u.id)}
                              className="px-3 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              اعطای اشتراک هدیه
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCE & SHAPARAK TRANSACTIONS */}
          {activeTab === 'finance' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl bg-[#090d16] border border-white/5 space-y-1">
                  <div className="text-xs text-zinc-400">مجموع تراکنش‌های شاپرک:</div>
                  <div className="text-2xl font-black text-white">{formatPriceTomans(totalRevenue)} تومان</div>
                </div>
                <div className="p-5 rounded-3xl bg-[#090d16] border border-white/5 space-y-1">
                  <div className="text-xs text-zinc-400">تراکنش‌های تایید شده:</div>
                  <div className="text-2xl font-black text-emerald-400">{toPersianDigits(transactions.length)} سفارش</div>
                </div>
                <div className="p-5 rounded-3xl bg-[#090d16] border border-white/5 space-y-1">
                  <div className="text-xs text-zinc-400">میانگین ارزش هر خرید:</div>
                  <div className="text-2xl font-black text-cyan-400">
                    {formatPriceTomans(Math.round(totalRevenue / (transactions.length || 1)))} تومان
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="rounded-3xl border border-white/5 bg-[#090d16] overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-zinc-400">
                      <th className="p-3.5">کد رهگیری تراکنش</th>
                      <th className="p-3.5">شرح سفارش / محصول</th>
                      <th className="p-3.5">کاربر خریدار</th>
                      <th className="p-3.5">مبلغ پرداختی</th>
                      <th className="p-3.5">تاریخ ثبت</th>
                      <th className="p-3.5">وضعیت شاپرک</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono text-cyan-400 font-bold">
                          {t.trackingCode}
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {t.titleFa}
                        </td>
                        <td className="p-3.5 text-zinc-300 font-mono" dir="ltr">
                          {toPersianDigits(t.userPhoneOrEmail)}
                        </td>
                        <td className="p-3.5 text-emerald-400 font-extrabold font-mono">
                          {formatPriceTomans(t.amountTomans)} تومان
                        </td>
                        <td className="p-3.5 text-zinc-400 font-mono text-[11px]">
                          {toPersianDigits(t.date)}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: COUPONS & DISCOUNT VOUCHERS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Generator Form */}
              <form onSubmit={handleCreateCoupon} className="p-5 rounded-3xl bg-[#090d16] border border-white/5 flex flex-col sm:flex-row items-end gap-3">
                <div className="flex-1 w-full">
                  <label className="block text-xs text-zinc-300 mb-1">کد کوپن جدید (انگلیسی):</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="مثال: SPRING2026"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 uppercase font-mono"
                  />
                </div>

                <div className="w-full sm:w-36">
                  <label className="block text-xs text-zinc-300 mb-1">درصد تخفیف:</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(parseInt(e.target.value, 10) || 10)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="w-full sm:w-36">
                  <label className="block text-xs text-zinc-300 mb-1">تعداد مجاز استفاده:</label>
                  <input
                    type="number"
                    value={newCouponUses}
                    onChange={(e) => setNewCouponUses(parseInt(e.target.value, 10) || 100)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  تولید کد تخفیف
                </button>
              </form>

              {/* Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coupons.map((cp) => (
                  <div
                    key={cp.id}
                    className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-3 ${
                      cp.isActive ? 'bg-[#090d16] border-white/10' : 'bg-black/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-lg text-amber-400 tracking-wider">
                          {cp.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                          {toPersianDigits(cp.discountPercent)}٪ تخفیف
                        </span>
                      </div>

                      <div className="text-xs text-zinc-400 mt-2 space-y-1">
                        <div>تعداد مصرف شده: {toPersianDigits(cp.usedCount)} از {toPersianDigits(cp.maxUses)}</div>
                        <div>اعتبار: {toPersianDigits(cp.expiresInDays)} روز باقیمانده</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleCoupon(cp.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        cp.isActive ? 'bg-red-500/15 text-red-300 hover:bg-red-500/25' : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                      }`}
                    >
                      {cp.isActive ? 'غیرفعال‌سازی کد' : 'فعال‌سازی مجدد'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: DANMAKU REAL-TIME MODERATION */}
          {activeTab === 'danmaku' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="p-4 rounded-3xl bg-[#090d16] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">پایش زنده نظرات شناور دانماکو (Danmaku Live Stream):</div>
                  <div className="text-zinc-400 text-[11px]">مشاهده، تایید، ویرایش یا حذف نظرات نامناسب تماشاگران</div>
                </div>
                <span className="text-cyan-400 font-bold">{toPersianDigits(danmakuQueue.length)} نظر در صف</span>
              </div>

              <div className="space-y-3">
                {danmakuQueue.map((dm) => (
                  <div
                    key={dm.id}
                    className="p-4 rounded-2xl bg-[#090d16] border border-white/5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="font-bold text-white">{dm.user}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-cyan-400">{dm.animeTitle} (قسمت {toPersianDigits(dm.episodeNumber)})</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-500 text-[11px]">{toPersianDigits(dm.time)}</span>
                      </div>
                      <p className="text-xs text-zinc-200">
                        {dm.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {dm.status !== 'approved' && (
                        <button
                          onClick={() => handleApproveDanmaku(dm.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          تایید نظر
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteDanmaku(dm.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold transition-colors cursor-pointer"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SYSTEM SETTINGS */}
          {activeTab === 'system' && (
            <div className="space-y-6 max-w-3xl mx-auto py-2">
              <div className="p-6 rounded-3xl bg-[#090d16] border border-white/5 space-y-6">
                <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>پیکربندی شبکه Edge CDN و پخش جریانی</span>
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">محاسبه ترافیک نیم‌بهاء داخلی:</div>
                    <div className="text-[11px] text-zinc-400">ارسال هدرهای معتبر به سازمان فناوری اطلاعات و اپراتورهای ایران</div>
                  </div>
                  <button
                    onClick={() => {
                      setSystemSettings({ ...systemSettings, halfPriceCdn: !systemSettings.halfPriceCdn });
                      showToast('تنظیم ترافیک نیم‌بهاء تغییر یافت.');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      systemSettings.halfPriceCdn ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {systemSettings.halfPriceCdn ? 'فعال است' : 'غیرفعال'}
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <div className="text-xs font-bold text-white">حالت تعمیرات و نگهداری سرور:</div>
                    <div className="text-[11px] text-zinc-400">بستن دسترسی عمومی و نمایش صفحه اطلاعیه آپدیت</div>
                  </div>
                  <button
                    onClick={() => {
                      setSystemSettings({ ...systemSettings, maintenanceMode: !systemSettings.maintenanceMode });
                      showToast('حالت تعمیرات سرور ذخیره شد.');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      systemSettings.maintenanceMode ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {systemSettings.maintenanceMode ? 'فعال (سامانه بسته)' : 'غیرفعال'}
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <div className="text-xs font-bold text-white">کیفیت ۴K ۶۰ فریم منحصراً برای مشترکین VIP:</div>
                    <div className="text-[11px] text-zinc-400">کاربران رایگان حداکثر به ۷۲۰p اچ‌دی دسترسی خواهند داشت</div>
                  </div>
                  <button
                    onClick={() => {
                      setSystemSettings({ ...systemSettings, vipStrict4K: !systemSettings.vipStrict4K });
                      showToast('محدودیت کیفیت ۴K بروزرسانی شد.');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      systemSettings.vipStrict4K ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {systemSettings.vipStrict4K ? 'فعال (VIP اختصاصی)' : 'آزاد برای همه'}
                  </button>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>تمامی تغییرات سرور با امضای دیجیتال رمزنگاری شده و مستقیماً روی کلاسترهای Edge اعمال می‌گردند.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
