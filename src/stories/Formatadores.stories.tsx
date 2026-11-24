import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import "../index";

const code = `function Demo() {
  const [ref, size] = useSize();
  const linhas = [
    ["formatBytes(1536)", formatBytes(1536)],
    ["formatBytes(1023.99 * 1024)", formatBytes(1023.99 * 1024)],
    ["splitBytes(13.3e9)", splitBytes(13.3e9).join(" | ")],
    ["formatCount(1240)", formatCount(1240)],
    ["formatCount(2_500_000)", formatCount(2_500_000)],
    ["formatAge(Date.now() - 3 dias)", formatAge(Date.now() - 3 * 86400000)],
    ["formatElapsed(3725)", formatElapsed(3725)],
    ["baseName(caminho)", baseName("C:\\\\Users\\\\ana\\\\a.iso")],
  ];
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <table style={{ borderCollapse: "collapse", fontSize: 14 }}>
        <tbody>
          {linhas.map(([f, r]) => (
            <tr key={f}>
              <td style={{ padding: "6px 16px 6px 0", fontFamily: "var(--sn-font-mono)", color: "var(--sn-color-text-dim)" }}>{f}</td>
              <td style={{ fontFamily: "var(--sn-font-mono)", color: "var(--sn-color-gold)" }}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        ref={ref}
        style={{ resize: "both", overflow: "hidden", width: 240, height: 100, maxWidth: "100%", display: "grid", placeContent: "center", borderRadius: 14, border: "1px solid var(--sn-color-border)", background: "var(--sn-gradient-soft)" }}
      >
        <strong style={{ font: "700 22px var(--sn-font-display)" }}>
          useSize: {size.width} × {size.height}
        </strong>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta = {
  title: "Dados/Formatadores",
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Utilitários pt-BR do faxina: formatBytes (base 1024, sem "1.024 KB"), splitBytes, formatCount, formatAge, formatElapsed e baseName. Mais o hook useSize, que mede um elemento com ResizeObserver.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj = { render: () => <LiveExample code={code} /> };
