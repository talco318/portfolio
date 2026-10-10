// Lightweight Web Audio API Micro-Haptics Engine (Zero external assets, 100% client-synthesized)

class SoundEngine {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = false;
    private listeners: Set<(muted: boolean) => void> = new Set();

    constructor() {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tc_portfolio_audio_muted');
            this.isMuted = saved === null ? false : saved === 'true'; // Default unmuted or stored
        }
    }

    private getContext(): AudioContext | null {
        if (typeof window === 'undefined') return null;
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    public getMuted(): boolean {
        return this.isMuted;
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (typeof window !== 'undefined') {
            localStorage.setItem('tc_portfolio_audio_muted', String(this.isMuted));
        }
        this.listeners.forEach(cb => cb(this.isMuted));
        if (!this.isMuted) {
            this.playPop(520, 0.05);
        }
        return this.isMuted;
    }

    public subscribe(cb: (muted: boolean) => void): () => void {
        this.listeners.add(cb);
        return () => this.listeners.delete(cb);
    }

    // High-end mechanical pop (for badge drag / cursor snap)
    public playPop(frequency = 440, duration = 0.06, volume = 0.06): void {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, ctx.currentTime + duration);

            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch {
            // Ignore audio policy errors
        }
    }

    // Subtle Leica/Teenage Engineering micro-click
    public playClick(): void {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.03);
        } catch {
            // Ignore audio policy errors
        }
    }

    // Soft warm harmonic chime (for simulation activation)
    public playChime(): void {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const chords = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic
            chords.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime);

                const delay = idx * 0.04;
                gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
                gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + delay + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 0.35);
            });
        } catch {
            // Ignore audio policy errors
        }
    }

    // Aerodynamic whoosh on tab/filter shift
    public playWhoosh(): void {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(260, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.08);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, ctx.currentTime);

            gain.gain.setValueAtTime(0.025, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch {
            // Ignore audio policy errors
        }
    }
}

export const soundFx = new SoundEngine();
