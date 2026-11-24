import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
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
  className?: string;
}

/** Destaque de página com título que sobe palavra por palavra (games-gallery). */
export function Hero({ title, meta, actions, backdrop, aside, className }: HeroProps) {
  return (
    <section className={cx("sn-hero", className)}>
      <div className="sn-hero__backdrop" aria-hidden>
        {backdrop ? <img src={backdrop} alt="" /> : <div className="sn-hero__ambient" />}
      </div>
      <div className="sn-hero__shade" aria-hidden />
      <div className="sn-hero__copy">
        <h1 className="sn-hero__title" aria-label={title}>
          {title.split(" ").map((w, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: palavras na ordem fixa
            <span key={i} aria-hidden style={{ animationDelay: `${i * 70}ms` }}>
              {w}&nbsp;
            </span>
          ))}
        </h1>
        {meta && <div className="sn-hero__meta">{meta}</div>}
        {actions && <div className="sn-hero__actions">{actions}</div>}
      </div>
      {aside && <div className="sn-hero__aside">{aside}</div>}
    </section>
  );
}
