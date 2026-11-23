import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./AgendaRail.css";

export interface AgendaEvent {
  id: string;
  /** Minutos desde 00:00. */
  start: number;
  end: number;
  title: string;
  where?: ReactNode;
  kind?: "event" | "task" | "free";
  /** Conflito com outro evento: o trilho fica vermelho. */
  clash?: boolean;
}

export interface AgendaRailProps {
  events: AgendaEvent[];
  /** Minuto atual; a linha do agora fica antes do próximo evento. */
  now: number;
  label?: string;
  className?: string;
}

export const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.round(m % 60)).padStart(2, "0")}`;

/**
 * Linha do dia do canto-widget: reuniões, tarefas com horário e janelas livres num trilho,
 * com a linha do "agora" e um ponto que bate. Eventos em andamento ganham o anel de contagem.
 */
export function AgendaRail({ events, now, label = "Agenda de hoje", className }: AgendaRailProps) {
  const sorted = [...events].sort((a, b) => a.start - b.start);
  const lineAt = sorted.some((e) => e.start <= now && now < e.end) ? -1 : sorted.findIndex((e) => e.start > now);
  return (
    <ol className={cx("sn-agenda", className)} aria-label={label}>
      {sorted.map((e, i) => {
        const live = e.start <= now && now < e.end;
        const past = e.end <= now;
        return (
          <li key={e.id} className="sn-agenda__wrap" style={{ "--i": i } as CSSProperties}>
            {i === lineAt && <NowLine now={now} />}
            <div
              className="sn-agenda__row"
              data-kind={e.kind ?? "event"}
              data-live={live || undefined}
              data-past={past || undefined}
              data-clash={e.clash || undefined}
            >
              <span className="sn-agenda__dot" aria-hidden />
              <div className="sn-agenda__card">
                <div className="sn-agenda__main">
                  <span className="sn-agenda__title">
                    {e.kind === "free" ? `Livre · ${e.end - e.start} min` : e.title}
                  </span>
                  <span className="sn-agenda__time">
                    {hhmm(e.start)}–{hhmm(e.end)}
                    {e.where && <> · {e.where}</>}
                  </span>
                </div>
                {live && <CountdownRing start={e.start} end={e.end} now={now} />}
              </div>
            </div>
          </li>
        );
      })}
      {lineAt === -1 && !sorted.some((e) => e.start <= now && now < e.end) && (
        <li className="sn-agenda__wrap">
          <NowLine now={now} />
        </li>
      )}
    </ol>
  );
}

/** A linha vermelha do agora, com o ponto que bate (canto-now-dot). */
export function NowLine({ now }: { now: number }) {
  return (
    <div className="sn-nowline" role="presentation">
      <span className="sn-nowline__dot" />
      <span className="sn-nowline__time">{hhmm(now)}</span>
      <span className="sn-nowline__bar" />
    </div>
  );
}

export interface CountdownRingProps {
  start: number;
  end: number;
  now: number;
  size?: number;
}

/** Anel de reunião em andamento: o arco esvazia até o fim e mostra os minutos restantes. */
export function CountdownRing({ start, end, now, size = 40 }: CountdownRingProps) {
  const left = Math.max(0, end - now);
  const k = Math.min(1, Math.max(0, left / (end - start)));
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <span
      className="sn-countdown"
      role="timer"
      aria-label={`${left} minutos restantes`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r={r} className="sn-countdown__track" />
        <circle
          cx="18"
          cy="18"
          r={r}
          className="sn-countdown__fill"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - k)}
        />
      </svg>
      <b>{left}</b>
    </span>
  );
}
