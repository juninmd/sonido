#!/usr/bin/env node
// Auditoria do design system: regras que o lint não cobre.
// Erros quebram o CI; avisos só aparecem no relatório.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const COMP = join(ROOT, "src/components");
const STORIES = join(ROOT, "src/stories");
const index = readFileSync(join(ROOT, "src/index.ts"), "utf8");
const stories = readdirSync(STORIES)
  .filter((f) => f.endsWith(".stories.tsx"))
  .map((f) => readFileSync(join(STORIES, f), "utf8"));

// Cores fixas de propósito (dados ou superfícies que não mudam com o tema).
const RAW_COLOR_OK = {
  AlertCard: "céu padrão da cena, sobrescrito pela prop sky",
  Avatar: "texto branco sobre gradiente de matiz fixo",
  Dock: "sombra preta e contador branco sobre o gradiente assinatura",
  Island: "pílula sempre escura, em qualquer tema",
  RouteMap: "escala de trânsito",
  WeatherSky: "céu do clima",
};

const errors = [];
const warnings = [];
const err = (c, m) => errors.push(`${c}: ${m}`);
const warn = (c, m) => warnings.push(`${c}: ${m}`);

const folders = readdirSync(COMP, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const name of folders) {
  const dir = join(COMP, name);
  const files = readdirSync(dir);
  const tsx = files.filter((f) => /\.tsx?$/.test(f) && f !== "index.ts");
  const source = tsx.map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
  const css = files
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(join(dir, f), "utf8"))
    .join("\n");

  // 1. Exportado pelo pacote
  if (!existsSync(join(dir, "index.ts"))) err(name, "falta index.ts");
  if (!index.includes(`./components/${name}"`)) err(name, "não é exportado em src/index.ts");

  // 2. Documentado com exemplo ao vivo
  const exported = [...source.matchAll(/export (?:function|const) ([A-Z][A-Za-z0-9]*)/g)].map((m) => m[1]);
  const documented = stories.some((s) =>
    exported.some((e) => new RegExp(`import \\{[^}]*\\b${e}\\b[^}]*\\} from "\\.\\./index"`).test(s)),
  );
  if (!documented) err(name, "nenhuma história em src/stories importa este componente");

  // 3. Classes com o prefixo sn-
  const bad = [...css.matchAll(/(?<![\w-])\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]).filter((c) => !c.startsWith("sn-"));
  if (bad.length) err(name, `classes CSS sem prefixo sn-: ${[...new Set(bad)].join(", ")}`);

  // 4. <button> sempre com type (evita submit acidental em formulários)
  const buttons = [...source.matchAll(/<button\b((?:=>|[^>])*)>/g)].filter((m) => !/\btype=/.test(m[1]));
  if (buttons.length) err(name, `${buttons.length} <button> sem type`);

  // 5. Imagens e svgs decorativos marcados
  const svgs = [...source.matchAll(/<svg\b((?:=>|[^>])*)>/g)].filter((m) => !/aria-hidden|role=|aria-label/.test(m[1]));
  if (svgs.length) warn(name, `${svgs.length} <svg> sem aria-hidden, role ou aria-label`);

  // 6. Cor crua no CSS do componente (use tokens --sn-*)
  const hex = [...css.replace(/var\([^)]*\)/g, "").matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0]);
  if (hex.length && !RAW_COLOR_OK[name]) warn(name, `cores cruas no CSS: ${[...new Set(hex)].slice(0, 5).join(", ")}`);

  // 7. Animação com duração fixa precisa respeitar prefers-reduced-motion
  const fixedAnim = /animation:\s*[\w-]+\s+[\d.]+m?s/.test(css);
  if (fixedAnim && !/prefers-reduced-motion/.test(css)) warn(name, "animação sem bloco prefers-reduced-motion");
}

const pad = (s) => `  ${s}`;
console.log(`Sonido audit: ${folders.length} pastas de componentes, ${stories.length} histórias`);
if (warnings.length) console.log(`\nAvisos (${warnings.length}):\n${warnings.map(pad).join("\n")}`);
if (errors.length) {
  console.error(`\nErros (${errors.length}):\n${errors.map(pad).join("\n")}`);
  process.exit(1);
}
console.log("\nNenhum erro.");
