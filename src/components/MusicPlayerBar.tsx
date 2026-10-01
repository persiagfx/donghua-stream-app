import React from 'react';
import { Music, Play, Pause, Volume2, X, Sparkles } from 'lucide-react';
import { OSTTrack } from '../types/donghua';

interface MusicPlayerBarProps {
  currentTrack: OSTTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClose
}) => {
  if (!currentTrack && !isPlaying) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#0d121c]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl shadow-emerald-950/40 flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 transition-colors shadow-md cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
        </button>

        <div className="min-w-0">
          <div className="text-xs font-bold text-white truncate">
            {currentTrack ? currentTrack.titleFa : 'نوای آرامش‌بخش گوژنگ تائوئیستی'}
          </div>
          <div className="text-[11px] text-zinc-400 font-sans truncate">
            {currentTrack ? `هنرمند: ${currentTrack.artistFa}` : 'نوای آرامش‌بخش سنتی'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Animated visualizer bars */}
        <div className="flex items-end gap-1 h-5 px-2">
          {[12, 18, 14, 20, 10].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-emerald-400 transition-all ${
                isPlaying ? 'animate-pulse' : 'opacity-40'
              }`}
              style={{
                height: isPlaying ? `${h}px` : '4px',
                animationDelay: `${i * 120}ms`
              }}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="بستن پخش‌کننده"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
