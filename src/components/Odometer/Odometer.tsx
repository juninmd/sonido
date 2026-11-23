import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./Odometer.css";

export interface OdometerProps {
  value: number;
  /** Formatação: padrão pt-BR com separador de milhar. */
  locale?: string;
  className?: string;
}

/** Odômetro do eleicoes-radar: cada dígito é uma coluna 0–9 que rola até o valor novo. */
export function Odometer({ value, locale = "pt-BR", className }: OdometerProps) {
  const text = Math.max(0, Math.round(value)).toLocaleString(locale);
  return (
    <span className={cx("sn-odo", className)} role="img" aria-label={text}>
      {[...text].map((ch, i) =>
        /\d/.test(ch) ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: posição do dígito é a identidade
          <span key={`${text.length}-${i}`} className="sn-odo__dg" style={{ "--d": ch } as CSSProperties} aria-hidden>
            <span>
              {"0123456789".split("").map((n) => (
                <i key={n}>{n}</i>
              ))}
            </span>
          </span>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: separador
          <span key={`s${i}`} className="sn-odo__sep" aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
