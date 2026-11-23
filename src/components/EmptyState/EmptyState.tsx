import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./EmptyState.css";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  /** Ação principal, ex.: `<Button>Tentar de novo</Button>`. */
  action?: ReactNode;
  className?: string;
}

/** Estado vazio ou de erro recuperável, com ação opcional. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cx("sn-empty", className)}>
      {icon && (
        <div className="sn-empty__icon" aria-hidden>
          {icon}
        </div>
      )}
      <p className="sn-empty__title">{title}</p>
      {description && <p className="sn-empty__desc">{description}</p>}
      {action && <div className="sn-empty__action">{action}</div>}
    </div>
  );
}
