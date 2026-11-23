import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./StatTile.css";

export type StatTileTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

export interface StatTileProps {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: StatTileTone;
  onClick?: () => void;
  className?: string;
}

/** Bloco de número compacto (StatTile do mika): rótulo espaçado, valor que sobe ao mudar, tom e clique opcional. */
export function StatTile({ label, value, hint, icon, tone = "neutral", onClick, className }: StatTileProps) {
  const Tag = onClick ? "button" : "div";
  const plain = typeof value === "string" || typeof value === "number";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      className={cx("sn-stattile", className)}
      data-tone={tone}
      onClick={onClick}
      aria-label={plain ? `${label}: ${value}` : undefined}
    >
      <span className="sn-stattile__label">
        {icon}
        {label}
      </span>
      <span key={plain ? String(value) : undefined} className="sn-stattile__value">
        {value}
      </span>
      {hint && <span className="sn-stattile__hint">{hint}</span>}
    </Tag>
  );
}
