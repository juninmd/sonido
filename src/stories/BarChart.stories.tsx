import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { BarChart } from "../index";

const code = `const W = [
  { label: "Seg", value: 2.5 },
  { label: "Ter", value: 1.2 },
  { label: "Qua", value: 3.8 },
  { label: "Qui", value: 0.6 },
  { label: "Sex", value: 4.4 },
  { label: "Sáb", value: 6.1 },
  { label: "Dom", value: 5.2 },
];
const G = [
  { label: "RPG", value: 132 },
  { label: "Aventura", value: 87 },
  { label: "Plataforma", value: 54 },
  { label: "Puzzle", value: 21 },
];
function Demo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: 28,
        alignItems: "end",
      }}
    >
      <BarChart
        label="Horas jogadas por dia"
        data={W}
        height={150}
        format={(n) => n.toFixed(1) + "h"}
      />
      <BarChart
        label="Horas por gênero"
        orientation="bars"
        data={G}
        format={(n) => n + "h"}
      />
    </div>
  );
}

render(<Demo />);
`;

const meta: Meta<typeof BarChart> = {
  title: "Dados/BarChart",
  component: BarChart,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Gráfico de barras sem biblioteca: colunas ou barras horizontais em CSS, texto nítido e uma tabela oculta com os mesmos dados para leitores de tela.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof BarChart> = { render: () => <LiveExample code={code} /> };
