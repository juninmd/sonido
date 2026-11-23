import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type MotionEffect =
  | "rise"
  | "pop"
  | "stack"
  | "drop"
  | "slide"
  | "unfold"
  | "roll"
  | "grow-x"
  | "grow-y"
  | "draw"
  | "fade"
  | "ping"
  | "blink"
  | "glow"
  | "halo"
  | "float"
  | "wiggle"
  | "spin"
  | "shake"
  | "pass"
  | "star"
  | "bump"
  | "flash"
  | "tick-up"
  | "tick-down"
  | "exit-swipe"
  | "exit-archive"
  | "exit-trash"
  | "raise"
  | "lift"
  | "tilt"
  | "shimmer";

export interface MotionProps {
  effect: MotionEffect;
  /** Posição na sequência: atrasa a entrada (`--i`). */
  index?: number;
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Atalho para as classes `sn-m-*` de motion.css. Troque a `key` para tocar de novo. */
export function Motion({ effect, index, as: Tag = "span", children, className, style }: MotionProps) {
  return (
    <Tag
      className={cx(`sn-m-${effect}`, className)}
      style={index === undefined ? style : ({ "--i": index, ...style } as CSSProperties)}
    >
      {children}
    </Tag>
  );
}
