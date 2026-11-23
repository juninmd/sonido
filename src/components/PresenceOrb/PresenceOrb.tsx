import { type CSSProperties, useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import "./PresenceOrb.css";

export type PresenceState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "confirming"
  | "error"
  | "offline"
  | "muted";

export interface PresenceOrbProps {
  state: PresenceState;
  /** Nível 0–1 (microfone ou voz). Função = lido a cada quadro, sem re-render. */
  level?: number | (() => number);
  label?: string;
  /** Mostra a palavra de estado ao lado. */
  showLabel?: boolean;
  onClick?: () => void;
  size?: number;
  className?: string;
}

const LABEL: Record<PresenceState, string> = {
  idle: "Pronta",
  listening: "Ouvindo",
  thinking: "Pensando",
  speaking: "Falando",
  confirming: "Confirmando",
  error: "Erro",
  offline: "Offline",
  muted: "Microfone desligado",
};
const BARS = [0.55, 0.85, 1, 0.75, 0.5];

/**
 * Orbe de presença do mika: um só indicador para "o que o assistente está fazendo".
 * O nível vai direto para `--lvl` no elemento (rAF), sem re-render do React.
 */
export function PresenceOrb({
  state,
  level = 0,
  label,
  showLabel = true,
  onClick,
  size = 40,
  className,
}: PresenceOrbProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof level === "number") {
      el.style.setProperty("--lvl", level.toFixed(3));
      return;
    }
    let raf = 0;
    let last = "";
    const tick = () => {
      const v = Math.max(0, Math.min(1, level())).toFixed(3);
      if (v !== last) el.style.setProperty("--lvl", v);
      last = v;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [level]);
  const text = label ?? LABEL[state];
  return (
    <span className={cx("sn-orb-wrap", className)}>
      <button
        ref={ref}
        type="button"
        className="sn-orb"
        data-state={state}
        aria-label={text}
        onClick={onClick}
        style={{ "--sn-orb": `${size}px` } as CSSProperties}
      >
        {state === "listening" && <span className="sn-orb__meter" aria-hidden />}
        {(state === "thinking" || state === "confirming" || state === "error" || state === "offline") && (
          <span className="sn-orb__ring" aria-hidden />
        )}
        <span className="sn-orb__core" aria-hidden>
          {state === "speaking" ? (
            BARS.map((w) => <i key={w} style={{ "--w": w } as CSSProperties} />)
          ) : state === "muted" ? (
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                d="M9 9v3a3 3 0 0 0 5 2.2M15 9.3V5a3 3 0 0 0-5.7-1.3M19 11a7 7 0 0 1-1.1 3.8M5 11a7 7 0 0 0 11 5.7M12 19v3M3 3l18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <b />
          )}
        </span>
      </button>
      {showLabel && (
        <span className="sn-orb__label" aria-hidden>
          {text}
        </span>
      )}
    </span>
  );
}
