import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./MeterCard.css";

export type MeterStatus = "ok" | "warn" | "crit" | "none";

export interface MeterRow {
  key: string;
  label: string;
  /** 0 a 100. */
  pct: number;
  /** Texto de renovação, ex.: "renova em 2h". */
  renew?: string;
  /** Renovação próxima: o selo "respira" e o raio pisca. */
  soon?: boolean;
  /** Texto opcional abaixo, ex.: "41 de 50 mensagens". */
  detail?: string;
}

export interface MeterCardProps {
  title: string;
  logo?: ReactNode;
  /** Leitura principal (0–100) desenhada no anel. */
  pct: number;
  rows?: MeterRow[];
  /** Nota de status com ponto; `crit` emite um pulso. */
  note?: string;
  /** Posição na grade: entra em cascata. */
  index?: number;
  onClick?: () => void;
  className?: string;
}

/** Status pelo uso: 75% vira aviso, 90% vira crítico. */
export const meterStatus = (pct: number): MeterStatus => (pct >= 90 ? "crit" : pct >= 75 ? "warn" : "ok");

/** Cartão de consumo/cota (ai-session-monitor): anel, barras por janela, selo de renovação e alerta pulsante. */
export function MeterCard({ title, logo, pct, rows = [], note, index = 0, onClick, className }: MeterCardProps) {
  const status = meterStatus(pct);
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <button
      type="button"
      className={cx("sn-meter", className)}
      data-status={status}
      style={{ "--i": index } as CSSProperties}
      onClick={onClick}
    >
      <span className="sn-meter__head">
        <span className="sn-meter__ring">
          <svg viewBox="0 0 36 36" width="40" height="40" aria-hidden>
            <circle className="sn-meter__track" cx="18" cy="18" r={r} />
            <circle
              className="sn-meter__fill"
              cx="18"
              cy="18"
              r={r}
              strokeDasharray={c}
              style={{ "--off": c * (1 - Math.min(100, pct) / 100), "--c": c } as CSSProperties}
            />
          </svg>
          <span className="sn-meter__logo">{logo}</span>
        </span>
        <span className="sn-meter__title">{title}</span>
        <span className="sn-meter__pct">{Math.round(pct)}%</span>
      </span>
      {rows.map((q) => {
        const st = meterStatus(q.pct);
        return (
          <span key={q.key} className="sn-meter__row">
            <span className="sn-meter__rowhead">
              <span className="sn-meter__name">{q.label}</span>
              {q.renew && (
                <span className="sn-meter__renew" data-soon={q.soon || undefined}>
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden className="sn-meter__zap">
                    <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" />
                  </svg>
                  {q.renew}
                </span>
              )}
              <span className="sn-meter__rowpct" data-status={st}>
                {Math.round(q.pct)}%
              </span>
            </span>
            <span
              className="sn-meter__bar"
              data-status={st}
              role="meter"
              aria-label={q.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(q.pct)}
            >
              <i style={{ width: `${Math.min(100, q.pct)}%` }} />
            </span>
            {q.detail && <span className="sn-meter__detail">{q.detail}</span>}
          </span>
        );
      })}
      {note && (
        <span className="sn-meter__note">
          <i aria-hidden />
          {note}
        </span>
      )}
    </button>
  );
}
