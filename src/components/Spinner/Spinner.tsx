import { cx } from "../../utils/cx";
import "./Spinner.css";

export interface SpinnerProps {
  size?: number;
  /** Quando definido, anuncia o carregamento para leitores de tela. */
  label?: string;
  className?: string;
}

/** Indicador de carregamento circular. Decorativo por padrão. */
export function Spinner({ size = 20, label, className }: SpinnerProps) {
  return (
    <svg
      className={cx("sn-spinner", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
