import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { CountUp } from "../CountUp";
import { Sparkline } from "../Sparkline";
import "./Stat.css";

export interface StatProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  /** Variação em %, ex.: 12.5 ou -3. */
  delta?: number;
  /** Texto ao lado da variação, ex.: "vs. semana passada". */
  deltaLabel?: string;
  trend?: number[];
  icon?: ReactNode;
  className?: string;
}

/** Cartão de KPI: número animado, variação colorida e sparkline. */
export function Stat({ label, value, format, delta, deltaLabel, trend, icon, className }: StatProps) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={cx("sn-stat", className)}>
      <div className="sn-stat__head">
        <span className="sn-stat__label">{label}</span>
        {icon && <span className="sn-stat__icon">{icon}</span>}
      </div>
      <div className="sn-stat__value">
        <CountUp value={value} format={format} />
      </div>
      <div className="sn-stat__foot">
        {delta != null && (
          <span className={cx("sn-stat__delta", up ? "sn-stat__delta--up" : "sn-stat__delta--down")}>
            <span aria-hidden>{up ? "▲" : "▼"}</span> {Math.abs(delta).toLocaleString("pt-BR")}%
            <span className="sn-visually-hidden">{up ? " de alta" : " de queda"}</span>
          </span>
        )}
        {deltaLabel && <span className="sn-stat__hint">{deltaLabel}</span>}
        {trend && (
          <Sparkline
            data={trend}
            width={96}
            height={30}
            tone={up ? "signature" : "danger"}
            className="sn-stat__spark"
          />
        )}
      </div>
    </div>
  );
}
