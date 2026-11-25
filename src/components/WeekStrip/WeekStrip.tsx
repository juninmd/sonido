import { type CSSProperties, type KeyboardEvent, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { localIsoDate, rovingIndex, type WeekDay, weekDays } from "./weekDays";
import "./WeekStrip.css";

export interface WeekStripProps {
  /** Dia escolhido (`AAAA-MM-DD`) ou `null`. */
  value: string | null;
  /** Recebe o dia clicado; clicar no dia já escolhido envia `null` quando `deselectable`. */
  onChange: (day: string | null) => void;
  /** Nome acessível do grupo, ex.: "Próximos 7 dias". */
  label: string;
  /** Primeiro dia da faixa; padrão: hoje. */
  start?: Date | string;
  /** Quantidade de dias. */
  days?: number;
  /** Contagem por dia (`AAAA-MM-DD` → n); maior que zero vira selo. */
  counts?: Record<string, number>;
  /** Clicar no dia escolhido desfaz a escolha. */
  deselectable?: boolean;
  /** "Hoje" de referência (testes, SSR, fuso do servidor). */
  today?: Date | string;
  locale?: string;
  /** Texto no lugar do dia da semana de hoje. */
  todayLabel?: string;
  /** Nome acessível de cada dia. */
  dayLabel?: (day: WeekDay) => string;
  className?: string;
}

const defaultDayLabel = (locale: string) => (d: WeekDay) => {
  const date = d.date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
  return d.count > 0 ? `${date}: ${d.count}` : date;
};

/** Faixa de dias para escolher um: dia da semana, número, selo de contagem e marca de hoje, com foco itinerante. */
export function WeekStrip({
  value,
  onChange,
  label,
  start,
  days = 7,
  counts,
  deselectable = true,
  today,
  locale = "pt-BR",
  todayLabel = "hoje",
  dayLabel = defaultDayLabel(locale),
  className,
}: WeekStripProps) {
  const now = today ?? localIsoDate(new Date());
  const cells = weekDays(start ?? now, days, counts, now);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [focused, setFocused] = useState<string | null>(null);
  const pick = (iso: string | null) => cells.findIndex((c) => c.iso === iso);
  const stop =
    [focused, value].map(pick).find((i) => i >= 0) ??
    Math.max(
      0,
      cells.findIndex((c) => c.isToday),
    );

  const onKeyDown = (e: KeyboardEvent) => {
    const next = rovingIndex(e.key, stop, cells.length);
    if (next === null) return;
    e.preventDefault();
    setFocused(cells[next]?.iso ?? null);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cx("sn-week", className)}
      style={{ "--sn-week-days": Math.max(1, cells.length) } as CSSProperties}
      onKeyDown={onKeyDown}
    >
      {cells.map((c, i) => {
        const on = c.iso === value;
        return (
          <button
            key={c.iso}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            className={cx("sn-week__day", on && "sn-week__day--on", c.isToday && "sn-week__day--today")}
            aria-pressed={on}
            aria-label={dayLabel(c)}
            aria-current={c.isToday ? "date" : undefined}
            tabIndex={i === stop ? 0 : -1}
            onFocus={() => setFocused(c.iso)}
            onClick={() => onChange(on && deselectable ? null : c.iso)}
          >
            <span className="sn-week__weekday">
              {c.isToday ? todayLabel : c.date.toLocaleDateString(locale, { weekday: "short" }).replace(".", "")}
            </span>
            <span className="sn-week__num">{c.date.getDate()}</span>
            <span className="sn-week__count">{c.count > 0 ? c.count : ""}</span>
          </button>
        );
      })}
    </div>
  );
}
