import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Send } from 'lucide-react';
import { toPersianDigits } from '../utils/farsiDigits';

interface TickerMessage {
  id: string;
  user: string;
  animeTitle: string;
  episode: number;
  text: string;
  timeAgo: string;
  color: string;
}

const INITIAL_MESSAGES: TickerMessage[] = [
  { id: '1', user: 'تزکیه‌کننده_آسمان', animeTitle: 'نبرد از طریق آسمان‌ها', episode: 142, text: 'شعله خشم بودا واقعاً تو این قسمت دیوانه‌کننده بازطراحی شده بود!', timeAgo: '۱ دقیقه پیش', color: '#f59e0b' },
  { id: '2', user: 'شی_هائو_جاودان', animeTitle: 'جهان بی‌نقص', episode: 184, text: 'جنگ ده فرمانروا استاندارد کل صنعت ۳D انیمیشن چینه', timeAgo: '۳ دقیقه پیش', color: '#eab308' },
  { id: '3', user: 'دیو_پیر_هان', animeTitle: 'سرگذشت جاودانگی', episode: 108, text: 'هان لی طبق معمول محتاط‌ترین حرکت ممکن رو زد، عالی بود', timeAgo: '۵ دقیقه پیش', color: '#10b981' },
  { id: '4', user: 'کشتار_تائو', animeTitle: 'مرتد فناناپذیر', episode: 64, text: 'وانگ لین بدون هیچ رحمی انتقام گرفت، بهترین قسمت این فصل بود', timeAgo: '۷ دقیقه پیش', color: '#c084fc' },
  { id: '5', user: 'مسافر_کهکشان', animeTitle: 'بلعیده شده در کهکشان', episode: 148, text: 'سفینه بلک دراگون با کیفیت ۴K ۶۰ فریم فوق‌العاده‌ست', timeAgo: '۱۰ دقیقه پیش', color: '#06b6d4' }
];

export const LiveDanmakuTicker: React.FC = () => {
  const [messages, setMessages] = useState<TickerMessage[]>(INITIAL_MESSAGES);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const msg: TickerMessage = {
      id: `user-${Date.now()}`,
      user: 'کاربر VIP',
      animeTitle: 'عالم دونگهوا',
      episode: 1,
      text: newComment.trim(),
      timeAgo: 'چند لحظه پیش',
      color: '#38bdf8'
    };

    setMessages((prev) => [msg, ...prev.slice(0, 7)]);
    setNewComment('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="p-5 rounded-2xl bg-[#080b12] border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex items-center gap-1.5 text-white font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>جریان زنده نظرات دانماکو در حال پخش (Community Feed)</span>
            </div>
          </div>
          <span className="text-xs text-zinc-400">
            بیش از <strong className="text-emerald-400 font-bold">{toPersianDigits('4,250')}</strong> نظر ارسال شده در ۲۴ ساعت گذشته
          </span>
        </div>

        {/* Horizontal Marquee / Flow of incoming Danmaku */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {messages.slice(0, 6).map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 hover:bg-white/10 transition-colors"
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: m.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
                  <span className="font-semibold text-zinc-300 truncate">{m.user}</span>
                  <span className="text-zinc-500 text-[10px] shrink-0">{toPersianDigits(m.timeAgo)}</span>
                </div>
                <p className="text-xs text-white leading-relaxed font-medium line-clamp-2">
                  {m.text}
                </p>
                <div className="text-[10px] text-cyan-400 mt-1 truncate">
                  در حال تماشای: {m.animeTitle} (قسمت {toPersianDigits(m.episode)})
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Send Bar */}
        <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="شما هم یک نظر دانماکو زنده بنویسید..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ارسال زنده</span>
          </button>
        </form>
      </div>
    </section>
  );
};
