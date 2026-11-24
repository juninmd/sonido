/**
 * Formatadores pt-BR (faxina): bytes, contagens, idade e tempo decorrido.
 * Todos aceitam `locale` para usar fora do Brasil.
 */
const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

const digitsFor = (v: number, i: number) => (v >= 100 || i === 0 ? 0 : v >= 10 ? 1 : 2);

/** 1536 → "1,5 KB". Base 1024; 1023,99 KB sobe para "1 MB" em vez de "1.024 KB". */
export function formatBytes(bytes: number, locale = "pt-BR"): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  let i = Math.min(Math.max(Math.floor(Math.log(bytes) / Math.log(1024)), 0), UNITS.length - 1);
  let v = bytes / 1024 ** i;
  if (i < UNITS.length - 1 && Math.round(v) >= 1024) {
    i += 1;
    v = bytes / 1024 ** i;
  }
  return `${v.toLocaleString(locale, { maximumFractionDigits: digitsFor(v, i) })} ${UNITS[i]}`;
}

/** Separa número e unidade ("12,4", "GB") para estilizar cada parte. */
export function splitBytes(bytes: number, locale = "pt-BR"): [string, string] {
  const [n, u] = formatBytes(bytes, locale).split(" ");
  return [n, u];
}

/** 1240 → "1,2 mil"; 2_500_000 → "2,5 mi". */
export function formatCount(n: number, locale = "pt-BR"): string {
  const one = (x: number) => x.toLocaleString(locale, { maximumFractionDigits: 1 });
  if (n >= 1e6 || Math.round((n / 1e3) * 10) / 10 >= 1000) return `${one(n / 1e6)} mi`;
  if (n >= 1e3) return `${one(n / 1e3)} mil`;
  return Math.round(n).toLocaleString(locale);
}

const AGE: [number, string, string][] = [
  [31536000, "ano", "anos"],
  [2592000, "mês", "meses"],
  [86400, "dia", "dias"],
  [3600, "hora", "horas"],
  [60, "minuto", "minutos"],
];

/** Data (Date ou epoch em ms) → "há 3 dias". Sem data → "—". */
export function formatAge(date: Date | number | null | undefined, now: number = Date.now()): string {
  if (date == null) return "—";
  const ms = typeof date === "number" ? date : date.getTime();
  if (!ms) return "—";
  const secs = Math.max(0, (now - ms) / 1000);
  for (const [unit, one, many] of AGE) {
    const v = Math.floor(secs / unit);
    if (v >= 1) return `há ${v} ${v === 1 ? one : many}`;
  }
  return "agora";
}

/** Segundos → "4:05" ou "1:02:05". */
export function formatElapsed(secs: number): string {
  const s = Math.max(0, Math.floor(secs));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${r}` : `${m}:${r}`;
}

/** Último trecho de um caminho Windows ou Unix. */
export function baseName(path: string): string {
  const parts = path.split(/[\\/]/).filter(Boolean);
  return parts[parts.length - 1] ?? path;
}
