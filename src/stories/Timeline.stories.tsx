import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Timeline } from "../index";

const code = `function Demo() {
  return (
    <Timeline
      events={[
        {
          key: 1,
          title: "Platinou Hades",
          time: "Hoje, 14:20",
          tone: "gold",
          icon: <Icon name="star" />,
          now: true,
        },
        {
          key: 2,
          title: "Comprou Celeste",
          time: "Ontem",
          tone: "accent",
          description: "R$ 18,99 na promoção.",
        },
        { key: 3, title: "Começou Outer Wilds", time: "3 dias atrás", tone: "aqua" },
        { key: 4, title: "Criou a conta", time: "Jan 2024", tone: "neutral" },
      ]}
    />
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Timeline> = {
  title: "Dados/Timeline",
  component: Timeline,
  parameters: {
    sonido: { code },
    docs: { description: { component: `Linha do tempo vertical com ícones por tom; o evento \`now\` ganha o ping.` } },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Timeline> = { render: () => <LiveExample code={code} /> };
