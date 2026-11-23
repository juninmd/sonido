import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./ToggleCard.css";

export interface ToggleCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Texto pequeno em mono (ex.: modelo, porta). */
  detail?: string;
  /** Rótulos de estado. */
  onLabel?: string;
  offLabel?: string;
  className?: string;
}

/** Cartão que liga/desliga um recurso inteiro (FeatureCard do mika): `aria-pressed`, ícone tinge e o check desenha. */
export function ToggleCard({
  title,
  description,
  icon,
  checked,
  onChange,
  detail,
  onLabel = "Ativo",
  offLabel = "Inativo",
  className,
}: ToggleCardProps) {
  return (
    <button
      type="button"
      className={cx("sn-togglecard", className)}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="sn-togglecard__icon" aria-hidden>
        {icon ?? <i />}
      </span>
      <span className="sn-togglecard__body">
        <span className="sn-togglecard__head">
          <strong>{title}</strong>
          <span className="sn-togglecard__state">{checked ? onLabel : offLabel}</span>
        </span>
        {description && <span className="sn-togglecard__desc">{description}</span>}
        {detail && <code className="sn-togglecard__detail">{detail}</code>}
      </span>
      <svg className="sn-togglecard__check" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.6 2.6L16.5 9" pathLength={1} />
      </svg>
    </button>
  );
}
