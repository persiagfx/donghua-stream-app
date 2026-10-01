// Web Audio API generator for authentic traditional Chinese pentatonic scales (Gong, Shang, Jue, Zhi, Yu)
// Provides peaceful Guzheng, ethereal flute, and majestic battle Xianxia sounds

class XianAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private currentTrackId: string | null = null;

  // Pentatonic notes in Hz (Key of D: D, E, F#, A, B)
  private scales = {
    guzheng: [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0, 987.77],
    flute: [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51],
    battle: [146.83, 164.81, 220.0, 246.94, 293.66, 329.63, 440.0],
    celestial: [440.0, 554.37, 659.25, 830.61, 880.0, 1108.73, 1318.51]
  };

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single plucked Guzheng string sound with realistic overtone decay
  public playPluck(freq: number, duration: number = 2.5) {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Main fundamental oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle pitch bend at the attack (plucking characteristic)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.15);

    // Overtone harmonic
    const overtone = this.ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);

    // Gain envelopes
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.08, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

    // Master filter for wooden resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.value = 3;

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  }

  // Start continuous ambient procedural melody in background
  public playMelody(mode: 'guzheng' | 'flute' | 'battle' | 'celestial', trackId: string, onNote?: (noteHz: number) => void) {
    this.stop();
    this.initCtx();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    const notes = this.scales[mode] || this.scales.guzheng;
    let step = 0;

    // Poetic Xianxia chord progression sequence
    const sequence = [0, 2, 4, 3, 1, 4, 2, 5, 3, 6, 4, 2, 1, 0];

    const playNext = () => {
      if (!this.isPlaying) return;
      const noteIdx = sequence[step % sequence.length];
      const freq = notes[noteIdx % notes.length];
      
      this.playPluck(freq, mode === 'battle' ? 1.2 : 2.8);
      if (onNote) onNote(freq);

      step++;
      const delay = mode === 'battle' ? 380 : (Math.random() * 500 + 750);
      this.timer = window.setTimeout(playNext, delay);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
}

export const xianAudio = new XianAudioEngine();
