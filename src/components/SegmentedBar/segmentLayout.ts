/** Fatia mínima para o percentual caber dentro do bloco; abaixo disso ele fica no `title` e na tabela. */
export const SEGMENT_LABEL_MIN_SHARE = 0.12;

export interface SegmentBlock {
  /** Índice do segmento na entrada (mantém o tom estável quando um vizinho zera). */
  index: number;
  value: number;
  /** Fração do todo, 0–1. */
  share: number;
  /** Percentual arredondado, ex.: "42%". */
  percent: string;
  /** O percentual cabe dentro do bloco. */
  fits: boolean;
}

/** Blocos da barra de composição: segmentos zerados, negativos ou inválidos saem; todo vazio devolve `[]`. */
export function segmentLayout(values: number[], minShare = SEGMENT_LABEL_MIN_SHARE): SegmentBlock[] {
  const clean = values.map((v) => (Number.isFinite(v) && v > 0 ? v : 0));
  const total = clean.reduce((n, v) => n + v, 0);
  if (total === 0) return [];
  return clean.flatMap((value, index) => {
    if (value === 0) return [];
    const share = value / total;
    return [{ index, value, share, percent: `${Math.round(share * 100)}%`, fits: share >= minShare }];
  });
}
