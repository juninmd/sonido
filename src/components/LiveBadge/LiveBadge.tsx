import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./LiveBadge.css";

export interface LiveBadgeProps {
  /** Ao vivo: ponto vermelho pulsando. */
  live?: boolean;
  label?: string;
  offLabel?: string;
  className?: string;
}

/** Selo "AO VIVO" com o ponto de tally (treta-aovivo / eleicoes-radar). */
export function LiveBadge({ live = true, label = "Ao vivo", offLabel = "Parado", className }: LiveBadgeProps) {
  return (
    <span className={cx("sn-live", className)} data-live={live || undefined}>
      <i aria-hidden />
      {live ? label : offLabel}
    </span>
  );
}

export interface EqualizerProps {
  /** Cor das barras (ex.: cor de quem fala). */
  color?: string;
  /** Ativo = barras dançando; parado = barras baixas visíveis. */
  active?: boolean;
  label?: string;
  className?: string;
}

/** Indicador de fala (onda de 4 barras) do treta-aovivo; com reduced-motion as barras ficam paradas, não somem. */
export function Equalizer({ color, active = true, label, className }: EqualizerProps) {
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: aria-label só é passado junto com role="img"
    <span
      className={cx("sn-eq", className)}
      data-active={active || undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={color ? ({ "--sn-eq": color } as CSSProperties) : undefined}
    >
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
