import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Badge } from "../index";

const code = `function Demo() {
  const t = [
    "neutral",
    "accent",
    "violet",
    "aqua",
    "gold",
    "success",
    "warning",
    "danger",
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        {t.map((x) => (
          <Badge key={x} tone={x}>
            {x}
          </Badge>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Badge tone="success" dot>
          Instalado
        </Badge>
        <Badge tone="accent" live>
          Ao vivo
        </Badge>
        <Badge tone="gold" appearance="solid">
          ★ 4.8
        </Badge>
        <Badge tone="accent" appearance="solid">
          Novo
        </Badge>
      </div>
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Badge> = {
  title: "Exibição/Badge",
  component: Badge,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Pílula para status, contagem ou categoria. O tom segue a função da cor: \`accent\` ação, \`aqua\` progresso, \`gold\` destaque, estados para sucesso/aviso/erro.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Badge> = { render: () => <LiveExample code={code} /> };
