import { type CSSProperties, type ReactNode, useState } from "react";
import { cx } from "../../utils/cx";
import { hueFrom, initials } from "../../utils/hue";
import "./Artwork.css";

export interface ArtworkProps {
  title: string;
  src?: string;
  /** Proporção da capa. */
  ratio?: "poster" | "square" | "wide";
  /** Selo no canto (ex.: plataforma, nota). */
  badge?: ReactNode;
  className?: string;
}

/** Arte (capa, pôster) com fade-in e placeholder em gradiente de cor estável derivada do título (nerd-watch + games-gallery). */
export function Artwork({ title, src, ratio = "poster", badge, className }: ArtworkProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const style = { "--sn-artwork-h": hueFrom(title) } as CSSProperties;
  const showImg = src && !failed;
  return (
    <div className={cx("sn-artwork", `sn-artwork--${ratio}`, className)} style={style}>
      {(!showImg || !loaded) && (
        <div className="sn-artwork__placeholder" aria-hidden>
          <span className="sn-artwork__initials">{initials(title)}</span>
        </div>
      )}
      {showImg && (
        <img
          className={cx("sn-artwork__img", loaded && "sn-artwork__img--in")}
          src={src}
          alt={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {!showImg && <span className="sn-visually-hidden">{title}</span>}
      {badge && <span className="sn-artwork__badge">{badge}</span>}
    </div>
  );
}
