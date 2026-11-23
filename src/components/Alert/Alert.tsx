import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Alert.css";

export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children?: ReactNode;
  /** Ação à direita, ex.: botão "Tentar de novo". */
  action?: ReactNode;
  className?: string;
}

const ICON: Record<NonNullable<AlertProps["tone"]>, string> = {
  info: "M12 8h.01M11 12h1v5h1",
  success: "m7 12.5 3 3 7-7",
  warning: "M12 8v5m0 3h.01",
  danger: "M12 8v5m0 3h.01",
};

/** Mensagem em linha. `danger` usa `role="alert"`; os demais, `role="status"`. */
export function Alert({ tone = "info", title, children, action, className }: AlertProps) {
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cx("sn-alert", `sn-alert--${tone}`, className)}>
      <svg className="sn-alert__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d={ICON[tone]}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="sn-alert__text">
        {title && <p className="sn-alert__title">{title}</p>}
        {children && <div className="sn-alert__body">{children}</div>}
      </div>
      {action && <div className="sn-alert__action">{action}</div>}
    </div>
  );
}
