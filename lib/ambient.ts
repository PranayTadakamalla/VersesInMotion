/**
 * A tiny generative night-soundscape built on the Web Audio API.
 * No audio files: a slow minor pad, distant wind, and stray bell notes
 * falling through a feedback delay like drops of rain on glass.
 */
type Voice = { osc: OscillatorNode[]; gain: GainNode };

const CHORDS = [
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [130.81, 196.0, 261.63, 329.63], // C
  [164.81, 196.0, 246.94, 293.66], // Em7
];
const BELLS = [659.25, 587.33, 523.25, 440.0, 392.0, 329.63, 880.0];

export class Ambient {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private delayIn!: GainNode;
  private voices: Voice[] = [];
  private timers: number[] = [];
  private chord = 0;
  playing = false;

  private init() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;

    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(ctx.destination);

    // feedback delay as a poor man's cathedral
    this.delayIn = ctx.createGain();
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.61;
    const fb = ctx.createGain();
    fb.gain.value = 0.55;
    const damp = ctx.createBiquadFilter();
    damp.type = "lowpass";
    damp.frequency.value = 2200;
    this.delayIn.connect(delay);
    delay.connect(damp).connect(fb).connect(delay);
    damp.connect(this.master);

    // wind: filtered brown noise with a breathing cutoff
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const wind = ctx.createBiquadFilter();
    wind.type = "bandpass";
    wind.frequency.value = 420;
    wind.Q.value = 0.6;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.11;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain).connect(wind.frequency);
    noise.connect(wind).connect(windGain).connect(this.master);
    noise.start();
    lfo.start();
  }

  private playChord() {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const freqs = CHORDS[this.chord % CHORDS.length];
    this.chord++;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 5);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.3;
    gain.connect(filter).connect(this.master);
    filter.connect(this.delayIn);

    const osc = freqs.flatMap((f) =>
      [-4, 4].map((detune) => {
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.value = f / 2;
        o.detune.value = detune;
        o.connect(gain);
        o.start(now);
        return o;
      }),
    );

    const previous = this.voices.shift();
    if (previous) {
      previous.gain.gain.cancelScheduledValues(now);
      previous.gain.gain.setValueAtTime(previous.gain.gain.value, now);
      previous.gain.gain.linearRampToValueAtTime(0, now + 6);
      previous.osc.forEach((o) => o.stop(now + 6.2));
    }
    this.voices.push({ osc, gain });
  }

  private bell() {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const f = BELLS[Math.floor(Math.random() * BELLS.length)];
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.035, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    o.connect(g);
    g.connect(this.master);
    g.connect(this.delayIn);
    o.start(now);
    o.stop(now + 3.6);
  }

  async start() {
    if (this.playing) return;
    this.playing = true;
    if (!this.ctx) this.init();
    const ctx = this.ctx!;
    await ctx.resume();
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3);
    this.playChord();
    this.timers.push(window.setInterval(() => this.playChord(), 12000));
    const scheduleBell = () => {
      this.timers.push(
        window.setTimeout(() => {
          if (!this.playing) return;
          this.bell();
          scheduleBell();
        }, 1800 + Math.random() * 4200),
      );
    };
    scheduleBell();
  }

  stop() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.playing = false;
    this.timers.forEach((t) => {
      clearInterval(t);
      clearTimeout(t);
    });
    this.timers = [];
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    window.setTimeout(() => {
      if (!this.playing) ctx.suspend();
    }, 1600);
  }
}
