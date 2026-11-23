import { type RefObject, useEffect } from "react";

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Frames since start (≈60 por segundo). */
  t: number;
  /** Tempo em ms (performance.now). */
  now: number;
  /** true no quadro parado de reduced-motion. */
  still: boolean;
}

export interface CanvasLoop {
  /** Chamado ao montar e a cada redimensionamento. */
  setup?: (w: number, h: number) => void;
  draw: (f: CanvasFrame) => void;
  /** Sob reduced-motion: desenha um quadro parado (padrão) ou nada. */
  stillFrame?: boolean;
}

/**
 * Loop de canvas compartilhado (canto-widget): DPR limitado a 2, ResizeObserver,
 * pausa quando a aba some e um quadro parado com reduced-motion.
 */
export function useCanvasLoop(ref: RefObject<HTMLCanvasElement | null>, make: () => CanvasLoop, deps: unknown[]) {
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext?.("2d");
    if (!cv || !ctx) return;
    const loop = make();
    const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    const size = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      loop.setup?.(w, h);
      if (reduce) paintStill();
    };
    const paintStill = () => {
      ctx.clearRect(0, 0, w, h);
      if (loop.stillFrame !== false) loop.draw({ ctx, w, h, t: 0, now: performance.now(), still: true });
    };
    const frame = (now: number) => {
      t++;
      ctx.clearRect(0, 0, w, h);
      loop.draw({ ctx, w, h, t, now, still: false });
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduce && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(size);
    ro?.observe(cv);
    size();
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: as deps vêm de quem chama o hook
  }, deps);
}

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);
