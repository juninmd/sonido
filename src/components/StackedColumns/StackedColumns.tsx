import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { seriesTone, type Tone, toneVar } from "../../utils/tone";
import { Legend } from "../Legend";
import { stackedLayout } from "./stackedLayout";
import "./StackedColumns.css";

export interface StackedSeries {
  label: string;
  tone?: Tone;
}

export interface StackedDatum {
  /** Rótulo da categoria (eixo X). */
  label: string;
  /** Um valor por série, na ordem de `series`; o primeiro fica na base. */
  values: number[];
}

export interface StackedColumnsProps {
  data: StackedDatum[];
  series: StackedSeries[];
  /** Título acessível; também vira a legenda da tabela oculta. */
  label: string;
  format?: (n: number) => string;
  /** Altura da área de plotagem, em px. */
  height?: number;
  /** Mostra a legenda das séries abaixo do gráfico. */
  legend?: boolean;
  className?: string;
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Colunas empilhadas (N séries por categoria) em CSS, com eixo, legenda e tabela oculta para leitores de tela. */
export function StackedColumns({
  data,
  series,
  label,
  format = String,
  height = 200,
  legend = true,
  className,
}: StackedColumnsProps) {
  const { ticks, max, columns, peak } = stackedLayout(data.map((d) => series.map((_, s) => d.values[s] ?? 0)));
  const tones = series.map((s, i) => seriesTone(i, s.tone));
  return (
    <figure
      className={cx("sn-stacked", className)}
      style={{ "--sn-stacked-h": `${height}px`, "--sn-stacked-cols": Math.max(1, data.length) } as Vars}
    >
      <div className="sn-stacked__chart" aria-hidden>
        <div className="sn-stacked__plot">
          <div className="sn-stacked__grid">
            {ticks.map((t) => (
              <span key={t} className="sn-stacked__tick" style={{ "--sn-at": t / max } as Vars}>
                <i>{format(t)}</i>
              </span>
            ))}
          </div>
          <div className="sn-stacked__cols">
            {columns.map((col, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
              <div key={i} className="sn-stacked__col" style={{ "--sn-i": i } as Vars}>
                {col.segments.map((s) => (
                  <div
                    key={s.series}
                    className={cx("sn-stacked__seg", s.cap && "sn-stacked__seg--cap")}
                    style={{ "--sn-v": s.value / max, background: toneVar(tones[s.series] as Tone) } as Vars}
                    title={`${data[i]?.label}, ${series[s.series]?.label}: ${format(s.value)}`}
                  />
                ))}
                {i === peak && <span className="sn-stacked__total">{format(col.total)}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="sn-stacked__x">
          {data.map((d, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
            <span key={`${i}-${d.label}`}>{d.label}</span>
          ))}
        </div>
      </div>
      {legend && <Legend items={series.map((s, i) => ({ label: s.label, tone: tones[i] }))} />}
      <table className="sn-visually-hidden">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Categoria</th>
            {series.map((s, j) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
              <th key={`${j}-${s.label}`} scope="col">
                {s.label}
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
            <tr key={`${i}-${d.label}`}>
              <th scope="row">{d.label}</th>
              {series.map((s, j) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; ordem fixa
                <td key={`${j}-${s.label}`}>{format(d.values[j] ?? 0)}</td>
              ))}
              <td>{format(columns[i]?.total ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
