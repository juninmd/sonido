import { type HTMLAttributes, type PointerEvent, useRef } from "react";
import { cx } from "../../utils/cx";
import { useReducedMotion } from "../../utils/useReducedMotion";
import "./Card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `glass` = vidro com blur (games-gallery); `solid` = superfície opaca. */
  surface?: "glass" | "solid";
  /** Eleva no hover. */
  interactive?: boolean;
  /** Inclinação 3D + spotlight seguindo o ponteiro (games-gallery / nerd-watch). */
  tilt?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const MAX_TILT = 6;

/** Contêiner de conteúdo. Combine com `CardHeader`, `CardBody`, `CardFooter`. */
export function Card({
  surface = "glass",
  interactive = false,
  tilt = false,
  padding = "md",
  className,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const canTilt = tilt && !reduced;

  const move = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const el = ref.current;
    if (!canTilt || !el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--sn-rx", `${((0.5 - y) * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--sn-ry", `${((x - 0.5) * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--sn-mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--sn-my", `${(y * 100).toFixed(1)}%`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    const el = ref.current;
    if (!el) return;
    for (const p of ["--sn-rx", "--sn-ry", "--sn-mx", "--sn-my"]) el.style.removeProperty(p);
  };

  return (
    <div
      ref={ref}
      className={cx(
        "sn-card",
        `sn-card--${surface}`,
        `sn-card--pad-${padding}`,
        (interactive || canTilt) && "sn-card--interactive",
        canTilt && "sn-card--tilt",
        className,
      )}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    />
  );
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("sn-card__header", className)} {...rest} />;
}
export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("sn-card__title", className)} {...rest} />;
}
export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("sn-card__body", className)} {...rest} />;
}
export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("sn-card__footer", className)} {...rest} />;
}
