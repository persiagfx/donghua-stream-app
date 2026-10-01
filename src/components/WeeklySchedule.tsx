import React, { useState } from 'react';
import { Calendar, Clock, Play, Sparkles } from 'lucide-react';
import { Donghua } from '../types/donghua';
import { SCHEDULE_DAYS } from '../data/donghuaData';
import { DonghuaCard } from './DonghuaCard';

interface WeeklyScheduleProps {
  donghuaList: Donghua[];
  onSelectDonghua: (donghua: Donghua, playNow?: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  donghuaList,
  onSelectDonghua,
  favorites,
  onToggleFavorite
}) => {
  const [selectedDay, setSelectedDay] = useState('یکشنبه');

  const currentSchedule = SCHEDULE_DAYS.find((d) => d.dayFa === selectedDay);
  const activeDonghuas = donghuaList.filter((item) =>
    currentSchedule?.donghuaIds.includes(item.id) || item.broadcastDayFa === selectedDay
  );

  return (
    <section className="py-12 bg-[#090c12] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>تقویم هفتگی انتشار اختصاصی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              جدول پخش هفتگی انیمه‌های چینی
            </h2>
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>زمان‌بندی مطابق با ساعت رسمی پخش در شبکه‌های Tencent و Bilibili</span>
          </div>
        </div>

        {/* Day Segmented Tabs (Interactive filter control - button elements allowed) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#0e121b] border border-white/5 rounded-xl overflow-x-auto mb-8">
          {SCHEDULE_DAYS.map((day) => {
            const isActive = selectedDay === day.dayFa;
            return (
              <button
                key={day.dayFa}
                onClick={() => setSelectedDay(day.dayFa)}
                className={`flex-1 min-w-[90px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div>{day.dayFa}</div>
                <div className="text-[10px] opacity-75 font-outfit font-normal">
                  {day.dayEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scheduled Shows Grid */}
        {activeDonghuas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeDonghuas.map((donghua) => (
              <DonghuaCard
                key={donghua.id}
                donghua={donghua}
                onSelect={onSelectDonghua}
                isFavorite={favorites.includes(donghua.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0c1017] rounded-xl border border-white/5">
            <p className="text-zinc-400 text-sm">
              برای روز {selectedDay} عنوان برنامه‌ریزی شده در این ساعت ثبت نشده است.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
