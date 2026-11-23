import { type ReactNode, useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import "./SpeechBubble.css";

export interface SpeechBubbleProps {
  /** Texto (pode crescer enquanto chega). */
  text: string;
  /** Chegando aos pedaços: só o trecho novo aparece em fade. */
  streaming?: boolean;
  /** Para onde aponta a ponta. */
  tail?: "left" | "right" | "bottom" | "top" | "none";
  /** Cor do filete superior (ex.: emoção). */
  accent?: string;
  speaker?: ReactNode;
  footer?: ReactNode;
  maxWidth?: number;
  className?: string;
}

/** Balão de fala do mika: vidro, ponta, filete em gradiente e revelação suave do texto em streaming. */
export function SpeechBubble({
  text,
  streaming = false,
  tail = "left",
  accent,
  speaker,
  footer,
  maxWidth = 340,
  className,
}: SpeechBubbleProps) {
  const shown = useRef(0);
  const prev = shown.current;
  useEffect(() => {
    shown.current = text.length;
  }, [text]);
  const split = streaming && prev > 0 && prev < text.length ? prev : text.length;
  return (
    <div
      className={cx("sn-speech", className)}
      data-tail={tail}
      style={{ maxWidth, ...(accent ? { "--sn-sp-accent": accent } : {}) } as React.CSSProperties}
    >
      <span className="sn-speech__rim" aria-hidden />
      {speaker && <span className="sn-speech__who">{speaker}</span>}
      <p className="sn-speech__text" aria-live={streaming ? "off" : "polite"}>
        {text.slice(0, split)}
        {split < text.length && (
          <span key={split} className="sn-speech__new">
            {text.slice(split)}
          </span>
        )}
        {streaming && <span className="sn-speech__caret" aria-hidden />}
      </p>
      {footer && <div className="sn-speech__foot">{footer}</div>}
      {tail !== "none" && <span className="sn-speech__tail" aria-hidden />}
    </div>
  );
}
