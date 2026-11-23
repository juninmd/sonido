import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./Heatmap.css";

/** Quatro cortes por quantil: um dia extremo não achata a escala (franca-segura). */
export function quantileThresholds(values: number[]): number[] {
  const v = values.filter((x) => x > 0).sort((a, b) => a - b);
  if (!v.length) return [1, 1, 1, 1];
  return [0.2, 0.45, 0.7, 0.9].map((q) => v[Math.min(v.length - 1, Math.floor(q * v.length))]);
}

export interface HeatmapProps {
  /** Linhas × colunas (ex.: 7 dias × 24 horas). */
  data: number[][];
  rowLabels?: string[];
  colLabels?: string[];
  /** Mostra rótulo a cada N colunas. */
  colEvery?: number;
  label: string;
  format?: (v: number, row: number, col: number) => string;
  className?: string;
}

/** Mapa de calor em cinco faixas de uma matiz, com entrada escalonada (franca-segura + canto-heat). */
export function Heatmap({
  data,
  rowLabels,
  colLabels,
  colEvery = 3,
  label,
  format = (v) => String(v),
  className,
}: HeatmapProps) {
  const th = quantileThresholds(data.flat());
  const level = (v: number) => (v <= 0 ? 0 : 1 + th.filter((t) => v > t).length);
  const cols = data[0]?.length ?? 0;
  return (
    <figure className={cx("sn-heat", className)} aria-label={label} style={{ "--cols": cols } as CSSProperties}>
      <div className="sn-heat__grid" role="table" aria-label={label}>
        {data.map((row, r) => (
          // biome-ignore lint/a11y/useFocusableInteractive: tabela estática, linhas não são interativas
          // biome-ignore lint/suspicious/noArrayIndexKey: grade fixa
          <div key={r} className="sn-heat__row" role="row">
            {rowLabels && <span className="sn-heat__rl">{rowLabels[r]}</span>}
            {row.map((v, c) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: grade fixa
                key={c}
                role="cell"
                className="sn-heat__cell"
                data-l={Math.min(4, level(v))}
                title={`${rowLabels?.[r] ?? r} ${colLabels?.[c] ?? c}: ${format(v, r, c)}`}
                style={{ "--i": r * 3 + c } as CSSProperties}
              />
            ))}
          </div>
        ))}
        {colLabels && (
          <div className="sn-heat__row sn-heat__cols" aria-hidden>
            {rowLabels && <span className="sn-heat__rl" />}
            {colLabels.map((l, c) => (
              <span key={l}>{c % colEvery === 0 ? l : ""}</span>
            ))}
          </div>
        )}
      </div>
      <figcaption className="sn-heat__legend">
        menos{" "}
        {[0, 1, 2, 3, 4].map((l) => (
          <i key={l} data-l={l} />
        ))}{" "}
        mais
      </figcaption>
    </figure>
  );
}
