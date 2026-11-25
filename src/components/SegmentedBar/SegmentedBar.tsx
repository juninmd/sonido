import type { CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { seriesTone, type Tone, toneVar } from "../../utils/tone";
import { Legend } from "../Legend";
import { SEGMENT_LABEL_MIN_SHARE, segmentLayout } from "./segmentLayout";
import "./SegmentedBar.css";

export interface Segment {
  label: string;
  value: number;
  tone?: Tone;
}

export interface SegmentedBarProps {
  segments: Segment[];
  /** Título acessível; também vira a legenda da tabela oculta. */
  label: string;
  format?: (n: number) => string;
  /** Mostra o percentual dentro dos blocos largos o bastante. */
  showPercent?: boolean;
  /** Fração mínima (0–1) para o percentual aparecer dentro do bloco. */
  minLabelShare?: number;
  /** Mostra a legenda abaixo da barra (só segmentos com valor). */
  legend?: boolean;
  className?: string;
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Um todo dividido em partes: barra horizontal em blocos, legenda e tabela oculta para leitores de tela. */
export function SegmentedBar({
  segments,
  label,
  format = String,
  showPercent = true,
  minLabelShare = SEGMENT_LABEL_MIN_SHARE,
  legend = true,
  className,
}: SegmentedBarProps) {
  const blocks = segmentLayout(
    segments.map((s) => s.value),
    minLabelShare,
  );
  const tones = segments.map((s, i) => seriesTone(i, s.tone));
  return (
    <figure className={cx("sn-segbar", className)}>
      <div className="sn-segbar__track" aria-hidden>
        {blocks.map((b, i) => {
          const s = segments[b.index] as Segment;
          return (
            <div
              key={s.label}
              className="sn-segbar__seg"
              style={{ "--sn-share": b.share, "--sn-i": i, background: toneVar(tones[b.index] as Tone) } as Vars}
              title={`${s.label}: ${format(b.value)} (${b.percent})`}
            >
              {showPercent && b.fits && <span className="sn-segbar__pct">{b.percent}</span>}
            </div>
          );
        })}
      </div>
      {legend && blocks.length > 0 && (
        <Legend items={blocks.map((b) => ({ label: segments[b.index]?.label ?? "", tone: tones[b.index] }))} />
      )}
      <table className="sn-visually-hidden">
        <caption>{label}</caption>
        <tbody>
          {blocks.map((b) => {
            const s = segments[b.index] as Segment;
            return (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                <td>{format(b.value)}</td>
                <td>{b.percent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </figure>
  );
}
