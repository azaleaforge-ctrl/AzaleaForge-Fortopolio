"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type SfxName =
  | "hover"
  | "click"
  | "enter"
  | "leave"
  | "success"
  | "toggle";

interface SfxApi {
  play: (name: SfxName) => void;
  muted: boolean;
  setMuted: (m: boolean) => void;
  toggleMuted: () => void;
}

const SfxContext = createContext<SfxApi | null>(null);

// Inharmonic ratios give the "metal" timbre (bell / anvil, not a musical tone).
const METAL_PARTIALS = [1, 2.76, 5.4, 8.16, 11.3];

/** Short filtered noise burst = the physical "impact" of hammer on steel. */
function strikeNoise(
  ac: AudioContext,
  dest: AudioNode,
  freq: number,
  gain: number,
  dur: number,
  t0: number
) {
  const len = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const env = Math.pow(1 - i / len, 2.2);
    data[i] = (Math.random() * 2 - 1) * env;
  }
  const noise = ac.createBufferSource();
  noise.buffer = buf;
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = 0.7;
  const g = ac.createGain();
  g.gain.value = gain;
  noise.connect(bp);
  bp.connect(g);
  g.connect(dest);
  noise.start(t0);
  noise.stop(t0 + dur + 0.02);
}

/** A forged-metal hit: inharmonic partials + noise impact, with slight detune. */
function metal(
  ac: AudioContext,
  dest: AudioNode,
  opts: {
    freq: number;
    decay?: number;
    gain?: number;
    strike?: number;
    partials?: number[];
    type?: OscillatorType;
    start?: number;
  }
) {
  const {
    freq,
    decay = 0.5,
    gain = 0.18,
    strike = 0.02,
    partials = METAL_PARTIALS,
    type = "sine",
    start = 0,
  } = opts;
  const t0 = ac.currentTime + start;
  const detune = 1 + (Math.random() - 0.5) * 0.04; // natural variation per hit

  strikeNoise(ac, dest, freq * 4, gain * 0.7, strike, t0);

  partials.forEach((ratio, idx) => {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.value = freq * ratio * detune;
    const g = ac.createGain();
    const pg = gain * (1 / (idx * 0.5 + 1.4));
    const pDecay = decay * (1 / (idx * 0.35 + 1));
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(pg, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + pDecay);
    osc.connect(g);
    g.connect(dest);
    osc.start(t0);
    osc.stop(t0 + pDecay + 0.05);
  });
}

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // Prime the AudioContext on the first user gesture so SFX have zero latency
  // afterwards. Browsers block audio until a gesture (autoplay policy), so the
  // hero's load-time reveal is silent by design — this just removes the delay
  // on every interaction after the first tap/scroll/key.
  useEffect(() => {
    const opts: AddEventListenerOptions = { once: true, capture: true };
    const unlock = () => {
      getCtx();
    };
    const events = [
      "pointerdown",
      "keydown",
      "touchstart",
      "wheel",
      "scroll",
    ] as const;
    events.forEach((e) => window.addEventListener(e, unlock, opts));
    return () =>
      events.forEach((e) => window.removeEventListener(e, unlock, opts));
  }, [getCtx]);

  const play = useCallback(
    (name: SfxName) => {
      if (muted) return;
      const ac = getCtx();
      if (!ac) return;
      const doPlay = (ctx: AudioContext) => {
        const master = ctx.createGain();
        master.gain.value = 0.9;
        master.connect(ctx.destination);

        switch (name) {
          // Light anvil "tink" on cursor hover — subtle, high, short.
          case "hover":
            metal(ctx, master, {
              freq: 1250,
              decay: 0.14,
              gain: 0.05,
              strike: 0.008,
              partials: [1, 2.76, 5.4],
            });
            break;
          // Crisp hammer tap on click.
          case "click":
            metal(ctx, master, {
              freq: 340,
              decay: 0.34,
              gain: 0.16,
              strike: 0.02,
            });
            break;
          // Fuller, clearly audible anvil ping when a section enters view.
          case "enter":
            metal(ctx, master, {
              freq: 600,
              decay: 0.42,
              gain: 0.22,
              strike: 0.014,
              partials: [1, 2.76, 5.4, 8.16],
            });
            break;
          // Barely-there low tick when leaving — keeps the "in/out" feel without annoyance.
          case "leave":
            metal(ctx, master, {
              freq: 300,
              decay: 0.16,
              gain: 0.03,
              strike: 0.004,
              partials: [1, 2.4],
            });
            break;
          // Satisfying double anvil ring on success.
          case "success":
            metal(ctx, master, {
              freq: 440,
              decay: 0.8,
              gain: 0.16,
              strike: 0.025,
            });
            metal(ctx, master, {
              freq: 660,
              decay: 0.85,
              gain: 0.15,
              strike: 0.025,
              start: 0.12,
            });
            break;
          // Metallic click for toggles.
          case "toggle":
            metal(ctx, master, {
              freq: 520,
              decay: 0.16,
              gain: 0.1,
              strike: 0.01,
              partials: [1, 2.76],
            });
            break;
        }
      };
      // Wait for the context to be running so volume is consistent (no playing
      // during the resume ramp, which caused "loud then suddenly quiet").
      if (ac.state === "suspended") {
        ac.resume().then(() => doPlay(ac)).catch(() => {});
      } else {
        doPlay(ac);
      }
    },
    [muted, getCtx]
  );

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  return (
    <SfxContext.Provider value={{ play, muted, setMuted, toggleMuted }}>
      {children}
    </SfxContext.Provider>
  );
}

export function useSfx(): SfxApi {
  const ctx = useContext(SfxContext);
  if (!ctx) throw new Error("useSfx must be used within <SfxProvider>");
  return ctx;
}
