import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveExample } from "../../.storybook/live";
import { StackedColumns } from "../index";

const code = `const MESES = [
  { label: "Jun", values: [4, 1] },
  { label: "Jul", values: [6, 2] },
  { label: "Ago", values: [3, 0] },
  { label: "Set", values: [8, 3] },
  { label: "Out", values: [5, 1] },
  { label: "Nov", values: [2, 2] },
];
function Demo() {
  return (
    <StackedColumns
      label="Títulos por mês"
      data={MESES}
      series={[
        { label: "Concluídos", tone: "info" },
        { label: "Revisões", tone: "warning" },
      ]}
    />
  );
}

render(<Demo />);`;

const meta: Meta<typeof StackedColumns> = {
  title: "Dados/StackedColumns",
  component: StackedColumns,
  parameters: {
    sonido: { code },
    docs: {
      description: {
        component: `Colunas empilhadas sem biblioteca: várias séries por categoria, eixo com marcas inteiras, legenda e uma tabela oculta com os mesmos dados para leitores de tela.`,
      },
    },
  },
};
export default meta;

export const Exemplo: StoryObj<typeof StackedColumns> = { render: () => <LiveExample code={code} /> };
