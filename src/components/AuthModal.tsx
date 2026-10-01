import React, { useState } from 'react';
import { X, User, Lock, Phone, ArrowRight, ShieldCheck, Crown, ShieldAlert } from 'lucide-react';
import { UserAccount, UserRole } from '../types/donghua';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  intentMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  intentMessage
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('login');
  const [name, setName] = useState('');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const inputLower = mobileOrEmail.trim().toLowerCase();

    if (!inputLower) {
      setError('لطفاً شماره موبایل یا ایمیل خود را وارد نمایید.');
      return;
    }

    if (!password.trim() || password.length < 4) {
      setError('رمز عبور باید حداقل ۴ نویسه باشد.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Detect admin role based on credentials
      const isAdminAccount =
        inputLower.includes('admin') ||
        inputLower === 'admin' ||
        inputLower === '09120000000' ||
        password === 'admin' ||
        password === 'admin1234';

      const userRole: UserRole = isAdminAccount ? 'admin' : 'user';

      const user: UserAccount = {
        id: `user-${Date.now()}`,
        name: mode === 'register'
          ? name.trim()
          : (isAdminAccount ? 'مدیر ارشد سامانه' : (name.trim() || 'کاربر عالم دونگهوا')),
        mobileOrEmail: mobileOrEmail.trim(),
        role: userRole,
        avatarBg: isAdminAccount ? 'bg-amber-600' : 'bg-cyan-600',
        createdAt: new Date().toLocaleDateString('fa-IR'),
        walletTomans: isAdminAccount ? 500000 : 0
      };

      try {
        localStorage.setItem('xian_active_user', JSON.stringify(user));
      } catch {
        // Ignore
      }

      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  const handleQuickLogin = (role: UserRole) => {
    const isAdm = role === 'admin';
    const user: UserAccount = {
      id: isAdm ? 'admin-user-01' : 'demo-user-01',
      name: isAdm ? 'مدیر ارشد پایگاه (Admin)' : 'آرش کیهانی (کاربر عادی)',
      mobileOrEmail: isAdm ? 'admin@xianrealm.com' : '09123456789',
      role: isAdm ? 'admin' : 'user',
      avatarBg: isAdm ? 'bg-amber-600' : 'bg-cyan-600',
      createdAt: '۱۴۰۴/۰۱/۱۰',
      walletTomans: isAdm ? 1200000 : 50000
    };

    try {
      localStorage.setItem('xian_active_user', JSON.stringify(user));
    } catch {
      // Ignore
    }

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0a0e17] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col shadow-cyan-950/40">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#060910] border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {mode === 'register' ? 'ثبت‌نام حساب کاربری' : 'ورود به حساب کاربری'}
              </h3>
              <p className="text-[11px] text-zinc-400">عالم دونگهوا (XianRealm)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Intent notification banner if triggered via Subscription */}
        {intentMessage && (
          <div className="px-6 py-3 bg-amber-500/15 border-b border-amber-500/20 flex items-center gap-2 text-xs text-amber-300">
            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{intentMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-white/5 bg-[#080c14] p-1.5 gap-2 px-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
              mode === 'login'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            ورود به حساب
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
              mode === 'register'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            ثبت‌نام کاربر جدید
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 font-medium">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs text-zinc-300 mb-1.5 font-medium">
                نام و نام خانوادگی:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: شیائو یان یا علی محمدی"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">
              شماره موبایل یا ایمیل (برای ورود ادمین: admin):
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                placeholder="09123456789 یا admin"
                dir="ltr"
                className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">
              رمز عبور:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="حداقل ۴ کاراکتر"
                dir="ltr"
                className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 text-right"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'register' ? 'تکمیل ثبت‌نام و ورود' : 'ورود به حساب کاربری'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick 1-Click Role Testing Options */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="text-[11px] text-zinc-400 text-center">ورود سریع تستی با نقش‌های کاربری:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('user')}
                className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>ورود کاربر عادی</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>ورود به عنوان مدیر (Admin)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
