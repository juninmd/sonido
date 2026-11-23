import type { CSSProperties, ReactElement } from "react";
import { cx } from "../../utils/cx";
import type { WeatherCondition } from "../WeatherSky/sky";
import "./WeatherIcon.css";

const after = (d: string) => ({ "--d": d }) as CSSProperties;

const cloud = (fill: string) => (
  <g fill={fill}>
    <circle cx="24" cy="40" r="9" />
    <circle cx="35" cy="33" r="12" />
    <circle cx="47" cy="41" r="8" />
    <rect x="24" y="40" width="23" height="9" rx="4" />
  </g>
);

function Sun({ x = 32, y = 32, r = 10 }: { x?: number; y?: number; r?: number }) {
  return (
    <g>
      <g className="sn-wi-rays" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line key={deg} x1={x} y1={y - r - 4} x2={x} y2={y - r - 8} transform={`rotate(${deg} ${x} ${y})`} />
        ))}
      </g>
      <circle className="sn-wi-sun" cx={x} cy={y} r={r} fill="#fbbf24" />
    </g>
  );
}

function Moon({ x = 30, y = 30 }: { x?: number; y?: number }) {
  return (
    <g>
      <path
        d={`M${x + 8} ${y + 12}a14 14 0 1 1-10-23 11 11 0 0 0 10 23z`}
        fill="#e2e8f0"
        transform={`translate(${x - 30} ${y - 30})`}
      />
      <circle className="sn-wi-twinkle" cx={x + 14} cy={y - 12} r="1.6" fill="#fff" />
      <circle className="sn-wi-twinkle" style={after("1.1s")} cx={x + 20} cy={y - 4} r="1.1" fill="#fff" />
    </g>
  );
}

const drop = (x: number, delay: string) => (
  <line
    key={x}
    className="sn-wi-fall"
    style={after(delay)}
    x1={x}
    y1="50"
    x2={x - 2}
    y2="55"
    stroke="#7dd3fc"
    strokeWidth="2.4"
    strokeLinecap="round"
  />
);

export interface WeatherIconProps {
  condition: WeatherCondition;
  night?: boolean;
  size?: number;
  /** Rótulo para leitores de tela; sem ele o ícone é decorativo. */
  label?: string;
  className?: string;
}

/** Condição do tempo como uma pequena cena animada (canto-widget). `night` troca o sol pela lua. */
export function WeatherIcon({ condition, night = false, size = 32, label, className }: WeatherIconProps) {
  const sky = night ? <Moon x={26} y={24} /> : <Sun x={26} y={24} r={8} />;
  let art: ReactElement;
  switch (condition) {
    case "clear":
      art = night ? <Moon /> : <Sun />;
      break;
    case "cloudy":
      art = (
        <>
          {sky}
          <g className="sn-wi-drift">{cloud("#e2e8f0")}</g>
        </>
      );
      break;
    case "fog":
      art = (
        <>
          <g className="sn-wi-drift">{cloud("#cbd5e1")}</g>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              className="sn-wi-slide"
              style={after(`${i * 0.5}s`)}
              x1={16 + i * 3}
              y1={50 + i * 4}
              x2={46 + i * 3}
              y2={50 + i * 4}
              stroke="#e2e8f0"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
        </>
      );
      break;
    case "drizzle":
      art = (
        <>
          <g className="sn-wi-drift">{cloud("#cbd5e1")}</g>
          {drop(28, "0s")}
          {drop(38, "0.5s")}
        </>
      );
      break;
    case "rain":
      art = (
        <>
          <g className="sn-wi-drift">{cloud("#94a3b8")}</g>
          {drop(26, "0s")}
          {drop(35, "0.4s")}
          {drop(44, "0.8s")}
        </>
      );
      break;
    case "snow":
      art = (
        <>
          <g className="sn-wi-drift">{cloud("#cbd5e1")}</g>
          {[27, 36, 45].map((x, i) => (
            <circle key={x} className="sn-wi-fall" style={after(`${i * 0.45}s`)} cx={x} cy="52" r="2.2" fill="#fff" />
          ))}
        </>
      );
      break;
    case "storm":
      art = (
        <>
          <g className="sn-wi-drift">{cloud("#64748b")}</g>
          <path className="sn-wi-bolt" d="M35 44 28 54h6l-3 8 9-11h-6z" fill="#fde047" />
        </>
      );
      break;
  }
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cx("sn-wi", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {art}
    </svg>
  );
}
