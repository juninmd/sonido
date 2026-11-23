import { type CSSProperties, type ReactNode, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./EmojiBurst.css";

interface Burst {
  id: number;
  x: number;
  y: number;
  bits: { e: string; dx: number; dy: number; r: number }[];
}

export interface EmojiBurstProps {
  /** Emojis sorteados a cada toque. */
  emojis?: string[];
  count?: number;
  children: ReactNode;
  className?: string;
}

/** Área que solta emojis e um anel de onda no ponto do toque (EmojiReaction do mika). Máx. 12 rajadas vivas. */
export function EmojiBurst({
  emojis = ["💖", "✨", "😊", "🎉", "⭐", "👏"],
  count = 6,
  children,
  className,
}: EmojiBurstProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const seq = useRef(0);
  const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div
      className={cx("sn-burst", className)}
      onPointerDown={(e) => {
        if (reduce) return;
        const box = e.currentTarget.getBoundingClientRect();
        const id = ++seq.current;
        const bits = Array.from({ length: count }, (_, i) => {
          const a = -Math.PI / 2 + (i - (count - 1) / 2) * 0.45 + (Math.random() - 0.5) * 0.3;
          const sp = 55 + Math.random() * 45;
          return {
            e: emojis[Math.floor(Math.random() * emojis.length)],
            dx: Math.cos(a) * sp,
            dy: Math.sin(a) * sp,
            r: (Math.random() - 0.5) * 60,
          };
        });
        setBursts((b) => [...b.slice(-11), { id, x: e.clientX - box.left, y: e.clientY - box.top, bits }]);
        setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1300);
      }}
    >
      {children}
      {bursts.map((b) => (
        <span key={b.id} className="sn-burst__at" style={{ left: b.x, top: b.y }} aria-hidden>
          <i className="sn-burst__ring" />
          {b.bits.map((bit, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: partículas efêmeras
            <b key={i} style={{ "--dx": `${bit.dx}px`, "--dy": `${bit.dy}px`, "--r": `${bit.r}deg` } as CSSProperties}>
              {bit.e}
            </b>
          ))}
        </span>
      ))}
    </div>
  );
}
