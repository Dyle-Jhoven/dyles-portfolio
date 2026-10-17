/**
 * Web Audio API 8-Bit Chiptune Synthesizer modeled after cxong/Dunkman's TIC-80 SFX.
 * Starts muted by default so Idle AI Attract Mode never violates browser autoplay rules.
 */
export class DunkmanAudio {
  constructor() {
    this.muted = true;
    this.ctx = null;
  }

  ensureContext() {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute(forceState) {
    if (typeof forceState === 'boolean') {
      this.muted = forceState;
    } else {
      this.muted = !this.muted;
    }
    if (!this.muted) {
      this.ensureContext();
      this.playMove();
    }
    return this.muted;
  }

  playTone(freqStart, freqEnd, durationSec, type = 'square', gainVal = 0.08) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + durationSec);
    }

    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec);
  }

  playMove() {
    this.playTone(320, 540, 0.055, 'square', 0.05);
  }

  playHit() {
    this.playTone(150, 45, 0.22, 'sawtooth', 0.12);
  }

  playCutIn() {
    this.playTone(220, 880, 0.18, 'square', 0.09);
  }

  playSlam() {
    this.playTone(180, 38, 0.45, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(440, 880, 0.25, 'triangle', 0.09), 90);
  }

  playLose() {
    this.playTone(240, 75, 0.4, 'triangle', 0.1);
  }

  playTick() {
    this.playTone(660, 660, 0.03, 'square', 0.03);
  }
}
