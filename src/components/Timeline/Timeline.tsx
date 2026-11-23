import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Timeline.css";

export interface TimelineEvent {
  key: string;
  title: ReactNode;
  /** Hora ou data exibida. */
  time: string;
  /** ISO para `<time dateTime>`. */
  dateTime?: string;
  description?: ReactNode;
  tone?: "accent" | "violet" | "aqua" | "gold" | "success" | "danger" | "neutral";
  icon?: ReactNode;
  /** Destaca o evento atual ("agora"). */
  now?: boolean;
}

/** Linha do tempo vertical para agenda, histórico e atividades. */
export function Timeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  return (
    <ol className={cx("sn-timeline", className)}>
      {events.map((e, i) => (
        <li
          key={e.key}
          className={cx(
            "sn-timeline__item",
            `sn-timeline__item--${e.tone ?? "accent"}`,
            e.now && "sn-timeline__item--now",
          )}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span className="sn-timeline__dot" aria-hidden>
            {e.icon}
          </span>
          <div className="sn-timeline__body">
            <time className="sn-timeline__time" dateTime={e.dateTime}>
              {e.time}
            </time>
            <p className="sn-timeline__title">{e.title}</p>
            {e.description && <div className="sn-timeline__desc">{e.description}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
