import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Stamp.css";

export type StampTone = "true" | "false" | "misleading" | "imprecise" | "none" | "pending" | "winner";

export interface StampProps {
  tone: StampTone;
  children: ReactNode;
  /** Bate o carimbo ao aparecer. */
  slam?: boolean;
  className?: string;
}

/** Carimbo de veredito (treta-aovivo) e selo de vencedor (eleicoes-radar). */
export function Stamp({ tone, children, slam = true, className }: StampProps) {
  return (
    <span className={cx("sn-stamp", className)} data-tone={tone} data-slam={slam || undefined}>
      {children}
    </span>
  );
}
