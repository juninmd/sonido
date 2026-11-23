import { cx } from "../../utils/cx";
import "./BarChart.css";

export interface BarDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarDatum[];
  /** Título acessível; também vira a legenda da tabela oculta. */
  label: string;
  format?: (n: number) => string;
  /** `columns` (vertical) ou `bars` (horizontal). */
  orientation?: "columns" | "bars";
  height?: number;
  className?: string;
}

/** Gráfico de barras só com CSS (nerd-watch): texto nítido, marcas focáveis e tabela para leitores de tela. */
export function BarChart({
  data,
  label,
  format = String,
  orientation = "columns",
  height = 160,
  className,
}: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <figure
      className={cx("sn-chart", `sn-chart--${orientation}`, className)}
      style={{ ["--sn-chart-h" as string]: `${height}px` }}
    >
      <div className="sn-chart__plot" aria-hidden>
        {data.map((d) => (
          <div key={d.label} className="sn-chart__item" data-tip={`${d.label}: ${format(d.value)}`}>
            <div className="sn-chart__track">
              <div className="sn-chart__bar" style={{ ["--sn-v" as string]: d.value / max }} />
            </div>
            <span className="sn-chart__label">{d.label}</span>
            <span className="sn-chart__value">{format(d.value)}</span>
          </div>
        ))}
      </div>
      <table className="sn-visually-hidden">
        <caption>{label}</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{format(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
