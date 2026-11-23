import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./BatteryMeter.css";

export interface BatteryMeterProps {
  /** 0 a 1. */
  level: number;
  charging?: boolean;
  /** Mostra a porcentagem ao lado. */
  showValue?: boolean;
  /** Abaixo disso fica vermelho e pisca (padrão 0,2). */
  low?: number;
  className?: string;
}

/** Bateria com cor por nível: verde, âmbar abaixo de 50% e vermelho (piscando) abaixo de `low`. */
export function BatteryMeter({ level, charging, showValue = true, low = 0.2, className }: BatteryMeterProps) {
  const v = Math.max(0, Math.min(1, level));
  const pct = Math.round(v * 100);
  const state = charging ? "charging" : v <= low ? "low" : v <= 0.5 ? "mid" : "ok";
  return (
    <span
      className={cx("sn-battery", className)}
      data-state={state}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={charging ? `Bateria ${pct}%, carregando` : `Bateria ${pct}%`}
      style={{ "--sn-battery": `${pct}%` } as CSSProperties}
    >
      {showValue && <span className="sn-battery__value">{pct}%</span>}
      <span className="sn-battery__shell" aria-hidden="true">
        <span className="sn-battery__fill" />
        {charging && (
          <svg className="sn-battery__bolt" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
        )}
      </span>
    </span>
  );
}
