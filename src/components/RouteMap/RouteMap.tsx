import { type CSSProperties, useId } from "react";
import { cx } from "../../utils/cx";
import "./RouteMap.css";

export type Traffic = "free" | "slow" | "jam" | "stop";

export interface RouteSegment {
  /** Pontos [x, y] no espaço 0–100. */
  points: [number, number][];
  traffic: Traffic;
}

export interface MapPin {
  id: string;
  at: [number, number];
  label: string;
  kind?: "home" | "work" | "incident" | "place";
}

export interface RouteMapProps {
  segments: RouteSegment[];
  /** Onde você está: ponto com anel pulsante. */
  me?: [number, number];
  pins?: MapPin[];
  selected?: string;
  onSelectPin?: (id: string) => void;
  /** Mostra o selo "ao vivo" piscando. */
  live?: boolean;
  label?: string;
  height?: number;
  className?: string;
}

const PIN_ICON: Record<NonNullable<MapPin["kind"]>, string> = { home: "⌂", work: "◼", incident: "!", place: "•" };

/**
 * Mapa de trajeto do canto-widget (aba Mapa): rota desenhada ao entrar, brilho, trechos coloridos
 * pelo trânsito, pino que cresce ao passar o mouse, ponto "você está aqui" com pulso e selo ao vivo.
 * O fundo é uma grade estilizada; troque por tiles reais via `className`/children se quiser.
 */
export function RouteMap({
  segments,
  me,
  pins = [],
  selected,
  onSelectPin,
  live = false,
  label = "Trajeto",
  height = 220,
  className,
}: RouteMapProps) {
  const gid = useId().replace(/:/g, "");
  const all = segments.flatMap((s) => s.points);
  const d = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <figure className={cx("sn-map", className)} style={{ height }} aria-label={label}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" overflow="visible" role="group" aria-label={label}>
        <defs>
          <pattern id={`g${gid}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8 0H0V8" className="sn-map__grid" />
          </pattern>
        </defs>
        <rect x="-200" y="-100" width="500" height="260" fill={`url(#g${gid})`} />
        <path d="M-200 44 L -5 40 C 20 35, 30 50, 55 42 S 90 20, 110 26 L 300 20" className="sn-map__road" />
        <path d="M30 -100 L 30 -5 C 32 20, 26 40, 34 70 L 34 160" className="sn-map__road" />
        <path d="M70 -100 L 70 -5 C 66 18, 74 44, 68 70 L 68 160" className="sn-map__road sn-map__road--minor" />
        <path d={d(all)} className="sn-map__glow" pathLength={1} />
        {segments.map((s) => (
          <path
            key={s.points.join()}
            d={d(s.points)}
            className="sn-map__route"
            data-traffic={s.traffic}
            pathLength={1}
          />
        ))}
        {pins.map((p) => (
          <g
            key={p.id}
            className={cx("sn-map__pin", selected === p.id && "is-on")}
            data-kind={p.kind ?? "place"}
            transform={`translate(${p.at[0]} ${p.at[1]}) scale(0.75)`}
            role="button"
            tabIndex={0}
            aria-label={p.label}
            aria-pressed={selected === p.id}
            onClick={() => onSelectPin?.(p.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelectPin?.(p.id)}
          >
            <path d="M0 0 C -3.2 -3.6 -3.6 -5 -3.6 -6.4 A 3.6 3.6 0 1 1 3.6 -6.4 C 3.6 -5 3.2 -3.6 0 0 Z" />
            <text y="-5.3" textAnchor="middle">
              {PIN_ICON[p.kind ?? "place"]}
            </text>
          </g>
        ))}
        {me && (
          <g transform={`translate(${me[0]} ${me[1]})`}>
            <circle r="3" className="sn-map__me-ring" />
            <circle r="1.6" className="sn-map__me" />
          </g>
        )}
      </svg>
      {live && (
        <figcaption className="sn-map__live">
          <i aria-hidden /> ao vivo
        </figcaption>
      )}
    </figure>
  );
}

export interface TrafficGaugeProps {
  /** Minutos de atraso sobre o normal. */
  delay: number;
  /** Tempo total, ex.: "32 min". */
  eta: string;
  label?: string;
  className?: string;
}

/** Medidor de trânsito: arco que varre e muda de cor conforme o atraso (map-gauge). */
export function TrafficGauge({ delay, eta, label = "Trânsito", className }: TrafficGaugeProps) {
  const traffic: Traffic = delay < 3 ? "free" : delay < 8 ? "slow" : delay < 15 ? "jam" : "stop";
  const k = Math.min(1, delay / 20);
  const arc = 2 * Math.PI * 26 * 0.75;
  return (
    <div
      className={cx("sn-gauge", className)}
      data-traffic={traffic}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={20}
      aria-valuenow={delay}
    >
      <svg viewBox="0 0 64 64" width="96" height="96" aria-hidden>
        <circle cx="32" cy="32" r="26" className="sn-gauge__track" strokeDasharray={`${arc} 999`} />
        <circle
          cx="32"
          cy="32"
          r="26"
          className="sn-gauge__fill"
          style={{ "--a": `${Math.max(0.02, k) * arc}px` } as CSSProperties}
        />
      </svg>
      <span className="sn-gauge__value">
        <strong>{eta}</strong>
        <small>{delay > 0 ? `+${delay} min` : "livre"}</small>
      </span>
    </div>
  );
}
