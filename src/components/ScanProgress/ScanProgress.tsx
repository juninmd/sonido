import { cx } from "../../utils/cx";
import { formatCount, formatElapsed } from "../../utils/format";
import "./ScanProgress.css";

export type ScanState = "running" | "stopping" | "done" | "cancelled";

export interface ScanProgressProps {
  /** Itens vistos até agora. */
  count: number;
  /** Segundos desde o início. */
  elapsed: number;
  /** Itens por segundo; sem ele usa count / elapsed. */
  rate?: number;
  /** Item atual (caminho, URL...). */
  current?: string;
  state?: ScanState;
  /** Mostra o botão de cancelar enquanto roda. */
  onCancel?: () => void;
  /** Mostra o botão de recomeçar quando termina ou é cancelado. */
  onRestart?: () => void;
  /** Nomes das três medidas. */
  labels?: { count?: string; rate?: string; elapsed?: string };
  className?: string;
}

const STATUS: Record<ScanState, string> = {
  running: "Analisando…",
  stopping: "Parando…",
  done: "Concluído",
  cancelled: "Cancelado",
};

/**
 * Números ao vivo de uma tarefa longa (faxina): quantos itens, ritmo e tempo, com o item atual.
 * "stopping" cobre o intervalo entre o clique em cancelar e a parada real.
 */
export function ScanProgress({
  count,
  elapsed,
  rate,
  current,
  state = "running",
  onCancel,
  onRestart,
  labels,
  className,
}: ScanProgressProps) {
  const perSec = rate ?? (elapsed > 0 ? count / elapsed : 0);
  const live = state === "running" || state === "stopping";
  return (
    <div className={cx("sn-scan", `sn-scan--${state}`, className)}>
      <div
        className="sn-scan__track"
        role="progressbar"
        aria-label={STATUS[state]}
        aria-busy={live}
        aria-valuetext={`${formatCount(count)} itens`}
      >
        <i />
      </div>
      <dl className="sn-scan__stats">
        <div>
          <dt>{labels?.count ?? "Itens"}</dt>
          <dd>{formatCount(count)}</dd>
        </div>
        <div>
          <dt>{labels?.rate ?? "Por seg."}</dt>
          <dd>{formatCount(perSec)}</dd>
        </div>
        <div>
          <dt>{labels?.elapsed ?? "Tempo"}</dt>
          <dd>{formatElapsed(elapsed)}</dd>
        </div>
      </dl>
      {current && (
        <div className="sn-scan__current" title={current}>
          {current}
        </div>
      )}
      <div className="sn-scan__foot">
        {live && onCancel && (
          <button type="button" className="sn-scan__btn" onClick={onCancel} disabled={state === "stopping"}>
            Cancelar
          </button>
        )}
        {!live && onRestart && (
          <button type="button" className="sn-scan__btn" onClick={onRestart}>
            Analisar de novo
          </button>
        )}
        <span className="sn-scan__status" aria-live="polite">
          {STATUS[state]}
        </span>
      </div>
    </div>
  );
}
