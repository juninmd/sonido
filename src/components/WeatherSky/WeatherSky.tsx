import { type ReactNode, useRef } from "react";
import { cx } from "../../utils/cx";
import { useCanvasLoop } from "../../utils/useCanvasLoop";
import { Sky, type WeatherCondition } from "./sky";
import "./WeatherSky.css";

export type { WeatherCondition };

export interface WeatherSkyProps {
  condition: WeatherCondition;
  night?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * Cartão com o céu vivo do canto-widget: gradiente por condição e canvas com sol, estrelas,
 * nuvens, neblina, chuva com respingos, neve e raios (com clarão). Parado com reduced-motion.
 */
export function WeatherSky({ condition, night = false, children, className }: WeatherSkyProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const flash = useRef<HTMLSpanElement>(null);
  useCanvasLoop(canvas, () => {
    const sky = new Sky(condition, night, () =>
      flash.current?.animate?.([{ opacity: 0.75 }, { opacity: 0 }, { opacity: 0.45 }, { opacity: 0 }], {
        duration: 650,
        easing: "ease-out",
      }),
    );
    return { setup: (w, h) => sky.seed(w, h), draw: ({ ctx, now, still }) => sky.draw(ctx, now, still) };
  }, [condition, night]);
  return (
    <div className={cx("sn-wx", className)} data-sky={condition} data-night={night || undefined}>
      <div className="sn-wx__layer" aria-hidden>
        <canvas ref={canvas} />
        <span ref={flash} className="sn-wx__flash" />
      </div>
      {children}
    </div>
  );
}
