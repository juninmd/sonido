import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./AmbientBackdrop.css";

export interface AmbientBackdropProps {
  /** Duas cores do ambiente (ex.: tiradas da capa em foco). Padrão: as do tema. */
  colors?: [string, string];
  /** `fixed` cobre a viewport; `absolute` cobre o pai posicionado. */
  position?: "fixed" | "absolute";
  /** Deriva lenta das manchas (desliga com reduced-motion). */
  animated?: boolean;
  className?: string;
}

/** Fundo atmosférico com duas manchas de cor desfocadas e vinheta (games-gallery + nerd-watch). */
export function AmbientBackdrop({ colors, position = "fixed", animated = true, className }: AmbientBackdropProps) {
  const style = (colors ? { "--sn-amb-1": colors[0], "--sn-amb-2": colors[1] } : undefined) as
    | CSSProperties
    | undefined;
  return (
    <div
      aria-hidden
      className={cx("sn-ambient", `sn-ambient--${position}`, animated && "sn-ambient--animated", className)}
      style={style}
    />
  );
}
