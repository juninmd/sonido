/** Data local no formato `AAAA-MM-DD` (sem o desvio de fuso de `toISOString`). */
export function localIsoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Lê `AAAA-MM-DD` como meia-noite local; `Date` vira cópia à meia-noite local. */
export function parseLocalDate(value: Date | string): Date {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y as number, (m as number) - 1, d as number);
}

export interface WeekDay {
  iso: string;
  date: Date;
  count: number;
  isToday: boolean;
}

/** `days` dias seguidos a partir de `start`, com a contagem de cada um e a marca de hoje. */
export function weekDays(
  start: Date | string,
  days: number,
  counts: Record<string, number> = {},
  today: Date | string = new Date(),
): WeekDay[] {
  const first = parseLocalDate(start);
  const todayIso = localIsoDate(parseLocalDate(today));
  const n = Math.max(0, Math.floor(days));
  return Array.from({ length: n }, (_, i) => {
    // Avança pelo calendário (não por 24h), então a troca de horário de verão não pula nem repete dia.
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
    const iso = localIsoDate(date);
    return { iso, date, count: Math.max(0, counts[iso] ?? 0), isToday: iso === todayIso };
  });
}

/** Índice do próximo foco no teclado (setas, Home, End), ou `null` para teclas que não navegam. */
export function rovingIndex(key: string, current: number, length: number): number | null {
  if (length === 0) return null;
  if (key === "ArrowRight" || key === "ArrowDown") return (current + 1) % length;
  if (key === "ArrowLeft" || key === "ArrowUp") return (current - 1 + length) % length;
  if (key === "Home") return 0;
  if (key === "End") return length - 1;
  return null;
}
