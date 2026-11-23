import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../utils/useReducedMotion";

export interface CountUpProps {
  value: number;
  /** Duração em ms. */
  duration?: number;
  /** Formatação final (padrão: Intl pt-BR). */
  format?: (n: number) => string;
  locale?: string;
  className?: string;
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/** Número que anima até o valor (rAF, easeOutExpo). Instantâneo com reduced-motion. */
export function CountUp({ value, duration = 900, format, locale = "pt-BR", className }: CountUpProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  const from = useRef(shown);

  useEffect(() => {
    if (reduced) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = a + (value - a) * easeOutExpo(t);
      from.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);

  const fmt = format ?? ((n: number) => Math.round(n).toLocaleString(locale));
  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(shown)}
    </span>
  );
}
