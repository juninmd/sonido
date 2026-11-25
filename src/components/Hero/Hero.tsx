import { type ReactNode, useRef } from "react";
import { cx } from "../../utils/cx";
import { type StickyOffset, useHeroCollapse } from "./collapse";
import "./Hero.css";

export interface HeroProps {
  title: string;
  /** Linha de metadados (gênero, ano, horas…). */
  meta?: ReactNode;
  /** Botões de ação. */
  actions?: ReactNode;
  /** Imagem de fundo desfocada; sem ela, usa o ambiente do tema. */
  backdrop?: string;
  /** Conteúdo à direita (capa, anel de progresso). */
  aside?: ReactNode;
  /** Capa ao lado do título, ex.: `<Artwork />`. */
  poster?: ReactNode;
  /** Conteúdo sob os metadados, ex.: sinopse. */
  children?: ReactNode;
  /**
   * Fica sticky e encolhe com o scroll até sobrar uma faixa de `collapsedHeight` px.
   * Expõe o progresso 0..1 em `--sn-hero-p` e ganha `sn-hero--collapsed` no fim.
   */
  collapsible?: boolean;
  /** Altura da faixa que continua visível quando recolhido. */
  collapsedHeight?: number;
  /** Distância do topo em px (ex.: altura da barra do app), ou função que a mede. */
  stickyOffset?: StickyOffset;
  className?: string;
}

/** Destaque de página com título que sobe palavra por palavra (games-gallery). */
export function Hero({
  title,
  meta,
  actions,
  backdrop,
  aside,
  poster,
  children,
  collapsible = false,
  collapsedHeight = 132,
  stickyOffset,
  className,
}: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const collapsed = useHeroCollapse(root, collapsible, collapsedHeight, stickyOffset);
  const heading = (
    <h1 className="sn-hero__title" aria-label={title}>
      {title.split(" ").map((w, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: palavras na ordem fixa
        <span key={i} aria-hidden style={{ animationDelay: `${i * 70}ms` }}>
          {w}&nbsp;
        </span>
      ))}
    </h1>
  );
  return (
    <section
      ref={root}
      className={cx("sn-hero", collapsible && "sn-hero--collapsible", collapsed && "sn-hero--collapsed", className)}
    >
      <div className="sn-hero__backdrop" aria-hidden>
        {backdrop ? <img src={backdrop} alt="" /> : <div className="sn-hero__ambient" />}
      </div>
      <div className="sn-hero__shade" aria-hidden />
      <div className="sn-hero__copy">
        {poster ? (
          <div className="sn-hero__lead">
            <div className="sn-hero__poster">{poster}</div>
            {heading}
          </div>
        ) : (
          heading
        )}
        {meta && <div className="sn-hero__meta">{meta}</div>}
        {children && <div className="sn-hero__body">{children}</div>}
        {actions && <div className="sn-hero__actions">{actions}</div>}
      </div>
      {aside && <div className="sn-hero__aside">{aside}</div>}
    </section>
  );
}
