import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, Settings, 
  Send, Check, Sparkles, Layers, ShieldCheck, Crown, Lock, Zap, CreditCard 
} from 'lucide-react';
import { Donghua, DanmakuItem, Episode, UserSubscription } from '../types/donghua';
import { toPersianDigits } from '../utils/farsiDigits';

interface DonghuaPlayerModalProps {
  donghua: Donghua;
  initialPlaying?: boolean;
  userSubscription: UserSubscription | null;
  purchasedEpisodes: number[];
  onOpenSubscriptionModal: (pending?: { donghua: Donghua; episodeNumber: number }) => void;
  onClose: () => void;
}

export const DonghuaPlayerModal: React.FC<DonghuaPlayerModalProps> = ({
  donghua,
  initialPlaying = true,
  userSubscription,
  purchasedEpisodes,
  onOpenSubscriptionModal,
  onClose
}) => {
  const [activeEpisode, setActiveEpisode] = useState<number>(donghua.episodesCurrent);
  const [currentTime, setCurrentTime] = useState(14);
  const [duration] = useState(1450); // ~24 mins
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'4K 60FPS' | '1080p Ultra' | '720p'>('4K 60FPS');
  const [audioTrack, setAudioTrack] = useState<'persian_dub' | 'persian_sub'>('persian_dub');
  const [danmakuEnabled, setDanmakuEnabled] = useState(true);
  const [danmakuInput, setDanmakuInput] = useState('');
  const [danmakuColor, setDanmakuColor] = useState('#10b981');
  const [danmakuList, setDanmakuList] = useState<DanmakuItem[]>(donghua.danmakuList);

  const currentEpObj = donghua.episodes.find((e) => e.number === activeEpisode) || donghua.episodes[0];
  const isVipEpisode = currentEpObj?.isVip;
  const isUnlocked = !isVipEpisode || userSubscription?.isActive || purchasedEpisodes.includes(activeEpisode);

  const [isPlaying, setIsPlaying] = useState(initialPlaying && isUnlocked);

  const danmakuContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Playback timer simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying && isUnlocked) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isUnlocked, duration]);

  // Dynamic particle canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const colors = [donghua.accentGlow, '#38bdf8', '#fbbf24', '#ffffff'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -Math.random() * 1.5 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (isPlaying && isUnlocked) {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [donghua.accentGlow, isPlaying, isUnlocked]);

  const handleSendDanmaku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!danmakuInput.trim()) return;

    const newItem: DanmakuItem = {
      id: `user-${Date.now()}`,
      text: danmakuInput.trim(),
      timeSec: currentTime,
      color: danmakuColor,
      user: 'کاربر تزکیه‌کننده'
    };

    setDanmakuList((prev) => [...prev, newItem]);
    setDanmakuInput('');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    const str = `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
    return toPersianDigits(str);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0c1017] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080b10] border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              قسمت {toPersianDigits(activeEpisode)}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {donghua.titleFa}
            </h2>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              ({donghua.titleEn})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="بستن پنجره پخش"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Container */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center group select-none">
          {/* Real Anime Key Scene Image Backdrop */}
          {donghua.bannerUrl || donghua.posterUrl ? (
            <img
              src={donghua.bannerUrl || donghua.posterUrl}
              alt={donghua.titleFa}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-125 transition-transform duration-1000 ${
                isPlaying && isUnlocked ? 'scale-105' : 'scale-100'
              }`}
            />
          ) : null}

          {/* Animated Canvas Stage with energy aura */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

          {/* Donghua Identity Watermark In Screen */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              {donghua.studio.split('/')[0]} · {quality}
            </span>
          </div>

          {/* Subtitle / Persian Tagline Display */}
          {isUnlocked && (
            <div className="absolute bottom-16 inset-x-0 z-20 flex justify-center px-4 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-lg text-center text-xs sm:text-sm font-semibold text-emerald-300 border border-emerald-500/20 shadow-lg">
                {donghua.taglineFa}
              </div>
            </div>
          )}

          {/* PAYWALL OVERLAY IF EPISODE IS LOCKED */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-2">
                این قسمت نیازمند اشتراک VIP یا خرید تکی است
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                برای تماشای قسمت {toPersianDigits(activeEpisode)} از «{donghua.titleFa}» می‌توانید اشتراک ساعتی، روزانه یا ماهانه تهیه کنید، یا همین قسمت را به صورت تکی خریداری نمایید.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenSubscriptionModal({ donghua, episodeNumber: activeEpisode })}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-950 flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>خرید تکی این قسمت ({toPersianDigits('9,000')} تومان)</span>
                </button>

                <button
                  onClick={() => onOpenSubscriptionModal()}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  <span>خرید اشتراک ساعتی / ماهانه</span>
                </button>
              </div>
            </div>
          )}

          {/* Danmaku Floating Barrage Layer */}
          {danmakuEnabled && isUnlocked && (
            <div
              ref={danmakuContainerRef}
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            >
              {danmakuList.map((item, index) => {
                const topPct = 12 + (index % 6) * 14;
                const durationAnim = 9 + (index % 3) * 2;
                return (
                  <div
                    key={item.id}
                    className="absolute whitespace-nowrap text-sm sm:text-base font-bold danmaku-text animate-danmaku pointer-events-none"
                    style={{
                      top: `${topPct}%`,
                      color: item.color,
                      animationDuration: `${durationAnim}s`,
                      animationDelay: `${(index * 1.5) % 8}s`,
                      left: '100%'
                    }}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          )}

          {/* Center Play/Pause Overlay Icon if paused */}
          {!isPlaying && isUnlocked && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute z-20 p-5 rounded-full bg-emerald-600/90 text-white hover:bg-emerald-500 hover:scale-110 transition-all cursor-pointer shadow-xl shadow-emerald-950"
            >
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </button>
          )}

          {/* Player Bottom Control Bar */}
          {isUnlocked && (
            <div className="absolute inset-x-0 bottom-0 z-30 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
              {/* Scrubber Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(pos * duration);
                }}
                className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all relative"
              >
                <div
                  className="h-full bg-emerald-500 rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'توقف' : 'پخش'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'صدا' : 'بی‌صدا'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono tabular-nums text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Danmaku toggle button */}
                  <button
                    onClick={() => setDanmakuEnabled(!danmakuEnabled)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer border ${
                      danmakuEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-white/5 text-zinc-500 border-white/10'
                    }`}
                    title="روشن/خاموش کردن نظرات رگباری دانماکو"
                  >
                    دانماکو {danmakuEnabled ? 'روشن' : 'خاموش'}
                  </button>

                  {/* Quality selector */}
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as any)}
                    className="bg-black/60 border border-white/10 text-white rounded px-2 py-0.5 text-[11px] focus:outline-none cursor-pointer"
                  >
                    <option value="4K 60FPS">4K ۶۰ فریم</option>
                    <option value="1080p Ultra">۱۰۸۰p اولترا</option>
                    <option value="720p">۷۲۰p اچ‌دی</option>
                  </select>

                  {/* Audio track selector */}
                  <select
                    value={audioTrack}
                    onChange={(e) => setAudioTrack(e.target.value as any)}
                    className="bg-black/60 border border-white/10 text-white rounded px-2 py-0.5 text-[11px] focus:outline-none cursor-pointer"
                  >
                    <option value="persian_dub">دوبله اختصاصی فارسی</option>
                    <option value="persian_sub">زیرنویس فارسی چسبیده</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danmaku Input Bar */}
        {isUnlocked && (
          <form
            onSubmit={handleSendDanmaku}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#080b10] border-t border-b border-white/5"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-zinc-400">رنگ نظر:</span>
              {['#10b981', '#fbbf24', '#f43f5e', '#38bdf8', '#ffffff'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDanmakuColor(c)}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${
                    danmakuColor === c ? 'scale-125 ring-2 ring-white/50' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <input
              type="text"
              value={danmakuInput}
              onChange={(e) => setDanmakuInput(e.target.value)}
              placeholder="ارسال نظر رگباری (دانماکو) در این ثانیه..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>ارسال دانماکو</span>
            </button>
          </form>
        )}

        {/* Episode Selector & Details Drawer */}
        <div className="p-4 overflow-y-auto max-h-56 bg-[#0a0d14]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-zinc-300">
              انتخاب قسمت‌ها ({toPersianDigits(donghua.episodes.length)} قسمت در دسترس)
            </h3>
            <span className="text-[11px] text-emerald-400">
              کیفیت رسمی ترافیک نیم‌بهاء
            </span>
          </div>

          {/* Episode Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {donghua.episodes.map((ep) => {
              const epIsVip = ep.isVip;
              const epUnlocked = !epIsVip || userSubscription?.isActive || purchasedEpisodes.includes(ep.number);
              return (
                <button
                  key={ep.number}
                  onClick={() => {
                    setActiveEpisode(ep.number);
                    setCurrentTime(0);
                    setIsPlaying(epUnlocked);
                  }}
                  className={`p-2.5 rounded-lg border text-right transition-all cursor-pointer relative ${
                    activeEpisode === ep.number
                      ? 'bg-emerald-600/20 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>قسمت {toPersianDigits(ep.number)}</span>
                    {epIsVip && !epUnlocked && (
                      <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                        <Lock className="w-3 h-3" />
                        <span>VIP</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {ep.titleFa}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
