import { useId } from "react";
import { cx } from "../../utils/cx";
import "./Sparkline.css";

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  /** Área preenchida sob a linha. */
  area?: boolean;
  /** Rótulo acessível; sem ele o gráfico é decorativo. */
  label?: string;
  tone?: "signature" | "accent" | "aqua" | "success" | "danger";
  className?: string;
}

/** Minigráfico de linha com área em gradiente e ponto final destacado. */
export function Sparkline({
  data,
  width = 120,
  height = 36,
  area = true,
  label,
  tone = "signature",
  className,
}: SparklineProps) {
  const gid = `sn-spark-${useId().replace(/:/g, "")}`;
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = 3;
  const x = (i: number) => pad + (i / (data.length - 1)) * (width - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2);
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = data[data.length - 1];
  return (
    <svg
      className={cx("sn-spark", `sn-spark--${tone}`, className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${gid}-s`} x1="0" x2="1">
          <stop offset="0" className="sn-spark__s1" />
          <stop offset="1" className="sn-spark__s2" />
        </linearGradient>
        <linearGradient id={`${gid}-a`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" className="sn-spark__a1" />
          <stop offset="1" className="sn-spark__a2" />
        </linearGradient>
      </defs>
      {area && <path d={`${line} L${x(data.length - 1)},${height} L${x(0)},${height} Z`} fill={`url(#${gid}-a)`} />}
      <path
        className="sn-spark__line"
        d={line}
        fill="none"
        stroke={`url(#${gid}-s)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <circle className="sn-spark__end" cx={x(data.length - 1)} cy={y(last)} r="3" />
    </svg>
  );
}
