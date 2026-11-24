export interface TileRect<T> {
  item: T;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Layout "squarified" de treemap (Bruls et al.) sem dependências. `items` já ordenado do maior ao menor. */
export function squarify<T>(
  items: T[],
  value: (item: T) => number,
  x: number,
  y: number,
  w: number,
  h: number,
): TileRect<T>[] {
  const out: TileRect<T>[] = [];
  const total = items.reduce((a, c) => a + Math.max(0, value(c)), 0);
  if (!total || w <= 0 || h <= 0) return out;
  const scale = (w * h) / total;
  let rest = items.map((item) => ({ item, a: Math.max(0, value(item)) * scale })).filter((c) => c.a > 0);
  while (rest.length) {
    const side = Math.min(w, h);
    let row: typeof rest = [];
    let best = Number.POSITIVE_INFINITY;
    for (const it of rest) {
      const next = [...row, it];
      const s = next.reduce((a, c) => a + c.a, 0);
      const worst = Math.max(
        ...next.map((c) => Math.max((side * side * c.a) / (s * s), (s * s) / (side * side * c.a))),
      );
      if (worst > best) break;
      best = worst;
      row = next;
    }
    const s = row.reduce((a, c) => a + c.a, 0);
    const thick = s / side;
    let off = 0;
    for (const c of row) {
      const len = c.a / thick;
      out.push(
        w >= h ? { item: c.item, x, y: y + off, w: thick, h: len } : { item: c.item, x: x + off, y, w: len, h: thick },
      );
      off += len;
    }
    if (w >= h) {
      x += thick;
      w -= thick;
    } else {
      y += thick;
      h -= thick;
    }
    rest = rest.slice(row.length);
  }
  return out;
}
