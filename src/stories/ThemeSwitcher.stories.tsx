import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { ThemeSwitcher } from "../index";

const code = `function Demo() {
  const [value, setValue] = useState(
    document.documentElement.getAttribute("data-theme") || "dark",
  );
  return (
    <div style={{ display: "grid", gap: 14, minHeight: 330, alignContent: "start" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <ThemeSwitcher value={value} onChange={setValue} />
        <span style={{ color: "var(--sn-color-text-dim)", fontSize: 13 }}>
          Abra e escolha: a nova cor lava a tela a partir do clique.
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
          gap: 10,
        }}
      >
        {SONIDO_THEMES.map((x) => (
          <button
            key={x.id}
            onClick={() => {
              document.documentElement.setAttribute("data-theme", x.id);
              setValue(x.id);
            }}
            style={{
              display: "grid",
              gap: 6,
              padding: 10,
              borderRadius: 14,
              border:
                "1px solid " +
                (value === x.id ? "var(--sn-color-accent)" : "var(--sn-color-border)"),
              background: "var(--sn-color-surface)",
              color: "var(--sn-color-text)",
              font: "600 13px var(--sn-font)",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "flex",
                height: 26,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {x.swatch.map((c) => (
                <i key={c} style={{ flex: 1, background: c }} />
              ))}
            </span>
            {x.label}
          </button>
        ))}
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Temas/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Troca entre os 8 temas do Sonido (os do canto-widget inclusos). A cor nova "lava" a tela num círculo a partir do clique (ai-session-monitor); com reduced-motion troca na hora. Aplica \`data-theme\` no \`<html>\` por padrão.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof ThemeSwitcher> = { render: () => <LiveExample code={code} /> };
