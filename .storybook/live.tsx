import { ArgTypes, Description, Title, useOf } from "@storybook/addon-docs/blocks";
import { themes } from "prism-react-renderer";
import * as React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Sonido from "../src";
import "./live.css";

/** Ícones de exemplo (só da documentação). No seu app, use o seu set de ícones. */
const PATHS: Record<string, string> = {
  home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1",
  play: "M7 4l13 8-13 8z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5",
  tag: "M3 12V4h8l10 10-8 8z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  moon: "M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z",
  plus: "M12 5v14M5 12h14",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={PATHS[name] ?? PATHS.star} />
    </svg>
  );
}

const ICON_SNIPPET = `// Ícone de exemplo da documentação: troque pelo seu set (lucide-react, phosphor...).
const Icon = ({ name }) => <span aria-hidden>★</span>;
`;

const pick = (o: object) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => /^[A-Za-z_$][\w$]*$/.test(k) && k !== "default"));

export const scope = { React, ...pick(React), ...pick(Sonido), Icon };

const EXPORTS = new Set(Object.keys(Sonido));
const HOOKS = ["useState", "useEffect", "useRef", "useMemo", "useCallback"];

/** Código pronto para colar: imports + exemplo, sem a chamada `render` do playground. */
export function toCopy(code: string) {
  const ids = new Set(code.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) ?? []);
  const lib = [...EXPORTS].filter((n) => ids.has(n)).sort();
  const hooks = HOOKS.filter((h) => ids.has(h));
  const body = code.replace(/\n*render\(<Demo \/>\);?\s*$/, "\n").replace(/^function Demo\(/m, "export function Demo(");
  const lines = [];
  if (hooks.length) lines.push(`import { ${hooks.join(", ")} } from "react";`);
  if (lib.length) lines.push(`import { ${lib.join(", ")} } from "@juninmd/sonido";`);
  lines.push('import "@juninmd/sonido/styles.css";');
  return `${lines.join("\n")}\n\n${ids.has("Icon") ? `${ICON_SNIPPET}\n` : ""}${body}`;
}

/** Só o resultado, usado no canvas das histórias. */
export function LiveExample({ code }: { code: string }) {
  return (
    <LiveProvider code={code} scope={scope} noInline enableTypeScript={false}>
      <LivePreview />
      <LiveError className="sb-live__error" />
    </LiveProvider>
  );
}

/** Editor ao vivo: edite o código, veja o resultado e copie com os imports. */
export function LivePlayground({ code: initial }: { code: string }) {
  const [code, setCode] = React.useState(initial);
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => setCode(initial), [initial]);
  const copy = async () => {
    await navigator.clipboard.writeText(toCopy(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <LiveProvider code={code} scope={scope} noInline enableTypeScript={false} theme={themes.nightOwl}>
      <div className="sb-live">
        <div className="sb-live__preview">
          <LivePreview />
          <LiveError className="sb-live__error" />
        </div>
        <div className="sb-live__bar">
          <span className="sb-live__hint">Edite o código: o resultado atualiza na hora.</span>
          <div className="sb-live__actions">
            {code !== initial && (
              <button type="button" className="sb-live__btn" onClick={() => setCode(initial)}>
                Restaurar
              </button>
            )}
            <button type="button" className="sb-live__btn sb-live__btn--primary" onClick={copy}>
              {copied ? "Copiado!" : "Copiar código"}
            </button>
          </div>
        </div>
        <LiveEditor className="sb-live__editor" onChange={setCode} />
      </div>
    </LiveProvider>
  );
}

/** Página de docs de cada componente. */
export function LiveDocsPage() {
  const { csfFile } = useOf("meta", ["meta"]);
  const code = (csfFile.meta.parameters as { sonido?: { code: string } } | undefined)?.sonido?.code;
  return (
    <>
      <Title />
      <Description />
      {code && (
        <>
          <h2 className="sb-live__h">Teste ao vivo</h2>
          <LivePlayground code={code} />
        </>
      )}
      <h2 className="sb-live__h">Props</h2>
      <ArgTypes />
    </>
  );
}
