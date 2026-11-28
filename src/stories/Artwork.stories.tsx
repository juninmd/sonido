import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Artwork } from "../index";

const code = `function Demo() {
  const t = ["Hollow Knight", "Outer Wilds", "Celeste", "Disco Elysium", "Hades"];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))",
        gap: 14,
      }}
    >
      {t.map((x, i) => (
        <div key={x} style={{ display: "grid", gap: 8 }}>
          <Artwork
            title={x}
            referrerPolicy="no-referrer"
            badge={
              i === 0 ? (
                <Badge tone="gold" appearance="solid">
                  4.9
                </Badge>
              ) : null
            }
          />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{x}</span>
        </div>
      ))}
      <div style={{ display: "grid", gap: 8 }}>
        <Artwork
          title="Fallback"
          src="https://exemplo.invalid/capa-que-falha.png"
          fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect width='10' height='10' fill='%237c5cff'/%3E%3C/svg%3E"
        />
        <span style={{ fontSize: 13, fontWeight: 600 }}>Fallback em cadeia</span>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Artwork> = {
  title: "Superfícies/Artwork",
  component: Artwork,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Capa de jogo, filme ou curso. Enquanto a imagem carrega (ou se falhar), mostra um gradiente com cor estável derivada do título (djb2) e as iniciais. \`badge\` vai no canto; \`referrerPolicy\` vai para o \`<img>\` (ex.: CDNs que bloqueiam hotlink).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Artwork> = { render: () => <LiveExample code={code} /> };
