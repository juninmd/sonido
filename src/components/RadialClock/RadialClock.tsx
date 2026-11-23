import { type CSSProperties, useState } from "react";
import { cx } from "../../utils/cx";
import "./RadialClock.css";

export interface RadialClockProps {
  /** 24 valores, um por hora. */
  hist: number[];
  label: string;
  /** Horas da noite pintadas no tom de destaque. */
  night?: (h: number) => boolean;
  caption?: string;
  className?: string;
}

const pt = (r: number, a: number) => [50 + r * Math.sin(a), 50 - r * Math.cos(a)];

/** Relógio de 24 h (franca-segura): fatia por hora com raio pela raiz da área, pico de 3 h em vermelho, setas navegam. */
export function RadialClock({ hist, label, night = (h) => h >= 18 || h < 6, caption, className }: RadialClockProps) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(1, ...hist);
  let peak = 0;
  let best = -1;
  for (let h = 0; h < 24; h++) {
    const s = hist[h] + hist[(h + 1) % 24] + hist[(h + 2) % 24];
    if (s > best) {
      best = s;
      peak = h;
    }
  }
  const inPeak = (h: number) => (h - peak + 24) % 24 < 3;
  const r0 = 14;
  const r1 = 44;
  const wedge = (h: number) => {
    const r = r0 + (r1 - r0) * Math.sqrt(hist[h] / max);
    const a0 = (h / 24) * 2 * Math.PI + 0.02;
    const a1 = ((h + 1) / 24) * 2 * Math.PI - 0.02;
    const [x0, y0] = pt(r0, a0);
    const [x1, y1] = pt(r, a0);
    const [x2, y2] = pt(r, a1);
    const [x3, y3] = pt(r0, a1);
    return `M${x0} ${y0}L${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r0} ${r0} 0 0 0 ${x0} ${y0}Z`;
  };
  const hh = (h: number) => `${String(h).padStart(2, "0")}h`;
  return (
    <figure className={cx("sn-rclock", className)}>
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={label}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: o relógio é navegável pelas setas
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setActive(((active ?? -1) + 1) % 24);
          else if (e.key === "ArrowLeft") setActive(((active ?? 24) + 23) % 24);
          else if (e.key === "Escape") setActive(null);
        }}
        onPointerLeave={() => setActive(null)}
      >
        <circle cx="50" cy="50" r={r1} className="sn-rclock__ring" />
        <circle cx="50" cy="50" r={(r0 + r1) / 2} className="sn-rclock__ring" />
        {hist.map((_, h) => (
          <path
            // biome-ignore lint/suspicious/noArrayIndexKey: 24 horas fixas
            key={h}
            d={wedge(h)}
            className="sn-rclock__wedge"
            data-night={night(h) || undefined}
            data-peak={inPeak(h) || undefined}
            data-dim={(active !== null && active !== h) || undefined}
            style={{ "--i": h } as CSSProperties}
            onPointerEnter={() => setActive(h)}
          />
        ))}
        {[0, 6, 12, 18].map((h) => {
          const [x, y] = pt(r1 + 4.5, (h / 24) * 2 * Math.PI);
          return (
            <text key={h} x={x} y={y + 1.2} textAnchor="middle" className="sn-rclock__label">
              {hh(h)}
            </text>
          );
        })}
        <text x="50" y="50" textAnchor="middle" className="sn-rclock__center">
          {active === null ? hh(peak) : hist[active]}
        </text>
        <text x="50" y="57" textAnchor="middle" className="sn-rclock__sub">
          {active === null ? `pico ${hh(peak)}–${hh((peak + 3) % 24)}` : hh(active)}
        </text>
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
