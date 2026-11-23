import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import "./Badge.css";

export type BadgeTone = "neutral" | "accent" | "violet" | "aqua" | "gold" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** `soft` = pílula tingida; `solid` = preenchida. */
  appearance?: "soft" | "solid";
  /** Mostra um ponto de status antes do texto. */
  dot?: boolean;
  /** Estado ao vivo: o ponto emite um pulso (StatusPill do mika). */
  live?: boolean;
}

/** Pílula para status, contagem e categoria. */
export function Badge({ tone = "neutral", appearance = "soft", dot, live, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("sn-badge", `sn-badge--${tone}`, `sn-badge--${appearance}`, className)} {...rest}>
      {(dot || live) && <span className="sn-badge__dot" data-live={live || undefined} aria-hidden />}
      {children}
    </span>
  );
}
