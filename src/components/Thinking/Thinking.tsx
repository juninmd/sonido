import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Thinking.css";

/** Três pontos que respiram (mika). Com reduced-motion ficam parados e visíveis. */
export function BreathingDots({ className }: { className?: string }) {
  return (
    <span className={cx("sn-breath", className)} aria-hidden>
      <i />
      <i />
      <i />
    </span>
  );
}

/** Quatro pontos em órbita (mika); parado vira um anel estático. */
export function OrbitSpinner({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("sn-orbit", className)} style={{ width: size, height: size }} aria-hidden>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export interface ThinkingStep {
  id: string;
  label: string;
  status: "pending" | "active" | "done" | "error";
}

export interface ThinkingBubbleProps {
  /** O que foi ouvido/pedido. */
  transcript?: string;
  /** Ferramenta em uso agora. */
  tool?: string;
  steps?: ThinkingStep[];
  /** Depois de alguns segundos, troque para a órbita. */
  long?: boolean;
  label?: string;
  children?: ReactNode;
  className?: string;
}

/** Bolha de "pensando" do mika: vidro com mancha em gradiente, pontos que respiram, ferramenta e passos. */
export function ThinkingBubble({
  transcript,
  tool,
  steps = [],
  long = false,
  label = "Pensando",
  children,
  className,
}: ThinkingBubbleProps) {
  return (
    <div className={cx("sn-thinking", className)} role="status" aria-live="polite" aria-label={label}>
      <span className="sn-thinking__glow" aria-hidden />
      <div className="sn-thinking__head">
        {long ? <OrbitSpinner /> : <BreathingDots />}
        <span>{label}</span>
      </div>
      {transcript && <p className="sn-thinking__transcript">“{transcript}”</p>}
      {tool && <span className="sn-thinking__tool">{tool}</span>}
      {steps.length > 0 && (
        <ol className="sn-thinking__steps">
          {steps.map((s) => (
            <li key={s.id} data-status={s.status}>
              <i aria-hidden />
              {s.label}
            </li>
          ))}
        </ol>
      )}
      {children}
    </div>
  );
}
