import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Avatar } from "../Avatar";
import "./Duel.css";

export interface Duelist {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  detail?: ReactNode;
  color?: string;
}

export interface DuelProps {
  a: Duelist;
  b: Duelist;
  /** Texto do placar quando há líder. */
  leadLabel?: (margin: number) => string;
  className?: string;
}

const Crown = () => (
  <svg className="sn-duel__crown" viewBox="0 0 64 44" aria-hidden>
    <path d="M6 40 3 12l15 12L32 4l14 20 15-12-3 28Z" />
    <circle cx="3" cy="11" r="3.5" />
    <circle cx="32" cy="4" r="3.5" />
    <circle cx="61" cy="11" r="3.5" />
  </svg>
);

/** Placar de duelo (treta-aovivo / eleicoes-radar): VS, coroa que cai e balança no líder, anel dourado que brilha. */
export function Duel({ a, b, leadLabel = (m) => `vencendo · +${m}`, className }: DuelProps) {
  const lead = a.score === b.score ? null : a.score > b.score ? a.id : b.id;
  const margin = Math.abs(a.score - b.score);
  const side = (d: Duelist) => (
    <div className="sn-duel__side" data-lead={lead === d.id || undefined}>
      <div className="sn-duel__portrait">
        {lead === d.id && <Crown key={`c-${lead}`} />}
        <Avatar name={d.name} src={d.avatar} size={64} />
      </div>
      <strong>{d.name}</strong>
      {lead === d.id && (
        <span className="sn-duel__win" key={`w-${lead}`}>
          {leadLabel(margin)}
        </span>
      )}
      <b data-sign={Math.sign(d.score)}>{d.score > 0 ? `+${d.score}` : d.score}</b>
      {d.detail && <small>{d.detail}</small>}
    </div>
  );
  return (
    <div className={cx("sn-duel", className)} role="group" aria-label="Duelo">
      <span className="sn-visually-hidden" aria-live="polite">
        {lead === null ? "Empate" : `${lead === a.id ? a.name : b.name} vence por ${margin}`}
      </span>
      {side(a)}
      <span className="sn-duel__vs">VS</span>
      {side(b)}
    </div>
  );
}
