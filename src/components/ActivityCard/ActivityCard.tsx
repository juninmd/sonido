import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { type Tone, toneVar } from "../../utils/tone";
import "./ActivityCard.css";

export interface ActivityCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** `compact` = uma linha; `expanded` = com corpo abaixo do cabeçalho. */
  size?: "compact" | "expanded";
  /** Cor da atividade: ícone, valores e destaques. */
  tone?: Tone;
  /** Ícone, avatar ou capa à esquerda. */
  leading?: ReactNode;
  title?: ReactNode;
  /** Linha abaixo do título (artista, rua, origem da chamada). */
  subtitle?: ReactNode;
  /** Valor, ações ou indicador à direita. */
  trailing?: ReactNode;
  /** Atualizações são anunciadas por leitor de tela (`role="status"`). */
  live?: boolean;
  /** Corpo do card expandido. */
  children?: ReactNode;
}

/**
 * Atividade em andamento (chamada, timer, música, rota, entrega) num card do Sonido.
 * Segue o tema: superfície, borda e raio do `Card`, com a cor do `tone` no ícone e nos valores.
 */
export function ActivityCard({
  size = "compact",
  tone = "accent",
  leading,
  title,
  subtitle,
  trailing,
  live,
  children,
  className,
  style,
  ...rest
}: ActivityCardProps) {
  const head = leading != null || title != null || subtitle != null || trailing != null;
  return (
    <div
      className={cx("sn-activity", `sn-activity--${size}`, className)}
      style={{ "--sn-activity-tone": toneVar(tone), ...style } as CSSProperties}
      role={live ? "status" : undefined}
      {...rest}
    >
      {head && (
        <div className="sn-activity__head">
          {leading != null && <div className="sn-activity__leading">{leading}</div>}
          {(title != null || subtitle != null) && (
            <div className="sn-activity__text">
              {title != null && <div className="sn-activity__title">{title}</div>}
              {subtitle != null && <div className="sn-activity__subtitle">{subtitle}</div>}
            </div>
          )}
          {trailing != null && <div className="sn-activity__trailing">{trailing}</div>}
        </div>
      )}
      {children != null && <div className="sn-activity__body">{children}</div>}
    </div>
  );
}

/** Ícone num quadrado tingido com a cor da atividade (mesmo desenho do ícone do PageHeader). */
export function ActivityIcon({ children }: { children: ReactNode }) {
  return (
    <span className="sn-activity__icon" aria-hidden="true">
      {children}
    </span>
  );
}
