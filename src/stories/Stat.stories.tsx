import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { Stat } from "../index";

const code = `function Demo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 14,
      }}
    >
      <Stat
        label="Horas no mês"
        value={86}
        delta={0.12}
        deltaLabel="vs. mês passado"
        trend={[3, 5, 4, 6, 8, 7, 9, 12]}
      />
      <Stat
        label="Gasto"
        value={342.9}
        format={(n) => "R$ " + n.toFixed(2).replace(".", ",")}
        delta={-0.08}
        trend={[9, 8, 8, 6, 7, 5, 4, 4]}
      />
      <Stat label="Conquistas" value={1284} delta={0.03} icon={<Icon name="star" />} />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof Stat> = {
  title: "Dados/Stat",
  component: Stat,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `KPI: rótulo, número que conta (CountUp), variação colorida e minigráfico opcional (franca-segura/faxina).`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof Stat> = { render: () => <LiveExample code={code} /> };
