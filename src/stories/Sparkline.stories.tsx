import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Sparkline } from "../index";

const code = `function Demo() {
  const d = [4, 6, 5, 8, 7, 10, 9, 13, 12, 15];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
      <Sparkline data={d} label="Tendência" />
      <Sparkline data={d.slice().reverse()} tone="danger" label="Queda" />
      <Sparkline data={[3, 3, 5, 4, 6, 6, 7]} tone="aqua" area={false} label="Uso" />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Sparkline> = {
  title: "Dados/Sparkline",
  component: Sparkline,
  parameters: {
    sonido: { code },
    docs: { description: { component: `Minigráfico de linha em SVG com área em degradê e ponto final pulsando.` } },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Sparkline> = { render: () => <LiveExample code={code} /> };
