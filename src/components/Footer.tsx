import React from 'react';
import { Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'schedule' | 'archive' | 'realms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#05070a] border-t border-white/5 py-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark and statement */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-bold tracking-wider text-emerald-400">
                XIANREALM
              </span>
              <span className="text-sm font-semibold text-white">
                عالم دونگهوا
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              بزرگ‌ترین پایگاه تخصصی و پلتفرم اشتراکی انیمه‌های برتر چینی (دونگهوا) با کیفیت ۴K ۶۰ فریم، دوبله و زیرنویس اختصاصی، سیستم نظرات رگباری دانماکو، پلن‌های اشتراک ساعتی، روزانه و ماهانه و خرید تکی قسمت‌ها.
            </p>
            <div className="text-xs text-emerald-400/90 font-sans">
              پلتفرم استریم و دانشنامه تخصصی شیان‌شیا و دونگهوا
            </div>
            <div className="pt-2">
              <a
                href="/donghua-stream-app.zip"
                download="donghua-stream-app.zip"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 rounded-xl transition-all shadow-sm shadow-emerald-950"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>دانلود سورس کد کامل پروژه (فایل ZIP)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              بخش‌های اصلی
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  صفحه اصلی و عناوین برگزیده
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  جدول پخش هفتگی قسمت‌ها
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('archive')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  آرشیو کامل انیمه‌ها
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('realms')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  دانشنامه قلمروهای تزکیه
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Studios & Resources */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              استودیوها و شبکه پخش
            </div>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>Sparkly Key Animation</li>
              <li>Shanghai Foch Film</li>
              <li>Tencent Penguin Pictures</li>
              <li>Bilibili Donghua</li>
              <li>Wonder Cat Animation</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            تمام حقوق برای پایگاه عالم دونگهوا (XianRealm) محفوظ است © {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4">
            <span>ترافیک نیم‌بهاء داخلی</span>
            <span>·</span>
            <span>پخش ۴K HDR</span>
            <span>·</span>
            <span>اشتراک‌های ساعتی، روزانه و ماهانه</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
