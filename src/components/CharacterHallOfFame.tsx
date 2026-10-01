import React from 'react';
import { Sword, Shield, Flame, Sparkles, Award } from 'lucide-react';
import { Donghua } from '../types/donghua';

interface CharacterHallOfFameProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, startPlaying?: boolean) => void;
}

export const CharacterHallOfFame: React.FC<CharacterHallOfFameProps> = ({
  donghuaList,
  onSelectDonghua
}) => {
  // Collect prime characters from top animes
  const heroes = [
    {
      nameFa: 'شیائو یان (Xiao Yan)',
      animeTitle: 'نبرد از طریق آسمان‌ها',
      donghuaId: 'btth',
      titleRole: 'ارباب شعله‌های بهشتی',
      realm: 'Dou Zong - ستاره ششم',
      weapon: 'خط‌کش سیاه باستانی (Heavy Xuan Ruler)',
      faction: 'اتحاد یان / پاویون ستاره',
      quote: 'سی سال در شرق رودخانه، سی سال در غرب؛ هرگز جوانی پرامید را تحقیر نکن',
      glow: '#f97316'
    },
    {
      nameFa: 'شی هائو (Huang Tian Di)',
      animeTitle: 'جهان بی‌نقص',
      donghuaId: 'perfect-world',
      titleRole: 'امپراتور آینده هوانگ',
      realm: 'قلمرو عالی‌رتبه کیهانی',
      weapon: 'هنر ممنوعه کون‌پنگ و شمشیر رعد سیاه',
      faction: 'روستای سنگی / پاویون هوانگ',
      quote: 'چه کسی جرات دارد در برابر من ادعای شکست‌ناپذیری کند؟',
      glow: '#eab308'
    },
    {
      nameFa: 'وانگ لین (Wang Lin)',
      animeTitle: 'مرتد فناناپذیر',
      donghuaId: 'renegade-immortal',
      titleRole: 'تزکیه‌کننده تائوی کشتار',
      realm: 'Nascent Soul تیره',
      weapon: 'مهره آسمانی و شمشیر خونی سرکش',
      faction: 'سیاره سوزاکو باستان',
      quote: 'اگر آسمان بر من فشار آورد، آسمان را می‌شکافم',
      glow: '#a855f7'
    },
    {
      nameFa: 'هان لی (Old Devil Han)',
      animeTitle: 'سرگذشت جاودانگی',
      donghuaId: 'record-of-mortal',
      titleRole: 'جاودانه محتاط',
      realm: 'Nascent Soul اواسط مرحله',
      weapon: 'شمشیرهای ۷۲ گانه بامبوی ابر طلا',
      faction: 'دره پاییز زرد / جزایر هرج‌ومرج',
      quote: 'راه ناهموار است، اما با گام‌های استوار و احتیاط به مقصد می‌رسم',
      glow: '#10b981'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
            <Sword className="w-4 h-4" />
            <span>تالار مشاهیر و اسطوره‌های شیان‌شیا (Hall of Legends)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            شخصیت‌های ماندگار و سلاح‌های تائوئیستی
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {heroes.map((hero) => {
          const matchedDonghua = donghuaList.find((d) => d.id === hero.donghuaId);
          return (
            <div
              key={hero.nameFa}
              onClick={() => matchedDonghua && onSelectDonghua(matchedDonghua, false)}
              className="p-5 rounded-3xl bg-[#090d15] border border-white/5 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="font-semibold text-cyan-400 truncate max-w-[130px]">{hero.animeTitle}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300 font-mono">
                    {hero.realm}
                  </span>
                </div>

                <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {hero.nameFa}
                </h3>
                <div className="text-xs text-amber-400 font-medium mb-3">
                  {hero.titleRole}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed italic border-r-2 border-cyan-500 pr-2 my-3">
                  «{hero.quote}»
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1 text-[11px] text-zinc-400">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">سلاح معنوی:</span>
                  <span className="text-zinc-200 font-semibold truncate max-w-[130px]">{hero.weapon}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">فرقه / سازمان:</span>
                  <span className="text-zinc-300 truncate max-w-[130px]">{hero.faction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
