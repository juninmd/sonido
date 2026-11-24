import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { countValue } from "../../utils/ease";
import { formatBytes } from "../../utils/format";
import { rnd, useCanvasLoop } from "../../utils/useCanvasLoop";
import { useMotionPref } from "../../utils/useMotionPref";
import "./BlackHole.css";

export interface BlackHoleProps {
  /** Quanto saiu. null enquanto a remoção roda: o buraco gira rápido. */
  freed: number | null;
  /** Rótulo acima do número. */
  label?: string;
  /** Formata o total (padrão: bytes). */
  formatValue?: (value: number) => string;
  /** Altura em px. */
  height?: number;
  /** Duração da contagem final em ms. */
  duration?: number;
  className?: string;
}

interface Particle {
  a: number;
  r: number;
  s: number;
  c: string;
}

const TONES = ["--sn-color-accent", "--sn-color-accent-2", "--sn-color-aqua", "--sn-color-gold", "--sn-color-info"];

/**
 * Buraco negro em canvas (faxina): partículas caem em espiral enquanto algo é apagado e o total
 * conta até o valor final. Sem animação mostra um quadro parado e o número direto.
 */
export function BlackHole({
  freed,
  label = "Liberado",
  formatValue = formatBytes,
  height = 260,
  duration = 1600,
  className,
}: BlackHoleProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { animate } = useMotionPref();
  const spinning = useRef(freed === null);
  spinning.current = freed === null;
  const [shown, setShown] = useState(freed ?? 0);
  const from = useRef(0);

  useEffect(() => {
    if (freed === null) {
      from.current = 0;
      setShown(0);
      return;
    }
    if (!animate) {
      setShown(freed);
      return;
    }
    const t0 = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const v = countValue(a, freed, now - t0, duration);
      from.current = v;
      setShown(v);
      if (v !== freed) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [freed, animate, duration]);

  useCanvasLoop(ref, () => {
    let parts: Particle[] = [];
    let gold = "";
    return {
      setup: () => {
        const css = getComputedStyle(ref.current as Element);
        const pal = TONES.map((t) => css.getPropertyValue(t).trim() || "#888");
        gold = css.getPropertyValue("--sn-color-gold").trim() || "#fc3";
        parts = Array.from({ length: 160 }, () => ({
          a: rnd(0, Math.PI * 2),
          r: rnd(30, 220),
          s: rnd(0.6, 2.2),
          c: pal[Math.floor(rnd(0, pal.length))],
        }));
      },
      draw: ({ ctx, w, h, still }) => {
        const cx0 = w / 2;
        const cy0 = h / 2 - 14;
        const move = animate && !still;
        const speed = spinning.current ? 1 : 0.18;
        for (const p of parts) {
          if (move) {
            p.a += (0.012 + 1.6 / p.r) * speed;
            p.r -= (spinning.current ? 1.4 : 0.08) * p.s * (60 / Math.max(p.r, 20));
          }
          if (p.r < 14) {
            p.r = rnd(110, 220);
            p.a = rnd(0, Math.PI * 2);
          }
          ctx.globalAlpha = Math.min(1, p.r / 80);
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(cx0 + Math.cos(p.a) * p.r * 1.25, cy0 + Math.sin(p.a) * p.r * 0.5, p.s, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        const g = ctx.createRadialGradient(cx0, cy0, 4, cx0, cy0, 34);
        g.addColorStop(0, "#000");
        g.addColorStop(0.7, "#000");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(cx0, cy0, 34, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = gold;
        ctx.globalAlpha = spinning.current ? 0.9 : 0.4;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx0, cy0, 44, 12, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      },
    };
  }, [animate]);

  return (
    <div className={cx("sn-blackhole", className)} style={{ height }}>
      <canvas ref={ref} />
      <div className="sn-blackhole__readout" aria-live="polite">
        <span>{freed === null ? "Apagando…" : label}</span>
        <strong>{formatValue(shown)}</strong>
      </div>
    </div>
  );
}
