import React, { useState } from 'react';
import { X, Check, Crown, Clock, Calendar, Zap, CreditCard, ShieldCheck, Sparkles, AlertCircle, User, LogIn } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/donghuaData';
import { SubscriptionPlan, UserSubscription, Donghua, UserAccount } from '../types/donghua';
import { toPersianDigits, formatPriceTomans } from '../utils/farsiDigits';

interface SubscriptionModalProps {
  currentSubscription: UserSubscription | null;
  onSubscribe: (plan: SubscriptionPlan) => void;
  onBuyChapter?: (donghuaId: string, episodeNumber: number) => void;
  pendingEpisode?: { donghua: Donghua; episodeNumber: number } | null;
  currentUser: UserAccount | null;
  onRequireLogin: (intentMsg?: string) => void;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  currentSubscription,
  onSubscribe,
  onBuyChapter,
  pendingEpisode,
  currentUser,
  onRequireLogin,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'chapter'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[3]); // Monthly default
  const [paymentStep, setPaymentStep] = useState<'select' | 'gateway' | 'success'>('select');
  const [trackingCode, setTrackingCode] = useState('');

  const handleProcessPayment = () => {
    // Check if user is logged in
    if (!currentUser) {
      onRequireLogin('برای نهایی‌سازی خرید اشتراک یا قسمت، لطفاً ابتدا ثبت‌نام کنید یا وارد حساب خود شوید.');
      return;
    }

    setPaymentStep('gateway');
    setTimeout(() => {
      const code = 'TRX-' + toPersianDigits(Math.floor(10000000 + Math.random() * 90000000));
      setTrackingCode(code);
      setPaymentStep('success');
      if (activeTab === 'plans') {
        onSubscribe(selectedPlan);
      } else if (pendingEpisode && onBuyChapter) {
        onBuyChapter(pendingEpisode.donghua.id, pendingEpisode.episodeNumber);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0a0e17] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col shadow-cyan-950/40">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#060910] border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                تهیه اشتراک VIP و خرید تکی قسمت‌ها
              </h2>
              <p className="text-xs text-zinc-400">
                تماشای نامحدود، سرعت دانلود حداکثری و کیفیت ۴K ۶۰ فریم بدون تبلیغات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User login status banner */}
        <div className="px-6 py-2.5 bg-[#080d16] border-b border-white/5 flex items-center justify-between text-xs">
          {currentUser ? (
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <span>
                حساب کاربری فعال: <strong className="text-white">{currentUser.name}</strong> ({toPersianDigits(currentUser.mobileOrEmail)})
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-amber-400 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>برای خرید اشتراک، باید ابتدا وارد حساب خود شوید یا ثبت‌نام کنید.</span>
              </span>
              <button
                type="button"
                onClick={() => onRequireLogin('برای ثبت اشتراک، ابتدا ثبت‌نام کنید یا وارد شوید.')}
                className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>ورود / ثبت‌نام</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        {paymentStep === 'select' && (
          <div className="flex items-center p-2 bg-[#090d14] border-b border-white/5 px-6 gap-2">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'plans'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>پلن‌های اشتراک (ساعتی، روزانه، ماهانه)</span>
            </button>

            <button
              onClick={() => setActiveTab('chapter')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'chapter'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>خرید تکی یک قسمت (چپتر)</span>
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {paymentStep === 'select' && activeTab === 'plans' && (
            <div className="space-y-6">
              {currentSubscription && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs sm:text-sm text-cyan-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>
                      اشتراک فعلی شما: <strong className="text-white">{currentSubscription.planName}</strong>
                    </span>
                  </div>
                  <span className="text-zinc-300">
                    تا {toPersianDigits(new Date(currentSubscription.expiresAt).toLocaleDateString('fa-IR'))}
                  </span>
                </div>
              )}

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUBSCRIPTION_PLANS.filter((p) => p.id !== 'chapter-single').map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-cyan-950/70 to-[#0e1624] border-cyan-400 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400'
                          : 'bg-[#0f1420] border-white/5 hover:border-white/20 hover:bg-[#121927]'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-black font-black text-[10px] uppercase tracking-wider shadow">
                          محبوب‌ترین پلن
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-semibold text-cyan-400 mb-1">
                          {toPersianDigits(plan.durationLabel)}
                        </div>
                        <h3 className="text-base font-bold text-white mb-2">
                          {toPersianDigits(plan.nameFa)}
                        </h3>
                        <div className="text-xl font-black text-white mb-3">
                          {formatPriceTomans(plan.priceTomans)}{' '}
                          <span className="text-xs font-normal text-zinc-400 font-sans">تومان</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                          {toPersianDigits(plan.descriptionFa)}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-zinc-300">
                        {plan.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>{toPersianDigits(f)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div className="p-4 rounded-xl bg-[#090d14] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div>
                  <div className="text-xs text-zinc-400">پلن انتخابی:</div>
                  <div className="text-sm font-bold text-white">
                    {toPersianDigits(selectedPlan.nameFa)} — {formatPriceTomans(selectedPlan.priceTomans)} تومان
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {currentUser ? 'پرداخت و فعال‌سازی فوری اشتراک' : 'ورود / ثبت‌نام برای خرید'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'select' && activeTab === 'chapter' && (
            <div className="space-y-6 max-w-xl mx-auto py-4">
              <div className="p-6 rounded-2xl bg-[#0f1420] border border-white/5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  خرید تکی یک قسمت (چپتر)
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {pendingEpisode
                    ? `شما در حال خرید قسمت ${toPersianDigits(pendingEpisode.episodeNumber)} از انیمه «${pendingEpisode.donghua.titleFa}» هستید.`
                    : `با خرید هر قسمت به صورت تکی (${toPersianDigits('9,000')} تومان)، دسترسی همیشگی و نامحدود به آن قسمت برای حساب شما فعال می‌شود.`}
                </p>

                <div className="text-3xl font-black text-white mb-6">
                  {toPersianDigits('9,000')} <span className="text-sm font-normal text-zinc-400 font-sans">تومان</span>
                </div>

                <button
                  onClick={handleProcessPayment}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {currentUser ? 'پرداخت و باز کردن این قسمت' : 'ورود / ثبت‌نام برای خرید چپتر'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'gateway' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto" />
              <div className="text-base font-bold text-white">
                در حال برقراری ارتباط با شبکه پرداخت شاپرک...
              </div>
              <p className="text-xs text-zinc-400">
                پرداخت امن برای حساب کاربری {currentUser?.name}
              </p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="py-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                پرداخت با موفقیت انجام شد!
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeTab === 'plans'
                  ? `اشتراک ${toPersianDigits(selectedPlan.nameFa)} با موفقیت روی حساب کاربری «${currentUser?.name}» فعال گردید.`
                  : 'قسمت مورد نظر باز شد و هم‌اکنون با کیفیت ۴K در دسترس است.'}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-400 space-y-1 text-right">
                <div className="flex justify-between">
                  <span>کاربر خریدار:</span>
                  <span className="text-white font-bold">{currentUser?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>کد پیگیری تراکنش:</span>
                  <span className="text-cyan-400 font-bold">{trackingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>وضعیت:</span>
                  <span className="text-emerald-400">تایید شده شاپرک</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer mt-4"
              >
                بازگشت به سایت و شروع تماشا
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
