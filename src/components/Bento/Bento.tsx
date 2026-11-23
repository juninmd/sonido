import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Bento.css";

export interface BentoProps {
  /** `auto` = flex que quebra, cada item com base 260px (sem trilhas vazias). */
  cols?: 1 | 2 | 3 | "auto";
  minItem?: number;
  children: ReactNode;
  className?: string;
}

/** Grade bento (BentoGrid do mika). Itens podem ocupar 2 colunas com `.sn-bento__wide`. */
export function Bento({ cols = "auto", minItem = 260, children, className }: BentoProps) {
  return (
    <div
      className={cx("sn-bento", className)}
      data-cols={cols}
      style={{ "--sn-bento-min": `${minItem}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
