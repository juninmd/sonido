/** Maior valor "redondo" (1, 2 ou 5 × 10ⁿ) que cobre `value`: escala de eixo com marcas limpas. */
export function niceMax(value: number): number {
  if (!(value > 1)) return 1;
  const base = 10 ** Math.floor(Math.log10(value));
  for (const m of [1, 2, 5]) if (m * base >= value) return m * base;
  return 10 * base;
}

/**
 * Marcas do eixo Y (base, meio e teto), sempre inteiras para contagens. Até 10 o teto é o menor par que cobre o valor,
 * para o meio não cair em fração; acima disso vale `niceMax`, cujo meio já é inteiro.
 */
export function axisTicks(value: number): number[] {
  if (!(value > 1)) return [0, 1];
  const max = value <= 10 ? Math.max(2, Math.ceil(value / 2) * 2) : niceMax(value);
  return [0, max / 2, max];
}

export interface StackedSegment {
  /** Índice da série (tom) no gráfico. */
  series: number;
  value: number;
  /** Segmento do topo: leva a ponta arredondada. */
  cap: boolean;
}

export interface StackedColumn {
  /** Só segmentos positivos, da base para o topo. */
  segments: StackedSegment[];
  total: number;
}

export interface StackedLayout {
  ticks: number[];
  /** Teto do eixo: a altura de cada segmento é `value / max`. */
  max: number;
  columns: StackedColumn[];
  /** Coluna mais alta (a primeira, em empate) ou -1 sem dados; só ela leva o total na ponta. */
  peak: number;
}

/** Geometria das colunas empilhadas: `rows[categoria][série]`. Valores negativos ou inválidos contam como zero. */
export function stackedLayout(rows: number[][]): StackedLayout {
  const clean = rows.map((r) => r.map((v) => (Number.isFinite(v) && v > 0 ? v : 0)));
  const columns = clean.map((r) => {
    const segments = r.flatMap((value, series) => (value > 0 ? [{ series, value, cap: false }] : []));
    const top = segments[segments.length - 1];
    if (top) top.cap = true;
    return { segments, total: r.reduce((n, v) => n + v, 0) };
  });
  const highest = Math.max(0, ...columns.map((c) => c.total));
  const ticks = axisTicks(highest);
  return {
    ticks,
    max: ticks[ticks.length - 1] as number,
    columns,
    peak: highest > 0 ? columns.findIndex((c) => c.total === highest) : -1,
  };
}
