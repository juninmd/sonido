import { type ReactNode, useRef } from "react";
import { cx } from "../../utils/cx";
import { useCanvasLoop } from "../../utils/useCanvasLoop";
import { type AlertScene, SCENES, seedScene } from "./scenes";
import "./AlertCard.css";

export type { AlertScene };
/** `warning` e `neutral` seguem o vocabulário comum de tons; `warn` e `muted` continuam aceitos (obsoletos). */
export type AlertTone = "danger" | "warning" | "accent" | "neutral" | "warn" | "muted";
export type AlertEnter = "drop" | "shake" | "gust" | "rise" | "frost" | "mist" | "glow";

const TONE_RGB: Record<AlertTone, string> = {
  danger: "251,113,133",
  warn: "251,191,36",
  accent: "106,168,255",
  muted: "148,163,184",
  warning: "251,191,36",
  neutral: "148,163,184",
};

/** Entrada e cena sugeridas por tipo de alerta (alertFxSpec do canto-widget). */
export const ALERT_PRESETS = {
  meeting: { scene: "calendar", enter: "rise", sky: "#1e3a5f" },
  task: { scene: "ticks", enter: "drop", sky: "#14532d" },
  ciFail: { scene: "bugs", enter: "shake", sky: "#4a1d2a" },
  conflict: { scene: "branches", enter: "gust", sky: "#4a1d2a" },
  approved: { scene: "sparks", enter: "glow", sky: "#14532d" },
  mention: { scene: "bubbles", enter: "rise", sky: "#25384f" },
  status: { scene: "pulse", enter: "drop", sky: "#4a3418" },
  morning: { scene: "rays", enter: "mist", sky: "#5a3a12" },
  rain: { scene: "rain", enter: "drop", sky: "#1e3a5f" },
  flood: { scene: "flood", enter: "drop", sky: "#0f2540" },
  storm: { scene: "storm", enter: "shake", sky: "#1e1b4b" },
  snow: { scene: "snow", enter: "frost", sky: "#3b4a63" },
  cold: { scene: "cold", enter: "frost", sky: "#1e3a5f" },
  heat: { scene: "heat", enter: "rise", sky: "#5a2a12" },
  dry: { scene: "dry", enter: "mist", sky: "#5a3a12" },
  wind: { scene: "wind", enter: "gust", sky: "#14403a" },
  uv: { scene: "uv", enter: "glow", sky: "#4a2a5e" },
  smoke: { scene: "smoke", enter: "mist", sky: "#3a3330" },
  fog: { scene: "fog", enter: "mist", sky: "#334155" },
} satisfies Record<string, { scene: AlertScene; enter: AlertEnter; sky: string }>;

export interface AlertCardProps {
  title: ReactNode;
  children?: ReactNode;
  /** Ícone ou emoji à esquerda. */
  icon?: ReactNode;
  /** Hora/meta à direita do título. */
  meta?: ReactNode;
  scene?: AlertScene;
  enter?: AlertEnter;
  tone?: AlertTone;
  /** Cor do céu atrás do cartão. */
  sky?: string;
  /** Grave: anel pulsante, vinheta de alarme e cena mais intensa. */
  severe?: boolean;
  actions?: ReactNode;
  className?: string;
}

/**
 * Notificação viva do canto-widget: cada tipo chega de um jeito (cai, treme, rajada, sobe, geada, névoa, brilho)
 * e espera com uma cena animada atrás (agenda, tarefas, CI, PR, clima…). Sem cena com reduced-motion.
 */
export function AlertCard({
  title,
  children,
  icon,
  meta,
  scene = "bubbles",
  enter = "rise",
  tone = "accent",
  sky,
  severe = false,
  actions,
  className,
}: AlertCardProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useCanvasLoop(canvas, () => {
    let st = seedScene(scene, 0, 0, severe);
    const flash = () =>
      canvas.current?.animate?.(
        [{ filter: "brightness(1.9)" }, { filter: "none" }, { filter: "brightness(1.4)" }, { filter: "none" }],
        { duration: 420 },
      );
    return {
      stillFrame: false,
      setup: (w, h) => {
        st = seedScene(scene, w, h, severe);
      },
      draw: (f) => SCENES[scene]({ ...f, st, rgb: TONE_RGB[tone], hot: severe, flash }),
    };
  }, [scene, tone, severe]);
  return (
    <div
      ref={root}
      role={severe ? "alert" : "status"}
      className={cx("sn-alertcard", className)}
      data-enter={enter}
      data-tone={tone === "warning" ? "warn" : tone === "neutral" ? "muted" : tone}
      data-severe={severe || undefined}
      style={sky ? ({ "--sn-ac-sky": sky } as React.CSSProperties) : undefined}
    >
      <canvas ref={canvas} className="sn-alertcard__fx" aria-hidden />
      {severe && <span className="sn-alertcard__alarm" aria-hidden />}
      {icon && <span className="sn-alertcard__icon">{icon}</span>}
      <div className="sn-alertcard__body">
        <div className="sn-alertcard__head">
          <strong>{title}</strong>
          {meta && <span className="sn-alertcard__meta">{meta}</span>}
        </div>
        {children && <div className="sn-alertcard__text">{children}</div>}
        {actions && <div className="sn-alertcard__actions">{actions}</div>}
      </div>
    </div>
  );
}
