/** Desacelera no fim; t é limitado a 0..1. */
export const easeOutCubic = (t: number): number => 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;

/** Valor de uma contagem de `from` a `to` após `elapsed` ms de `duration` ms. */
export function countValue(
  from: number,
  to: number,
  elapsed: number,
  duration: number,
  ease: (t: number) => number = easeOutCubic,
): number {
  if (duration <= 0 || elapsed >= duration) return to;
  return from + (to - from) * ease(elapsed / duration);
}
