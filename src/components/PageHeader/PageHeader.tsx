import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./PageHeader.css";

export interface PageHeaderProps {
  title: string;
  icon?: ReactNode;
  /** Fatos rápidos em Badge (estado, categoria, contagem). */
  pills?: ReactNode;
  description?: ReactNode;
  /** Antes do ícone (ex.: botão voltar). */
  leading?: ReactNode;
  actions?: ReactNode;
  /** Grade de StatTile à direita: o retrato numérico da página. */
  aside?: ReactNode;
  /** Linha de contexto com ícone de info no rodapé. */
  note?: ReactNode;
  children?: ReactNode;
  /** Elemento do título. Use `h1` quando o cabeçalho for o título principal da página. */
  titleAs?: "h1" | "h2";
  /** Lavada radial do acento + brilho no ícone (PageHero do mika). */
  accent?: boolean;
  className?: string;
}

/** Cabeçalho canônico de página (PageHero do mika): ícone, pílulas, título, ações e números. */
export function PageHeader({
  title,
  icon,
  pills,
  description,
  leading,
  actions,
  aside,
  note,
  children,
  titleAs: Title = "h2",
  accent = false,
  className,
}: PageHeaderProps) {
  return (
    <section className={cx("sn-pagehead", accent && "sn-pagehead--accent", className)} aria-label={title}>
      <div className="sn-pagehead__top">
        <div className="sn-pagehead__id">
          {leading}
          {icon && (
            <span className="sn-pagehead__icon" aria-hidden>
              {icon}
            </span>
          )}
          <div className="sn-pagehead__text">
            {pills && <div className="sn-pagehead__pills">{pills}</div>}
            <Title className="sn-pagehead__title">{title}</Title>
            {description && <p className="sn-pagehead__desc">{description}</p>}
          </div>
        </div>
        {actions && <div className="sn-pagehead__actions">{actions}</div>}
        {aside && <div className="sn-pagehead__aside">{aside}</div>}
      </div>
      {children}
      {note && (
        <p className="sn-pagehead__note">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 11v6M12 7.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>{note}</span>
        </p>
      )}
    </section>
  );
}
