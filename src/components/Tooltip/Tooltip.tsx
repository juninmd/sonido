import { cloneElement, type ReactElement, type ReactNode, useId } from "react";
import { cx } from "../../utils/cx";
import "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  /** Um único elemento focável (botão, link). */
  children: ReactElement<{ "aria-describedby"?: string }>;
  side?: "top" | "bottom";
  className?: string;
}

/** Dica no hover e no foco, ligada por `aria-describedby`. Só CSS, sem portal. */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  return (
    <span className={cx("sn-tooltip", `sn-tooltip--${side}`, className)}>
      {cloneElement(children, { "aria-describedby": id })}
      <span role="tooltip" id={id} className="sn-tooltip__bubble">
        {content}
      </span>
    </span>
  );
}
