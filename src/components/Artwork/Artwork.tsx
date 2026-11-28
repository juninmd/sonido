import { type CSSProperties, type HTMLAttributeReferrerPolicy, type ReactNode, useMemo, useState } from "react";
import { cx } from "../../utils/cx";
import { hueFrom, initials } from "../../utils/hue";
import "./Artwork.css";

export interface ArtworkProps {
  title: string;
  src?: string;
  /**
   * Imagens de reserva, tentadas em ordem quando a anterior falha.
   * Aceita uma URL ou uma lista; sem nenhuma que carregue, fica o gradiente com as iniciais.
   */
  fallbackSrc?: string | string[];
  /** Proporção da capa. */
  ratio?: "poster" | "square" | "wide";
  /** Selo no canto (ex.: plataforma, nota). */
  badge?: ReactNode;
  /** Repassado ao `<img>`, ex.: `"no-referrer"` para CDNs que bloqueiam hotlink. */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  className?: string;
}

interface Chain {
  /** Chave da cadeia: quando o `src` muda, o estado é reiniciado. */
  src?: string;
  index: number;
  loaded: boolean;
  exhausted: boolean;
}

/** Arte (capa, pôster) com fade-in e placeholder em gradiente de cor estável derivada do título (nerd-watch + games-gallery). */
export function Artwork({ title, src, fallbackSrc, ratio = "poster", badge, referrerPolicy, className }: ArtworkProps) {
  const sources = useMemo(() => {
    const list = [src, ...(Array.isArray(fallbackSrc) ? fallbackSrc : fallbackSrc ? [fallbackSrc] : [])];
    return list.filter((s): s is string => Boolean(s));
  }, [src, fallbackSrc]);
  const [chain, setChain] = useState<Chain>({ src, index: 0, loaded: false, exhausted: false });

  // Troca de capa: reinicia a cadeia de fallback no próprio render (estado derivado da prop).
  if (chain.src !== src) setChain({ src, index: 0, loaded: false, exhausted: false });

  const current = chain.exhausted ? undefined : sources[chain.index];
  const style = { "--sn-artwork-h": hueFrom(title) } as CSSProperties;
  const showImg = Boolean(current);
  return (
    <div className={cx("sn-artwork", `sn-artwork--${ratio}`, className)} style={style}>
      {(!showImg || !chain.loaded) && (
        <div className="sn-artwork__placeholder" aria-hidden>
          <span className="sn-artwork__initials">{initials(title)}</span>
        </div>
      )}
      {showImg && (
        <img
          className={cx("sn-artwork__img", chain.loaded && "sn-artwork__img--in")}
          src={current}
          alt={title}
          loading="lazy"
          referrerPolicy={referrerPolicy}
          onLoad={() => setChain((c) => ({ ...c, loaded: true }))}
          onError={() =>
            setChain((c) =>
              c.index + 1 < sources.length
                ? { ...c, index: c.index + 1, loaded: false }
                : { ...c, exhausted: true, loaded: false },
            )
          }
        />
      )}
      {!showImg && <span className="sn-visually-hidden">{title}</span>}
      {badge && <span className="sn-artwork__badge">{badge}</span>}
    </div>
  );
}
