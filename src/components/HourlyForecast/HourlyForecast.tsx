import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { WeatherIcon } from "../WeatherIcon";
import type { WeatherCondition } from "../WeatherSky/sky";
import "./HourlyForecast.css";

export interface HourlyItem {
  /** Rótulo da hora, ex.: "Agora", "13h". */
  time: ReactNode;
  condition: WeatherCondition;
  temp: number;
  night?: boolean;
  /** Chance de chuva 0–1 (aparece abaixo do ícone quando ≥ 0,2). */
  rain?: number;
}

export interface HourlyForecastProps {
  items: HourlyItem[];
  label?: string;
  className?: string;
}

/** Linha de previsão por hora com ícones animados. A primeira coluna fica destacada. */
export function HourlyForecast({ items, label = "Previsão por hora", className }: HourlyForecastProps) {
  return (
    <ol className={cx("sn-hourly", className)} aria-label={label}>
      {items.map((h, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: horas em ordem fixa
        <li key={i} className="sn-hourly__item" data-now={i === 0 || undefined}>
          <span className="sn-hourly__time">{h.time}</span>
          <WeatherIcon condition={h.condition} night={h.night} size={26} />
          {h.rain != null && h.rain >= 0.2 && <span className="sn-hourly__rain">{Math.round(h.rain * 100)}%</span>}
          <span className="sn-hourly__temp">{h.temp}°</span>
        </li>
      ))}
    </ol>
  );
}
