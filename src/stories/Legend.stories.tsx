import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Legend } from "../index";

const code = `function Demo() {
  return (
    <Legend
      label="Séries do gráfico"
      items={[
        { label: "Concluídos", tone: "info" },
        { label: "Revisões", tone: "warning" },
        { label: "Abandonados", tone: "danger" },
      ]}
    />
  );
}

render(<Demo />);`;

const meta: Meta<typeof Legend> = {
  title: "Dados/Legend",
  component: Legend,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Legenda de gráfico com amostras nos tons comuns. StackedColumns e SegmentedBar já a desenham; use sozinha para gráficos próprios.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Legend> = { render: () => <LiveExample code={code} /> };
