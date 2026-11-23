import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Island.css";

export type IslandTone = "accent" | "violet" | "aqua" | "gold" | "success" | "warning" | "danger" | "info" | "neutral";

const TONE_VAR: Record<IslandTone, string> = {
  accent: "var(--sn-color-accent)",
  violet: "var(--sn-color-accent-2)",
  aqua: "var(--sn-color-aqua)",
  gold: "var(--sn-color-gold)",
  success: "var(--sn-color-success)",
  warning: "var(--sn-color-warning)",
  danger: "var(--sn-color-danger)",
  info: "var(--sn-color-info)",
  neutral: "var(--sn-color-text)",
};

/** Estilo inline que define a cor de destaque da ilha. */
export const islandTone = (tone: IslandTone) => ({ "--sn-island-tone": TONE_VAR[tone] }) as CSSProperties;

export interface IslandProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** `chip` = mini pílula (ícone + valor); `pill` = uma linha; `card` = expandida, com corpo. */
  size?: "chip" | "pill" | "card";
  /** Cor de destaque (valores, ícone, anéis). */
  tone?: IslandTone;
  /** Ícone, avatar ou capa à esquerda. */
  leading?: ReactNode;
  /** Linha pequena acima do título (ex.: "celular", "BTC"). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Linha abaixo do título (ex.: artista). */
  subtitle?: ReactNode;
  /** Valor, ações ou indicador à direita. */
  trailing?: ReactNode;
  /** Atualizações são anunciadas por leitor de tela (`role="status"`). */
  live?: boolean;
  /** Corpo da ilha expandida. */
  children?: ReactNode;
}

/**
 * Ilha viva: pílula escura que mostra uma atividade em andamento (chamada, timer, música, rota).
 * É sempre escura, em qualquer tema, e herda a cor de destaque do tema dentro dela.
 */
export function Island({
  size = "pill",
  tone = "accent",
  leading,
  eyebrow,
  title,
  subtitle,
  trailing,
  live,
  children,
  className,
  style,
  ...rest
}: IslandProps) {
  const head = leading != null || eyebrow != null || title != null || subtitle != null || trailing != null;
  return (
    <div
      className={cx("sn-island", `sn-island--${size}`, className)}
      style={{ ...islandTone(tone), ...style }}
      role={live ? "status" : undefined}
      {...rest}
    >
      {head && (
        <div className="sn-island__head">
          {leading != null && <div className="sn-island__leading">{leading}</div>}
          {(eyebrow != null || title != null || subtitle != null) && (
            <div className="sn-island__text">
              {eyebrow != null && <div className="sn-island__eyebrow">{eyebrow}</div>}
              {title != null && <div className="sn-island__title">{title}</div>}
              {subtitle != null && <div className="sn-island__subtitle">{subtitle}</div>}
            </div>
          )}
          {trailing != null && <div className="sn-island__trailing">{trailing}</div>}
        </div>
      )}
      {children != null && <div className="sn-island__body">{children}</div>}
    </div>
  );
}

export interface IslandActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Obrigatório: o botão só tem ícone. */
  "aria-label": string;
  tone?: IslandTone;
  /** `solid` = cor cheia (atender); `soft` = cor translúcida (pausar); `plain` = cinza. */
  appearance?: "solid" | "soft" | "plain";
  /** Anel pulsante para chamar atenção (chamada recebida). */
  pulse?: boolean;
  size?: number;
}

/** Botão redondo das ilhas (atender, recusar, pausar, parar). Alvo mínimo de 44px. */
export function IslandAction({
  tone = "neutral",
  appearance = "soft",
  pulse,
  size = 44,
  className,
  style,
  type = "button",
  ...rest
}: IslandActionProps) {
  return (
    <button
      type={type}
      className={cx(
        "sn-island-action",
        `sn-island-action--${appearance}`,
        pulse && "sn-island-action--pulse",
        className,
      )}
      style={{ ...islandTone(tone), "--sn-ia-size": `${size}px`, ...style } as CSSProperties}
      {...rest}
    />
  );
}

export interface IslandChipProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  value: ReactNode;
  tone?: IslandTone;
  /** Texto para leitor de tela, ex.: "Voo em 46 minutos". */
  label: string;
}

/** Mini ilha: ícone + valor na cor do tom. */
export function IslandChip({ icon, value, tone = "accent", label, className, ...rest }: IslandChipProps) {
  return (
    <Island
      size="chip"
      tone={tone}
      role="img"
      aria-label={label}
      leading={<span className="sn-island__tone">{icon}</span>}
      trailing={<span className="sn-island__value sn-island__tone">{value}</span>}
      className={className}
      {...rest}
    />
  );
}

/** mm:ss (ou h:mm:ss) para tempos das ilhas. */
export function clock(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}
