import { type ReactNode, useId } from "react";
import { cx } from "../../utils/cx";
import "./ProgressRing.css";

export interface ProgressRingProps {
  /** 0 a 1. */
  value: number;
  size?: number;
  thickness?: number;
  /** Conteúdo central (ex.: nível, porcentagem). */
  children?: ReactNode;
  label: string;
  className?: string;
}

/** Anel de progresso com traço em gradiente (LevelRing do games-gallery). */
export function ProgressRing({ value, size = 72, thickness = 6, children, label, className }: ProgressRingProps) {
  const v = Math.min(1, Math.max(0, value));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const gid = `sn-ring-${useId().replace(/:/g, "")}`;
  return (
    <div
      className={cx("sn-ring", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--sn-sig-1)" }} />
            <stop offset="52%" style={{ stopColor: "var(--sn-sig-2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--sn-sig-3)" }} />
          </linearGradient>
        </defs>
        <circle className="sn-ring__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={thickness} fill="none" />
        <circle
          className="sn-ring__bar"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={thickness}
          fill="none"
          stroke={`url(#${gid})`}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
        />
      </svg>
      {children != null && <div className="sn-ring__center">{children}</div>}
    </div>
  );
}
