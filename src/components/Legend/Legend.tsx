import { cx } from "../../utils/cx";
import { seriesTone, type Tone, toneVar } from "../../utils/tone";
import "./Legend.css";

export interface LegendItem {
  label: string;
  /** Cor da amostra; sem tom, segue a ordem padrão de séries. */
  tone?: Tone;
}

export interface LegendProps {
  items: LegendItem[];
  /** Nome acessível da lista. */
  label?: string;
  className?: string;
}

/** Legenda de gráfico: amostra de cor + rótulo, na ordem das séries. */
export function Legend({ items, label = "Legenda", className }: LegendProps) {
  return (
    <ul className={cx("sn-legend", className)} aria-label={label}>
      {items.map((it, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
        <li key={`${i}-${it.label}`} className="sn-legend__item">
          <span className="sn-legend__swatch" style={{ background: toneVar(seriesTone(i, it.tone)) }} aria-hidden />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
