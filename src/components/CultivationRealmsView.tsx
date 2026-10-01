import React, { useState } from 'react';
import { Sparkles, Shield, Zap, Mountain, Compass, Award, ArrowLeft } from 'lucide-react';
import { CULTIVATION_REALMS } from '../data/donghuaData';
import { CultivationRealm } from '../types/donghua';

export const CultivationRealmsView: React.FC = () => {
  const [selectedRealm, setSelectedRealm] = useState<CultivationRealm>(CULTIVATION_REALMS[2]); // Golden Core default
  const [userQi, setUserQi] = useState(1250);
  const [tribulationSuccess, setTribulationSuccess] = useState<string | null>(null);

  const handleBreakthrough = () => {
    setUserQi((prev) => prev + 500);
    const msgs = [
      '⚡ غرش صاعقه بنفش آسمانی! تراز معنوی شما افزایش یافت و کانال‌های مریدین گشوده شدند!',
      '🔥 پالایش اکسیر دان‌تیان موفقیت‌آمیز بود! هسته انرژی درخشنده‌تر شد.',
      '✨ پیوند با چی کیهانی کامل گردید! درک شما از تائو عمیق‌تر شد.'
    ];
    setTribulationSuccess(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setTribulationSuccess(null), 4000);
  };

  return (
    <section className="py-12 bg-[#07090e] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>دانشنامه اسرار جاودانگی شیان‌شیا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            سیستم قلمروها و سطوح تزکیه تائوئیستی
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            از تزکیه کالبد فانی در مرحله تراکم چی تا صعود به مقام فناناپذیر حقیقی و حکمرانی بر قوانین زمان و فضا.
          </p>
        </div>

        {/* Breakthrough Simulator Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e161f] to-amber-950/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">میزان چی انباشته شما در دان‌تیان:</div>
              <div className="text-2xl font-black text-white font-mono">
                {userQi.toLocaleString('fa-IR')} <span className="text-sm text-emerald-400 font-sans">واحد چی روحانی</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBreakthrough}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950 cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>شکستن مرز قلمرو (مدیتیشن تائو)</span>
            </button>
          </div>
        </div>

        {tribulationSuccess && (
          <div className="mb-8 p-4 bg-emerald-900/40 border border-emerald-500/40 rounded-xl text-center text-sm font-semibold text-emerald-200 animate-pulse">
            {tribulationSuccess}
          </div>
        )}

        {/* Realms Grid and Detail Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Realms Stepper Column */}
          <div className="lg:col-span-5 space-y-2">
            {CULTIVATION_REALMS.map((realm, index) => {
              const isSelected = selectedRealm.id === realm.id;
              return (
                <button
                  key={realm.id}
                  onClick={() => setSelectedRealm(realm)}
                  className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white/10 border-emerald-500/60 shadow-md'
                      : 'bg-[#0d111a] border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-zinc-500 w-5">
                      0{index + 1}.
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {realm.nameFa}
                      </div>
                      <div className="text-xs text-zinc-500 font-sans">
                        {realm.nameEn}
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: realm.color }}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Realm Detailed Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0d121c] border border-white/10 relative overflow-hidden">
            {/* Ambient background glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none filter blur-3xl"
              style={{ backgroundColor: selectedRealm.color }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500">
                  قلمرو رتبه {selectedRealm.id} از ۸
                </span>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded border"
                  style={{
                    color: selectedRealm.color,
                    borderColor: `${selectedRealm.color}40`,
                    backgroundColor: `${selectedRealm.color}15`
                  }}
                >
                  {selectedRealm.spiritualSpan}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                {selectedRealm.nameFa}
              </h3>
              <p className="text-sm text-zinc-400 font-sans mb-6">
                {selectedRealm.nameEn}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 text-sm text-zinc-300 leading-relaxed">
                {selectedRealm.descriptionFa}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>عذاب آسمانی (Tribulation):</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {selectedRealm.tribulation}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>طول عمر جسم فانی:</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-300">
                    {selectedRealm.spiritualSpan}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
