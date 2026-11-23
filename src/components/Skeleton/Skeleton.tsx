import { cx } from "../../utils/cx";
import "./Skeleton.css";

export interface SkeletonProps {
  /** Texto anunciado aos leitores de tela. */
  label?: string;
  rows?: number;
  /** Mostra um bloco de mídia (capa/avatar) à esquerda. */
  media?: boolean;
  className?: string;
}

/** Placeholder com brilho enquanto o conteúdo carrega. */
export function Skeleton({ label = "Carregando…", rows = 3, media = false, className }: SkeletonProps) {
  return (
    <div role="status" aria-busy="true" className={cx("sn-skeleton", className)}>
      <span className="sn-visually-hidden">{label}</span>
      {media && <div className="sn-skeleton__media sn-shimmer" />}
      <div className="sn-skeleton__rows">
        {Array.from({ length: rows }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: linhas estáticas
          <div key={i} className="sn-skeleton__row sn-shimmer" style={{ width: `${100 - ((i * 17) % 45)}%` }} />
        ))}
      </div>
    </div>
  );
}
