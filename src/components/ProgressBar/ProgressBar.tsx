import { cx } from "../../utils/cx";
import "./ProgressBar.css";

export interface ProgressBarProps {
  /** 0 a 1. Omitido = indeterminado. */
  value?: number;
  label: string;
  /** Mostra rótulo e porcentagem acima da barra. */
  showValue?: boolean;
  /** `accent` usa o gradiente de ação; `brand` é o nome antigo (obsoleto). */
  tone?: "signature" | "accent" | "aqua" | "brand";
  size?: "sm" | "md";
  className?: string;
}

/** Barra de progresso linear, determinada ou indeterminada. */
export function ProgressBar({ value, label, showValue, tone = "signature", size = "md", className }: ProgressBarProps) {
  const v = value == null ? undefined : Math.min(1, Math.max(0, value));
  return (
    <div
      className={cx(
        "sn-progress",
        `sn-progress--${tone === "brand" ? "accent" : tone}`,
        `sn-progress--${size}`,
        className,
      )}
    >
      {showValue && (
        <div className="sn-progress__meta">
          <span>{label}</span>
          {v != null && <span className="sn-progress__pct">{Math.round(v * 100)}%</span>}
        </div>
      )}
      <div
        className={cx("sn-progress__track", v == null && "sn-progress__track--indeterminate")}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v == null ? undefined : Math.round(v * 100)}
      >
        <div className="sn-progress__bar" style={v == null ? undefined : { transform: `scaleX(${v})` }} />
      </div>
    </div>
  );
}
